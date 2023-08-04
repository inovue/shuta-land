import '~/styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head lang='jp' />
      <body>{children}</body>
    </html>
  );
}