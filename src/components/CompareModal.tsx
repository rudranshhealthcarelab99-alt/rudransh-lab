import { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { HEALTH_PACKAGES, type HealthPackage } from '../data/clinicData';

interface CompareModalProps {
  isOpen: boolean;
  selectedIds: string[];
  onClose: () => void;
  onRemoveId: (id: string) => void;
  onBookPackage: (pkg: HealthPackage) => void;
}

export function CompareModal({
  isOpen,
  selectedIds,
  onClose,
  onRemoveId,
  onBookPackage,
}: CompareModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const packages = HEALTH_PACKAGES.filter((p) => selectedIds.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04244B]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#DCEAF6] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5EFF8] mb-5">
          <div>
            <p className="text-xs font-semibold text-[#079CEB] uppercase tracking-wider mb-1">
              Side-by-Side Comparison
            </p>
            <h3
              id="compare-modal-title"
              className="font-display font-bold text-[#06346B] text-xl sm:text-2xl"
            >
              Compare Health Packages ({packages.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="w-9 h-9 rounded-full bg-[#F3F8FD] hover:bg-[#EAF6FF] text-[#06346B] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {packages.length < 2 ? (
          <div className="py-10 text-center text-sm text-[#3C587A]">
            Select at least 2 health packages to compare them side by side.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#DCEAF6]">
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-[#4A678C] w-40">
                    Criteria
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="py-3 px-4 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display font-bold text-[#06346B] text-base">
                          {pkg.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveId(pkg.id)}
                          aria-label={`Remove ${pkg.name} from comparison`}
                          className="text-xs text-[#6E89AA] hover:text-[#06346B] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF4FA] text-sm">
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B]">Price (INR)</td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className="py-3.5 px-4 font-display font-bold text-[#0756A6] tabular-nums"
                    >
                      {pkg.priceLabel}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B]">Included Tests</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-3.5 px-4 text-xs font-medium text-[#3C587A]">
                      {pkg.testCountLabel}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B]">Ideal For</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-3.5 px-4 text-[#102F57]">
                      {pkg.idealFor}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B]">Fasting</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-3.5 px-4 text-[#102F57]">
                      {pkg.fastingRequirement}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B]">Sample Type</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-3.5 px-4 text-[#102F57]">
                      {pkg.sampleType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-[#06346B] align-top">
                    Focus Areas
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-3.5 px-4 align-top">
                      <ul className="space-y-1.5">
                        {pkg.focusAreas.map((focus) => (
                          <li key={focus} className="flex items-start gap-1.5 text-xs text-[#3C587A]">
                            <Check
                              className="w-3.5 h-3.5 text-[#079CEB] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 pr-4" />
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onBookPackage(pkg);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
