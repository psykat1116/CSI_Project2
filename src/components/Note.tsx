import { useEffect, useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

interface NoteProps {
  id: number;
  title: string;
  isCompleted: boolean;
}

const Note: React.FC<NoteProps> = ({ id, title, isCompleted }) => {
  const [isComplete, setIsComplete] = useState<boolean>(isCompleted);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedData = data.map((task: NoteProps) => {
      if (task.id === id) {
        task.isCompleted = isComplete;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedData));
  }, [isComplete]);

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedData = data.filter((task: NoteProps) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 w-full first:mt-2 bg-slate-300 p-2 rounded-md justify-between">
      <p
        className={`text-[#1f1f1f] font-medium ${
          isComplete && "line-through text-neutral-400"
        }`}
      >
        {title}
      </p>
      <div className="flex items-center gap-2">
        <FaTrashAlt
          size={25}
          className="hover:bg-slate-400 transition rounded-full p-1 cursor-pointer hover:text-slate-100"
          onClick={handleDelete}
        />
        <FaCheck
          size={25}
          className="hover:bg-slate-400 transition rounded-full p-1 cursor-pointer hover:text-slate-100"
          onClick={() => setIsComplete(!isComplete)}
        />
      </div>
    </div>
  );
};

export default Note;
