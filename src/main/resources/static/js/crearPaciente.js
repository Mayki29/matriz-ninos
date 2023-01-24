

  function getHeaders(){
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    };
  }
  
  async function registrarPaciente(){  
    

    //btnCarga()


    let datosPaciente ={};
    datosPaciente.nombreApellido = document.getElementById('txtNameRegistro').value;
    datosPaciente.id = document.getElementById('txtIdRegistro').value;
    datosPaciente.hc = document.getElementById('txtHcRegistro').value;
    datosPaciente.dni = document.getElementById('txtDniRegistro').value;
    datosPaciente.celular = document.getElementById('txtCelularRegistro').value;
    datosPaciente.codigo = document.getElementById('selectCodigo').value;
    if(document.getElementById('txtNumExtra') !== null){
      datosPaciente.numExtra = document.getElementById('txtNumExtra').value;
    }else{
      datosPaciente.numExtra = '';
    }
    
    



    const request = await fetch('api/paciente', {  
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datosPaciente)
    });
    try{
      const validacion = await request.text();
      console.log(validacion);
      $('#modalRegistro').modal('hide');
      cleanRegistro();
      cargarPacientes();
      

    }catch(error){
      alert("Ocurrio un error, se cargara la pagina otra vez y vuelva a intentarlo");
      location.reload();
    }
    

    
  }
  
  
  
  async function eliminarUsuario(id){
  
    if(!confirm('¿Desea eliminar este usuario?')){
      return;
    }
    const request = await fetch('api/usuarios/' + id, {  // lo que hace el await es que se espere el resultado del codigo
      method: 'DELETE',
      headers: getHeaders(),
    });
  
    location.reload()
    
  }

  function btnCarga(){
    let spin = '<div class="spinner-border text-light" role="status">'+
                '<span class="sr-only">Loading...</span></div>';
    
    document.getElementById("btnFinalizar").innerHTML = spin;
    document.getElementById("btnFinalizar").setAttribute('disabled','');
    document.getElementById("btnCancelar").setAttribute('disabled','');
    document.getElementById("btnCerrar").setAttribute('disabled','');

    
  }