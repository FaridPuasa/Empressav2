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
    productColor.id = "productColor" 
    productColor.placeholder = "Enter Product Color"
    

    let productSize = document.createElement("input")
    productColor.type = "text"
    productSize.className = "form-control"
    productSize.name = "productSize"
    productSize.id = "productSize" 
    productSize.placeholder = "Enter Product Size"
    
  
    /*let i = (document.getElementsByName("quantity").length -1 )
    let qty = "quantity" + i

    document.getElementsByName("quantity").length*/

    let quantity = document.createElement("input")
    quantity.type = "text"
    quantity.className = "form-control quantity"
    quantity.name = "quantity"
    quantity.id = "quantity" + document.getElementsByName("quantity").length
    quantity.placeholder = "Enter Quantity";
    quantity.setAttribute('onkeyup','testcal()');
   

    let span = document.createElement("span")
    span.className = "qtyWarn"
    
   
    tableCol_2.appendChild(productColor)
    tableCol_3.appendChild(productSize)
    tableCol_4.appendChild(quantity)
    tableCol_4.appendChild(span)

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


function testcal(){
    let total = 0
    console.log("start calculate");
    //console.log("start calculate");
    for (let i = 0; i < document.getElementsByName("quantity").length; i++) {
        let newtotal = total + parseInt(document.getElementsByName("quantity")[i].value);
        console.log(newtotal);
    }
}

