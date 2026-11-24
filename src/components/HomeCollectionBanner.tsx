import { ArrowRight, PhoneCall } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { FocalImage } from './FocalImage';

interface HomeCollectionBannerProps {
  onBookHomeTest: () => void;
}

export function HomeCollectionBanner({ onBookHomeTest }: HomeCollectionBannerProps) {
  return (
    <section className="py-16 lg:py-20 bg-[#F4F9FD]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#CFE4F7] bg-gradient-to-br from-[#EAF6FF] via-[#F5FAFF] to-white shadow-[0_18px_46px_rgba(6,52,107,0.09)]">
          {/* Bottom-left subtle cyan curve accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#079CEB]/12 blur-2xl"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-14 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#0756A6] mb-3">
                <span>Health Check? No Sweat!</span>
                <span className="h-[2px] w-10 bg-[#0756A6]" aria-hidden="true" />
              </div>

              <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl lg:text-[40px] leading-[1.14] tracking-tight text-balance mb-4">
                Skip the waiting room.{' '}
                <span className="text-[#0756A6]">Get tested from home!</span>
              </h2>

              <p className="text-[15.5px] sm:text-base leading-relaxed text-[#102F57]/85 max-w-xl mb-7">
                Convenient home sample collection from Rudransh Healthcare &amp; Path Lab.
                Schedule a trained sample collector at your home across Uttam Nagar and nearby areas.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onBookHomeTest}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm sm:text-[15px] font-semibold shadow-[0_10px_24px_rgba(6,52,107,0.2)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Book Test Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#CFE4F7] hover:border-[#0756A6] text-[#06346B] text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#079CEB]" aria-hidden="true" />
                  <span>Call {CLINIC_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column — Phlebotomist Collecting Blood Sample */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-[#DCEEFF]">
              <FocalImage
                src="/assets/aistudio/rundransh_cta_image_a2a089ee.png"
                alt="Healthcare technician collecting a blood sample safely during a home visit"
                crop={{ left: 62.2, top: 0, width: 37.8, height: 100 }}
                naturalSize={{ width: 2172, height: 724 }}
                className="w-full h-full"
              />
              {/* Soft Left Transition for Mobile Stack */}
              <div
                aria-hidden="true"
                className="pointer-events-none hidden lg:block absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F9FCFF] to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
