export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Insumo", pagina: "insumo"})
    lista.push({codigo: 2, descricao: "Produto", pagina: "produto"})
    return lista;
  
  } 
}