import styled from 'styled-components';
import icon from '@assets/icon/favicon_sample.png';
import type { SiteLinkItemType } from '../model/SiteLinkModel';

type SiteLinkItemProps = {
  linkInfo: SiteLinkItemType;
};

const SiteLinkItem: React.FC<SiteLinkItemProps> = ({ linkInfo }) => {
  return (
    <LinkWrapper>
      <a href={linkInfo.linkURL}></a>
      <LinkFavicon>
        <img src={icon} />
      </LinkFavicon>
      <LinkTitle>{linkInfo.linkTitle}</LinkTitle>
    </LinkWrapper>
  );
};

export default SiteLinkItem;

const LinkWrapper = styled.div`
  // background-color: red;

  margin: 2px;
  width: 100px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  & a {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const LinkFavicon = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 30px;
    height: 30px;
  }
`;

const LinkTitle = styled.div`
  // background-color: black;
  margin-top: 8px;
  width: 80px;
  text-align: center;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
`;
