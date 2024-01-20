import React from "react";
import Link from "next/link";

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
        <Link legacyBehavior href="/" passHref>
          <a className="text-blue-500 text-lg md:text-xl font-semibold border-b border-blue-500 hover:border-blue-700 pb-1 block mb-4">
            Manage Your Expenses on Expensy
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
