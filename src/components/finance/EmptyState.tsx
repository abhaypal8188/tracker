import { MdOutlineInbox } from 'react-icons/md'

export function EmptyState({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200/70 bg-white/20 p-10 text-center dark:border-white/10 dark:bg-black/10">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
        <MdOutlineInbox className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          {subtitle}
        </div>
      </div>
    </div>
  )
}

