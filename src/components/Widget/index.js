import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 28px;
  color: ${({ theme }) => theme.colors.mainBg};
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Image = styled.img`
  height: 12em;
  width: 100%;
  object-fit: cover;
`;

Widget.Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.contrastText};
  display: relative;
  font-size: 16px;
  margin: .5em auto;
  padding: .75em 1em;
  width: 100%;
  &:focus {
    /* box-shadow: 0px 0px 4px 1px ${({ theme }) => theme.colors.primary}; */
    outline: none;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border: solid 2px  ${({ theme }) => `${theme.colors.mainBg}`};;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    border: solid 2px ${({ theme }) => `${theme.colors.primary}`};
  }
`;

Widget.Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, .4);
  color: ${({ theme }) => theme.colors.mainBg};
  cursor: pointer;
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin: 1em 0;
  padding: .6em 1em;
  transition: .4s;
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.contrastText};
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, .8);
  }
  &:disabled {
    background-color: #aaa;
    color: ${({ theme }) => theme.colors.contrastText};
    box-shadow: 0 0 0 0 rgba(0, 0, 0, .8);
  }
`;

export default Widget;
