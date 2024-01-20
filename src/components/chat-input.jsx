import { useState } from "react"
import { Button } from "@mantine/core"
export function ChatInput() {
  const [value, setValue] = useState('')

  return (
    <div className="flex items-center gap-5">
      <textarea
        className="h-15 w-full border-2"
        onChange={(event) => setValue(event.target.value)}
      />

      <Button
        variant="outline"
        color="blue"
        className="block h-full w-40 p-4"
        onClick={() => postMessage(value)}>
        Send message
      </Button>
    </div>
  )
}
