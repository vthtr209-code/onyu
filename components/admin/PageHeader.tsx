import Link from "next/link";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-display text-[24px] text-ink">{title}</h1>
        {description && (
          <p className="mt-1 text-[14px] text-ink-soft">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-md bg-brass px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory"
        >
          + {action.label}
        </Link>
      )}
    </div>
  );
}
