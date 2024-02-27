import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import UserCard from "../cards/UserCard";
import Link from "next/link";


export default function Header() {
  return (
    <Navbar maxWidth="full" position="sticky" className="container mx-auto top-0" isBlurred>
      <NavbarBrand>
        <Link href='/' className="text-2xl font-bold text-inherit tracking-tight">DSync</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem as="div" className="flex">
          <UserCard></UserCard>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
