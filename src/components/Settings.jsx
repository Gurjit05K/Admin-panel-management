function Settings() {
  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable Notifications
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Dark Mode
          </label>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150">
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;