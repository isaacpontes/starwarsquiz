import styled from 'styled-components'

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => {
    return theme.colors.dark;
  }};
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
  color: ${({ theme }) => theme.colors.dark};
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

Widget.Input = styled.input`
  background-color: transparent;
  border: 1px solid ${ ({ theme }) => theme.colors.primary };
  border-radius: ${ ({theme}) => theme.borderRadius };
  color: ${ ({ theme }) => theme.colors.light };
  display: relative;
  font-size: 16px;
  margin: .5em auto;
  padding: .75em 1em;
  width: 100%;
  &:focus {
    /* box-shadow: 0px 0px 4px 1px ${ ({ theme }) => theme.colors.primary }; */
    outline: none;
  }
`;

Widget.Button = styled.a`
  background-color: ${ ({ theme }) => theme.colors.primary };
  border: none;
  border-radius: ${ ({theme}) => theme.borderRadius };
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, .4);
  color: ${ ({ theme }) => theme.colors.dark };
  display: block;
  font-weight: bold;
  margin: 1em 0;
  padding: .75em 1em;
  text-align: center;
  text-decoration: none;
  transition: all 200ms ease;
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${ ({ theme }) => theme.colors.light };
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, .8);
  }
`;

export default Widget;