import { WIDGET_KEYS } from '@shared/model';
import { GoPaperclip } from 'react-icons/go';
import { CiMemoPad } from 'react-icons/ci';

import styled from 'styled-components';

const SITE_LINK = () => {
  const StyledGoPaperclip = styled(GoPaperclip)``;
  return <StyledGoPaperclip />;
};

const MEMO = () => {
  const StyledCiMemoPad = styled(CiMemoPad)``;
  return <StyledCiMemoPad />;
};

export const WIDGET_ICONS: Record<keyof typeof WIDGET_KEYS, JSX.Element> = {
  SITE_LINK: SITE_LINK(),
  MEMO: MEMO(),
};
