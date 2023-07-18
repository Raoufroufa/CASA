import "./App.css";
import { Route, Routes } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext.jsx";

// Axios
import axios from "axios";
import { setupAxiosInterceptors } from "./axiosConfig.js";

// Layouts
import Layout from "./layout/Layout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

// Pages & sections
import HomePage from "./pages/Users/HomePage.jsx";
import LoginPage from "./pages/Users/LoginPage.jsx";
import RegisterPage from "./pages/Users/RegisterPage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";

import PropertiesPage from "./pages/Properties/PropertiesPage.jsx";
import PropertiesFormPage from "./pages//Properties/PropertiesFormPage.jsx";
import PropertyPage from "./pages/Properties/PropertyPage.jsx";
import ActivePropertiesPage from "./pages/Users/ActivePropertiesPage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

import ActivePostsPage from "./pages/Users/ActivePostsPage.jsx";
import PostsPage from "./pages/Posts/PostsPage.jsx";
import PostsFormPage from "./pages/Posts/PostsFormPage.jsx";
import PostPage from "./pages/Posts/PostPage.jsx";

import RentingPropertiesPage from "./pages/Users/RentingPropertiesPage.jsx";
import FlatsharingPropertiesPage from "./pages/Users/FlatsharingPropertiesPage.jsx";

import TermsPage from "./pages/Users/TermsPage.jsx";
import FaqsPage from "./pages/Users/FaqsPage.jsx";

import AllPropertiesSection from "./pages/Admin/AllPropertiesSection.jsx";
import AllPostsSection from "./pages/Admin/AllPostsSection.jsx";
import ClientsSection from "./pages/Admin/ClientsSection.jsx";
import OwnersSection from "./pages/Admin/OwnersSection.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import AdminLoginPage from "./pages/Admin/AdminLoginPage.jsx";
import DashboardStatics from "./components/DashboardStatics.jsx";
import UsersSection from "./pages/Admin/UsersSection.jsx";
import NewsletterSection from "./pages/Admin/NewsletterSection.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
setupAxiosInterceptors();

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* User interface */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/account" element={<ProfilePage />} />
          {/* properties */}
          <Route path="/account/properties" element={<PropertiesPage />} />
          <Route
            path="/account/properties/new"
            element={<PropertiesFormPage />}
          />
          <Route
            path="/account/properties/:id"
            element={<PropertiesFormPage />}
          />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/properties" element={<ActivePropertiesPage />} />
          {/* categories */}
          <Route
            path="/renting-properties"
            element={<RentingPropertiesPage />}
          />
          ;
          <Route
            path="/flatsharing-properties"
            element={<FlatsharingPropertiesPage />}
          />
          <Route path="/notFound" element={<NotFoundPage />} />
          {/* posts */}
          <Route path="/account/posts" element={<PostsPage />} />
          <Route path="/account/posts/new" element={<PostsFormPage />} />
          <Route path="/account/posts/:id" element={<PostsFormPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/posts" element={<ActivePostsPage />} />
          {/* terms & FAQs */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
        </Route>
        {/* Admin dash-board */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route path="forgot-password" element={<ForgetPasswordPage />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="statics" element={<DashboardStatics />} />
          <Route path="users" element={<UsersSection />} />
          <Route path="clients" element={<ClientsSection />} />
          <Route path="owners" element={<OwnersSection />} />
          <Route path="properties" element={<AllPropertiesSection />} />
          <Route path="property/:id" element={<PropertyPage />} />
          <Route path="posts" element={<AllPostsSection />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="newsletter" element={<NewsletterSection />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
