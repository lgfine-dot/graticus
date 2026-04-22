type Props = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Graticule({ size = 32, className = "mark", style }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      aria-hidden="true"
      style={style}
    >
      <use href="#graticule" />
    </svg>
  );
}

export function GraticuleSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="graticule" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="48" cy="48" r="22" stroke="var(--copper-500)" strokeWidth="1.5" fill="none" />
        <line x1="48" y1="4" x2="48" y2="92" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="48" x2="92" y2="48" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="48" cy="48" r="3" fill="var(--copper-500)" />
      </symbol>
    </svg>
  );
}
