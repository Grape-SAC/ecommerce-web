import "@/app/globals.css";
import Header from "@/components/layout/header/header";

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="layout-grid">
      <Header
        showLogo={false}
        showSearch={false}
        showCart={false}
        showBack={true}
        title="Detalle del pedido"
        backHref="/mis-pedidos"
        backAbsolute={true}
        justify="center"
      />
      <main className="contenido">{children}</main>
    </div>
  );
}
