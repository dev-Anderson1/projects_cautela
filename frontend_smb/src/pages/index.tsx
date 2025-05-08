import { useEffect, useState } from 'react';
import { useUsers } from '@/contexts/UserContext';
import axios from 'axios';

export default function Home() {
  const { currentUser, isAuthenticated } = useUsers();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsers = async () => {
        try {
          const { data } = await axios.get(
            'http://localhost:8000/api/usuarios-com-cautelas-pendentes',
            {
              headers: {
                Authorization: `Bearer ${currentUser?.token}`,
              },
            }
          );
          setUsers(data);
        } catch (error) {
          setError('Erro ao carregar os usuários. Verifique a autenticação e tente novamente.');
          console.error(error);
        }
      };
      fetchUsers();
    } else {
      console.log('Usuário não autenticado');
    }
  }, [isAuthenticated, currentUser]);

  if (!isAuthenticated) {
    return <p>Você precisa estar autenticado para acessar essa página.</p>;
  }

  return (
    <div>
      <h1>Usuários com Cautelas Pendentes</h1>
      {error && <p>{error}</p>}
      {users.length === 0 ? (
        <p>Nenhum usuário com cautela pendente.</p>
      ) : (
        users.map((user: any) => (
          <div key={user.id}>{user.name}</div>
        ))
      )}
    </div>
  );
}
