import { useState } from 'react';
import styled from 'styled-components';
import { useMiniWebStore } from '../../../../shared/stores/miniWebStore';

const UrlSettingBoard: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const { openUrl, setOpenUrl } = useMiniWebStore();
  const placeholderText = openUrl || 'Enter a URL to load...';
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const openSite = () => {
    setOpenUrl(url);
    console.log('openSite url>>>', openUrl);
  };

  return (
    <Container>
      <Input
        className="notDraggable"
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder={placeholderText}
      />
      <Button className="notDraggable" onClick={openSite}>
        Open
      </Button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default UrlSettingBoard;
