import { memo, useState } from "react";

import type { Task } from "../types/task";
import { Modal } from "./modal";
import { cn } from "../utils";

import { Circle, CheckCircle } from "react-feather";
import { toast } from "sonner";

/**
 * This helps React to skip rendering the component if the props are equal.
 * - To ensure that the tasks are not re-rendered, we could compare the id of the task.
 * - However, here if we did that we could skip rendering the component after it was edited.
 * - So, we compare the timestamp of the task instead.
 * @param prevProps Props
 * @param nextProps Props
 * @returns boolean
 */

const areEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.task.timestamp === nextProps.task.timestamp;

type Props = {
  task: Task;
  toggle: (task: Partial<Task>) => void;
  deleteTask: (task: Partial<Task>) => void;
};

export const Item = memo(
  ({
    toggle,
    deleteTask,
    task: { id, title, description, completed },
  }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
        <div
          className="flex relative gap-2 cursor-pointer bg-neutral-50 justify-between border rounded-lg p-4 border-neutral-500/20 shadow-md hover:scale-[1.025] hover:shadow-xl duration-150"
          onClick={() => toggle({ id, completed })}
        >
          <div className="flex gap-2 items-center">
            {/* Checkbox */}
            <div
              className={cn({
                "text-neutral-700": !completed,
                "text-green-500": completed,
                "duration-300": true,
              })}
            >
              {completed ? <CheckCircle /> : <Circle />}
            </div>

            {/* Body */}
            <div
              className={cn({
                "duration-300 flex flex-col line-through ": true,
                "decoration-neutral-700": completed,
                "decoration-neutral-700/0": !completed,
              })}
            >
              <p className="md:max-w-[256px] max-w-[128px] truncate">{title}</p>
              <span className="text-sm text-neutral-500 md:max-w-[256px] max-w-[128px] truncate">
                {description}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 [&>button]:outline-none justify-center items-center">
            <button
              className="bg-red-400 hover:bg-red-500 rounded-full h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask({ id });
              }}
            />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 rounded-full h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            />
            <button
              className="bg-green-400 hover:bg-green-500 rounded-full h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                toast.message("I'm not really useful.", {
                  description: "But this design wouldn't work without me. :)",
                  duration: 3000,
                });
              }}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            id={id}
            title={title}
            isOpen={setIsModalOpen}
            description={description}
          />
        )}
      </>
    );
  },
  areEqual,
);
