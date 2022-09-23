export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Ingrediente", pagina: "ingrediente"})
    lista.push({codigo: 2, descricao: "Produto", pagina: "produto"})
    return lista;
  
  } 
}