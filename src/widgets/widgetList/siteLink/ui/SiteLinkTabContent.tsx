import styled from 'styled-components';
import SiteLinkItem from './SiteLinkItem';
import type { SiteLinkItemType } from '../model/SiteLinkModel';

type SiteLinkTabContentProps = {
  linkList: SiteLinkItemType[];
};

const SiteLinkTabContent: React.FC<SiteLinkTabContentProps> = ({
  linkList,
}) => {
  const linkLength = linkList.length;
  return (
    <Content>
      {linkList.map(item => (
        <SiteLinkItem key={item.linkSeq} linkInfo={item}></SiteLinkItem>
      ))}
      {linkLength < 10 && (
        <SiteLinkItem
          linkInfo={{
            linkSeq: 100,
            linkTitle: '추가하기',
            linkURL: '',
          }}
        />
      )}
    </Content>
  );
};

export default SiteLinkTabContent;

const Content = styled.div`
  //text-align: center;
  // background-color: beige;
  height: 100%;
  //flex: 1;
  margin: 5px;

  display: flex;
  // flex-wrap: wrap;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  overflow: auto;
  // 스크롤바 숨기기
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
