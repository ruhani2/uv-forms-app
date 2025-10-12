import CentreDetails from "./CentreDetails";
import BranchDetails from "./BranchDetails";

const MainBranchDetails = ({ namePrefix }) => {
  const loggedInUser =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user") ?? "null")
      : null;
  const role = loggedInUser?.role ?? null;

  return (
    <>
      {role === "centre_incharge" && <CentreDetails namePrefix={namePrefix} />}
      {role === "branch_secretary" && <BranchDetails namePrefix={namePrefix} />}
    </>
  );
};

export default MainBranchDetails;
