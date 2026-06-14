"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/admin/icon";
import { mainNavItems } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-outline-variant/10 bg-surface-container-low">
      <div className="flex items-center gap-3 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-container">
          <Icon name="token" className="text-on-primary-fixed" filled />
        </div>
        <div>
          <p className="font-headline text-lg font-bold leading-tight text-on-surface">
            ZaminShare
          </p>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
            RWA Tokenization
          </p>
        </div>
      </div>

      <nav className="hide-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-4">
        <div className="mb-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-outline">
          Main Menu
        </div>
        {mainNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-surface-container-highest font-medium text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <Icon name={item.icon} className="text-[20px]" filled={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-outline-variant/10 p-4">
        <div className="flex items-center gap-3 rounded bg-surface-container p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
            AP
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-on-surface">
              Admin Profile
            </p>
            <p className="truncate text-[10px] text-on-surface-variant">
              Master Admin
            </p>
          </div>
          <Icon name="more_vert" className="text-sm text-on-surface-variant" />
        </div>
      </div>
    </aside>
  );
}
