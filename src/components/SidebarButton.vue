<template>
    <button class="sidebar-button">
        <slot />
    </button>
</template>

<style lang="scss">
.sidebar-button {
    height: 3rem;
    max-width: 100%;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;

    font-weight: 900;

    color: var(--basicColor);
    background-color: var(--basicBgColor);

    flex-grow: 1;

    &.double-width {
        grid-column: 1 / span 2
    }

    &:hover {
        color: var(--basicHoverColor);
        background-color: var(--basicBghover);

        cursor: pointer;
    }
}
</style>