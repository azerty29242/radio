import rtlLogo from "./assets/rtl.png"
import fipLogo from "./assets/fip.png"

function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function get(url) {
    url = "https://thingproxy.freeboard.io/fetch/" + encodeURIComponent(url)
    var xhr = new XMLHttpRequest()
    if ("withCredentials" in xhr){
        xhr.open("GET", url, true)
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest()
        xhr.open("GET", url)
    } else {
        xhr = null;
    }
    xhr.responseType = "json"
    return new Promise((resolve) => {
        xhr.onload = () => resolve(xhr.response)
        xhr.send()
    })
}

let rtlInfos = {
    name: "RTL",
    logo: rtlLogo,
    streamInfos: async function () {
        let data = await get("https://www.rtl.fr/ws/live/live")
        return {
            url: data.audio.path,
            type: "application/vnd.apple.mpegurl"
        }
    },
    programInfos: async function () {
        let data = await get("https://www.rtl.fr/ws/live/live")
        return {
            title: data.title,
            author: data.hosts,
            description: data.summary,
            cover: data.cover2x,
    
        }
    }
}

let fipInfos = {
    name: "Fip",
    logo: fipLogo,
}

class Radio {
    constructor(namespace) {
        this.id = uuid()
        this.name = namespace.name
        this.logo = namespace.logo
        this.streamInfos = namespace.streamInfos
        this.programInfos = namespace.programInfos
    }
}

let rtl = new Radio(rtlInfos)
let fip = new Radio(fipInfos)

let radios = [ rtl, fip ]

export default radios