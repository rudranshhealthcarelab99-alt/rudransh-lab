import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutAndArticlesSectionProps {
  onBookVisit: () => void;
}

export function AboutAndArticlesSection({
  onBookVisit,
}: AboutAndArticlesSectionProps) {
  return (
    <section id="about-us" className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* About Rudransh Asymmetric Editorial Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#079CEB]">
              About Rudransh Healthcare &amp; Path Lab
            </p>
            <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight text-balance">
              Accessible Diagnostic Care in Uttam Nagar, New Delhi
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-[#3C587A]">
              Rudransh Healthcare &amp; Path Lab is committed to providing clear, accessible, and
              patient-focused diagnostic support for families across Uttam Nagar and West Delhi.
              From routine pathology investigations and preventive health packages to imaging and
              cardiac tests, we make every step straightforward.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-[#3C587A]">
              Visit our centre on Dal Mill Road during visiting hours (8 AM to 8 PM), or reach
              our 24/7 service desk to arrange a doorstep home sample collection at your convenience.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookVisit}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Schedule a Visit</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Verified Clinic Info Panel */}
          <div className="lg:col-span-6 rounded-3xl border border-[#DCEAF6] bg-[#F7FBFF] p-6 sm:p-8 space-y-5">
            <h3 className="font-display font-bold text-[#06346B] text-lg">
              Centre &amp; Patient Desk Information
            </h3>

            <div className="space-y-4 text-sm text-[#102F57]">
              <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2EFFA]">
                <span className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0756A6] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4A678C] mb-0.5">
                    Diagnostic Centre Address
                  </div>
                  <p className="font-semibold text-[#06346B] leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2EFFA]">
                <span className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0756A6] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4A678C] mb-0.5">
                    Visiting Hours &amp; Availability
                  </div>
                  <p className="font-semibold text-[#06346B]">
                    Centre Hours: {CLINIC_INFO.visitingHours} · {CLINIC_INFO.serviceBadge}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0756A6] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#4A678C] mb-0.5">
                    Direct Contact Numbers
                  </div>
                  <div className="flex flex-wrap items-center gap-3 font-semibold text-[#06346B] tabular-nums">
                    <a
                      href={`tel:${CLINIC_INFO.primaryPhone}`}
                      className="hover:text-[#079CEB] transition-colors"
                    >
                      {CLINIC_INFO.primaryPhone}
                    </a>
                    <span className="text-[#9AB4D1]" aria-hidden="true">/</span>
                    <a
                      href={`tel:${CLINIC_INFO.secondaryPhone}`}
                      className="hover:text-[#079CEB] transition-colors"
                    >
                      {CLINIC_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
