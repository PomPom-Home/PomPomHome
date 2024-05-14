import { StateCreator } from 'zustand';
import { BoundSlice } from './backgroundWidgetLayerStore';
import { WIDGET_KEYS } from '@shared/model';

type Layout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Position = {
  breakpoints: string;
  layouts: { [key: string]: Layout[] };
};

type WidgetLayoutState = {
  isVisible: boolean;
};

export type WidgetLayerSlice = {
  widgetVisibleState: Record<keyof typeof WIDGET_KEYS, WidgetLayoutState>;
  position: Position;
  widgetLayerActions: {
    updateWidgetVisible: (
      widget: keyof typeof WIDGET_KEYS,
      isVisible: boolean
    ) => void;
    updateWidgetPosition: (position: Position) => void;
  };
};

export const createWidgetLayoutSlice: StateCreator<
  BoundSlice,
  [['zustand/immer', never], never],
  [],
  WidgetLayerSlice
> = set => ({
  widgetVisibleState: {
    SITE_LINK: { isVisible: true },
    MEMO: { isVisible: true },
    TODO: { isVisible: true },
  },
  position: { breakpoints: '', layouts: {} },
  widgetLayerActions: {
    updateWidgetPosition: position =>
      set(state => {
        state.position = position;
      }),
    updateWidgetVisible: (key, isVisible) =>
      set(state => {
        state.widgetVisibleState[key].isVisible = isVisible;
      }),
  },
});
