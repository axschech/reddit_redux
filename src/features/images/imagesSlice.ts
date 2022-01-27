import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const BASE_URL = "https://www.reddit.com/user/axschech/m/sfwporn/hot.json?limit=1000";

const BASE_REDDIT_URL = 'https://reddit.com'

export interface Data {
    data: Image
}

export interface Image {
    title: string;
    url: string;
    id: string;
    author: string;
    subreddit: string;
    permalink: string;
}

// should this be done in selector?
export const makePermalink = (url: string): string => {
    return `${BASE_REDDIT_URL}${url}`;
}

// should i be doing this???
export const imagesAdapter = createEntityAdapter<Data>({
    selectId: (data => data.data.id)
});

export const initialState = imagesAdapter.getInitialState({
    status: 'idle'
});

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
    const result = await fetch(BASE_URL);

    return await result.json();
});

export const {
    selectAll: selectAllImages
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            imagesAdapter.upsertMany(state, action.payload.data.children);
        }).addCase(fetchImages.pending, (state) => {
            state.status = 'loading';
        });
    }
});

export default imagesSlice.reducer;