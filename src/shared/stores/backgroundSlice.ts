import { StateCreator } from 'zustand';
import { BoundSlice } from './backgroundWidgetLayerStore';

export type BackgroundType = 'image' | 'color';

export type BackGroundSlice = {
  type: BackgroundType;
  imageUrl: string;
  colorCode: string;
  backGroundActions: {
    changeType: (type: BackgroundType) => void;
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
  imageUrl: 'src/assets/background/backGroundSample.png',
  colorCode: 'ffffff',
  backGroundActions: {
    changeType: type =>
      set(state => {
        state.type = type;
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
