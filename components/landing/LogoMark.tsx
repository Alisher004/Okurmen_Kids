import Image from 'next/image';

type LogoMarkProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
};

const sizes = {
  sm: { img: 40, text: 'text-base' },
  md: { img: 48, text: 'text-lg' },
  lg: { img: 56, text: 'text-xl' },
  xl: { img: 80, text: 'text-2xl' },
};

export default function LogoMark({
  size = 'md',
  showText = false,
  variant = 'dark',
}: LogoMarkProps) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Окурмен Kids"
        width={s.img}
        height={s.img}
        priority
        className="shrink-0 rounded-full object-contain drop-shadow-sm"
      />
      {showText && (
        <span className={`${s.text} font-bold leading-tight tracking-tight`}>
          <span className={variant === 'light' ? 'text-brand-gold-400' : 'text-brand-gold-500'}>Окурмен</span>{' '}
          <span className={variant === 'light' ? 'text-white' : 'text-brand-navy-600'}>Kids</span>
        </span>
      )}
    </div>
  );
}
