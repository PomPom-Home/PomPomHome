## 기획서

### **문제 정의**

- 별도의 웹 사이트 이동 없이 한 페이지에 정보나 링크를 제공받지 못해 아쉬워요.
- 북마크 기능이 있지만, 북마크에 등록한 사이트나 자주 찾는 사이트들이 좀 더 큼직하게 표시되면 좋을 것 같아요.
- 크롬 브라우저는 매일을 함께하는데 조금 더 일상에 즐거움을 주는 요소를 추가할 수 있으면 좋을 것 같아요.

### **요구사항 명세**

- 사용자가 `위젯 창`에서 홈에 위젯들을 배치 및 커스터마이징

  **배치 방식**

  - 기본 그리드 제공
  - 사용자 자유

  **위젯 종류**

  - 시계+날짜
  - 날씨
  - 운세
  - 뉴스
  - 사이트 링크 바로가기
    - 북마크
    - 자주 방문한 사이트
    - 사용자 추가 링크
  - 검색창
  - 오늘의 할일
    - 시간 설정 시 알림띄우기
      (알림 방식은 말풍선으로 할지 크롬 알림으로 할지 미정)
  - 메모장

- 사용자가 `설정창`에서 홈 창의 커스터마이징 가능

  - 배경 색상 설정
  - 사이트 링크 관리
  - 나라 및 지역 설정

- 브라우저 창 하단을 돌아다니는 귀여운 캐릭터
  - 마우스 클릭
  - 잡아끌기

### **역할 및 일정**

| 이름      | 역할                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| 박성혁    | 위젯창(위젯 배치) / 담당 위젯 : 시계+날짜                                      |
| 이호찬 👑 | 위젯창(위젯 배치) / 담당 위젯 : 날씨, 운세, 뉴스                               |
| 옥채현    | 설정창(배경 색 설정) / 담당 위젯 : 검색창, 오늘의 할일(알림 포함), 메모장      |
| 장세영    | 설정창(사이트 링크 관리, 나라 및 지역 설정) / 담당 위젯 : 사이트 링크 바로가기 |
| 공통 개발 | 브라우저 창 하단을 돌아다니는 마우스와 상호작용 하는 귀여운 캐릭터             |

| 일자      | 할 일                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------- |
| 4/8~4/14  | 프로젝트 주제 선정 및 기능 명세 확정, CI/CD 세팅, 크롬 익스텐션 개발방법 및 배포 스터디         |
| 4/15~4/21 | 디자인 리서치 및 확정, 개발 스택 확정(DB 사용 시 설계 포함), 와이어 프레임 제작, 기능 개발 시작 |
| 4/22~4/28 | 개발 및 상황 공유                                                                               |
| 4/29~5/5  | 개발 및 상황 공유                                                                               |
| 5/6~5/10  | 최종 점검 및 발표 자료 준비하기                                                                 |
