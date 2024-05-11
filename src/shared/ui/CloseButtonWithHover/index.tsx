import CloseIcon from '@assets/icon/closeIcon.svg?react'; // svg import 시 ?react 필수
import styled from 'styled-components';

const CloseButton = styled(CloseIcon)`
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

export default CloseButton;
