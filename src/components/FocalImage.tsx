import { useState } from 'react';
import { Microscope } from 'lucide-react';

interface FocalImageProps {
  src: string;
  alt: string;
  /** Crop rectangle in percentages (0-100) of the source image */
  crop: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  /** Natural dimensions of the source image to preserve exact 1:1 aspect ratio */
  naturalSize: {
    width: number;
    height: number;
  };
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
}

export function FocalImage({
  src,
  alt,
  crop,
  naturalSize,
  className = '',
  imgClassName = '',
  fallbackLabel = 'Rudransh Healthcare & Path Lab',
}: FocalImageProps) {
  const [hasError, setHasError] = useState(false);

  const cropPixelW = (crop.width / 100) * naturalSize.width;
  const cropPixelH = (crop.height / 100) * naturalSize.height;
  const aspectRatio = cropPixelW / cropPixelH;

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF6FF] to-[#D4ECFF] text-[#06346B] ${className}`}
        style={{ aspectRatio: `${aspectRatio}` }}
        role="img"
        aria-label={alt}
      >
        <Microscope className="w-10 h-10 text-[#0756A6] mb-2" />
        <span className="text-xs font-medium text-center px-3">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`absolute max-w-none pointer-events-none select-none ${imgClassName}`}
        style={{
          width: `${(100 / crop.width) * 100}%`,
          height: `${(100 / crop.height) * 100}%`,
          left: `${-(crop.left / crop.width) * 100}%`,
          top: `${-(crop.top / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}
