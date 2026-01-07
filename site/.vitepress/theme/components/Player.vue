<script setup>
import { shallowRef, onMounted } from "vue";

const Player = shallowRef(null);

onMounted(async () => {
    const mod = await import("vue-wave-player");

    Player.value = mod.VueWavePlayer;
});
</script>

<template>
    <component v-if="Player" :is="Player" v-bind="$attrs" />
</template>
