import React, { useEffect, useState } from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import {
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const SatsangAttendanceStep = () => {
  const { control } = useFormContext();
  const [branches, setBranches] = useState([]);
  const [childhoodBranchOptions, setChildhoodBranchOptions] = useState([]);
  const [adultBranchOptions, setAdultBranchOptions] = useState([]);
  const [jigyasuBranchOptions, setJigyasuBranchOptions] = useState([]);

  const fromChildhoodToAdult = useWatch({
    control,
    name: "applicant.satsangAttendances.fromChildhoodToAdult",
  });

  const adultTillJigyasu = useWatch({
    control,
    name: "applicant.satsangAttendances.adultTillJigyasu",
  });

  const educatedFromDei = useWatch({
    control,
    name: "applicant.educationFromDei.acknowledged",
  });

  const lastChildhoodPeriodTo =
    fromChildhoodToAdult?.[fromChildhoodToAdult.length - 1]?.periodTo;
  const lastAdultPeriodTo =
    adultTillJigyasu?.[adultTillJigyasu.length - 1]?.periodTo;

  useEffect(() => {
    fetch("/branches_and_centres.json")
      .then((response) => response.json())
      .then((data) => setBranches(data));
  }, []);

  const {
    fields: childhoodFields,
    append: childhoodAppend,
    remove: childhoodRemove,
  } = useFieldArray({
    control,
    name: "applicant.satsangAttendances.fromChildhoodToAdult",
  });

  const {
    fields: adultFields,
    append: adultAppend,
    remove: adultRemove,
  } = useFieldArray({
    control,
    name: "applicant.satsangAttendances.adultTillJigyasu",
  });

  const {
    fields: jigyasuFields,
    append: jigyasuAppend,
    remove: jigyasuRemove,
  } = useFieldArray({
    control,
    name: "applicant.satsangAttendances.fromJigyasuToCurrent",
  });

  const handleBranchOptions = (branchName, setOptions) => {
    if (!branchName || branchName.length < 3) {
      setOptions([]);
      return;
    }
    const options = branches.filter((branch) => {
      if (branch["name"]) {
        return branch["name"].toLowerCase().includes(branchName.toLowerCase());
      }
    });
    setOptions(options);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom mb={3}>
        Satsang Attendances
      </Typography>
      <Box>
        <Grid
          item
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ alignContent: "center" }}
        >
          <Typography>Childhood to 18 Years</Typography>
        </Grid>
        {childhoodFields.map((item, index) => (
          <Grid container spacing={2} key={item.id} my={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].nameOfBranchCentre`}
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    popupIcon={null}
                    options={childhoodBranchOptions}
                    getOptionLabel={(option) => option.name || ""}
                    onInputChange={(event, newInputValue) => {
                      handleBranchOptions(
                        newInputValue,
                        setChildhoodBranchOptions
                      );
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.id : "");
                    }}
                    value={
                      branches.find((branch) => branch.id === field.value) ||
                      null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name of Branch/Centre"
                        required
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].audioESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Audio eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].videoESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Video eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].branchSatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Branch Satsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].periodFrom`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      {...field}
                      label="From Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                          size: "small",
                          error: fieldState.error,
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
                name={`applicant.satsangAttendances.fromChildhoodToAdult[${index}].periodTo`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      {...field}
                      label="To Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
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
            {index > 0 && (
              <Grid item xs={12} sm={2}>
                <IconButton
                  onClick={() => childhoodRemove(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Box my={2}>
          <Button
            type="button"
            variant="contained"
            onClick={() =>
              childhoodAppend({
                nameOfBranchCentre: "",
                audioESatsangAttendance: 0,
                videoESatsangAttendance: 0,
                branchSatsangAttendance: 0,
                periodFrom: null,
                periodTo: null,
              })
            }
          >
            + Add
          </Button>
        </Box>
      </Box>

      <Box>
        <Grid
          item
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ alignContent: "center" }}
        >
          <Typography>18 Years to Date of Registration as Jigyasu</Typography>
        </Grid>
        {adultFields.map((item, index) => (
          <Grid container spacing={2} key={item.id} my={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].nameOfBranchCentre`}
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    popupIcon={null}
                    options={adultBranchOptions}
                    getOptionLabel={(option) => option.name || ""}
                    onInputChange={(event, newInputValue) => {
                      handleBranchOptions(newInputValue, setAdultBranchOptions);
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.id : "");
                    }}
                    value={
                      branches.find((branch) => branch.id === field.value) ||
                      null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name of Branch/Centre"
                        required
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].audioESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Audio eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].videoESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Video eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].branchSatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Branch Satsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].periodFrom`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      {...field}
                      label="From Date"
                      minDate={
                        lastChildhoodPeriodTo
                          ? dayjs(lastChildhoodPeriodTo)
                          : null
                      }
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
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
                name={`applicant.satsangAttendances.adultTillJigyasu[${index}].periodTo`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      {...field}
                      label="To Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                          size: "small",
                          error: !!fieldState.error,
                          helperText: !!fieldState.error?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            {index > 0 && (
              <Grid item xs={12} sm={2}>
                <IconButton onClick={() => adultRemove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Box my={2}>
          <Button
            type="button"
            variant="contained"
            onClick={() =>
              adultAppend({
                nameOfBranchCentre: "",
                audioESatsangAttendance: 0,
                videoESatsangAttendance: 0,
                branchSatsangAttendance: 0,
                periodFrom: null,
                periodTo: null,
              })
            }
          >
            + Add
          </Button>
        </Box>
      </Box>

      <Box>
        <Grid
          item
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ alignContent: "center" }}
        >
          <Typography>From Jigyasu Registration till date</Typography>
        </Grid>
        {jigyasuFields.map((item, index) => (
          <Grid container spacing={2} key={item.id} my={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].nameOfBranchCentre`}
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    popupIcon={null}
                    options={jigyasuBranchOptions}
                    getOptionLabel={(option) => option.name || ""}
                    onInputChange={(event, newInputValue) => {
                      handleBranchOptions(
                        newInputValue,
                        setJigyasuBranchOptions
                      );
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.id : "");
                    }}
                    value={
                      branches.find((branch) => branch.id === field.value) ||
                      null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name of Branch/Centre"
                        required
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].audioESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Audio eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].videoESatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Video eSatsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].branchSatsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Branch Satsang Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].periodFrom`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      {...field}
                      label="From Date"
                      minDate={
                        lastAdultPeriodTo ? dayjs(lastAdultPeriodTo) : null
                      }
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
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
                name={`applicant.satsangAttendances.fromJigyasuToCurrent[${index}].periodTo`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      disableFuture
                      label="To Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
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
            {index > 0 && (
              <Grid item xs={12} sm={2}>
                <IconButton onClick={() => jigyasuRemove(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Box my={2}>
          <Button
            type="button"
            variant="contained"
            onClick={() =>
              jigyasuAppend({
                nameOfBranchCentre: "",
                audioESatsangAttendance: 0,
                videoESatsangAttendance: 0,
                branchSatsangAttendance: 0,
                periodFrom: null,
                periodTo: null,
              })
            }
          >
            + Add
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Done your education from DEI
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name="applicant.educationFromDei.acknowledged"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                size="small"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <InputLabel>Educated from DEI</InputLabel>
                <Select {...field} label="Educated from DEI" required>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {educatedFromDei === "yes" && (
          <>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.educationFromDei.khetAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Khet Attendance"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`applicant.educationFromDei.satsangAttendance`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Satsang Attendance"
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
    </>
  );
};

export default SatsangAttendanceStep;
