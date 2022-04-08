import { useState } from "react"
import ReadFile from "./ReadFile"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ReadFile />
    </div>
  )
}

export default App
