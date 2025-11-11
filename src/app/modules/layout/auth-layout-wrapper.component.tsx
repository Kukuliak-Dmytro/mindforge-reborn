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

  return <LayoutModule>{children}</LayoutModule>;
};
