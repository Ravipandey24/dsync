import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/lib/config";


export default function Header() {
  return (
    <Navbar className="container mx-auto max-w-full" position="static">
      <NavbarBrand>
        <span className={siteConfig.headingFont.className + " text-3xl font-bold text-inherit"}>DSync</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem as="div" className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
