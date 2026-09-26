import { useState } from 'react'
import './App.css'
import { WorksheetForm } from './pages/WorksheetForm.tsx'
import { ISpy } from './pages/ISpy.tsx'

function App() {
  const [sentence, setSentence] = useState("God is good to me.")
  const words = sentence.split(" ")
  return (
    <>
      <WorksheetForm sentence={sentence} setSentence={setSentence}></WorksheetForm>
      <ISpy words={words}></ISpy>
    </>
  );
}

export default App
