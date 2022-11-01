import axios from 'axios';
import Host from '../dado/host'
import Usuario from "../dado/usuario.js";
export default class Generico {

  static listar(entidade) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/" + entidade + "/codigo/entidade2/" + empresa)
  }
  static listarProduto(eSubProduto) {
    var empresa = Usuario.getEmpresa();
    return axios.get(Host.urlApi() + "/produto/codigo/entidade2/" + empresa + "/" + eSubProduto)
  }
  static item(codigo, entidade) {
    return axios.get(Host.urlApi() + "/" + entidade + "/" + codigo)

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
      item.dataAlteracao = dateTime.toLocaleDateString();
      item.horaAlteracao = dateTime.toLocaleTimeString();
      item.usuarioAlteracao = Usuario.getUsuario();
      return axios.put(Host.urlApi() + "/" + entidade, item);

    }

  }

}