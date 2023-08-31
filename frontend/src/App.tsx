import { Form } from "./components/form"
import { Deck } from "./components/deck"
import { TasksProvider } from "./providers/tasks"

const App = () => {
  return (
    <main className="flex h-screen w-full max-w-2xl flex-col gap-8 overflow-scroll px-8 py-12">
      <TasksProvider>
        <Form /> {/* The form handles the creations off new tasks */}
        <Deck /> {/* The deck handles the items and it's actions */}
      </TasksProvider>
    </main>
  )
}

export default App
