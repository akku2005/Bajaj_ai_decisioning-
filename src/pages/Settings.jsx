import React, { useState } from 'react';
import { Save, Bell, Lock, User } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    twoFactor: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingSections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { id: 'profile', label: 'Profile Information', description: 'Update your personal information' },
        { id: 'password', label: 'Change Password', description: 'Update your password' },
        { id: 'email', label: 'Email Address', description: 'Manage your email' },
      ]
    },
    {
      title: 'Notification Settings',
      icon: Bell,
      items: [
        { id: 'notifications', label: 'Push Notifications', description: 'Receive push notifications' },
        { id: 'emailAlerts', label: 'Email Alerts', description: 'Get email alerts for important updates' },
      ]
    },
    {
      title: 'Security Settings',
      icon: Lock,
      items: [
        { id: 'twoFactor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reporting</h1>
        <p className="text-gray-600 mt-1">View your campaign reports and analytics</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Icon size={24} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>

              {/* Section Content */}
              <div className="divide-y divide-gray-200">
                {section.items.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {item.id in settings && (
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.id] ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[item.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    {!(item.id in settings) && (
                      <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Edit
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
