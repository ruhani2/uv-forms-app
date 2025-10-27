import { Box, Typography } from "@mui/material";
import NameInformation from "../PersonalInformationStep/NameInformation";
import InititationDetails from "../InititationDetailsStep/InititationDetails";

const MotherDetailsStep = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Mother's Details
      </Typography>
      <NameInformation namePrefix="mother" />
      <InititationDetails namePrefix="mother" />
    </Box>
  );
};

export default MotherDetailsStep;
