import Image from "next/image";

export function OnyuLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/onyu-logo.svg"
      alt="Onyu"
      width={size}
      height={Math.round(size * (766 / 886))}
      className={className}
      priority
    />
  );
}
