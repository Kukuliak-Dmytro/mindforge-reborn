import { FC, ReactNode } from "react";

//interface
interface IProps {
  children: ReactNode;
}

//component
/**
 * AuthLayout component for authentication pages.
 * This layout bypasses the parent LayoutModule (header/footer).
 * Just renders children directly.
 */
export const AuthLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  //return
  return <>{children}</>;
};

export default AuthLayout;
