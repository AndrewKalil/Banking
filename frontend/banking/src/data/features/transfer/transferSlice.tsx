import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transfer } from "../../../core/models/transfer.model";
import { Api } from "../../../core/services/api/api";
import { Query } from "../../../core/models/query.model";
import { Filter } from "../../../core/models/filter.model";

interface TransferState {
  transfer: Transfer | null;
  transfers: Transfer[];
  loading: boolean;
  errors: any;
  query: Query;
}

const initialState: TransferState = {
  transfer: null,
  transfers: [],
  loading: false,
  errors: [],
  query: {
    filters: [],
    advFilters: [],
    detail: false,
    sort: "expenseDate desc",
  },
};

const api = new Api<Transfer>("transfers");

// actions
export const getTransfers = createAsyncThunk<Transfer[], Query>(
  "transfers",
  async (query, thunkAPI) => {
    try {
      const res = await api.get(query);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransfer = createAsyncThunk<Transfer, number>(
  "transfer",
  async (id, thunkAPI) => {
    try {
      const res = await api.getById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTransfer = createAsyncThunk<Transfer, object>(
  "createTransfer",
  async (object, thunkAPI) => {
    try {
      const res = await api.create(object as Transfer);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransfer = createAsyncThunk<
  Transfer,
  { id: number; data: object }
>("updateTransfer", async (data, thunkAPI) => {
  try {
    const res = await api.update(data.id, data.data as Transfer);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteTransfer = createAsyncThunk<number, number>(
  "deleteTransfer",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(id);
      return res.data as number;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTransfers = createAsyncThunk<number[], number[]>(
  "deleteTransfers",
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
export const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    setTransfers: (state, action: PayloadAction<Transfer[]>) => {
      state.transfers = action.payload;
    },
    setTransfer: (state, action: PayloadAction<Transfer>) => {
      state.transfer = action.payload;
    },
    postTransfer: (state, action: PayloadAction<Transfer>) => {
      state.transfers = [...state.transfers, action.payload];
    },
    patchTransfer: (state, action: PayloadAction<Transfer>) => {
      state.transfer = action.payload;
    },
    removeTransfer: (state, action: PayloadAction<string>) => {},
    setAdvAFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, advFilters: action.payload };
    },
    setTFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, filters: action.payload };
    },
    setTSort: (state, action: PayloadAction<string>) => {
      state.query = { ...state.query, sort: action.payload };
    },
    resetAdvTFilters: (state) => {
      state.query = { ...state.query, advFilters: [] };
    },
    resetTFilters: (state) => {
      state.query = { ...state.query, filters: [] };
    },
  },
  extraReducers: (builder) => {
    // GET()
    builder.addCase(getTransfers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransfers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transfers = payload;
    });
    builder.addCase(getTransfers.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // GET(id)
    builder.addCase(getTransfer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransfer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transfer = payload;
    });
    builder.addCase(getTransfer.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // POST()
    builder.addCase(createTransfer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTransfer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transfers = [...state.transfers, payload];
      state.transfer = payload;
    });
    builder.addCase(createTransfer.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // PATCH()
    builder.addCase(updateTransfer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTransfer.fulfilled, (state, { payload }) => {
      const index = state.transfers.findIndex((x) => x.id === payload.id);
      const tempState = state.transfers;
      tempState[index] = payload;
      state.loading = false;
      state.transfers = tempState;
      state.transfer = payload;
    });
    builder.addCase(updateTransfer.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE()
    builder.addCase(deleteTransfer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTransfer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transfers = state.transfers.filter((x) => x.id !== payload);
      state.transfer = null;
    });
    builder.addCase(deleteTransfer.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE() Many
    builder.addCase(deleteTransfers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTransfers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transfers = state.transfers.filter((x) => !payload.includes(x.id));
      state.transfer = null;
    });
    builder.addCase(deleteTransfers.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });
  },
});

export default transferSlice.reducer;
export const {
  setTransfers,
  setTransfer,
  patchTransfer,
  postTransfer,
  removeTransfer,
  setAdvAFilters,
  setTSort,
  resetAdvTFilters,
  resetTFilters,
  setTFilters,
} = transferSlice.actions;
