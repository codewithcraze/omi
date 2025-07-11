
import React from 'react';
import { Suspense } from "react";
import Chat from './pages/chat.jsx'

function App() {
  return (
    <Suspense fallback={"Loading..."}>
        <Chat />
    </Suspense>
  )
}

export default App
