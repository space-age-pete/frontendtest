<script setup lang="ts">
import { ref } from "vue"
import ChessBoard from '@/components/ChessBoard.vue';
import Sidebar from "@/components/Sidebar.vue";
import PageLayout from "@/components/PageLayout.vue";
import VariantChessBoard from "@/components/VariantChessBoard.vue";

const boardFlipped = ref(false)

const displayVariantBoard = ref(false)

const squaresClicked = ref<string[]>([])

function flipBoard() {
  boardFlipped.value = !boardFlipped.value
}

function logSquares(coord: string): void {
  squaresClicked.value.push(coord)
}

function switchBoardImplementation(): void {
  reset();
  boardFlipped.value = false;
  displayVariantBoard.value = !displayVariantBoard.value
}

function reset() {
  squaresClicked.value = []
}

</script>

<template>
  <PageLayout>
    <div class="content">
      <template v-if="!displayVariantBoard">
        <ChessBoard :board-flipped="boardFlipped" @square-click="logSquares" />
      </template>
      <template v-else>
        <VariantChessBoard :board-flipped="boardFlipped" @square-click="logSquares" />
      </template>

      <Sidebar :squares-clicked="squaresClicked" @flip-board-click="flipBoard" @reset="reset"
        @switch-board-implementation="switchBoardImplementation" />
    </div>
  </PageLayout>
</template>

<style lang="scss">
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  width: 100%;
  padding: 30px;
  overflow: hidden;
  height: fit-content;

  @media (min-width: 960px) {
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
  }
}
</style>
