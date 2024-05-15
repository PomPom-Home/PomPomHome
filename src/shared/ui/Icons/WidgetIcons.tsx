import { WIDGET_KEYS } from '@shared/model';
import { GoPaperclip } from 'react-icons/go';
import { CiMemoPad } from 'react-icons/ci';
import { LuListTodo } from 'react-icons/lu';
import { IoSearch } from 'react-icons/io5';

import styled from 'styled-components';

const SITE_LINK = () => {
  const StyledGoPaperclip = styled(GoPaperclip)``;
  return <StyledGoPaperclip />;
};

const MEMO = () => {
  const StyledCiMemoPad = styled(CiMemoPad)``;
  return <StyledCiMemoPad />;
};

const TODO = () => {
  const StyledLuListTodo = styled(LuListTodo)``;
  return <StyledLuListTodo />;
};

const SEARCH_BOX = () => {
  const StyledIoSearch = styled(IoSearch)``;
  return <StyledIoSearch />;
};

export const WIDGET_ICONS: Record<keyof typeof WIDGET_KEYS, JSX.Element> = {
  SITE_LINK: SITE_LINK(),
  MEMO: MEMO(),
  TODO: TODO(),
  SEARCH_BOX: SEARCH_BOX(),
};
