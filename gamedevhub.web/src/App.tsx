import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Sidebar />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;