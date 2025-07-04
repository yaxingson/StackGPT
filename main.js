import * as assert from 'node:assert'
import { readFile, writeFile } from 'node:fs/promises'
import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'
import { 
  testPlanPrompt, 
  designTestPrompt, 
  testDefectPrompt, 
  testCodeGenPrompt,
  codeGenPrompt,
} from './prompts/index.js'

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
  const content = await readFile('./pdr.md')
  const prompt = codeGenPrompt.replace('__PDR__', content)

  console.log(await get_completion(prompt))

  

  

}

main()

