type IconProps = {
  event_id?: number;
  name: string;
  className?: string;
  onClick?: (id: number) => void;
};

export default function Icon({
  name,
  className,
  onClick,
  event_id,
}: IconProps) {
  return (
    <svg
      className={className ? className + " size-6" : " size-6"}
      stroke="currentColor"
      fill="none"
      aria-hidden="true"
      onClick={() => onClick && event_id && onClick(event_id)}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
}
