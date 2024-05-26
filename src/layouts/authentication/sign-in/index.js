import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    username: "", // Change from 'email' to 'username'
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", formData);
      console.log("Sign-in successful:", response.data);
      alert(`Welcome back, ${formData.username}!`);
      navigate("../../dashboard");
      } catch (error) {
      console.error("There was an error signing in:", error);
      setError("Sign-in failed. Please check your username and password and try again.");
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your username and password to sign in" // Update description
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username {/* Change label from 'Email' to 'Username' */}
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text" // Change type from 'email' to 'text'
            name="username" // Change from 'email' to 'username'
            placeholder="Username" // Update placeholder
            value={formData.username}
            onChange={handleChange}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        {error && (
          <SoftBox mt={2} mb={2}>
            <SoftTypography variant="caption" color="error">
              {error}
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
