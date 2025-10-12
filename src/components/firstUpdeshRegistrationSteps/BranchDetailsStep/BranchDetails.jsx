import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import NameInformation from "../PersonalInformationStep/NameInformation";
import Address from "../../shared/Address";

const BranchDetails = ({ namePrefix }) => {
  const { control, watch, setValue } = useFormContext();

  const morningSatsang = useWatch({
    control,
    name: `${namePrefix}.currentBranchDetails.audioSatsangAttendance.morning`,
  });

  const eveningSatsang = useWatch({
    control,
    name: `${namePrefix}.currentBranchDetails.audioSatsangAttendance.evening`,
  });

  const participatedInSeva = useWatch({
    control,
    name: `${namePrefix}.currentBranchDetails.sevaInformation.participatedInSeva`,
  });

  useEffect(() => {
    const morning = Number(morningSatsang) || 0;
    const evening = Number(eveningSatsang) || 0;
    setValue(
      `${namePrefix}.currentBranchDetails.audioSatsangAttendance.total_count`,
      morning + evening
    );
  }, [morningSatsang, eveningSatsang, setValue, namePrefix]);

  const relatedToCBranchSecretary = useWatch({
    control,
    name: `${namePrefix}.currentBranchDetails.relatedToBranchSecretary`,
  });

  const loggedInUser =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user") ?? "null")
      : null;
  const role = loggedInUser?.role ?? null;
  const branch = loggedInUser?.branch ?? "";

  let facility = role === "centre_incharge" ? "Centre" : "Branch";
  let modifiedRole =
    role === "centre_incharge" ? "Centre Incharge" : "Branch Secretary";
  const expandRoleIfRelative =
    role === "centre_incharge" ? "Branch Secretary" : "Distt Secretary";

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Branch Details
      </Typography>
      {/* Name Information */}
      <Grid container spacing={2} my={3}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            disabled
            value={branch}
            label="Branch Name"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      {/* Attendance Information */}

      <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ alignContent: "center" }}>
        <Typography>Audio Satsang Attendance</Typography>
      </Grid>

      <Grid container spacing={2} my={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentBranchDetails.audioSatsangAttendance.morning`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Morning"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentBranchDetails.audioSatsangAttendance.evening`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Evening"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentBranchDetails.audioSatsangAttendance.total_count`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Total Count"
                fullWidth
                disabled
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ alignContent: "center" }}>
        <Typography>Seva Participation Information</Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Please mention if you have participated in any seva at the present
          {` ${facility}.`}
        </Typography>
      </Grid>

      <Grid container spacing={2} my={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentBranchDetails.sevaInformation.participatedInSeva`}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl size="small" fullWidth error={!!fieldState.error}>
                <InputLabel id="seva-label">Seva Participation</InputLabel>
                <Select
                  {...field}
                  labelId="seva-label"
                  label="Seva Participation"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {participatedInSeva === "yes" && (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentBranchDetails.sevaInformation.sevaDetails`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Seva Details"
                  fullWidth
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        )}
      </Grid>

      <Box my={5}>
        <Typography variant="h6" gutterBottom>
          {`${modifiedRole}`} Information
        </Typography>
        <NameInformation
          namePrefix={`${namePrefix}.currentBranchDetails.branchSecretaryDetails`}
        />
        <Grid container spacing={2} my={2}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentBranchDetails.branchSecretaryDetails.email`}
              control={control}
              disabled
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  label="Email Address"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentBranchDetails.branchSecretaryDetails.mobileNumber`}
              control={control}
              disabled
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  label="Mobile Number"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box>
          <Typography gutterBottom mb={2}>
            Address Information
          </Typography>
          <Address
            namePrefix={`${namePrefix}.currentBranchDetails.branchSecretaryDetails`}
            addressType="currentAddress"
          />
        </Box>

        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ alignContent: "center" }}
          mt={3}
          mb={2}
        >
          <Typography>Relation Information with {`${modifiedRole}`}</Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Please mention if applicant is related to {`${modifiedRole}`}
          </Typography>
        </Grid>

        <Grid container spacing={2} my={2}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentBranchDetails.relatedToBranchSecretary`}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl size="small" fullWidth error={!!fieldState.error}>
                  <InputLabel id="seva-label">
                    Related to {`${modifiedRole}`}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="seva-label"
                    label={`Related to ${modifiedRole}`}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {relatedToCBranchSecretary === "yes" && (
        <Box my={5}>
          <Typography variant="h6" gutterBottom>
            {`${expandRoleIfRelative}`} Information
          </Typography>
          <NameInformation
            namePrefix={`${namePrefix}.currentBranchDetails.disttSecretaryDetails`}
          />

          <Box>
            <Typography gutterBottom mb={2}>
              Address Information
            </Typography>
            <Address
              namePrefix={`${namePrefix}.currentBranchDetails.disttSecretaryDetails`}
              addressType="currentAddress"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default BranchDetails;
