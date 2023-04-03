<script setup lang="ts">
import { ref } from "vue"
import ChessBoard from '@/components/ChessBoard.vue';

const boardFlipped = ref(false)

function flipClick() {
    boardFlipped.value = !boardFlipped.value
}

function logSquares(coord: string): void {
  console.log(coord)
}

</script>

<template>
  <main>
    Chess
  </main>
    <button @click="flipClick">flip</button>
  <ChessBoard :board-flipped="boardFlipped" @square-click="logSquares"/>
</template>
