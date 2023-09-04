<template>
    <button class="rounded-md" @click="select">
        <img :src="radio.logo" :alt="radio.name + ' logo'" class="rounded-md">
    </button>
</template>

<script>
export default {
    props: {
        radio: Object
    },
    emits: ['select'],
    methods: {
        select() {
            this.$emit('select', this.radio);
        }
    }
}
</script>
