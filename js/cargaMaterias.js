let arregloMaterias = [];
const contenido = document.getElementById("contenidoCarga");
const boton = document.getElementById("botonCarga");
let numElegido;

function renderCargarNotas(){
    arregloMaterias = cargarMateriasLS();
    contenido.innerHTML =`
    <label for="listaCantExamens" class="form-label">Cantidad de examenes</label>
                <select class="form-select" id="listaCantExamenes" aria-label="Lista cantidad examenes">
                    <option selected>Elija la cantidad de examenes</option>
                    <option value="1">Uno</option>
                    <option value="2">Dos</option>
                    <option value="3">Tres</option>
                    <option value="4">Cuatro</option>
                    <option value="5">Cinco</option>
                    <option value="6">Seis</option>
                    <option value="7">Siete</option>
                    <option value="8">Ocho</option>
                    <option value="9">Nueve</option>
                    <option value="10">Diez</option>
                </select>
`;
    boton.innerHTML = ` 
    <div class="col-12 text-end">
        <button type="button" class="btn btn-primary btn-sm" onclick="elegirCantidad()">Elegir cantidad</button>
    </div> 
    `;
}

renderCargarNotas();
cargarCampos();

function elegirCantidad(){

    contenido.innerHTML =`<label for="listaCantExamens" class="form-label">Cantidad de examenes</label>`

    for (let i = 0; i < numElegido; i++) {
        const nota = document.createElement("div");
        nota.id = `notaNumero${i+1}`;
        nota.innerHTML = ` <input class="form-control my-2" type="number" placeholder="Ingresa la nota del examen ${i+1}" aria-label="input de nota">`;
        contenido.appendChild(nota);
    }

    boton.innerHTML =
    `<div class="col-3">
        <button type="button" class="btn btn-primary btn-lg" onclick="cargarNotas()">Cargar</button>
     </div> `;
}

function cargarNotas(){
    let notasTemp = [];
    const nomMateria = document.getElementById("NomMateriaCarga");
    const nombreMateria = nomMateria.value;
    const imagenIcono = elegirImagen(nombreMateria);
    notasTemp = guardarNotasTemp(numElegido);
    let validez = notasValidas(notasTemp);

    if ((validez) && (nombreMateria !== "")){
        const prom = promedio(notasTemp);
        let aprobo;

        if (prom >= 7){
            aprobo = true;
        }else{
            aprobo = false;
        }

        const materiaNueva = new Materia(nombreMateria,notasTemp,prom,aprobo,imagenIcono);
        arregloMaterias.push(materiaNueva);
        guardarMateriasLS(arregloMaterias);

        const campoAborrar = document.getElementById("NomMateriaCarga");
        campoAborrar.value = "";

        Toastify({
            text: "Materia Cargada!",
            duration: 3000,
            destination: "index.html",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "green",
              }
        }).showToast();

    }else{
        Toastify({
            text: "Notas ingresadas NO VALIDAS o materia NO INGRESADA",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "crimson",
              }
        }).showToast();
    }

    renderCargarNotas();
    cargarCampos();
}