import { AuditLogEntry, CommentRecord, LearningCriterion, ProficiencyLevelNumber, SubjectId } from '../types/curriculum';
import { INITIAL_CRITERIA } from '../data/curriculumConfig';
import { generateInitialCommentBank } from '../data/commentBank';
import { getNextStepDescriptorIssues, normaliseNextStepDescriptor } from './clipboard';

const KEYS = {
  COMMENTS: 'ans_comments_v1',
  CRITERIA: 'ans_criteria_v1',
  FAVOURITES: 'ans_favourites_v1',
  AUDIT_LOG: 'ans_audit_log_v1',
  ADMIN_CONFIG: 'ans_admin_auth_v1',
  ADMIN_SESSION: 'ans_admin_session_v1',
};

export interface AdminAuthConfig {
  adminName: string;
  adminEmail: string;
  passphraseHash: string;
}

export async function hashPassphrase(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  if (window.crypto?.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback deterministic hash for non-HTTPS local preview environments
  let h = 5381;
  for (let i = 0; i < data.length; i++) {
    h = (h * 33) ^ data[i];
  }
  return (h >>> 0).toString(16);
}

export function loadComments(): CommentRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.COMMENTS);
    if (raw) {
      const parsed = JSON.parse(raw) as CommentRecord[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Migrate previously saved descriptors to the current report-format rules.
        return parsed.map((comment) => ({
          ...comment,
          englishDescriptor: normaliseNextStepDescriptor(comment.englishDescriptor),
        }));
      }
    }
  } catch {
    // ignore storage errors
  }
  const initial = generateInitialCommentBank();
  saveComments(initial);
  return initial;
}

export function saveComments(comments: CommentRecord[]): void {
  try {
    localStorage.setItem(KEYS.COMMENTS, JSON.stringify(comments));
  } catch {
    // ignore
  }
}

