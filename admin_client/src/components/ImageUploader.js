import { Box, styled, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const ImageSelector = styled(Box)({
  borderRadius: 8,
  backgroundColor: "#F2F3F5",
  height: 200,
  borderStyle: "solid",
  borderWidth: 1,
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background-color .3s ease",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
});

const ImageUploader = ({ files, setFiles, setFieldValue, hasError }) => {
  const { getRootProps, getInputProps } = useDropzone({
    // accept: {
    //   "image/jpeg": [],
    //   "image/jpg": [],
    //   "image/png": [],
    //   "image/webp": [],
    // },
    accept: "image/jpeg,image/jpg,image/png,image/webp",
    onDrop: (acceptedFiles) => {
      const newArray = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...files, ...newArray]);
      setFieldValue("images", [...files, ...acceptedFiles]);
    },
  });
  return (
    <ImageSelector
      sx={{ borderColor: hasError ? "red" : "#BFC0C1" }}
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <Typography variant="h5" textAlign="center">
        Kéo thả hoặc Click để chọn ảnh
      </Typography>
      <Typography variant="body2" textAlign="center">
        Các định dạng hợp lệ *.jpeg, *.jpg, *.png, *.webp
      </Typography>
    </ImageSelector>
  );
};

export default ImageUploader;
