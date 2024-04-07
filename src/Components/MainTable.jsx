import Botton from "./Button";
import { Button, Modal } from "flowbite-react";

import { useState, useEffect } from "react";
import ViewTable from "./ViewTable";

const MainTable = ({ username }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(""); // Store date as string
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [createdBy, setCreatedBy] = useState(username);
  const [submitForm, setSubmitForm] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query // State to store date filter
  const [dateFilter, setDateFilter] = useState("");
  const [toggleDelete, setToggleDelete] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("No Change"); // State to store last update time

  function openDeleteModal() {
    setToggleDelete(true);
  }

  useEffect(() => {
    setFormCompleted(name && date && category && description && amount > 0);
  }, [name, date, category, description, amount]);

  const handleDatePickerChange = (e) => {
    setDateFilter(e.target.value);
  };

  function handleForm(e) {
    e.preventDefault();

    // Check if all required fields are filled
    if (name && date && category && description && amount > 0) {
      const newExpense = {
        name: name,
        date: date,
        category: category,
        description: description,
        amount: amount,
        updatedAt: updatedAt,
        createdBy: createdBy,
      };

      // If editIndex is not null, update the expense at that index
      if (editIndex !== null) {
        const updatedExpenses = [...submitForm];
        updatedExpenses[editIndex] = newExpense;
        setSubmitForm(updatedExpenses);
        setEditIndex(null); // Reset editIndex after update
        setUpdatedAt("Recently"); // Set updatedAt to "Recently" when edited
      } else {
        setSubmitForm((x) => [...x, newExpense]); // Set updatedAt to "Recently" for new submission
      }

      setName("");
      setDate("");
      setDescription("");
      setCategory("");
      setAmount(0);
      setUpdatedAt("Recently");
      setOpenModal(false);
    } else {
      alert("Please fill in all required fields.");
    }
  }

  const handleEdit = (index) => {
    const expenseToEdit = submitForm[index];
    setName(expenseToEdit.name);
    setDate(expenseToEdit.date);
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount);
    setOpenModal(true);
    setEditIndex(index); // Set the index of the item being edited
  };

  return (
    <div className="lg:w-[1200px] lg:h-[500px] w-full h-full  md:w-[700px] md:h-[500px]  mx-auto mt-20  py-10 rounded-md border-4 border-black">
      <div className="relative w-full h-[50px] flex  gap-5 bg-indigo-500 justify-between items-center ">
        <div className="lg:text-2xl lg:font-bold ml-5 md:font-normal md:text-sm text-xs text-center ">
          Expense Manager
        </div>
        <div className="flex flex-row gap-4 mr-5">
          <input
            id="date-picker"
            type="text"
            className="py-1 lg:w-[300px] md:w-[150px] w-[120px]"
            placeholder="add date dd"
            value={dateFilter}
            onChange={handleDatePickerChange} // Update dateFilter state on change
          />
          <input
            id="for-name-search"
            className="py-1 lg:w-[300px]  md:w-[150px] w-[120px]"
            type="text"
            placeholder="search by name"
            value={searchQuery} // Bind value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on change
          />
          <button
            className="lg:w-[200px] border-black-50 w-[120px]"
            onClick={() => setOpenModal(true)}
          >
            +New Expense
          </button>
        </div>
      </div>
      <ViewTable
        submitForm={submitForm.filter(
          (expense) =>
            expense.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            expense.date.includes(dateFilter)
        )}
        setSubmitForm={setSubmitForm}
        onEdit={handleEdit}
        username={username} // Pass updatedAt state to ViewTable
      />
      {openModal && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            Create New Expense
            <p className="text-xs text-red-600">
              Every Field Should Be Filled , Otherwise It Won't Get Submitted
            </p>
          </Modal.Header>
          <Modal.Body>
            <form className=" flex flex-col gap-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= 140) {
                    setName(e.target.value);
                  }
                }}
                name=""
                id="add-name"
                maxLength={140}
              />
              <label htmlFor="">Date Of Expense</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name=""
                id=""
              />
              <label htmlFor="">Category</label>
              <select
                name=""
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Update category state on change
                id="select-value"
              >
                <option value="">Select a category</option>
                <option value="Health">Health</option>
                <option value="Electronics">Electronics</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Books">Books</option>
              </select>
              <label htmlFor="">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                id=""
              />
              <label htmlFor="">Created By</label>
              <input
                type="text"
                className="bg-gray-300"
                disabled
                value={createdBy}
                name=""
                id=""
              />
              <label htmlFor="">Amount</label>
              <input
                type="number"
                value={amount >= 0 ? amount : 0} // Ensure amount is not below zero
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} // Update amount state, ensuring it's not below zero
                name=""
                id=""
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleForm} disabled={!formCompleted}>
              Submit
            </button>
            <button onClick={() => setOpenModal(false)}>Decline</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MainTable;
