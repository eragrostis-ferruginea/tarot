import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import CardLibrary from "@/pages/CardLibrary";
import CardDetail from "@/pages/CardDetail";
import Reading from "@/pages/Reading";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardLibrary />} />
          <Route path="/cards/:id" element={<CardDetail />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}