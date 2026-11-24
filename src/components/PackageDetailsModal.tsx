import { useEffect } from 'react';
import { X, Clock, CheckCircle2, ArrowRight, Info, PhoneCall } from 'lucide-react';
import { CLINIC_INFO, type HealthPackage } from '../data/clinicData';

interface PackageDetailsModalProps {
  pkg: HealthPackage | null;
  onClose: () => void;
  onBookPackage: (pkg: HealthPackage) => void;
}

export function PackageDetailsModal({
  pkg,
  onClose,
  onBookPackage,
}: PackageDetailsModalProps) {
  useEffect(() => {
    if (!pkg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pkg, onClose]);

  if (!pkg) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04244B]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pkg-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#DCEAF6] shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5EFF8]">
          <div>
            <p className="text-xs font-semibold text-[#079CEB] uppercase tracking-wider mb-1">
              {pkg.idealFor}
            </p>
            <h3
              id="pkg-modal-title"
              className="font-display font-bold text-[#06346B] text-xl sm:text-2xl"
            >
              {pkg.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close package details"
            className="w-9 h-9 rounded-full bg-[#F3F8FD] hover:bg-[#EAF6FF] text-[#06346B] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {/* Editable Placeholder Box */}
          <div className="rounded-2xl bg-[#EAF6FF] border border-[#CFE4F7] p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#3C587A]">Package Price (INR)</span>
              <span className="font-display font-bold text-lg text-[#06346B] tabular-nums">
                {pkg.priceLabel}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#0756A6] font-semibold">
              <span>Included Parameters</span>
              <span>{pkg.testCountLabel}</span>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-[#CFE4F7] text-xs text-[#102F57]">
              <Info className="w-4 h-4 text-[#0756A6] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Price and exact parameter counts are editable placeholders. Please confirm final
                package details with our clinic desk on {CLINIC_INFO.primaryPhone}.
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[#3C587A]">{pkg.shortDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[#E2EFFA] p-3.5 bg-[#F8FBFF]">
              <div className="text-[#4A678C] font-medium mb-1">Fasting Requirement</div>
              <div className="font-semibold text-[#06346B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#079CEB]" aria-hidden="true" />
                <span>{pkg.fastingRequirement}</span>
              </div>
            </div>
            <div className="rounded-xl border border-[#E2EFFA] p-3.5 bg-[#F8FBFF]">
              <div className="text-[#4A678C] font-medium mb-1">Sample Type</div>
              <div className="font-semibold text-[#06346B]">{pkg.sampleType}</div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-[#06346B] text-sm mb-2.5">
              Typical Screening Focus Areas
            </h4>
            <ul className="space-y-2">
              {pkg.focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-sm text-[#102F57]">
                  <CheckCircle2
                    className="w-4 h-4 text-[#079CEB] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#F7FBFF] border border-[#E2EFFA] p-3.5 text-xs leading-relaxed text-[#3C587A]">
            <strong className="text-[#06346B]">Preparation Note:</strong> {pkg.preparationNote}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5EFF8] flex flex-wrap items-center justify-between gap-3">
          <a
            href={`tel:${CLINIC_INFO.primaryPhone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#CFE4F7] text-[#06346B] text-xs sm:text-sm font-semibold hover:bg-[#F5FAFF]"
          >
            <PhoneCall className="w-4 h-4 text-[#079CEB]" aria-hidden="true" />
            <span>Call {CLINIC_INFO.primaryPhone}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookPackage(pkg);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold cursor-pointer"
          >
            <span>Book This Package</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
