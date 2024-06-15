import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './usersSlice';
import './Loader.css';

function UserDetails() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser(userId)).then(() => setLoading(false));
  }, [userId, dispatch]);

  const user = useSelector((state) => state.users.users.find((user) => user.id === Number(userId)));

  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company.name}</p>
          <p>City: {user.address.city}</p>
          <p>Street: {user.address.street}</p>
          <p>Suite: {user.address.suite}</p>
          <p>Zipcode: {user.address.zipcode}</p>
          <Link to="/">Go Home</Link>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

export default UserDetails;
