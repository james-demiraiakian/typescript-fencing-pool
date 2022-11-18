import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

export default function Dashboard() {
  const auth = useUser();
  const navigate = useNavigate();
  // if (!auth.user.email) return navigate('/auth');
  return <div>Dashboard</div>;
}
