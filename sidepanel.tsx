import { MemoryRouter } from "react-router-dom"

import "./index.css"

import NeynarSignIn from "~components/NeynarSignIn"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1E2120] px-3.5 py-2.5">
      <main className="flex-1 overflow-auto rounded-t-xl bg-[#282829] mt-2 flex flex-col">
        <NeynarSignIn />
      </main>
    </div>
  )
}

function IndexSidePanel() {
  return (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
}

export default IndexSidePanel
