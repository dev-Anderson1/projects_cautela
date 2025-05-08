import { useUsers } from '@/contexts/UserContext';  // Pegando os dados do contexto
import UserList from '@/components/users';
import React, {useEffect} from 'react';
import { Container, Title} from './styles';

const Users = () => {
  const { users, fetchUsers, deleteUser } = useUsers();  // Obtendo os usuários do contexto

  // Chama fetchUsers para buscar os dados quando o componente for montado
  useEffect(() => {
    fetchUsers(); // Chama a função para buscar os dados dos usuários
  }, [fetchUsers]);

  if (!users || users.length === 0) {
    return (
      <Container>
        <Title>Usuários</Title>
        <p>Sem usuários para exibir.</p>
      </Container>
    );
  }

  return (
    <div>
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default Users;
