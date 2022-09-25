import axios from 'axios';
import Host from '../dado/host'
export default class Ingrediente {

  static listar() {
    return axios.get(Host.urlApi() + "/ingrediente")
      /*.then(response => {
        if (response.data != null)

          for (var item of response.data.ingrediente) {
            lista.push({ codigo: item._id, descricao: item.descricao })
          }
      }, (error) => {
      })*/


    /*lista.push({ codigo: 1, descricao: "Cacau em Pó", tipo: "ingrediente" })
    lista.push({ codigo: 2, descricao: "Manteiga", tipo: "ingrediente" })
    lista.push({ codigo: 3, descricao: "Farinha", tipo: "ingrediente" })
    lista.push({ codigo: 4, descricao: "Chocolate", tipo: "ingrediente" })
    return lista;*/
  }
  static item(codigo) {
    return axios.get(Host.urlApi()+"/ingrediente/"+codigo)
    /*var itemReturn = {}
    for (var item of this.listar()) {
      if (item.codigo == codigo) {
        itemReturn = item;
      }

    }
    return itemReturn;*/
  }
  static deletar(codigo) {
    return axios.get(Host.urlApi()+"/ingrediente/"+codigo+"/deletar");
  }
  static salvar(codigo,descricao) {
    if(codigo=="incluir"){
      console.log("incluir: "+descricao)
      return axios.post(Host.urlApi()+"/ingrediente",{descricao:descricao});
    }else{
      return axios.put(Host.urlApi()+"/ingrediente",{_id:codigo,descricao:descricao});
    
    }
   
  }

}