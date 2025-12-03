import "@/app/globals.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-grid">
      <main className="contenido">{children}</main>
    </div>
  );
}
