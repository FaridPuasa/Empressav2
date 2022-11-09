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
    let row = document.getElementById("newRow")
    
    let tableRow = document.createElement("tr")
    let tableCol_2 = document.createElement("td")
    let tableCol_3 = document.createElement("td")
    let tableCol_4 = document.createElement("td")

    /*
    let numbers = document.createElement("input")
    numbers.type = "hidden"
    numbers.name = "numbering"
    numbers.value = "1."
    */
    let i = 1

    tableRow.id = "row" + i

    let productColor = document.createElement("input")
    productColor.type = "text"
    productColor.className = "form-control"
    productColor.name = "productColor"
    productColor.id = "productColor" + i
    productColor.placeholder = "Enter Product Color"
    

    let productSize = document.createElement("input")
    productColor.type = "text"
    productSize.className = "form-control"
    productSize.name = "productSize"
    productSize.id = "productSize" + i
    productSize.placeholder = "Enter Product Size"
    

    let quantity = document.createElement("input")
    quantity.type = "text"
    quantity.className = "form-control"
    quantity.name = "quantity"
    quantity.id = "quantity" + i
    quantity.placeholder = "Enter Quantity"
    

    tableCol_2.appendChild(productColor)
    tableCol_3.appendChild(productSize)
    tableCol_4.appendChild(quantity)

    tableRow.appendChild(tableCol_2)
    tableRow.appendChild(tableCol_3)
    tableRow.appendChild(tableCol_4)

    row.appendChild(tableRow)
    i++
}

function removeRow(){
    let i = 1
    let id = "row" + (i)
    let row = document.getElementById(id)
    
    row.remove()
    i--
}