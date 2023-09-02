function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let rtlInfos = {
    name: "RTL",
    logo: "./../assets/rtl.png",
    streamInfos: async function () {
        let response = await fetch("https://www.rtl.fr/ws/live/live")
        let data = await response.json()
        return {
            url: data.audio.path,
            type: "application/vnd.apple.mpegurl"
        }
    },
    programInfos: async function () {
        let response = await fetch("https://www.rtl.fr/ws/live/live")
        let data = await response.json()
        return {
            title: data.title,
            author: data.hosts,
            description: data.summary,
            cover: data.cover2x,

        }
    }
}

class Radio {
    constructor(name, logo, streamInfosCallback, programInfosCallback) {
        this.id = uuid()
        this.name = name
        this.logo = logo
        this.stream = Object.assign({}, streamInfosCallback())
        this.program = Object.assign({}, programInfosCallback())
        this.refreshProgram = async function () {
            this.program = await programInfosCallback()
        }
        console.log(this)
    }

    get logoSrc() {
        return this.logo
    }

    get streamUrl() {
        return this.stream
    }

    get programInfos() {
        return this.program
    }
}

let radios = [
    new Radio(rtlInfos.name, rtlInfos.logo, rtlInfos.streamInfos, rtlInfos.programInfos)
]

export default radios