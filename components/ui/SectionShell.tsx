import type { ReactNode } from 'react';

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function SectionShell({ id, children, className = '', innerClassName = '' }: SectionShellProps) {
  return (
    <section id={id} className={`section-layer ${className}`.trim()}>
      <div className={`site-container ${innerClassName}`.trim()}>{children}</div>
    </section>
  );
}
