import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type MiniWebStore = {
  openUrl: string;
  setOpenUrl: (openUrl: string) => void;
};

export const useMiniWebStore = create<MiniWebStore>()(
  devtools(
    persist(
      immer(set => ({
        openUrl: '',
        setOpenUrl: (openUrl: string) => set(() => ({ openUrl })),
      })),
      {
        name: 'miniWebStorage',
      }
    )
  )
);
