import styled from 'styled-components';
import { useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  useWidgetLayer,
  useWidgetLayerAction,
} from '@shared/stores/backgroundWidgetLayerStore';
import MemoContainer from '@widgetList/memo/ui/MemoContainer';
import SiteLinkContainer from '@widgetList/siteLink/ui/SiteLinkContainer';
import TodoContainer from '@widgetList/todo/ui/TodoContainer';
import SearchBoxContainer from '@widgetList/searchBox/ui/SearchBoxContainer';
import { WIDGET_KEYS } from '@shared/model';

const ResponsiveGridLayout = WidthProvider(Responsive);
const ROW_HEIGHT = 100;

const WidgetLayer = () => {
  const { visibleState, position } = useWidgetLayer();
  const { updateWidgetPosition } = useWidgetLayerAction();

  const handleBreakPointChange = (breakpoint: string) => {
    updateWidgetPosition({ ...position, breakpoints: breakpoint });
  };

  const handleResizeEnd = (layout: ReactGridLayout.Layout[]) => {
    updateWidgetPosition({
      ...position,
      layouts: { ...position.layouts, [position.breakpoints]: layout },
    });
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
          ?.h
      );
    },
    [position.breakpoints, position.layouts]
  );

  return (
    <WidgetContainer>
      <ResponsiveGridLayout
        style={{ height: '100%' }}
        className="layout"
        onResizeStop={handleResizeEnd}
        layouts={{ ...position.layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={ROW_HEIGHT}
        draggableCancel=".notDraggable"
        compactType="horizontal"
        allowOverlap
        width={1200}
        onBreakpointChange={handleBreakPointChange}
        onDragStop={handleDragStop}>
        {visibleState.MEMO.isVisible && (
          <div key={WIDGET_KEYS.MEMO}>
            <MemoContainer height={getHeight(WIDGET_KEYS.MEMO)} />
          </div>
        )}
        {visibleState.SITE_LINK.isVisible && (
          <div key={WIDGET_KEYS.SITE_LINK}>
            <SiteLinkContainer height={getHeight(WIDGET_KEYS.SITE_LINK)} />
          </div>
        )}
        {visibleState.TODO.isVisible && (
          <div key={WIDGET_KEYS.TODO}>
            <TodoContainer height={getHeight(WIDGET_KEYS.TODO)} />
          </div>
        )}
        {visibleState.SEARCH_BOX.isVisible && (
          <div key={WIDGET_KEYS.SEARCH_BOX}>
            <SearchBoxContainer height={getHeight(WIDGET_KEYS.SEARCH_BOX)} />
          </div>
        )}
      </ResponsiveGridLayout>
    </WidgetContainer>
  );
};

export default WidgetLayer;

// 전체 화면 차지, 배경 색&이미지 설정 버튼이 어떻게 들어가냐에 따라 달라질 것 같음
const WidgetContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
