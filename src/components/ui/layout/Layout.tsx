import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="h-full">
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;
