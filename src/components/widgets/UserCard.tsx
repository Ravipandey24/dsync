"use client";

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

  const handleProfileClick = () => {
    router.push("/user-profile");
  };
  
  if (!isLoaded) return null;

  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content:
          "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
    >
      <DropdownTrigger>
        <User
          className="hover:cursor-pointer"
          name={user?.username?.toLocaleUpperCase()}
          description="Product Designer"
          avatarProps={{
            src: user?.imageUrl
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="profile dropdown" variant="faded">
        <DropdownItem
          key="profile"
          className="h-12"
          onClick={handleProfileClick}
        >
          Profile
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
