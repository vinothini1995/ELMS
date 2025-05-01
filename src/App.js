import React from 'react'
import LoginPage from './Pages/LoginPage'
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import AdminDashboard from './Pages/admin/AdminDashboard';
import ChangePassword from './Pages/admin/ChangePassword';
import Layout from './Pages/admin/Layout';
import ManageDepartment from './Pages/admin/ManageDepartment';
import AddDepartment from './Pages/admin/AddDepartment';
import ManageLeaveType from './Pages/admin/ManageLeaveType';
import AddLeaveType from './Pages/admin/AddLeaveType';
import ManageEmployees from './Pages/admin/ManageEmployees';
import AddEmployees from './Pages/admin/AddEmployees';
import EmployeeLayout from './Pages/employee/EmployeeLayout';
import EmpChangePassword from './Pages/employee/EmpChangePassword';
import EmployeeProfile from './Pages/employee/EmployeeProfile';
import EmpApplyLeave from './Pages/employee/EmpApplyLeave';
import EmpLeaveHistory from './Pages/employee/EmpLeaveHistory';
import UserRegistration from './Pages/UserRegistration';
import AllLeaves from './Pages/admin/AllLeaves';
import PendingLeaves from './Pages/admin/PendingLeaves';
import ApprovedLeaves from './Pages/admin/ApprovedLeaves';
import NotApproved from './Pages/admin/NotApproved';
import PendingLeaveDetails from './Pages/admin/PendingLeaveDetails';
import { EmployeeProvider } from './Pages/employee/EmployeeContext';
import ApprovedLeaveDetails from './Pages/admin/ApprovedLeaveDetails';
import NotApprovedDetails from './Pages/admin/NotApprovedDetails';
import DashboardLeave from './Pages/admin/DashboardLeave';
const App = () => {
  return (
    <div>
      <Router>
      <EmployeeProvider>

        <Routes>
          <Route path="/" element={< LoginPage/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/ManageDepartment" element={<ManageDepartment />} />
          <Route path="/AddDepartment" element={<AddDepartment />} />
          <Route path="/ManageLeaveType" element={<ManageLeaveType />} />
          <Route path="/AddLeaveType" element={<AddLeaveType />} />
          <Route path="/ManageEmployees" element={<ManageEmployees />} />
          <Route path="/AddEmployees" element={<AddEmployees />} />
          <Route path="/EmployeeLayout" element={<EmployeeLayout />} />
          <Route path="/EmpChangePassword" element={<EmpChangePassword />} />
          <Route path="/EmployeeProfile" element={<EmployeeProfile />} />
          <Route path="/EmpApplyLeave" element={<EmpApplyLeave/>}/>
          <Route path="/EmpLeaveHistory" element={<EmpLeaveHistory />}/>
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/AllLeaves" element={<AllLeaves />} />
          <Route path="/PendingLeaves" element={<PendingLeaves />} />
          <Route path ="/ApprovedLeaves" element={<ApprovedLeaves />} />
          <Route path="/NotApproved" element={<NotApproved />} />
          <Route path="/PendingLeaveDetails/:id" element={<PendingLeaveDetails />} />
          <Route path="/ApprovedLeaveDetails/:id" element={<ApprovedLeaveDetails />} />
          <Route path="/NotApprovedDetails/:id" element={<NotApprovedDetails />}/>
          <Route path="/DashboardLeave" element={<DashboardLeave/>} />
        </Routes>
        </EmployeeProvider>

      </Router>
    </div>
  )
}

export default App