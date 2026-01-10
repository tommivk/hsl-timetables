import { useState } from "react";
import { DBService } from "../../bindings/changeme";
import type { Timetable } from "../../bindings/changeme/models";

type Props = {
  updateTimetables: () => Promise<void>;
  timetables: Timetable[];
  setPage: React.Dispatch<React.SetStateAction<"settings" | "main">>;
};

const Settings = ({ updateTimetables, timetables, setPage }: Props) => {
  const [nameInput, setNameInput] = useState("");
  const [srcInput, setSrcInput] = useState("");

  const addTimetable = async () => {
    await DBService.AddTimetable(nameInput, srcInput);
    await updateTimetables();
    setNameInput("");
    setSrcInput("");
  };

  const deleteTimetable = async (id: string) => {
    await DBService.DeleteTimetable(id);
    await updateTimetables();
  };

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
};

export default Settings;
