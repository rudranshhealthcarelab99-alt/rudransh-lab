import {
  Activity,
  Droplets,
  HeartPulse,
  Home,
  Scan,
  ShieldPlus,
  Bone,
  Waves,
} from 'lucide-react';
import type { ServiceCategory } from '../data/clinicData';

interface ServiceIconProps {
  iconKey: ServiceCategory['iconKey'];
  className?: string;
}

export function ServiceIcon({ iconKey, className = 'w-6 h-6' }: ServiceIconProps) {
  switch (iconKey) {
    case 'pathology':
      return <Droplets className={className} strokeWidth={1.85} />;
    case 'ultrasound':
      return <Waves className={className} strokeWidth={1.85} />;
    case 'xray':
      return <Bone className={className} strokeWidth={1.85} />;
    case 'ecg':
      return <Activity className={className} strokeWidth={1.85} />;
    case 'mri':
      return <Scan className={className} strokeWidth={1.85} />;
    case 'packages':
      return <ShieldPlus className={className} strokeWidth={1.85} />;
    case 'home':
      return <Home className={className} strokeWidth={1.85} />;
    case 'tmt':
      return <HeartPulse className={className} strokeWidth={1.85} />;
  }
}
