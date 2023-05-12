import axios from 'axios';
import Host from '../dado/host'
import Usuario from "../dado/usuario.js";
export default class Generico {

  static testeConexao(){
    return axios.get(Host.urlApi())
  }
  static listar(entidade) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/" + entidade + "/codigo/entidade2/" + empresa)
  }

  static listarEmpresa() {
    return axios.get(Host.urlApi() + "/empresa")
  }
  static listarProduto(eSubProduto) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/produto/codigo/entidade2/" + empresa + "/" + eSubProduto)
  }
  
  static item(codigo, entidade) {
    return axios.get(Host.urlApi() + "/" + entidade + "/" + codigo)
  }
  static itemInsumo(codigo) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/insumo/" + codigo + "/entidade2/"+empresa)
  }

  static itemDePara(cnpj,codigo) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/insumodepara/codigo/entidade2/" + empresa + "/" + cnpj+"/"+codigo)
  }
  static itemNotaFiscal(chave,entidade2) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/notafiscal/"+chave+"/"+entidade2+"/"+ empresa+"/notafiscal/")
  }

  static itemLista(codigo, entidade, entidade2) {
    return axios.get(Host.urlApi() + "/" + entidade + "/" + codigo + "/" + entidade2)

  }
  static deletar(codigo, entidade) {
    return axios.delete(Host.urlApi() + "/" + entidade + "/" + codigo);
  }
  static salvar(item, entidade) {
    var dateTime = new Date()
    if (item._id == "" || item._id == undefined) {
      item.empresa = Usuario.getEmpresa();
      item.data = dateTime.toLocaleDateString();
      item.hora = dateTime.toLocaleTimeString();
      item.usuario = Usuario.getUsuario();
      return axios.post(Host.urlApi() + "/" + entidade, item);
    } else {
      item.empresa = Usuario.getEmpresa();
      item.dataAlteracao = dateTime.toLocaleDateString();
      item.horaAlteracao = dateTime.toLocaleTimeString();
      item.usuarioAlteracao = Usuario.getUsuario();
      return axios.put(Host.urlApi() + "/" + entidade, item);
    }
  }
  static autenticar(item){
    return axios.post(Host.urlApi() + "/usuario", item);
  }
  static salvarLista(lista, entidade) {
    
    var dateTime = new Date()
    var listaSalvar = []
    for (var item of lista) {
      if (item._id == "" || item._id == undefined) {
        item.empresa = Usuario.getEmpresa();
        item.data = dateTime.toLocaleDateString();
        item.hora = dateTime.toLocaleTimeString();
        item.usuario = Usuario.getUsuario();
        listaSalvar.push(item)
      } 
    }
    if(listaSalvar.length>0){
      return axios.post(Host.urlApi() + "/" + entidade, listaSalvar);
    }else{
      return ""
    }

  }
  static salvarListaSemEmpresa(lista, entidade) {
    
    var dateTime = new Date()
    var listaSalvar = []
    for (var item of lista) {
      if (item._id == "" || item._id == undefined) {
        item.data = dateTime.toLocaleDateString();
        item.hora = dateTime.toLocaleTimeString();
        item.usuario = Usuario.getUsuario();
        listaSalvar.push(item)
      } 
    }
    if(listaSalvar.length>0){
      return axios.post(Host.urlApi() + "/" + entidade, listaSalvar);
    }else{
      return ""
    }

  }

}