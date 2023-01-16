let customerPhoneNoPlus = document.getElementById("code").value + document.getElementById("contact_1").value;
let optInNumber = "00" + customerPhoneNoPlus

let customerUsername = document.getElementById("name").value;

let gid = "2000215252"
let pas = "6@SemFzr"
let format = "json"
let v = " 1.1"
let auth_scheme = "plain"

let OPT_IN_URL = `https://media.smsgupshup.com/GatewayAPI/rest?method=OPT_IN&format=${format}&userid=${gid}&password
=&${pas}&phone_number=${optInNumber}&v=1.1&auth_scheme=${auth_scheme}&channel=WHATSAPP`

fetch(OPT_IN_URL).then(
    (response)=>{
        return response.json()
    },
    (err)=>{
        console.log(err)
    }
)

let trackingNumber = document.getElementById("Tookan-Tracking").value
let service = $('input[name=products]:checked').val()
let msg = `Hello%2C%0A%0AWe+have+received+your+order.+Please+refer+to+the+following+for+your+reference.%0A%0ATracking+Number%3A+${trackingNumber}%0A%0AOur+team+will+process+your+order.+Thank+you`
let SEND_TRACKER_URL =  `https://media.smsgupshup.com/GatewayAPI/rest?userid=2000215252&password=6@SemFzr&send_to=006737257190&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=${msg}&isTemplate=true&header=Order+Confirmation&footer=Go+Rush+Express`

fetch(SEND_TRACKER_URL).then(
    (response)=>{
        return response.json()
    },
    (err)=>{
        console.log(err)
    }
)

