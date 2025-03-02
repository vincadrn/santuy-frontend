import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider } from "@mui/material/styles";
import { theme, GlobalThemeProvider } from "../theme";
import logo from "../assets/logo.png";

const InsertGroupCodePage = () => {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [groupHistory, setGroupHistory] = useState<string[]>([]);
  const [isValidCode, setIsValidCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("groupHistory") || "[]");
    setGroupHistory(savedHistory);
  }, []);

  const handleSubmit = () => {
    if (groupCode.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    // Cek apakah kode valid
    const valid = validateGroupCode(groupCode);
    setIsValidCode(valid);

    if (valid) {
      setGroupHistory((prevHistory) => {
        if (!prevHistory.includes(groupCode)) {
          const updatedHistory = [...prevHistory, groupCode];
          localStorage.setItem("groupHistory", JSON.stringify(updatedHistory));
          return updatedHistory;
        }
        return prevHistory;
      });
    }

    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    if (isValidCode) {
      navigate("/JoinCreateGroup");
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("groupHistory");
    setGroupHistory([]);
  };

  const handleSelectGroup = (code: string) => {
    setGroupCode(code);
  };

  // Simulasi validasi kode grup (Gantilah dengan validasi dari backend jika diperlukan)
  const validateGroupCode = (code: string) => {
    const validCodes = ["TRVL123", "HOLIDAY456", "SUMMER789"]; // Contoh kode grup yang valid
    return validCodes.includes(code);
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
          }}
        >
          {/* Back Button & Logo */}
          <div
            style={{
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
          </div>

          {/* Logo & Title */}
          {/* <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
            <img src={logo} alt="Travelonika Logo" style={{ width: "40px", height: "40px", marginRight: "8px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0A2647" }}>
              TRAVELONIKA
            </Typography>
          </Box> */}

          {/* Input & Submit Button */}
          <Typography sx={{ mb: 2 }}>Please insert your group code</Typography>
          <TextField
            label="Group Code"
            variant="outlined"
            fullWidth
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            error={error}
            helperText={error ? "Code is required" : ""}
            sx={{ mb: 2, backgroundColor: "white" }}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderColor: "#0A2647", color: "#0A2647", "&:hover": { backgroundColor: "#D6E4FF" } }}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {/* Group History List */}
          {groupHistory.length > 0 && (
            <Box mt={4} width="100%">
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", color: "#0A2647", mb: 1 }}>
                Group History
              </Typography>
              <List
                sx={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "#F5F4FF",
                  borderRadius: 2,
                }}
              >
                {groupHistory.map((code, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleSelectGroup(code)}
                    sx={{
                      "&:hover": { backgroundColor: "#F5F4FF" },
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText primary={code} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#0A2647", "&:hover": { backgroundColor: "#0A2647" } }}
                fullWidth
                onClick={handleClearHistory}
              >
                Clear History
              </Button>
            </Box>
          )}

          {/* Popup Dialog */}
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle sx={{ backgroundColor: "#0A2647", color: "white" }}>
              {isValidCode ? "Group Found" : "Group Not Found"}
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#0A2647", color: "white" }}>
              <DialogContentText sx={{ color: "white" }}>
                {isValidCode
                  ? "You have successfully joined the group!"
                  : "The group code you entered is not found."}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#0A2647" }}>
              <Button onClick={handleClosePopup} sx={{ color: "white", border: "1px solid white" }}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </GlobalThemeProvider>
    </ThemeProvider>
  );
};

export default InsertGroupCodePage;
