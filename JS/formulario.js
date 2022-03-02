//Mediante un evento click (boton "enviar") se activa la funcion enviar datos que toma los valores del formulario (nombre, apellido, email y mensaje).

//la informacion se guarda en una nueva variable "nuevoFormulario".

//la informacion se envia mediante el metodo post a la URL declara CONST URLGET.

//Para ver la informacion se entra al inspector y en la seccion network aparece el post y dentro de el, en la seccion payload se podra ver la informacion guardada.

//Por ultimo se llama mediante getJSON una notificacion ubicada en json y mediante la funcion "notificacionEnvioExitoso" se crea un div (DOM) que mostrara la notificacion.

const localJson = 'json/datosFormulario.json';

//const URLGET = "https://jsonplaceholder.typicode.com/posts";

const URLGET = "https://620eccf4ec8b2ee2832c5f6d.mockapi.io/api/formularios";

let boton = document.querySelector(".enviarDatosBoton");
boton.addEventListener("click", enviarDatos);

function enviarDatos () {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;
    console.log(
    "nombre: "+nombre,
    "apellido: "+apellido, 
    "email:"+email,
    "mensaje: "+mensaje
    );
    
    let nuevoFormulario = {
    nombre:nombre,
    apellido:apellido, 
    email:email,
    mensaje:mensaje,
    };

    const infoPost = nuevoFormulario;

    $.post(URLGET, infoPost,(respuesta, estado)=> {
        console.log(respuesta);
        }
    );

    $.getJSON(localJson, function(respuesta, estado) {
        console.log(estado);
        if(estado == "success") {
            notificacionEnvioExitoso(respuesta);
        }

        function notificacionEnvioExitoso(array) {
            console.log(array[0].notificacion);
        
            let contendor = document.querySelector(".notificacionCard");
        
            let notificacion = document.createElement("div");
        
            notificacion.innerHTML = `<div class="formulario__contenedor">
            <p>${array[0].notificacion}</p>
            </div>`;
        
            contendor.append(notificacion);
        }
    });
}