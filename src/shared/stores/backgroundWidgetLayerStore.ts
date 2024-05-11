import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { BackGroundSlice, createBackGroundSlice } from './backgroundSlice';
import { WidgetLayerSlice, createWidgetLayoutSlice } from './widgetLayerSlice';
import { MemoState, createMemoSlice } from './memoSlice';
import { immer } from 'zustand/middleware/immer';

export type BoundSlice = BackGroundSlice & WidgetLayerSlice & MemoState;

export const useBoundStore = create<BoundSlice>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...createBackGroundSlice(...a),
          ...createWidgetLayoutSlice(...a),
          ...createMemoSlice(...a),
        }),
        {
          name: 'backgroundWidgetLayerStorage',
          partialize: state => ({
            type: state.type,
            imageUrl:
              state.imageUrl || '/src/assets/background/backGroundSample.png',
            colorCode: state.colorCode,
            position: state.position,
            widgetVisibleState: state.widgetVisibleState,
            memo: state.memo,
          }),
        }
      )
    )
  )
);

export const useBackground = () =>
  useBoundStore(state => ({
    imageUrl: state.imageUrl,
    color: state.colorCode,
    backgroundType: state.type,
  }));

export const useBackgroundActions = () =>
  useBoundStore(state => state.backGroundActions);

export const useWidgetLayer = () =>
  useBoundStore(state => ({
    visibleState: { ...state.widgetVisibleState },
    position: state.position,
  }));

export const useWidgetLayerAction = () =>
  useBoundStore(state => state.widgetLayerActions);

export const useMemoContent = () => useBoundStore(state => state.memo);

export const useMemoActions = () =>
  useBoundStore(state => ({
    setMemo: state.setMemo,
    clearMemo: state.clearMemo,
  }));
