import styled from 'styled-components';
import {
  useMemoContent,
  useMemoActions,
} from '../../../../shared/stores/backgroundWidgetLayerStore';

const MemoWrapper = styled.div`
  width: 100%;
  height: 100%;
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
`;

const MemoContent = () => {
  const memoContent = useMemoContent();
  const { setMemo } = useMemoActions();

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  return (
    <MemoWrapper>
      <Memo value={memoContent || ''} onChange={handleMemoChange} />
    </MemoWrapper>
  );
};
export default MemoContent;
