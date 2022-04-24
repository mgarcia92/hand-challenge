/*
  👉 : moves the memory pointer to the next cell
  👈 : moves the memory pointer to the previous cell
  👆 : increment the memory cell at the current position
  👇 : decreases the memory cell at the current position.
  🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
  🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
  👊 : Display the current character represented by the ASCII code defined by the current position.
*/

const MIN = 0
const MAX = 255

function getNextFistIndex(index, instructions) {
  let fists = 1
  for (let i = index + 1; i < instructions.length; i++) {
    if (instructions[i] === '🤜') fists++
    if (instructions[i] === '🤛') fists--
    if (fists === 0) return i
  }
}

function getPreviousFistIndex(index, instructions) {
  let fists = 1
  for (let i = index - 1; i >= 0; i--) {
    if (instructions[i] === '🤜') fists--
    if (instructions[i] === '🤛') fists++
    if (fists === 0) return i
  }
}
function clamp(value) {
  if (value > MAX) return MIN
  if (value < MIN) return MAX
  return value
}

function translate(string) {
  const memory = [0]

  let pointer = 0
  let index = 0
  let output = ''
  const arrayOfInstructions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] ??= 0
    },
    '👈': () => {
      pointer--
      memory[pointer] ??= 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        index = getNextFistIndex(index, arrayOfInstructions)
      }
    },
    '🤛': () => {
      if (memory[pointer] != 0) {
        index = getPreviousFistIndex(index, arrayOfInstructions)
      }
    },
    '👊': () => {
      output += String.fromCharCode(memory[pointer])
    }
  }

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index]
    actions[action]()
    index++
  }

  return output.replace(/\n/g, '')
}

module.exports = { translate }