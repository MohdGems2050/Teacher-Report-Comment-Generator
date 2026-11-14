import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  ApprovalStatus,
  AppView,
  AuditLogEntry,
  CommentRecord,
  LearningCriterion,
  ProficiencyLevelNumber,
  SubjectId,
  UILanguage,
} from './types/curriculum';
import { SUBJECTS, UI_TEXT } from './data/curriculumConfig';
import {
  AdminAuthConfig,
  loadAdminAuthConfig,
  loadAdminSession,
  loadAuditLog,
  loadComments,
  loadCriteria,
  loadFavourites,
  saveAdminAuthConfig,
  saveAdminSession,
  saveAuditLog,
  saveComments,
  saveCriteria,
  saveFavourites,
} from './utils/storage';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { GeneratorView } from './components/GeneratorView';
import { FavouritesView } from './components/FavouritesView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { isNextStepDescriptorCompliant } from './utils/clipboard';

export function App() {
  const [uiLang, setUiLang] = useState<UILanguage>('en');
  const [activeView, setActiveView] = useState<AppView>('dashboard');

  // Persistent Platform Data
  const [comments, setComments] = useState<CommentRecord[]>(() => loadComments());
  const [criteria, setCriteria] = useState<LearningCriterion[]>(() => loadCriteria());
  const [favourites, setFavourites] = useState<string[]>(() => loadFavourites());
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(() => loadAuditLog());

  // Admin Auth State (no hardcoded credentials)
  const [adminConfig, setAdminConfig] = useState<AdminAuthConfig | null>(() =>
    loadAdminAuthConfig()
  );
  const [adminSession, setAdminSession] = useState<{ active: boolean; actorName: string }>(() =>
    loadAdminSession()
  );

  // Generator Filters
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('Arabic A');
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevelNumber | 'all'>(3);
  const [selectedCriterionId, setSelectedCriterionId] = useState<string | 'all'>('all');

  // Selected 3 Report Comments
  const [selectedComments, setSelectedComments] = useState<CommentRecord[]>([]);
  const [limitAlert, setLimitAlert] = useState(false);

  // Sync LTR / RTL layout with UI language
  useEffect(() => {
    document.documentElement.dir = uiLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = uiLang;
  }, [uiLang]);

  const appendAudit = (
    action: AuditLogEntry['action'],
    targetId: string,
    summary: string,
    actor = adminSession.actorName || 'Department Head'
  ) => {
    const entry: AuditLogEntry = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      targetId,
      summary,
    };
    setAuditLog((prev) => {
      const next = [entry, ...prev];
      saveAuditLog(next);
      return next;
    });
  };

  const handleChangeSubject = (subj: SubjectId, gradeOverride?: number) => {
    setSelectedSubject(subj);
    const validGrades = SUBJECTS.find((s) => s.id === subj)?.grades ?? [6];
    if (gradeOverride && validGrades.includes(gradeOverride)) {
      setSelectedGrade(gradeOverride);
    } else if (!validGrades.includes(selectedGrade)) {
      setSelectedGrade(validGrades[0]);
    }
    setSelectedCriterionId('all');
  };

  const handleStartFromDashboard = (subj: SubjectId, grade?: number) => {
    handleChangeSubject(subj, grade);
    setActiveView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSelectComment = (comment: CommentRecord) => {
    if (
      comment.approvalStatus !== 'approved' ||
      !isNextStepDescriptorCompliant(comment.englishDescriptor)
    ) {
      return;
    }
    const exists = selectedComments.some((c) => c.id === comment.id);
    if (exists) {
      setSelectedComments((prev) => prev.filter((c) => c.id !== comment.id));
      return;
    }
    if (selectedComments.length >= 3) {
      setLimitAlert(true);
      setTimeout(() => setLimitAlert(false), 3000);
      return;
    }
    setSelectedComments((prev) => [...prev, comment]);
  };

  const handleRemoveSelected = (id: string) => {
    setSelectedComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearSelected = () => {
    setSelectedComments([]);
  };

  const handleToggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavourites(next);
      return next;
    });
  };

  // Admin Operations (only available when authenticated)
  const handleSetupAdmin = (name: string, email: string, passphraseHash: string) => {
    const cfg: AdminAuthConfig = { adminName: name, adminEmail: email, passphraseHash };
    saveAdminAuthConfig(cfg);
    setAdminConfig(cfg);
  };

  const handleLoginSuccess = (actorName: string) => {
    saveAdminSession(true, actorName);
    setAdminSession({ active: true, actorName });
  };

  const handleLogout = () => {
    saveAdminSession(false, '');
    setAdminSession({ active: false, actorName: '' });
  };

  const handleAddComment = (comment: CommentRecord) => {
    if (!adminSession.active || !isNextStepDescriptorCompliant(comment.englishDescriptor)) return;
    setComments((prev) => {
      const next = [comment, ...prev];
      saveComments(next);
      return next;
    });
    appendAudit(
      'CREATE_COMMENT',
      comment.id,
      `Created ${comment.subject} Grade ${comment.grade} Level ${comment.level} descriptor (${comment.approvalStatus}).`
    );
  };

  const handleUpdateComment = (updated: CommentRecord) => {
    if (!adminSession.active || !isNextStepDescriptorCompliant(updated.englishDescriptor)) return;
    setComments((prev) => {
      const next = prev.map((c) => (c.id === updated.id ? updated : c));
      saveComments(next);
      return next;
    });
    // Also remove from selected tray if unapproved
    if (updated.approvalStatus !== 'approved') {
      setSelectedComments((prev) => prev.filter((c) => c.id !== updated.id));
    }
    appendAudit(
      'UPDATE_COMMENT',
      updated.id,
      `Updated descriptor text/metadata (${updated.approvalStatus}).`
    );
  };

  const handleDeleteComment = (id: string) => {
    if (!adminSession.active) return;
    setComments((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveComments(next);
      return next;
    });
    setSelectedComments((prev) => prev.filter((c) => c.id !== id));
    appendAudit('DELETE_COMMENT', id, 'Deleted descriptor from comment bank.');
  };

  const handleSetApprovalStatus = (id: string, status: ApprovalStatus) => {
    if (!adminSession.active) return;
    const target = comments.find((comment) => comment.id === id);
    if (
      status === 'approved' &&
      (!target || !isNextStepDescriptorCompliant(target.englishDescriptor))
    ) {
      return;
    }
    setComments((prev) => {
      const next = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              approvalStatus: status,
              updatedAt: new Date().toISOString(),
              updatedBy: adminSession.actorName,
            }
          : c
      );
      saveComments(next);
      return next;
    });
    if (status !== 'approved') {
      setSelectedComments((prev) => prev.filter((c) => c.id !== id));
    }
    appendAudit(
      status === 'approved' ? 'APPROVE_COMMENT' : 'REJECT_COMMENT',
      id,
      `Changed approval status to ${status.toUpperCase()}.`
    );
  };

  const handleImportComments = (records: CommentRecord[], fileName: string) => {
    if (!adminSession.active) return;
    setComments((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const deduped = records.filter((r) => !existingIds.has(r.id));
      const updated = prev.map((c) => records.find((r) => r.id === c.id) ?? c);
      const next = [...deduped, ...updated];
      saveComments(next);
      return next;
    });
    appendAudit(
      'IMPORT_CSV',
      fileName,
      `Imported ${records.length} descriptor rows from CSV file "${fileName}".`
    );
  };

  const handleExportCommentsAudit = () => {
    if (!adminSession.active) return;
    appendAudit(
      'EXPORT_CSV',
      'COMMENT-BANK',
      `Exported ${comments.length} comment bank records to UTF-8 CSV.`
    );
  };

  const handleAddCriterion = (criterion: LearningCriterion) => {
    if (!adminSession.active) return;
    setCriteria((prev) => {
      const next = [...prev, criterion];
      saveCriteria(next);
      return next;
    });
    appendAudit(
      'MANAGE_CRITERIA',
      criterion.id,
      `Added learning criterion "${criterion.nameEn}" for ${criterion.subject}.`
    );
  };

  const totalApprovedCount = comments.filter(
    (c) => c.approvalStatus === 'approved' && isNextStepDescriptorCompliant(c.englishDescriptor)
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#263445]">
      <Header
        uiLang={uiLang}
        onToggleLanguage={() => setUiLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
        activeView={activeView}
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCount={selectedComments.length}
        favouritesCount={favourites.length}
        isAdminAuthenticated={adminSession.active}
      />

      {/* Max-3 Alert Banner */}
      {limitAlert && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#172D50] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#C9A45C] flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0" />
          <span>{UI_TEXT[uiLang].maxThreeWarning}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-7">
        {activeView === 'dashboard' && (
          <DashboardView
            uiLang={uiLang}
            onStartSubject={handleStartFromDashboard}
            totalApprovedComments={totalApprovedCount}
          />
        )}

        {activeView === 'generator' && (
          <GeneratorView
            uiLang={uiLang}
            comments={comments}
            criteria={criteria}
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
            selectedLevel={selectedLevel}
            selectedCriterionId={selectedCriterionId}
            onChangeSubject={(s) => handleChangeSubject(s)}
            onChangeGrade={setSelectedGrade}
            onChangeLevel={setSelectedLevel}
            onChangeCriterion={setSelectedCriterionId}
            selectedComments={selectedComments}
            onToggleSelect={handleToggleSelectComment}
            onRemoveSelected={handleRemoveSelected}
            onClearSelected={handleClearSelected}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
          />
        )}

        {activeView === 'favourites' && (
          <FavouritesView
            uiLang={uiLang}
            comments={comments}
            criteria={criteria}
            favourites={favourites}
            selectedComments={selectedComments}
            onToggleSelect={handleToggleSelectComment}
            onRemoveSelected={handleRemoveSelected}
            onClearSelected={handleClearSelected}
            onToggleFavourite={handleToggleFavourite}
            onGoToGenerator={() => setActiveView('generator')}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboardView
            uiLang={uiLang}
            comments={comments}
            criteria={criteria}
            auditLog={auditLog}
            adminConfig={adminConfig}
            isAuthenticated={adminSession.active}
            actorName={adminSession.actorName}
            onSetupAdmin={handleSetupAdmin}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onSetApprovalStatus={handleSetApprovalStatus}
            onImportComments={handleImportComments}
            onExportCommentsAudit={handleExportCommentsAudit}
            onAddCriterion={handleAddCriterion}
          />
        )}
      </main>

      {/* Academic Attribution Footer */}
      <footer className="bg-white border-t border-[#E9EEF4] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="font-semibold text-[#172D50]">
            ARABIC NEXT STEPS •{' '}
            {uiLang === 'en'
              ? 'Bilingual Teacher Report Comment Generator'
              : 'مولّد تعليقات تقارير الطلاب ثنائي اللغة'}
          </div>
          <p className="text-center sm:text-end max-w-2xl">
            {uiLang === 'en'
              ? 'Curriculum-aligned descriptors grounded in UAE MOE Arabic A/B frameworks and IB MYP Language Acquisition criteria. The 7 proficiency tiers are an internal platform classification.'
              : 'مؤشرات متوافقة مع أطر منهاج وزارة التربية والتعليم ومعايير اكتساب اللغة IB MYP. مستويات الكفاءة السبعة تصنيف داخلي خاص بالمنصة.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
