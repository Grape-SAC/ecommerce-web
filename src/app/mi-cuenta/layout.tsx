
import BottomNavBar from "@/components/layout/bottom-nav-bar/bottom-nav-bar";
import "@/app/globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-grid">
      <div></div>
      <main className="contenido">{children}</main>
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
