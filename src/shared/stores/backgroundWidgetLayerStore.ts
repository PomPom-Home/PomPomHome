import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { BackGroundSlice, createBackGroundSlice } from './backgroundSlice';
import { WidgetLayerSlice, createWidgetLayoutSlice } from './widgetLayerSlice';
import { immer } from 'zustand/middleware/immer';

export type BoundSlice = BackGroundSlice & WidgetLayerSlice;

export const useBoundStore = create<BoundSlice>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...createBackGroundSlice(...a),
          ...createWidgetLayoutSlice(...a),
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
