export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={
        'animate-pulse rounded-3xl bg-slate-200/60 dark:bg-white/10 ' + className
      }
    />
  )
}

