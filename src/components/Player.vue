<template>
    <div class="shadow-md rounded-t-md border w-full h-16 flex divide-x">
        <div class="flex gap-4 py-2 px-4 items-center">
            <button class="w-12 h-12 rounded-full">
                <PlayCircleIcon class="text-blue-500"></PlayCircleIcon>
            </button>
        </div>
        <div class="flex gap-4 grow py-2 items-center">
            <div class="flex grow items-center ms-4">
                <p>00:00</p>
                <div class="grow border-2 shadow-md rounded-full mx-4 h-4 flex justify-start items-center">
                    <div class="w-[25%] h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p>00:00</p>
            </div>
            <button>
                <SpeakerWaveIcon class="w-8 h-8 hidden md:block"></SpeakerWaveIcon>
            </button>
            <button>
                <EllipsisVerticalIcon class="w-8 h-8 hidden sm:block"></EllipsisVerticalIcon>
            </button>
        </div>
    </div>
</template>

<script>
import {
    PlayCircleIcon,
    StopCircleIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    EllipsisVerticalIcon
} from "@heroicons/vue/24/solid";

export default {
    components: {
        PlayCircleIcon: PlayCircleIcon,
        StopCircleIcon: StopCircleIcon,
        SpeakerWaveIcon: SpeakerWaveIcon,
        SpeakerXMarkIcon: SpeakerXMarkIcon,
        EllipsisVerticalIcon: EllipsisVerticalIcon
    }
}
</script>
