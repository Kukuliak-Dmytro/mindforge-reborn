"use client";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { LayoutModule } from "./layout.module";

//interface
interface IProps {
  children: ReactNode;
}

//component
/**
 * AuthLayoutWrapper component.
 * Conditionally renders LayoutModule (header/footer) only for non-auth routes.
 */
export const AuthLayoutWrapper: FC<Readonly<IProps>> = (props) => {
  const { children } = props;
  const pathname = usePathname();

  // Check if current route is an auth route
  const isAuthRoute = pathname?.includes("/login") || 
                      pathname?.includes("/register") || 
                      pathname?.includes("/forgot-password") ||
                      pathname?.includes("/update-password");

  //return
  if (isAuthRoute) {
    return <>{children}</>;
  }

  return <LayoutModule>{children}</LayoutModule>;
};

