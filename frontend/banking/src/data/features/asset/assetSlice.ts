import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "../../../core/models/asset.model";
import { Api } from "../../../core/services/api/api";
import { Query } from "../../../core/models/query.model";
import { Filter } from "../../../core/models/filter.model";

interface AssetState {
  asset: Asset | null;
  assets: Asset[];
  loading: boolean;
  errors: any;
  query: Query;
}

const initialState: AssetState = {
  asset: null,
  assets: [],
  loading: false,
  errors: [],
  query: {
    filters: [],
    advFilters: [],
    detail: false,
    sort: "expenseDate desc",
  },
};

const api = new Api<Asset>("assets");

// actions
export const getAssets = createAsyncThunk<Asset[], Query>(
  "assets",
  async (query, thunkAPI) => {
    try {
      const res = await api.get(query);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsset = createAsyncThunk<Asset, number>(
  "asset",
  async (id, thunkAPI) => {
    try {
      const res = await api.getById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAsset = createAsyncThunk<Asset, object>(
  "createAsset",
  async (object, thunkAPI) => {
    try {
      const res = await api.create(object as Asset);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAsset = createAsyncThunk<
  Asset,
  { id: number; data: object }
>("updateAsset", async (data, thunkAPI) => {
  try {
    const res = await api.update(data.id, data.data as Asset);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAsset = createAsyncThunk<number, number>(
  "deleteAsset",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(id);
      return res.data as number;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAssets = createAsyncThunk<number[], number[]>(
  "deleteAssets",
  async (ids, thunkAPI) => {
    try {
      const res = await api.deleteMany(ids);
      return res.data as number[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// reducers
export const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    setAsset: (state, action: PayloadAction<Asset>) => {
      state.asset = action.payload;
    },
    postAsset: (state, action: PayloadAction<Asset>) => {
      state.assets = [...state.assets, action.payload];
    },
    patchAsset: (state, action: PayloadAction<Asset>) => {
      state.asset = action.payload;
    },
    removeAsset: (state, action: PayloadAction<string>) => {},
    setAdvAFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, advFilters: action.payload };
    },
    setAFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, filters: action.payload };
    },
    setASort: (state, action: PayloadAction<string>) => {
      state.query = { ...state.query, sort: action.payload };
    },
    resetAdvAFilters: (state) => {
      state.query = { ...state.query, advFilters: [] };
    },
    resetAFilters: (state) => {
      state.query = { ...state.query, filters: [] };
    },
  },
  extraReducers: (builder) => {
    // GET()
    builder.addCase(getAssets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAssets.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.assets = payload;
    });
    builder.addCase(getAssets.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // GET(id)
    builder.addCase(getAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAsset.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.asset = payload;
    });
    builder.addCase(getAsset.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // POST()
    builder.addCase(createAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAsset.fulfilled, (state, { payload }) => {
      let tempQuery = state.query;
      state.query = {} as Query;
      state.loading = false;
      // state.assets = [...state.assets, payload];
      state.asset = payload;
      state.query = { ...tempQuery };
    });
    builder.addCase(createAsset.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // PATCH()
    builder.addCase(updateAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAsset.fulfilled, (state, { payload }) => {
      const index = state.assets.findIndex((x) => x.id === payload.id);
      const tempState = state.assets;
      tempState[index] = payload;
      state.loading = false;
      state.assets = tempState;
      state.asset = payload;
    });
    builder.addCase(updateAsset.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE()
    builder.addCase(deleteAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAsset.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.assets = state.assets.filter((x) => x.id !== payload);
      state.asset = null;
    });
    builder.addCase(deleteAsset.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE() Many
    builder.addCase(deleteAssets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAssets.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.assets = state.assets.filter((x) => !payload.includes(x.id));
      state.asset = null;
    });
    builder.addCase(deleteAssets.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });
  },
});

export default assetSlice.reducer;
export const {
  setAssets,
  setAsset,
  patchAsset,
  postAsset,
  removeAsset,
  setAdvAFilters,
  setASort,
  resetAdvAFilters,
  resetAFilters,
  setAFilters,
} = assetSlice.actions;
