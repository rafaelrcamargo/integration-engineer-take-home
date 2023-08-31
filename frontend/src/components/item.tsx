import { memo, useState } from "react"

import type { Task } from "../types/task"
import { Modal } from "./modal"
import { cn } from "../utils"

import { Circle, CheckCircle } from "react-feather"
import { toast } from "sonner"

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
  prevProps.task.timestamp === nextProps.task.timestamp

type Props = {
  task: Task
  toggle: (task: Partial<Task>) => void
  deleteTask: (task: Partial<Task>) => void
}

export const Item = memo(
  ({
    toggle,
    deleteTask,
    task: { id, title, description, completed },
  }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
      <>
        <div
          className="relative flex cursor-pointer justify-between gap-2 rounded-lg border border-neutral-500/20 bg-neutral-50 p-4 shadow-md duration-150 hover:scale-[1.025] hover:shadow-xl"
          onClick={() => toggle({ id, completed })}
        >
          <div className="flex items-center gap-2">
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
                "flex flex-col line-through duration-300 ": true,
                "decoration-neutral-700": completed,
                "decoration-neutral-700/0": !completed,
              })}
            >
              <p className="max-w-[128px] truncate md:max-w-[256px]">{title}</p>
              <span className="max-w-[128px] truncate text-sm text-neutral-500 md:max-w-[256px]">
                {description}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center gap-2 [&>button]:outline-none">
            <button
              className="h-4 w-4 rounded-full bg-red-400 hover:bg-red-500"
              onClick={e => {
                e.stopPropagation()
                deleteTask({ id })
              }}
            />
            <button
              className="h-4 w-4 rounded-full bg-yellow-400 hover:bg-yellow-500"
              onClick={e => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
            />
            <button
              className="h-4 w-4 rounded-full bg-green-400 hover:bg-green-500"
              onClick={e => {
                e.stopPropagation()
                toast.message("I'm not really useful.", {
                  description: "But this design wouldn't work without me. :)",
                  duration: 3000,
                })
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
    )
  },
  areEqual,
)
