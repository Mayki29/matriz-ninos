$(document).ready(function() {

    cargarPacientes();

});

function getHeaders(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

function cleanRegistro(){
  document.querySelector('#lista-nombres-registrados').innerHTML ='';
  document.getElementById('txtNameRegistro').value = '';
  document.getElementById('txtIdRegistro').value = '';
  document.getElementById('txtIdRegistro').removeAttribute("disabled");

  document.getElementById('txtHcRegistro').value = '';
  document.getElementById('txtHcRegistro').removeAttribute("disabled");

  document.getElementById('txtDniRegistro').value = '';
  document.getElementById('txtDniRegistro').removeAttribute("disabled");

  document.getElementById('txtCelularRegistro').value = '';
  document.getElementById('txtCelularRegistro').removeAttribute("disabled");

  if(document.getElementById('txtNumExtra') !== null){
    document.getElementById('divCodigoExtra').innerHTML = '';
    document.getElementById('divCodigoExtra').classList.remove("col-2");
    document.getElementById('selectCodigo').classList.remove("col-10");
  }
}



async function cargarPacientes(){  
  const request = await fetch('api/pacientes', {  
    method: 'GET',
    headers: getHeaders(),
  });
  const usuarios = await request.json();



  let listadoHtml = '';

  for (let usuario of usuarios){
     
    let btnCodigo = '<button onclick="getCodById('+usuario.id+')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCodigo"><i class="fas fa-eye"></i></button>';
    //'<input type="checkbox" onclick="marcarAbor('+usuario.id+')" id="chk-'+usuario.id+'" checked></input>'
    let checkAbo = usuario.abo == '1' ? '<input type="checkbox" onclick="setAbo('+usuario.id+')" id="chk-'+usuario.id+'" checked></input>' : '<input type="checkbox" onclick="setAbo('+usuario.id+')" id="chk-'+usuario.id+'"></input>';
    let telefonoTexto = usuario.celular == null ? '-' : usuario.celular;
    let colorT = '<tr>';
    let usuarioHtml = colorT+'<td>'
    + usuario.hc+'</td><td>' 
    + usuario.dni + '</td><td>'
    + usuario.nombreApellido+'</td><td>'
    + telefonoTexto+'</td><td>'
    + checkAbo+'</td><td>'
    + btnCodigo+'</td></tr>';

    listadoHtml += usuarioHtml;
  }

  //console.log(usuarios);

  document.querySelector('#pacientes tbody').innerHTML = listadoHtml;
  cargarListaCodigos();
}

async function cargarListaCodigos(){
  const request = await fetch('api/codigos', {  
    method: 'GET',
    headers: getHeaders(),
  });
  const allCodigos = await request.json();
  
  let listadoCompletoCodigos = '';
  for(let codigo of allCodigos){

    let codHtml = 
    '<option value="'+codigo.id+'">'+codigo.codigo+'</option>';

    listadoCompletoCodigos += codHtml;
  }
  document.querySelector('#selectCodigo').innerHTML = listadoCompletoCodigos;

}

function agregrarInputCodigo(){
  let codigoSeleccionado = document.getElementById('selectCodigo').value;

  switch(codigoSeleccionado){
    case "12":
    case "16":
    case "17":
    case "18":
      document.getElementById('divCodigoExtra').innerHTML = '<input type="text" class="form-control d-flex" id="txtNumExtra">';
      document.getElementById('divCodigoExtra').classList.add("col-2");
      document.getElementById('selectCodigo').classList.add("col-10");

      break;
    default:
      document.getElementById('divCodigoExtra').innerHTML = '';
      document.getElementById('divCodigoExtra').classList.remove("col-2");
      document.getElementById('selectCodigo').classList.remove("col-10");
  }
}


async function getCodById(id){
  const request = await fetch('api/atencion/getcodbyid/'+id, {  // lo que hace el await es que se espere el resultado del codigo
    method: 'GET',
    headers: getHeaders(),
  });
  const codigos = await request.json();

  let listadoCodigos = '';

  

  for(let codigo of codigos){
    let numExtraText = codigo.numExtra == null ? '' : codigo.numExtra;
    let codigoHtml = 
    '<div class="row">'
    +'<div class="col-6"><p>'+codigo.codigo.codigo+'<span style="color: purple; font-weight: bold;">'+numExtraText+'</span></p></div>'
    +'<div class="col-6"><p>'+formatoFecha(codigo.fecha)+'</p></div>'
    +'</div>';

    listadoCodigos += codigoHtml;
  }
  document.querySelector('#modal-codigo-cuerpo').innerHTML = listadoCodigos;
}


async function setAbo(id){


  let checkAbo = document.getElementById('chk-'+id).value;

  let data = {};
  data.id = id;
  data.estado = checkAbo;

  const request = await fetch('api/paciente/setabo', {  // lo que hace el await es que se espere el resultado del codigo
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  const confirmacion = await request.text();


  if(confirmacion == "valido"){
    alert("Se actualizo correctamente");
  }else{
    alert("Hubo un error");
  }
  cargarPacientes();
}

function cerrarSesion(){
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}


async function verRifaPorId(id){

  const request = await fetch('api/rifa/'+id, {  // lo que hace el await es que se espere el resultado del codigo
    method: 'GET',
    headers: getHeaders(),
  });
  const rifa = await request.json();

  sessionStorage.rifa = JSON.stringify(rifa);
  window.location.href = 'visualizarifa.html';
}


function changeTypeInput(){
  let selectValue = document.getElementById('stColumna').value;
  if(selectValue == 'fecha'){
    document.getElementById('txtSearch').setAttribute('type','date');
  }else{
    document.getElementById('txtSearch').setAttribute('type','search');
  }
  
}

async function searchPacientesRegistro(){
  let txtinput = document.getElementById('txtNameRegistro').value;

  if(txtinput == ""){
    cleanRegistro();
    return;

    
  }

  const request = await fetch('api/pacientes/'+txtinput, {  // lo que hace el await es que se espere el resultado del codigo
    method: 'GET',
    headers: getHeaders(),
  });
  const pacientes = await request.json();
  
  let listadoPacientes = '';
  let contador = 0;
  for(let paciente of pacientes){

    let pacienteHtml = 
    '<button onclick="autoRellenar('+paciente.id+')" type="button" class="list-group-item list-group-item-action">'+paciente.nombreApellido+'</button>';

    listadoPacientes += pacienteHtml;
    contador++;
    if(contador >= 5){
      break;
    }
  }
  document.querySelector('#lista-nombres-registrados').innerHTML = listadoPacientes;
}

async function autoRellenar(id){
  const request = await fetch('api/paciente/'+id, {  // lo que hace el await es que se espere el resultado del codigo
    method: 'GET',
    headers: getHeaders(),
  });
  const paciente = await request.json();
  document.getElementById('txtNameRegistro').value = paciente.nombreApellido;

  document.getElementById('txtIdRegistro').value = paciente.id;
  document.getElementById('txtIdRegistro').setAttribute("disabled","disabled");

  document.getElementById('txtHcRegistro').value = paciente.hc;
  document.getElementById('txtHcRegistro').setAttribute("disabled","disabled");

  document.getElementById('txtDniRegistro').value = paciente.dni;
  document.getElementById('txtDniRegistro').setAttribute("disabled","disabled");

  document.getElementById('txtCelularRegistro').value = paciente.celular;
  document.getElementById('txtCelularRegistro').setAttribute("disabled","disabled");




}

async function searchPacientes(){
  let datos = {};
    datos.data = document.getElementById('txtSearch').value;
    datos.option = document.getElementById('stColumna').value;

  if(datos.data == ""){
    cargarPacientes();
    return;
  }
  
  
  const request = await fetch('api/rifa/search', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });

  const respuesta = await request.json();



  let listadoHtml = '';

  for (let usuario of respuesta){
    let btnVerRifa = '<a onclick="verRifaPorId('+usuario.idRifa+')" class="btn btn-primary"><i class="fas fa-eye"></i></a>';
    let botonConfirmar = usuario.confirmacion == 'Confirmada' ? '<a onclick="confirmarVenta('+usuario.idRifa+')" class="btn btn-success disabled"><i class="fas fa-check-circle"></i></a>' : '<a onclick="confirmarVenta('+usuario.idRifa+')" class="btn btn-success"><i class="fas fa-check-circle"></i></a>';
    let telefonoTexto = usuario.celular == null ? '-' : usuario.celular;
    let colorT = usuario.confirmacion == 'Confirmada' ? '<tr style="color: rgb(0, 170, 0)">' : '<tr style="color: red">';
    let usuarioHtml = colorT+'<td>'
    + usuario.idRifa+'</td><td>' 
    + usuario.nombres + '</td><td>'
    + usuario.apellidos+'</td><td>'
    + usuario.metodoPago+'</td><td>'
    + usuario.fecha+'</td><td>'
    + telefonoTexto+'</td><td>'
    + usuario.direccion+'</td><td>'
    + usuario.confirmacion+'</td><td>'
    + botonConfirmar + btnVerRifa +'</td></tr>';

    listadoHtml += usuarioHtml;
  }

  document.querySelector('#Pacientes tbody').innerHTML = listadoHtml;
}


function formatoFecha(texto){
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
}