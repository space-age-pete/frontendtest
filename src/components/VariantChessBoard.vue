<script setup lang="ts">
import { fileIndexToFileDisplay, rankIndexToRankDisplay, fileLetters, rankNumbers, determineHighlightColor } from "@/utils";
import { ref, computed, onMounted } from "vue"

const props = defineProps<{
    boardFlipped: boolean
}>()

const emit = defineEmits<{
    (event: 'squareClick', value: string): void
}>()

const boardRef = ref<Element>()
const boardWidth = ref<number>(0)

const orderedFileLetters = computed(() => !props.boardFlipped ? fileLetters : [...fileLetters].reverse())
const orderedRankNumbers = computed(() => !props.boardFlipped ? rankNumbers : [...rankNumbers].reverse())

onMounted(() => {
    const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const cr = entry.contentRect;
            const width = cr.width;
            boardWidth.value = width;
        })
    })
    if (boardRef.value) {
        observer.observe(boardRef.value)
    }
})

// 2 dimensional array (8x8)
function getEmptyHighlightsArray(): (SelectedColor | null)[][] {
    return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null))
}

const highlights = ref(getEmptyHighlightsArray())

const flatHighlights = computed(() => {
    return highlights.value.flatMap((row, xIndex) => row.map((color, yIndex) => {
        return {
            style: { translate: !props.boardFlipped ? `${100 * xIndex}% ${100 * (7 - yIndex)}%` : `${100 * (7 - xIndex)}% ${100 * yIndex}%` },
            class: color,
            display: !!color
        }
    }))
})

function rightClick(event: MouseEvent): void {
    event.preventDefault()

    const offsetToRankOrFileIndex = (offset: number) => Math.floor(offset / (boardWidth.value / 8))

    // converting the default coordinates of the grid ([0,0] in top right) to standard white pov ([0,0] in bottom left) or black pov ([0,0] in top right)
    const fileIndex = !props.boardFlipped
        ? offsetToRankOrFileIndex(event.offsetX)
        : 7 - offsetToRankOrFileIndex(event.offsetX)
    const rankIndex = !props.boardFlipped
        ? 7 - offsetToRankOrFileIndex(event.offsetY)
        : offsetToRankOrFileIndex(event.offsetY)

    let currentColor = highlights.value[fileIndex][rankIndex]

    highlights.value[fileIndex][rankIndex] = determineHighlightColor(event, currentColor)

    const coords = fileIndexToFileDisplay(fileIndex) + rankIndexToRankDisplay(rankIndex)

    emit('squareClick', coords)
}


function leftClick() {
    highlights.value = getEmptyHighlightsArray()
}

</script>

<template>
    <div class="variant-chess-board" @click="leftClick" @click.right="rightClick" ref="boardRef">
        <div class="file-rank-labels file-letters">
            <template v-for="letter in orderedFileLetters">
                <span>{{ letter }}</span>
            </template>
        </div>
        <div class="file-rank-labels rank-numbers">
            <template v-for="number in orderedRankNumbers">
                <span>{{ number }}</span>
            </template>
        </div>
        <template v-for="highlight in flatHighlights">
            <template v-if="highlight.display">
                <div class="square-highlight" :style="highlight.style" :class="highlight.class" />
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.variant-chess-board {
    position: relative;
    display: block;
    height: min(90vw, 90vh);
    width: min(90vw, 90vh);
    aspect-ratio: 1;
    background-image: var(--board-image);
    background-size: contain;

    @media (min-width: 960px) {
        height: min(90vh, calc(100vw - 400px));
        width: min(90vh, calc(100vw - 400px));
    }
}

.square-highlight {
    position: absolute;
    height: 12.5%;
    width: 12.5%;
    opacity: 0.8;
    pointer-events: none;

    &.red {
        background-color: var(--light-square-red-highlight);
    }

    &.green {
        background-color: var(--light-square-green-highlight);
    }

    &.yellow {
        background-color: var(--light-square-yellow-highlight);
    }

    &.blue {
        background-color: var(--light-square-blue-highlight);
    }
}

.file-rank-labels {
    font-size: 1rem;
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    pointer-events: none;
    color: #c5d5dc;

    :nth-child(2n) {
        color: #7a9db2;
    }

    &.file-letters {
        bottom: 3px;
        right: 5px;
        width: 100%;
        text-align: right;
    }

    &.rank-numbers {
        flex-direction: column-reverse;
        top: 3px;
        left: 5px;
        height: 100%;
    }

    span {
        flex-grow: 1
    }

    @media (min-width: 960px) {
        font-size: 1.5rem;
    }
}
</style>