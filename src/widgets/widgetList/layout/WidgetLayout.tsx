import styled from 'styled-components';
import ModalPortal from '@shared/ui/ModalPortal';
import SettingLayout from './SettingLayout';
import React, { useEffect, useRef, useState } from 'react';

import SettingIcon from '@assets/icon/settingIcon.svg?react'; // svg import 시 ?react 필수
import CloseIcon from '@assets/icon/closeIcon.svg?react'; // svg import 시 ?react 필수

type WidgetWrapType = {
  height: string;
};
type WidgetLayoutProps = WidgetWrapType & {
  children: React.ReactNode[]; // 자식 노드를 2개 가지며, 첫번째 노드는 위젯이 들어가며, 두번째 노드는 환경설정 내용이 됩니다.
  height: string;
};

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ children, height }) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const toggleSetting = () => {
    setShowSetting(prev => !prev);
  };

  const [isHeaderTop, setIsHeaderTop] = useState<boolean>(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      setIsHeaderTop(wrapperRef.current.offsetTop >= 35);
    }
  }, [height]); // height가 변경될 때마다 다시 계산

  return (
    <Wrapper ref={wrapperRef} height={height}>
      <Content>{children[0]}</Content>
      <Header top={isHeaderTop ? '-35px' : height} className="notDraggable">
        <SettingButton onClick={toggleSetting} />
        <CloseButton />
      </Header>
      {showSetting && (
        <ModalPortal>
          <SettingLayout handleClose={toggleSetting}>
            {children[1]}
          </SettingLayout>
        </ModalPortal>
      )}
    </Wrapper>
  );
};

export default WidgetLayout;

// Content에서 Header 을 다음 형제 선택자로 선택하기 위해 column-reverse 사용
const Wrapper = styled.div<WidgetWrapType>`
  height: ${props => props.height};
  //   background-color: lightGray;
  display: flex;
  flex-direction: column-reverse;
  border-radius: 5px;
  //overflow: hidden;
  position: relative;
  box-shadow: ${props => props.theme.shadows.widget};
  backdrop-filter: blur(15px);
  position: relative;
`;

const Header = styled.div<{ top: string }>`
  width: 100%;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;

  position: absolute;
  top: ${props => props.top};
  left: 0;
  z-index: 10;

  transform: translateY(-20%); // 초기 위치 설정
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
  padding: 10px;
  &:hover {
    transform: translateY(0); // 호버 시 위치 이동
    opacity: 1; // 호버 시 투명도 변경
  }
`;

// Content에 hover 시 Header (다음 형제 선택자 사용)의 투명도 조절
const Content = styled.div`
  border-radius: 5px;
  width: 100%;
  flex: 1;
  background-color: transparent;

  &:hover + ${Header} {
    transform: translateY(0); // 호버 시 위치 이동
    opacity: 1; // 호버 시 투명도 변경
  }
`;

const SettingButton = styled(SettingIcon)`
  width: 20px;
  height: 20px;
  color: #888; // svg 파일에 fill 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  stroke: currentColor; // 현재 컬러를 stroke 색상으로 사용
  stroke-width: 3; // svg 파일에 stroke 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  transition:
    color 0.2s,
    transform 0.2s,
    stroke-width 0.2s; // 트랜지션 추가
  cursor: pointer;
  &:hover {
    color: #555; // 마우스 호버 시 색상 변경
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 10;
  }
`;

const CloseButton = styled(CloseIcon)`
  width: 30px;
  height: 30px;
  color: #888; // svg 파일에 fill 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  stroke: currentColor; // 현재 컬러를 stroke 색상으로 사용
  stroke-width: 3; // svg 파일에 stroke 이 속성으로 정의되어 있는 경우 사용 가능. (fill="currentColor")
  transition:
    color 0.2s,
    transform 0.2s,
    stroke-width 0.2s; // 트랜지션 추가
  cursor: pointer;
  &:hover {
    color: #555; // 마우스 호버 시 색상 변경
    transform: scale(1.1); // 10% 크기 증가
    stroke-width: 5;
  }
`;
