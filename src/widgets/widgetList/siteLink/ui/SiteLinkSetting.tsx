import useSiteLinkStore from '@shared/stores/siteLinkStore';
import { cloneDeep } from 'lodash';
import type { SiteLinkType, SiteLinkItemType } from '@shared/model';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import type { SettingCommponsntProps } from '../../layout/WidgetLayout';

const SiteLinkSetting = ({ handleClose }: SettingCommponsntProps) => {
  const setData = useSiteLinkStore(state => state.setData);
  const minTabSeq = useSiteLinkStore(state => state.minTabSeq);
  const [currentTabSeq, setCurrentTabSeq] = useState<number>(minTabSeq);

  const handleSelectTab = (tabSeq: number) => {
    setCurrentTabSeq(tabSeq);
  };

  const [copyData, setCopyData] = useState<SiteLinkType[]>(
    cloneDeep(useSiteLinkStore(state => state.data))
  );

  const handleApply = () => {
    setData(copyData);
    handleClose();
  };
  // tab, link seq로 인덱스 찾기
  const getIdxBySeq = (tabSeq: number, linkSeq: number) => {
    const tabIdx = copyData.findIndex((x: SiteLinkType) => x.tabSeq === tabSeq);
    const linkIdx = copyData[tabIdx]?.linkList.findIndex(
      (x: SiteLinkItemType) => x.linkSeq === linkSeq
    );
    return { tabIdx, linkIdx };
  };
  const addTab = () => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      // 새 탭 아이템 생성
      const newTab = {
        tabSeq: Math.max(...newData.map(item => item.tabSeq)) + 1, // 가장 큰 tabSeq에 1을 더함
        tabTitle: 'New Tab',
        linkList: [
          { linkSeq: 0, linkTitle: 'New Link', linkURL: 'http://example.com' },
        ],
      };
      newData.push(newTab);
      return newData;
    });
  };
  const updateTab = (tabSeq: number, newValue: string) => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      const tabIdx = newData.findIndex(
        (x: SiteLinkType) => x.tabSeq === tabSeq
      );
      newData[tabIdx].tabTitle = newValue;
      return newData; // 변경된 새 데이터를 반환
    });
  };
  const deleteTab = (tabSeq: number) => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      const tabIdx = newData.findIndex(
        (x: SiteLinkType) => x.tabSeq === tabSeq
      );
      newData.splice(tabIdx, 1);
      return newData; // 변경된 새 데이터를 반환
    });
  };
  const updateLink = (
    type: 'linkTitle' | 'linkURL',
    tabSeq: number,
    linkSeq: number,
    newValue: string
  ) => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      const { tabIdx, linkIdx } = getIdxBySeq(tabSeq, linkSeq);
      newData[tabIdx].linkList[linkIdx][type] = newValue;
      return newData; // 변경된 새 데이터를 반환
    });
  };
  const addLink = (tabSeq: number) => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      const tabIdx = newData.findIndex(tab => tab.tabSeq === tabSeq);

      // 새 링크 아이템 생성
      const newLink = {
        linkSeq:
          Math.max(...newData[tabIdx].linkList.map(item => item.linkSeq)) + 1, // 가장 큰 linkSeq에 1을 더함
        linkTitle: 'New Link',
        linkURL: 'http://example.com',
      };
      newData[tabIdx].linkList.push(newLink);
      return newData;
    });
  };
  const deleteLink = (tabSeq: number, linkSeq: number) => {
    setCopyData(prev => {
      const newData = cloneDeep(prev);
      const { tabIdx, linkIdx } = getIdxBySeq(tabSeq, linkSeq);
      newData[tabIdx].linkList?.splice(linkIdx, 1);
      return newData; // 변경된 새 데이터를 반환
    });
  };

  return (
    <Container>
      <TabArea>
        {copyData.map((item, i, arr) => {
          return (
            <TabItemWrapper key={i}>
              <TabItem
                onClick={() => handleSelectTab(item.tabSeq)}
                value={item.tabTitle}
                onChange={e => {
                  updateTab(item.tabSeq, e.target.value);
                }}
                className={item.tabSeq === currentTabSeq ? 'selected' : ''}
              />
              {arr.length > 1 && (
                <DeleteButton
                  onClick={() => {
                    deleteTab(item.tabSeq);
                  }}
                />
              )}
            </TabItemWrapper>
          );
        })}
        <AddButton onClick={addTab}>+</AddButton>
      </TabArea>
      <LinkArea>
        {copyData
          .filter(i => i.tabSeq === currentTabSeq)[0]
          ?.linkList?.map((item, _, arr) => (
            <LinkItem key={item.linkSeq}>
              <TitleInput
                type="text"
                value={item.linkTitle}
                onChange={e => {
                  updateLink(
                    'linkTitle',
                    currentTabSeq,
                    item.linkSeq,
                    e.target.value
                  );
                }}
              />
              <LinkInput
                type="text"
                value={item.linkURL}
                onChange={e => {
                  updateLink(
                    'linkURL',
                    currentTabSeq,
                    item.linkSeq,
                    e.target.value
                  );
                }}
              />
              {arr.length > 1 && (
                <DeleteButton
                  onClick={() => {
                    deleteLink(currentTabSeq, item.linkSeq);
                  }}
                />
              )}
            </LinkItem>
          ))}
        {copyData.filter(i => i.tabSeq === currentTabSeq)[0] && (
          <AddButton
            onClick={() => {
              addLink(currentTabSeq);
            }}>
            +
          </AddButton>
        )}
      </LinkArea>
      <SaveButton onClick={handleApply}>Apply</SaveButton>
    </Container>
  );
};

export default SiteLinkSetting;
const Container = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  position: relative;

  font-size: 13px;
`;

const TabArea = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;

  padding: 5px;
  padding-top: 10px;

  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const TabItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TabItem = styled.input.attrs({ type: 'text' })`
  height: 30px;
  width: 100%;
  border-radius: 10px;
  backdrop-filter: blur(15px);
  transition: background-color 0.2s ease-in-out;
  border: none;
  outline: none;
  background-color: transparent;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 10px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);

  font-size: 16px;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
  &.selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const LinkArea = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  gap: 5px;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 10px;
  width: 100%;
  height: 35px;
`;

const inputStype = css`
  padding: 8px 16px;

  border: none;
  background-color: transparent;
  color: #333;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:focus {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const TitleInput = styled.input`
  ${inputStype}
  width: 30%;
  height: 100%;
`;

const LinkInput = styled.input`
  ${inputStype}
  width: 70%;
  height: 100%;
`;

const SaveButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 15px;
  padding: 10px 20px;
  color: white;
  background-color: rgba(144, 126, 135, 0.336);
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    background-color: rgba(144, 126, 135, 0.8);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  }
  &:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    background-color: rgba(144, 126, 135, 0.8);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b5b5b5ff;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #929191ff;
  }
`;

const DeleteButton = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 3px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(51, 51, 51, 0.5);
    &::after,
    &::before {
      background-color: #ffffff;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 9px;
    background-color: #989898;
    transform-origin: center;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;
