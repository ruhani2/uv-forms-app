import { getLoggedInUser } from "@/utils/auth";

const loggedInUser = getLoggedInUser();
let role;
let branch;
let centre;

if (loggedInUser !== null) {
  role = loggedInUser.role;
  branch = loggedInUser.branch;
  centre = loggedInUser.centre;
}

export const facilityDefaults = {
  applicant: {
    currentBranchDetails: {
      audioSatsangAttendance: {
        morning: 0,
        evening: 0,
        total_count: 0,
      },
      sevaInformation: {
        participatedInSeva: "yes",
        sevaDetails: "",
      },
      branchSecretaryDetails: {
        prefix: "SH",
        firstName: loggedInUser?.firstName || "Sanjay",
        middleName: loggedInUser?.middleName || "",
        lastName: loggedInUser?.lastName || "Srivastava",
        mobileNumber: loggedInUser?.phone?.number || "1234567890",
        email: loggedInUser?.email || "test123@gmail.com",
        currentAddress: {
          houseNo: loggedInUser?.houseNo || "Test house no.",
          landmark: loggedInUser?.landmark || "Test landmark",
          city: loggedInUser?.city || "agra",
          state: loggedInUser?.state || "Uttar Pradesh",
          country: loggedInUser?.country || null,
          pincode: loggedInUser?.pincode || "123456",
        },
      },
      relatedToBranchSecretary: "no",
      disttSecretaryDetails: {
        prefix: "SH",
        firstName: loggedInUser?.firstName || "Sanjay Distt Secretary",
        middleName: loggedInUser?.middleName || "",
        lastName: loggedInUser?.lastName || "Srivastava",
        currentAddress: {
          houseNo: loggedInUser?.houseNo || "Distt Sec Test house no.",
          landmark: loggedInUser?.landmark || "Distt Sec Test landmark",
          city: loggedInUser?.city || "Delhi",
          state: loggedInUser?.state || "Delhi",
          country: loggedInUser?.country || null,
          pincode: loggedInUser?.pincode || "92345",
        },
      },
    },
    currentCentreDetails: {
      audioSatsangAttendance: {
        morning: 0,
        evening: 0,
        total_count: 0,
      },
      sevaInformation: {
        participatedInSeva: "yes",
        sevaDetails: "",
      },
      centreInchargeDetails: {
        prefix: "SH",
        firstName: loggedInUser?.firstName || "Sanjay Centre Incharge",
        middleName: loggedInUser?.middleName || "",
        lastName: loggedInUser?.lastName || "Srivastava",
        mobileNumber: loggedInUser?.phone?.number || "1234567890",
        email: loggedInUser?.email || "test123@gmail.com",
        currentAddress: {
          houseNo: loggedInUser?.houseNo || "Test house no.",
          landmark: loggedInUser?.landmark || "Test landmark",
          city: loggedInUser?.city || "agra",
          state: loggedInUser?.state || "Uttar Pradesh",
          country: loggedInUser?.country || null,
          pincode: loggedInUser?.pincode || "123456",
        },
      },
      branchSecretaryDetails: {
        prefix: "SH",
        firstName: loggedInUser?.firstName || "Sanjay Branch Secretary",
        middleName: loggedInUser?.middleName || "",
        lastName: loggedInUser?.lastName || "Srivastava",
        currentAddress: {
          houseNo: loggedInUser?.houseNo || "Branch Sec Test house no.",
          landmark: loggedInUser?.landmark || "Branch Sec Test landmark",
          city: loggedInUser?.city || "agra",
          state: loggedInUser?.state || "Uttar Pradesh",
          country: loggedInUser?.country || null,
          pincode: loggedInUser?.pincode || "282005",
        },
      },
      relatedToCentreIncharge: "no",
    },
  },
};
