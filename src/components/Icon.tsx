type IconProps = {
  name: string;
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className ? className : "size-6"}
      stroke="currentColor"
      fill="none"
      aria-hidden="true"
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
}
