import { useEffect, useState } from "react";
import { DBService } from "../bindings/changeme";
import type { Timetable } from "../bindings/changeme/models";

function App() {
  const [page, setPage] = useState<"main" | "settings">("settings");

  const [nameInput, setNameInput] = useState("");
  const [srcInput, setSrcInput] = useState("");

  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [timetableSrc, setTimetableSrc] = useState<string>();

  const updateTimetableData = async () => {
    const timetableData = await DBService.GetTimetables();
    setTimetables(timetableData);
    if (timetableData.length > 0 && !timetableSrc) {
      setTimetableSrc(timetableData[0].Src);
    }
  };

  const addTimetable = async () => {
    await DBService.AddTimetable(nameInput, srcInput);
    await updateTimetableData();
    setNameInput("");
    setSrcInput("");
  };

  const deleteTimetable = async (id: string) => {
    await DBService.DeleteTimetable(id);
    await updateTimetableData();
  };

  useEffect(() => {
    updateTimetableData();
  }, []);

  if (page === "settings") {
    return (
      <div className="settings">
        <h3>Add new Timetable</h3>

        <form onSubmit={addTimetable}>
          <label>Name</label>
          <input type="text" onChange={(e) => setNameInput(e.target.value)} />
          <label>Timetable URL</label>
          <input type="text" onChange={(e) => setSrcInput(e.target.value)} />
          <button type="submit">Add Timetable</button>
        </form>

        <div>
          <h3>Timetables</h3>
          {timetables.map(({ Id, Name }) => (
            <div key={Id}>
              {Name} <button onClick={() => deleteTimetable(Id)}>Delete</button>
            </div>
          ))}
        </div>

        <button className="view-timetables-btn" onClick={() => setPage("main")}>
          View Timetables
        </button>
      </div>
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
    </div>
  );
}

export default App;
