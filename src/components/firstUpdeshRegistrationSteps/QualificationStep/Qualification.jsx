import {
  Grid,
  Typography,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const Qualification = ({ namePrefix }) => {
  const { control } = useFormContext();
  const literacy = useWatch({
    control,
    name: `${namePrefix}.qualification.literacy`,
  });

  const [degreeOptions, setDegreeOptions] = useState([]);

  useEffect(() => {
    setDegreeOptions([
      { code: "bachelor", name: "Bachelor's" },
      { code: "other", name: "Other" },
    ]);
  }, []);

  const degreeSelected = useWatch({
    control,
    name: `${namePrefix}.qualification.degree`,
  });

  return (
    <>
      <Grid sx={{ mb: 1 }}>
        <Typography>Qualification Information</Typography>
      </Grid>
      <Grid container spacing={1} alignItems="center" my={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.qualification.literacy`}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                size="small"
                error={!!fieldState.error}
                required
              >
                <InputLabel id="literacy-label">Literacy</InputLabel>
                <Select {...field} labelId="literacy-label" label="Literacy">
                  <MenuItem value="literate">Literate</MenuItem>
                  <MenuItem value="can_only_sign">Can Only Sign</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      {literacy === "literate" && (
        <Grid container spacing={2} my={2}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.qualification.degree`}
              control={control}
              defaultValue={null}
              render={({ field, fieldState }) => (
                <Autocomplete
                  popupIcon={null}
                  {...field}
                  options={degreeOptions}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(e, value) => {
                    if (value) {
                      field.onChange(value);
                    } else {
                      field.onChange({ code: "", name: "" });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Degree"
                      required
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.name?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          {degreeSelected.code === "other" && (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`${namePrefix}.qualification.degreeName`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Degree Name"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.qualification.specialization`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Specialization"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.qualification.place`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Place"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Qualification;
