import Menu from './menu.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'reactstrap';
function Insumo() {
    
    return (
        <Container>
            <Menu />
            <br/><br/><h1>Gestão Comercial</h1>

        </Container >
    );


}


function Pagina() {
    return <Insumo />
}


export default Pagina;