import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{8}$/, "Phone number must be exactly 8 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signup(data.username, data.email, data.phone, data.password);
      toast.success("Account created successfully! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     
    } catch (err) {
      console.error("Signup error:", err);
  
      if (err.response && err.response.data) {
        const errorData = err.response.data;
  
        Object.keys(errorData).forEach((key) => {
          setError(key, {
            type: "manual",
            message: errorData[key][0], 
          });
        });
 
      }
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 3, textAlign: "center", mt: 10 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Sign Up
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Create your account and start now.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              variant="outlined"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#E91E63" },
                  "&.Mui-focused fieldset": { borderColor: "#E91E63" },
                },
              }}
            />

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#E91E63" },
                  "&.Mui-focused fieldset": { borderColor: "#E91E63" },
                },
              }}
            />

            {/* Phone Number Input */}
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              variant="outlined"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#E91E63" },
                  "&.Mui-focused fieldset": { borderColor: "#E91E63" },
                },
              }}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#E91E63" },
                  "&.Mui-focused fieldset": { borderColor: "#E91E63" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Sign Up Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <Button
                fullWidth variant="contained" color="primary" type="submit"
                sx={{ mt: 3, py: 1.5, fontSize: "1rem", borderRadius: "25px", fontWeight: "bold" }}
                disabled={isLoading} 
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null} 
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </motion.div>
          </form>

          {/* Already have an account? */}
          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Typography
              onClick={() => navigate("/login")}
              component="span"
              sx={{
                color: "secondary.main",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log in
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Signup;
