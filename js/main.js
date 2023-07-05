function renderizarMaterias(){
    let materias = cargarMateriasLS();
    let listaMaterias = "";
    let contenido;
    if (materias.length > 0){
        materias.forEach(materia => {
            if(materia.aprobado){
                listaMaterias += `
                <tr>
                    <th scope="row" class="text-center">${materia.urlImagen}</th>
                    <td class="text-center">${materia.nombre}</td>
                    <td class="text-center">${materia.promedio.toFixed(2)}</td>
                    <td class="table-success text-center">Aprobado</td>
                    <td class="table-warning text-center"><img src="img/trash.svg" alt="Eliminar Materia" onclick="eliminarMateria('${materia.nombre}');"></td>
                </tr>
            `
            }else {
                listaMaterias += `
                <tr>
                    <th scope="row" class="text-center">${materia.urlImagen}</th>
                    <td class="text-center">${materia.nombre}</td>
                    <td class="text-center">${materia.promedio.toFixed(2)}</td>
                    <td class="table-danger text-center">Desaprobado</td>
                    <td class="table-warning text-center"><img src="img/trash.svg" alt="Eliminar Materia" onclick="eliminarMateria('${materia.nombre}');"></td>
                </tr>
            `
            }
        });

        contenido = `
        <table class="table" id="TablaMaterias">
              <thead>
                <tr>
                  <th scope="col" class="table-info col-1 text-center fst-italic">&nbsp</th>
                  <th scope="col" class="table-info col-4 text-center fst-italic">Materia</th>
                  <th scope="col" class="table-info col-3 text-center fst-italic">Promedio</th>
                  <th scope="col" class="table-info col-3 text-center fst-italic">Estado</th>
                  <th scope="col" class="table-warning text-center col-1 text-center text-end border border-black" onclick="vaciarMaterias();"><img src="img/trash-fill.svg" alt="Vaciar Todo" title="Vaciar todo"> Vaciar</th>
                </tr>
              </thead>
              <tbody id="listaMaterias">
                ${listaMaterias}
              </tbody>
            </table>
        `;
    }else{
        contenido = `
        <div class="alert alert-danger" role="alert">
            Sin notas para mostrar!
        </div>
        `
    }

    document.getElementById("contenidoA").innerHTML = contenido;
}

renderizarMaterias();


function renderizarAPI(){
    //const resultadoAPI = recibirAPI();
    let contenido;

    contenido = `
        <div class="row m-5 text-center border border-inf">
            <form id="formulario">
                <div class="mb-3">
                    <h2>¿ Necesitas ayuda para estudiar ?</h2>
                    <h4>¡Busca libros para mejorar tus notas!</h4>
                    <input type="text" class="form-control m-2" placeholder="Titulo del libro" aria-label="titulo">
                    <button type="submit" class="btn btn-primary m-2" onclick="buscarLibros()">Buscar Libros</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById("contenidoB").innerHTML = contenido;
}

renderizarAPI();