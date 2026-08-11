import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <section className="">{children}</section>;
};

export default AuthLayout;
