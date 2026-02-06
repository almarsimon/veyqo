"use client";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.displayName || "");
  const [success, setSuccess] = useState(false);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSave = () => {
    // Placeholder: Update Firebase profile here
    setSuccess(true);
  };

  return (
    <Box sx={{ py: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated!
        </Alert>
      )}
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}
