import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

function getPosition(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      reject
    );
  });
} 

const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj: Position = await getPosition();
  const position: { latitude: number; longitude: number } = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  console.log("address", address);  
  return { position: { coords: position }, address };
});

interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  position: Position;
  address: string;
  error: string;
}


const initialState: UserState = {
  username: "",
  status: "idle",
  position: {
    coords: {
      latitude: 0,
      longitude: 0
    }
  },
  address: "",
  error: "" ,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
    updateAddress(state, action) {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.position.coords.latitude = action.payload.position.coords.latitude;
      state.position.coords.longitude = action.payload.position.coords.longitude;
      state.address = action.payload.address;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Failed to fetch address";
    });
  },

});

export default userSlice.reducer;

  export const { updateName, updateAddress } = userSlice.actions;
  export { fetchAddress };

