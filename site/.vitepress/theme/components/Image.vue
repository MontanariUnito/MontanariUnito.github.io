<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: "",
    },
});

const isOpen = ref(false);
const bodyOverflow = ref("");

const baseImageAttrs = computed(() => ({
    src: props.src,
    alt: props.alt,
}));

const openFullscreen = () => {
    isOpen.value = true;
};

const closeFullscreen = () => {
    isOpen.value = false;
};

const onKeydown = (event) => {
    if (event.key === "Escape" && isOpen.value) {
        closeFullscreen();
    }
};

onMounted(() => {
    window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);

    if (typeof document !== "undefined") {
        document.body.style.overflow = bodyOverflow.value;
    }
});

watch(isOpen, (open) => {
    if (typeof document === "undefined") {
        return;
    }

    if (open) {
        bodyOverflow.value = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return;
    }

    document.body.style.overflow = bodyOverflow.value;
});
</script>

<template>
    <img class="inline-image" v-bind="baseImageAttrs" @click="openFullscreen" />

    <Teleport to="body">
        <div v-if="isOpen" class="overlay" @click="closeFullscreen">
            <button
                class="close-button"
                type="button"
                aria-label="Close image"
                @click.stop="closeFullscreen"
            >
                &times;
            </button>
            <img class="fullscreen-image" v-bind="baseImageAttrs" @click.stop />
        </div>
    </Teleport>
</template>

<style scoped>
.inline-image {
    cursor: zoom-in;
    max-width: 100%;
}

.overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.8);
}

.fullscreen-image {
    max-width: min(1200px, calc(100vw - 4rem));
    max-height: calc(100vh - 4rem);
    width: auto;
    height: auto;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.45);
    cursor: default;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 1.75rem;
    line-height: 1;
    cursor: pointer;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>
