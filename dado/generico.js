import axios from 'axios';
import Host from '../dado/host'
export default class Generico {

  static listar(entidade) {
    return axios.get(Host.urlApi() + "/"+entidade)
  }
  static item(codigo,entidade) {
    return axios.get(Host.urlApi()+"/"+entidade+"/"+codigo)
    
  }
  static deletar(codigo,entidade) {
    return axios.delete(Host.urlApi()+"/"+entidade+"/"+codigo);
  }
  static salvar(item,entidade) {
    if(item.codigo=="incluir"){
      return axios.post(Host.urlApi()+"/"+entidade,item);
    }else{
      return axios.put(Host.urlApi()+"/"+entidade,item);
    
    }
   
  }

}