import { useState, useRef, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Calendar,
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { CLINIC_INFO, SERVICE_CATEGORIES } from '../data/clinicData';
import { ServiceIcon } from './ServiceIcon';

interface HeaderProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: (preset?: { visitType?: 'home' | 'centre'; itemName?: string }) => void;
  onNavigateSection: (sectionId: string) => void;
  onShowNotice: (message: string) => void;
}

const TEST_NAV_IDS = ['pathology', 'ultrasound', 'xray', 'ecg', 'mri', 'tmt'];

export function Header({
  onSelectService,
  onOpenBooking,
  onNavigateSection,
  onShowNotice,
}: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<'services' | 'tests' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<'services' | 'tests' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const testServices = SERVICE_CATEGORIES.filter((s) => TEST_NAV_IDS.includes(s.id));

  const handleServicePick = (serviceId: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onSelectService(serviceId);
  };

  const handleNavClick = (sectionId: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const handleSocialClick = (platform: string) => {
    onShowNotice(
      `Connect with Rudransh Healthcare on ${platform} or reach our clinic desk on ${CLINIC_INFO.primaryPhone}.`,
    );
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-white border-b border-[#DCEAF6] shadow-[0_2px_12px_rgba(6,52,107,0.05)]">
      {/* Top Information Bar (Desktop & Tablet) */}
      <div className="hidden lg:block bg-[#06346B] text-white overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 h-10 flex items-center justify-between text-xs font-medium tracking-wide overflow-hidden">
          <div className="flex-1 min-w-0 overflow-hidden mr-4">
            <div className="animate-marquee-continuous items-center">
              {[0, 1].map((dupIndex) => (
                <div
                  key={dupIndex}
                  aria-hidden={dupIndex === 1}
                  className="flex items-center gap-6 pr-10 whitespace-nowrap shrink-0"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#079CEB]" aria-hidden="true" />
                    <a
                      href={`tel:${CLINIC_INFO.primaryPhone}`}
                      tabIndex={dupIndex === 1 ? -1 : undefined}
                      className="hover:text-[#7DD3FC] transition-colors tabular-nums"
                    >
                      {CLINIC_INFO.primaryPhone}
                    </a>
                    <span className="text-white/40" aria-hidden="true">,</span>
                    <a
                      href={`tel:${CLINIC_INFO.secondaryPhone}`}
                      tabIndex={dupIndex === 1 ? -1 : undefined}
                      className="hover:text-[#7DD3FC] transition-colors tabular-nums"
                    >
                      {CLINIC_INFO.secondaryPhone}
                    </a>
                  </div>

                  <span className="h-3.5 w-px bg-white/25 shrink-0" aria-hidden="true" />

                  <a
                    href="#about-us"
                    tabIndex={dupIndex === 1 ? -1 : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('about-us');
                    }}
                    className="flex items-center gap-1.5 text-white/95 hover:text-[#7DD3FC] transition-colors shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#079CEB] shrink-0" aria-hidden="true" />
                    <span>{CLINIC_INFO.address}</span>
                  </a>

                  <span className="h-3.5 w-px bg-white/25 shrink-0" aria-hidden="true" />

                  <div className="flex items-center gap-1.5 shrink-0 text-white/95">
                    <Clock className="w-3.5 h-3.5 text-[#079CEB]" aria-hidden="true" />
                    <span>Timing : {CLINIC_INFO.visitingHours} · {CLINIC_INFO.serviceBadge}</span>
                  </div>

                  <span className="h-3.5 w-px bg-white/25 shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 pl-3 bg-[#06346B] relative z-10">
            <button
              type="button"
              onClick={() => handleSocialClick('Facebook')}
              aria-label="Rudransh Healthcare Facebook"
              className="w-6 h-6 rounded-full bg-white/15 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('Instagram')}
              aria-label="Rudransh Healthcare Instagram"
              className="w-6 h-6 rounded-full bg-white/15 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('YouTube')}
              aria-label="Rudransh Healthcare YouTube"
              className="w-6 h-6 rounded-full bg-white/15 hover:bg-[#079CEB] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Youtube className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-16 lg:h-[74px] flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#079CEB] rounded-lg pr-2"
        >
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-[#DCEAF6] bg-white shrink-0 shadow-xs">
            <div className="w-full h-full flex items-center justify-center bg-white">
              <img
                src="/assets/aistudio/rundransh_logo_63f84ba8.png"
                alt="Rudransh Healthcare & Path Lab Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="font-display font-bold text-[#06346B] text-sm sm:text-base lg:text-[17px] tracking-tight whitespace-nowrap">
            {CLINIC_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[15px] font-medium text-[#102F57]" aria-label="Primary Navigation">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#06346B] text-white font-semibold whitespace-nowrap shrink-0 transition-colors hover:bg-[#0756A6]"
          >
            Home
          </a>

          {/* Our Services Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'services'}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'services' ? null : 'services'))
              }
              className="flex items-center gap-1 py-2 text-[#102F57] hover:text-[#0756A6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Our Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  openDropdown === 'services' ? 'rotate-180 text-[#079CEB]' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute left-0 top-full mt-2 w-[340px] rounded-2xl bg-white border border-[#DCEAF6] shadow-[0_18px_40px_rgba(6,52,107,0.14)] p-3 grid grid-cols-1 gap-1 z-50">
                {SERVICE_CATEGORIES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServicePick(service.id)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#EAF6FF] transition-colors cursor-pointer group"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#EAF6FF] group-hover:bg-white text-[#0756A6] flex items-center justify-center shrink-0 transition-colors">
                      <ServiceIcon iconKey={service.iconKey} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#06346B] truncate">
                        {service.name}
                      </div>
                      <div className="text-xs text-[#4A678C] truncate">{service.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about-us');
            }}
            className="py-2 text-[#102F57] hover:text-[#0756A6] transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>

          {/* Tests Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'tests'}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'tests' ? null : 'tests'))
              }
              className="flex items-center gap-1 py-2 text-[#102F57] hover:text-[#0756A6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Tests</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  openDropdown === 'tests' ? 'rotate-180 text-[#079CEB]' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {openDropdown === 'tests' && (
              <div className="absolute left-0 top-full mt-2 w-[290px] rounded-2xl bg-white border border-[#DCEAF6] shadow-[0_18px_40px_rgba(6,52,107,0.14)] p-2.5 z-50">
                {testServices.map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => handleServicePick(test.id)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#EAF6FF] transition-colors cursor-pointer"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#EAF6FF] text-[#079CEB] flex items-center justify-center shrink-0">
                      <ServiceIcon iconKey={test.iconKey} className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold text-[#06346B]">{test.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#health-packages"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('health-packages');
            }}
            className="py-2 text-[#102F57] hover:text-[#0756A6] transition-colors whitespace-nowrap shrink-0"
          >
            Health Packages
          </a>
        </nav>

        {/* Primary CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking({ visitType: 'centre' })}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#079CEB]"
          >
            <Calendar className="w-4 h-4 text-[#7DD3FC]" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden w-11 h-11 rounded-xl border border-[#DCEAF6] text-[#06346B] hover:bg-[#EAF6FF] flex items-center justify-center transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#DCEAF6] max-h-[calc(100vh-64px)] overflow-y-auto px-4 py-5 space-y-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-semibold text-[#06346B] bg-[#EAF6FF]"
            >
              Home
            </button>

            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'services' ? null : 'services'))
                }
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-[#102F57] hover:bg-[#F5FAFF]"
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordion === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'services' && (
                <div className="pl-3 pr-1 py-1 space-y-1">
                  {SERVICE_CATEGORIES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServicePick(service.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#102F57] hover:bg-[#EAF6FF]"
                    >
                      <ServiceIcon iconKey={service.iconKey} className="w-4 h-4 text-[#079CEB]" />
                      <span>{service.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('about-us')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-semibold text-[#102F57] hover:bg-[#F5FAFF]"
            >
              About Us
            </button>

            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'tests' ? null : 'tests'))
                }
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-[#102F57] hover:bg-[#F5FAFF]"
              >
                <span>Tests</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAccordion === 'tests' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'tests' && (
                <div className="pl-3 pr-1 py-1 space-y-1">
                  {testServices.map((test) => (
                    <button
                      key={test.id}
                      type="button"
                      onClick={() => handleServicePick(test.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#102F57] hover:bg-[#EAF6FF]"
                    >
                      <ServiceIcon iconKey={test.iconKey} className="w-4 h-4 text-[#079CEB]" />
                      <span>{test.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('health-packages')}
              className="w-full text-left px-3 py-2.5 rounded-xl font-semibold text-[#102F57] hover:bg-[#F5FAFF]"
            >
              Health Packages
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking({ visitType: 'home' });
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#06346B] text-white font-semibold text-sm"
          >
            <Calendar className="w-4 h-4 text-[#7DD3FC]" />
            <span>Book Appointment</span>
          </button>

          {/* Compact Clinic Details inside Mobile Drawer */}
          <div className="pt-3 border-t border-[#DCEAF6] space-y-2 text-xs text-[#3C587A]">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#079CEB] shrink-0" />
              <a href={`tel:${CLINIC_INFO.primaryPhone}`} className="font-semibold text-[#06346B]">
                {CLINIC_INFO.primaryPhone}
              </a>
              <span>/</span>
              <a href={`tel:${CLINIC_INFO.secondaryPhone}`} className="font-semibold text-[#06346B]">
                {CLINIC_INFO.secondaryPhone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#079CEB] shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#079CEB] shrink-0" />
              <span>Timing: {CLINIC_INFO.visitingHours} · {CLINIC_INFO.serviceBadge}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
