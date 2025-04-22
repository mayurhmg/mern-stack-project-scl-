import React, { useState } from 'react';
import Sidebar from './Sidebar';
import logo from '../../assets/logo.png';
import '../../styles/SettingsProfile.css'; // Import CSS file

const SettingsProfile = () => {
  // Initial admin profile data
  const [profile, setProfile] = useState({
    name: 'Admin',
    username: 'admin',
    password: 'admin123',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content">
        <div className="profile-card">
          <img src="/profile-logo.png" alt="Profile" className="profile-logo" />

          <div className="profile-details">
            {/* Name Field */}
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              {isEditing ? (
                <input type="text" name="name" value={profile.name} onChange={handleChange} />
              ) : (
                <span className="profile-info">{profile.name}</span>
              )}
            </div>

            {/* Username Field */}
            <div className="profile-item">
              <span className="profile-label">Username:</span>
              {isEditing ? (
                <input type="text" name="username" value={profile.username} onChange={handleChange} />
              ) : (
                <span className="profile-info">{profile.username}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="profile-item">
              <span className="profile-label">Password:</span>
              <div className="password-container">
                {isEditing ? (
                  <>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                    />
                    <button className="toggle-password" onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </>
                ) : (
                  <span className="profile-info">******</span>
                )}
              </div>
            </div>
          </div>

          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
