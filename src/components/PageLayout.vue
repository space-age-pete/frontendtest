<template>
    <div class="page-layout">
        <slot />
    </div>
</template>

<style>
.page-layout {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
}
</style>