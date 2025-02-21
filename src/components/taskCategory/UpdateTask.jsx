import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", category: "" });

  // Fetch existing task data
  useEffect(() => {
    fetch(`https://task-management-server-orcin-ten.vercel.app/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error("Error fetching task:", err));
  }, [id]);

  
  const handleUpdatedTask = async (e) => {
    e.preventDefault();
    const updatedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      timestamp: new Date().toISOString(),
    };

    
    fetch(`https://task-management-server-orcin-ten.vercel.app/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then(() => {
         Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been updated",
                  showConfirmButton: false,
                  timer: 1500
                });
        navigate("/dashboard/myTasks"); 
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div>
      <div className="hero bg-base-200 py-10">
        <div className="hero-content flex-col w-full">
          <div className="card bg-base-100 w-full shadow-2xl">
            <h1 className="text-3xl text-center font-bold my-5">Update Task</h1>
            <form onSubmit={handleUpdatedTask} className="card-body w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  defaultValue={task.title}
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  className="input input-bordered w-full"
                  defaultValue={task.description}
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select name="category" className="input input-bordered w-full" defaultValue={task.category} required>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-control mt-6 w-full">
                <button className="btn btn-primary w-full">Update Task</button>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default UpdateTask;
