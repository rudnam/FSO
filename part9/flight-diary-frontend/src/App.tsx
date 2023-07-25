import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { createEntry, getAllEntries } from "./services/diaryService";
import { parseVisibility, parseWeather } from "./utils";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => setEntries(data));
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date,
      visibility: parseVisibility(visibility),
      weather: parseWeather(weather),
      comment,
    }).then((data) => {
      setEntries(entries.concat(data));
    });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <h2>Add new entry</h2>
        <div>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
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
