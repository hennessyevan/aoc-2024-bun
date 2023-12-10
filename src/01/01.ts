export function parse(input: string) {
  return input.split('\n')
}

export function partOne(input: ReturnType<typeof parse>) {
  const lines = input
  const numbers: number[] = []

  for (const line of lines) {
    const lineNumbers = line
      .split('')
      .filter(char => !Number.isNaN(Number(char)))
    const firstDigit = lineNumbers.at(0)!
    const lastDigit = lineNumbers.at(-1)!

    const number = Number(`${firstDigit}${lastDigit}`)

    numbers.push(number)
  }

  return numbers.reduce((a, b) => a + b, 0)
}

const digitMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
} as const

function findNumbers(line: string) {
  return matchOverlap(
    line,
    /one|two|three|four|five|six|seven|eight|nine|[1-9]/g
  ).map(res => digitMap[res] ?? Number(res))
}

function matchOverlap(input: string, re: RegExp) {
  var r = [],
    m
  // Prevent infinite loops
  if (!re.global) re = new RegExp(re.source, (re + '').split('/').pop() + 'g')
  while ((m = re.exec(input))) {
    re.lastIndex -= m[0].length - 1
    r.push(m[0])
  }
  return r
}

export function partTwo(input: ReturnType<typeof parse>) {
  const lines = input
  const numbers: number[] = []

  for (const line of lines) {
    const lineNumbers = findNumbers(line)

    const firstDigit = lineNumbers.at(0)!
    const lastDigit = lineNumbers.at(-1)!

    const number = Number(`${firstDigit}${lastDigit}`)

    numbers.push(number)
  }

  return numbers.reduce((a, b) => a + b, 0)
}
