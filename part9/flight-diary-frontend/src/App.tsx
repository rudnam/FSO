import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => {
        setEntries(response.data);
      });
  }, []);
  return (
    <div>
      {entries.map((entry) => (
        <p key={entry.id}>
          <b>{entry.date}</b>
          <br />
          {entry.comment}
          <br />
          visibility: {entry.visibility}
          <br />
          weather: {entry.weather}
        </p>
      ))}
    </div>
  );
};

export default App;
