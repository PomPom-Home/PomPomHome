import styled from 'styled-components';
import SiteLinkContainer from './../../widgetList/siteLink/ui/SiteLinkContainer';

const WidgetLayer = () => {
  // 각 위젯 별 show 여부 상태로 관리 필요, 우선 SiteLink로 예시
  const visibleStatus = { SiteLink: true };
  return (
    <WidgetContainer>
      {visibleStatus.SiteLink && <SiteLinkContainer />}
    </WidgetContainer>
  );
};

export default WidgetLayer;

// 전체 화면 차지, 배경 색&이미지 설정 버튼이 어떻게 들어가냐에 따라 달라질 것 같음
const WidgetContainer = styled.div`
  //background-color: pink;
  width: 100vw;
  height: 100vh;

  // margin-top: 35px; // WidgetLayout header 테스트용
`;
