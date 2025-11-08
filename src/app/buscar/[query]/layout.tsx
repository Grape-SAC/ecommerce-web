
import BottomNavBar from "@/components/layout/bottom-nav-bar/bottom-nav-bar";
import "@/app/globals.css";
import { ReactNode } from "react";
import Header from "@/components/layout/header/header";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-grid">
      <Header />
      <main className="contenido">{children}</main>
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
