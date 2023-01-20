export default class Menu {
  static listar(){
    var lista = []
    lista.push({codigo: 1, descricao: "Insumos", pagina: "insumo"})
    lista.push({codigo: 2, descricao: "Receitas", pagina: "receita"})
    lista.push({codigo: 3, descricao: "Registrar Receita", pagina: "registrareceita"})
    lista.push({codigo: 4, descricao: "Registrar Compra", pagina: "compra"})
    lista.push({codigo: 5, descricao: "Produtos", pagina: "produto"})
    lista.push({codigo: 7, descricao: "SubProdutos", pagina: "subproduto"})
    lista.push({codigo: 8, descricao: "Clientes", pagina: "cliente"})
    lista.push({codigo: 9, descricao: "Pedidos", pagina: "pedido"})
    lista.push({codigo: 10, descricao: "Insumos De/Para", pagina: "insumodepara"})
    lista.push({codigo: 11, descricao: "Parametros", pagina: "parametro"})
    return lista;
  
  } 
}