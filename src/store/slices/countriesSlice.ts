//src/store/slices/countriesSlice.ts
import api from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: { svg: string; png: string; alt?: string };
  cca3: string;
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
};

export const fetchAllCountries = createAsyncThunk<Country[]>('countries/fetchAll', async () => {
  const fields = [
    'name',
    'flags',
    'cca3',
    'region',
    'subregion',
    'capital',
    'population',
    'currencies',
    'languages',
    'borders',
  ].join(',');
  const { data } = await api.get<Country[]>(`/all?fields=${fields}`);
  return data;
});

export const fetchCountryByCode = createAsyncThunk<Country, string>(
  'countries/fetchByCode',
  async (code: string) => {
    const fields = [
      'name',
      'flags',
      'cca3',
      'region',
      'subregion',
      'capital',
      'population',
      'currencies',
      'languages',
      'borders',
    ].join(',');
    const { data } = await api.get<Country[] | Country>(`/alpha/${code}?fields=${fields}`);
    // API may return an array with a single item; normalize it.
    const item = Array.isArray(data) ? data[0] : data;
    return item as Country;
  }
);

interface CountriesState {
  items: Country[];
  byCode: Record<string, Country | undefined>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  individualCountryStatus: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>;
  error?: string;
}

const initialState: CountriesState = {
  items: [],
  byCode: {},
  status: 'idle',
  individualCountryStatus: {},
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        for (const c of action.payload) {
          state.byCode[c.cca3] = c;
          state.individualCountryStatus[c.cca3] = 'succeeded';
        }
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load countries';
      })
      .addCase(fetchCountryByCode.pending, (state, action) => {
        const code = action.meta.arg;
        state.individualCountryStatus[code] = 'loading';
      })
      .addCase(fetchCountryByCode.fulfilled, (state, action: PayloadAction<Country>) => {
        const c = action.payload;
        state.byCode[c.cca3] = c;
        state.individualCountryStatus[c.cca3] = 'succeeded';
        // Also add to items array if not already there
        if (!state.items.find((item) => item.cca3 === c.cca3)) {
          state.items.push(c);
        }
      })
      .addCase(fetchCountryByCode.rejected, (state, action) => {
        const code = action.meta.arg;
        state.individualCountryStatus[code] = 'failed';
      });
  },
});

export default countriesSlice.reducer;
