import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useFormContext, Controller, set } from "react-hook-form";
import { useState, useEffect } from "react";

const Address = ({ namePrefix, addressType, sameAsCurrent }) => {
  const { control, setValue, watch } = useFormContext();

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const selectedCountry = watch(`${namePrefix}.${addressType}.country`);
  const selectedState = watch(`${namePrefix}.${addressType}.state`);
  const selectedCity = watch(`${namePrefix}.${addressType}.city`);

  const handleCountryInputChange = (event, value) => {
    if (value.length >= 3) {
      fetch("/countries.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredCountries = data.filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
          );
          setCountryOptions(filteredCountries);
        });
    } else {
      setCountryOptions([]);
    }
  };

  const handleStateInputChange = (event, value) => {
    if (value.length >= 2 && selectedCountry) {
      fetch(`/countries/${selectedCountry.code}/states.json`)
        .then((response) => response.json())
        .then((data) => {
          setStateOptions(data);
        })
        .catch(() => {
          setStateOptions([]);
        });
    } else {
      setStateOptions([]);
    }
  };

  const handleCityInputChange = (event, value) => {
    if (value.length >= 2 && selectedState) {
      const state_folder_name = selectedState.name.replace(/\s+/g, "_");
      fetch(
        `/countries/${selectedCountry.code}/${state_folder_name}-${selectedState.code}/allCities.lite.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setCityOptions(data);
        })
        .catch(() => {
          setCityOptions([]);
        });
    } else {
      setCityOptions([]);
    }
  };

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

  return (
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name={`${namePrefix}.${addressType}.houseNo`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="House No."
              disabled={sameAsCurrent || branchDetailsPage}
              required
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
          name={`${namePrefix}.${addressType}.landmark`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Landmark"
              disabled={sameAsCurrent || branchDetailsPage}
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
          name={`${namePrefix}.${addressType}.country`}
          control={control}
          defaultValue={null}
          render={({ field, fieldState }) => (
            <Autocomplete
              popupIcon={null}
              {...field}
              options={countryOptions}
              disabled={sameAsCurrent || branchDetailsPage}
              getOptionLabel={(option) => option.name || ""}
              onChange={(e, value) => {
                if (value) {
                  field.onChange(value);
                } else {
                  field.onChange({ code: "", name: "" });
                  setValue(`${namePrefix}.${addressType}.state`, {
                    code: "",
                    name: "",
                  });
                  setValue(`${namePrefix}.${addressType}.city`, {
                    code: "",
                    name: "",
                  });
                }
              }}
              onInputChange={handleCountryInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
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

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name={`${namePrefix}.${addressType}.state`}
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              popupIcon={null}
              onInputChange={handleStateInputChange}
              disabled={
                sameAsCurrent || branchDetailsPage || !selectedCountry?.name
              }
              options={stateOptions}
              getOptionLabel={(option) => option.name || ""}
              onChange={(e, value) => {
                if (value) {
                  field.onChange(value);
                } else {
                  field.onChange({ code: "", name: "" });
                  setValue(`${namePrefix}.${addressType}.city`, {
                    code: "",
                    name: "",
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  required
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.name.message}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name={`${namePrefix}.${addressType}.city`}
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              popupIcon={null}
              options={cityOptions}
              disabled={
                sameAsCurrent || branchDetailsPage || !selectedState?.name
              }
              getOptionLabel={(option) => option.name || ""}
              onInputChange={handleCityInputChange}
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
                  label="City"
                  required
                  size="small"
                  error={!!fieldState.error?.name}
                  helperText={fieldState.error?.name?.message ?? ""}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name={`${namePrefix}.${addressType}.pincode`}
          control={control}
          disabled={sameAsCurrent || branchDetailsPage}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Pincode"
              required
              fullWidth
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Address;
