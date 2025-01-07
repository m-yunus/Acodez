import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUser, updateuser } from "@/store/actions"; // Assuming actions are set up for these
import { useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Leagues = ["La Liga", "League 1", "League 2", "League 3"];
const NewReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { players } = useSelector((state) => state.users); // Get players from Redux store
  const { state } = useLocation();
  const existingPlayer = players.find((player) => player.id === state?.playerId);

  // State for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    leagues: [],
    status: "",
    height: "",
    position: "",
  });

  const [errors, setErrors] = useState({});

  // Prefill form data when existingPlayer is found
  useEffect(() => {
    if (existingPlayer) {
      setFormData({
        name: existingPlayer.name,
        dateOfBirth: existingPlayer.dateOfBirth,
        leagues: existingPlayer.leagues || [],
        status: existingPlayer.status,
        height: existingPlayer.height,
        position: existingPlayer.position,
      });
    }
  }, [existingPlayer]);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Select change handler
  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleMultiSelectChange = (value) => {
    setFormData((prevData) => {
      const updatedLeagues = prevData.leagues.includes(value)
        ? prevData.leagues.filter((league) => league !== value)
        : [...prevData.leagues, value];

      return { ...prevData, leagues: updatedLeagues };
    });
  };
  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.leagues) newErrors.leagues = "Leagues played is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (formData.height && !/^\d*\.?\d*$/.test(formData.height))
      newErrors.height = "Please enter a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (existingPlayer) {
        // If the player exists, update the player
        dispatch(updateuser(state.playerId, formData)); // Dispatch the update action
      } else {
        // If the player is new, add the player
        dispatch(addUser(formData)); // Dispatch the add player action
      }
      navigate("/"); // Redirect to main page after adding/updating
    }
  };


  return (
    <div className="w-full flex flex-col justify-start max-w-4xl p-8 text-start">
      <h1 className="text-3xl font-semibold text-start mb-8">{existingPlayer ? 'Edit Player Information' : 'User Information Form'}</h1>

      <Card className="bg-white">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">Player Name</div>
                <Input
                  name="name"
                  placeholder="Enter player's name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-200 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">Date of Birth</div>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              {/* Leagues Played Field */}
              <div className="space-y-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full text-black text-left border px-4 py-2 rounded-md bg-white">
                    {formData.leagues.length > 0
                      ? `Selected: ${formData.leagues.join(", ")}`
                      : "Select leagues"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {Leagues.map((league) => (
                      <DropdownMenuCheckboxItem
                        key={league}
                        checked={formData.leagues.includes(league)}
                        onCheckedChange={() => handleMultiSelectChange(league)}
                      >
                        {league}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.leagues && (
                  <p className="text-red-500 text-sm">{errors.leagues}</p>
                )}
              </div>

              {/* Status Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">Player Status</div>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)} // Correctly handle select change
                  className="border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Injured">Injured</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>

              {/* Height Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px] z-10">Height </div>
                <div className="relative">
                  <Input
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height"
                    className="border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-3 text-gray-500">m</span>
                </div>
                {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
              </div>

              {/* Position Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">Player Position</div>
                <Select
                  name="position"
                  value={formData.position}
                  onValueChange={(value) => handleSelectChange('position', value)} // Correctly handle select change
                  className="border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forward">Forward</SelectItem>
                    <SelectItem value="midfielder">Midfielder</SelectItem>
                    <SelectItem value="defender">Defender</SelectItem>
                    <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                style={{ backgroundColor: '#1976d2', color: 'white' }}
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none px-6 py-3"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewReg;
