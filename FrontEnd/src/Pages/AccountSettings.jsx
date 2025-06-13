import React, { useEffect, useState } from "react";
import {
  getAccountSettings,
  updateAccountSettings,
} from "../services/userServies";

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    email: "",
    username: "",
    twitterHandle: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAccountSettings();
        setSettings(data);
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError(null);

    try {
      const updated = await updateAccountSettings(settings);
      setSettings(updated);
      setMessage("Settings updated successfully!");
    } catch (err) {
      setError("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading settings...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] text-white max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          disabled
          className="w-full p-3 rounded-md bg-[#121212] text-gray-400 cursor-not-allowed"
        />
        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-[#121212] text-white"
        />
        <p className="text-sm text-gray-500 mt-1">
          Your username will be visible to other users
        </p>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">X (Twitter) Handle</label>
        <input
          type="text"
          name="twitterHandle"
          placeholder="e.g. mattshumer_"
          value={settings.twitterHandle}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-[#121212] text-white"
        />
        <p className="text-sm text-gray-500 mt-1">
          Optionally share your X/Twitter username (without @)
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default AccountSettings;
