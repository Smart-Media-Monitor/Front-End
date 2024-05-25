import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    channel_id: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreement) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", formData);
      console.log("Sign-up successful:", response.data);
      alert("Sign-up successful. Please sign in.");
      navigate("/authentication/sign-in");
    } catch (error) {
      console.error("There was an error signing up:", error);
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Digital Marketing in Smart Ways!"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register here!
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                name="username"
                placeholder="Username" // Change placeholder to "Username"
                value={formData.username} // Update value to formData.username
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
            <SoftInput
              type="text" // Keep type as "text"
              name="channel_id" // Change name as needed
              placeholder="Channel ID"
              value={formData.channelId} // Update value to match formData property
              onChange={handleChange}
            />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
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
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
