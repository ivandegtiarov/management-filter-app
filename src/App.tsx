import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilter } from './features/users/usersSlice';
import { RootState } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, filters, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ field: e.target.name, value: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">User List</h1>
        <div className="flex flex-wrap mb-4 gap-2">
          {['name', 'username', 'email', 'phone'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={`Search by ${field}`}
              value={filters[field as keyof typeof filters]}
              onChange={handleFilterChange}
              className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Username</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Email</th>
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-700">{user.name}</td>
                <td className="py-2 px-4 border-b text-gray-700">{user.username}</td>
                <td className="py-2 px-4 border-b text-gray-700">{user.email}</td>
                <td className="py-2 px-4 border-b text-gray-700">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;