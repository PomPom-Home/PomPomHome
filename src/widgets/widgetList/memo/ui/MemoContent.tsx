import styled from 'styled-components';

const MemoWrapper = styled.div`
  width: 100%;
  height: 100%;
  //background-color: pink;
  display: flex;
  flex-direction: column;
`;
const Memo = styled.textarea`
  padding: 5px;
  font-size: 12px;
  resize: none;
  border: white 1px solid;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.35);
  outline: none;
  color: black;
  flex: 1;
  //z-index: 1;
`;
const MemoContent = () => {
  return (
    <MemoWrapper>
      <Memo />
    </MemoWrapper>
  );
};
export default MemoContent;
