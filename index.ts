import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const vimTool = {
  name: 'get_vim_commands',
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this commands?'),
  }),
}

const response = await runAgent({ userMessage, tools: [vimTool] })

//console.log(response)
