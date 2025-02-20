import { Download, FileCopy, History } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid, IconButton,
  List, ListItem, ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";

const PostGenerator = () => {
  const { generatedPost, generatePost, loading, error, history } = useContext(ApiContext);
  const [context, setContext] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };


  const downloadText = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `post.txt`;
    link.click();
  };

  return (
    <div >
      <Grid container spacing={3} sx={{ mt: 4 }}>
        
        {/* Left Sidebar - History */}
        <Grid item xs={12} sm={4} md={3}>
          <Box elevation={4} sx={{ p: 3, borderRadius: 3, height: "90vh", overflowY: "auto" }}>
            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <History sx={{ mr: 1 }} /> History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {history.length === 0 ? (
                <Typography color="textSecondary">No history yet.</Typography>
              ) : (
                history.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => setContext(item.prompt)}
                    sx={{
                      borderBottom: "1px solid #ddd",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemText primary={item.prompt} secondary="Click to reuse" />
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={8} md={8}>
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
              
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                AI Post Generator
              </Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Enter your post context and generate optimized posts for social media!
              </Typography>

              {/* Input Field */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Enter post context..."
                variant="outlined"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#1E88E5" },
                    "&.Mui-focused fieldset": { borderColor: "#1E88E5" },
                  },
                }}
              />

              {/* Generate Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    boxShadow: "0px 5px 15px rgba(30, 136, 229, 0.3)",
                    width: "100%",
                  }}
                  onClick={() => generatePost(context)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Post"}
                </Button>
              </motion.div>

              {/* Error Message */}
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Paper>
          </motion.div>

          {/* Generated Posts Section */}
          {generatedPost && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Box sx={{ mt: 5 }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
                  Your Generated Post
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }} textAlign="center">
                    <Grid item xs={12} sm={12} md={12} >
                      <Paper
                        elevation={4}
                        sx={{
                          padding: 3,
                          borderRadius: 3,
                          textAlign: "center",
                          backgroundColor: "#F5F5F5",
                          transition: "0.3s",
                          "&:hover": { boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", transform: "scale(1.05)" },
                        }}
                      >
                       
                        <Typography variant="body2" sx={{ minHeight: "80px" }}>
                          {generatedPost.post}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                          <IconButton onClick={() => copyToClipboard(generatedPost.post)} color="primary">
                            <FileCopy />
                          </IconButton>
                          <IconButton onClick={() => downloadText(generatedPost.post)} color="secondary">
                            <Download />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                
                </Grid>
              </Box>
            </motion.div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PostGenerator;
