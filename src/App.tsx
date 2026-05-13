import { BrowserRouter, Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LobDetailPage } from "./pages/LobDetailPage";
import { LobsPage } from "./pages/LobsPage";
import { ModulesPage } from "./pages/ModulesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FieldDictionaryPage } from "./pages/FieldDictionaryPage";
import { SystemDesignBlueprintPage } from "./pages/SystemDesignBlueprintPage";
import "./App.css";

function Shell() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <Link to="/" className="brand-link">
            <span className="brand-title">EP Navigator</span>
            <span className="brand-sub">GoO Advisory &amp; Outcomes Control Tower</span>
          </Link>
        </div>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/lobs">LOB 360</NavLink>
          <NavLink to="/field-dictionary">Fields</NavLink>
          <NavLink to="/modules">Modules</NavLink>
          <NavLink to="/system-design">Blueprint</NavLink>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lobs" element={<LobsPage />} />
          <Route path="/lobs/:id" element={<LobDetailPage />} />
          <Route
            path="/lookups"
            element={<Navigate to="/system-design#traceability-lookups" replace />}
          />
          <Route
            path="/relationships"
            element={<Navigate to="/system-design#traceability-lookups" replace />}
          />
          <Route path="/field-dictionary" element={<FieldDictionaryPage />} />
          <Route path="/system-design" element={<SystemDesignBlueprintPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
