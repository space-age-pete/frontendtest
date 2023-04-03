<script setup lang="ts">
import { ref, computed } from "vue"

type SelectedColor = "red" | "green" | "yellow" | "blue" | "none"

type Square = {
    rank: number,
    file: number,
    selectedColor: SelectedColor
}

const props = defineProps<{
    boardFlipped: boolean
}>()

const emit = defineEmits<{
    (event: 'squareClick', value: string): void
}>()

const fileLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function fileIndexToLetter(number: number): string {
    return fileLetters[number]
}

function fileLetterToIndex(letter: string): number {
    return fileLetters.findIndex((fileLetter) => fileLetter === letter)
}

function rankIndexToLetter(number: number): string {
    return number + 1 + ""
}

function rankLetterToIndex(letter: string): number {
    return +letter - 1
}

// todo: add display rank and file directly to each square object
const unsortedSquares = ref<Square[]>(Array.from({ length: 64 }, (_, index) => {
    const square: Square = {
        rank: Math.floor(index / 8),
        file: index % 8,
        selectedColor: "none"
    }

    return square
}))

const sortedSquares = computed<Square[]>(() => {
    return unsortedSquares.value.sort((squareA, squareB) => {
        if (props.boardFlipped) {
            if (squareA.rank < squareB.rank) return -1
            if (squareA.rank > squareB.rank) return 1

            if (squareA.file < squareB.file) return 1
            if (squareA.file > squareB.file) return -1

            else return 0
        } else {
            if (squareA.rank < squareB.rank) return 1
            if (squareA.rank > squareB.rank) return -1

            if (squareA.file < squareB.file) return -1
            if (squareA.file > squareB.file) return 1

            else return 0
        }
    })
})

function shouldBeDark(square: Square): boolean {
    const { rank, file } = square
    return rank % 2 === file % 2
}

function shouldDisplayRank(square: Square): boolean {
    return (!props.boardFlipped && square.file === 0 ) || (props.boardFlipped && square.file === 7 )
}

function shouldDisplayFile(square: Square): boolean {
    return (!props.boardFlipped && square.rank === 0 ) || (props.boardFlipped && square.rank === 7 )
}

function getSquareClasses(square: Square): string {
    return `${square.selectedColor === 'none' ? '' : square.selectedColor} ${shouldBeDark(square) ? 'dark' : ''}`
}

function rightClick(square: Square, event: MouseEvent): void {
    event.preventDefault()

    if (event.shiftKey && square.selectedColor !== "green") {
        square.selectedColor = "green"
    } else if (event.ctrlKey && square.selectedColor !== "yellow") {
        square.selectedColor = "yellow"
    } else if (event.altKey && square.selectedColor !== "blue") {
        square.selectedColor = "blue"
    } else if (!event.shiftKey && !event.ctrlKey && !event.altKey && square.selectedColor !== "red") {
        square.selectedColor = "red"
    } else {
        square.selectedColor = "none"
    }
    
    emit('squareClick', fileIndexToLetter(square.file) + rankIndexToLetter(square.rank))
}

function leftClick() {
    unsortedSquares.value = unsortedSquares.value.map((square) => ({ ...square, selectedColor: "none" }))
}
</script>

<template>
    <div class="board" @click="leftClick">
        <template v-for="square, index in sortedSquares">
            <div class="square"
                :class=" getSquareClasses(square)"
                @click.right="(event) => rightClick(square, event)" >
                <template v-if="shouldDisplayFile(square)">
                    <span  :class="{ dark: !!shouldBeDark(square)}" class="file-letter label">{{ fileIndexToLetter(square.file) }}</span>
                </template >
                <template v-if="shouldDisplayRank(square)">
                    <span  :class="{ dark: !!shouldBeDark(square)}" class="rank-number label">{{ rankIndexToLetter(square.rank) }}</span>
                </template >
            </div>
        </template>
    </div>
</template>

<style>
.board {
    display: grid;
    width: 300px;
    aspect-ratio: 1;
    grid-template-rows: repeat(8, 12.5%);
    grid-template-columns: repeat(8, 12.5%);
}

.square {
    width: 100%;
    height: 100%;
    border: 0.5px solid black;
    background-color: aqua;
    aspect-ratio: 1;
}

.square.dark {
    background-color: darkcyan;
}

.square.red {
    background-color: red;
}

.square.dark.red {
    background-color: darkred;
}

.square.green {
    background-color: lightgreen;
}

.square.dark.green {
    background-color: darkgreen;
}

.square.yellow {
    background-color: yellow;
}

.square.dark.yellow {
    background-color: darkgoldenrod;
}

.square.blue {
    background-color: blue;
}

.square.dark.blue {
    background-color: darkblue;
}

.label {
    font-size: xx-small;
    color: darkcyan
}

.label.dark {
    color: aqua
}

.file-letter {
    position: absolute;
    right: 3px;
    bottom: 0px
}

.rank-number {
    position: absolute;
    left: 3px;
    top: 0px
}
</style>