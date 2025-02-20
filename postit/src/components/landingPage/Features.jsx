import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";


const FeatureCard = styled(Paper)({
  padding: "20px",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  cursor: "pointer",
  background: "linear-gradient(135deg, #68728a, #71c7e9)",
  color: "#fff",
  "&:hover": {
    transform: "scale(1.08) rotate(2deg)",
    boxShadow: "0px 10px 30px rgba(255, 64, 129, 0.4)",
    background: "linear-gradient(135deg, #68728a, #71c7e9)",
  },
});

const Features = () => {
  const features = [
    { title: "AI-Powered", description: "Generate content in just a few seconds." },
    { title: "Customizable", description: "Tailor your writing style to fit your needs." },
    { title: "Secure", description: "Your data remains safe and confidential." },
  ];

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <FeatureCard elevation={4}>
                <Typography variant="h6" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {feature.description}
                </Typography>
              </FeatureCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
