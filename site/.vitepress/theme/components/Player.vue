<script setup>
import { computed, shallowRef, onMounted, useAttrs } from "vue";

const Player = shallowRef(null);
const attrs = useAttrs();
const playerAttrs = computed(() => {
    const { style, ...rest } = attrs;

    return {
        backgroundColor: "var(--vp-c-bg)",
        primaryColor: "var(--vp-c-brand-1)",
        showPlaybackRate: true,
        ...rest,
        style: [{ border: "1px solid var(--vp-c-divider)" }, style],
    };
});

onMounted(async () => {
    const mod = await import("vue-wave-player");

    Player.value = mod.VueWavePlayer;
});
</script>

<template>
    <component v-if="Player" :is="Player" v-bind="playerAttrs" />
</template>
