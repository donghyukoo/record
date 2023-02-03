import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import WineSales from "../../components/wines/WineSales";
import MainCSS from './Main.module.css';
import queryString from 'query-string';


import {
    callWineSalesListAPI
} from '../../apis/WineAPICalls';

import {
    callWineSurveyAPI
} from '../../apis/SurveyAPICalls'


function Main() {

    const { submit } = useLocation();               
    const { value } = queryString.parse(submit);    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wineSales = useSelector(state => state.wineReducer); 
    const surveyData = useSelector(state => state.surveyReducer);
    const s = useSelector(state => state);                              
        console.log('surveyData>>>>', surveyData)
        console.log('s>>>>', s)

    const salesList = wineSales.data;
    const wineCode = wineSales.wineCode;

    const pageInfo = wineSales.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];


    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callWineSalesListAPI({
                currentPage: currentPage
            }));
        }
        ,[currentPage]
    );

    const  [state, setState] = useState({
        nationCode: '',                        
        winePrice: '',
        alcoholLevel: ''
    });
    
    const onChangeNationCodeHandler = () => {               
        console.log('onChangeNationCodeHandler :: nationCode value>'+document.querySelector('input[name="nationCode"]:checked').value);
        setState({
            ...state,
            nationCode: document.querySelector('input[name="nationCode"]:checked').value
        });
    }
    const onChangeWinePriceHandler = () => {
        console.log('onChangeWinePriceHandler :: winePrice value>'+document.querySelector('input[name="winePrice"]:checked').value);
        setState({
            ...state,
            winePrice: document.querySelector('input[name="winePrice"]:checked').value
        });
    }
    const onChangeAlcoholLevelHandler = () => {
        console.log('onChangeAlcoholLevelHandler :: alcoholLevel value>'+document.querySelector('input[name="alcoholLevel"]:checked').value);
        setState({
            ...state,
            alcoholLevel: document.querySelector('input[name="alcoholLevel"]:checked').value
        });
    }

    let nationCode = document.querySelectorAll('input[name="nationCode"]');
    [].forEach.call(nationCode,function(col){                                           
               col.addEventListener("click",onChangeNationCodeHandler,false);                  
    });

    let winePrice = document.querySelectorAll('input[name="winePrice"]');
    [].forEach.call(winePrice,function(col){ 
        col.addEventListener("click",onChangeWinePriceHandler,false); 
    });

    let alcoholLevel = document.querySelectorAll('input[name="alcoholLevel"]');
    [].forEach.call(alcoholLevel,function(col){ 
        col.addEventListener("click",onChangeAlcoholLevelHandler,false); 
    });

    const onClickWineHandler = () => {
        var data = dispatch(callWineSurveyAPI({   
            ...state
        }));
        
        data.then((apiData) => {
            navigate(`/wines/${apiData[0].wineCode}`, { replace: true });
        });
    }

   

    return (
        <>
            <h1>판매량 높은 와인</h1>
            <div className={ MainCSS.arrayList}>
            {
            Array.isArray(salesList) && salesList.map((sale) => (<WineSales key={ sale.wineCode } sale={ sale } />))
            }
            </div>
        <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(salesList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={ MainCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'red' } : null}
                        className={ MainCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(salesList) &&
                <button 
                    className={ MainCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>

            <div className={MainCSS.survey}>
            <h1>와인을 추천해드립니다</h1>
                <div>
                    <div className={MainCSS.survey1}>
                        <h2>선호하는 원산지를 선택 해 주세요</h2>
                        
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;미국 <img className={MainCSS.flag} src="../../images/USA.png"></img> <input type="radio" name="nationCode" value="5"/></label><br></br>
                        <label className={MainCSS.labelFont}>아르헨티나 <img className={MainCSS.flag} src="../../images/Argentina.png"></img> <input type="radio" name="nationCode" value="7"/></label><br></br>
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;이탈리아 <img className={MainCSS.flag} src="../../images/Italy.png"></img> <input type="radio" name="nationCode" value="8"/></label><br></br>
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;칠레 <img className={MainCSS.flag} src="../../images/Chile.png"></img> <input type="radio" name="nationCode" value="9"/></label><br></br>
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;프랑스 <img className={MainCSS.flag} src="../../images/France.png"></img> <input type="radio" name="nationCode" value="10"/></label><br></br>
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호주 <img className={MainCSS.flag} src="../../images/Australia.png"></img> <input type="radio" name="nationCode" value="11"/></label><br></br>
                        <br></br>
                    </div>

                    <div className={MainCSS.survey1}>
                        <h2>선호 하는 가격대를 선택 해 주세요.</h2>

                        <label className={MainCSS.labelFont}>저렴한 와인(1만원대) <input type="radio" name="winePrice" value="12500"/></label><br></br>
                        <label className={MainCSS.labelFont}>가성비 와인(2만원대) <input type="radio" name="winePrice" value="23750"/></label><br></br>
                        <label className={MainCSS.labelFont}>&nbsp;&nbsp;&nbsp;기본 와인(3만원대) <input type="radio" name="winePrice" value="31250"/></label><br></br>
                        <br></br>
                    </div>

                    <div className={MainCSS.survey1}>
                        <h2>선호 하는 알콜 도수를 선택 해 주세요.</h2>
                        
                        <label className={MainCSS.labelFont}>12% <input type="radio" name="alcoholLevel" value="12"/></label><br></br>
                        <label className={MainCSS.labelFont}>13% <input type="radio" name="alcoholLevel" value="13"/></label><br></br>
                        <label className={MainCSS.labelFont}>14% <input type="radio" name="alcoholLevel" value="14"/></label><br></br>
                        <br></br>
                    </div>
                    <br></br>
                        <button onClick={ () => onClickWineHandler() }
                                type="submit" className={MainCSS.button2}  
                        >
                            제출하기
                        </button>
                        <br></br>
                        <br></br>
                    </div>
                </div>
        </>
    );
}

export default Main;