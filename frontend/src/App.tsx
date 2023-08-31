import { Form } from "./components/form";
import { Deck } from "./components/deck";
import { TasksProvider } from "./providers/tasks";

const App = () => {
  return (
    <main className="max-w-2xl h-screen py-12 overflow-scroll w-full px-8 flex flex-col gap-8">
      <TasksProvider>
        <Form /> {/* The form handles the creations off new tasks */}
        <Deck /> {/* The deck handles the items and it's actions */}
      </TasksProvider>
    </main>
  );
};

export default App;
