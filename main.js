// JS document
const crearTiendas = (contenedorID, min, cantidadTiendas)=>{
    // Contenedor principal
    let elementoContenedor = document.getElementById(contenedorID);
    // Creamos un agrupador de nodos
    let agrupador = document.createDocumentFragment();

    // Loop para crear el número de tiendas
    for (let i = 1; i <= cantidadTiendas; i++) {
        let textoEtiqueta = "Tienda " + i + ":";
        let tienda = crearItemTienda(textoEtiqueta, min);
        agrupador.appendChild(tienda);
    }
    elementoContenedor.appendChild(agrupador);
}

const crearItemTienda = (textoLabel, valorMin)=>{
    // Creamos el contenedor de las etiquetas
    let elementoItem = document.createElement("DIV");
    // Creamos un agrupador de nodos
    let agrupadorElementos = document.createDocumentFragment();

    // Creamos la etiqueta LABEL
    let etiquetaLabel = document.createElement("LABEL");
    // Le agregamos los atributos al label
    etiquetaLabel.setAttribute("for", textoLabel);
    etiquetaLabel.innerText = textoLabel
    
    // Creamos el input
    let etiquetaInput = document.createElement("INPUT");
    // Le agregamos los atributos al input
    etiquetaInput.setAttribute("type", "number");
    etiquetaInput.setAttribute("id", textoLabel);
    etiquetaInput.setAttribute("min", valorMin);
    etiquetaInput.setAttribute("value", 0);

    // Agrupamos los nodos antes de insertarlos
    agrupadorElementos.appendChild(etiquetaLabel);
    agrupadorElementos.appendChild(etiquetaInput);
    // Agregamos las etiquetas al contenedor
    elementoItem.appendChild(agrupadorElementos);
    return elementoItem;
}

const extraerNumeroDesdeElemento = elemento=>{
    const miValor = Number(elemento.value);
    return miValor;
}

const calcularTotal = ()=>{
    const ventas = [];
    const elementoContenedor = document.getElementById("itemsTiendas");

    for(let item of elementoContenedor.children){
        let valorVenta = extraerNumeroDesdeElemento(item.children[1])
        ventas.push(valorVenta)
    }

    let totalVentas = sumarTotal(ventas);
    let ventaMayor = calcularMayor(ventas);
    let ventaMenor = calcularMenor(ventas);
    señalarInputs(ventaMayor,ventaMenor);

    const mensaje = `Total Ventas: ${totalVentas}`
    const elementoSalida=document.getElementById("parrafoSalida")
    elementoSalida.textContent = mensaje
}

const sumarTotal = array=>{
    let total = 0;
    array.forEach(function(venta){total += venta});
    return total;
}

const calcularMayor = array=>{
    let maximo = array[0]
    for (venta of array){
        if (venta > maximo){
            maximo = venta;
        }
    }
    return maximo;
}

const calcularMenor = array=>{
    let minimo = array[0]
    for (venta of array){
        if (venta < minimo){
            minimo = venta;
        }
    }
    return minimo;
}

const señalarInputs = (ventaMayor,ventaMenor)=>{
    const elementoContenedor = document.getElementById("itemsTiendas");

    for(let item of elementoContenedor.children){
        const input = item.children[1];
        const valorInput = extraerNumeroDesdeElemento(input);
        input.style.backgroundColor = "#fff";
        
        if (ventaMayor == valorInput){
            input.style.backgroundColor = "rgb(182, 255, 194)";
        }else if(ventaMenor == valorInput){
            input.style.background = "rgb(255, 91, 91)";
        } 
    }
}