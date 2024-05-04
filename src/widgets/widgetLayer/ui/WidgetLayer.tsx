import styled from 'styled-components';
import SiteLinkContainer from './../../widgetList/siteLink/ui/SiteLinkContainer';
import { useCallback, useState } from 'react';

import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const WIDGET_KEYS = {
  siteLink: 'siteLink',
};

const ROW_HEIGHT = 100;

const WidgetLayer = () => {
  // 각 위젯 별 show 여부 상태로 관리 필요, 우선 SiteLink로 예시
  const [layoutState, setLayoutState] = useState<{
    breakpoints: string;
    layouts: { [key: string]: LayoutItem[] };
  }>({
    breakpoints: 'lg',
    layouts: {},
  });

  const visibleStatus = { SiteLink: true };

  const onBreakPointChange = (breakpoint: string) => {
    setLayoutState(state => ({
      ...state,
      breakpoints: breakpoint,
    }));
  };

  const handleLayoutChange = (
    _: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    setLayoutState(state => ({
      ...state,
      layouts: layouts,
    }));
  };

  const getHeight = useCallback(
    (key: string) => {
      return (
        ROW_HEIGHT *
        layoutState.layouts[layoutState.breakpoints]?.filter(
          ({ i }) => i === key
        )[0].h
      );
    },
    [layoutState.breakpoints, layoutState.layouts]
  );

  return (
    <WidgetContainer>
      <ResponsiveGridLayout
        style={{ height: '100%' }}
        className="layout"
        layouts={layoutState.layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={ROW_HEIGHT}
        draggableCancel=".notDraggable"
        compactType="horizontal"
        allowOverlap
        onBreakpointChange={onBreakPointChange}
        onLayoutChange={handleLayoutChange}>
        {/* FIXME: 임시로 item A 및 B 추가. 향후 위젯 추가시 삭제 요망*/}
        <div key="a">Item A</div>
        <div key="b">Item B</div>
        <div key={WIDGET_KEYS.siteLink}>
          {visibleStatus.SiteLink && (
            <SiteLinkContainer height={getHeight(WIDGET_KEYS.siteLink)} />
          )}
        </div>
      </ResponsiveGridLayout>
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
