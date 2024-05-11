import { StateCreator } from 'zustand';

export type MemoState = {
  memo: string;
  setMemo: (content: string) => void;
  clearMemo: () => void;
};

export const createMemoSlice: StateCreator<MemoState> = set => ({
  memo: '',
  setMemo: content => set({ memo: content }),
  clearMemo: () => set({ memo: '' }),
});
