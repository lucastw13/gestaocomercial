import axios from 'axios';
import Host from '../dado/host'
export default class Insumo {

  static listar() {
    return axios.get(Host.urlApi() + "/insumo")
  }
  static item(codigo) {
    return axios.get(Host.urlApi()+"/insumo/"+codigo)
    
  }
  static deletar(codigo) {
    return axios.get(Host.urlApi()+"/insumo/"+codigo+"/deletar");
  }
  static salvar(item) {
    if(item.codigo=="incluir"){
      return axios.post(Host.urlApi()+"/insumo",{codigo:item.codigo,descricao:item.descricao});
    }else{
      return axios.put(Host.urlApi()+"/insumo",{codigo:item.codigo,descricao:item.descricao});
    
    }
   
  }

}