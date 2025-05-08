import { useRouter } from 'next/router';
import {
  Container,
  Title,
  List,
  ListItem,
  ButtonContainer,
  Button,
  Header,
  HeaderItem,
} from './styles';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  deleteUser: (id: number) => void;
}

const UserList = ({ users, deleteUser }: UserListProps) => {
  const router = useRouter();

  if (!users || users.length === 0) {
    return (
      <Container>
        <Title>Usuários</Title>
        <p>Sem usuários para exibir.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Usuários</Title>
      <Header>
        <HeaderItem>Nome</HeaderItem>
        <HeaderItem>Email</HeaderItem>
        <HeaderItem>Ações</HeaderItem>
      </Header>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <ButtonContainer>
              <Button onClick={() => router.push(`/users/editUsers/${user.id}`)}>
                Editar
              </Button>
              <Button onClick={() => deleteUser(user.id)}>Deletar</Button>
            </ButtonContainer>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
