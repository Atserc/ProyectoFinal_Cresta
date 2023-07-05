//Clases

class Materia {
    constructor(nombre,notas,promedio,aprobado,imagen){
        this.nombre = nombre;
        this.notas = notas;
        this.promedio = promedio;
        this.aprobado = aprobado;
        this.urlImagen = imagen;
    }
    volverString(){
        let ap;
        if (this.aprobado = true){
            ap ="aprobado"
        }else{
            "desaprobado";
        }
        let aux = "En la materia " + this.nombre + " obtuvo un promedio de " + this.promedio.toFixed(2) + " por lo que está " + ap + ". \n";
        return aux;
    }
}



//Funciones

function notasValidas(notasTemp) {
    let validacion = true;
    let i = 0;
    while (i < notasTemp.length) {
        if (notasTemp[i] < 0 || notasTemp[i] > 10) {
            validacion = false;
            break;
        }
        i++;
    }
    return validacion;
}

function guardarNotasTemp(num){
    let notas = [];
    let valor;
    let campo;
    for (let i = 0 ; i < num ;i++){
        campo = document.getElementById(`notaNumero${i+1}`);
        valor = campo.querySelector('input').value;
        if (valor === ""){
            valor = 0;
        }
        notas.push(parseFloat(valor));
    }
    return notas;
}

function promedio(notas){
    let sumatoriaNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        sumatoriaNotas += notas[i];
    }
    prom = sumatoriaNotas / notas.length;
    return prom;
}

function guardarMateriasLS(aMaterias){
    localStorage.setItem("materias", JSON.stringify(aMaterias));
}

function cargarMateriasLS(){
    const materias = JSON.parse(localStorage.getItem("materias"));
    return materias || [];
}

function cargarCampos(){
    const listaCantidadExamenes = document.getElementById("listaCantExamenes");
    listaCantidadExamenes.onchange = function() {
        numElegido = parseInt(this.value);
    };
}

function vaciarMaterias(){
    Swal.fire({
        title: 'Eliminar todo',
        text: '¿ Desea eliminar todas las materias cargadas ?',
        icon: 'success',
        showConfirmButton: 'true',
        showCancelButton: 'false'
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem("materias");
            renderizarMaterias();
        }
    }); 
}

function eliminarMateria(nombreBorrar){
    Swal.fire({
        title: 'Eliminar materia',
        text: '¿ Desea eliminar la materias cargada ?',
        icon: 'warning',
        showConfirmButton: 'true',
        showCancelButton: 'false'
    }).then((result) => {
        if(result.isConfirmed){
            const materias = cargarMateriasLS();
            const materiasNuevo = materias.filter(item => item.nombre !== nombreBorrar);
            guardarMateriasLS(materiasNuevo);
            renderizarMaterias();
        }
    });
    
}

function removerAcentos(texto) {
    const caracteresAcentuados = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U'
    };
    return texto.replace(/[áéíóúÁÉÍÓÚ]/g, function(match) {
        return caracteresAcentuados[match];
    });
}

function elegirImagen(nombreMateria){
    const textoOriginal = nombreMateria;
    const textoSinAcentos = removerAcentos(textoOriginal);
    let urlImagen = `<img`;
    switch (textoSinAcentos.toUpperCase()) {
        case "LENGUA":
        case "LITERATURA":
        case "LENGUA Y LITERATURA":
            urlImagen+=` src="img/materias/lengua.svg" alt="Lengua y literatura"`
            break;
        
        case "MATEMATICA":
            urlImagen+=` src="img/materias/matematica.svg" alt="Matematica"`
            break;
        
        case "EDUCACION FISICA":
        case "ED FISICA":
        case "ED. FISICA":
            urlImagen+=` src="img/materias/edFisica.svg" alt="Educacion fisica"`
            break;
        
        case "QUIMICA":
            urlImagen+=` src="img/materias/quimica.svg" alt="Quimica"`
            break;
        
        case "FISICA":
            urlImagen+=` src="img/materias/fisica.svg" alt="Fisica"`
            break;
        
        case "PLASTICA":
        case "ARTE":
        case "ARTES PLASTICAS":
            urlImagen+=` src="img/materias/plastica.svg" alt="Artes plasticas"`
            break;
        
        case "MUSICA":
            urlImagen+=` src="img/materias/musica.svg" alt="Musica"`
            break;

        case "GEOGRAFIA":
            urlImagen+=` src="img/materias/geografia.svg" alt="Geografia"`
            break;

        case "HISTORIA":
            urlImagen+=` src="img/materias/historia.svg" alt="Historia"`
            break;

        case "INGLES":
        case "FRANCES":
        case "PORTUGUES":
            urlImagen+=` src="img/materias/idioma.svg" alt="Idioma"`
            break;
        
        case "BIOLOGIA":
            urlImagen+=` src="img/materias/biologia.svg" alt="Biologia"`
            break;
        
        default:
            urlImagen+=` src="img/materias/basico.svg" alt="Otras Materias"`
            break;
    }
    urlImagen += ` width="24"></img>`
    return urlImagen;
}

async function recibirAPI(titulo){
    const url = `https://book-finder1.p.rapidapi.com/api/search?title=${titulo}&book_type=fiction&categories=Mystery%20%26%20Suspense&results_per_page=10&page=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9fe731355msh5523b7e5498f0adp1dabd9jsn77a153835da5',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
        }
    };
    let result ="";
    try {
        const response = await fetch(url, options);
        result = await response.json();
    } catch (error) {
        result = "";
    }
    return result;
}

function espacioGuion(texto) {
    return texto.replace(/ /g, "-");
}

function buscarLibros(){
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const tituloBuscar = document.querySelector('input[aria-label="titulo"]').value;

    recibirAPI(tituloBuscar)
        .then(resultadoAPI => {
            let salida = "";
            let titulo;
            let tituloLink;
            let autor;
            let resumen;
            if (resultadoAPI.results.length === 0){
                salida = `
                <div class="alert alert-warning" role="alert">
                    Sin Resultados!
                </div>
                <div>
                    <button type="button" class="btn btn-secondary col" onClick="renderizarAPI()">Reintentar</button>
                </div>
                `;
            } else {
                salida = `
                        <div class="row">
                            <h3 class="col">¿Necesitas ayuda para estudiar?</h3>
                            <button type="button" class="btn btn-secondary col" onClick="renderizarAPI()">Reiniciar Busqueda</button>
                        </div>
                        <div class="row">
                    `;
                for (let i = 0; i < resultadoAPI.results.length; i++) {
                titulo = resultadoAPI.results[i].title;
                tituloLink = espacioGuion(titulo);
                autor = resultadoAPI.results[i].authors[0];
                resumen = resultadoAPI.results[i].summary;
                salida += `
                        <div class="card col-md-3 m-2" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h4 class="card-title">${titulo}</h4>
                                <h5 class="card-text fst-italic">${autor}</h5>
                                <p class="card-text" style="max-height: 100px; overflow-y: auto;">${resumen}</p>
                                <a href="https://listado.mercadolibre.com.ar/${tituloLink}" target="_blank" class="btn btn-info">Buscar en ML</a>
                            </div>
                        </div>
                `;
                }
            salida += `</div>`;
            }
            document.getElementById("contenidoB").innerHTML = salida;
        })
        .catch(_ => {
            salida = `
                <div class="alert alert-warning" role="alert">
                    Fallo de la API
                </div>
                <div>
                    <button type="button" class="btn btn-secondary col" onClick="renderizarAPI()">Reintentar</button>
                </div>
            `
            document.getElementById("contenidoB").innerHTML = salida;
        });
  });
}