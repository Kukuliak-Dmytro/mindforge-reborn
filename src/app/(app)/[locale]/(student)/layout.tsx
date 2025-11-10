import { LayoutModule } from "@/app/modules/layout/layout.module";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutModule>{children}</LayoutModule>;
}
