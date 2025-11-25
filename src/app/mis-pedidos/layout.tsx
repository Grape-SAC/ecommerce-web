import "@/app/globals.css";
import BottomNavBar from "@/components/layout/bottom-nav-bar/bottom-nav-bar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-grid">
      <div></div>
      <main className="contenido">{children}</main>
      <BottomNavBar />
    </div>
  );
}
