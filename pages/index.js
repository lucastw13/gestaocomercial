import Menu from './menu.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'reactstrap';
import Host from '../dado/host';
function Insumo() {
    
    return (
        <Container>
            <Menu />
            <br/><br/><h1>Gestão Comercial</h1>
            <br/><br/><h1>{Host.url()}</h1>
            <br/><br/><h1>{Host.urlApi()}</h1>

        </Container >
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;