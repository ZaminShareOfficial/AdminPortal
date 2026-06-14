export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Properties", href: "/properties", icon: "domain" },
  { label: "IPO Management", href: "/ipo", icon: "rocket_launch" },
  { label: "Orders & Trading", href: "/orders", icon: "swap_horiz" },
  { label: "Users & Brokers", href: "/users", icon: "group" },
  { label: "Finance", href: "/finance", icon: "payments" },
  { label: "Token Registry", href: "/tokens", icon: "toll" },
  { label: "Complaints", href: "/complaints", icon: "report" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
