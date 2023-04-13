import AccountForm from "@/components/ui/forms/AccountForm";
import { useAuth } from "@/context/AuthContext";

export default function Account() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-24">
      {user.uid && <AccountForm user={user} />}
    </div>
  );
}
