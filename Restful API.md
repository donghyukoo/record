REST란, REpresentational State Transfer 의 약자이다. 여기에 ~ful 이라는 형용사형 어미를 붙여 ~한 API 라는 표현으로 사용된다. 즉, REST 의 기본 원칙을 성실히 지킨 서비스 디자인은 'RESTful'하다라고 표현할 수 있다.

REST가 디자인 패턴이다, 아키텍처다 많은 이야기가 존재하는데, 하나의 아키텍처로 볼 수 있다. 좀 더 정확한 표현으로 말하자면, REST 는 Resource Oriented Architecture 이다. API 설계의 중심에 자원(Resource)이 있고 HTTP Method 를 통해 자원을 처리하도록 설계하는 것이다.

REST 6 가지 원칙
1. Uniform Interface
2. Stateless
3. Caching
4. Client-Server
5. Hierarchical system
6. Code on demand

RESTful 하게 API 를 디자인 한다는 것은 무엇을 의미하는가.
리소스 와 행위 를 명시적이고 직관적으로 분리한다.
리소스는 URI로 표현되는데 리소스가 가리키는 것은 명사로 표현되어야 한다.
행위는 HTTP Method로 표현하고, GET(조회), POST(생성), PUT(기존 entity 전체 수정), PATCH(기존 entity 일부 수정), DELETE(삭제)을 분명한 목적으로 사용한다.
Message 는 Header 와 Body 를 명확하게 분리해서 사용한다.
Entity 에 대한 내용은 body 에 담는다.
애플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보, 응답받고자 하는 MIME 타입 등은 header 에 담는다.
header 와 body 는 http header 와 http body 로 나눌 수도 있고, http body 에 들어가는 json 구조로 분리할 수도 있다.
API 버전을 관리한다.
환경은 항상 변하기 때문에 API 의 signature 가 변경될 수도 있음에 유의하자.
특정 API 를 변경할 때는 반드시 하위호환성을 보장해야 한다.
서버와 클라이언트가 같은 방식을 사용해서 요청하도록 한다.
브라우저는 form-data 형식의 submit 으로 보내고 서버에서는 json 형태로 보내는 식의 분리보다는 json 으로 보내든, 둘 다 form-data 형식으로 보내든 하나로 통일한다.
다른 말로 표현하자면 URI 가 플랫폼 중립적이어야 한다.

장점
1. Open API 를 제공하기 쉽다
2. 멀티플랫폼 지원 및 연동이 용이하다.
3. 원하는 타입으로 데이터를 주고 받을 수 있다.
4. 기존 웹 인프라(HTTP)를 그대로 사용할 수 있다.

단점
1. 사용할 수 있는 메소드가 한정적이다.
2. 분산환경에는 부적합하다.
3. HTTP 통신 모델에 대해서만 지원한다.