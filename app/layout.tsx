import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculator Tools",
  description: "Collection of online calculators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}