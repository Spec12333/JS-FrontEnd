import './App.css'
import { ToDoList } from './components/ToDoList'
import { ToDoContextProvider } from './context/ToDoContextProvider'
function App() {

  return (
    <div>
      <ToDoContextProvider>
        <ToDoList />
      </ToDoContextProvider>
    </div>
  )
}

export default App