import styled from 'styled-components';
import SettingLayout from './SettingLayout';
import React, { useEffect, useRef, useState } from 'react';

import SettingIcon from '@assets/icon/settingIcon.svg?react'; // svg import 시 ?react 필수
import Modal from '@shared/ui/Modal';
import CloseButton from '@shared/ui/CloseButtonWithHover';

export type SettingCommponsntProps = {
  handleClose: () => void; // 환경설정 모달창 닫기 함수
};

type WidgetLayoutProps = {
  children: React.ReactNode; // 위젯 내용
  height: string;
  onClose: () => void; // 위젯 닫기 함수
  SettingComponent?: React.ComponentType<SettingCommponsntProps>;
};

const WidgetLayout = ({
  children,
  height,
  onClose,
  SettingComponent,
}: WidgetLayoutProps) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const toggleSetting = () => {
    setShowSetting(prev => !prev);
  };
  const hasSetting = !!SettingComponent; //SettingComponent 없으면 false, 있으면 true로 설정
  const [isHeaderTop, setIsHeaderTop] = useState<boolean>(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const top = wrapperRef.current.getBoundingClientRect().top;
      setIsHeaderTop(top >= 35);
    }
  }, [height]); // height가 변경될 때마다 다시 계산

  return (
    <Wrapper ref={wrapperRef} height={height}>
      <Content>{children}</Content>
      <Header top={isHeaderTop ? '-35px' : height} className="notDraggable">
        {hasSetting && <SettingButton onClick={toggleSetting} />}
        <CloseButton onClick={onClose} width="30px" height="30px" />
      </Header>
      {hasSetting && showSetting && (
        <Modal onClose={toggleSetting}>
          <SettingLayout handleClose={toggleSetting}>
            <SettingComponent handleClose={toggleSetting} />
          </SettingLayout>
        </Modal>
      )}
    </Wrapper>
  );
};

export default WidgetLayout;

// Content에서 Header 을 다음 형제 선택자로 선택하기 위해 column-reverse 사용
const Wrapper = styled.div<{ height: string }>`
  height: 100%;
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
