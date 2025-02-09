import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchtarif = createAsyncThunk("tarif/tarifs", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/sessionTarif`);
  return response.data;
});
export const CreateFeature = createAsyncThunk(
  "features/Createfeatures",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/features`, body);
    dispatch(fetchFeatures());

    return response.data;
  }
);
export const fetchFeatures = createAsyncThunk("features/features", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/features`);
console.log("fff",response.data);
  return response.data;
});

export const deleteFeatures = createAsyncThunk(
  "features/deletefeatures",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/features/${id}`
    );
    dispatch(fetchFeatures());
    return response.data;
  }
);

export const editFeature = createAsyncThunk(
  "features/editfeatures",
  async (args, { dispatch }) => {
    const { id,...body } = args;
    console.log("argsss", args);
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.patch(
      `${config.API_ENDPOINT}/features/${id}`,
      body,
      configs
    );
    console.log("args",args);

    dispatch(fetchFeatures());
console.log("resres",response.data);
    return response.data;
  }
);

export const fetchOneTarif = createAsyncThunk("tarif/tarif", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/sessionTarif/${id}`);
  return response.data;
});

export const delettarif = createAsyncThunk(
  "tarif/edittarifs",
  async (id, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokentarif"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/sessionTarif/${id}`,
      configs
    );
    dispatch(fetchtarif());
    return response.data;
  }
);

export const editTarif = createAsyncThunk(
  "tarif/Updtarifs",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    console.log("argsss", args);
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.patch(
      `${config.API_ENDPOINT}/sessionTarif/${id}`,
      body,
      configs
    );
    console.log("body", body);
    dispatch(fetchtarif(id));
    return response.data;
  }
);
export const CreateNeswTarif = createAsyncThunk(
  "tarif/addtarifs",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/sessionTarif`,
      body
    );
    dispatch(fetchtarif());
    return response.data;
  }
);

export const tarifSlice = createSlice({
  name: "tarifs",
  initialState: {
    tarif: null,
    tarifs: {
      items: [],
      count: 0,
    },
    features: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchtarif.fulfilled, (state, action) => {
      state.tarifs.items = action.payload;
    });
    builder.addCase(fetchOneTarif.fulfilled, (state, action) => {
      state.tarif = action.payload;
    });
    builder.addCase(fetchFeatures.fulfilled, (state, action) => {
      state.features.items = action.payload;
    });
  },
});
export default tarifSlice.reducer;
