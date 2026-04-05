import { MotionSection } from './MotionSection.jsx'

export function Section({
  id,
  title,
  eyebrow,
  children,
  className = '',
  sectionClassName = '',
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 py-16 sm:py-24 ${sectionClassName}`}
    >
      <MotionSection className={className}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {(eyebrow || title) && (
            <header className="mb-10">
              {eyebrow && (
                <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.75rem] dark:text-neutral-50">
                  {title}
                </h2>
              )}
            </header>
          )}
          {children}
        </div>
      </MotionSection>
    </section>
  )
}
