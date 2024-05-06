import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { BackGroundSlice, createBackGroundSlice } from './backgroundSlice';
import { WidgetLayerSlice, createWidgetLayoutSlice } from './widgetLayerSlice';
import { immer } from 'zustand/middleware/immer';

export type BoundSlice = BackGroundSlice & WidgetLayerSlice;

const useBoundStore = create<BoundSlice>()(
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
            imageUrl: state.imageUrl,
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
  useBoundStore(state => ({ image: state.imageUrl, color: state.colorCode }));

export const useBackgroundActions = () =>
  useBoundStore(state => state.backGroundActions);

export const useWidgetLayer = () =>
  useBoundStore(state => ({
    visibleState: { ...state.widgetVisibleState },
    position: state.position,
  }));

export const useWidgetLayerAction = () =>
  useBoundStore(state => state.widgetLayerActions);
