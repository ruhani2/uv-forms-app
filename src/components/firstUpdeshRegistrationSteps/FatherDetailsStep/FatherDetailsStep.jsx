import { Box, Typography } from "@mui/material";
import NameInformation from "../PersonalInformationStep/NameInformation";
import InitiationDetails from "../InitiationDetailsStep/InitiationDetails";
import Occupation from "../OccupationStep/Occupation";

const FatherDetailsStep = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Father's Details
      </Typography>
      <NameInformation namePrefix="father" />
      <InitiationDetails namePrefix="father" />
      <Box my={2}>
        <Occupation namePrefix="father" />
      </Box>

      <Box my={3}>
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          Mother's Details
        </Typography>
        <NameInformation namePrefix="mother" />
        <InitiationDetails namePrefix="mother" />
      </Box>
    </Box>
  );
};

export default FatherDetailsStep;