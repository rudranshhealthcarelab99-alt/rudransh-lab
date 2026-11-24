import { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import type { EducationalArticle } from '../data/clinicData';

interface ArticleModalProps {
  article: EducationalArticle | null;
  onClose: () => void;
  onBookCheckup: () => void;
}

export function ArticleModal({
  article,
  onClose,
  onBookCheckup,
}: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04244B]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#DCEAF6] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5EFF8]">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4A678C] mb-1.5">
              <span className="font-semibold text-[#0756A6]">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h3
              id="article-modal-title"
              className="font-display font-bold text-[#06346B] text-xl sm:text-2xl leading-snug"
            >
              {article.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="w-9 h-9 rounded-full bg-[#F3F8FD] hover:bg-[#EAF6FF] text-[#06346B] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          <div className="rounded-2xl bg-[#F4F9FD] border border-[#DCEAF6] p-4 sm:p-5 space-y-2.5">
            <h4 className="font-display font-semibold text-[#06346B] text-sm">
              Key Takeaways
            </h4>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[#102F57]">
                  <CheckCircle2
                    className="w-4 h-4 text-[#079CEB] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-[15px] leading-[1.75] text-[#3C587A]">
            {article.bodyParagraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <p className="text-xs text-[#6E89AA] pt-2 border-t border-[#EDF4FA]">
            Educational Note: This guide is for general patient awareness and does not replace
            individual clinical advice from your physician.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E5EFF8] flex justify-end">
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookCheckup();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold cursor-pointer"
          >
            <span>Book a Preventive Test</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
