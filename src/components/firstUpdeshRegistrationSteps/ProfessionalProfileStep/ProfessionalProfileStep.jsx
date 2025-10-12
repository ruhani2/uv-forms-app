import { Box, Typography } from "@mui/material";
import Qualification from "../QualificationStep/Qualification";
import Occupation from "../OccupationStep/Occupation";

const ProfessionalProfileStep = () => {
  return (
    <Box>
      <Qualification namePrefix="applicant" />
      <Occupation namePrefix="applicant" />
    </Box>
  );
};

export default ProfessionalProfileStep;
