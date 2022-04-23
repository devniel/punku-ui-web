import styled from '@emotion/styled';

const StyledLink = styled.a`
  display: inline;
  text-decoration: none;
  margin: 15px 5px 5px 5px;
  font-size: inherit;
  opacity: 0.9;
  transition: all ease 0.5s;
  color:  #8c62af;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: #3083d4
  }

  & + & {
    margin: 0px;
  }
`;

export default StyledLink;