import type OpenAI from 'openai'

const getVIMCommands = ({
  userMessage,
  toolArgs,
}: {
  userMessage: string
  toolArgs: string
}) => `
  ## Basic Navigation
  h: Move left
  l: Move right
  j: Move down
  k: Move up
  0: Move to the beginning of the line
  ^: Move to the first non-blank character of the line
  $: Move to the end of the line
  gg: Go to the beginning of the file
  G: Go to the end of the file
  :n: Go to line number n (e.g., :42)
`

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_vim_commands':
      return getVIMCommands(input)
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
