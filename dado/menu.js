export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Insumos", pagina: "insumo"})
    lista.push({codigo: 2, descricao: "Receitas", pagina: "receita"})
    lista.push({codigo: 3, descricao: "Registrar Receita", pagina: "registrareceita"})
    lista.push({codigo: 4, descricao: "Registrar Compra", pagina: "compra"})
    lista.push({codigo: 5, descricao: "Produtos", pagina: "produto"})
    lista.push({codigo: 6, descricao: "SubProdutos", pagina: "subproduto"})
    return lista;
  
  } 
}