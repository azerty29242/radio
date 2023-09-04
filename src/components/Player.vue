<template>
    <div class="shadow-md rounded-t-md border h-16 flex divide-x bg-white">
        <div class="flex py-2 px-4 items-center">
            <div v-if="loading" class="w-10 h-10 border-4 rounded-full border-t-blue-500 animate-spin"></div>
            <button v-if="!playing && !loading" class="w-12 h-12 rounded-full">
                <PlayCircleIcon class="text-blue-500"></PlayCircleIcon>
            </button>
            <button v-if="playing && !loading" class="w-12 h-12 rounded-full">
                <StopCircleIcon class="text-blue-500"></StopCircleIcon>
            </button>
        </div>
        <div class="flex gap-2 grow py-2 px-4 items-center">
            <div class="flex grow items-center mx-4">
                <p>00:00</p>
                <div class="grow border-2 shadow-md rounded-full mx-4 h-4 flex justify-start items-center">
                    <div class="h-4 bg-blue-500 rounded-full w-1/4"></div>
                </div>
                <p>00:00</p>
            </div>
            <button>
                <SpeakerWaveIcon class="w-8 h-8 hidden md:block text-blue-500"></SpeakerWaveIcon>
            </button>
        </div>
    </div>
</template>

<script>
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
            loading: true
        };
    },
    props: {
        radio: Object
    },
    watch: {
        radio: {
            immediate: true, 
            async handler (radio) {
                console.log(await radio.streamInfos())
            }
        }
    }
}
</script>
