export default class Menu {
  static listar() {
    var lista = []
    lista.push({ codigo: 1, nivel: 999,importante:0, descricao: "Insumos", pagina: "insumo" })
    lista.push({ codigo: 2, nivel: 1,importante:0, descricao: "Receitas", pagina: "receita" })
    lista.push({ codigo: 4, nivel: 1,importante:0, descricao: "Compra", pagina: "compra" })
    lista.push({ codigo: 5, nivel: 1,importante:0, descricao: "Produtos", pagina: "produto" })
    lista.push({ codigo: 7, nivel: 1,importante:0, descricao: "SubProdutos", pagina: "subproduto" })
    lista.push({ codigo: 8, nivel: 1,importante:1, descricao: "Clientes", pagina: "cliente" })
    lista.push({ codigo: 9, nivel: 1,importante:1, descricao: "Pedidos", pagina: "pedido" })
    lista.push({ codigo: 10, nivel: 999,importante:0, descricao: "Insumos De/Para", pagina: "insumodepara" })
    lista.push({ codigo: 11, nivel: 999,importante:0, descricao: "Parametros", pagina: "parametro" })
    return lista

  }
}