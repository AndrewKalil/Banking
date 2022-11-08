import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../../core/models/account.model";
import { Api } from "../../../core/services/api/api";
import { Filter } from "../../../core/models/filter.model";
import { Query } from "../../../core/models/query.model";

interface AccountState {
  account: Account | null;
  accounts: Account[];
  totalBalance: number;
  loading: boolean;
  errors: any;
  query: Query;
}

const initialState: AccountState = {
  account: null,
  accounts: [],
  totalBalance: 0,
  loading: false,
  errors: [],
  query: {
    advFilters: [],
    filters: [],
    detail: false,
    sort: "",
  },
};

const api = new Api<Account>("accounts");

// actions
export const getAccounts = createAsyncThunk<Account[], Query>(
  "accounts",
  async (query, thunkAPI) => {
    try {
      const res = await api.get(query);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAccount = createAsyncThunk<Account, number>(
  "account",
  async (id, thunkAPI) => {
    try {
      const res = await api.getById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAccount = createAsyncThunk<Account, object>(
  "createAccount",
  async (object, thunkAPI) => {
    try {
      const res = await api.create(object as Account);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAccount = createAsyncThunk<
  Account,
  { id: number; data: object }
>("updateAccount", async (data, thunkAPI) => {
  try {
    const res = await api.update(data.id, data.data as Account);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAccount = createAsyncThunk<number, number>(
  "deleteAccount",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(id);
      return res.data as number;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAccounts = createAsyncThunk<number[], number[]>(
  "deleteAccounts",
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
export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
      state.totalBalance = action.payload.reduce(
        (accumulator, account) =>
          accumulator + (!account.isCredit ? account.balance : 0),
        0
      );
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    postAccount: (state, action: PayloadAction<Account>) => {
      state.accounts = [...state.accounts, action.payload];
    },
    patchAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    removeAccount: (state, action: PayloadAction<number>) => {},
    setAdvAcFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, advFilters: action.payload };
    },
    setAcFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, filters: action.payload };
    },
    setAcSort: (state, action: PayloadAction<string>) => {
      state.query = { ...state.query, sort: action.payload };
    },
    resetAdvAcFilters: (state) => {
      state.query = { ...state.query, advFilters: [] };
    },
    resetAcFilters: (state) => {
      state.query = { ...state.query, filters: [] };
    },
  },
  extraReducers: (builder) => {
    // GET()
    builder.addCase(getAccounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = payload;
      state.totalBalance = payload.reduce(
        (accumulator, account) =>
          accumulator + (!account.isCredit ? account.balance : 0),
        0
      );
    });
    builder.addCase(getAccounts.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // GET(id)
    builder.addCase(getAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.account = payload;
    });
    builder.addCase(getAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // POST()
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = [...state.accounts, payload];
      state.account = payload;
    });
    builder.addCase(createAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // PATCH()
    builder.addCase(updateAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
      const index = state.accounts.findIndex((x) => x.id === payload.id);
      const tempState = state.accounts;
      tempState[index] = payload;
      state.loading = false;
      state.accounts = tempState;
      state.account = payload;
    });
    builder.addCase(updateAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE()
    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = state.accounts.filter((x) => x.id !== payload);
      state.account = null;
    });
    builder.addCase(deleteAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE() Many
    builder.addCase(deleteAccounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = state.accounts.filter((x) => !payload.includes(x.id));
      state.account = null;
    });
    builder.addCase(deleteAccounts.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });
  },
});

export default accountSlice.reducer;
export const {
  setAccounts,
  setAccount,
  patchAccount,
  postAccount,
  removeAccount,
  setAcFilters,
  setAcSort,
  resetAcFilters,
  resetAdvAcFilters,
  setAdvAcFilters,
} = accountSlice.actions;
