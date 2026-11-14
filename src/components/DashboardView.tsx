import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Award,
  BookMarked,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SubjectId, UILanguage } from '../types/curriculum';
import { PROFICIENCY_LEVELS, SUBJECTS, UI_TEXT } from '../data/curriculumConfig';

interface DashboardViewProps {
  uiLang: UILanguage;
  onStartSubject: (subject: SubjectId, grade?: number) => void;
  totalApprovedComments: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  uiLang,
  onStartSubject,
  totalApprovedComments,
}) => {
  const t = UI_TEXT[uiLang];
  const ArrowIcon = uiLang === 'ar' ? ArrowLeft : ArrowRight;

  const scrollToGuide = () => {
    const el = document.getElementById('how-to-use-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-[#172D50] text-white shadow-xl border border-[#C9A45C]/30">
        <div className="grid lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#C9A45C] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.heroBadge}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                {t.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {t.heroDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onStartSubject('Arabic A')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A45C] hover:bg-[#D8B46C] text-[#172D50] font-bold text-sm transition-all shadow-md"
              >
                <span>{t.heroStartBtn}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollToGuide}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                <Info className="w-4 h-4 text-[#C9A45C]" />
                <span>{t.heroGuideBtn}</span>
              </button>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#C9A45C]">
                  {totalApprovedComments}+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300">
                  {uiLang === 'en' ? 'Verified Descriptors' : 'مؤشر معتمد'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">7</div>
                <div className="text-[11px] sm:text-xs text-slate-300">
                  {uiLang === 'en' ? 'Proficiency Tiers' : 'مستويات كفاءة'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#168C8C] bg-white/95 px-2 py-0.5 rounded-lg inline-block">
                  3
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 mt-1">
                  {uiLang === 'en' ? 'Steps Per Report' : 'تعليقات لكل تقرير'}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Educational Photography */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="./images/hero-teacher.jpg"
              alt={
                uiLang === 'en'
                  ? 'Arabic teacher preparing student reports on laptop'
                  : 'معلم لغة عربية يعدّ تقارير الطلاب على الحاسوب المحمول'
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#172D50] via-[#172D50]/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#172D50]/90 backdrop-blur-md border border-[#C9A45C]/40 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C9A45C] shrink-0" />
                <span className="text-xs text-slate-100 font-medium">
                  {uiLang === 'en'
                    ? 'Bilingual LTR & RTL review • One-click formatted report output'
                    : 'مراجعة ثنائية اللغة • نسخ فوري بالتنسيق المعتمد للتقارير'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECT SELECTION CARDS */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#172D50]">{t.welcomeTitle}</h2>
            <p className="text-sm text-slate-600 mt-1">{t.welcomeSubtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SUBJECTS.map((subj) => {
            const isArabicA = subj.id === 'Arabic A';
            return (
              <div
                key={subj.id}
                className={`group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border ${
                  isArabicA ? 'border-[#172D50]/20' : 'border-[#168C8C]/25'
                } flex flex-col`}
              >
                {/* Card Visual Header */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={subj.imageUrl}
                    alt={uiLang === 'en' ? subj.nameEn : subj.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isArabicA
                        ? 'bg-gradient-to-t from-[#172D50] via-[#172D50]/55 to-transparent'
                        : 'bg-gradient-to-t from-[#0F5E5E] via-[#168C8C]/45 to-transparent'
                    }`}
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        isArabicA
                          ? 'bg-[#C9A45C] text-[#172D50]'
                          : 'bg-white text-[#168C8C]'
                      }`}
                    >
                      {uiLang === 'en'
                        ? `${subj.grades.length} Grades (Gr ${subj.grades[0]}–${subj.grades[subj.grades.length - 1]})`
                        : `${subj.grades.length} صفوف (الصف ${subj.grades[0]}–${subj.grades[subj.grades.length - 1]})`}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/40 text-white backdrop-blur-sm">
                      {isArabicA ? 'First Language' : 'Additional Language'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="text-2xl font-extrabold tracking-tight">
                        {subj.nameEn}
                      </h3>
                      <span className="font-arabic-display text-xl font-bold text-[#FDE68A]">
                        {subj.nameAr}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 mt-1">
                      {uiLang === 'en' ? subj.subtitleEn : subj.subtitleAr}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {uiLang === 'en' ? subj.descriptionEn : subj.descriptionAr}
                    </p>

                    <div
                      className={`rounded-xl p-3 text-xs border ${
                        isArabicA
                          ? 'bg-[#F7F9FC] border-[#E9EEF4] text-[#172D50]'
                          : 'bg-[#F0FAFA] border-[#168C8C]/20 text-[#0F5E5E]'
                      }`}
                    >
                      <div className="font-semibold flex items-center gap-1.5 mb-1">
                        <GraduationCap className="w-4 h-4 shrink-0" />
                        <span>
                          {uiLang === 'en' ? 'Curriculum Reference:' : 'المرجعية الأكاديمية:'}
                        </span>
                      </div>
                      <p>{uiLang === 'en' ? subj.academicFrameworkEn : subj.academicFrameworkAr}</p>
                    </div>

                    {/* Quick Grade Pills */}
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {t.gradesAvailable}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {subj.grades.map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            onClick={() => onStartSubject(subj.id, grade)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                              isArabicA
                                ? 'bg-[#E9EEF4]/60 hover:bg-[#172D50] hover:text-white text-[#172D50] border-[#172D50]/15'
                                : 'bg-[#E6F6F6] hover:bg-[#168C8C] hover:text-white text-[#116B6B] border-[#168C8C]/20'
                            }`}
                          >
                            {uiLang === 'en' ? `Grade ${grade}` : `الصف ${grade}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartSubject(subj.id)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm ${
                      isArabicA
                        ? 'bg-[#172D50] hover:bg-[#2457A6]'
                        : 'bg-[#168C8C] hover:bg-[#127373]'
                    }`}
                  >
                    <span>
                      {t.openSubject} — {uiLang === 'en' ? subj.nameEn : subj.nameAr}
                    </span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW TO USE WORKFLOW */}
      <section
        id="how-to-use-section"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9EEF4] shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#172D50]/10 text-[#172D50] flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#172D50]">{t.howToUseTitle}</h2>
            <p className="text-xs text-slate-500">
              {uiLang === 'en'
                ? 'Streamlined for busy Arabic educators during report card cycles'
                : 'صُمم لاختصار الوقت على معلمي اللغة العربية خلال فترات إعداد التقارير'}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#F7F9FC] border border-[#E9EEF4] p-5 space-y-2 hover:border-[#C9A45C] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#172D50] text-[#C9A45C] font-bold text-sm flex items-center justify-center">
                {index + 1}
              </div>
              <h3 className="font-bold text-sm text-[#172D50]">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEVEN PROFICIENCY LEVELS LADDER */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9EEF4] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A45C]/15 text-[#9B772F] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#172D50]">{t.proficiencyOverviewTitle}</h2>
              <p className="text-xs text-slate-500">
                {uiLang === 'en'
                  ? 'Progressive language independence, comprehension, and analytical depth'
                  : 'تدرج متصاعد في الاستقلالية اللغوية والفهم والعمق التحليلي'}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F9FC] border border-[#E9EEF4] text-xs font-semibold text-slate-600 self-start">
            <Award className="w-3.5 h-3.5 text-[#C9A45C]" />
            {uiLang === 'en' ? 'Platform Classification (1–7)' : 'تصنيف المنصة (١–٧)'}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {PROFICIENCY_LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="rounded-2xl border border-[#E9EEF4] bg-[#F7F9FC] p-4 flex flex-col justify-between space-y-2 hover:border-[#2457A6]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#172D50] text-[#C9A45C]">
                    L{lvl.level}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#172D50]">{lvl.nameEn}</div>
                <div className="font-arabic-display text-sm font-semibold text-[#168C8C] mt-0.5">
                  {lvl.nameAr}
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-[#E9EEF4]">
                {uiLang === 'en' ? lvl.shortDescEn : lvl.shortDescAr}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-3.5 text-xs text-[#854D0E]">
          <BookMarked className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{t.proficiencyNote}</span>
        </div>
      </section>
    </div>
  );
};
