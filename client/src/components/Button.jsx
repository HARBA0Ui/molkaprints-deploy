import { FaCaretRight } from "react-icons/fa";

function Button() {
  return (
    <button className="mx-auto md:mx-0 group py-4 px-4 flex justify-center items-center gap-1 bg-pinky text-white mt-4 font-medium text-xl">
      {}
      <FaCaretRight className="group-hover:translate-x-1 w-5 h-5 transition-all" />
    </button>
  );
}

export default Button;
