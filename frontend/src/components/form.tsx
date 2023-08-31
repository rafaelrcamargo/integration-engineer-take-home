import { FormEvent } from "react"

import { useTasks } from "../providers/tasks"
import { createTask } from "../api"
import { cn } from "../utils"

import { Plus } from "react-feather"

export const Form = () => {
  const { setTasks } = useTasks()

  // Handle the form submission, this form is uncontrolled,
  // this makes for a better UX using Native HTML elements and events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createTask({
      title: (e.currentTarget[0] as HTMLInputElement).value,
      description: (e.currentTarget[1] as HTMLInputElement).value,
    }).then(tasks => tasks && setTasks(tasks))
    ;(e.target as HTMLFormElement).reset()
    ;(e.currentTarget[0] as HTMLInputElement).focus()
  }

  const CN =
    "h-12 md:h-14 w-full pl-6 pr-2 border outline-none bg-neutral-50 focus:shadow-xl border-neutral-500/20 shadow-md rounded-lg"

  return (
    <form
      className="flex flex-wrap gap-2 md:flex-nowrap"
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder="Add a task" className={CN} />
      <input type="text" placeholder="And a description" className={CN} />

      <button
        type="submit"
        className={cn(
          CN,
          "flex min-w-[56px] items-center justify-center bg-neutral-900 p-0 text-neutral-50 md:w-14",
        )}
      >
        <Plus width={32} height={32} />
      </button>
    </form>
  )
}
