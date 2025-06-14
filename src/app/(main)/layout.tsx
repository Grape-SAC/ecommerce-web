
import BottomNavBar from "@/shared/components/layout/BottomNavBar/BottomNavBar";
import Header from "@/shared/components/layout/Header/Header";
import "../globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-grid">
      <Header />
      <main className="contenido">{children}</main>
      <BottomNavBar />
    </div>
  );
};

export default Layout;
