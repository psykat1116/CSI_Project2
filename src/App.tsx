import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Note from "./components/Note";

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

function App() {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setData(tasks);
  }, []);

  const handleClick = () => {
    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: text,
      isCompleted: false,
    };

    setData([...data, newTask]);
    setText("");
    localStorage.setItem("tasks", JSON.stringify([...data, newTask]));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-slate-700 to-neutral-700">
      <div className="flex flex-col items-center p-2 h-1/2 w-full sm:w-[400px] bg-gray-200 shadow-sm rounded-md">
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Add A Task"
            className="p-1.5 rounded-sm bg-transparent focus:outline-none text-[#1f1f1f] w-full font-medium"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FaPlus
            className="hover:bg-neutral-400 transition rounded-full p-2 size-8 cursor-pointer hover:text-slate-100"
            onClick={handleClick}
          />
        </div>
        <div className="h-[1px] bg-[#1f1f1f] w-full" />
        <div className="flex flex-col items-center gap-2 justify-start w-full overflow-y-scroll">
          {data.length ? (
            data.map((task) => <Note key={task.id} {...task} />)
          ) : (
            <p className="mt-2 font-bold">No Notes</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
