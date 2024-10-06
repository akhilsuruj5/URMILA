import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCourses = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get the stored token

      if (!token) {
        setError('No token found, please log in again.');
        return;
      }

      try {
        // Fetch user details using the token in the Authorization header
        const response = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as a Bearer token
          },
        });
        
        setUser(response.data); // Set user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user details');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Your Email: {user.email}</p>

      <h2 className="mt-6 text-lg font-semibold">Your Courses</h2>
      <ul className="list-disc ml-6">
        <li>Course 1: Intro to Web Development</li>
        <li>Course 2: Advanced React.js</li>
      </ul>
    </div>
  );
};

export default MyCourses;
