import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #ccc;
`;

export const HeaderItem = styled.span`
  flex: 1;
  text-align: center;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    background-color: #0070f3;
    color: white;
  }

  &:first-child:hover {
    background-color: #005bb5;
  }

  &:last-child {
    background-color: #ff4d4d;
    color: white;
  }

  &:last-child:hover {
    background-color: #cc0000;
  }
`;
