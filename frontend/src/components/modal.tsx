import { FormEvent } from "react";

import { useTasks } from "../providers/tasks";
import { updateTask } from "../api";
import { cn } from "../utils";

import { X } from "react-feather";
import { toast } from "sonner";

type ModalProps = {
  id: string;
  title: string;
  description: string;
  isOpen: (isModalOpen: boolean) => void;
};

export const Modal = ({ id, title, description, isOpen }: ModalProps) => {
  const { setTasks } = useTasks();

  // Handle the form submission, this form is uncontrolled,
  // this makes for a better UX using Native HTML elements and events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTask({
      id,
      title: (e.currentTarget[0] as HTMLInputElement).value,
      description: (e.currentTarget[1] as HTMLInputElement).value,
    }).then((tasks) => tasks && setTasks(tasks));

    toast.success("Task updated successfully");

    isOpen(false);
  };

  const CN =
    "h-12 md:h-14 w-full pl-6 pr-2 border outline-none bg-neutral-50 focus:shadow-sm duration-150 hover:shadow-md border-neutral-500/20 rounded-lg";

  return (
    <>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
      <div className="fixed inset-0 flex justify-center items-center z-20">
        <div className="bg-neutral-50 rounded-xl w-4/5 max-w-lg">
          <div className="flex w-full px-8 py-5 mt-1 border-b border-neutral-500/20 justify-between items-center">
            <h2 className="font-bold text-xl">Edit a task</h2>
            <span className="cursor-pointer" onClick={() => isOpen(false)}>
              <X />
            </span>
          </div>

          <form className="flex gap-4 flex-wrap p-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a task"
              defaultValue={title}
              className={CN}
            />
            <input
              type="text"
              placeholder="And a description"
              defaultValue={description}
              className={CN}
            />

            <button
              type="submit"
              className={cn(
                CN,
                "flex items-center justify-center p-0 hover:shadow-xl mt-2 gap-4 bg-neutral-900 text-neutral-50 min-w-[56px]",
              )}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
