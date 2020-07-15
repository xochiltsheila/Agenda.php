const formularioContactos = document.querySelector('#contacto');
listadoContactos = document.querySelector('#listado-contactos tbody');
inputBuscador = document.querySelector('#buscar');

eventListeners();
function eventListeners() {

    formularioContactos.addEventListener('submit', leerFormulario);

    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminaContacto);
    }
}

function leerFormulario(e) {
    e.prevenDefault();



    const nombre = document.querySelector('#nombre').Value;
         nombre = document.querySelector('#empresa').Value;
        nombre = document.querySelector('#telefono').Value,
        accion = document.querySelector('#accio').Value;

    if(nombre === '' || empresa ==='' || telefono === '') {
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
        console.log('Tiene algo')

    } else {
        // pasa a validacion , crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);


        if(accion === 'crear'){

            insertBD(infoContacto);


        } else {

            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);

        }

        }

    }

 function insertBD(datos) {
    
    function actualizarRegistro(datos) {
        const xhr =new XMLHttpRequest();

        xhr.open('POST', 'ind/modelos/modelo-contactos.php', true);
        xhr.onload = function() {
            if(this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);

                if(respuesta.respuesta === 'correcto'){
                    mostrarNotificacion('Contacto Editando Correctamente', 'correcto');
                } else {
                    mostrarNotificacion('Hubo un error...', 'error');
                }

                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 4000);
            }
        }

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);


        xhr.onload = function() {
            if(this.status === 200) {
                console.log(JSON.parse( xhr.responseText) );

                const respuesta = JSON.parse( xhr.responseText);

                const nuevoContacto = document.createElement('tr');
                nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
                `;

                const contenedorAcciones = document.createElement('td');

                const iconoEditar = document.createElement('i');
                iconoEditar.classList.add('fas', 'fa-pen-square');

                const btnEditar = document.createElement('a');
                btnEditar.appendChild(iconoEditar);
                btnEditar.href = 'editar.php?id=${respuesta.datos.id_insertado}';
                btnEditar.classList.add('btn', 'btn-editar');


                contenedorAcciones.appendChild(btnEditar);

                const iconoEliminar = document.createElement('i');
                iconoEliminar.classList.add('fas', 'fa-trash-alt');


                const btnEliminar = document.createElement('button');
                btnEliminar.appendChild(iconoEliminar);
                btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
                btnEliminar.classList.add('btn', 'btn-borrar');

            

                contenedorAcciones.appendChild(btnEliminar);

                nuevoContacto.appendChild(contenedorAcciones);

                listadoContactos.appendChild(nuevoContacto);

                mostrarNotificacion('Contacto Creado Corectamente', 'correcto');

                numeroContactos();
            }
        }
    }
 }
        xhr.send(datos)
    


 function eliminaContacto(e) {
                console.log(e.target.parseElement.classList.contains('btn-borrar')); 
                    const id = e.target.parseElement.getAttribute('data-id');


                    const respuesta = confirm('¿estás seguro (a) ?')

                    if(respuesta) {


                       const xhr = new XMLHttpRequest();

                       xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`,true);

                       xhr.onload = function() {
                           if(this.status === 200) {
                               const resultado = JSON.parse(xhr.responseText);
                                

                                if(resultado.resultado == 'correcto') {
                                    console.log(e.target.parentElement.parentElement);
                                    e.target.parentElement.parentElement.remove();

                                    mostrarNotificacion('Contacto eliminado', 'correcto');
                                    numeroContactos();
                                } else {
                                    mostrarNotificacion('Hubo un error...', 'error' );
                                }
                           }

                       }
                       xhr.send();

                    } 
                        

                    
 }
        

    


function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase,'notificacion', 'sombra');
    notificacion.textContent = mensaje;


    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));



         setTimeout(() => {
        notificacion.classList.remove('visible');

        setTimeout(() => {

        notificacion.classList.remove('visible');
        setTimeout(() => {
            notificacion.remove();
         }, 500)
        }, 3000);
        }, 100);

}



function buscarContacto(e) {
    const exoresion = new RegExp(e.target.value, "i");
        registros = document.querySelectorAll('tbody tr');
        registros.forEach(registro => {
            registro.style.display = 'none';

            if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
                registro.style.display = 'table-row';
        }
        numeroContacto();
            
    })
}

function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr');

    let total = 0;

    totalContactos.forEach(contacto => {
        if(contacto.style.display == '' || contacto.style.display === 'table-row'){
            total++;
        }
    });

    contenedorNumero.textContent = total;
}


