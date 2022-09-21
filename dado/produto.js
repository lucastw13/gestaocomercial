export default class Produto {
    static listar(){
      var lista = []
      lista.push({codigo: 1, descricao: "Brownie",ingredientes:[1,2,3]});
      lista.push({codigo: 2, descricao: "Bolo de Pote",ingredientes:[1,3,4]});
      return lista;
    
    } 
  }