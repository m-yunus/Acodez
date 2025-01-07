import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import { addUser, updateuser } from "@/store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Leagues = ["La Liga", "League 1", "League 2", "League 3"];

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  leagues: yup.array().min(1, 'Please select at least one league'),
  status: yup.string().required('Status is required'),
  height: yup
    .number()
    .typeError('Height must be a number')
    .positive('Height must be positive')
    .required('Height is required'),
  position: yup.string().required('Position is required'),
});

const NewReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { players } = useSelector((state) => state.users);
  const { state } = useLocation();
  
  // Find the existing player if editing
  const existingPlayer = players.find((player) => player.id === state?.playerId);

  const [selectedLeagues, setSelectedLeagues] = useState([]);

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue 
  } = useForm({
    resolver: yupResolver(schema), // Use yupResolver for form validation
    defaultValues: {
      name: '',
      dateOfBirth: '',
      leagues: [],
      status: '',
      height: '',
      position: '',
    }
  });

  // Prefill form data when editing an existing player
  useEffect(() => {
    if (existingPlayer) {
      reset({
        name: existingPlayer.name,
        dateOfBirth: existingPlayer.dateOfBirth,
        leagues: existingPlayer.leagues || [],
        status: existingPlayer.status,
        height: existingPlayer.height,
        position: existingPlayer.position,
      });
      setSelectedLeagues(existingPlayer.leagues || []);
    }
  }, [existingPlayer, reset]);

  // Handle multi-select for leagues
  const handleMultiSelectChange = (value) => {
    const updatedLeagues = selectedLeagues.includes(value)
      ? selectedLeagues.filter((league) => league !== value) // Remove league if already selected
      : [...selectedLeagues, value]; // Add league if not selected
    
    setSelectedLeagues(updatedLeagues);
    setValue('leagues', updatedLeagues); // Update the form's leagues field
  };

  // Form submission handler
  const onSubmit = (data) => {
    if (existingPlayer) {
      // If editing an existing player, update their information
      dispatch(updateuser(state.playerId, data));
    } else {
      // If creating a new player, add the new user
      dispatch(addUser(data));
    }
    navigate("/"); // Navigate back to the home page
  };
  
  return (
    <div className="w-full flex flex-col justify-start max-w-4xl p-8 text-start">
      <h1 className="text-3xl font-semibold text-start mb-8">
        {existingPlayer ? 'Edit user Information' : 'User Information Form'}
      </h1>

      <Card className="bg-white">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">
                  Player Name
                </div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter player's name"
                      className="border border-gray-200 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">
                  Date of Birth
                </div>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      className="border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
                )}
              </div>

              {/* Leagues Field */}
              <div className="space-y-1">
                <Controller
                  name="leagues"
                  control={control}
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full text-black text-left border px-4 py-2 rounded-md bg-white">
                        {selectedLeagues.length > 0
                          ? `Selected: ${selectedLeagues.join(", ")}`
                          : "Select leagues"}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {Leagues.map((league) => (
                          <DropdownMenuCheckboxItem
                            key={league}
                            checked={selectedLeagues.includes(league)}
                            onCheckedChange={() => handleMultiSelectChange(league)}
                          >
                            {league}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                {errors.leagues && (
                  <p className="text-red-500 text-sm">{errors.leagues.message}</p>
                )}
              </div>

              {/* Status Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">
                  Player Status
                </div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
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
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>

              {/* Height Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px] z-10">
                  Height
                </div>
                <div className="relative">
                  <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter height"
                        className="border border-gray-300 px-4 py-3 w-full focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">m</span>
                </div>
                {errors.height && (
                  <p className="text-red-500 text-sm">{errors.height.message}</p>
                )}
              </div>

              {/* Position Field */}
              <div className="space-y-1 relative">
                <div className="block absolute font-medium text-gray-700 bg-white top-[-4px] left-[23px] p-[0px_16px] text-[10px]">
                  Player Position
                </div>
                <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
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
                  )}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                style={{ backgroundColor: '#1976d2', color: 'white' }}
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