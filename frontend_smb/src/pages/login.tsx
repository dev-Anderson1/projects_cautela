import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUsers } from '@/contexts/UserContext';
import styled from 'styled-components';

const LoginPage = () => {
  const { login } = useUsers(); // Supondo que a função de login está no contexto
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      // Obter o CSRF token primeiro
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include', // Necessário para enviar cookies
      });
  
      // Agora, envia a requisição de login
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Garantir que os cookies sejam enviados
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao realizar login.');
      }
  
      const data = await response.json();
      // Armazenar o token e o usuário no localStorage
      localStorage.setItem('auth_token', data.token); // Certifique-se de que 'data.token' é o Personal Access Token
      localStorage.setItem('user', JSON.stringify(data.user));
  
      // Redirecionar para a página inicial
      router.push('/');
    } catch (err) {
      setError('Falha ao realizar login. Verifique suas credenciais.');
    }
  };
  
  return (
    <Container>
      <Title>Página de Login</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
      </Form>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default LoginPage;

// Estilos com styled-components
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Error = styled.p`
  margin-top: 10px;
  color: red;
`;
