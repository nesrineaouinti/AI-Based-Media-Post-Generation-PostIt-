import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import AuthContext from "../context/AuthContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/post-generator";

      setIsLoading(false);
    } catch (err) {
      toast.error("Invalid email or password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Login error:", err);
      setIsLoading(false);
    }
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
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Log in to your account to continue.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  "&:hover fieldset": { borderColor: "#1E88E5" },
                  "&.Mui-focused fieldset": { borderColor: "#1E88E5" },
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
                  "&:hover fieldset": { borderColor: "#1E88E5" },
                  "&.Mui-focused fieldset": { borderColor: "#1E88E5" },
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

            {/* Login Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 15px rgba(30, 136, 229, 0.3)",
                }}
                type="submit"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isLoading ? "Login..." : "Login"}
              </Button>
            </motion.div>
          </form>

          {/* Forgot Password */}
          <Typography
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
          >
            Forgot password?
          </Typography>

          {/* Sign Up Link */}
          <Typography variant="body2" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Typography
              onClick={() => navigate("/register")}
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
