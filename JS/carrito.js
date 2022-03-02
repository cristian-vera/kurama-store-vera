//Simulador de carrito:
//Agregar al carrito:

const agregarAlCarritoBotones = document.querySelectorAll('.agregarAlCarrito');

agregarAlCarritoBotones.forEach((agregarAlCarritoBoton) => {
    agregarAlCarritoBoton.addEventListener('click', agregarAlCarritoClick);
    
    function agregarAlCarritoClick (e){
        const boton = e.target;
        const item = boton.closest('.productos__card');

        const itemTitulo = item.querySelector('.itemTitulo').textContent;
        const itemPrecio = item.querySelector('.itemPrecio').textContent;
        const itemImagen = item.querySelector('.itemImagen').src;

        agregarItemAlCarrito(itemTitulo, itemPrecio, itemImagen);
    }
});

const contenedorCarrito = document.querySelector('.contenedorCarrito');

function agregarItemAlCarrito(itemTitulo, itemPrecio, itemImagen) {
    const elementoTitulo = $('.carritoItemTitulo');

    for (let i = 0; i < elementoTitulo.length; i++) {
        if(elementoTitulo[i].innerText === itemTitulo) {
            let elementoCantidad = elementoTitulo[i].parentElement.parentElement.parentElement.querySelector('.carritoItemCantidad');
            elementoCantidad.value++;
            actualizarCarritoTotal();
            return;
        }
    }

//DOM del carrito:

    const carritoFila = document.createElement('div');
    const carritoContenido =`
        <div class="itemCarrito">
            <div class="carrito__subContenido">
                <div class="itemSubCarrito">
                    <img class="imgProducto" src=${itemImagen}>
                    <p class="carritoItemTitulo">${itemTitulo}</p>
                </div>
            </div>
            <div class="carrito__subContenido">
                <div class="itemSubCarrito2">
                    <p class="carritoPrecioItem"> $ ${itemPrecio}</p>
                </div>
            </div>
            <div class="carrito__subContenido">
                <div class="carrito__cantidad">
                    <input class="carritoItemCantidad" type=number value="1">
                    <button class="borrarProducto">X</button>
                </div>
            </div>
        </div>`;

    carritoFila.innerHTML = carritoContenido;
    contenedorCarrito.append(carritoFila);

//jquery
    $(".carritoItemTitulo").css({"background-color": "#000000", "color": "white", "text-align": "center"})
    .slideUp(1000)
    .slideDown(1000);

    carritoFila
    .querySelector('.borrarProducto')
    .addEventListener('click', removerItemCarrito);

    carritoFila
    .querySelector('.carritoItemCantidad')
    .addEventListener('change', cambiarCantidad);

    actualizarCarritoTotal();
    carrito.push({itemTitulo, itemPrecio, itemImagen});
    guardarLocal();
}

//actualizar carrito:

function actualizarCarritoTotal() {
    let total = 0;
    
    const carritoTotal = document.querySelector('.carritoTotal');

    const carritoItems = document.querySelectorAll('.itemCarrito');

    carritoItems.forEach((itemCarrito)=> {
        const carritoElementoPrecio = itemCarrito.querySelector('.carritoPrecioItem');

        const carritoPrecioItem = Number(carritoElementoPrecio.textContent.replace('$',''));

        const carritoItemElementoCantidad = itemCarrito.querySelector('.carritoItemCantidad');

        const carritoItemCantidad = Number(carritoItemElementoCantidad.value);

        total = (total + (carritoPrecioItem * 1.21) * carritoItemCantidad);

    });

    carritoTotal.innerHTML = `${total.toFixed(2)}$`;
}

//borrar item del carrito

function removerItemCarrito(e) {
    const botonclick = e.target;
    botonclick.closest('.itemCarrito').remove();
    actualizarCarritoTotal();
}

function cambiarCantidad(e) {
    const entrada = e.target;
    if (entrada.value <= 0) {
        entrada.value = 1;
    }
    actualizarCarritoTotal();
}


const comprarBoton = document.querySelector('.comprarCarrito');
    comprarBoton.addEventListener('click', comprarBotonClick);

function comprarBotonClick() {
    contenedorCarrito.innerHTML = '';
    alert('Gracias por su compra');
    actualizarCarritoTotal();
}

const vaciarCarrito = document.querySelector('.vaciarCarrito');
    vaciarCarrito.addEventListener('click', vaciarCarritoClick);

function vaciarCarritoClick() {
    contenedorCarrito.innerHTML = '';
    actualizarCarritoTotal();
}

//=========================
//LocalStorage

let carrito = [];

function guardarLocal (){localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
    const itemsCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(itemsCarrito){
        carrito = itemsCarrito;
    }
    actualizarCarritoTotal();
};