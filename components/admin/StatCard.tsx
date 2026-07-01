export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="rounded-md border border-line/70 bg-paper px-5 py-5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-wider text-ink-soft/70">
          {label}
        </span>
        <span className="text-[18px]">{icon}</span>
      </div>
      <p className="mt-2 font-display text-[28px] text-ink">{value}</p>
    </div>
  );
}
