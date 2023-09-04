<template>
    <div class="lg:mx-auto px-8" style="width: min(100vw, 1024px)">
        <h1 style="font-size: min(10vmin, 72px)">Radios</h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <RadioSelectorItem :key="radio.id" :radio="radio" v-for="radio in radios" @select="select"></RadioSelectorItem>
        </div>
    </div>
    <Player v-if="Object.keys(selectedRadio).length !== 0" :radio="selectedRadio" class="fixed bottom-0 lg:right-[50%] lg:translate-x-2/4" style="width: min(100vw, 1024px)"></Player>
</template>

<script>
import Player from "./components/Player.vue";
import RadioSelectorItem from "./components/RadioSelectorItem.vue";
import radios from "./radios.js";

export default {
    components: {
        Player: Player,
        RadioSelectorItem: RadioSelectorItem
    },
    data() {
        return {
            radios: radios,
            selectedRadio: {}
        }
    },
    methods: {
        select(radio) {
            this.selectedRadio = radio;
        }
    }
}
</script>