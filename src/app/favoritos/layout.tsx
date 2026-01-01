import "@/app/globals.css";
import BottomNavBar from "@/components/layout/bottom-nav-bar/bottom-nav-bar";
import Header from "@/components/layout/header/header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-grid">
      <Header
        showLogo={false}
        showSearch={false}
        showCart={false}
        showBack={false}
        title="Mis Favoritos"
        justify="center"
      />
      <main className="contenido">{children}</main>
      <BottomNavBar />
    </div>
  );
}
