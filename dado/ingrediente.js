import axios from 'axios';
import Host from '../dado/host'
export default class Ingrediente {
  
    static  listar(){
    var lista = []
    return axios.get(Host.urlApi()+"/ingrediente")
               /*.then (response => {
                    if (response.data != null)
                      for(var item of response.data.ingrediente){
                        lista.push({codigo:item._id,descricao:item.descricao}) 
                      }
                      return lista;
                }, (error) => {
                    return lista;
                })*/

    
      /*lista.push({codigo: 1, descricao: "Cacau em Pó"})
      lista.push({codigo: 2, descricao: "Manteiga"})
      lista.push({codigo: 3, descricao: "Farinha"})
      lista.push({codigo: 4, descricao: "Chocolate"})*/

    } 
    static item(codigo){
      var itemReturn={}
      for(var item of this.listar()){
        if (item.codigo==codigo){
          itemReturn = item;
          console.log(item);
        }
      
      }
      return itemReturn;
    }

  }