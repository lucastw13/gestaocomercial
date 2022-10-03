import { useState, React } from 'react';
import Menu from '../menu';
import { Container, Label, Input, Button, Form, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/generico.js'
import { useRouter } from 'next/router'
import Host from '../../dado/host';
function RegistraReceita() {
    const [item, setItem] = useState("");
    const [listaInsumo, setListaInsumo] = useState("");
    const [receitaUsadaRegistro, setReceitaUsadaRegistro] = useState("");
    const router = useRouter()


    if (((item == "") || (item == undefined)) && ((router.query.codigo != "") && (router.query.codigo != undefined))) {
        if (router.query.codigo == "incluir") {
            setItem({ insumo: [] })
            setListaInsumo([])
        } else {
            Dado.item(router.query.codigo, "receita")
                .then(response => {
                    if (response.data != null) {
                        if (response.data.status == true) {
                            setItem(response.data.item)
                            document.getElementById("descricao").value = response.data.item.descricao;

                            Dado.itemLista(response.data.item._id, "receita", "insumo")
                                .then(response => {
                                    if (response.data.status == true) {
                                        setListaInsumo(response.data.lista)
                                    } else {
                                        setListaInsumo([])
                                    }

                                }, (error) => {
                                    console.log("error: " + error)
                                })

                        } else {
                            setItem({})
                            console.log("error: " + response.data.descricao)
                        }


                    }
                }, (error) => {
                    console.log("error: " + error)
                })
        }
    }

    function mudarDescricao(event) {
        var itemTemp = item
        itemTemp.descricao = event.target.value
        setItem(itemTemp);

    }




    function registrarReceita() {
       
        var itemRegistro = {
            receita:item._id,            
        }
  
        Dado.salvar(item, "registrareceita").then(response => {
            if (response.data != null) {
                if (response.data.status == true) {
                    router.push(Host.url() + "/registrareceita")
                } else {
                    console.log("error: " + response.data.descricao)
                }
            }
        }, (error) => {
            console.log("error: " + error)
        })

    }

    function exibirReceitaUsadaRegistro(itemRegistro) {
        var receitaUsadaRegistroTemp = ""
        for (var itemInsumoRegistrado of itemRegistro.insumo) {

            for (var itemInsumoCompleto of listaInsumo) {
                if (itemInsumoCompleto._id == itemInsumoRegistrado._id) {
                    break;
                }
            }
            if (receitaUsadaRegistroTemp != "") {
                receitaUsadaRegistroTemp = receitaUsadaRegistroTemp + "<br/>"

            }
            receitaUsadaRegistroTemp = receitaUsadaRegistroTemp + itemInsumoRegistrado.quantidade + itemInsumoCompleto.unidadeMedida + " de " + itemInsumoCompleto.descricao

        }
        setReceitaUsadaRegistro(receitaUsadaRegistroTemp)
    }
    return (
        <Container>
            <Menu />
            <Form inline>
                <FormGroup >
                    <Label for="descricao" >Descrição</Label>
                    <Input type="text" id="descricao" disabled="true" onChange={mudarDescricao} />

                </FormGroup>
                <FormGroup>
                    <Button color="danger" onClick={registrarReceita}>Registrar Receita</Button>
                </FormGroup>

            </Form>
            <h3>Lista de Insumos</h3>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Quant.
                        </th>
                        <th>
                            Unid. Med.
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {listaInsumo && listaInsumo.map((itemInsumo) => (
                        <tr>
                            <td>
                                <a href={Host.url() + "/insumo/" + itemInsumo._id}>
                                    {itemInsumo.descricao}
                                </a>

                            </td>
                            <td>
                                {itemInsumo.quantidadeReceita}
                            </td>
                            <td>
                                {itemInsumo.unidadeMedida}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            <h3>Lista de Registros</h3>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Data
                        </th>
                        <th>
                            Hora
                        </th>
                        <th>
                            Usuário
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {item.registro && item.registro.map((itemRegistro) => (
                        <tr onClick={() => exibirReceitaUsadaRegistro(itemRegistro)}>
                            <td>
                                {itemRegistro.data}

                            </td>
                            <td>
                                {itemRegistro.hora}
                            </td>
                            <td>
                                {itemRegistro.usuario}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {receitaUsadaRegistro}
        </Container>
    );
}

function Pagina() {

    return <RegistraReceita />
}
export default Pagina;