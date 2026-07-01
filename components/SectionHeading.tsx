import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-brass-deep">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display mt-2 text-[28px] leading-tight text-ink md:text-[32px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-lg text-[14.5px] text-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="shrink-0 border-b border-brass-deep/40 pb-0.5 text-[13px] font-medium text-brass-deep transition-colors hover:border-brass-deep"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
