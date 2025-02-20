import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box sx={{ bgcolor: "#f4f4f4", py: 10, textAlign: "center" }}>
      <Container>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            About Us
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, maxWidth: "600px", mx: "auto" }}>
            PostIt is an AI-powered application that automatically generates social media posts. 
            The tool utilizes advanced AI models (OpenAI, Groq, DeepSeek) to create content optimized for platforms like LinkedIn, Facebook, and Twitter.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
