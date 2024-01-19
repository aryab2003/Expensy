import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <img
          src="https://www.shutterstock.com/image-photo/portrait-cute-boy-doubt-shrug-260nw-2338046171.jpg"
          alt="Profile"
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-600">Arya Bhattacharyya</p>
        <div className="mt-4">
          <p className="text-gray-800">
            I'm a passionate web developer with a love for creating amazing
            websites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
