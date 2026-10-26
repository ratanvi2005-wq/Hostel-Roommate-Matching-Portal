import "./globals.css";

export const metadata = {
  title: "ApnaHostel - India's Premier Student & PG Accommodation",
  description: "Find verified boys and girls hostels in Kota, Delhi, Bengaluru, Pune with 3-times mess, Wi-Fi, power backup and zero brokerage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
