export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Ingredientes", pagina: "ingredientes"})
    lista.push({codigo: 2, descricao: "Produtos", pagina: "produtos"})
    return lista;
  
  } 
}