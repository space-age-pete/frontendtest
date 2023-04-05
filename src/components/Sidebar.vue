<script setup lang="ts">
import SidebarButton from './SidebarButton.vue';


const props = defineProps<{
    squaresClicked: string[]
}>()

const emit = defineEmits<{
    (event: 'flipBoardClick'): void
    (event: 'reset'): void
    (event: 'switchBoardImplementation'): void
}>()

</script>

<template>
    <div class="sidebar">
        <header class="sidebar-header">
            <h3>Squares Clicked</h3>
        </header>
        <ol class="squares-clicked">
            <template v-for="square in squaresClicked">
                <li class="square-coordinates">
                    {{ square }}
                </li>
            </template>
        </ol>
        <div class="sidebar-button-group">
            <SidebarButton @click="emit('flipBoardClick')">Flip Board</SidebarButton>
            <SidebarButton @click="emit('reset')">Reset</SidebarButton>
            <SidebarButton @click="emit('switchBoardImplementation')" class="board-implementation-button">Other Board
                Implementation
            </SidebarButton>
        </div>
    </div>
</template>

<style lang="scss">
.sidebar {
    background-color: rgb(0, 0, 0, 0.2);
    border-radius: var(--border-radius);
    color: lightgrey;
    grid-area: 'sidebar';
    height: auto;
    max-height: 80vw;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (min-width: 960px) {
        height: 90vh;
        width: 250px;
    }
}

.sidebar-header {
    height: 70px;
    padding: 20px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--basicBorderColor);
}

.squares-clicked {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    overflow: auto;

    :nth-child(2n) {
        background-color: hsla(0, 0%, 100%, .02);

    }
}

.squares-clicked::-webkit-scrollbar {
    height: .8rem;
    width: .8rem
}

.squares-clicked::-webkit-scrollbar-track {
    background-color: transparent
}

.squares-clicked::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .45);
    -webkit-border-radius: 10rem
}

.square-coordinates {
    padding: 5px 15px 5px 15px;
    font-weight: 700;
    width: 100%;
    list-style-type: decimal;

    &::marker {
        font-weight: normal;
        color: grey
    }
}

.sidebar-button-group {
    width: 100%;
    display: grid;
    grid-template-columns: (1fr 1fr 1fr);
    grid-template-rows: (1fr);
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid var(--basicBorderColor);

    margin-top: auto;

    .board-implementation-button {
        grid-column: auto;
    }

    @media (min-width: 960px) {
        grid-template-columns: (1fr 1fr);
        grid-template-rows: (1fr 1fr);

        .board-implementation-button {
            grid-column: 1 / span 2;
        }
    }
}
</style>
