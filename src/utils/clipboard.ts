import { CommentRecord } from '../types/curriculum';

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function stripTrailingFullStop(text: string): string {
  return text.trim().replace(/\.+$/, '');
}

export function normaliseNextStepDescriptor(text: string): string {
  const clean = stripTrailingFullStop(text)
    .replace(/^[–—-]\s*/, '')
    .replace(/^Critically\s+(analyse|analyze)\b/i, (_match, verb: string) => `${verb} critically`)
    .trim();
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
}

const INFINITIVE_STARTERS = new Set([
  'address', 'adapt', 'analyse', 'analyze', 'apply', 'articulate', 'assess', 'ask',
  'build', 'check', 'clarify', 'classify', 'collaborate', 'command', 'communicate',
  'compare', 'complete', 'compose', 'conduct', 'connect', 'consolidate', 'construct',
  'control', 'craft', 'create', 'critique', 'decode', 'deconstruct', 'deduce', 'define',
  'deliver', 'demonstrate', 'deploy', 'derive', 'describe', 'design', 'determine',
  'develop', 'differentiate', 'discuss', 'distinguish', 'draft', 'eliminate', 'engage',
  'enrich', 'ensure', 'evaluate', 'examine', 'exhibit', 'expand', 'explain', 'explore',
  'exploit', 'express', 'extract', 'facilitate', 'focus', 'follow', 'formulate', 'group',
  'handle', 'identify', 'illustrate', 'improve', 'include', 'incorporate', 'infer',
  'integrate', 'interact', 'interpret', 'investigate', 'justify', 'lead', 'link', 'list',
  'locate', 'maintain', 'make', 'manipulate', 'match', 'minimise', 'minimize', 'modify',
  'modulate', 'monitor', 'organise', 'organize', 'outline', 'paraphrase', 'participate',
  'perform', 'practise', 'practice', 'present', 'produce', 'proofread', 'read', 'recite',
  'recognise', 'recognize', 'refine', 'replace', 'resolve', 'respond', 'review', 'revise',
  'select', 'self-correct', 'self-edit', 'sequence', 'speak', 'spell', 'structure',
  'summarise', 'summarize', 'support', 'sustain', 'synthesise', 'synthesize', 'take',
  'track', 'trace', 'understand', 'use', 'vary', 'verify', 'write', 'recall', 'capture',
  'defend', 'counter', 'employ', 'self-regulate', 'comprehend', 'answer',
]);

export function getNextStepDescriptorIssues(text: string): string[] {
  const clean = normaliseNextStepDescriptor(text);
  if (!clean) return ['Descriptor is empty'];

  const firstWord = clean.match(/^[A-Za-z]+(?:-[A-Za-z]+)?/)?.[0]?.toLowerCase() ?? '';
  if (!INFINITIVE_STARTERS.has(firstWord)) {
    return [`Begin with an infinitive verb instead of "${clean.split(/\s+/)[0]}"`];
  }
  return [];
}

export function isNextStepDescriptorCompliant(text: string): boolean {
  return getNextStepDescriptorIssues(text).length === 0;
}

/**
 * The single report text box and the clipboard both use this exact formatter:
 * three point-form descriptors, each on its own line, with no extra headings,
 * Arabic text, blank spacer lines, or trailing full stops.
 */
export function formatThreeCommentsForReport(comments: CommentRecord[]): string {
  return comments
    .slice(0, 3)
    .map((comment) => `– ${normaliseNextStepDescriptor(comment.englishDescriptor)}`)
    .join('\n');
}
