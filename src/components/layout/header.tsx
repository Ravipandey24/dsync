import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import UserCard from "../widgets/UserCard";


export default function Header() {
  return (
    <Navbar maxWidth="full" className="container mx-auto sticky top-0" isBlurred>
      <NavbarBrand>
        <span className="text-2xl font-bold text-inherit tracking-tight">DSync</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem as="div" className="flex">
          <UserCard></UserCard>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
