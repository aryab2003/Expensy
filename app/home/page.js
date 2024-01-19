import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Expensy</h1>
      <p className="text-purple-600 text-lg md:text-2xl mb-8">
        Track your expenses effortlessly and manage your budget effectively.
      </p>
      <div className="mb-8">
        <Image
          src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-4268366-3561009.png"
          alt="Expense Tracker"
          width={600}
          height={500}
        />
      </div>
      <Link legacyBehavior href="/" passHref>
        <a className="text-blue-500 text-lg md:text-xl font-semibold border-b border-blue-500 hover:border-blue-700 pb-1 block mb-4">
          Manage Your Expenses on Expensy
        </a>
      </Link>

      <Link legacyBehavior href="/profile" passHref>
        <a className="text-blue-500 text-lg md:text-xl font-semibold border-b border-blue-500 hover:border-blue-700 pb-1 block mb-4">
          Your Profile
        </a>
      </Link>
    </div>
  );
};

export default Home;
