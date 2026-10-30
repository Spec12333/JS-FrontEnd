import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BookDetails from './components/BookDetails'
import Books from './components/Books'

function App() {
  // Lives here so the page number survives opening a book and coming back
  const [page, setPage] = useState(1)

  return (
    <BrowserRouter>
      <main className="app-shell">
        <header className="page-header">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4.75 5.5c2.8-.9 5.2-.5 7.25 1.2v12c-2.05-1.7-4.45-2.1-7.25-1.2v-12Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M19.25 5.5c-2.8-.9-5.2-.5-7.25 1.2v12c2.05-1.7 4.45-2.1 7.25-1.2v-12Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="brand-copy">
            <span className="brand-eyebrow">A quiet place for stories</span>
            <span className="brand-name">Indigo Library</span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Books page={page} setPage={setPage} />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
