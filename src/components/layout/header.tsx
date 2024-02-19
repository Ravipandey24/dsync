import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/lib/config";
import UserCard from "../widgets/UserCard";


export default function Header() {
  return (
    <Navbar maxWidth="full" className="container mx-auto sticky top-0" isBlurred>
      <NavbarBrand>
        <span className={" text-3xl font-bold text-inherit"}>DSync</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem as="div" className="flex">
          <UserCard></UserCard>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
