import styled from 'styled-components';
import SiteLinkItem from './SiteLinkItem';
import type { SiteLinkItemType } from '@shared/model';

type SiteLinkTabContentProps = {
  linkList: SiteLinkItemType[];
};

const SiteLinkTabContent = ({ linkList }: SiteLinkTabContentProps) => {
  return (
    <Content>
      {linkList.map((item, i) => (
        <SiteLinkItem key={i} linkInfo={item}></SiteLinkItem>
      ))}
    </Content>
  );
};

export default SiteLinkTabContent;

const Content = styled.div`
  height: 100%;
  margin: 5px;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
