import { GetServerSideProps, NextPage } from "next";
import AccountForm from "@/components/ui/forms/AccountForm";
import { useAuth } from "@/context/AuthContext";

const AccountPage: NextPage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {user.uid && <AccountForm user={user} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  );
  return { props: { title: "Account" } };
};

export default AccountPage;
