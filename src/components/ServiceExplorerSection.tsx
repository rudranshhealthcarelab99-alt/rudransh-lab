import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { CLINIC_INFO, SERVICE_CATEGORIES } from '../data/clinicData';
import { ServiceIcon } from './ServiceIcon';

interface ServiceExplorerSectionProps {
  activeServiceId: string;
  onSelectService: (serviceId: string) => void;
  onBookService: (serviceName: string, isHome?: boolean) => void;
}

export function ServiceExplorerSection({
  activeServiceId,
  onSelectService,
  onBookService,
}: ServiceExplorerSectionProps) {
  const activeService =
    SERVICE_CATEGORIES.find((s) => s.id === activeServiceId) ?? SERVICE_CATEGORIES[0];

  return (
    <section id="services-explorer" className="py-14 lg:py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#079CEB] mb-2">
              Diagnostic Capabilities
            </p>
            <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl tracking-tight text-balance">
              Explore Our Diagnostic &amp; Imaging Services
            </h2>
          </div>
          <p className="text-sm text-[#3C587A] max-w-md">
            Select a category to review available investigations, preparation guidance, and slot options.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-[#E5EFF8]"
          role="tablist"
          aria-label="Diagnostic Service Categories"
        >
          {SERVICE_CATEGORIES.map((service) => {
            const isActive = service.id === activeService.id;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectService(service.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#06346B] text-white shadow-xs'
                    : 'bg-[#F3F8FD] text-[#102F57] hover:bg-[#EAF6FF] hover:text-[#0756A6]'
                }`}
              >
                <ServiceIcon iconKey={service.iconKey} className="w-4 h-4" />
                <span>{service.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Detail Panel */}
        <div className="rounded-3xl border border-[#DCEAF6] bg-gradient-to-br from-[#F7FBFF] via-white to-[#EAF6FF]/60 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF6FF] border border-[#CFE4F7] text-[#0756A6] flex items-center justify-center shrink-0">
                  <ServiceIcon iconKey={activeService.iconKey} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#06346B] text-xl sm:text-2xl">
                    {activeService.name}
                  </h3>
                  <p className="text-sm font-medium text-[#0756A6]">{activeService.tagline}</p>
                </div>
              </div>

              <p className="text-[15.5px] leading-[1.7] text-[#102F57]/90">
                {activeService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {activeService.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 bg-white rounded-2xl border border-[#E2EFFA] p-3.5"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#079CEB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-xs sm:text-[13px] font-semibold text-[#06346B] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onBookService(
                      activeService.name,
                      activeService.id === 'home-collection' || activeService.id === 'pathology',
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Book {activeService.shortLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#CFE4F7] hover:border-[#0756A6] text-[#06346B] text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#079CEB]" aria-hidden="true" />
                  <span>Enquire Tariff: {CLINIC_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Common Tests List */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#DCEAF6] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#EDF4FA]">
                <h4 className="font-display font-semibold text-[#06346B] text-base">
                  Commonly Requested Investigations
                </h4>
                <span className="text-xs font-medium text-[#4A678C]">
                  Confirm availability on call
                </span>
              </div>

              <ul className="space-y-2.5">
                {activeService.sampleTests.map((testName) => (
                  <li
                    key={testName}
                    className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-[#F8FBFF] hover:bg-[#EAF6FF] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#102F57]">{testName}</span>
                    <button
                      type="button"
                      onClick={() =>
                        onBookService(
                          testName,
                          activeService.id === 'home-collection' || activeService.id === 'pathology',
                        )
                      }
                      className="text-xs font-semibold text-[#0756A6] hover:text-[#06346B] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Slot →
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
