import { HomepageHeader } from '@/components/homepage';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
    </div>
  );
}