"use client";

import { RegisterDataType, UserDataType } from "@/db/types";
import { Card, CardBody } from "@nextui-org/card";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { RegisterTable, UserTable } from "./DataTables";


interface AdminSectionProps {
  registerRequests: RegisterDataType[];
  allUserData: UserDataType[];
}

const AdminSection = ({ registerRequests, allUserData }: AdminSectionProps) => {
  const [selected, setSelected] = useState("users");
  return (
    <div className="container z-10 mx-auto px-4 space-y-3 py-6">
      <Card className="w-full bg-content1/90">
        <CardBody
          as="div"
          className="flex flex-row justify-between items-center"
        >
          <span className="text-lg ">Admin Dashboard</span>
          <Tabs
            aria-label="Options"
            variant="bordered"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            <Tab key="users" title="Users"></Tab>
            <Tab key="registerations" title="Registeration Requests"></Tab>
          </Tabs>
        </CardBody>
      </Card>
      {selected === "users" ? (
        <UserTable userData={allUserData}></UserTable>
      ) : selected === "registerations" ? (
        <RegisterTable registerData={registerRequests}></RegisterTable>
      ) : null}
    </div>
  );
};

export default AdminSection;
