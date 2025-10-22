import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const NameInformation = ({ namePrefix }) => {
  const { control, setValue } = useFormContext();
  const applicantGender = useWatch({
    control,
    name: "applicant.gender",
  });

  const applicantNamePrefix = useWatch({
    control,
    name: "applicant.prefix",
  });

  const fatherNamePrefix = useWatch({
    control,
    name: "father.prefix",
  });

  const motherNamePrefix = useWatch({
    control,
    name: "mother.prefix",
  });

  const applicantFirstName = useWatch({
    control,
    name: "applicant.firstName",
  });

  const fatherFirstName = useWatch({
    control,
    name: "father.firstName",
  });

  const motherFirstName = useWatch({
    control,
    name: "mother.firstName",
  });

  const applicantMiddleName = useWatch({
    control,
    name: "applicant.middleName",
  });

  const applicantLastName = useWatch({
    control,
    name: "applicant.lastName",
  });

  const fatherMiddleName = useWatch({
    control,
    name: "father.middleName",
  });

  const fatherLastName = useWatch({
    control,
    name: "father.lastName",
  });

  const motherMiddleName = useWatch({
    control,
    name: "mother.middleName",
  });

  const motherLastName = useWatch({
    control,
    name: "mother.lastName",
  });

  const currentCentreCentreIncharge =
    namePrefix === "applicant.currentCentreDetails.centreInchargeDetails";
  const currentCentreBranchSecretary =
    namePrefix === "applicant.currentCentreDetails.branchSecretaryDetails";
  const currentBranchBranchSecretary =
    namePrefix === "applicant.currentBranchDetails.branchSecretaryDetails";
  const currentBranchDisttSecretary =
    namePrefix === "applicant.currentBranchDetails.disttSecretaryDetails";

  const branchDetailsPage =
    currentCentreCentreIncharge ||
    currentCentreBranchSecretary ||
    currentBranchBranchSecretary ||
    currentBranchDisttSecretary;

  let prefixOptions = [];
  if (namePrefix === "applicant") {
    prefixOptions =
      applicantGender === "female" ? ["KM", "SMT", "Pbn"] : ["SH", "PB"];
  } else if (
    namePrefix === "father" ||
    (namePrefix === "spouse" && applicantGender === "female") ||
    branchDetailsPage
  ) {
    prefixOptions = ["SH", "PB", "Late PB", "Late SH"];
  } else if (
    namePrefix === "mother" ||
    (namePrefix === "spouse" && applicantGender === "male")
  ) {
    prefixOptions = ["SMT", "PBn", "Late PBn", "Late SMT"];
  } else if (namePrefix === "guardian") {
    prefixOptions = ["SH", "PB"];
  }

  useEffect(() => {
    console.log("I got changed", namePrefix);
    if (
      (namePrefix === "applicant" || namePrefix === "spouse") &&
      prefixOptions.length > 0
    ) {
      setValue(`${namePrefix}.prefix`, prefixOptions[0]);
    }
  }, [applicantGender, namePrefix]);

  const nameRendered = () => {
    if (namePrefix === "applicant")
      return `${applicantNamePrefix} ${applicantFirstName} ${applicantMiddleName} ${applicantLastName}`;
    if (namePrefix === "father")
      return `${fatherNamePrefix} ${fatherFirstName} ${fatherMiddleName} ${fatherLastName}`;
    if (namePrefix === "mother")
      return `${motherNamePrefix} ${motherFirstName} ${motherMiddleName} ${motherLastName}`;
  };

  return (
    <Box>
      <Typography>Name Information</Typography>

      <Box sx={{ display: "flex" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          gutterBottom
          sx={{ wordBreak: "break-word" }}
        >
          Name should be same as mentioned on AADHAR card
        </Typography>
      </Box>

      {((namePrefix === "applicant" && applicantFirstName?.trim().length > 0) ||
        (namePrefix === "father" && fatherFirstName?.trim().length > 0) ||
        (namePrefix === "mother" && motherFirstName?.trim().length > 0)) && (
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="caption"
            color="green"
            gutterBottom
            sx={{ wordBreak: "break-word" }}
          >
            Your name will be displayed as {nameRendered()}
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} my={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.prefix`}
            control={control}
            disabled={branchDetailsPage}
            render={({ field }) => {
              return (
                <FormControl size="small" fullWidth>
                  <InputLabel id="prefix-label">Prefix</InputLabel>
                  <Select {...field} labelId="prefix-label" label="Prefix">
                    {prefixOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.firstName`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  required
                  {...field}
                  disabled={branchDetailsPage}
                  label="First Name"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              );
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.middleName`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  {...field}
                  disabled={branchDetailsPage}
                  label="Middle Name"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              );
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.lastName`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  {...field}
                  disabled={branchDetailsPage}
                  label="Last Name"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              );
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NameInformation;
