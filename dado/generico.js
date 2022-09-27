import axios from 'axios';
import Host from '../dado/host'
export default class Generico {

  static listar(entidade) {
    return axios.get(Host.urlApi() + "/"+entidade)
  }
  static item(codigo,entidade) {
    return axios.get(Host.urlApi()+"/"+entidade+"/"+codigo)
    
  }

  static itemLista(codigo,entidade,entidade2) {
    return axios.get(Host.urlApi()+"/"+entidade+"/"+codigo+"/"+entidade2)
    
  }
  static deletar(codigo,entidade) {
    return axios.delete(Host.urlApi()+"/"+entidade+"/"+codigo);
  }
  static salvar(item,entidade) {
    if(item._id==""||item._id==undefined){
      return axios.post(Host.urlApi()+"/"+entidade,item);
    }else{
      return axios.put(Host.urlApi()+"/"+entidade,item);
    
    }
   
  }

}