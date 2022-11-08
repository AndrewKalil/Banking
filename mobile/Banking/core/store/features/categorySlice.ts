import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../core/models/category.model";
import { Api } from "../../../core/services/api/api";
import { Filter } from "../../../core/models/filter.model";
import { Query } from "../../../core/models/query.model";

interface CategoryState {
  category: Category | null;
  categories: Category[];
  loading: boolean;
  errors: any;
  query: Query;
}

const initialState: CategoryState = {
  category: null,
  categories: [],
  loading: false,
  errors: [],
  query: {
    advFilters: [],
    filters: [],
    detail: false,
    sort: "",
  },
};

const api = new Api<Category>("categories");

// actions
export const getCategories = createAsyncThunk<Category[]>(
  "categories",
  async (_, thunkAPI) => {
    try {
      const res = await api.get();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk<Category, number>(
  "category",
  async (id, thunkAPI) => {
    try {
      const res = await api.getById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk<Category, object>(
  "createCategory",
  async (object, thunkAPI) => {
    try {
      const res = await api.create(object as Category);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: number; data: object }
>("updateCategory", async (data, thunkAPI) => {
  try {
    const res = await api.update(data.id, data.data as Category);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCategory = createAsyncThunk<number, number>(
  "deleteCategory",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(id);
      return res.data as number;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategories = createAsyncThunk<number[], number[]>(
  "deleteCategories",
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
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    postCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    patchCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    removeCategory: (state, action: PayloadAction<number>) => {},
    setAdvCFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, advFilters: action.payload };
    },
    setCFilters: (state, action: PayloadAction<Filter[]>) => {
      state.query = { ...state.query, filters: action.payload };
    },
    resetAdvCFilters: (state) => {
      state.query = { ...state.query, advFilters: [] };
    },
    resetCFilters: (state) => {
      state.query = { ...state.query, filters: [] };
    },
  },
  extraReducers: (builder) => {
    // GET()
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // GET(id)
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.category = payload;
    });
    builder.addCase(getCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // POST()
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = [...state.categories, payload];
      state.category = payload;
    });
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // PATCH()
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = [
        ...state.categories.filter((x) => x.id !== payload.id),
        payload,
      ];
      state.category = payload;
    });
    builder.addCase(updateCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE()
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories.filter((x) => x.id !== payload);
      state.category = null;
    });
    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    // DELETE() Many
    builder.addCase(deleteCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (x) => !payload.includes(x.id)
      );
      state.category = null;
    });
    builder.addCase(deleteCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });
  },
});

export default categorySlice.reducer;
export const {
  setCategories,
  setCategory,
  patchCategory,
  postCategory,
  removeCategory,
  setCFilters,
  resetCFilters,
  resetAdvCFilters,
  setAdvCFilters,
} = categorySlice.actions;
