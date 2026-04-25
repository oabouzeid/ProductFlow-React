

import styled from 'styled-components';



const CustomButton = styled.button`
	background-color: var(--primary);
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 6px;
	font-weight: 500;
	transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:disabled {
    background-color: var(--text-muted);
    cursor: not-allowed;
  }
`;



export { CustomButton };