import { MapPin, ClipboardEdit, CalendarCheck, ArrowRight } from 'lucide-react';

interface HowToBookSectionProps {
  onBookNow: () => void;
}

const BOOKING_STEPS = [
  {
    number: '01',
    title: 'Select Your Location & Test',
    description:
      'Choose home sample collection at your doorstep or visit our Uttam Nagar centre, then pick your diagnostic test or health package.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Enter Patient Details',
    description:
      'Provide the patient’s name, age, mobile number, and any doctor prescription or fasting preparation notes.',
    icon: ClipboardEdit,
  },
  {
    number: '03',
    title: 'Choose Appointment Slot',
    description:
      'Pick a convenient date and time slot (centre visiting hours 8 AM to 8 PM with 24/7 service coordination).',
    icon: CalendarCheck,
  },
];

export function HowToBookSection({ onBookNow }: HowToBookSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#06346B] text-white py-16 lg:py-20">
      {/* Subtle Ambient Blue Radiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 w-[460px] h-[460px] rounded-full bg-[#079CEB]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#0756A6]/35 blur-3xl"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7DD3FC] mb-2">
            Simple 3-Step Process
          </p>
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-[36px] tracking-tight text-balance">
            How to Book Your Test
          </h2>
          <p className="mt-3 text-[15px] text-white/80 leading-relaxed">
            Whether visiting our Govardhan Park laboratory or scheduling a home phlebotomy visit,
            requesting a test takes less than a minute.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* Connecting Dotted Line on Desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-11 left-[18%] right-[18%] border-t-2 border-dashed border-[#079CEB]/55 pointer-events-none"
          />

          {BOOKING_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center px-4"
              >
                <div className="relative z-10 w-22 h-22 rounded-full bg-[#0756A6] border-2 border-[#079CEB]/70 shadow-[0_12px_30px_rgba(0,0,0,0.22)] flex items-center justify-center mb-5">
                  <Icon className="w-8 h-8 text-[#7DD3FC]" strokeWidth={1.8} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#079CEB] text-[#04244B] font-mono font-bold text-xs flex items-center justify-center shadow-sm tabular-nums">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2.5 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 max-w-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onBookNow}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#079CEB] hover:bg-[#38BDF8] text-[#04244B] font-display font-bold text-sm sm:text-[15px] shadow-[0_12px_28px_rgba(7,156,235,0.3)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            <span>Book Your Test Now</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
