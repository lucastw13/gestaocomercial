export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Insumos", pagina: "insumo"})
    lista.push({codigo: 2, descricao: "Receitas", pagina: "receita"})
    lista.push({codigo: 2, descricao: "Registrar Receita", pagina: "registrareceita"})
    lista.push({codigo: 2, descricao: "Produtos", pagina: "produto"})
    return lista;
  
  } 
}