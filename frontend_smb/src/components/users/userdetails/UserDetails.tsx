// components/UserDetails.tsx
import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';

const UserDetails: FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/users/${id}`);
        const data = await res.json();
        setUser(data);
      };
      fetchUser();
    }
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Detalhes do Usuário</h1>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UserDetails;
