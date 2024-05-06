import { StateCreator } from 'zustand';
import { BoundSlice } from './backgroundWidgetLayerStore';

export type BackGroundSlice = {
  type: 'image' | 'color';
  imageUrl: string;
  colorCode: string;
  backGroundActions: {
    changeType: () => void;
    changeColor: (code: string) => void;
    changeImage: (url: string) => void;
  };
};

export const createBackGroundSlice: StateCreator<
  BoundSlice,
  [['zustand/immer', never], never],
  [],
  BackGroundSlice
> = set => ({
  type: 'color',
  imageUrl: '',
  colorCode: 'ffffff',
  backGroundActions: {
    changeType: () =>
      set(state => {
        state.type === 'color' ? 'image' : 'color';
      }),
    changeColor: code =>
      set(state => {
        state.colorCode = code;
      }),
    changeImage: url =>
      set(state => {
        state.imageUrl = url;
      }),
  },
});
