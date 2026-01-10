import { useState } from "react";

type Schedule = {
  name: string;
  src: string;
};

function App() {
  const [schedules, _setSchedules] = useState<Array<Schedule>>([
    {
      name: "Rautatientori",
      src: "https://omatnaytot.hsl.fi/view?cont=JqI+wR3diG+8Nubh3qIPiQ==",
    },
    {
      name: "Korkeasaari",
      src: "https://omatnaytot.hsl.fi/view?cont=dapkri+lgG88x5gc7YqcRg==",
    },
  ]);
  const [scheduleSrc, setScheduleSrc] = useState<string>();

  return (
    <div className="container">
      <select onChange={(e) => setScheduleSrc(e.target.value)}>
        {schedules.map(({ name, src }) => (
          <option key={src} value={src}>
            {name}
          </option>
        ))}
      </select>
      {scheduleSrc && <iframe className="schedule" src={scheduleSrc}></iframe>}
    </div>
  );
}

export default App;
