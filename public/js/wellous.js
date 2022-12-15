function dynamic(){
    let brand = document.getElementById('productBrand').value
    if(brand == 'AEMIS'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Probiome', 'Probiome');
        select.options[select.options.length] = new Option('Relazz', 'Relazz');
    }
    if(brand == 'BIO-SERIES'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Bio-Grape', 'Bio-Grape');
        select.options[select.options.length] = new Option('Bio-Lingzhi', 'Bio-Lingzhi');
        select.options[select.options.length] = new Option('American Ginseng', 'American Ginseng');
    }
    if(brand == 'BOLDBLACK'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Erojan', 'Erojan');
    }
    if(brand == 'DELITE'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Frusso', 'Frusso');
        select.options[select.options.length] = new Option('SPI2RO', 'SPI2RO');
    }
    if(brand == 'FEMOIRE'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Isoduce', 'Isoduce');
        select.options[select.options.length] = new Option('Novia', 'Novia');
    }
    if(brand == 'IBLING'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('D-vine', 'D-vine');
        select.options[select.options.length] = new Option('S-glow', 'S-glow');
        select.options[select.options.length] = new Option('E-vite', 'E-vite');
        select.options[select.options.length] = new Option('M-coll', 'M-coll');
    }
    if(brand == 'KIDAONE'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Elderberry', 'Elderberry');
        select.options[select.options.length] = new Option('Microbiome', 'Elderberry');
    }
    if(brand == 'IMMORITY'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Liveon', 'Liveon');
        select.options[select.options.length] = new Option('Moveon', 'Moveon');
    }
    if(brand == 'TIGROX'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Tiger Milk King', 'Tiger Milk King');
        select.options[select.options.length] = new Option('Livetal', 'Livetal');
        select.options[select.options.length] = new Option('Imuglo', 'Imuglo');
        select.options[select.options.length] = new Option('Homega', 'Homega');
    }
    if(brand == 'ZENSO'){
        let select = document.getElementById("productModel");
        let length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[select.options.length] = new Option('Zenso', 'Zenso');
    }
}