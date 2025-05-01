import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    emp_code: "",
    name: "", gender: "", birthDate: "", email: "",
    contact: "", city: "", country: "", address: "",
  });
  const [leave, setLeave] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    description: "",
    name: "" ,// include this
    emp_code: "",
    id:"",

  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchProfile = () => {
    if (token) {
      const decoded = jwtDecode(token);
      const empId = decoded.id;
      axios.get(`http://localhost:5000/api/emp/employee/${empId}`)
        .then((res) => {
          const data = res.data;
          if (data.birthDate) {
            data.birthDate = new Date(data.birthDate).toISOString().split("T")[0];
          }
          setProfile(data);
        })
        .catch((err) => console.error("Failed to fetch profile", err));
    }
  };

  useEffect(() => {
    if (!token) {
      setProfile({});
    } else {
      fetchProfile();
    }
  }, [token]);
  
  useEffect(() => {
    setLeave((prev) => ({ ...prev, name: profile.name }));
  }, [profile.name]);
  useEffect(() => {
    setLeave((prev) => ({ ...prev, emp_code: profile.emp_code }));
  }, [profile.emp_code]);
  useEffect(() => {
    setLeave((prev) => ({ ...prev, id: profile.id }));
  }, [profile.id]);
  return (
    <EmployeeContext.Provider value={{ profile, setProfile, fetchProfile, setToken }}>
      {children}
    </EmployeeContext.Provider>
  );
};
