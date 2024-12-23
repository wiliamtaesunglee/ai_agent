import { zodFunction } from 'openai/helpers/zod'
import type { AIMessage } from '../types'
import { openai } from './ai'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction)
  //console.log({ formattedTools: JSON.stringify(formattedTools) })
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  const [choice] = response.choices

  return choice.message
}
