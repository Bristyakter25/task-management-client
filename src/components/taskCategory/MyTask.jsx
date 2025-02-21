import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = async (taskId) => {
    console.log("Deleting task with ID:", taskId);

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Task deleted successfully:", taskId);

        // Update the state without refetching the tasks
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
      // Move to a different category
      const updatedTask = { ...tasks[activeIndex], category: overCategory };
      const updatedTasks = tasks.map((task) =>
        task._id === activeId ? updatedTask : task
      );

      setTasks([...updatedTasks]);

      try {
        // Remove the _id field before sending the update request
        const { _id, ...taskWithoutId } = updatedTask;
        console.log("Updating task category:", taskWithoutId);

        const response = await fetch(
          `http://localhost:5000/tasks/${activeId}`,
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
          console.log(
            `PUT ${response.url} ${response.status} (${response.statusText})`
          );
        }
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    } else if (activeIndex !== -1 && overId) {
      // Reorder within the same category
      const overIndex = tasks.findIndex((task) => task._id === overId);
      if (activeIndex !== overIndex) {
        const newTasks = arrayMove([...tasks], activeIndex, overIndex);

        setTasks(newTasks);

        try {
          // Ensure the IDs are included in the reordering request
          console.log("Updating task order:", newTasks);

          const response = await fetch(`http://localhost:5000/tasks/reorder`, {
            method: "PUT",
            body: JSON.stringify(newTasks),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            console.error("Failed to update task order.");
            console.log(
              `PUT ${response.url} ${response.status} (${response.statusText})`
            );
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
                        onDelete={handleDelete}
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
