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

const CentreDetails = ({ namePrefix }) => {
  const { control, watch, setValue } = useFormContext();

  const morningSatsang = useWatch({
    control,
    name: `${namePrefix}.currentCentreDetails.audioSatsangAttendance.morning`,
  });

  const eveningSatsang = useWatch({
    control,
    name: `${namePrefix}.currentCentreDetails.audioSatsangAttendance.evening`,
  });

  const participatedInSeva = useWatch({
    control,
    name: `${namePrefix}.currentCentreDetails.sevaInformation.participatedInSeva`,
  });

  useEffect(() => {
    const morning = Number(morningSatsang) || 0;
    const evening = Number(eveningSatsang) || 0;
    setValue(
      `${namePrefix}.currentCentreDetails.audioSatsangAttendance.total_count`,
      morning + evening
    );
  }, [morningSatsang, eveningSatsang, setValue, namePrefix]);

  const relatedToCentreIncharge = useWatch({
    control,
    name: `${namePrefix}.currentCentreDetails.relatedToCentreIncharge`,
  });

  const loggedInUser =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user") ?? "null")
      : null;
  const role = loggedInUser?.role ?? null;
  const centre = loggedInUser?.centre ?? "";

  let facility = role === "centre_incharge" ? "Centre" : "Branch";
  let modifiedRole =
    role === "centre_incharge" ? "Centre Incharge" : "Branch Secretary";

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Current Centre Details
      </Typography>
      {/* Name Information */}
      <Grid container spacing={2} my={3}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            disabled
            value={centre}
            label="Centre Name"
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
            name={`${namePrefix}.currentCentreDetails.audioSatsangAttendance.morning`}
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
            name={`${namePrefix}.currentCentreDetails.audioSatsangAttendance.evening`}
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
            name={`${namePrefix}.currentCentreDetails.audioSatsangAttendance.total_count`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Total Count"
                fullWidth
                size="small"
                disabled
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
            name={`${namePrefix}.currentCentreDetails.sevaInformation.participatedInSeva`}
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

        {participatedInSeva === "Yes" && (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentCentreDetails.sevaInformation.sevaDetails`}
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
          namePrefix={`${namePrefix}.currentCentreDetails.centreInchargeDetails`}
        />
        <Grid container spacing={2} my={2}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.currentCentreDetails.centreInchargeDetails.email`}
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
              name={`${namePrefix}.currentCentreDetails.centreInchargeDetails.mobileNumber`}
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
            namePrefix={`${namePrefix}.currentCentreDetails.centreInchargeDetails`}
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
              name={`${namePrefix}.currentCentreDetails.relatedToCentreIncharge`}
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

      {relatedToCentreIncharge === "yes" && (
        <Box my={5}>
          <Typography variant="h6" gutterBottom>
            Branch Secretary Information
          </Typography>
          <NameInformation
            namePrefix={`${namePrefix}.currentCentreDetails.branchSecretaryDetails`}
          />

          <Box>
            <Typography gutterBottom mb={2}>
              Address Information
            </Typography>
            <Address
              namePrefix={`${namePrefix}.currentCentreDetails.branchSecretaryDetails`}
              addressType="currentAddress"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CentreDetails;
