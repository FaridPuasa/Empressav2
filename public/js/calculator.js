let l = 5 //document.getElementById("length").value
let w = 10 //document.getElementById("width").value
let h = 8 //document.getElementById("height").value

console.log (((l*w*h)/5000) + " KG")

let parcelWeight = 0.5 //document.getElementById("parcelWeight").innerHTML = parcelWeight
let volumetricweight = ((l*w*h)/5000) //document.getElementById("volumetricWeight").innerHTML = volumetricWeight

if(parcelWeight > volumetricweight){
    let rates = parcelWeight * 8
    console.log(parcelWeight + " KG")
    console.log("$BND " + rates) //document.getElementById("rates").innerHTML = rates
}
else if(parcelWeight < volumetricweight){
    let rates = volumetricweight * 8
    console.log(volumetricweight + " KG")
    console.log("$BND " + rates) //document.getElementById("rates").innerHTML = rates
}
else{
    let rates = parcelWeight * 8
    console.log(parcelWeight)
    console.log("$BND " + rates) //document.getElementById("rates").innerHTML = rates
}