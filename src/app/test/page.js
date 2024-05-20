"use client"

import { testFun } from "@/lib/action"

const TestPage = () => {
    //Testing Server Actions
  return (
    <div>
      <button onClick={() => testFun()}>Click Me</button>
    </div>
  )
}

export default TestPage
