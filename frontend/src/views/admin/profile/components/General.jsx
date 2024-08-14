import React, { useState } from 'react';
import Card from 'components/card';
import axios from 'axios';

const General = ({ fullname: initialFullname, email }) => {
  const [fullname, setFullname] = useState(initialFullname);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    const userId = localStorage.getItem('id'); // Retrieve user ID from localStorage

    if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:5000/superadmins/update-profile/${userId}`, {
            fullname // Only send fullname to update
        });

        if (response.status === 200) {
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            localStorage.setItem('fullname', fullname); // Update localStorage
        }
    } catch (err) {
        console.error('Error:', err); // Log error details
        setError('Failed to update profile. Please try again.');
    }
};

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Manage your settings here. You can customize your profile, adjust preferences, and more.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Full Name</p>
          {isEditing ? (
            <>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-2 rounded-xl bg-brand-500 py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Save
              </button>
            </>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {fullname}
            </p>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {email}
          </p>
        </div>
      </div>

      {/* Display success or error messages */}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </Card>
  );
};

export default General;
