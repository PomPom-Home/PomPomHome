import styled from 'styled-components';
import WidgetLayout from '../../layout/WidgetLayout';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';
import { SiNaver } from 'react-icons/si';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';

const SearchBoxContainer = ({ height }: { height: number }) => {
  const { updateWidgetVisible } = useWidgetLayerAction();
  // 위젯 숨김 처리 함수
  const handleClose = () => {
    updateWidgetVisible('SEARCH_BOX', false);
  };
  const [keyword, setKeyword] = useState<string>('');
  const [platform, setPlatform] = useState<string>('GOOGLE');
  const [showList, setShowList] = useState<boolean>(false);
  const toggleShowList = () => {
    setShowList(prev => !prev);
  };

  const handleSearch = () => {
    let href: string;
    switch (platform) {
      case 'NAVER':
        href =
          'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=';
        break;
      case 'GOOGLE':
        href = 'https://www.google.com/search?q=';
        break;
      default:
        href = 'https://www.google.com/search?q=';
    }
    href += encodeURIComponent(keyword);
    window.location.href = href;
  };
  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <SearchBoxWrapper>
        <SelectPlatform className="notDraggable" onClick={toggleShowList}>
          {platform === 'GOOGLE' ? (
            <FaGoogle style={{ width: '100%', height: '100%' }} />
          ) : (
            <SiNaver style={{ width: '100%', height: '100%' }} />
          )}

          <LabelWrapper visible={showList.toString()}>
            <PlatformLabel htmlFor="NAVER" className="notDraggable">
              <SiNaver style={{ width: '100%', height: '100%' }} />
            </PlatformLabel>
            <PlatformLabel htmlFor="GOOGLE" className="notDraggable">
              <FaGoogle style={{ width: '110%', height: '110%' }} />
            </PlatformLabel>
          </LabelWrapper>
        </SelectPlatform>
        <SearchInput
          className="notDraggable"
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <HiddenPlatformRadio
          name="platform"
          id="NAVER"
          value="NAVER"
          checked={platform === 'NAVER'}
          onChange={() => {
            setPlatform('NAVER');
          }}
        />

        <HiddenPlatformRadio
          name="platform"
          id="GOOGLE"
          value="GOOGLE"
          checked={platform === 'GOOGLE'}
          onChange={() => {
            setPlatform('GOOGLE');
          }}
        />
      </SearchBoxWrapper>
    </WidgetLayout>
  );
};

export default SearchBoxContainer;

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const LabelWrapper = styled.div<{ visible: string }>`
  opacity: ${props => (props.visible === 'true' ? '1' : '0')};
  width: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 10px -3px #00000044;
`;

const PlatformLabel = styled.label`
  cursor: pointer;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  color: #bbbbbbc5;
`;
const HiddenPlatformRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
`;
const SearchInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  height: 50px;
  padding: 0 20px 0 20px;
  border: none;
  outline: none;
  background-color: transparent;
  backdrop-filter: blur(15px);
  font-size: 25px;
  border-radius: 39px;
  box-shadow: 1px 2px 10px -3px #00000044;
`;

const SelectPlatform = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 6px;
  position: relative;
  background-color: #00000010;

  &:hover {
    box-shadow: 1px 2px 10px -3px #00000044;
  }
`;
