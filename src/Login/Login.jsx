import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { validateLogin } from "./validateLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  

    const [formData, setFormData] = useState({
        email: 'superadmin@watsoo.com',
        password: 'Watsoo@123'
    });



    

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when  starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    console.log(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // try {
    //   const response = await loginSuperAdmin(formData).unwrap();

    //   if (response.responseCode === 200) {
    //     const { token, roleType, userName, email, buildingId, companyId } =
    //       response.data;

    //     //  Save  in localStorage
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("role", roleType);
    //     localStorage.setItem("userName", userName);
    //     localStorage.setItem("email", email);
    //     localStorage.setItem("buildingId", buildingId);
    //     localStorage.setItem("companyId", companyId);

    //     // Navigate based on role
    //     switch (roleType) {
    //       case "SUPER_ADMIN":
    //         navigate("/super-admin");
    //         break;
    //       case "ADMIN":
    //         navigate("/admin");
    //         localStorage.setItem("companyId", companyId);
    //         break;
    //       case "MANAGER":
    //         navigate("/manager");
    //         localStorage.setItem("buildingId", buildingId);
    //         break;
    //       default:
    //         alert("Unknown user role");
    //     }
    //   } else {
    //     alert("Invalid login credentials!");
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    //   alert("Login failed. Please try again.");
    // }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 2,
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box textAlign="center" mb={2}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to access your account
              </Typography>
            </Box>

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                mt: 1,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Login
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;