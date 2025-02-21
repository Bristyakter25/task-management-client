import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from '../../provider/AuthProvider';
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // Make sure the path is correct

const MyTask = () => {
  const { user } = useContext(AuthContext); // Get user data from AuthContext
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Fetching tasks...");
    fetch(`https://task-management-server-orcin-ten.vercel.app/tasks`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure the category exists in the data
        const tasksWithCategory = data.map((task) => ({
          ...task,
          category: task.category || "To-Do", // Default to "To-Do" if no category
        }));
        setTasks(tasksWithCategory);
        if (tasksWithCategory.length === 0) {
          setMessage("No tasks available.");
        } else {
          setMessage("");
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = async (title, description) => {
    if (!user?.email) {
      Swal.fire("Please log in to add a task.");
      return;
    }

    const newTask = {
      title,
      description,
      email: user.email, // Send user email
    };

    try {
      const response = await fetch("https://task-management-server-orcin-ten.vercel.app/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task added successfully", data);
        setTasks((prevTasks) => [...prevTasks, data]);
      } else {
        Swal.fire("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire("Error adding task.");
    }
  };

  // const handleDelete = async (taskId) => {
  //   console.log("Deleting task with ID:", taskId);

  //   try {
  //     const response = await fetch(`https://task-management-server-orcin-ten.vercel.app/tasks/${taskId}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       console.log("Task deleted successfully:", taskId);
  //       Swal.fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!"
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your task has been deleted.",
  //             icon: "success"
  //           });
  //           setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  //         }
  //       });
  //     } else {
  //       console.error("Failed to delete task");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const activeIndex = tasks.findIndex((task) => task._id === activeId);
    const overElement = document.querySelector(`[data-id='${overId}']`);
    const overCategory = overElement
      ? overElement.closest("[data-category]").getAttribute("data-category")
      : null;

    if (overCategory && tasks[activeIndex].category !== overCategory) {
      const updatedTask = { ...tasks[activeIndex], category: overCategory };
      const updatedTasks = tasks.map((task) =>
        task._id === activeId ? updatedTask : task
      );

      setTasks(updatedTasks);

      try {
        const { _id, ...taskWithoutId } = updatedTask;
        console.log("Updating task category:", taskWithoutId);

        const response = await fetch(
          `https://task-management-server-orcin-ten.vercel.app/tasks/${activeId}`,
          {
            method: "PUT",
            body: JSON.stringify(taskWithoutId),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to update task category.");
        }
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    } else if (activeIndex !== -1 && overId) {
      const overIndex = tasks.findIndex((task) => task._id === overId);
      if (activeIndex !== overIndex) {
        const newTasks = arrayMove([...tasks], activeIndex, overIndex);

        setTasks(newTasks);

        try {
          console.log("Updating task order:", newTasks);

          const response = await fetch(`https://task-management-server-orcin-ten.vercel.app/tasks/reorder`, {
            method: "PUT",
            body: JSON.stringify(newTasks),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            console.error("Failed to update task order.");
          }
        } catch (error) {
          console.error("Error updating task order:", error);
        }
      }
    }
  };

  const groupedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Done: tasks.filter((task) => task.category === "Done"),
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">My Tasks</h1>

        {message && (
          <div className="text-center text-gray-500 mb-6">
            <p>{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(groupedTasks).map((category) => (
            <SortableContext
              key={category}
              items={groupedTasks[category].map((task) => task._id.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div
                className="bg-gray-100 p-4 rounded-lg shadow-md"
                data-category={category}
              >
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {category}
                </h2>
                <div className="space-y-4">
                  {groupedTasks[category].length > 0 ? (
                    groupedTasks[category].map((task) => (
                      <SortableItem
                        key={task._id}
                        id={task._id.toString()}
                        task={task}
                        setTasks={setTasks} 
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      No tasks in this category.
                    </p>
                  )}
                </div>
              </div>
            </SortableContext>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default MyTask;
