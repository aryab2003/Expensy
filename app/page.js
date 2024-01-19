"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import Link from "next/link";

export default function Home() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: "", price: "" });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      const calculateTotal = () => {
        const total = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(total);
      };
      calculateTotal();
    });
    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex flex-col items-center justify-between sm:p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center p-2 py-9 font-bold text-blue-500">
        Expense Tracker
      </h1>
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
      <div className="bg-black p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
        <form className="flex flex-col sm:flex-row md:flex-row lg:flex-row text-black">
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="mx-4 my-2 placeholder-black bg-blue-300 p-2 sm:w-full md:w-1/3 lg:w-1/3 border rounded-md"
            type="text"
            placeholder="Enter Item"
          />
          <input
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="mx-4 my-2 placeholder-black bg-blue-300 p-2 sm:w-full md:w-1/3 lg:w-1/3 border rounded-md"
            type="text"
            placeholder="Enter Price"
          />
          <button
            onClick={addItem}
            className="text-white bg-blue-500 hover:bg-blue-600 p-2 sm:w-full md:w-1/3 lg:w-1/3 sm:mt-2 md:mt-0 lg:mt-0 sm:ml-0 md:ml-4 lg:ml-4 text-sm sm:text-xl md:text-xl lg:text-l rounded-md"
            type="submit"
          >
            +
          </button>
        </form>

        <ul className="mt-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="my-3-full flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between items-center my-7 bg-red-200 p-4 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-lg text-black font-semibold">
                  {item.name}
                </span>
                <span className="text-lg text-black">${item.price}</span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="hover:bg-red-500 p-2 text-white bg-red-700 rounded-md ml-2 sm:ml-4 md:ml-4 lg:ml-4"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="flex justify-end p-2 sm:p-3 md:p-3 lg:p-3">
            <span className="text-lg font-semibold mr-2">Total:</span>
            <span className="text-lg font-semibold">${total}</span>
          </div>
        )}
        <Link legacyBehavior href="/home">
          <a className="text-white bg-blue-500 hover:bg-blue-600 p-2 sm:w-full md:w-1/3 lg:w-1/3 sm:mt-2 md:mt-0 lg:mt-0 sm:ml-0 md:ml-4 lg:ml-4 text-sm sm:text-xl md:text-xl lg:text-l rounded-md">
            Back to Previous Page
          </a>
        </Link>
      </div>
    </main>
  );
}
