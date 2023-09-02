<template>
    <div class="container mx-auto p-4">
        <h1 style="font-size: min(10vmin, 72px)">Radios</h1>
        <img v-for="radio in radios" :src="radio.logo" :alt="radio.name + ' logo'">
    </div>
    <Player class="fixed bottom-0"></Player>
</template>

<script>
import Player from "./components/Player.vue";
import radios from "./radios.js";

export default {
    components: {
        Player: Player
    },
    data() {
        return {
            radios: radios
        }
    }
}
</script>