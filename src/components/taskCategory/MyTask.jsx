import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">{props.task.title}</h3>
      <p className="text-sm text-gray-600">{props.task.description}</p>
      <div className="flex my-4 gap-x-3">
        <Link to={`/dashboard/updateTask/${props.task._id}`}><button className="btn">Edit</button></Link>
        <button className="btn" onClick={() => props.onDelete(props.task._id)}>Delete</button>
      </div>
    </div>
  );
};

const MyTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });

          if (response.ok) {
            setTasks(tasks.filter(task => task._id !== taskId));

            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete task", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong!", "error");
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex(task => task._id === active.id);
        const newIndex = tasks.findIndex(task => task._id === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const groupedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    "Done": tasks.filter((task) => task.category === "Done"),
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">My Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(groupedTasks).map((category) => (
            <div key={category} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">{category}</h2>
              <SortableContext items={groupedTasks[category].map(task => task._id)}>
                <div className="space-y-4">
                  {groupedTasks[category].length > 0 ? (
                    groupedTasks[category].map((task) => (
                      <SortableItem key={task._id} id={task._id} task={task} onDelete={handleDelete} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No tasks in this category.</p>
                  )}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default MyTask;
