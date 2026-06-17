type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

export function Icon({ name, className = "", filled = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-block shrink-0 leading-none ${filled ? "material-symbols-filled" : ""} ${className}`.trim()}
      aria-hidden
    >
      {name}
    </span>
  );
}
