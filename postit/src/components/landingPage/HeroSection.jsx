import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const HeroContainer = styled(Box)({
  height: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "url('/images/hero-image.png') center/cover no-repeat",
  color: "#fff",
  padding: "50px 20px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  },
  zIndex: 1,
});

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      navigate("/post-generator"); 
    } else {
      navigate("/login"); 
    }
  };
  return (
    <HeroContainer>
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Welcome to AI-Based Media Post Generation
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 2, maxWidth: "600px", mx: "auto" }}>
            Generate outstanding content with our intelligent AI-powered tool.
          </Typography>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 3, padding: "12px 25px", fontSize: "1.2rem" }}
          
              onClick={handleClick}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
