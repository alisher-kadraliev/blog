import { Navbar } from "@/components/admin-panel/navbar";
import BreadCrumb from "@/app/(protected)/(dashboard)/components/breadcrumb";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container pt-8 pb-8 px-4 sm:px-8">
        <BreadCrumb />
        {children}</div>
    </div>
  );
}
