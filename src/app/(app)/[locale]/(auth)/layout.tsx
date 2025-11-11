import { FC, ReactNode } from "react";
import { AuthHeaderComponent } from "@/app/widgets/auth-header";

//interface
interface IProps {
  children: ReactNode;
}

//component
/**
 * AuthLayout component for authentication pages.
 * This layout bypasses the parent LayoutModule (header/footer).
 * Includes auth header with logo, language switcher, and theme switcher.
 * Handles centering and background for auth pages.
 */
export const AuthLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  //return
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthHeaderComponent />
      <div
        className="flex-1 flex items-center justify-center bg-linear-to-br
          from-background via-foreground to-background">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
