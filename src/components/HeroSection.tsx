import { ArrowRight, ShieldCheck, FlaskConical, Users } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/clinicData';
import { FocalImage } from './FocalImage';
import { ServiceIcon } from './ServiceIcon';

interface HeroSectionProps {
  activeServiceId: string;
  onSelectService: (serviceId: string) => void;
  onBookHomeCollection: () => void;
  onExploreTests: () => void;
}

export function HeroSection({
  activeServiceId,
  onSelectService,
  onBookHomeCollection,
  onExploreTests,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#DCEEFF] via-[#EDF6FF] to-[#FFFFFF]"
    >
      {/* Subtle Clinical Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 w-[520px] h-[520px] rounded-full bg-[#079CEB]/10 blur-3xl"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-10 lg:pt-12 pb-20 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#06346B]">
              <span>Diagnostics For A Brighter You</span>
              <span className="h-[2px] w-10 bg-[#0756A6]" aria-hidden="true" />
            </div>

            <h1 className="font-display font-bold text-[#06346B] text-[clamp(2.35rem,4.2vw,3.75rem)] leading-[1.08] tracking-tight text-balance">
              Clarity starts with{' '}
              <span className="text-[#079CEB]">a test.</span>
            </h1>

            <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#102F57]/90 max-w-xl font-medium">
              Trusted laboratory testing, at our centre or from the comfort of your home.
              Actionable insights for a healthier tomorrow.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onBookHomeCollection}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm sm:text-[15px] font-semibold shadow-[0_10px_24px_rgba(6,52,107,0.22)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#079CEB]"
              >
                <span>Book a Home Collection</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreTests}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/80 hover:bg-white border border-[#06346B]/30 hover:border-[#06346B] text-[#06346B] text-sm sm:text-[15px] font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#079CEB]"
              >
                <span>Explore Tests</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Three Trust Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 max-w-xl">
              <div className="flex items-center gap-2.5 sm:pr-4 sm:border-r sm:border-[#0756A6]/20">
                <span className="w-9 h-9 rounded-xl bg-white/90 border border-[#CFE4F7] text-[#0756A6] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="text-[13px] font-semibold leading-tight text-[#06346B]">
                  Accurate and Reliable
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:px-4 sm:border-r sm:border-[#0756A6]/20">
                <span className="w-9 h-9 rounded-xl bg-white/90 border border-[#CFE4F7] text-[#0756A6] flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="text-[13px] font-semibold leading-tight text-[#06346B]">
                  24/7 Service
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-4">
                <span className="w-9 h-9 rounded-xl bg-white/90 border border-[#CFE4F7] text-[#0756A6] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="text-[13px] font-semibold leading-tight text-[#06346B]">
                  Expert Support Every Step
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column — Female Lab Scientist & Microscope */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(6,52,107,0.14)] border border-white/80 bg-[#EAF6FF]">
              <FocalImage
                src="/assets/aistudio/rudransh_home_page_cec6c9c5.png"
                alt="Female laboratory professional in white coat examining diagnostic samples through a microscope at Rudransh Healthcare & Path Lab"
                crop={{ left: 45, top: 16.4, width: 43.2, height: 56.5 }}
                naturalSize={{ width: 1668, height: 943 }}
                className="w-full"
              />
              {/* Soft edge blend + Navy/Cyan Geometric Accent Stripes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#EBF5FF]/85 via-[#EBF5FF]/30 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-8 w-56 h-56 rotate-[-32deg] bg-gradient-to-tr from-[#06346B]/85 via-[#079CEB]/75 to-transparent opacity-85"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-14 w-36 h-10 rotate-[-32deg] bg-[#079CEB]/45"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Service Categories Bar ("Our Key Services") */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 -mt-12 lg:-mt-14 pb-10 relative z-20">
        <div className="bg-white rounded-3xl border border-[#DCEAF6] shadow-[0_14px_38px_rgba(6,52,107,0.09)] px-4 sm:px-6 pt-7 pb-5 relative">
          {/* Centered Section Header Pill-free Title */}
          <div className="flex items-center justify-center gap-3 -mt-11 mb-5">
            <span className="hidden sm:block h-px w-16 bg-gradient-to-r from-transparent to-[#079CEB]/50" />
            <span className="px-6 py-1.5 rounded-full bg-[#06346B] text-white font-display font-semibold text-sm tracking-wide shadow-sm whitespace-nowrap">
              Our Key Services
            </span>
            <span className="hidden sm:block h-px w-16 bg-gradient-to-l from-transparent to-[#079CEB]/50" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-1">
            {SERVICE_CATEGORIES.map((service, index) => {
              const isSelected = activeServiceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className={`group flex flex-col items-center text-center px-2 py-3 rounded-2xl transition-all duration-150 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#EAF6FF] ring-1 ring-[#079CEB]/50'
                      : 'hover:bg-[#F5FAFF]'
                  } ${
                    index < SERVICE_CATEGORIES.length - 1
                      ? 'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-4 lg:after:bottom-4 lg:after:w-px lg:after:bg-[#EAF1F8]'
                      : ''
                  }`}
                >
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#06346B] text-white shadow-sm'
                        : 'bg-[#EAF6FF] text-[#079CEB] group-hover:bg-[#079CEB] group-hover:text-white'
                    }`}
                  >
                    <ServiceIcon iconKey={service.iconKey} className="w-5 h-5" />
                  </span>
                  <span className="text-[12.5px] font-semibold leading-snug text-[#06346B]">
                    {service.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
