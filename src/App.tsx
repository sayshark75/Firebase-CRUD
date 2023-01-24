import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo, { todoObj } from "./Components/Todo";
import { db } from "./FIrebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";

type Props = {};
const style = {
  bg: `w-screen h-screen p-4 bg-gradient-to-r from-blue-500 to-blue-800`,
  container: `bg-slate-100 max-w-[380px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-4 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`,
};

const App = (props: Props) => {
  const [todos, setTodos] = useState<Array<todoObj>>([]);

  const [input, setInput] = useState<string>("");

  //create Todo
  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) {
      alert("Please Enter Text");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  //Read Todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //Just Avoiding Because Our useState will Avoid Wrong Objects
      let todoArr: any = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  //update Todo
  const toggleTodo = async (todo: todoObj) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete Todo
  const deleteTodo = async (todo: string) => {
    await deleteDoc(doc(db, "todos", todo));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, id) => {
            return <Todo key={id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />;
          })}
        </ul>
        {todos.length < 1 ? null : <p className={style.count}> {`You Have ${todos.length} Todos`}</p>}
      </div>
    </div>
  );
};

export default App;
