import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { CommentRecord, LearningCriterion, UILanguage } from '../types/curriculum';
import { UI_TEXT } from '../data/curriculumConfig';
import { CommentCard } from './CommentCard';
import { SelectionTray } from './SelectionTray';

interface FavouritesViewProps {
  uiLang: UILanguage;
  comments: CommentRecord[];
  criteria: LearningCriterion[];
  favourites: string[];
  selectedComments: CommentRecord[];
  onToggleSelect: (comment: CommentRecord) => void;
  onRemoveSelected: (id: string) => void;
  onClearSelected: () => void;
  onToggleFavourite: (id: string) => void;
  onGoToGenerator: () => void;
}

export const FavouritesView: React.FC<FavouritesViewProps> = ({
  uiLang,
  comments,
  criteria,
  favourites,
  selectedComments,
  onToggleSelect,
  onRemoveSelected,
  onClearSelected,
  onToggleFavourite,
  onGoToGenerator,
}) => {
  const t = UI_TEXT[uiLang];
  const favouriteComments = comments.filter(
    (c) => c.approvalStatus === 'approved' && favourites.includes(c.id)
  );
  const selectedIds = new Set(selectedComments.map((c) => c.id));
  const isSelectionFull = selectedComments.length >= 3;

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-3xl p-6 border border-[#E9EEF4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] border border-[#C9A45C]/40 flex items-center justify-center text-[#B45309]">
            <Star className="w-5 h-5 fill-[#C9A45C]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#172D50]">{t.favouritesTitle}</h1>
            <p className="text-xs text-slate-500">{t.favouritesDesc}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onGoToGenerator}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172D50] hover:bg-[#2457A6] text-white text-xs font-bold transition-colors"
        >
          <span>{t.navGenerator}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          {favouriteComments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E9EEF4] p-10 text-center space-y-4">
              <p className="text-sm text-slate-600">{t.favouritesEmpty}</p>
              <button
                type="button"
                onClick={onGoToGenerator}
                className="px-5 py-2.5 rounded-xl bg-[#168C8C] text-white text-xs font-bold"
              >
                {t.heroStartBtn}
              </button>
            </div>
          ) : (
            favouriteComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                criterion={criteria.find((c) => c.id === comment.criterionId)}
                uiLang={uiLang}
                isSelected={selectedIds.has(comment.id)}
                isSelectionFull={isSelectionFull}
                isFavourite={true}
                onToggleSelect={onToggleSelect}
                onToggleFavourite={onToggleFavourite}
              />
            ))
          )}
        </div>

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
