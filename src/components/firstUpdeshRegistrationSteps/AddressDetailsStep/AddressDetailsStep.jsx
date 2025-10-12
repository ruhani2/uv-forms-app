import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Address from "../../shared/Address";
import { Controller, useFormContext } from "react-hook-form";
import Qualification from "../QualificationStep/Qualification";
import Occupation from "../OccupationStep/Occupation";
import { useEffect } from "react";

const AddressDetailsStep = ({ namePrefix }) => {
  const { control, watch, setValue } = useFormContext();
  const sameAsCurrent = watch(`${namePrefix}.sameAsCurrent`);
  const currentAddress = watch(`${namePrefix}.currentAddress`);
  const currentHouseNo = watch(`${namePrefix}.currentAddress.houseNo`);
  const currentLandmark = watch(`${namePrefix}.currentAddress.landmark`);
  const currentCountry = watch(`${namePrefix}.currentAddress.country`);
  const currentState = watch(`${namePrefix}.currentAddress.state`);
  const currentCity = watch(`${namePrefix}.currentAddress.city`);
  const currentPincode = watch(`${namePrefix}.currentAddress.pincode`);

  useEffect(() => {
    if (sameAsCurrent && currentAddress) {
      Object.keys(currentAddress).forEach((key) => {
        setValue(`${namePrefix}.permanentAddress.${key}`, currentAddress[key], {
          shouldDirty: true,
        });
      });
    } else {
      setValue(`${namePrefix}.permanentAddress`, {
        houseNo: "",
        landmark: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
      });
    }
  }, [
    sameAsCurrent,
    currentHouseNo,
    currentLandmark,
    currentCountry,
    currentState,
    currentCity,
    currentPincode,
  ]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Address and Professional Profile Details
      </Typography>
      <Typography>Current Address</Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        gutterBottom
        sx={{ wordBreak: "break-word" }}
      >
        Address where you currently reside.
      </Typography>
      <Box my={2}>
        <Address
          namePrefix="applicant"
          addressType="currentAddress"
          sameAsCurrent={false}
        />
      </Box>

      <Box my={2}>
        <Typography gutterBottom>Permanent Address</Typography>

        <FormControlLabel
          control={
            <Controller
              name={`${namePrefix}.sameAsCurrent`}
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={!!field.value} />
              )}
            />
          }
          label="Same as Current Address"
        />
        <Address
          namePrefix="applicant"
          addressType="permanentAddress"
          sameAsCurrent={sameAsCurrent}
        />
      </Box>

      <Box mt={5}>
        <Qualification namePrefix="applicant" />
      </Box>
      <Box mt={5}>
        <Occupation namePrefix="applicant" />
      </Box>
    </Box>
  );
};

export default AddressDetailsStep;
