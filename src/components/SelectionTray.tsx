import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, FileText, Lock, Trash2, X } from 'lucide-react';
import { CommentRecord, UILanguage } from '../types/curriculum';
import { UI_TEXT } from '../data/curriculumConfig';
import {
  copyTextToClipboard,
  formatThreeCommentsForReport,
  isNextStepDescriptorCompliant,
} from '../utils/clipboard';

interface SelectionTrayProps {
  selectedComments: CommentRecord[];
  uiLang: UILanguage;
  onRemoveComment: (id: string) => void;
  onClearAll: () => void;
}

export const SelectionTray: React.FC<SelectionTrayProps> = ({
  selectedComments,
  uiLang,
  onRemoveComment,
  onClearAll,
}) => {
  const t = UI_TEXT[uiLang];
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const count = selectedComments.length;
  const hasExactlyThreeUnique = count === 3 && new Set(selectedComments.map((c) => c.id)).size === 3;
  const hasComplianceIssue = selectedComments.some(
    (comment) =>
      comment.approvalStatus !== 'approved' ||
      !isNextStepDescriptorCompliant(comment.englishDescriptor)
  );
  const isReady = hasExactlyThreeUnique && !hasComplianceIssue;
  const formattedText = formatThreeCommentsForReport(selectedComments);
  const selectionKey = selectedComments.map((comment) => comment.id).join('|');

  useEffect(() => {
    setCopySuccess(false);
    setCopyError(false);
  }, [selectionKey]);

  const handleCopyAll = async () => {
    if (!isReady) return;
    const ok = await copyTextToClipboard(formattedText);
    setCopySuccess(ok);
    setCopyError(!ok);
    if (ok) {
      window.setTimeout(() => setCopySuccess(false), 4500);
    }
  };

  return (
    <aside className="bg-white rounded-3xl border border-[#E9EEF4] shadow-md overflow-hidden sticky top-24">
      <div className="bg-[#172D50] text-white px-5 py-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-base">{t.previewPanelTitle}</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {t.selectedCounter}:{' '}
            <span className={`font-extrabold ${isReady ? 'text-[#4ADE80]' : 'text-[#C9A45C]'}`}>
              {count} / 3
            </span>
          </p>
        </div>

        {count > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearAll}</span>
          </button>
        )}
      </div>

      <div className="h-1.5 bg-[#E9EEF4] w-full">
        <div
          className={`h-full transition-all duration-300 ${isReady ? 'bg-emerald-500' : 'bg-[#C9A45C]'}`}
          style={{ width: `${(count / 3) * 100}%` }}
        />
      </div>

      <div className="p-5 space-y-4">
        {hasComplianceIssue ? (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>
              {uiLang === 'en'
                ? 'A selected descriptor is no longer approved or does not begin with an infinitive verb. Remove it and choose a compliant comment.'
                : 'أحد التعليقات المختارة لم يعد معتمداً أو لا يبدأ بفعل بصيغة المصدر. أزله واختر تعليقاً مطابقاً للمعايير.'}
            </span>
          </div>
        ) : isReady ? (
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{t.threeSelectedConfirm}</span>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>{t.selectThreeWarning}</span>
          </div>
        )}

        {/* ONE unified report box: its visible content is exactly what is copied */}
        <section
          aria-label={uiLang === 'en' ? 'Combined Next Steps report text box' : 'صندوق خطوات التعلم الموحّد'}
          className={`rounded-2xl border-2 overflow-hidden bg-white transition-colors ${
            isReady ? 'border-[#168C8C]' : 'border-[#E9EEF4]'
          }`}
        >
          <div className="px-4 py-3 bg-[#F7F9FC] border-b border-[#E9EEF4] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2457A6] shrink-0" />
              <span className="text-xs font-bold text-[#172D50]">
                {uiLang === 'en'
                  ? 'Next Steps in Learning — One Report Box'
                  : 'خطوات التعلم القادمة — صندوق تقرير واحد'}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#E9EEF4] text-slate-500">
              {count} / 3
            </span>
          </div>

          <pre
            dir="ltr"
            className={`font-english min-h-44 w-full m-0 px-4 py-4 whitespace-pre-wrap break-words text-left text-[13px] leading-7 ${
              count === 0 ? 'text-slate-400' : 'text-[#172D50]'
            }`}
          >
            {count === 0
              ? uiLang === 'en'
                ? 'Your three selected comments will appear together here'
                : 'ستظهر التعليقات الثلاثة المختارة معاً هنا'
              : formattedText}
          </pre>

          {count > 0 && (
            <div className="border-t border-[#E9EEF4] bg-[#F7F9FC] px-3 py-2.5 flex flex-wrap gap-2">
              {selectedComments.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onRemoveComment(item.id)}
                  title={uiLang === 'en' ? `Remove comment ${index + 1}` : `إزالة التعليق ${index + 1}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E9EEF4] text-[10px] font-semibold text-slate-600 hover:text-red-700 hover:border-red-200 transition-colors"
                >
                  <span>
                    {uiLang === 'en' ? `Point ${index + 1}` : `النقطة ${index + 1}`}
                  </span>
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}
        </section>

        <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
          {uiLang === 'en'
            ? 'One dash and space per point • Infinitive opening • Capitalised first word • No full stops • Exactly three points'
            : 'شرطة ومسافة لكل نقطة • البدء بفعل بصيغة المصدر • حرف أول كبير • دون نقطة ختامية • ثلاث نقاط بالضبط'}
        </p>

        <button
          type="button"
          disabled={!isReady}
          onClick={handleCopyAll}
          className={`w-full py-4 px-5 rounded-xl font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm ${
            isReady
              ? 'bg-[#168C8C] hover:bg-[#117373] text-white cursor-pointer shadow-md'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isReady ? <Copy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          <span>{t.copyAllThree}</span>
        </button>

        {copySuccess && (
          <div className="rounded-xl bg-[#172D50] text-white p-3.5 text-xs space-y-1 shadow-md border border-[#C9A45C]/50">
            <div className="flex items-center gap-2 font-bold text-[#4ADE80]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Three comments copied successfully. Ready to paste into the school reporting system.</span>
            </div>
            <p dir="rtl" className="font-arabic-display text-right text-slate-200">
              تم نسخ التعليقات الثلاثة بنجاح. يمكنك الآن لصقها في نظام التقارير المدرسية.
            </p>
          </div>
        )}

        {copyError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
            {uiLang === 'en'
              ? 'Clipboard access was blocked. Select the text in the report box above and copy it manually.'
              : 'حظر المتصفح الوصول إلى الحافظة. حدّد النص في صندوق التقرير أعلاه وانسخه يدوياً.'}
          </div>
        )}
      </div>
    </aside>
  );
};
