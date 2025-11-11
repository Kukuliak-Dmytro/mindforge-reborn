import { LayoutModule } from "@/app/modules/shared/layout/";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutModule>{children}</LayoutModule>;
}
