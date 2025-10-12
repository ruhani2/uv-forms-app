import { Box, Typography } from "@mui/material";
import NameInformation from "../PersonalInformationStep/NameInformation";
import InitiationDetails from "../InitiationDetailsStep/InitiationDetails";
import Occupation from "../OccupationStep/Occupation";
import { useFormContext } from "react-hook-form";
import {
  isGuardianPageRequired,
  isSpousePageRequired,
} from "../../../utils/registrationUtils";

const SpouseDetailsStep = () => {
  const { getValues } = useFormContext();
  const applicantGender = getValues("applicant.gender");
  const maritalStatus = getValues("applicant.maritalStatus");

  let spousePrefix = null;

  if (maritalStatus === "married") {
    spousePrefix = "spouse";
  }

  console.log("Spouse page", getValues("applicant"));

  return (
    <Box>
      {isSpousePageRequired(getValues()) && (
        <Box mb={3}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Spouse Details
          </Typography>
          <NameInformation namePrefix={spousePrefix} />
          <InitiationDetails namePrefix={spousePrefix} />
          {applicantGender === "female" && (
            <Occupation namePrefix={spousePrefix} />
          )}
        </Box>
      )}

      {isGuardianPageRequired(getValues()) && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Guardian Details
          </Typography>
          <NameInformation namePrefix="guardian" />
          <InitiationDetails namePrefix="guardian" />
          <Occupation namePrefix="guardian" />
        </Box>
      )}
    </Box>
  );
};

export default SpouseDetailsStep;
