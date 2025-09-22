import styled from 'styled-components';

export const Navbar = styled.div`
  background: white;
  width: 1230px;
  height: 100px;
  margin-left: 38px;
  margin-right: 51px;
  margin-top: 40px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  align-items: center;

  & > .adtype-navbar {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 800px;
    height: 77px;

    a {
      height: 45px;
      width: 176px;
      font-size: 14px;
      padding: 12px;
      display: flex;
      align-items: center;
    }
  }

  & > .filter {
    width: 250px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 100px;
    padding: 14px 24px 14px 24px;
    border: 1px solid #dbd8fc;
    border-radius: 10px;
    font-size: 14px;
    color: #808080;
  }
`;
