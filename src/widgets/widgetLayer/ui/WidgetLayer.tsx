import styled from 'styled-components';
import SiteLinkContainer from './../../widgetList/siteLink/ui/SiteLinkContainer';
import MemoContainer from '../../widgetList/memo/ui/MemoContainer';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  useWidgetLayer,
  useWidgetLayerAction,
} from '@shared/stores/backgroundWidgetLayerStore';
import { WIDGET_KEYS } from '@shared/stores/widgetLayerSlice';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROW_HEIGHT = 100;

const WidgetLayer = () => {
  const { visibleState, position } = useWidgetLayer();
  const { updateWidgetPosition } = useWidgetLayerAction();

  const handleBreakPointChange = (breakpoint: string) => {
    updateWidgetPosition({ ...position, breakpoints: breakpoint });
  };

  const handleLayoutChange = (
    _: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts
  ) => {
    updateWidgetPosition({ ...position, layouts: cloneDeep(layouts) });
  };

  const handleDragStop = (layout: ReactGridLayout.Layout[]) => {
    updateWidgetPosition({
      ...position,
      layouts: { ...position.layouts, [position.breakpoints]: layout },
    });
  };

  const getHeight = useCallback(
    (key: string) => {
      return (
        ROW_HEIGHT *
        position.layouts[position.breakpoints]?.filter(({ i }) => i === key)[0]
          .h
      );
    },
    [position.breakpoints, position.layouts]
  );

  return (
    <WidgetContainer>
      <ResponsiveGridLayout
        style={{ height: '100%' }}
        className="layout"
        layouts={{ ...position.layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={ROW_HEIGHT}
        draggableCancel=".notDraggable"
        compactType="horizontal"
        allowOverlap
        width={1200}
        onBreakpointChange={handleBreakPointChange}
        onDragStop={handleDragStop}
        onLayoutChange={handleLayoutChange}>
        {/* FIXME: 임시로 item A 및 B 추가. 향후 위젯 추가시 삭제 요망*/}
        <div key="a">Item A</div>
        <div key="b">Item B</div>
        <div key={WIDGET_KEYS.MEMO}>
          <MemoContainer />
        </div>
        {visibleState.SITE_LINK.isVisible && (
          <div key={WIDGET_KEYS.SITE_LINK}>
            <SiteLinkContainer height={getHeight(WIDGET_KEYS.SITE_LINK)} />
          </div>
        )}
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
