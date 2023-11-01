<template>
    <div class="shadow-md rounded-t-md border h-20 flex divide-x bg-white">
        <div class="flex py-2 px-4 items-center">
            <div v-if="loading" class="w-10 h-10 border-4 rounded-full border-t-blue-500 animate-spin"></div>
            <button v-if="!playing && !loading" class="w-12 h-12 rounded-full" @click="play()">
                <PlayCircleIcon class="text-blue-500"></PlayCircleIcon>
            </button>
            <button v-if="playing && !loading" class="w-12 h-12 rounded-full" @click="stop()">
                <StopCircleIcon class="text-blue-500"></StopCircleIcon>
            </button>
        </div>
        <div class="flex gap-2 grow py-2 px-4 items-center">
            <div v-if="radio.api" class="flex grow items-center">
                <div>
                    <img :src="infos.cover" class="w-16 h-16 rounded">
                </div>
                <span class="ms-4 text-2xl font-bold">{{ infos.title ?? "Title" }}</span>
                <span class="ms-4">{{ infos.artist ?? "Artist" }}</span>
            </div>
            <div v-else class="flex grow items-center mx-4">
                <span class="text-2xl font-bold">{{ radio.name ?? "Radio" }}</span>
            </div>
        </div>
        <!--
        <div class="flex gap-2 grow py-2 px-4 items-center">
            <div class="flex grow items-center mx-4">
                <p>--:--</p>
                <div class="grow border-2 shadow-md rounded-full mx-4 h-4 flex justify-start items-center">
                    <div class="h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p>--:--</p>
            </div>
            <button>
                <SpeakerWaveIcon class="w-8 h-8 hidden md:block text-blue-500"></SpeakerWaveIcon>
            </button>
        </div>
        -->
    </div>
</template>

<script>
import Hls from "hls.js"
import {
    PlayCircleIcon,
    StopCircleIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from "@heroicons/vue/24/solid";

export default {
    components: {
        PlayCircleIcon: PlayCircleIcon,
        StopCircleIcon: StopCircleIcon,
        SpeakerWaveIcon: SpeakerWaveIcon,
        SpeakerXMarkIcon: SpeakerXMarkIcon
    },
    data() {
        return {
            playing: false,
            loading: true,
            audio: new Audio(),
            hls: new Hls(),
            infos: {
                name: "",
                artist: "",
                cover: ""
            },
            timeouts: []
        };
    },
    props: {
        radio: Object
    },
    methods: {
        play() {
            this.loading = true
            delete this.hls
            this.hls = new Hls()
            let stream = this.radio.stream
            this.hls.loadSource(stream)
            this.hls.attachMedia(this.audio)
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.loading = false
                this.playing = true
                this.audio.play()
            })
        },
        stop() {
            this.playing = false
            this.audio.pause()
        }
    },
    watch: {
        radio: {
            immediate: true,
            async handler (radio) {
                this.timeouts.forEach(timeout => {
                    clearTimeout()
                });
                // let response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://rtl.fr/ws/live/live"))
                // let data = await response.json()
                // console.log(data.contents)
                if (Hls.isSupported()) {
                    this.loading = true
                    this.playing = false
                    delete this.hls
                    this.hls = new Hls()
                    this.hls.loadSource(radio.stream)
                    this.hls.attachMedia(this.audio)
                    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        this.loading = false
                        this.playing = true
                        this.audio.play()
                    });
                } else if (this.audio.canPlayType("application/vnd.apple.mpegurl")) {
                    this.loading = true
                    this.playing = false
                    this.audio.src = radio.stream
                    this.audio.play();
                    this.loading = false
                    this.playing = true
                }
                
                if (this.radio.api) {
                    while (radio === this.radio) {
                        let response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(radio.api), {cache: "no-store"})
                        let data = await response.json()
                        data = JSON.parse(data.contents)
                        this.infos.cover = data.now.cardVisual.src
                        this.infos.title = data.now.firstLine
                        this.infos.artist = data.now.secondLine
                        await new Promise((resolve, reject) => setTimeout(() => {
                            resolve()
                        }, data.delayToRefresh));
                    }
                }
            }
        }
    }
}
</script>
