import CentreDetails from "./CentreDetails";
import BranchDetails from "./BranchDetails";
import { useSession } from "next-auth/react";

const MainBranchDetails = ({ namePrefix }) => {
  const { data: session } = useSession();
  const role = session?.user?.role ?? null;

  return (
    <>
      {role === "centre_incharge" && <CentreDetails namePrefix={namePrefix} />}
      {role === "branch_secretary" && <BranchDetails namePrefix={namePrefix} />}
    </>
  );
};

export default MainBranchDetails;
