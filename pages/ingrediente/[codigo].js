import Menu from '../menu';
import { Container, Table, tbody, thead } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dado from '../../dado/ingrediente.js'
import {useRouter} from 'next/router'
function Ingrediente() {
    const router = useRouter();
    return (
        <Container>
            <Menu />
            <h1>{router.query.codigo}</h1> 
            <h1>{Dado.item(router.query.codigo).descricao}</h1>
        </Container>
    );
}

function Pagina() {
    
    return <Ingrediente />
}
export default Pagina;