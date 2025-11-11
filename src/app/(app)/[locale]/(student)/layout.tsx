import { LayoutModule } from "@/app/modules/shared/layout/";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutModule>{children}</LayoutModule>;
}
