"use client";

import { cn } from "@/lib/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserCard = ({}) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();
  const isUserAdmin = user?.publicMetadata?.isAdmin as boolean;

  if (!isLoaded) return null;

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <User
          className="hover:cursor-pointer"
          name={user?.username?.toLocaleUpperCase()}
          description={user?.publicMetadata?.profession as string}
          avatarProps={{
            src: user?.imageUrl,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="profile dropdown" variant="flat">
        <DropdownItem
          key="profile"
          className="h-12"
          onClick={() => router.push("/dashboard/user-profile")}
        >
          Profile
        </DropdownItem>
          <DropdownItem
          textValue="Admin Panel"
            key="admin"
            className={cn("h-12", !isUserAdmin && "hidden")}
            onClick={() => router.push("/dashboard/admin")}
          >
            Admin Panel
          </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-lg text-danger h-12"
          color="danger"
          onClick={() => signOut(() => router.push("/login"))}
        >
          <div className="flex items-center justify-between">
            <span>Logout</span>
            <ExitIcon></ExitIcon>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserCard;
