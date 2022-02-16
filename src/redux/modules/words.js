import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadFB = createAsyncThunk("words/loadFB", async (_, thunkAPI) => {
  try {
    const dbData = await getDocs(collection(db, "words"));
    const newWords = [];
    dbData.forEach((word) => {
      newWords.push({ id: word.id, ...word.data() });
    });
    newWords.sort((a, b) => a.timeStamp > b.timeStamp);
    return newWords;
  } catch (err) {
    alert(err);
    return thunkAPI.rejectWithValue(err.response.message);
  }
});

export const createFB = createAsyncThunk(
  "words/createFB",
  async (word, thunkAPI) => {
    try {
      const dbRef = await addDoc(collection(db, "words"), word);
      const _newWord = await getDoc(dbRef);
      const newWord = { id: _newWord.id, ..._newWord.data() };
      return newWord;
    } catch (err) {
      alert(err);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

export const updateFB = createAsyncThunk(
  "words/updateFB",
  async (word, thunkAPI) => {
    try {
      const dbRef = await doc(db, "words", word.id);
      await updateDoc(dbRef, word);
      return word;
    } catch (err) {
      alert(err);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

export const deleteFB = createAsyncThunk(
  "words/deleteFB",
  async (id, thunkAPI) => {
    try {
      const dbRef = await doc(db, "words", id);
      await deleteDoc(dbRef);
      return id;
    } catch (err) {
      alert(err);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

const words = createSlice({
  name: "wordsReducer",
  initialState: {
    words: [],
  },
  extraReducers: {
    [loadFB.pending.type]: (state) => {
      state.status = "loading";
    },
    [loadFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.words = action.payload;
    },
    [loadFB.rejected.type]: (state) => {
      state.status = "failed";
    },
    [createFB.pending.type]: (state) => {
      state.status = "loading";
    },
    [createFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.words.push(action.payload);
    },
    [createFB.rejected.type]: (state) => {
      state.status = "failed";
    },
    [updateFB.pending.type]: (state) => {
      state.status = "loading";
    },
    [updateFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      const index = state.words.findIndex(
        (word) => word.id === action.payload.id
      );
      state.words[index] = action.payload;
    },
    [updateFB.rejected.type]: (state) => {
      state.status = "failed";
    },
    [deleteFB.pending.type]: (state) => {
      state.status = "loading";
    },
    [deleteFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      const index = state.words.findIndex((word) => word.id === action.payload);
      state.words.splice(index, 1);
    },
    [deleteFB.rejected.type]: (state) => {
      state.status = "failed";
    },
  },
});

export default words.reducer;
