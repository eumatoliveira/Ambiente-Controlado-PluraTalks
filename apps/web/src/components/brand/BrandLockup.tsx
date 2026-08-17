import './brand-lockup.css';

type BrandLockupProps = {
  tone?: 'purple' | 'white';
  className?: string;
};

export function BrandLockup({ tone = 'purple', className = '' }: BrandLockupProps) {
  const wordmark = tone === 'white'
    ? '/brand/plura-logo-white.svg'
    : '/brand/plura-logo-purple.svg';
  const mark = tone === 'white'
    ? '/brand/plura-mark-white.svg'
    : '/brand/plura-mark-purple.svg';

  return (
    <span
      className={`brand-lockup brand-lockup--${tone} ${className}`.trim()}
      role="img"
      aria-label="Plura Talks"
    >
      <img className="brand-lockup__wordmark" src={wordmark} alt="" />
      <img className="brand-lockup__mark" src={mark} alt="" />
    </span>
  );
}
