import { createContext, useState, useEffect } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/authentication/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

 
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/authentication/login/`, {
        email,
        password
      });
  
      const { access, refresh } = response.data; 
  
      if (access && refresh) {
        localStorage.setItem("token", access);
        localStorage.setItem("refresh", refresh);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
    }
  };

 
  const signup = async (username, email,phone, password) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/authentication/register/`, { username,email,phone, password });
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh"); 
  
      if (!refreshToken) {
        console.error("No refresh token found.");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
        window.location.href = "/";
        return;
      }
  
      console.log("Logging out with refresh token:", refreshToken); 
  
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/authentication/logout/`,
        { refresh: refreshToken }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
  
 
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error.response ? error.response.data : error);
  
      if (error.response?.data?.error === "Invalid refresh token") {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
        window.location.href = "/";
      } else {

      
      }
    }
  };
  
  
  

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
