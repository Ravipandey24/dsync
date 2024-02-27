"use client";

import { deleteUserCompletely } from "@/db";
import {
  approveRegisterationRequest,
  deleteRegisterationRequest,
} from "@/db/redis/api";
import { RegisterDataType, UserDataType } from "@/db/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { FC, Key, useCallback, useMemo } from "react";
import { toast } from "sonner";
import ErrorCard from "../cards/ErrorCard";
import DeleteModal from "../ui/modal";

interface RegisterTableProps {
  registerData: RegisterDataType[];
}

const RegisterTable: FC<RegisterTableProps> = ({ registerData }) => {
  const columns = [
    { key: "username", name: "Username" },
    { key: "email", name: "Email" },
    { key: "profession", name: "Profession" },
    { key: "favouriteSeries", name: "Favourite Series" },
    { key: "favouriteMusicArtist", name: "Favourite Music Artist" },
    { key: "actions", name: "Actions" },
  ];

  const classNames = useMemo(
    () => ({
      wrapper: ["w-full", "bg-background/80"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "mt-2",
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );
  const renderCell = useCallback(
    (rowData: RegisterDataType, columnKey: Key) => {
      const cellValue =
        columnKey !== "actions"
          ? rowData[columnKey as keyof RegisterDataType]
          : null;
      switch (columnKey) {
        case "username":
          return <span className="text-bold text-base">{cellValue}</span>;
        case "email":
          return <span className="text-base">{cellValue}</span>;
        case "profession":
          return <span className="text-base">{cellValue}</span>;
        case "favouriteSeries":
          return <span className="text-base">{cellValue}</span>;
        case "favouriteMusicArtist":
          return <span className="text-base">{cellValue}</span>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="success" content="Approve">
                <Button
                  isIconOnly
                  variant="shadow"
                  color="success"
                  onClick={() => handleCreateUser(rowData)}
                >
                  <CheckIcon className="h-6 w-6" />
                </Button>
              </Tooltip>
                <DeleteModal onDelete={handleDelete} data={rowData}>
                  <span>Do you really want to delete this request?</span>
                </DeleteModal>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const handleDelete = async (data: RegisterDataType) => {
    const { success } = await deleteRegisterationRequest(data);
    if (success) {
      toast.success("Request deleted successfully");
    } else {
      toast.error("Failed to delete request!");
    }
  };
  const handleCreateUser = async (registerData: RegisterDataType) => {
    const { success, message } = await approveRegisterationRequest(
      registerData
    );
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  if (!registerData.length) {
    return (
      <ErrorCard
        className="w-72 mx-auto"
        heading="No requests"
        description="No requests to show!"
      ></ErrorCard>
    );
  }

  return (
    <Table aria-label="register datatable" classNames={classNames} shadow="md">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            className="text-base"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={registerData}>
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => (
              <TableCell id={columnKey + item.email}>
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

interface UserTableProps {
  userData: UserDataType[];
}

const UserTable: FC<UserTableProps> = ({ userData }) => {
  const columns = [
    { key: "username", name: "Username" },
    { key: "email", name: "Email" },
    { key: "profession", name: "Profession" },
    { key: "dataUsage", name: "Data Usage" },
    { key: "role", name: "Role" },
    { key: "actions", name: "Actions" },
  ];

  const classNames = useMemo(
    () => ({
      wrapper: ["w-full", "bg-background/80", "border", "border-content1"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "mt-2",
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );
  const renderCell = useCallback((rowData: UserDataType, columnKey: Key) => {
    const cellValue =
      columnKey !== "actions" ? rowData[columnKey as keyof UserDataType] : null;
    switch (columnKey) {
      case "username":
        return <span className="text-bold text-base">{cellValue}</span>;
      case "email":
        return <span className="text-base">{cellValue}</span>;
      case "profession":
        return <span className="text-base">{cellValue}</span>;
      case "dataUsage":
        return <span className="text-base">{cellValue}</span>;
      case "role":
        return <span className="text-base capitalize">{cellValue}</span>;
      case "actions":
        return (
          <div className="flex items-center justify-start pl-2">
            {rowData.role !== "admin" && (
              <DeleteModal onDelete={handleDelete} data={rowData}>
                <span>Do you really want to delete this User?</span>
              </DeleteModal>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDelete = async (userData: UserDataType) => {
    const { success } = await deleteUserCompletely(userData);
    if (success) {
      toast.success("user deleted successfully");
    } else {
      toast.error("Failed to delete user!");
    }
  };

  if (!userData.length) {
    return (
      <ErrorCard
        className="w-72 mx-auto"
        heading="No users"
        description="No users to show!"
      ></ErrorCard>
    );
  }

  return (
    <Table aria-label="register datatable" classNames={classNames} shadow="md">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            className="text-base"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={userData}>
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => (
              <TableCell id={columnKey + item.email}>
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { RegisterTable, UserTable };
