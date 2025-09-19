import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <div className="hidden lg:block lg:w-1/2 xl:w-[948px]">
        <Image
          src="/assets/signup-img.png"
          alt="handEye"
          width={948}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 lg:w-1/2">
        {children}
      </div>
    </main>
  );
}
