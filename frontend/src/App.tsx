import { useEffect, useState } from "react";

import type { Task } from "./types/task";
import { getTasks } from "./api";

import { Form } from "./components/form";
import { Deck } from "./components/deck";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
  }, []);

  return (
    <main className="max-w-2xl w-full px-8 flex flex-col gap-8">
      <Form setTasks={setTasks} />
      <Deck tasks={tasks} setTasks={setTasks} />
    </main>
  );
};

export default App;
