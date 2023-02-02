import { useNavigate } from 'react-router-dom';
import NotAdultCSS from './NotAdultCSS.module.css';


function NotAdult() {

    const navigate = useNavigate();

    const onClickGoMainHandler = () => { 
        navigate("/", { replace: true })
    }

    const onClickNoMainHandler = () => { 
        alert('어른이 되어 돌아오세요')
    }

    return (
        <div className={NotAdultCSS.box}>
                <div>
                    <img className={NotAdultCSS.image} src="../../images/logo.png"></img>
                </div>
            <div className={NotAdultCSS.miniBox}>
                <h1>이 사이트는 만 19세 이상만 입장이 가능합니다.<br></br>
                    당신은 만 19세 이상입니까?
                </h1>

                <button className={NotAdultCSS.over19}
                    onClick={onClickGoMainHandler}>네, 19세 이상입니다.</button>

                <button className={NotAdultCSS.under19} onClick={onClickNoMainHandler}>아니오, 19세 미만입니다. </button>
            </div>
        </div>
        );
}
export default NotAdult;