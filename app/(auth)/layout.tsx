export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="bg-primary lg:w-[555px]"></div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
