// components/users/userform/UserForm.tsx
import { useState, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Title, Form, Label, Input, Button } from './styles';

interface UserFormProps {
  userId?: number;
  userData?: { name: string; email: string; password: string }; // Dados do usuário a serem preenchidos no formulário
}

const UserForm: FC<UserFormProps> = ({ userId, userData }) => {
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [password, setPassword] = useState(userData?.password || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPassword(userData.password);
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userDataToSend = { name, email, password };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const method = userId ? 'PUT' : 'POST';
      const url = userId ? `${apiUrl}/users/${userId}` : `${apiUrl}/users`;

      await fetch(url, {
        method,
        body: JSON.stringify(userDataToSend),
        headers: { 'Content-Type': 'application/json' },
      });

      router.push('/users'); // Redireciona para a lista de usuários
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{userId ? 'Editar Usuário' : 'Cadastro de Usuário'}</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nome:
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Label>
        <Label>
          Email:
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Label>
        <Label>
          Senha:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!userId} />
        </Label>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
