import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteuser } from "@/store/actions";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

const MainContainer = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    column: "id",
    operator: "contains",
    value: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.users);
console.log(players);

  const totalPages = Math.ceil(players.length / itemsPerPage);

  const handleDelete = (playerId) => {
    dispatch(deleteuser(playerId));
  };

  const handleEdit = (playerId) => {
    navigate("/new", { state: { playerId } });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const applyFilters = () => {
    return players.filter((player) => {
      // Apply search term filter
      if (searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const matchesSearchTerm = Object.values(player)
          .some(value => value?.toString().toLowerCase().includes(lowercasedSearchTerm));
        if (!matchesSearchTerm) return false;
      }

      // Apply specific filter criteria
      if (filterCriteria.operator === "contains") {
        return player[filterCriteria.column]
          ?.toString()
          .toLowerCase()
          .includes(filterCriteria.value.toLowerCase());
      }
      return true; // Default: match all if no criteria
    });
  };

  const filteredPlayers = applyFilters();

  return (
    <div className="w-full h-full">
      <main className="w-full p-6 bg-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
        </header>

        <div className="flex justify-between mb-6">
          <div className="w-full sm:w-1/2 flex items-center">
            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search by name, email, etc..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="bg-gray-100 hover:bg-gray-200 ml-4"
                  onClick={() => setFilterOpen((prev) => !prev)}
                >
                  <Filter size={20} fill="gray"  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-auto" >
              
                <div className="flex  gap-2">
                  <div>
                    <label className="block text-sm font-medium">Column</label>
                    <select
                      value={filterCriteria.column}
                      onChange={(e) => setFilterCriteria({ ...filterCriteria, column: e.target.value })}
                      className="w-full border p-2 rounded"
                    >
                      <option value="id">ID</option>
                      <option value="name">Name</option>
                      <option value="status">Status</option>
                      {/* Add more columns as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Operator</label>
                    <select
                      value={filterCriteria.operator}
                      onChange={(e) => setFilterCriteria({ ...filterCriteria, operator: e.target.value })}
                      className="w-full border p-2 rounded"
                    >
                      <option value="contains">Contains</option>
                      <option value="equals">Equals</option>
                      <option value="startsWith">Starts With</option>
                      {/* Add more operators as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Value</label>
                    <Input
                      type="text"
                      value={filterCriteria.value}
                      onChange={(e) => setFilterCriteria({ ...filterCriteria, value: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
               
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className="bg-gray-100 border-[#2F80ED] border-1-solid hover:bg-gray-200 ml-4"
            onClick={() => navigate("/new")}
          >
            New
          </Button>
        </div>

        {/* Table */}
        <Table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-start">
                <Checkbox />
              </th>
              <th className="p-2">User</th>
              <th className="p-2">Age</th>
              <th className="p-2">Leagues</th>
              <th className="p-2">Status</th>
              <th className="p-2">Height</th>
              <th className="p-2">Position</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            ).map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  <Checkbox />
                </td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{calculateAge(user.dateOfBirth)}</td>
                <td className="p-2">
                  {user?.leagues?.map((league, i) => (
                    <span key={i} className="mr-2 bg-gray-200 text-xs p-1 rounded">
                      {league}
                    </span>
                  ))}
                </td>
                <td className="p-2">
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2">{user.height}</td>
                <td className="p-2">{user.position}</td>
                <td className="p-2">
                  <Button
                    className="bg-blue-100 hover:bg-blue-200 mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-100 hover:bg-red-200"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <span>
            {currentPage} - {itemsPerPage} of {filteredPlayers.length}
          </span>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 hover:bg-gray-300"
          >
            <ChevronLeft size={20} color="black" />
          </Button>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 hover:bg-gray-300"
          >
            <ChevronRight size={20} color="black" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
