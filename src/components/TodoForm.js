import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("https://flask-api-5.onrender.com/api/todos") // Replace with your Flask API URL
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      // fetch("http://localhost:5000/api/todos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ todo: newTodo }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setTodos([...todos, data.todo]);
      //     setNewTodo("");
      //   })
      //   .catch((error) => console.error(error));
      fetch("https://flask-api-5.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTodos([...todos, data.todo]);
          setNewTodo("");
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  };
  // console.log(todos);

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

// import React, { useState, useEffect } from "react";

// const TodoForm = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/todos") // Replace with your Flask API URL
//       .then((response) => response.json())
//       .then((data) => setTodos(data.todos))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleChange = (e) => {
//     setNewTodo(e.target.value);
//     // console.log(todo);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newTodo.trim() !== "") {
//       fetch("http://localhost:5000/api/todos", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ todo: newTodo }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setTodos([...todos, data.todo]);
//           setNewTodo("");
//         })
//         .catch((error) => console.error(error));
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={newTodo} onChange={handleChange} />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default TodoForm;
