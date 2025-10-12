export const isSpousePageRequired = (values) => {
  const { applicant } = values;
  if (!applicant) return false;
  const { gender, maritalStatus } = applicant;

  const isFemale = gender === "female";
  const isMarried = maritalStatus === "married";

  return isFemale && isMarried;
};

export const isGuardianPageRequired = (values) => {
  const { applicant, father } = values;
  if (!applicant) return false;
  const { gender, maritalStatus, occupation } = applicant;
  const fatherIsDeceased = father?.prefix?.includes("Late");
  const fatherSalary = father?.occupation?.salary;
  const fatherOccupation = father?.occupation?.type;
  const applicantSalary = occupation?.salary;

  const isFemale = gender === "female";
  const isMarried = maritalStatus === "married";
  console.log("Guardian Hello", fatherSalary);
  if (isFemale) {
    if (!isMarried) {
      if (
        fatherIsDeceased ||
        !fatherSalary ||
        fatherSalary === 0 ||
        fatherOccupation === "unemployed"
      ) {
        return true;
      }
    }
  } else {
    console.log("AM I true", !applicantSalary || applicantSalary === 0);
    if (
      (!applicantSalary || applicantSalary === 0) &&
      (fatherIsDeceased ||
        !fatherSalary ||
        fatherSalary === 0 ||
        fatherOccupation === "unemployed")
    ) {
      return true;
    }
  }

  return false;
};
