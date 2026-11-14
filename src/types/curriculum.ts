export type UILanguage = 'en' | 'ar';

export type SubjectId = 'Arabic A' | 'Arabic B';

export type ProficiencyLevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export type SourceClassification =
  | 'Platform Adaptation (Curriculum-Aligned)'
  | 'Official Framework Reference';

export interface SubjectConfig {
  id: SubjectId;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  grades: number[];
  accentColor: string;
  secondaryColor: string;
  imageUrl: string;
  academicFrameworkEn: string;
  academicFrameworkAr: string;
}

export interface ProficiencyLevel {
  level: ProficiencyLevelNumber;
  nameEn: string;
  nameAr: string;
  shortDescEn: string;
  shortDescAr: string;
}

export interface LearningCriterion {
  id: string;
  subject: SubjectId;
  nameEn: string;
  nameAr: string;
  shortCode: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface CommentRecord {
  id: string;
  subject: SubjectId;
  grade: number;
  level: ProficiencyLevelNumber;
  criterionId: string;
  englishDescriptor: string;
  arabicTranslation: string;
  academicReference: string;
  referenceGradeOrPhase: string;
  approvalStatus: ApprovalStatus;
  sourceClassification: SourceClassification;
  updatedAt: string;
  updatedBy: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action:
    | 'CREATE_COMMENT'
    | 'UPDATE_COMMENT'
    | 'DELETE_COMMENT'
    | 'APPROVE_COMMENT'
    | 'REJECT_COMMENT'
    | 'IMPORT_CSV'
    | 'EXPORT_CSV'
    | 'MANAGE_CRITERIA';
  targetId: string;
  summary: string;
}

export type AppView = 'dashboard' | 'generator' | 'favourites' | 'admin';
