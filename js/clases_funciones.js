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
    localStorage.removeItem("materias");
    renderizarMaterias();
}

function eliminarMateria(nombreBorrar){
    console.log(nombreBorrar);
    const materias = cargarMateriasLS();
    const materiasNuevo = materias.filter(item => item.nombre !== nombreBorrar);
    guardarMateriasLS(materiasNuevo);
    renderizarMaterias();
}

function elegirImagen(nombreMateria){
    let urlImagen = `<img`;
    switch (nombreMateria.toUpperCase()) {
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
        
        default:
            urlImagen+=` src="img/materias/basico.svg" alt="Otras Materias"`
            break;
    }
    urlImagen += ` width="24"></img>`
    return urlImagen;
}