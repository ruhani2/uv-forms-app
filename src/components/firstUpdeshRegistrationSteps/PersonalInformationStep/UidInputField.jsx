import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const UidInputField = ({ namePrefix }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`${namePrefix}.uid`}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          size="small"
          label="UID"
          fullWidth
          disabled
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default UidInputField;
