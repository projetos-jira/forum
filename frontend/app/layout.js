import "./globals.css";

export const metadata = {
  title: "Forum",
  description: "Um fórum.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
