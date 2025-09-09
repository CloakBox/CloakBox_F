import {SideBar} from "./component/SideBar.tsx";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'


/**
 *  메인화면 세팅
 * @constructor
 */
export const MainContent = () => {
    return (
        <div className="d-flex vw-100 vh-100" >
            <SideBar/>
            <Container>
                여긴 이제 메인화면임12341231231231
            </Container>
        </div>

    )
}