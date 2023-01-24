import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export interface todoObj {
  completed: boolean;
  id: string;
  text: string;
}

export type todoType = {
  todo: todoObj;
  toggleTodo: (todo: todoObj) => void;
  deleteTodo: (todo: string) => void;
};

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex `,
  text: `ml-2 cursor-pointer`,
  textCompleted: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex item-center`,
};

const Todo = ({ todo, toggleTodo, deleteTodo }: todoType) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleTodo(todo)} type="checkbox" checked={todo.completed ? true : false} />
        <p onClick={() => toggleTodo(todo)} className={todo.completed ? style.textCompleted : style.text}>
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
