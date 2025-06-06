import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Register from "./Pages/Register";
import VerifyOtp from "./Pages/VerifyOtp";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import PageNotFound from "./Pages/PageNotFound";
import EditPrompt from "./Pages/EditPrompt";
import ForkPrompt from "./Pages/ForkPrompt";
import CreatePrompt from "./Pages/CreatePrompt";
import PromptDetailPage from "./Pages/PromptDetailPage";



export default function Router(){

    return(
        <Routes>
            <Route path="/" element= {<HomePage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/verify-otp" element={<VerifyOtp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/submit" element={<CreatePrompt />} />
            <Route path="/prompt/:id/edit" element={<EditPrompt />} />
            <Route path="/prompt/:id/fork" element={<ForkPrompt />} />8
            <Route path="/prompts/:id" element={<PromptDetailPage />} /> 
            {/* 
            <Route path="/submit" element={<CreatePrompt />} />
            <Route path="/editPrompt" element={<EditPrompt />} /> 
            <Route path="/forkPrompt" element={<ForkPrompt />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-edit" element={<EditProfile/>} />
            <Route path="/stars" element={<StaredPrompts />} /> 
             
            
            
            */}
             <Route path="*" element={<PageNotFound/>} />
        </Routes>
    )
} 