import rtlLogo from "./assets/rtl.png"
import fipLogo from "./assets/fip.png"
import fipgrooveLogo from "./assets/fipgroove.png"
import fipreggaeLogo from "./assets/fipreggae.png"

function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

let rtlInfos = {
    name: "RTL",
    logo: rtlLogo,
    stream: "https://live.m6radio.quortex.io/webpHJPXnXrN7B6J7Q8mcqmxP/grouprtl/national/long/index.m3u8",
    api: null
}

let fipInfos = {
    name: "Fip",
    logo: fipLogo,
    stream: "https://stream.radiofrance.fr/fip/fip_lofi.m3u8",
    api: "https://www.radiofrance.fr/fip/api/live/webradios/fip"
}

let fipgrooveInfos = {
    name: "Fip Groove",
    logo: fipgrooveLogo,
    stream: "https://stream.radiofrance.fr/fipgroove/fipgroove_lofi.m3u8",
    api: "https://www.radiofrance.fr/fip/api/live/webradios/fip_groove"
}

let fipreggaeInfos = {
    name: "Fip Reggae",
    logo: fipreggaeLogo,
    stream: "https://stream.radiofrance.fr/fipreggae/fipreggae_lofi.m3u8",
    api: "https://www.radiofrance.fr/fip/api/live/webradios/fip_reggae"
}

class Radio {
    constructor(namespace) {
        this.id = uuid()
        this.name = namespace.name
        this.logo = namespace.logo
        this.stream = namespace.stream
        this.api = namespace.api
    }
}

let rtl = new Radio(rtlInfos)
let fip = new Radio(fipInfos)
let fipgroove = new Radio(fipgrooveInfos)
let fipreggae = new Radio(fipreggaeInfos)

let radios = [ rtl, fip, fipgroove, fipreggae ]

export default radios