import {SideBar} from "./component/SideBar.tsx";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import {Info} from "./content/Info.tsx";
import {TitleContent} from "./content/TitleContent.tsx";


/**
 *  메인화면 세팅
 * @constructor
 */
export const MainContent = () => {
    return (
        <div className="d-flex vw-100 vh-100" >
            <SideBar/>
            <Container>
                <Info/>
                <TitleContent/>
            </Container>
        </div>

    )
}