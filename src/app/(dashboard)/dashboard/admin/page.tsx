import ErrorCard from "@/components/cards/ErrorCard";
import AdminSection from "@/components/widgets/AdminSection";
import { getAllUserData } from "@/db";
import { getAllUsers, getRegisterationRequests } from "@/db/redis/api";
import { currentUser } from "@clerk/nextjs";
import { Card, CardBody } from "@nextui-org/card";

export default async function page({}) {
  const { requests } = await getRegisterationRequests();
  const { allUserData } = await getAllUserData();
  const isAdmin = (await currentUser())?.publicMetadata.isAdmin;
  if (!isAdmin) {
    return (
      <ErrorCard
        heading="Unauthorized"
        description="You are not authorized to access this page!"
      ></ErrorCard>
    );
  }
  return (
    <AdminSection registerRequests={requests} allUserData={allUserData}></AdminSection>
  );
}
