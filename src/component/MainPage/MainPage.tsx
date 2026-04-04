import { useState } from "react";
import CourtingPage from "../CourtingPage/CourtingPage";
import RelationshipPage from "../RelationshipPage/RelationshipPage";
import MonthsaryPage from "../MonthsaryPage/MonthsaryPage";
import "./MainPage.css";

type Section = "courting" | "relationship" | "monthsary";

export default function MainPage() {
  const [activeSection, setActiveSection] = useState<Section>("monthsary");

  return (
    <div className="main-page">
      <nav className="section-menu">
        <button
          className={`menu-item ${activeSection === "courting" ? "active" : ""}`}
          onClick={() => setActiveSection("courting")}
        >
          
          <span className="menu-label">Courting Stage</span>
        </button>
        <button
          className={`menu-item ${activeSection === "relationship" ? "active" : ""}`}
          onClick={() => setActiveSection("relationship")}
        >
          
          <span className="menu-label">Time Since "Yes"</span>
        </button>
        <button
          className={`menu-item ${activeSection === "monthsary" ? "active" : ""}`}
          onClick={() => setActiveSection("monthsary")}
        >
          
          <span className="menu-label">One Month</span>
        </button>
      </nav>

      <div className="section-content">
        {activeSection === "courting" && <CourtingPage />}
        {activeSection === "relationship" && <RelationshipPage />}
        {activeSection === "monthsary" && <MonthsaryPage />}
      </div>
    </div>
  );
}
