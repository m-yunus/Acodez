import { useState } from 'react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="h-full border-r-2 border-gray-100 flex flex-col items-center justify-start sm:w-[15%] md:w-[15%]">
      <div className="h-[10%] py-2 flex items-center justify-center w-full">
        <h1 className="text-black text-lg font-sans font-bold">Logoipsum</h1>
      </div>

      <div className="w-full mt-4">
   
        <ul className="space-y-4 w-full px-2">
          

      
          <li className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-between w-full border-none p-2 text-gray-700 ">
                New List
                  <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-2 rounded shadow-md">
                <DropdownMenuItem>
                  <a href="#" className="block text-gray-700 p-2 hover:bg-gray-200 rounded">
                  New List 1
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#" className="block text-gray-700 p-2 hover:bg-gray-200 rounded">
                  New List 2
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#" className="block text-gray-700 p-2 hover:bg-gray-200 rounded">
                  New List 3
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
