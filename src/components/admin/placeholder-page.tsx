import { PageHeader } from "@/components/admin/page-header";

const pages = {
  properties: {
    eyebrow: "Asset Management",
    title: "Property Management",
    description:
      "Manage property listings, valuations, and onboarding workflows across the ZaminShare platform.",
  },
  ipo: {
    eyebrow: "Capital Markets",
    title: "IPO Management",
    description:
      "Launch, monitor, and manage initial property offerings and subscription activity.",
  },
  orders: {
    eyebrow: "Market Surveillance",
    title: "Order Surveillance",
    description:
      "Monitor live order flow, trading activity, and secondary market execution.",
  },
  users: {
    eyebrow: "Access Control",
    title: "User & Broker Management",
    description:
      "Review investor accounts, broker onboarding, and platform access permissions.",
  },
  finance: {
    eyebrow: "Treasury",
    title: "Revenue Analytics & Payouts",
    description:
      "Track platform revenue, payout schedules, and financial performance metrics.",
  },
  tokens: {
    eyebrow: "Registry",
    title: "Token Holder Registry",
    description:
      "View tokenized asset ownership, holder distribution, and registry records.",
  },
  complaints: {
    eyebrow: "Support",
    title: "Complaints",
    description:
      "Review and resolve investor complaints and platform support escalations.",
  },
  settings: {
    eyebrow: "Configuration",
    title: "Settings",
    description:
      "Configure platform policies, notification rules, and admin preferences.",
  },
} as const;

type PlaceholderPageProps = {
  page: keyof typeof pages;
};

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  const content = pages[page];

  return (
    <div className="hide-scrollbar flex-1 overflow-y-auto p-8">
      <PageHeader {...content} />
      <div className="rounded border border-dashed border-outline-variant/30 bg-surface-container p-10 text-center">
        <p className="text-sm text-on-surface-variant">
          This screen is wired into navigation and ready for Stitch UI
          implementation.
        </p>
      </div>
    </div>
  );
}
