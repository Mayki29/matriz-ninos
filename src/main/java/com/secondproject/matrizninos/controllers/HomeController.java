package com.secondproject.matrizninos.controllers;

import com.secondproject.matrizninos.dao.AtencionDao;
import com.secondproject.matrizninos.dao.CodigoDao;
import com.secondproject.matrizninos.dao.PacienteDao;
import com.secondproject.matrizninos.models.Atencion;
import com.secondproject.matrizninos.models.Codigo;
import com.secondproject.matrizninos.models.Paciente;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class HomeController {
    @Autowired
    private PacienteDao pacienteDao;

    @Autowired
    private AtencionDao atencionDao;

    @Autowired
    private CodigoDao codigoDao;

    //Trae todos los pacientes
    @GetMapping(value = "api/pacientes")
    public List<Paciente> getAll(){
        return pacienteDao.getAll();
    }


    //Trae los codigos de atencion mediante el id el paciente
    @GetMapping(value = "api/atencion/getcodbyid/{id}")
    public List<Atencion> getAtencionById(@PathVariable(value = "id") Integer id){
        return atencionDao.getByIdPaciente(id);
    }


    //Trae un paciente mediante su id
    @GetMapping(value = "api/paciente/{id}")
    public Paciente getPacienteById(@PathVariable(value = "id") Integer id){
        return pacienteDao.getById(id);
    }

    //Trae una lista de pacientes mediante nombre o apellido
    @GetMapping(value = "api/pacientes/{name}")
    public List<Paciente> getPacientesByName(@PathVariable(value = "name")String name){
        return pacienteDao.getPacientesByName(name);
    }


    //Trae la lista de codigos
    @GetMapping(value = "api/codigos")
    public List<Codigo> getListaCodigos(){
        return codigoDao.getAll();
    }


    //Crea un paciente
    @PostMapping(value = "api/paciente")
    public String createPaciente(@RequestBody String strPaciente){

        Paciente paciente = new Paciente();
        Atencion atencion = new Atencion();
        JSONObject jsonPaciente = new JSONObject(strPaciente);

        String idPaciente = jsonPaciente.get("id").toString();
        String numExtra = jsonPaciente.get("numExtra").toString();

        if(!idPaciente.isEmpty()){
            paciente.setId(Integer.parseInt(idPaciente));
        }

        paciente.setHc(jsonPaciente.get("hc").toString());
        paciente.setDni(jsonPaciente.get("dni").toString());
        paciente.setNombreApellido(jsonPaciente.get("nombreApellido").toString());
        paciente.setCelular(jsonPaciente.get("celular").toString());

        atencion.setIdCodigo(Integer.parseInt(jsonPaciente.get("codigo").toString()));
        atencion.setFecha(LocalDate.now());

        if(!numExtra.isEmpty()){
            atencion.setNumExtra(numExtra);
        }

        pacienteDao.create(paciente, atencion);

        return "Valido";
    }


    //Cambia el estado del abo
    @PutMapping(value = "api/paciente/setabo")
    public String setAboPaciente(@RequestBody String data){
        JSONObject check = new JSONObject(data);
        Integer id = Integer.parseInt(check.get("id").toString());
        String estado = check.get("estado").toString();
        if(estado.equals("on")){
            estado = "1";
        }
        try{
            pacienteDao.setAbo(id, estado);
            return "valido";
        }catch (Exception e){
            return "error";
        }

    }
}
