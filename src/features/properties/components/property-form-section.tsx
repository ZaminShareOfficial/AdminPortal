import type { ReactNode } from "react";

type PropertyFormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const PropertyFormSection = ({
  title,
  description,
  children
}: PropertyFormSectionProps) => (
  <section className="space-y-4">
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">
        {title}
      </h3>
      {description ? (
        <p className="mt-1 text-xs text-on-surface-variant">{description}</p>
      ) : null}
    </div>
    {children}
  </section>
);
