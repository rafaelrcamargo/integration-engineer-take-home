import { FormEvent } from "react";

import type { Task } from "../types/task";
import { Plus } from "react-feather";
import { createTask } from "../api";
import { cn } from "../utils";

type Props = {
  setTasks: (tasks: Task[]) => void;
};

export const Form = ({ setTasks }: Props) => {
  // Handle the form submission, this form is uncontrolled,
  // this makes for a better UX using Native HTML elements and events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTask({
      title: (e.currentTarget[0] as HTMLInputElement).value,
      description: (e.currentTarget[1] as HTMLInputElement).value,
    }).then((tasks) => tasks && setTasks(tasks));

    (e.target as HTMLFormElement).reset();
    (e.currentTarget[0] as HTMLInputElement).focus();
  };

  const CN =
    "h-12 md:h-14 w-full pl-6 pr-2 border outline-none bg-neutral-50 focus:shadow-xl border-neutral-500/20 shadow-md rounded-lg";

  return (
    <form
      className="flex gap-2 md:flex-nowrap flex-wrap"
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder="Add a task" className={CN} />
      <input type="text" placeholder="And a description" className={CN} />

      <button
        type="submit"
        className={cn(
          CN,
          "flex items-center justify-center p-0 bg-neutral-900 text-neutral-50 min-w-[56px] md:w-14",
        )}
      >
        <Plus width={32} height={32} />
      </button>
    </form>
  );
};
