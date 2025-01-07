// reducer.js
import { ADD_USER, DELETE_USER, UPDATE_USER } from './actionType';

const users = [
    {
      id: 1,
      name: "Lionel Messi",
      dateOfBirth: "1987-06-24",
      leagues: ["LaLiga", "League 1", "League 2"],
      status: "Active",
      height: "1.70 m",
      position: "Forward",
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      dateOfBirth: "1985-02-05",
      leagues: ["LaLiga", "League 1"],
      status: "Active",
      height: "1.87 m",
      position: "Forward",
    },
    {
      id: 3,
      name: "Thierry Henry",
      dateOfBirth: "1977-08-17",
      leagues: ["League 1"],
      status: "Retired",
      height: "1.87 m",
      position: "Forward",
    },
    {
      id: 4,
      name: "Zinedine Zidane",
      dateOfBirth: "1972-06-23",
      leagues: ["League 2"],
      status: "Retired",
      height: "1.87 m",
      position: "Mid-fielder",
    },
    {
      id: 5,
      name: "Luka Modric",
      dateOfBirth: "1985-09-09",
      leagues: ["League 1", "League 2"],
      status: "Active",
      height: "1.87 m",
      position: "Forward",
    },
  ];
  

const initialState = {
  players: users,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      const nextId = state.players.length > 0 ? Math.max(...state.players.map(user => user.id)) + 1 : 1;
      const newUser = { ...action.payload, id: nextId }; // Add the auto-incremented id to the new user
      return {
        ...state,
        players: [...state.players, newUser], // Add the new user to the state
      };
    }

    case UPDATE_USER: {
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.playerId
            ? { ...player, ...action.payload.updatedPlayer }
            : player
        ),
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
