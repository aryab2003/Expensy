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
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const Home = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    reminderDate: null,
  });
  const [categories, setCategories] = useState([
    "Food",
    "Beverage",
    "Transportation",
    "Entertainment",
    "Miscellaneous",
  ]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reminderDate, setReminderDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [width, setWidth] = useState(300);

  // Function to add a new item
  const addItem = async (e) => {
    e.preventDefault();
    if (
      newItem.name.trim() !== "" &&
      newItem.price.trim() !== "" &&
      newItem.category !== ""
    ) {
      const newItemData = {
        name: newItem.name.trim(),
        price: newItem.price.trim(),
        category: newItem.category,
        tags: selectedTags,
        timestamp: new Date().toISOString(),
        reminderDate: newItem.reminderDate,
      };

      await addDoc(collection(db, "items"), newItemData);
      setNewItem({
        name: "",
        price: "",
        category: "",
        tags: [],
        reminderDate: null,
      });
      setSelectedTags([]);
      setReminderDate(null);

      showReminder("Reminder added successfully!");
    }
  };

  // Function to handle changes in reminder date
  const handleReminderDateChange = (date) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      reminderDate: date,
    }));
    setReminderDate(date);
  };

  // Function to show a reminder toast
  const showReminder = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // UseEffect to fetch items and calculate total
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

  // Function to delete an item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
    showReminder("Expense deleted successfully!");
  };

  // Function to toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <main className="flex flex-col items-center justify-between sm:p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center p-2 py-9 font-bold text-blue-500">
        Expense Tracker
      </h1>

      {/* Main Content */}
      <div className="bg-black p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md w-full max-w-3xl">
        {/* Form to Add Items */}
        <form className="flex flex-col sm:flex-row md:flex-row lg:flex-row text-black mb-4">
          {/* Select Category */}
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="mx-4 my-2 p-2 w-full md:w-1/4 lg:w-1/4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Input for Item Name */}
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="mx-4 my-2 p-2 w-full md:w-1/4 lg:w-1/4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Enter Item"
          />

          {/* Input for Item Price */}
          <input
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="mx-4 my-2 p-2 w-full md:w-1/4 lg:w-1/4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Enter Price"
          />

          {/* Date Picker for Reminder Date */}
          <div className="mx-4 my-2 p-2 w-full md:w-1/4 lg:w-1/4 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <DatePicker
              selected={reminderDate}
              onChange={handleReminderDateChange}
              placeholderText="Select Reminder Date"
              dateFormat="MMMM d, yyyy"
              className="w-full"
            />
          </div>

          {/* Disabled Date Picker */}
          <DatePicker
            selected={reminderDate}
            dateFormat="MMMM d, yyyy"
            className="mx-4 my-2 p-2 w-full md:w-1/4 lg:w-1/4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            disabled
          />

          {/* Add Item Button */}
          <button
            onClick={addItem}
            className="text-white bg-blue-500 hover:bg-blue-600 p-2 w-full md:w-1/4 lg:w-1/4 mt-2 md:mt-0 lg:mt-0 ml-0 md:ml-4 lg:ml-4 text-sm md:text-xl lg:text-l rounded-md"
            type="submit"
          >
            +
          </button>
        </form>

        {/* List of Items */}
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
                <span className="text-sm text-gray-800">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                {item.reminderDate instanceof Date &&
                  !isNaN(item.reminderDate.getTime()) && (
                    <span className="text-sm text-blue-500">
                      Reminder:{" "}
                      {new Date(item.reminderDate).toLocaleDateString()}
                    </span>
                  )}
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

        {/* Total Expense */}
        {items.length > 0 && (
          <div className="flex justify-end p-2 md:p-3 lg:p-3">
            <span className="text-lg font-semibold mr-2">Total:</span>
            <span className="text-lg font-semibold">${total}</span>
          </div>
        )}

        {/* Back to Previous Page Link */}
        <Link legacyBehavior href="/home">
          <a className="text-white bg-blue-500 hover:bg-blue-600 p-2 w-full md:w-1/3 lg:w-1/3 mt-2 md:mt-0 lg:mt-0 ml-0 md:ml-4 lg:ml-4 text-sm md:text-xl lg:text-l rounded-md">
            Back to Previous Page
          </a>
        </Link>

        {/* Draggable and Resizable Calendar */}
        <Draggable>
          <Resizable
            width={width}
            height={400} // Adjust the height as needed
            onResize={(e, { size }) => setWidth(size.width)}
          >
            <div className="absolute top-4 bg-black right-4 border border-gray-300 rounded-md p-2">
              {/* Close Button for Calendar */}
              <button
                className="absolute top-2 right-2 text-green-500 text-5xl hover:text-red-500"
                onClick={toggleCalendar}
              >
                X
              </button>
              {/* Calendar Component */}
              {showCalendar && (
                <Calendar
                  value={reminderDate}
                  onChange={handleReminderDateChange}
                  tileClassName={({ date, view }) => {
                    const isMarked = items.some(
                      (item) =>
                        item.reminderDate &&
                        isSameDay(new Date(item.reminderDate), date)
                    );
                    return isMarked ? { color: "red" } : null;
                  }}
                />
              )}
            </div>
          </Resizable>
        </Draggable>

        {/* Toast Container for Notifications */}
        <ToastContainer />
      </div>
    </main>
  );
};

export default Home;
