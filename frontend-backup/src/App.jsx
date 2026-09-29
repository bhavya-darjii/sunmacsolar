import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Savings from "@/pages/Savings";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PPA from "@/pages/PPA";
import Contact from "@/pages/Contact";
import AdminLeads from "@/pages/AdminLeads";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/ppa" element={<PPA />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/leads" element={<AdminLeads />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
