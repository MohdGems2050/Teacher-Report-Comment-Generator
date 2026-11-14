import React, { useMemo, useState } from 'react';
import { BookOpen, Filter, Info, Lock, Search, Sparkles } from 'lucide-react';
import {
  CommentRecord,
  LearningCriterion,
  ProficiencyLevelNumber,
  SubjectId,
  UILanguage,
} from '../types/curriculum';
import {
  ARABIC_B_MAPPING_NOTES,
  PROFICIENCY_LEVELS,
  SUBJECTS,
  UI_TEXT,
} from '../data/curriculumConfig';
import { CommentCard } from './CommentCard';
import { SelectionTray } from './SelectionTray';
import { isNextStepDescriptorCompliant } from '../utils/clipboard';

interface GeneratorViewProps {
  uiLang: UILanguage;
  comments: CommentRecord[];
  criteria: LearningCriterion[];
  selectedSubject: SubjectId;
  selectedGrade: number;
  selectedLevel: ProficiencyLevelNumber | 'all';
  selectedCriterionId: string | 'all';
  onChangeSubject: (subj: SubjectId) => void;
  onChangeGrade: (grade: number) => void;
  onChangeLevel: (level: ProficiencyLevelNumber | 'all') => void;
  onChangeCriterion: (criterionId: string | 'all') => void;
  selectedComments: CommentRecord[];
  onToggleSelect: (comment: CommentRecord) => void;
  onRemoveSelected: (id: string) => void;
  onClearSelected: () => void;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  uiLang,
  comments,
  criteria,
  selectedSubject,
  selectedGrade,
  selectedLevel,
  selectedCriterionId,
  onChangeSubject,
  onChangeGrade,
  onChangeLevel,
  onChangeCriterion,
  selectedComments,
  onToggleSelect,
  onRemoveSelected,
  onClearSelected,
  favourites,
  onToggleFavourite,
}) => {
  const t = UI_TEXT[uiLang];
  const [searchQuery, setSearchQuery] = useState('');

  const subjectConfig = SUBJECTS.find((s) => s.id === selectedSubject) ?? SUBJECTS[0];
  const availableGrades = subjectConfig.grades;
  const subjectCriteria = useMemo(
    () => criteria.filter((c) => c.subject === selectedSubject),
    [criteria, selectedSubject]
  );

  // CRITICAL ACADEMIC RULE: Teachers only see officially approved comments
  const filteredComments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return comments.filter((c) => {
      if (c.approvalStatus !== 'approved') return false;
      if (!isNextStepDescriptorCompliant(c.englishDescriptor)) return false;
      if (c.subject !== selectedSubject) return false;
      if (c.grade !== selectedGrade) return false;
      if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
      if (selectedCriterionId !== 'all' && c.criterionId !== selectedCriterionId) return false;
      if (q) {
        const hay = `${c.englishDescriptor} ${c.arabicTranslation} ${c.id}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [comments, selectedSubject, selectedGrade, selectedLevel, selectedCriterionId, searchQuery]);

  const arabicBNote = selectedSubject === 'Arabic B' ? ARABIC_B_MAPPING_NOTES[selectedGrade] : null;
  const selectedIds = new Set(selectedComments.map((c) => c.id));
  const isSelectionFull = selectedComments.length >= 3;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Workspace Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E9EEF4] shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E9EEF4]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                selectedSubject === 'Arabic A' ? 'bg-[#172D50]' : 'bg-[#168C8C]'
              }`}
            >
              <BookOpen className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#172D50]">
                {uiLang === 'en'
                  ? 'Next Steps Comment Generator'
                  : 'مولّد تعليقات خطوات التعلم القادمة'}
              </h1>
              <p className="text-xs text-slate-500">
                {uiLang === 'en'
                  ? 'Select subject, grade, proficiency level, and learning criterion, then pick 3 comments.'
                  : 'اختر المادة والصف ومستوى الكفاءة ومعيار التعلم، ثم حدّد ٣ تعليقات للتقرير.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F9FC] border border-[#E9EEF4] text-xs font-semibold text-slate-600">
              <Lock className="w-3.5 h-3.5 text-[#2457A6]" />
              {t.readOnlyBadge}
            </span>
          </div>
        </div>

        {/* STEP 1 & STEP 2: Subject + Grade */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Step 1: Subject */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {t.step1Label}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {SUBJECTS.map((subj) => {
                const active = subj.id === selectedSubject;
                const isAA = subj.id === 'Arabic A';
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => onChangeSubject(subj.id)}
                    className={`p-3.5 rounded-2xl border-2 text-start transition-all ${
                      active
                        ? isAA
                          ? 'bg-[#172D50] text-white border-[#C9A45C] shadow-sm'
                          : 'bg-[#168C8C] text-white border-[#168C8C] shadow-sm'
                        : 'bg-[#F7F9FC] text-[#263445] border-[#E9EEF4] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-sm">
                        {uiLang === 'en' ? subj.nameEn : subj.nameAr}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          active ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        Gr {subj.grades[0]}–{subj.grades[subj.grades.length - 1]}
                      </span>
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        active ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {isAA
                        ? uiLang === 'en'
                          ? 'First Language'
                          : 'اللغة الأولى'
                        : uiLang === 'en'
                        ? 'Additional Language'
                        : 'لغة إضافية'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Grade (Dynamic per subject) */}
          <div className="lg:col-span-7 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {t.step2Label}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGrades.map((grade) => {
                const active = grade === selectedGrade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => onChangeGrade(grade)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                      active
                        ? selectedSubject === 'Arabic A'
                          ? 'bg-[#2457A6] text-white border-[#2457A6] shadow-sm'
                          : 'bg-[#168C8C] text-white border-[#168C8C] shadow-sm'
                        : 'bg-[#F7F9FC] text-[#263445] border-[#E9EEF4] hover:bg-[#E9EEF4]'
                    }`}
                  >
                    {uiLang === 'en' ? `Grade ${grade}` : `الصف ${grade}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Arabic B Scaffolded Curriculum Notice */}
        {arabicBNote && (
          <div className="rounded-2xl bg-[#F0FAFA] border border-[#168C8C]/30 p-3.5 flex items-start gap-3 text-xs text-[#0F5E5E]">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#168C8C]" />
            <div className="space-y-0.5">
              <div className="font-bold">
                {uiLang === 'en'
                  ? `Arabic B Grade ${selectedGrade} — ${arabicBNote.ibPhaseEn}`
                  : `العربية ب الصف ${selectedGrade} — ${arabicBNote.ibPhaseAr}`}
              </div>
              <p>
                {uiLang === 'en'
                  ? `${arabicBNote.suggestedUaeRangeEn}. Consider students' prior Arabic exposure and developmental proficiency.`
                  : `${arabicBNote.suggestedUaeRangeAr}. يرجى مراعاة الخبرة السابقة للطالب ومستوى كفاءته الفعلي.`}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Seven Proficiency Levels */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.step3Label}
            </label>
            <button
              type="button"
              onClick={() => onChangeLevel('all')}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-[#172D50] text-white'
                  : 'text-[#2457A6] hover:bg-[#E9EEF4]'
              }`}
            >
              {uiLang === 'en' ? 'Show All 7 Levels' : 'عرض جميع المستويات'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {PROFICIENCY_LEVELS.map((lvl) => {
              const active = selectedLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => onChangeLevel(lvl.level)}
                  className={`p-2.5 rounded-xl border text-start transition-all ${
                    active
                      ? 'bg-[#172D50] text-white border-[#C9A45C] shadow-sm ring-2 ring-[#C9A45C]/30'
                      : 'bg-[#F7F9FC] text-[#263445] border-[#E9EEF4] hover:border-[#2457A6]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        active ? 'bg-[#C9A45C] text-[#172D50]' : 'bg-[#E9EEF4] text-[#172D50]'
                      }`}
                    >
                      L{lvl.level}
                    </span>
                  </div>
                  <div className="font-bold text-xs mt-1.5">
                    {uiLang === 'en' ? lvl.nameEn : lvl.nameAr}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      active ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {uiLang === 'en' ? lvl.nameAr : lvl.nameEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Learning Criterion + Search */}
        <div className="grid lg:grid-cols-12 gap-4 items-end pt-1">
          <div className="lg:col-span-8 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.step4Label}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChangeCriterion('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  selectedCriterionId === 'all'
                    ? 'bg-[#172D50] text-white border-[#172D50]'
                    : 'bg-[#F7F9FC] text-slate-700 border-[#E9EEF4] hover:bg-[#E9EEF4]'
                }`}
              >
                {t.allCriteria}
              </button>
              {subjectCriteria.map((crit) => {
                const active = selectedCriterionId === crit.id;
                return (
                  <button
                    key={crit.id}
                    type="button"
                    onClick={() => onChangeCriterion(crit.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      active
                        ? selectedSubject === 'Arabic A'
                          ? 'bg-[#2457A6] text-white border-[#2457A6]'
                          : 'bg-[#168C8C] text-white border-[#168C8C]'
                        : 'bg-[#F7F9FC] text-[#263445] border-[#E9EEF4] hover:bg-[#E9EEF4]'
                    }`}
                  >
                    {uiLang === 'en' ? crit.nameEn : crit.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {uiLang === 'en' ? 'Keyword Filter' : 'بحث بالكلمات'}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#E9EEF4] bg-[#F7F9FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#2457A6]/30 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 5: Results List + Selection Tray */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-bold text-[#172D50]">
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
              <span>
                {uiLang === 'en'
                  ? `Showing ${filteredComments.length} Approved Descriptors`
                  : `عرض ${filteredComments.length} مؤشراً معتمداً`}
              </span>
            </div>
            <span className="text-xs text-slate-500">
              {selectedSubject} • {uiLang === 'en' ? `Grade ${selectedGrade}` : `الصف ${selectedGrade}`}
            </span>
          </div>

          {filteredComments.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#E9EEF4] p-10 text-center space-y-3">
              <p className="text-sm font-medium text-slate-600">{t.noResults}</p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-[#172D50] text-white text-xs font-bold"
                >
                  {uiLang === 'en' ? 'Clear Search' : 'مسح البحث'}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  criterion={criteria.find((c) => c.id === comment.criterionId)}
                  uiLang={uiLang}
                  isSelected={selectedIds.has(comment.id)}
                  isSelectionFull={isSelectionFull}
                  isFavourite={favourites.includes(comment.id)}
                  onToggleSelect={onToggleSelect}
                  onToggleFavourite={onToggleFavourite}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sticky Selection Tray */}
        <div className="lg:col-span-4">
          <SelectionTray
            selectedComments={selectedComments}
            uiLang={uiLang}
            onRemoveComment={onRemoveSelected}
            onClearAll={onClearSelected}
          />
        </div>
      </div>
    </div>
  );
};
