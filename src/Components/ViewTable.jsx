import { useState } from "react";
import { Button, Modal } from "flowbite-react";

const ViewTable = ({ submitForm, setSubmitForm, onEdit, username }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const deleteExpense = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };
  function handleDelete() {
    if (deleteIndex !== null) {
      const updatedExpenses = [...submitForm];
      updatedExpenses.splice(deleteIndex, 1);
      setSubmitForm(updatedExpenses);
      setDeleteIndex(null);
      setShowDeleteModal(false);
    }
  }

  return (
    <div className="lg:w-[1100px] lg:h-3/4  md:w-[650px] md:h-[300px]  bg-neutral-700 border-black border-3 mx-auto mt-10 rounded-md overflow-auto">
      <table className="table-fixed w-full">
        <thead className="bg-gray-200 md:text-sm md:font-light text-xs font-thin">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date Of Expense</th>
            <th>Amount</th>
            <th>Updated At</th>
            <th>Created by</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody className="text-center bg-gray-300 text-xs">
          {submitForm.map((value, index) => (
            <tr key={index}>
              <td className="bg-white h-20">{value.name}</td>
              <td className=" h-20">{value.category}</td>
              <td className="bg-white h-20">{reverseDateFormat(value.date)}</td>
              <td className="h-20">{value.amount}</td>
              <td className="bg-white h-20">{value.updatedAt}</td>
              <td className="overflow-hidden text-xs h-20">{username}</td>
              <td className="flex lg:gap-4 gap-1 items-center justify-center cursor-pointer h-20 bg-white">
                <img
                  id="delete-icon"
                  className="lg:w-[30px] lg:h-[35px] w-[25px] h-[25px]"
                  src="delete (2).png"
                  alt=""
                  onClick={() => deleteExpense(index)}
                />
                <img
                  className="w-[25px] h-[25px]"
                  src="edit.png"
                  alt=""
                  onClick={() => onEdit(index)}
                />
              </td>
            </tr>
          ))}
          {showDeleteModal && (
            <Modal
              dismissible
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
            >
              <Modal.Header>Delete Expense</Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this expense?
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </Modal.Footer>
            </Modal>
          )}
        </tbody>
      </table>
    </div>
  );
};

const reverseDateFormat = (dateString) => {
  const dateParts = dateString.split("-");

  if (
    dateParts.length === 3 &&
    dateParts.every((part) => part !== "undefined")
  ) {
    // Reconstruct the date string in the expected format
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  } else {
    return dateString;
  }
};

export default ViewTable;
