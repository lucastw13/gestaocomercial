import { useState, React } from 'react';
import { Button, Container, Form, Label, Input, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Endereco() {
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    var response = ""

    function mudaCep(event) {
        setCep(event.target.value);
    }
    function buscarEndereco() {
        if (cep != "") {
            axios.get("https://viacep.com.br/ws/" + cep + "/json")
                .then(response => {
                    if (response.data != null)
                        setEndereco(response.data.logradouro + " - " + response.data.bairro + " - " + response.data.localidade + " - " + response.data.uf);
                    else
                        setEndereco("")
                }, (error) => {
                    setEndereco("")
                });

        }
    }

    return (
        <Container>

            <Label for="00000000">CEP</Label>
            <Input type="text" name="cep" id="cep" placeholder="00000000"  onChange={mudaCep}/>
            <Button color="danger" onClick={buscarEndereco}>Buscar Endereço</Button>
            <div>{endereco}</div>
        </Container>

    )

}

function Pagina() {
    return <Endereco />
}
export default Pagina;

