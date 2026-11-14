import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Edit3,
  FileSpreadsheet,
  History,
  KeyRound,
  Layers,
  LogOut,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Upload,
  X,
  XCircle,
} from 'lucide-react';
import {
  ApprovalStatus,
  AuditLogEntry,
  CommentRecord,
  LearningCriterion,
  ProficiencyLevelNumber,
  SourceClassification,
  SubjectId,
  UILanguage,
} from '../types/curriculum';
import { PROFICIENCY_LEVELS, SUBJECTS } from '../data/curriculumConfig';
import {
  getNextStepDescriptorIssues,
  isNextStepDescriptorCompliant,
  normaliseNextStepDescriptor,
} from '../utils/clipboard';
import {
  AdminAuthConfig,
  exportCommentsToCsv,
  hashPassphrase,
  parseCommentsFromCsv,
} from '../utils/storage';

interface AdminDashboardViewProps {
  uiLang: UILanguage;
  comments: CommentRecord[];
  criteria: LearningCriterion[];
  auditLog: AuditLogEntry[];
  adminConfig: AdminAuthConfig | null;
  isAuthenticated: boolean;
  actorName: string;
  onSetupAdmin: (name: string, email: string, passphraseHash: string) => void;
  onLoginSuccess: (actorName: string) => void;
  onLogout: () => void;
  onAddComment: (comment: CommentRecord) => void;
  onUpdateComment: (comment: CommentRecord) => void;
  onDeleteComment: (id: string) => void;
  onSetApprovalStatus: (id: string, status: ApprovalStatus) => void;
  onImportComments: (records: CommentRecord[], fileName: string) => void;
  onExportCommentsAudit: () => void;
  onAddCriterion: (criterion: LearningCriterion) => void;
}

