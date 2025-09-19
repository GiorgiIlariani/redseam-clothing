import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Image
        src="/assets/signup-img.png"
        alt="handEye"
        width={948}
        height={1000}
      />
      {children}
    </main>
  );
}
