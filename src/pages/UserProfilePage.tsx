import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfileFormSkeleton = () => {
  return (
    <>
      <span>Loading...</span>
      <div className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64 mt-2" />
        </div>
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
    </>
  );
};

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <UserProfileFormSkeleton />;
  }

  if (!currentUser) {
    return <span>Failed to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}