type AdminTab = 'comments' | 'criteria' | 'import_export' | 'audit';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  uiLang,
  comments,
  criteria,
  auditLog,
  adminConfig,
  isAuthenticated,
  actorName,
  onSetupAdmin,
  onLoginSuccess,
  onLogout,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onSetApprovalStatus,
  onImportComments,
  onExportCommentsAudit,
  onAddCriterion,
}) => {
  // Auth form state
  const [setupName, setSetupName] = useState('');
  const [setupEmail, setSetupEmail] = useState('');
  const [passphraseInput, setPassphraseInput] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin workspace state
  const [activeTab, setActiveTab] = useState<AdminTab>('comments');
  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ApprovalStatus | 'all'>('all');
  const [filterGrade, setFilterGrade] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state for Add/Edit Comment
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formSubject, setFormSubject] = useState<SubjectId>('Arabic A');
  const [formGrade, setFormGrade] = useState<number>(6);
  const [formLevel, setFormLevel] = useState<ProficiencyLevelNumber>(3);
  const [formCriterionId, setFormCriterionId] = useState<string>('aa-reading');
  const [formEn, setFormEn] = useState('');
  const [formAr, setFormAr] = useState('');
  const [formRef, setFormRef] = useState(
    'UAE MOE National Curriculum for Arabic Language — Platform Pedagogical Adaptation'
  );
  const [formRefGrade, setFormRefGrade] = useState('UAE MOE Grade 6');
  const [formStatus, setFormStatus] = useState<ApprovalStatus>('pending');
  const [formSourceType, setFormSourceType] = useState<SourceClassification>(
    'Platform Adaptation (Curriculum-Aligned)'
  );
  const [formError, setFormError] = useState('');

  // Add criterion state
  const [newCritSubject, setNewCritSubject] = useState<SubjectId>('Arabic A');
  const [newCritNameEn, setNewCritNameEn] = useState('');
  const [newCritNameAr, setNewCritNameAr] = useState('');
  const [newCritCode, setNewCritCode] = useState('');

  // CSV Import feedback
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importFeedback, setImportFeedback] = useState<{
    message: string;
    errors: string[];
  } | null>(null);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminConfig) {
      if (setupName.trim().length < 2 || !setupEmail.includes('@')) {
        setAuthError(
          uiLang === 'en'
            ? 'Please enter your full name and valid school email.'
            : 'يرجى إدخال الاسم الكامل والبريد المدرسي الصحيح.'
        );
        return;
      }
      if (passphraseInput.length < 6) {
        setAuthError(
          uiLang === 'en'
            ? 'Passphrase must be at least 6 characters.'
            : 'يجب أن تتكون عبارة المرور من 6 أحرف على الأقل.'
        );
        return;
      }
      if (passphraseInput !== confirmPassphrase) {
        setAuthError(
          uiLang === 'en' ? 'Passphrases do not match.' : 'عبارتا المرور غير متطابقتين.'
        );
        return;
      }
      const hash = await hashPassphrase(passphraseInput);
      onSetupAdmin(setupName.trim(), setupEmail.trim(), hash);
      onLoginSuccess(setupName.trim());
      setPassphraseInput('');
      setConfirmPassphrase('');
    } else {
      const hash = await hashPassphrase(passphraseInput);
      if (hash !== adminConfig.passphraseHash) {
        setAuthError(
          uiLang === 'en'
            ? 'Incorrect Department Head passphrase.'
            : 'عبارة مرور رئيس القسم غير صحيحة.'
        );
        return;
      }
      onLoginSuccess(adminConfig.adminName);
      setPassphraseInput('');
    }
  };

  // Filtered comments for admin table
  const filteredComments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return comments.filter((c) => {
      if (filterSubject !== 'all' && c.subject !== filterSubject) return false;
      if (filterStatus !== 'all' && c.approvalStatus !== filterStatus) return false;
      if (filterGrade !== 'all' && c.grade !== filterGrade) return false;
      if (q) {
        const hay = `${c.id} ${c.englishDescriptor} ${c.arabicTranslation} ${c.academicReference}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [comments, filterSubject, filterStatus, filterGrade, searchTerm]);

  const counts = useMemo(() => {
    return {
      total: comments.length,
      approved: comments.filter((c) => c.approvalStatus === 'approved').length,
      pending: comments.filter((c) => c.approvalStatus === 'pending').length,
      rejected: comments.filter((c) => c.approvalStatus === 'rejected').length,
      formatIssues: comments.filter((c) => !isNextStepDescriptorCompliant(c.englishDescriptor)).length,
    };
  }, [comments]);

  const openNewEditor = () => {
    setEditingId(null);
    setFormSubject('Arabic A');
    setFormGrade(6);
    setFormLevel(3);
    setFormCriterionId('aa-reading');
    setFormEn('');
    setFormAr('');
    setFormRef('UAE MOE National Curriculum for Arabic Language — Platform Adaptation');
    setFormRefGrade('UAE MOE Grade 6');
    setFormStatus('pending');
    setFormSourceType('Platform Adaptation (Curriculum-Aligned)');
    setFormError('');
    setEditorOpen(true);
  };

  const openEditEditor = (record: CommentRecord) => {
    setEditingId(record.id);
    setFormSubject(record.subject);
    setFormGrade(record.grade);
    setFormLevel(record.level);
    setFormCriterionId(record.criterionId);
    setFormEn(record.englishDescriptor);
    setFormAr(record.arabicTranslation);
    setFormRef(record.academicReference);
    setFormRefGrade(record.referenceGradeOrPhase);
    setFormStatus(record.approvalStatus);
    setFormSourceType(record.sourceClassification);
    setFormError('');
    setEditorOpen(true);
  };

  const handleSubjectInFormChange = (subj: SubjectId) => {
    setFormSubject(subj);
    const validGrades = SUBJECTS.find((s) => s.id === subj)?.grades ?? [6];
    if (!validGrades.includes(formGrade)) {
      setFormGrade(validGrades[0]);
    }
    const firstCrit = criteria.find((c) => c.subject === subj);
    if (firstCrit) setFormCriterionId(firstCrit.id);
  };

  const handleSaveComment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formEn.trim() || !formAr.trim()) return;
    const cleanEn = normaliseNextStepDescriptor(formEn);
    const descriptorIssues = getNextStepDescriptorIssues(cleanEn);
    if (descriptorIssues.length > 0) {
      setFormError(descriptorIssues.join(' '));
      return;
    }
    const now = new Date().toISOString();

    if (editingId) {
      onUpdateComment({
        id: editingId,
        subject: formSubject,
        grade: formGrade,
        level: formLevel,
        criterionId: formCriterionId,
        englishDescriptor: cleanEn,
        arabicTranslation: formAr.trim(),
        academicReference: formRef.trim(),
        referenceGradeOrPhase: formRefGrade.trim(),
        approvalStatus: formStatus,
        sourceClassification: formSourceType,
        updatedAt: now,
        updatedBy: actorName,
      });
    } else {
      const prefix = formSubject === 'Arabic A' ? 'AA' : 'AB';
      const newId = `${prefix}-G${formGrade}-L${formLevel}-${Date.now().toString().slice(-4)}`;
      onAddComment({
        id: newId,
        subject: formSubject,
        grade: formGrade,
        level: formLevel,
        criterionId: formCriterionId,
        englishDescriptor: cleanEn,
        arabicTranslation: formAr.trim(),
        academicReference: formRef.trim(),
        referenceGradeOrPhase: formRefGrade.trim(),
        approvalStatus: formStatus,
        sourceClassification: formSourceType,
        updatedAt: now,
        updatedBy: actorName,
      });
    }
    setEditorOpen(false);
  };

  const handleExportCsv = () => {
    const csv = exportCommentsToCsv(comments);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arabic-next-steps-comment-bank-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onExportCommentsAudit();
  };

  const handleImportCsvFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const { imported, errors } = parseCommentsFromCsv(text, actorName);
    if (imported.length > 0) {
      onImportComments(imported, file.name);
    }
    setImportFeedback({
      message:
        imported.length > 0
          ? `Successfully imported ${imported.length} descriptors (marked for review or according to CSV status).`
          : 'No valid records were imported.',
      errors,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreateCriterion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCritNameEn.trim() || !newCritNameAr.trim()) return;
    const id = `${newCritSubject === 'Arabic A' ? 'aa' : 'ab'}-${Date.now().toString().slice(-5)}`;
    onAddCriterion({
      id,
      subject: newCritSubject,
      shortCode: newCritCode.trim() || 'CRIT',
      nameEn: newCritNameEn.trim(),
      nameAr: newCritNameAr.trim(),
      descriptionEn: 'Department Head added curriculum criterion',
      descriptionAr: 'معيار منهجي مضاف من رئيس القسم',
    });
    setNewCritNameEn('');
    setNewCritNameAr('');
    setNewCritCode('');
  };

  // UNAUTHENTICATED SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <div className="bg-white rounded-3xl border border-[#E9EEF4] shadow-lg overflow-hidden">
          <div className="bg-[#172D50] text-white p-7 space-y-2 border-b border-[#C9A45C]/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A45C]/20 text-[#C9A45C] text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {uiLang === 'en'
                  ? 'Department Head Protected Portal'
                  : 'بوابة إدارة رئيس قسم اللغة العربية'}
              </span>
            </div>
            <h1 className="text-2xl font-bold">
              {!adminConfig
                ? uiLang === 'en'
                  ? 'Initialise Department Head Access'
                  : 'تهيئة صلاحية رئيس القسم'
                : uiLang === 'en'
                ? 'Department Head Sign In'
                : 'تسجيل دخول رئيس القسم'}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {!adminConfig
                ? uiLang === 'en'
                  ? 'Create your local Department Head workspace credentials. No passwords are hardcoded in the application.'
                  : 'أنشئ بيانات اعتماد رئيس القسم لهذه المنصة. لا توجد أي كلمات مرور مضمّنة في الشيفرة.'
                : uiLang === 'en'
                ? `Signed profile: ${adminConfig.adminName} (${adminConfig.adminEmail}). Enter your passphrase to moderate, approve, or edit the comment bank.`
                : `الحساب المسجل: ${adminConfig.adminName}. أدخل عبارة المرور لإدارة بنك التعليقات واعتماد المعايير.`}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="p-7 space-y-4">
            {!adminConfig && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {uiLang === 'en' ? 'Department Head Full Name' : 'الاسم الكامل لرئيس القسم'}
                  </label>
                  <input
                    type="text"
                    required
                    value={setupName}
                    onChange={(e) => setSetupName(e.target.value)}
                    placeholder="e.g., Dr. Layla Al-Mansoori"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#2457A6]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {uiLang === 'en' ? 'School Email' : 'البريد الإلكتروني المدرسي'}
                  </label>
                  <input
                    type="email"
                    required
                    value={setupEmail}
                    onChange={(e) => setSetupEmail(e.target.value)}
                    placeholder="head.arabic@school.edu"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#2457A6]/30"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {uiLang === 'en' ? 'Admin Passphrase (min 6 chars)' : 'عبارة المرور الإدارية (٦ أحرف فأكثر)'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                <input
                  type="password"
                  required
                  value={passphraseInput}
                  onChange={(e) => setPassphraseInput(e.target.value)}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#2457A6]/30"
                />
              </div>
            </div>

            {!adminConfig && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {uiLang === 'en' ? 'Confirm Passphrase' : 'تأكيد عبارة المرور'}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassphrase}
                  onChange={(e) => setConfirmPassphrase(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#2457A6]/30"
                />
              </div>
            )}

            {authError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#172D50] hover:bg-[#2457A6] text-white font-bold text-sm transition-colors shadow-sm"
            >
              {!adminConfig
                ? uiLang === 'en'
                  ? 'Create Admin Workspace & Sign In'
                  : 'إنشاء حساب الإدارة والدخول'
                : uiLang === 'en'
                ? 'Unlock Admin Dashboard'
                : 'فتح لوحة الإدارة'}
            </button>

            <div className="rounded-xl bg-[#F7F9FC] border border-[#E9EEF4] p-3 text-[11px] text-slate-500 leading-relaxed">
              {uiLang === 'en'
                ? 'Role-Based Access Control: Classroom teachers have read-only access to approved standards. Only authenticated Department Heads can approve, reject, edit, or import descriptors.'
                : 'صلاحيات الأدوار: يملك المعلمون صلاحية القراءة فقط للمعايير المعتمدة. وحدهم رؤساء الأقسام المصرح لهم يمكنهم التعديل أو الاعتماد أو الاستيراد.'}
            </div>
          </form>
        </div>
      </div>
    );
  }

  const formGrades = SUBJECTS.find((s) => s.id === formSubject)?.grades ?? [6];
  const formCriteria = criteria.filter((c) => c.subject === formSubject);

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Top Banner */}
      <div className="bg-[#172D50] text-white rounded-3xl p-6 shadow-md border border-[#C9A45C]/40 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A45C]">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {uiLang === 'en'
                ? `Authenticated Department Head: ${actorName}`
                : `رئيس القسم المعتمد: ${actorName}`}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            {uiLang === 'en'
              ? 'Arabic Curriculum & Comment Bank Administration'
              : 'إدارة المنهاج وبنك تعليقات قسم اللغة العربية'}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openNewEditor}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#D8B46C] text-[#172D50] text-xs font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{uiLang === 'en' ? 'Add Comment' : 'إضافة تعليق'}</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{uiLang === 'en' ? 'Lock Admin' : 'قفل الإدارة'}</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E9EEF4] shadow-sm">
          <div className="text-xs font-semibold text-slate-500">
            {uiLang === 'en' ? 'Total Bank Descriptors' : 'إجمالي المؤشرات'}
          </div>
          <div className="text-2xl font-extrabold text-[#172D50] mt-1">{counts.total}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm">
          <div className="text-xs font-semibold text-emerald-700">
            {uiLang === 'en' ? 'Approved & Published' : 'معتمد ومنشور'}
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">{counts.approved}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm">
          <div className="text-xs font-semibold text-amber-700">
            {uiLang === 'en' ? 'Pending Review' : 'قيد المراجعة'}
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{counts.pending}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-red-200 shadow-sm">
          <div className="text-xs font-semibold text-red-700">
            {uiLang === 'en' ? 'Rejected / Archived' : 'مرفوض / مؤرشف'}
          </div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{counts.rejected}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#C9A45C]/40 shadow-sm col-span-2 lg:col-span-1">
          <div className="text-xs font-semibold text-[#8A6A2E]">
            {uiLang === 'en' ? 'Infinitive Format Issues' : 'مخالفات بداية الفعل'}
          </div>
          <div className="text-2xl font-extrabold text-[#172D50] mt-1">{counts.formatIssues}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-[#E9EEF4] shadow-sm">
        {(
          [
            {
              id: 'comments',
              label: uiLang === 'en' ? 'Comment Bank & Moderation' : 'بنك التعليقات والاعتماد',
              icon: <ShieldCheck className="w-4 h-4" />,
            },
            {
              id: 'criteria',
              label: uiLang === 'en' ? 'Criteria & Levels' : 'المعايير والمستويات',
              icon: <Layers className="w-4 h-4" />,
            },
            {
              id: 'import_export',
              label: uiLang === 'en' ? 'CSV / Excel Import & Export' : 'استيراد وتصدير CSV',
              icon: <FileSpreadsheet className="w-4 h-4" />,
            },
            {
              id: 'audit',
              label: uiLang === 'en' ? `Audit Log (${auditLog.length})` : `سجل التعديلات (${auditLog.length})`,
              icon: <History className="w-4 h-4" />,
            },
          ] as { id: AdminTab; label: string; icon: React.ReactNode }[]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#172D50] text-white shadow-sm'
                : 'text-slate-600 hover:bg-[#F7F9FC]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: COMMENT BANK MANAGER */}
      {activeTab === 'comments' && (
        <div className="bg-white rounded-3xl border border-[#E9EEF4] shadow-sm p-5 space-y-5">
          {/* Filters */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value as SubjectId | 'all')}
              className="px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm font-medium"
            >
              <option value="all">{uiLang === 'en' ? 'All Subjects' : 'جميع المواد'}</option>
              <option value="Arabic A">Arabic A (Grades 6–12)</option>
              <option value="Arabic B">Arabic B (Grades 6–10)</option>
            </select>

            <select
              value={filterGrade}
              onChange={(e) =>
                setFilterGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm font-medium"
            >
              <option value="all">{uiLang === 'en' ? 'All Grades' : 'جميع الصفوف'}</option>
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  {uiLang === 'en' ? `Grade ${g}` : `الصف ${g}`}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ApprovalStatus | 'all')}
              className="px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm font-medium"
            >
              <option value="all">{uiLang === 'en' ? 'All Approval Statuses' : 'جميع الحالات'}</option>
              <option value="approved">{uiLang === 'en' ? 'Approved' : 'معتمد'}</option>
              <option value="pending">{uiLang === 'en' ? 'Pending Review' : 'قيد المراجعة'}</option>
              <option value="rejected">{uiLang === 'en' ? 'Rejected' : 'مرفوض'}</option>
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={uiLang === 'en' ? 'Filter ID or keyword...' : 'ابحث بالرمز أو الكلمة...'}
                className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {uiLang === 'en'
              ? `Showing ${filteredComments.slice(0, 60).length} of ${filteredComments.length} matching records`
              : `عرض ${filteredComments.slice(0, 60).length} من أصل ${filteredComments.length} سجل`}
          </div>

          <div className="space-y-3">
            {filteredComments.slice(0, 60).map((item) => {
              const crit = criteria.find((c) => c.id === item.criterionId);
              const isDescriptorCompliant = isNextStepDescriptorCompliant(item.englishDescriptor);
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E9EEF4] p-4 hover:border-[#2457A6]/35 transition-colors space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {item.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-white ${
                          item.subject === 'Arabic A' ? 'bg-[#172D50]' : 'bg-[#168C8C]'
                        }`}
                      >
                        {item.subject} • Gr {item.grade} • L{item.level}
                      </span>
                      {crit && (
                        <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E9EEF4] text-slate-700">
                          {crit.nameEn}
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.approvalStatus === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.approvalStatus === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.approvalStatus.toUpperCase()}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isDescriptorCompliant
                            ? 'bg-[#E9EEF4] text-[#172D50]'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isDescriptorCompliant
                          ? uiLang === 'en'
                            ? 'FORMAT VERIFIED'
                            : 'الصياغة مطابقة'
                          : uiLang === 'en'
                          ? 'NEEDS INFINITIVE OPENING'
                          : 'تحتاج بداية بفعل مصدر'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.approvalStatus !== 'approved' && (
                        <button
                          type="button"
                          disabled={!isDescriptorCompliant}
                          title={
                            isDescriptorCompliant
                              ? 'Approve descriptor'
                              : 'Correct the infinitive opening before approval'
                          }
                          onClick={() => onSetApprovalStatus(item.id, 'approved')}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white text-xs font-bold ${
                            isDescriptorCompliant
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'bg-slate-300 cursor-not-allowed'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{uiLang === 'en' ? 'Approve' : 'اعتماد'}</span>
                        </button>
                      )}
                      {item.approvalStatus !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => onSetApprovalStatus(item.id, 'rejected')}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{uiLang === 'en' ? 'Reject' : 'رفض'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openEditEditor(item)}
                        className="p-1.5 rounded-lg bg-[#F7F9FC] hover:bg-[#E9EEF4] text-[#172D50] border border-[#E9EEF4]"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteComment(item.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div
                      dir="ltr"
                      className="rounded-xl bg-[#F7F9FC] p-3 text-xs text-left text-[#263445] font-english leading-relaxed"
                    >
                      {item.englishDescriptor}
                    </div>
                    <div
                      dir="rtl"
                      className="rounded-xl bg-[#FAFBFD] p-3 text-sm text-right text-[#172D50] font-arabic-display leading-relaxed"
                    >
                      {item.arabicTranslation}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex flex-wrap justify-between gap-2">
                    <span>
                      Ref: {item.academicReference} ({item.referenceGradeOrPhase})
                    </span>
                    <span>Updated by {item.updatedBy}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CRITERIA & LEVELS */}
      {activeTab === 'criteria' && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E9EEF4] p-6 space-y-4 shadow-sm">
            <h2 className="font-bold text-lg text-[#172D50]">
              {uiLang === 'en' ? 'Configured Learning Criteria' : 'معايير التعلم المعتمدة'}
            </h2>
            <div className="space-y-2.5">
              {criteria.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] p-3.5 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                          c.subject === 'Arabic A' ? 'bg-[#172D50]' : 'bg-[#168C8C]'
                        }`}
                      >
                        {c.subject}
                      </span>
                      <span className="font-bold text-sm text-[#172D50]">{c.nameEn}</span>
                    </div>
                    <div className="font-arabic-display text-sm text-[#168C8C] mt-0.5">
                      {c.nameAr}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{c.shortCode}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E9EEF4] p-6 space-y-4 shadow-sm">
            <h2 className="font-bold text-lg text-[#172D50]">
              {uiLang === 'en' ? 'Add Learning Criterion' : 'إضافة معيار تعلم جديد'}
            </h2>
            <form onSubmit={handleCreateCriterion} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                <select
                  value={newCritSubject}
                  onChange={(e) => setNewCritSubject(e.target.value as SubjectId)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                >
                  <option value="Arabic A">Arabic A</option>
                  <option value="Arabic B">Arabic B</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Short Code</label>
                <input
                  type="text"
                  value={newCritCode}
                  onChange={(e) => setNewCritCode(e.target.value)}
                  placeholder="e.g., RH / Criterion E"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Criterion Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={newCritNameEn}
                  onChange={(e) => setNewCritNameEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  اسم المعيار (بالعربية)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  required
                  value={newCritNameAr}
                  onChange={(e) => setNewCritNameAr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm font-arabic-display"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#172D50] hover:bg-[#2457A6] text-white font-bold text-sm"
              >
                {uiLang === 'en' ? 'Save Criterion' : 'حفظ المعيار'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: IMPORT / EXPORT */}
      {activeTab === 'import_export' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E9EEF4] p-6 space-y-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#172D50]/10 text-[#172D50] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#172D50]">
              {uiLang === 'en'
                ? 'Export Comment Bank (Excel-Ready CSV)'
                : 'تصدير بنك التعليقات (ملف CSV متوافق مع Excel)'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {uiLang === 'en'
                ? 'Downloads all Arabic A and Arabic B descriptors with bilingual fields, academic references, and approval status using UTF-8 BOM encoding so Arabic text opens cleanly in Microsoft Excel.'
                : 'تنزيل جميع مؤشرات العربية أ وب مع النصوص الثنائية والمرجعيات وحالة الاعتماد بترميز UTF-8 لعرض العربية بسلاسة في Excel.'}
            </p>
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#172D50] hover:bg-[#2457A6] text-white text-sm font-bold"
            >
              <Download className="w-4 h-4" />
              <span>{uiLang === 'en' ? 'Export Full Comment Bank' : 'تصدير البنك كاملاً'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#E9EEF4] p-6 space-y-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#168C8C]/15 text-[#168C8C] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#172D50]">
              {uiLang === 'en' ? 'Import Descriptors from CSV' : 'استيراد مؤشرات من ملف CSV'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Required columns: <code className="bg-slate-100 px-1 rounded">subject</code>,{' '}
              <code className="bg-slate-100 px-1 rounded">grade</code>,{' '}
              <code className="bg-slate-100 px-1 rounded">level</code>,{' '}
              <code className="bg-slate-100 px-1 rounded">criterionId</code>,{' '}
              <code className="bg-slate-100 px-1 rounded">englishDescriptor</code>,{' '}
              <code className="bg-slate-100 px-1 rounded">arabicTranslation</code>.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleImportCsvFile}
              className="block w-full text-xs text-slate-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#168C8C] file:text-white hover:file:bg-[#117373]"
            />

            {importFeedback && (
              <div className="rounded-xl bg-[#F7F9FC] border border-[#E9EEF4] p-3 text-xs space-y-1">
                <div className="font-bold text-[#172D50]">{importFeedback.message}</div>
                {importFeedback.errors.map((err, i) => (
                  <div key={i} className="text-red-600">
                    • {err}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-[#E9EEF4] p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-[#172D50]">
            {uiLang === 'en' ? 'Traceable Modification Audit Log' : 'سجل التعديلات والمراجعة'}
          </h2>
          <div className="space-y-2">
            {auditLog.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#172D50] text-[#C9A45C] font-bold text-[10px]">
                      {entry.action}
                    </span>
                    <span className="font-mono text-slate-500">{entry.targetId}</span>
                    <span className="font-bold text-[#172D50]">{entry.actor}</span>
                  </div>
                  <p className="text-slate-600">{entry.summary}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT COMMENT MODAL */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E9EEF4]">
            <div className="bg-[#172D50] text-white px-6 py-4 flex items-center justify-between sticky top-0">
              <h3 className="font-bold text-base">
                {editingId
                  ? uiLang === 'en'
                    ? `Edit Descriptor (${editingId})`
                    : `تعديل المؤشر (${editingId})`
                  : uiLang === 'en'
                  ? 'Add New Curriculum Descriptor'
                  : 'إضافة مؤشر منهجي جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="p-1 rounded-lg hover:bg-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveComment} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                  <select
                    value={formSubject}
                    onChange={(e) => handleSubjectInFormChange(e.target.value as SubjectId)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                  >
                    <option value="Arabic A">Arabic A</option>
                    <option value="Arabic B">Arabic B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Grade</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                  >
                    {formGrades.map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(Number(e.target.value) as ProficiencyLevelNumber)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                  >
                    {PROFICIENCY_LEVELS.map((l) => (
                      <option key={l.level} value={l.level}>
                        L{l.level}: {l.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Learning Criterion
                </label>
                <select
                  value={formCriterionId}
                  onChange={(e) => setFormCriterionId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm"
                >
                  {formCriteria.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameEn} | {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  English Descriptor (no trailing full stop)
                </label>
                <textarea
                  dir="ltr"
                  rows={2}
                  required
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  placeholder="Identify implied meanings, character motivations and relationships between ideas in a text"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7F9FC] text-sm font-english ${
                    formError ? 'border-red-400' : 'border-[#E9EEF4]'
                  }`}
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Begin directly with an infinitive verb, for example: Interpret, Structure, Make,
                  Identify, Analyse
                </p>
                {formError && (
                  <p className="mt-1.5 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">
                    {formError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Arabic Translation (الترجمة العربية المكافئة)
                </label>
                <textarea
                  dir="rtl"
                  rows={2}
                  required
                  value={formAr}
                  onChange={(e) => setFormAr(e.target.value)}
                  placeholder="تحديد المعاني الضمنية ودوافع الشخصيات والعلاقات بين الأفكار في النص"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm font-arabic-display"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Academic Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={formRef}
                    onChange={(e) => setFormRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Reference Grade or IB Phase
                  </label>
                  <input
                    type="text"
                    required
                    value={formRefGrade}
                    onChange={(e) => setFormRefGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-xs"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Source Classification
                  </label>
                  <select
                    value={formSourceType}
                    onChange={(e) => setFormSourceType(e.target.value as SourceClassification)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-xs"
                  >
                    <option value="Platform Adaptation (Curriculum-Aligned)">
                      Platform Adaptation (Curriculum-Aligned)
                    </option>
                    <option value="Official Framework Reference">
                      Official Framework Reference
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Approval Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ApprovalStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-xs font-bold"
                  >
                    <option value="pending">Pending Review (Hidden from Teachers)</option>
                    <option value="approved">Approved (Published to Official Bank)</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Academic integrity reminder: Only publish descriptors whose alignment with UAE MOE
                  or IB MYP outcomes has been verified. Unapproved descriptors never appear as
                  official standards.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#172D50] hover:bg-[#2457A6] text-white text-xs font-bold"
                >
                  {editingId ? 'Save Changes' : 'Create Descriptor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
