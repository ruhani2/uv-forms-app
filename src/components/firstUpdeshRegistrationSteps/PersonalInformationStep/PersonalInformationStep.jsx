import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import NameInformation from "./NameInformation";
import UidInputField from "./UidInputField";
import Gender from "./Gender";
import AppliedEarlier from "./AppliedEarlier";
import DateOfBirth from "./DateOfBirth";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { memo, useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from "dayjs";

let phoneCodesCache = null;

const PersonalInformationStep = () => {
  const { control } = useFormContext();
  const [phoneCodes, setPhoneCodes] = useState([]);

  useEffect(() => {
    if (phoneCodes.length === 0) {
      if (phoneCodesCache) {
        setPhoneCodes(phoneCodesCache);
      } else {
        fetch("/phone_codes.json")
          .then((res) => res.json())
          .then((data) => {
            phoneCodesCache = data;
            setPhoneCodes(data);
          });
      }
    }
  }, [phoneCodes]);

  const alreadyInitiatedInSantmat = useWatch({
    control,
    name: "applicant.alreadyInitiated.acknowledged",
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={2} my={1}>
        <Gender namePrefix="applicant" />
        {/* Marital Status Dropdown */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name="applicant.maritalStatus"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                size="small"
                fullWidth
                error={!!fieldState.error}
                required
              >
                <InputLabel id="marital-status-label">
                  Marital Status
                </InputLabel>
                <Select
                  {...field}
                  labelId="marital-status-label"
                  label="Marital Status"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="unmarried">Unmarried</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="widow">Widow</MenuItem>
                  <MenuItem value="widower">Widower</MenuItem>
                  <MenuItem value="divorcee">Divorcee</MenuItem>
                  <MenuItem value="re-married">Re-married</MenuItem>
                  <MenuItem value="separated">Separated</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      <Box mb={3}>
        <NameInformation namePrefix="applicant" />

        <Box my={2}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <UidInputField namePrefix="applicant" />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControlLabel
                control={
                  <Controller
                    name="applicant.biometric"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Biometric is available"
              ></FormControlLabel>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="applicant.dateOfRegistrationAsJigyasu"
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      disableFuture
                      format="DD-MM-YYYY"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
                      label="Jigyasu Registration Date"
                      error={!!fieldState.error}
                      slotProps={{
                        textField: {
                          required: true,
                          size: "small",
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="applicant.caste"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    required
                  >
                    <InputLabel id="category-label">Caste</InputLabel>
                    <Select {...field} labelId="category-label" label="Caste">
                      <MenuItem value="GN">GN</MenuItem>
                      <MenuItem value="BC">BC</MenuItem>
                      <MenuItem value="SC">SC</MenuItem>
                      <MenuItem value="ST">ST</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box my={2} mb={2}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="applicant.phone.number"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    label="Mobile Number"
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Controller
                              name="applicant.phone.code"
                              control={control}
                              render={({ field, fieldState }) => (
                                <Select
                                  {...field}
                                  variant="standard"
                                  disableUnderline
                                >
                                  {phoneCodes.map((code) => (
                                    <MenuItem
                                      key={code.DialCode}
                                      value={code.DialCode}
                                    >
                                      {code.DialCode}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="applicant.email"
                control={control}
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
                name="applicant.healthStatus"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                    required
                  >
                    <InputLabel id="health-status-label">
                      Health/Mental Condition
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="health-status-label"
                      label="Health/Mental Condition"
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="healthy">
                        Physically/Mentally Sound
                      </MenuItem>
                      <MenuItem value="differently-abled">
                        Differently abled
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="applicant.involvedInPolitics"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    size="small"
                    fullWidth
                    error={!!fieldState.error}
                  >
                    <InputLabel id="connected-to-politics-label">
                      Connected to Politics
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="connected-to-politics-label"
                      label="Connected to Politics"
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
      </Box>

      <Box my={2} mt={2}>
        <Box>
          <Typography>Preliminary Books Read</Typography>
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Please select the books you have finished reading
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item>
            <Controller
              name="applicant.preliminaryBooks.jigyasa"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      color="primary"
                    />
                  }
                  label="Jigyasa"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="applicant.preliminaryBooks.matDarshan"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      color="primary"
                    />
                  }
                  label="Radhasoami Mat Darshan"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="applicant.preliminaryBooks.catechism"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      color="primary"
                    />
                  }
                  label="Catechism (Prashnottar)"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 2 }}>
        <DateOfBirth namePrefix="applicant" />
      </Box>

      <Box my={2}>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Applied Earlier</Typography>
        </Grid>
        <Box sx={{ my: 2 }}>
          <AppliedEarlier namePrefix="applicant" />
        </Box>
      </Box>

      <Box>
        <Typography>Already Inititated in Santmat</Typography>
        <Box>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Please provide the information if already initiated in santmat with
            other organization
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="applicant.alreadyInitiated.acknowledged"
              control={control}
              defaultValue={false}
              render={({ field, fieldState }) => (
                <FormControl size="small" fullWidth error={!!fieldState.error}>
                  <InputLabel id="already-initated-label">
                    Already Initiated in Santmat
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="already-initated-label"
                    label="Already Initiated in Santmat"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          {alreadyInitiatedInSantmat && (
            <>
              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name={"applicant.alreadyInitiated.initiatedAt"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        {...field}
                        format="DD-MM-YYYY"
                        value={field.value ? dayjs(field.value) : null}
                        label="Date of Initiation"
                        onChange={(date) => {
                          field.onChange(
                            date ? date.toDate().toISOString() : null
                          );
                        }}
                        slotProps={{
                          textField: {
                            error: fieldState.error,
                            helperText: fieldState.error?.message,
                            size: "small",
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name="applicant.alreadyInitiated.initiatedBy"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        {...field}
                        required
                        label="Initiated By"
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
                  name="applicant.alreadyInitiated.placeOfInitiation"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      label="Place of Initiation"
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
                  name="applicant.alreadyInitiated.reasonToRelinquish"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      label="Reasons to relinquish"
                      size="small"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default memo(PersonalInformationStep);
