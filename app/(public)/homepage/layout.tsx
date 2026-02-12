import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function HomepageLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
