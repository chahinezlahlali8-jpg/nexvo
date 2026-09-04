import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export function BrandLogo({ size = 'md', showName = true, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${sizes[size]} relative shrink-0 overflow-hidden rounded-lg bg-white`}>
        <Image src="/WhatsApp_Image_2026-08-19_at_11.14.50_AM.jpeg" alt="NEXVO logo" fill sizes="48px" className="object-contain" priority={size !== 'sm'} />
      </div>
      {showName && <span className="font-display font-semibold tracking-tight">NEXVO</span>}
    </div>
  );
}
