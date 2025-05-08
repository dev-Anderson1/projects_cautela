// import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   is_admin: boolean;
//   token:string;
// }

// // interface UserContextProps {
// //   currentUser: User | null;
// //   isAuthenticated: boolean;
// //   login: (email: string, password: string) => Promise<void>;
// //   logout: () => void;
// // }

// interface UserContextProps {
//   currentUser: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   fetchUsers: () => Promise<void>;
//   users: User[];
//   deleteUser: (id: number) => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const router = useRouter();
//   const deleteUser = async (id: number) => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
//     try {
//       const response = await fetch(`${apiUrl}/users/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('tokenAut')}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Erro ao deletar usuário: ${response.statusText}`);
//       }
  
//       // Update the users state by removing the deleted user
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error('Erro ao deletar usuário:', error);
//       throw error; // Optionally rethrow to handle errors in the component
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');
  
//     if (storedUser && storedToken) {
//       setCurrentUser(JSON.parse(storedUser));  // Define o usuário no estado
//       setIsAuthenticated(true); // O usuário está autenticado
//     } else {
//       setIsAuthenticated(false); // Usuário não autenticado
//       router.push('/login'); // Redireciona para a página de login
//     }
//   }, []);
  

//   const [users, setUsers] = useState<User[]>([]); // Defina o estado de users

//   const fetchUsers = async () => {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
//     try {
//       const response = await fetch(`${apiUrl}/users`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('tokenAut')}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       //console.log('Usuários retornados:', data);  // Verifique se os dados dos usuários estão sendo retornados corretamente
//       setUsers(data);  // Atualiza o estado de usuários
//     } catch (error) {
//       console.error('Erro ao buscar usuários:', error);
//     }
//   };
  
  

//   // Função de login
// // const login = async (email: string, password: string) => {
// //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// //   try {
// //     const response = await fetch(`${apiUrl}/login`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Accept': 'application/json',
// //       },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     if (!response.ok) {
// //       const errorResponse = await response.json();  // Captura o erro completo
// //       console.error('Erro de login:', errorResponse);  // Exibe o erro para diagnóstico
// //       throw new Error(errorResponse.message || 'Credenciais inválidas');
// //     }

// //     const data = await response.json();
// //     const { token, user } = data;

    
// //     setCurrentUser(user);
// //     setIsAuthenticated(true);

// //     router.push('/');  
// //   } catch (error) {
// //     setError('Falha no login. Verifique suas credenciais.');
// //     console.error('Erro ao fazer login:', error);  
// //   }
// // };

  
// const login = async (email: string, password: string) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await fetch(`${apiUrl}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error('Erro de login:', errorResponse);
//       throw new Error(errorResponse.message || 'Credenciais inválidas');
//     }

//     const data = await response.json();
//     const { token, user } = data;

//     const userWithToken = { ...user, token };

//     localStorage.setItem('token', token);
// localStorage.setItem('user', JSON.stringify(userWithToken));

// setCurrentUser(userWithToken);
// setIsAuthenticated(true);

//     router.push('/');  
//   } catch (error) {
//     console.error('Erro ao fazer login:', error);
//   }
// };

  


//   // const logout = () => {
  
//   //   setCurrentUser(null);
//   //   setIsAuthenticated(false);
//   //   router.push('/login'); 
//   // };
  
//   const logout = () => {
//     setCurrentUser(null);
//     setIsAuthenticated(false);
//     router.push('/login');
//   };
  

//   return (
//     <UserContext.Provider value={{ currentUser, isAuthenticated, login, logout, fetchUsers,users, deleteUser  }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUsers = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUsers deve ser usado dentro de um UserProvider');
//   }
//   return context;
// };
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  token: string;
}

interface UserContextProps {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  users: User[];
  deleteUser: (id: number) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const checkAuth = async () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-token`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedToken}`, // Usando o token diretamente no cabeçalho
          },
          credentials: 'include', // Necessário para o Sanctum
        });
  
        if (response.ok) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao validar token', error);
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };
  

  // Chama o checkAuth ao iniciar para garantir que a autenticação seja verificada
  useEffect(() => {
    checkAuth();
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      // Primeiro, obtenha o CSRF cookie
      const csrfResponse = await fetch(`${apiUrl}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include', // Necessário para o Sanctum
      });
  
      if (!csrfResponse.ok) {
        throw new Error('Erro ao obter CSRF token');
      }
  
      // Agora, envie a requisição de login com o CSRF cookie
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        credentials: 'include', // Necessário para o Sanctum
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
  
      const data = await response.json();
      const { token, user } = data; // Obtendo tanto o token quanto o user
  
      // Salvando o token e o user no localStorage
      const userWithToken = { ...user, token }; // Juntando o token com as informações do user
      localStorage.setItem('user', JSON.stringify(userWithToken)); // Armazenando o user com o token no localStorage
      localStorage.setItem('token', token); // Armazenando o token separado
  
      setCurrentUser(userWithToken); // Atualizando o estado com os dados do usuário
      setIsAuthenticated(true); // Marcando o usuário como autenticado
      router.push('/'); // Redirecionando para a página principal após o login
  
    } catch (error) {
      console.error('Erro no login:', error);
      setIsAuthenticated(false);
    }
  };
  

  const logout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      // Requisição para deslogar o usuário no Laravel
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Necessário para o Sanctum
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deslogar');
      }
  
      // Limpeza do estado e localStorage
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login'); // Redireciona para o login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  

  const fetchUsers = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Erro ao buscar usuários:', response.status);
      }
    } catch (error) {
      console.error('Erro de requisição ao buscar usuários:', error);
    }
  };
  
  const deleteUser = async (id: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      console.error('Erro ao deletar usuário');
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, isAuthenticated, login, logout, fetchUsers, users, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UserProvider');
  }
  return context;
};
