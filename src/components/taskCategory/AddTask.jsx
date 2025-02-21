import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const AddTask = () => {
  const { user } = useContext(AuthContext); // Get the user from context

  const handleTask = async (e) => {
    e.preventDefault();

    // Get form data
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const timestamp = new Date().toISOString(); 

    const userEmail = user?.email; // Get the logged-in user's email

    

    // Create the task object with the user's email
    const newTask = { 
      title, 
      description, 
      category, 
      timestamp, 
      userEmail, // Include the email here
    };

    try {
      // Send the task data to the backend
      const response = await fetch('https://task-management-server-orcin-ten.vercel.app/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your task has been added",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add task',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error adding task: ${error.message}`,
      });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 py-10">
        <div className="hero-content flex-col w-full">
          <div className="card bg-base-100 w-full shadow-2xl">
            <h1 className="text-3xl text-center font-bold my-5">Add Task Here!</h1>
            <form onSubmit={handleTask} className="card-body w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select name="category" className="input input-bordered w-full" required>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-control mt-6 w-full">
                <button className="btn bg-teal-300 w-full">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
