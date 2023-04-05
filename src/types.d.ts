type SelectedColor = "red" | "green" | "yellow" | "blue" | null

type Square = {
    rankIndex: number,
    fileIndex: number,
    rankDisplay: string,
    fileDisplay: string,
    selectedColor: SelectedColor
}