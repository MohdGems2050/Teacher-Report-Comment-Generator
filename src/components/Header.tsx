import React from 'react';
import { BookOpen, CheckSquare, Globe, LayoutDashboard, ShieldCheck, Star } from 'lucide-react';
import { AppView, UILanguage } from '../types/curriculum';
import { UI_TEXT } from '../data/curriculumConfig';

interface HeaderProps {
  uiLang: UILanguage;
  onToggleLanguage: () => void;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  selectedCount: number;
  favouritesCount: number;
  isAdminAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  uiLang,
  onToggleLanguage,
  activeView,
  onNavigate,
  selectedCount,
  favouritesCount,
  isAdminAuthenticated,
}) => {
  const t = UI_TEXT[uiLang];

  const navItems: { id: AppView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'generator',
      label: t.navGenerator,
      icon: <CheckSquare className="w-4 h-4" />,
      badge: `${selectedCount}/3`,
    },
    {
      id: 'favourites',
      label: t.navFavourites,
      icon: <Star className="w-4 h-4" />,
      badge: favouritesCount > 0 ? favouritesCount : undefined,
    },
    {
      id: 'admin',
      label: t.navAdmin,
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: isAdminAuthenticated ? (uiLang === 'en' ? 'Active' : 'نشط') : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#172D50] text-white shadow-md border-b border-[#C9A45C]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          {/* Brand Logo & Title */}
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 text-start group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2457A6] to-[#172D50] border border-[#C9A45C]/70 flex items-center justify-center shadow-sm group-hover:border-[#C9A45C] transition-colors">
              <BookOpen className="w-6 h-6 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-english font-extrabold tracking-wide text-base sm:text-lg text-white">
                  ARABIC NEXT STEPS
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40">
                  Grades 6–12
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {uiLang === 'en'
                  ? 'Teacher Report Comment Generator | مولّد تعليقات تقارير الطلاب'
                  : 'مولّد تعليقات تقارير الطلاب | Teacher Report Comment Generator'}
              </p>
            </div>
          </button>

          {/* Navigation Links + Language Switch */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <nav className="flex items-center gap-1 bg-[#0F203B]/60 p-1 rounded-xl border border-white/10">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#C9A45C] text-[#172D50] shadow-sm font-semibold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                          isActive
                            ? 'bg-[#172D50] text-[#C9A45C]'
                            : item.id === 'generator' && selectedCount === 3
                            ? 'bg-[#168C8C] text-white'
                            : 'bg-white/15 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bilingual Toggle EN | العربية */}
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label="Toggle interface language"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2457A6] hover:bg-[#2E66BF] border border-white/20 text-xs sm:text-sm font-semibold text-white transition-colors shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#C9A45C]" />
              <span>{uiLang === 'en' ? 'EN | العربية' : 'العربية | EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
