import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="relative hidden w-full flex-1 items-center justify-center lg:flex">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: 'url("/auth-bg.png")' }}
        />
        <Link
          href="/homepage"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-2 hover:bg-white transition-colors"
        >
          <Home className="w-5 h-5 text-black" />
          <span className="text-sm font-medium text-black">Home</span>
        </Link>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-white px-6 py-12 lg:px-12">
        <div className="w-full max-w-100 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/abcineplex-logo.png"
              alt="abcineplex"
              width={300}
              height={300}
            />
          </div>
          {children}
          <p className="text-center text-xs text-gray-500">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline">Terms of Service</a> and{" "}
            <a href="/policy" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}