import { Menu } from "lucide-react";
import { Star } from "lucide-react";
const Header = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Menu size={20} color="white" />
        <h1 className="text-white text-base font-sans font-normal">
          Typography
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Star size={20} color="white" fill="white" />
        <div className="flex items-center justify-center bg-gray-400 rounded-full h-8 w-8">
          <p className="text-white text-sm">OP</p>
        </div>
      </div>
    </>
  );
};

export default Header;
