import React from 'react';
import { Check, PlusCircle, ShieldCheck, Star } from 'lucide-react';
import { CommentRecord, LearningCriterion, UILanguage } from '../types/curriculum';
import { PROFICIENCY_LEVELS, UI_TEXT } from '../data/curriculumConfig';
import { stripTrailingFullStop } from '../utils/clipboard';

interface CommentCardProps {
  comment: CommentRecord;
  criterion?: LearningCriterion;
  uiLang: UILanguage;
  isSelected: boolean;
  isSelectionFull: boolean;
  isFavourite: boolean;
  onToggleSelect: (comment: CommentRecord) => void;
  onToggleFavourite: (commentId: string) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  criterion,
  uiLang,
  isSelected,
  isSelectionFull,
  isFavourite,
  onToggleSelect,
  onToggleFavourite,
}) => {
  const t = UI_TEXT[uiLang];

  const levelInfo = PROFICIENCY_LEVELS.find((l) => l.level === comment.level);
  const isArabicA = comment.subject === 'Arabic A';
  const disableSelect = !isSelected && isSelectionFull;

  return (
    <article
      className={`rounded-2xl bg-white transition-all duration-200 border-2 overflow-hidden shadow-sm hover:shadow-md ${
        isSelected
          ? 'border-[#C9A45C] ring-2 ring-[#C9A45C]/25'
          : 'border-[#E9EEF4] hover:border-[#2457A6]/30'
      }`}
    >
      {/* Card Metadata Bar */}
      <div
        className={`px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b ${
          isSelected ? 'bg-[#FFFDF7] border-[#C9A45C]/30' : 'bg-[#F7F9FC] border-[#E9EEF4]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white ${
              isArabicA ? 'bg-[#172D50]' : 'bg-[#168C8C]'
            }`}
          >
            {comment.subject} • {uiLang === 'en' ? `Gr ${comment.grade}` : `صف ${comment.grade}`}
          </span>

          {levelInfo && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#E9EEF4] text-[#172D50]">
              L{levelInfo.level}: {uiLang === 'en' ? levelInfo.nameEn : levelInfo.nameAr}
            </span>
          )}

          {criterion && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white border border-[#E9EEF4] text-slate-700">
              {uiLang === 'en' ? criterion.nameEn : criterion.nameAr}
            </span>
          )}

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            {t.approvedBadge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] font-mono text-slate-400">
            {comment.id}
          </span>

          <button
            type="button"
            onClick={() => onToggleFavourite(comment.id)}
            title={uiLang === 'en' ? 'Save to favourites' : 'حفظ في المفضلة'}
            className={`p-1.5 rounded-lg border transition-colors ${
              isFavourite
                ? 'bg-[#FEF3C7] border-[#C9A45C] text-[#B45309]'
                : 'bg-white border-[#E9EEF4] text-slate-400 hover:text-[#C9A45C]'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavourite ? 'fill-[#C9A45C]' : ''}`} />
          </button>

          <button
            type="button"
            disabled={disableSelect}
            onClick={() => onToggleSelect(comment)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isSelected
                ? 'bg-[#C9A45C] text-[#172D50] shadow-sm hover:bg-[#BC9549]'
                : disableSelect
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-[#172D50] text-white hover:bg-[#2457A6]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.selectedComment}</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.selectComment}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bilingual Descriptors Stack */}
      <div className="p-5 space-y-4">
        {/* 1. ENGLISH COMMENT BOX (Always LTR) */}
        <div
          dir="ltr"
          className="rounded-xl bg-[#F7F9FC] border border-[#E9EEF4] p-4 space-y-3 text-left"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2457A6]">
              {t.englishSectionLabel}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              {uiLang === 'en' ? 'Select for the combined report box' : 'اختره لإدراجه في صندوق التقرير الموحّد'}
            </span>
          </div>
          <p className="font-english text-[15px] leading-relaxed text-[#263445] font-medium">
            {stripTrailingFullStop(comment.englishDescriptor)}
          </p>
        </div>

        {/* 2. ARABIC TRANSLATION BOX (Always RTL) */}
        <div
          dir="rtl"
          className="rounded-xl bg-[#FAFBFD] border border-[#E9EEF4] p-4 space-y-3 text-right"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-arabic-display text-xs font-bold text-[#168C8C]">
              الترجمة العربية | {uiLang === 'en' ? 'ARABIC TRANSLATION' : 'النص العربي المكافئ'}
            </span>
            <span className="font-arabic-display text-[10px] font-semibold text-slate-500">
              {uiLang === 'en' ? 'Reference only — not included in report output' : 'للمراجعة فقط — لا تُدرج في نص التقرير'}
            </span>
          </div>
          <p className="font-arabic-display text-[16px] leading-loose text-[#172D50] font-medium">
            {comment.arabicTranslation}
          </p>
        </div>

        {/* Academic Attribution Footer */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
              {comment.sourceClassification}
            </span>
            <span>{comment.referenceGradeOrPhase}</span>
          </div>
          <span className="truncate max-w-full" title={comment.academicReference}>
            {comment.academicReference}
          </span>
        </div>
      </div>
    </article>
  );
};
