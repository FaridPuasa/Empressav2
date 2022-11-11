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
    let tableCol_1 = document.createElement("td")
    let tableCol_2 = document.createElement("td")
    let tableCol_3 = document.createElement("td")
    let tableCol_4 = document.createElement("td")
    let tableCol_5 = document.createElement("td")

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
    productColor.id = "productColor" 

    let productSize = document.createElement("input")
    productColor.type = "text"
    productSize.className = "form-control"
    productSize.name = "productSize"
    productSize.id = "productSize" 

    let productFlavour = document.createElement("input")
    productFlavour.type = "text"
    productFlavour.className = "form-control"
    productFlavour.name = "productFlavour"
    productFlavour.id = "productFlavour" 

    let productScent = document.createElement("input")
    productScent.type = "text"
    productScent.className = "form-control"
    productScent.name = "productScent"
    productScent.id = "productScent" 

    let quantity = document.createElement("input")
    quantity.type = "text"
    quantity.className = "form-control quantity"
    quantity.name = "quantity"
    quantity.id = "quantity" + document.getElementsByName("quantity").length
    quantity.setAttribute('onkeyup','testcal()');
    
    tableCol_1.appendChild(productColor)
    tableCol_2.appendChild(productSize)
    tableCol_3.appendChild(productFlavour)
    tableCol_4.appendChild(productScent)
    tableCol_5.appendChild(quantity)

    tableRow.appendChild(tableCol_1)
    tableRow.appendChild(tableCol_2)
    tableRow.appendChild(tableCol_3)
    tableRow.appendChild(tableCol_4)
    tableRow.appendChild(tableCol_5)

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


let pq = document.getElementById("productQuantity").addEventListener('change', function() {
    val = this.value
    console.log(val)
})


let qt = document.getElementById("quantity").addEventListener('change', function() {
    val = this.value
   console.log(val)
})



/* for (let i = 0; i < document.getElementsByName("quantity").length; i++) {
    let qty = document.getElementsByName("quantity")[i]
    
    qty.addEventListener('change', function() {
        total = total + document.getElementsByName("quantity")[i].value;
    console.log(total);
    })
} */
document.getElementById("submitBtn").style.display = 'none'

function testcal(){
    var total = 0;
    for (let i = 0; i < document.getElementsByName("quantity").length; i++) {
        total = total + parseInt(document.getElementsByName("quantity")[i].value);
        console.log(total);
        document.getElementById("tempTotal").value = total;
    }

    if(document.getElementById("tempTotal").value != document.getElementById("productQuantity").value){
        document.getElementById('qtyWarn').style.color = 'red';
        document.getElementById('qtyWarn').innerHTML
        = '☒ Total quantity not match';
        document.getElementById("submitBtn").style.display = 'none'
    }else{
        document.getElementById('qtyWarn').style.color = 'green';
        document.getElementById('qtyWarn').innerHTML =
            '🗹  Total quantity match'
        document.getElementById("submitBtn").style.display = 'block'
    }
}