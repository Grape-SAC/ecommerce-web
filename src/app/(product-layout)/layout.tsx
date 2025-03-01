
import Header from "@/components/layout/Header/Header";
import "../globals.css";
import { ReactNode } from "react";
import BottomNavBar from "@/components/layout/BottomNavBar/BottomNavBar";

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
