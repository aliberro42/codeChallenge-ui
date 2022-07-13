import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
const LabelWithIcon = ({ icon, label }: { icon: boolean; label: string }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      {icon ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
      <Typography color={icon ? "green" : "red"}>{label}</Typography>
    </Box>
  );
};

export default LabelWithIcon;
