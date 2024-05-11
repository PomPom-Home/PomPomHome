import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type SiteLinkItemType = {
  linkSeq: number;
  linkTitle: string;
  linkURL: string;
};

export type SiteLinkType = {
  tabSeq: number;
  tabTitle: string;
  linkList: SiteLinkItemType[];
};

type SiteLinkStore = {
  data: SiteLinkType[];
  setData: (newData: SiteLinkType[]) => void;
};

// 환경설정에서 받은 데이터 전체를 교체
const useSiteLinkStore = create<SiteLinkStore>()(
  persist(
    devtools(
      immer(set => ({
        data: [
          {
            tabSeq: 0,
            tabTitle: 'New Tab',
            linkList: [
              {
                linkSeq: 0,
                linkTitle: 'New Link',
                linkURL: 'http://example.com',
              },
            ],
          },
        ],
        setData: (newData: SiteLinkType[]) => set(() => ({ data: newData })),
      }))
    ),
    {
      name: 'siteLinkStorage',
    }
  )
);

export default useSiteLinkStore;
