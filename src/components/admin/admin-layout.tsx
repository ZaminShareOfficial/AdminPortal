import { Sidebar } from "@/components/admin/sidebar";
import { TopNav } from "@/components/admin/top-nav";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      <Sidebar />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopNav />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </main>

      <div className="pointer-events-none fixed left-0 top-0 z-[-1] h-full w-full overflow-hidden opacity-20">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[5%] h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
      </div>
    </div>
  );
}