export function loadCriteria(): LearningCriterion[] {
  try {
    const raw = localStorage.getItem(KEYS.CRITERIA);
    if (raw) {
      const parsed = JSON.parse(raw) as LearningCriterion[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  saveCriteria(INITIAL_CRITERIA);
  return INITIAL_CRITERIA;
}

export function saveCriteria(criteria: LearningCriterion[]): void {
  try {
    localStorage.setItem(KEYS.CRITERIA, JSON.stringify(criteria));
  } catch {
    // ignore
  }
}

export function loadFavourites(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.FAVOURITES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveFavourites(ids: string[]): void {
  try {
    localStorage.setItem(KEYS.FAVOURITES, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function loadAuditLog(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.AUDIT_LOG);
    if (raw) {
      const parsed = JSON.parse(raw) as AuditLogEntry[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  const seed: AuditLogEntry[] = [
    {
      id: 'LOG-INIT-1',
      timestamp: '2025-02-15T09:00:00Z',
      actor: 'Arabic Department Curriculum Lead',
      action: 'APPROVE_COMMENT',
      targetId: 'INITIAL-BANK',
      summary: 'Published initial verified Arabic A (Grades 6–12) and Arabic B (Grades 6–10) descriptor bank.',
    },
  ];
  saveAuditLog(seed);
  return seed;
}

export function saveAuditLog(entries: AuditLogEntry[]): void {
  try {
    localStorage.setItem(KEYS.AUDIT_LOG, JSON.stringify(entries.slice(0, 250)));
  } catch {
    // ignore
  }
}

export function loadAdminAuthConfig(): AdminAuthConfig | null {
  try {
    const raw = localStorage.getItem(KEYS.ADMIN_CONFIG);
    if (!raw) return null;
    return JSON.parse(raw) as AdminAuthConfig;
  } catch {
    return null;
  }
}

export function saveAdminAuthConfig(config: AdminAuthConfig): void {
  try {
    localStorage.setItem(KEYS.ADMIN_CONFIG, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function loadAdminSession(): { active: boolean; actorName: string } {
  try {
    const raw = sessionStorage.getItem(KEYS.ADMIN_SESSION);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { active: false, actorName: '' };
}

export function saveAdminSession(active: boolean, actorName: string): void {
  try {
    if (active) {
      sessionStorage.setItem(KEYS.ADMIN_SESSION, JSON.stringify({ active, actorName }));
    } else {
      sessionStorage.removeItem(KEYS.ADMIN_SESSION);
    }
  } catch {
    // ignore
  }
}

function escapeCsvCell(val: string | number): string {
  const str = String(val ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportCommentsToCsv(comments: CommentRecord[]): string {
  const headers = [
    'id',
    'subject',
    'grade',
    'level',
    'criterionId',
    'englishDescriptor',
    'arabicTranslation',
    'academicReference',
    'referenceGradeOrPhase',
    'approvalStatus',
    'sourceClassification',
  ];
  const rows = comments.map((c) =>
    [
      c.id,
      c.subject,
      c.grade,
      c.level,
      c.criterionId,
      c.englishDescriptor,
      c.arabicTranslation,
      c.academicReference,
      c.referenceGradeOrPhase,
      c.approvalStatus,
      c.sourceClassification,
    ]
      .map(escapeCsvCell)
      .join(',')
  );
  // UTF-8 BOM so Excel opens Arabic characters cleanly
  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

export function parseCommentsFromCsv(
  csvText: string,
  actorName: string
): { imported: CommentRecord[]; errors: string[] } {
  const clean = csvText.replace(/^\uFEFF/, '');
  const lines = clean.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    return { imported: [], errors: ['CSV file must contain a header row and at least one data row.'] };
  }
  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  const idx = (name: string) => headers.indexOf(name);

  const requiredCols = ['subject', 'grade', 'level', 'criterionId', 'englishDescriptor', 'arabicTranslation'];
  const missing = requiredCols.filter((c) => idx(c) === -1);
  if (missing.length > 0) {
    return { imported: [], errors: [`Missing required CSV columns: ${missing.join(', ')}`] };
  }

  const imported: CommentRecord[] = [];
  const errors: string[] = [];

  for (let r = 1; r < lines.length; r++) {
    const cols = parseCsvLine(lines[r]);
    const subjectRaw = (cols[idx('subject')] || '').trim();
    const subject: SubjectId | null =
      subjectRaw === 'Arabic A' || subjectRaw === 'Arabic B' ? subjectRaw : null;
    const grade = Number(cols[idx('grade')]);
    const level = Number(cols[idx('level')]) as ProficiencyLevelNumber;
    const criterionId = (cols[idx('criterionId')] || '').trim();
    const en = normaliseNextStepDescriptor(cols[idx('englishDescriptor')] || '');
    const ar = (cols[idx('arabicTranslation')] || '').trim();

    if (!subject || !Number.isInteger(grade) || level < 1 || level > 7 || !criterionId || !en || !ar) {
      errors.push(`Row ${r + 1} skipped due to invalid or incomplete fields.`);
      continue;
    }
    if (subject === 'Arabic A' && (grade < 6 || grade > 12)) {
      errors.push(`Row ${r + 1} skipped: Arabic A supports Grades 6–12 only.`);
      continue;
    }
    if (subject === 'Arabic B' && (grade < 6 || grade > 10)) {
      errors.push(`Row ${r + 1} skipped: Arabic B supports Grades 6–10 only.`);
      continue;
    }

    const statusCol = idx('approvalStatus') !== -1 ? cols[idx('approvalStatus')].trim() : 'pending';
    const requestedStatus =
      statusCol === 'approved' || statusCol === 'rejected' ? statusCol : 'pending';
    const descriptorIssues = getNextStepDescriptorIssues(en);
    const approvalStatus = descriptorIssues.length > 0 ? 'pending' : requestedStatus;
    if (descriptorIssues.length > 0) {
      errors.push(
        `Row ${r + 1} imported as pending review: ${descriptorIssues.join('; ')}.`
      );
    }

    imported.push({
      id:
        (idx('id') !== -1 && cols[idx('id')].trim()) ||
        `IMP-${Date.now()}-${r}`,
      subject,
      grade,
      level,
      criterionId,
      englishDescriptor: en,
      arabicTranslation: ar,
      academicReference:
        (idx('academicReference') !== -1 && cols[idx('academicReference')].trim()) ||
        'Imported Curriculum Descriptor — Pending Academic Review',
      referenceGradeOrPhase:
        (idx('referenceGradeOrPhase') !== -1 && cols[idx('referenceGradeOrPhase')].trim()) ||
        `Grade ${grade}`,
      approvalStatus,
      sourceClassification: 'Platform Adaptation (Curriculum-Aligned)',
      updatedAt: new Date().toISOString(),
      updatedBy: actorName,
    });
  }

  return { imported, errors };
}
