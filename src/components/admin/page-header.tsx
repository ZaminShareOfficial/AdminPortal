type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h1 className="font-headline text-3xl font-extrabold text-on-surface">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}
