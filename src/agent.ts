import { runLLM } from './llm'
import { addMessages, getMessages } from './memory'
import { showLoader } from './ui'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('﹏𓊝﹏\n')
  const history = await getMessages()

  const response = await runLLM({ messages: history, tools })
  if (response.tool_calls) {
    console.log(response.tool_calls)
  }
  await addMessages([response])

  loader.stop()
  return getMessages()
}
