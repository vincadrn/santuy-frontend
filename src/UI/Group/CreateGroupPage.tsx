import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, GlobalThemeProvider } from "../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const schema = yup.object().shape({
  groupName: yup.string().required("Group Name is required"),
  members: yup.string().required("Member is required"),
  itinerary: yup.array().of(
    yup.object().shape({
      time: yup.string().required("Time is required"),
      activity: yup.string().required("Activity is required"),
    })
  ),
});

const CreateGroupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      groupName: "",
      members: "",
      itinerary: [{ time: "", activity: "" }],
    },
  });

  const { fields, append } = useFieldArray({ control, name: "itinerary" });

  const onSubmit = (data: any) => {
    localStorage.setItem("day1", JSON.stringify(data));
    navigate("/day2");
  };

  return (
    <ThemeProvider theme={theme}>
    <GlobalThemeProvider>
      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 2,
          overflow: "hidden",
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ color: "#0A2647" }}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
  
        <Typography sx={{ mb: 2 }}>Hello! Please fill this form</Typography>
  
        {/* Scrollable Form Container */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "80vh",
            justifyContent: "center",
            paddingBottom: "16px",
            scrollbarWidth: "none", 
            "&::-webkit-scrollbar": {
              display: "none", 
            },
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <TextField
              label="Group Name"
              fullWidth
              {...register("groupName")}
              error={!!errors.groupName}
              helperText={errors.groupName?.message as string}
              sx={{ mb: 2 }}
            />
  
            {/* Activity Fields */}
            {fields.map((field, index) => (
              <Box display="flex" gap={2} key={field.id} sx={{ mb: 1, width: "100%" }}>
                <TextField
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  {...register(`itinerary.${index}.time`)}
                  error={!!errors.itinerary?.[index]?.time}
                  helperText={errors.itinerary?.[index]?.time?.message as string}
                  sx={{ width: "40%" }}
                />
                <TextField
                  label="Activities"
                  {...register(`itinerary.${index}.activity`)}
                  error={!!errors.itinerary?.[index]?.activity}
                  helperText={errors.itinerary?.[index]?.activity?.message as string}
                  sx={{ width: "60%" }}
                />
              </Box>
            ))}
  
            {/* Add Activity Button */}
            <Typography
              onClick={() => append({ time: "", activity: "" })}
              sx={{ color: "#0A2647", cursor: "pointer", mb: 2 }}
            >
              add activities
            </Typography>
  
            <TextField label="Preparation" fullWidth sx={{ mb: 2 }} />
  
            {/* Add Day 2 Button */}
            <Typography
              onClick={handleSubmit(onSubmit)}
              sx={{ fontWeight: "bold", color: "#0A2647", cursor: "pointer", mb: 2 }}
            >
              Add Day 2
            </Typography>
  
            {/* Done Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#0A2647",
                "&:hover": { backgroundColor: "#092A3F" },
                width: "100%", 
              }}
            >
              DONE
            </Button>
          </form>
        </Box>
      </Container>
    </GlobalThemeProvider>
  </ThemeProvider>
  
  );
};

export default CreateGroupForm;
