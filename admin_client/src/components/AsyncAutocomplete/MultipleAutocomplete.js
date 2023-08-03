import { useState, useEffect } from "react";
// UI
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// Logic
import { getAllRoomService } from "../../api/room_service";

export default function MultipleAutocomplete({
  name,
  text,
  touched,
  errors,
  value,
  setFieldValue,
  fieldToSetValue,
  noOptionsText,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    getAllRoomService()
      .then((res) => {
        if (active) {
          setOptions([...res.data]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.log(err);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      setLoading(false);
    } else setLoading(true);
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      name={name}
      multiple
      noOptionsText={noOptionsText}
      loadingText="Đang tải..."
      fullWidth
      disableCloseOnSelect
      options={options}
      loading={loading}
      open={open}
      value={value}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => setFieldValue(fieldToSetValue, value)}
      renderOption={(props, option, { selected }) => (
        <Box {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={Boolean(touched && errors)}
          helperText={touched && errors}
          margin="normal"
          label={text}
          placeholder={text}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
