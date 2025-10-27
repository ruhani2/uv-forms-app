import CentreDetails from "./CentreDetails";
import BranchDetails from "./BranchDetails";
import { getLoggedInUser } from "@/utils/auth";

const MainBranchDetails = ({ namePrefix }) => {
  const loggedInUser = getLoggedInUser();
  const role = loggedInUser?.role ?? null;

  return (
    <>
      {role === "centre_incharge" && <CentreDetails namePrefix={namePrefix} />}
      {role === "branch_secretary" && <BranchDetails namePrefix={namePrefix} />}
    </>
  );
};

export default MainBranchDetails;
