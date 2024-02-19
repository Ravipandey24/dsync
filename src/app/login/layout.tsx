import BlurImage from "@/components/widgets/BlurImage";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/lib/config";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DotBackground } from "@/components/widgets/GridDotBackground";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DotBackground>
      <div className="h-screen">
        <Link
          href="/"
          className="absolute text-gray-300 text-2xl font-semibold left-8 top-6 z-20 flex items-center tracking-tight"
        >
          <span>{siteConfig.name}</span>
        </Link>
        <div className="h-full flex justify-center items-center">
          {children}
        </div>
        {/* <AspectRatio ratio={16 / 9}>
        <BlurImage
          src="/images/auth-layout.jpg"
          alt="network of wires and metal structures in black and white"
          className="relative w-full inset-0 object-cover z-10 grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute text-gray-700 text-2xl font-semibold left-8 top-6 z-20 flex items-center tracking-tight"
        >
          <span>{siteConfig.name}</span>
        </Link>
        <main className="container z-20 absolute top-1/2 left-[calc(50%-14.6rem)] col-span-1 flex -translate-y-1/2 items-center">
          {children}
        </main>
        <div className="absolute bottom-6 right-2 z-20 text-gray-400 text-base">
          Photo by{" "}
          <Link
            href="https://unsplash.com/@alinnnaaaa"
            className="hover:underline text-gray-800"
          >
            Alina Grubnyak
          </Link>
          {" on "}
          <Link
            href="https://unsplash.com/photos/low-angle-photography-of-metal-structure-ZiQkhI7417A"
            className="hover:underline text-gray-800"
          >
            Unsplash
          </Link>
        </div>
      </AspectRatio> */}
      </div>
    </DotBackground>
  );
};

export default LoginLayout;
