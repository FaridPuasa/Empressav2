let othersField = document.getElementById("productOther")
othersField.style.display = 'none'
let category = document.getElementById("productCategory").addEventListener('change', function() {
val = this.value
    if(val == "others"){
        othersField.style.display = 'block';
    }
    else{
        othersField.style.display = 'none';
    }
})

function addTextInput() {
    let test = document.getElementById("newRow")
    

    let div = document.createElement('div');
    div.className = 'form-group'
    let div1 = document.createElement('div');
    div1.className = 'form-group'
    

    let variety = document.createElement("input")
    variety.className = "form-control"
    variety.type = "text"
    variety.name = "variety"
    variety.id = "variety"
    variety.placeholder = "Enter Variety"

    let varietyQuantity = document.createElement("input")
    varietyQuantity.className = "form-control"
    varietyQuantity.type = "number"
    varietyQuantity.name = "varietyQuantity"
    varietyQuantity.id = "varietyQuantity"
    varietyQuantity.placeholder = "Enter Variety Quantity"

    div.appendChild(variety)
    div1.appendChild(varietyQuantity)
    
    test.appendChild(div)
    test.appendChild(div1)
}