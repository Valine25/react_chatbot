import axios from "axios";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState([]);
  async function generateAnswer() {
    setAnswer("Thinking...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=your_api_key",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: query,
                },
              ],
            },
          ],
        },
      });
      const output = response.data.candidates[0].content.parts[0].text;
      setAnswer(output);
    } catch (err) {
      console.error(err);
      setAnswer(err);
    }
  }
  return (
    <div className="container">
      <h1>Chat AI</h1>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>{answer}</p>
    </div>
  );
}
