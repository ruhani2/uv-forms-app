import { Box, Typography } from "@mui/material";
import NameInformation from "../PersonalInformationStep/NameInformation";
import InitiationDetails from "../InitiationDetailsStep/InitiationDetails";
import Occupation from "../OccupationStep/Occupation";

const GuardianDetailsStep = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Guardian Details
      </Typography>
      <NameInformation namePrefix="guardian" />
      <InitiationDetails namePrefix="guardian" />
      <Occupation namePrefix="guardian" />
    </Box>
  );
};

export default GuardianDetailsStep;