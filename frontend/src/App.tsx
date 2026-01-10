import { useEffect, useState } from "react";
import { DBService } from "../bindings/changeme";
import type { Timetable } from "../bindings/changeme/models";
import settingsIcon from "./settings.svg";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState<"main" | "settings">("main");
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [timetableSrc, setTimetableSrc] = useState<string>();

  const updateTimetables = async () => {
    const timetableData = await DBService.GetTimetables();
    setTimetables(timetableData);
    if (timetableData.length > 0 && !timetableSrc) {
      setTimetableSrc(timetableData[0].Src);
    }
  };

  useEffect(() => {
    updateTimetables();
  }, []);

  if (page === "settings") {
    return (
      <Settings
        updateTimetables={updateTimetables}
        setPage={setPage}
        timetables={timetables}
      />
    );
  }

  return (
    <div className="container">
      <select onChange={(e) => setTimetableSrc(e.target.value)}>
        {timetables.map(({ Name, Src }) => (
          <option key={Src} value={Src}>
            {Name}
          </option>
        ))}
      </select>
      {timetableSrc && (
        <iframe className="schedule" src={timetableSrc}></iframe>
      )}
      <img
        onClick={() => setPage("settings")}
        src={settingsIcon}
        className="settings-icon"
        alt=""
      />
      ;
    </div>
  );
}

export default App;
