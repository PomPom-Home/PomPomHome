import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { SiteLinkType } from '@shared/model';

type SiteLinkStore = {
  data: SiteLinkType[];
  minTabSeq: number;
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
        minTabSeq: 0,
        setData: (newData: SiteLinkType[]) =>
          set(() => {
            const minSeq = newData.reduce((acc, curr) => {
              return acc.tabSeq < curr.tabSeq ? acc : curr;
            }).tabSeq;
            return { data: newData, minTabSeq: minSeq };
          }),
      }))
    ),
    {
      name: 'siteLinkStorage',
    }
  )
);

export default useSiteLinkStore;
