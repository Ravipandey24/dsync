import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="container mx-auto flex justify-center py-6">
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
