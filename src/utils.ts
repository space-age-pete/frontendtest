export const fileLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const rankNumbers = ['1', '2', '3', '4', '5', '6', '7', '8']

export function fileIndexToFileDisplay(number: number): string {
  return fileLetters[number]
}

export function fileDisplayToFileIndex(letter: string): number {
  return fileLetters.findIndex((fileLetter) => fileLetter === letter)
}

export function rankIndexToRankDisplay(number: number): string {
  return number + 1 + ''
}

export function rankDisplayToRankIndex(letter: string): number {
  return +letter - 1
}

export function determineHighlightColor(
  event: MouseEvent,
  currentSquareColor: SelectedColor
): SelectedColor {
  if (event.shiftKey && currentSquareColor !== 'green') {
    return 'green'
  }
  if (event.ctrlKey && currentSquareColor !== 'yellow') {
    return 'yellow'
  }
  if (event.altKey && currentSquareColor !== 'blue') {
    return 'blue'
  }
  if (!event.shiftKey && !event.ctrlKey && !event.altKey && currentSquareColor !== 'red') {
    return 'red'
  }
  return null
}
