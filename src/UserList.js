import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);

  React.useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default UserList;
