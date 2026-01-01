import "@/app/globals.css";
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
        showSearch={true}
        showCart={true}
        showBack={true}
        title=""
        shadow={true}
      />
      <main className="contenido">{children}</main>
    </div>
  );
}
