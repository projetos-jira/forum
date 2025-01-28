import "./globals.css";

export const metadata = {
  title: "Forum",
  description: "Um fórum.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#232328" }}>{children}</body>
    </html>
  );
}
