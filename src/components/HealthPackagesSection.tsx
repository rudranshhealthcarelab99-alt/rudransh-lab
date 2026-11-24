import { useMemo, useState } from 'react';
import {
  CheckSquare,
  Square,
  Clock,
  ArrowRight,
  Search,
  Eye,
  Info,
  Scale,
} from 'lucide-react';
import { CLINIC_INFO, HEALTH_PACKAGES, type HealthPackage } from '../data/clinicData';

interface HealthPackagesSectionProps {
  selectedCompareIds: string[];
  onToggleCompare: (pkgId: string) => void;
  onViewDetails: (pkg: HealthPackage) => void;
  onBookPackage: (pkg: HealthPackage) => void;
  onOpenCompareModal: () => void;
  onClearCompare: () => void;
}

type CategoryFilter = 'all' | HealthPackage['category'];

const FILTER_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Packages' },
  { id: 'preventive', label: 'Preventive' },
  { id: 'comprehensive', label: 'Comprehensive' },
  { id: 'gender', label: 'Male & Female' },
  { id: 'senior', label: 'Senior Care' },
];

export function HealthPackagesSection({
  selectedCompareIds,
  onToggleCompare,
  onViewDetails,
  onBookPackage,
  onOpenCompareModal,
  onClearCompare,
}: HealthPackagesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = useMemo(() => {
    return HEALTH_PACKAGES.filter((pkg) => {
      const matchesCat = activeFilter === 'all' || pkg.category === activeFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.shortDescription.toLowerCase().includes(q) ||
        pkg.idealFor.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="health-packages" className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#079CEB] mb-2">
              Preventive Screening
            </p>
            <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl lg:text-[36px] tracking-tight text-balance">
              Curated Health Checkup Packages
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#3C587A]">
              Compare preventive checkup options side by side and request home sample collection
              or a centre appointment at Govardhan Park, Uttam Nagar.
            </p>
          </div>

          {selectedCompareIds.length > 0 && (
            <div className="flex items-center gap-3 self-start lg:self-end">
              <button
                type="button"
                onClick={onOpenCompareModal}
                disabled={selectedCompareIds.length < 2}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0756A6] disabled:bg-[#9FB7D3] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Scale className="w-4 h-4" aria-hidden="true" />
                <span>Compare Selected ({selectedCompareIds.length}/3)</span>
              </button>
              <button
                type="button"
                onClick={onClearCompare}
                className="text-xs font-semibold text-[#3C587A] hover:text-[#06346B] px-2 py-1.5 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Editable Placeholder Transparency Note */}
        <div className="mb-7 rounded-2xl bg-[#EAF6FF] border border-[#CFE4F7] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-[13px] text-[#06346B]">
            <Info className="w-4 h-4 text-[#0756A6] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <span>
              <strong>Placeholder Notice:</strong> Package INR prices and exact parameter counts
              shown below are editable placeholders. Call{' '}
              <a href={`tel:${CLINIC_INFO.primaryPhone}`} className="underline font-semibold">
                {CLINIC_INFO.primaryPhone}
              </a>{' '}
              or{' '}
              <a href={`tel:${CLINIC_INFO.secondaryPhone}`} className="underline font-semibold">
                {CLINIC_INFO.secondaryPhone}
              </a>{' '}
              for confirmed tariff details.
            </span>
          </div>
          <span className="text-xs font-medium text-[#0756A6] whitespace-nowrap shrink-0">
            Select up to 3 packages to compare
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div
            className="flex items-center gap-1.5 p-1 bg-[#F3F8FD] border border-[#DCEAF6] rounded-xl overflow-x-auto"
            role="tablist"
            aria-label="Filter health packages"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#06346B] text-white shadow-xs'
                      : 'text-[#102F57] hover:bg-white hover:text-[#0756A6]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="w-4 h-4 text-[#5A7699] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              aria-label="Search health packages"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCEAF6] bg-white text-sm text-[#102F57] placeholder:text-[#6E89AA] focus:outline-none focus:ring-2 focus:ring-[#079CEB] focus:border-transparent"
            />
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="rounded-2xl border border-[#DCEAF6] bg-[#F8FBFF] p-10 text-center">
            <p className="font-display font-semibold text-[#06346B] text-lg mb-1">
              No matching packages found
            </p>
            <p className="text-sm text-[#4A678C] mb-4">
              Try clearing your search filter or view all available checkups.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#06346B] text-white text-sm font-semibold cursor-pointer"
            >
              Show All Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const isCompared = selectedCompareIds.includes(pkg.id);
              return (
                <article
                  key={pkg.id}
                  className={`rounded-3xl border bg-white p-6 flex flex-col justify-between transition-all duration-150 ${
                    isCompared
                      ? 'border-[#079CEB] ring-2 ring-[#079CEB]/20 shadow-[0_14px_34px_rgba(7,156,235,0.12)]'
                      : 'border-[#DCEAF6] hover:border-[#A7CBEB] hover:shadow-[0_14px_32px_rgba(6,52,107,0.08)]'
                  }`}
                >
                  <div>
                    {/* Quiet Metadata Line (Zero-pill discipline) */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#4A678C] font-medium mb-2">
                      <span className="truncate">{pkg.idealFor}</span>
                      <span className="text-[#0756A6] font-semibold whitespace-nowrap shrink-0">
                        Placeholder
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-[#06346B] text-xl leading-snug mb-3">
                      {pkg.name}
                    </h3>

                    {/* Price & Test Count Placeholder Strip */}
                    <div className="rounded-2xl bg-[#F4F9FD] border border-[#E2EFFA] p-4 mb-4">
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <span className="text-xs font-medium text-[#4A678C]">Package Tariff (INR)</span>
                        <span className="font-display font-bold text-lg text-[#06346B] tabular-nums">
                          {pkg.priceLabel}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#0756A6] pt-1.5 border-t border-[#DCEAF6]">
                        {pkg.testCountLabel}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-[#3C587A] mb-4">
                      {pkg.shortDescription}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#102F57] mb-5">
                      <Clock className="w-4 h-4 text-[#079CEB] shrink-0" aria-hidden="true" />
                      <span>{pkg.fastingRequirement}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EDF4FA] space-y-3">
                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(pkg)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full border border-[#CFE4F7] hover:border-[#0756A6] text-[#06346B] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-4 h-4 text-[#0756A6]" aria-hidden="true" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onBookPackage(pkg)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Compare Checkbox */}
                    <button
                      type="button"
                      onClick={() => onToggleCompare(pkg.id)}
                      aria-pressed={isCompared}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-[#3C587A] hover:text-[#06346B] hover:bg-[#F5FAFF] transition-colors cursor-pointer"
                    >
                      {isCompared ? (
                        <CheckSquare className="w-4 h-4 text-[#079CEB]" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#7C97B8]" aria-hidden="true" />
                      )}
                      <span>
                        {isCompared ? 'Added to Compare' : 'Compare Package'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
