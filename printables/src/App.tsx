import { useState } from "react";
import "./App.css";
import { WorksheetForm } from "./pages/WorksheetForm";
import { ISpy } from "./pages/ISpy";

function App() {
    const [sentence, setSentence] = useState("God is good to me");
    const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

    return (
        <div className="app">
            <div className="tabs">
                <button
                    className={activeTab === "form" ? "active" : ""}
                    onClick={() => setActiveTab("form")}
                >
                    Create Worksheet
                </button>

                <button
                    className={activeTab === "preview" ? "active" : ""}
                    onClick={() => setActiveTab("preview")}
                >
                    Preview & Print
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "form" && (
                    <WorksheetForm
                        sentence={sentence}
                        setSentence={setSentence}
                    />
                )}

                {activeTab === "preview" && (
                    <ISpy sentence={sentence} />
                )}
            </div>
        </div>
    );
}

export default App;
