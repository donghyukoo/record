import AboutCompanyCSS from './AboutCompanyCSS.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberAPI,
    callMemberUpdateAPI
} from '../../apis/MemberAPICalls'

const { kakao } = window;

function AboutCompany() {

        const navigate = useNavigate();
        const dispatch = useDispatch();
        const token = decodeJwt(window.localStorage.getItem("accessToken"));   
        const member = useSelector(state => state.memberReducer);
        const memberDetail = member.data;

        const [form, setForm] = useState({});

        useEffect(
            () => {    
                if(token !== null) {
                    dispatch(callGetMemberAPI({
                        memberId: token.sub
                    }));            
                }
            }
            ,[]
        );

        useEffect(() => {    

            const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
            const options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(37.571909, 126.987314), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
                        };
            const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            
            const markerPosition = new kakao.maps.LatLng(
                            37.571909,
                            126.987314
                          );
                          // 마커를 생성
            const marker = new kakao.maps.Marker({
            position: markerPosition,
            });
        
            // 마커를 지도 위에 표시
            marker.setMap(map);

            // const iwContent = '<div style="padding-left: 15px; margin:5px; font-size: larger;"><div>육믈리에</div></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            // iwPosition = new kakao.maps.LatLng(37.571909, 126.987314); //인포윈도우 표시 위치입니다

            // 인포윈도우를 생성합니다
            // const infowindow = new kakao.maps.InfoWindow({
            //     position : iwPosition, 
            //     content : iwContent 
            // });
  
            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            // infowindow.open(map, marker); 
        }, [])

        
        /* 5번 클릭시 */
        let clickCount = 0;
        
        const onClick = () => { 
            document.getElementById("img").src = "../../images/handsome2.png";
        }

    return(
        <div>
        <h1 className={AboutCompanyCSS.name}>회사 소개</h1>
<br></br>
    <div className={AboutCompanyCSS.content}>
        <div>
            <img id="img" src="../../images/logo.png" style={{width:'80%', height:'100%'}}
                onClick={(e) => {
                            clickCount = clickCount + 1
                            setTimeout(() => {
                                clickCount = 0
                            }, 3000)
                            if (clickCount === 5){
                                onClick();
                            }
                        }}></img>
        </div>
            <table className={AboutCompanyCSS.table}>
                <tbody>
                    <tr>
                        <th className={AboutCompanyCSS.th} scope="row">회사명</th>
                        <td className={AboutCompanyCSS.td}>육믈리에 / Sixmelie</td>
                    </tr>
                    <tr>
                        <th className={AboutCompanyCSS.th} scope="row">대표</th>
                        <td className={AboutCompanyCSS.td}>김동혁, 송윤서, 육지후, 임환웅, 조윤경</td>
                    </tr>
                    <tr>
                        <th className={AboutCompanyCSS.th} scope="row">설립일</th>
                        <td className={AboutCompanyCSS.td}>2023.01.06</td>
                    </tr>
                    <tr>
                        <th className={AboutCompanyCSS.th} scope="row">소개</th>
                        <td className={AboutCompanyCSS.td}> 
                        '육믈리에'는 서울 종로구 인사동길에 위치해 있으며, 5인의 대표로 운영 되고 있습니다.<br></br>
                        고객의 취향을 설문조사 확인하고 사용자에게 맞는 와인을 추천하고 있습니다.<br></br>
                        입문자들이 와인에 대해 쉽게 접근 할 수 있도록 다양한 정보와 서비스를 제공합니다.<br></br>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
                <h4 style={{textAlign: 'center'}}>
                    <br></br>
                    찾아오는 길 : 서울 종로구 인사동길 12, 대일빌딩 15F / 종로3가역 5번출구에서 211m</h4>
                    <div id="map" style={{
                        width: '800px',
                        height: '400px',
                        margin: '0 auto',
                    }}></div>
        <br></br><br></br>
</div>
)
                }

export default AboutCompany;