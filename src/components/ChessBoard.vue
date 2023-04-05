<script setup lang="ts">
import { fileIndexToFileDisplay, rankIndexToRankDisplay } from "@/utils";
import { ref, computed } from "vue"

const props = defineProps<{
    boardFlipped: boolean
}>()

const emit = defineEmits<{
    (event: 'squareClick', value: string): void
}>()

const unsortedSquares = ref<Square[]>(Array.from({ length: 64 }, (_, index) => {
    const square: Square = {
        rankIndex: Math.floor(index / 8),
        fileIndex: index % 8,
        rankDisplay: rankIndexToRankDisplay(Math.floor(index / 8)),
        fileDisplay: fileIndexToFileDisplay(index % 8),
        selectedColor: null
    }

    return square
}))

const sortedSquares = computed<Square[]>(() => {
    return unsortedSquares.value.sort((squareA, squareB) => {
        if (props.boardFlipped) {
            if (squareA.rankIndex < squareB.rankIndex) return -1
            if (squareA.rankIndex > squareB.rankIndex) return 1

            if (squareA.fileIndex < squareB.fileIndex) return 1
            if (squareA.fileIndex > squareB.fileIndex) return -1

            else return 0
        } else {
            if (squareA.rankIndex < squareB.rankIndex) return 1
            if (squareA.rankIndex > squareB.rankIndex) return -1

            if (squareA.fileIndex < squareB.fileIndex) return -1
            if (squareA.fileIndex > squareB.fileIndex) return 1

            else return 0
        }
    })
})

function shouldBeDark({ rankIndex, fileIndex }: Square): boolean {
    return rankIndex % 2 === fileIndex % 2
}

function shouldDisplayRank({ fileIndex }: Square): boolean {
    return (!props.boardFlipped && fileIndex === 0) || (props.boardFlipped && fileIndex === 7)
}

function shouldDisplayFile({ rankIndex }: Square): boolean {
    return (!props.boardFlipped && rankIndex === 0) || (props.boardFlipped && rankIndex === 7)
}

function getSquareClasses(square: Square): string {
    return `${shouldBeDark(square) ? 'dark' : ''}${square.selectedColor ? square.selectedColor : ''}`
}

function rightClick(square: Square, event: MouseEvent): void {
    event.preventDefault()

    //determine highlight color based on click type
    if (event.shiftKey && square.selectedColor !== "green") {
        square.selectedColor = "green"
    } else if (event.ctrlKey && square.selectedColor !== "yellow") {
        square.selectedColor = "yellow"
    } else if (event.altKey && square.selectedColor !== "blue") {
        square.selectedColor = "blue"
    } else if (!event.shiftKey && !event.ctrlKey && !event.altKey && square.selectedColor !== "red") {
        square.selectedColor = "red"
    } else {
        square.selectedColor = null
    }

    emit('squareClick', square.fileDisplay + square.rankDisplay)
}

function leftClick() {
    unsortedSquares.value = unsortedSquares.value.map((square) => ({ ...square, selectedColor: null }))
}
</script>

<template>
    <div class="chess-board" @click="leftClick">
        <template v-for="square, index in sortedSquares">
            <div class="chess-board-square" :class="getSquareClasses(square)"
                @click.right="(event) => rightClick(square, event)">
                <template v-if="shouldDisplayFile(square)">
                    <span :class="{ dark: !!shouldBeDark(square) }" class="file-letter file-rank-label">{{
                        square.fileDisplay }}</span>
                </template>
                <template v-if="shouldDisplayRank(square)">
                    <span :class="{ dark: !!shouldBeDark(square) }" class="rank-number file-rank-label">{{
                        square.rankDisplay }}</span>
                </template>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.chess-board {
    grid-area: 'board';
    position: relative;
    display: grid;

    height: min(90vw, 90vh);

    aspect-ratio: 1;
    grid-template-rows: repeat(8, 12.5%);
    grid-template-columns: repeat(8, 12.5%);

    @media (min-width: 960px) {
        height: min(90vh, calc(100vw - 400px));
        width: min(90vh, calc(100vw - 400px));
    }
}


.chess-board-square {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--light-square-color);
    color: var(--dark-square-color);

    &.dark {
        background-color: var(--dark-square-color);
        color: var(--light-square-color);
    }

    &.red {
        background-color: var(--light-square-red-highlight);
        color: var(--dark-square-red-highlight);
    }

    &.darkred {
        background-color: var(--dark-square-red-highlight);
        color: var(--light-square-red-highlight);
    }

    &.green {
        background-color: var(--light-square-green-highlight);
        color: var(--dark-square-green-highlight);
    }

    &.darkgreen {
        background-color: var(--dark-square-green-highlight);
        color: var(--light-square-green-highlight);
    }

    &.yellow {
        background-color: var(--light-square-yellow-highlight);
        color: var(--dark-square-yellow-highlight);
    }

    &.darkyellow {
        background-color: var(--dark-square-yellow-highlight);
        color: var(--light-square-yellow-highlight);
    }

    &.blue {
        background-color: var(--light-square-blue-highlight);
        color: var(--dark-square-blue-highlight);
    }

    &.darkblue {
        background-color: var(--dark-square-blue-highlight);
        color: var(--light-square-blue-highlight);
    }
}

.file-rank-label {
    font-size: 1rem;
    position: absolute;

    &.file-letter {
        right: 5px;
        bottom: 3px
    }

    &.rank-number {
        left: 5px;
        top: 3px
    }

    @media (min-width: 960px) {
        font-size: 1.5rem;
    }
}
</style>