import { useState } from 'react'
import './App.css'
import Left from './Components/Left'
import Right from './Components/Right'
import "./theme.css";

function App() {

  interface mytype {
    user: string,
    Ai: string,
  }

  interface mytitle {
    id: string,
    Chats: mytype
    Heading: string
  }

  const [prompt, setPrompt] = useState<string>('');
  const [myres, setMyres] = useState<mytype[]>([]);
  const [title, setTitle] = useState<mytitle[]>([]);
  const [chatid, setChatid] = useState<string>("");

  return (
    <>
      <div className="chatbot bg-primary h-screen flex">
        <Left prompt={prompt} setPrompt={setPrompt} myres={myres} setMyres={setMyres} title={title} setTitle={setTitle} chatid={chatid} setChatid={setChatid} />
        <Right prompt={prompt} setPrompt={setPrompt} myres={myres} setMyres={setMyres} />
      </div>
    </>
  )
}

export default App;



