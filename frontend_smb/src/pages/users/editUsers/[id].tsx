// pages/users/editUsers/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '@/components/users/userform/UserForm';

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/users/${id}`);
        const data = await response.json();
        setUserData(data);
      };

      fetchUserData();
    }
  }, [id]);

  if (!userData) return <p>Carregando...</p>;

  return <UserForm userId={parseInt(id as string)} userData={userData} />;
};

export default EditUser;
