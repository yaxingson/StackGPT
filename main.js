import { readFile, writeFile } from 'node:fs/promises'
import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'
import { testPlanPrompt, designTestPrompt } from './prompts/index.js'

dotenv.config({override:true})

const client = new OpenAI()

async function get_completion(prompt) {
  const completion = await client.chat.completions.create({
    model:'gpt-4o-mini',
    messages:[
      {'role':'user', 'content':prompt}
    ]
  })
  const message = completion.choices[0].message
  return message.content
}

async function main() {
  const pdrContent = await readFile('./pdr.md')
  const prompt = designTestPrompt.replace('__PDR__', pdrContent)

  await writeFile('./test_cases.md', await get_completion(prompt))

}

main()

