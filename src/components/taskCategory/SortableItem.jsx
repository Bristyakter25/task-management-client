import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const SortableItem = ({ id, task, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const { user } = useContext(AuthContext);

 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

 
  if (user?.email !== task.email) {
    return null; 
  }

  
  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (isConfirmed.isConfirmed) {
      try {
        const response = await fetch(`https://task-management-server-orcin-ten.vercel.app/tasks/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
  
          // Update tasks state after successful deletion
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } else {
          Swal.fire("Error deleting task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("Error deleting task");
      }
    }
  };

  
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-sky-100 p-3 shadow-md rounded-lg" data-id={id}>
      <div className="h-[200px]">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600 my-2 ">Description: {task.description}</p>
      <p className="text-sm text-gray-600 my-2">Created At: {task.timestamp}</p>
      </div>
      <div className="flex my-4 justify-center gap-x-3">
        <Link to={`/dashboard/updateTask/${task._id}`}>
          <button className="btn bg-teal-300 w-[80px]">Edit</button>
        </Link>
        <button
          className="btn ml-5 bg-red-300"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(task._id);
            console.log(`Delete button clicked for task ID: ${task._id}`);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}  

export default SortableItem;
