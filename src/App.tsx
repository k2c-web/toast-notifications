import { ToastsContextProvider } from './Components/Toasts/ToastsContext'
import Toasts from './Components/Toasts'

function App() {
  return (
    <ToastsContextProvider>
      <Toasts />
    </ToastsContextProvider>
  )
}

export default App
