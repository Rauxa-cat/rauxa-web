import { SiteHeader } from '@/components/site/Header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      {/* Footer después */}
    </>
  );
}
