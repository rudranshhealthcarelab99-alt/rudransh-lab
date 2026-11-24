import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { CLINIC_INFO, SERVICE_CATEGORIES } from '../data/clinicData';
import { FocalImage } from './FocalImage';

interface FooterProps {
  onSelectService: (serviceId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: (preset?: { visitType?: 'home' | 'centre' }) => void;
  onShowNotice: (message: string) => void;
}

export function Footer({
  onSelectService,
  onNavigateSection,
  onOpenBooking,
  onShowNotice,
}: FooterProps) {
  const handleSocial = (platform: string) => {
    onShowNotice(
      `Follow Rudransh Healthcare & Path Lab on ${platform} or call ${CLINIC_INFO.primaryPhone} for updates.`,
    );
  };

  return (
    <footer className="bg-[#04244B] text-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Logo & Clinic Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-white/25 shrink-0">
                <FocalImage
                  src="/assets/aistudio/rudransh_home_page_cec6c9c5.png"
                  alt="Rudransh Healthcare & Path Lab Logo"
                  crop={{ left: 4.3, top: 6.2, width: 5.3, height: 9.4 }}
                  naturalSize={{ width: 1668, height: 943 }}
                  className="w-full h-full"
                  fallbackLabel="RH"
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base leading-snug">
                  {CLINIC_INFO.name}
                </div>
                <div className="text-xs text-[#7DD3FC] font-medium">
                  Diagnostic Centre &amp; Home Sample Collection
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/75 max-w-sm">
              Trusted laboratory testing, imaging coordination, and convenient doorstep sample
              collection serving Uttam Nagar and West Delhi.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleSocial('Facebook')}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleSocial('Instagram')}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleSocial('YouTube')}
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Rudransh Healthcare & Path Lab, I would like to enquire about a diagnostic test.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Rudransh Healthcare"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-[#7DD3FC] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('about-us')}
                  className="hover:text-[#7DD3FC] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('health-packages')}
                  className="hover:text-[#7DD3FC] transition-colors cursor-pointer"
                >
                  Health Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-[#7DD3FC] transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking({ visitType: 'home' })}
                  className="text-[#7DD3FC] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  Book Home Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Our Services
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-sm text-white/75">
              {SERVICE_CATEGORIES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="hover:text-[#7DD3FC] transition-colors text-left cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details, Address, Visiting Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Contact &amp; Hours
            </h3>

            <div className="space-y-3.5 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#079CEB] shrink-0 mt-1" aria-hidden="true" />
                <span className="leading-relaxed">{CLINIC_INFO.address}</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#079CEB] shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-0.5 tabular-nums">
                  <div>
                    <a
                      href={`tel:${CLINIC_INFO.primaryPhone}`}
                      className="hover:text-[#7DD3FC] transition-colors font-semibold text-white"
                    >
                      {CLINIC_INFO.primaryPhone}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${CLINIC_INFO.secondaryPhone}`}
                      className="hover:text-[#7DD3FC] transition-colors font-semibold text-white"
                    >
                      {CLINIC_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#079CEB] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">
                    Visiting Hours: {CLINIC_INFO.visitingHours}
                  </div>
                  <div className="text-xs text-[#7DD3FC] font-medium mt-0.5">
                    {CLINIC_INFO.serviceBadge}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
          </p>
          <p>
            Govardhan Park, Uttam Nagar, Dal Mill Road, New Delhi – 110059
          </p>
        </div>
      </div>
    </footer>
  );
}
