import React from "react";
import { Link } from "react-router-dom";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-3 shadow-md rounded-lg" data-id={id}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600 my-2">Description: {task.description}</p>
      <p className="text-sm text-gray-600 my-2">Created At: {task.timestamp}</p>
      <div className="flex my-4 gap-x-3">
        <Link to={`/dashboard/updateTask/${task._id}`}>
          <button className="btn bg-teal-300">Edit</button>
        </Link>
        <button
          className="btn bg-red-300"
          onClick={(e) => {
            e.stopPropagation(); // Prevent unwanted parent event bubbling
            console.log(`Delete button clicked for task ID: ${task._id}`);
            onDelete(task._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SortableItem;
