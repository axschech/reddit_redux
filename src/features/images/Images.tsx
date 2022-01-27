import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchImages, selectAllImages } from "./imagesSlice";

export const Images = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch]);

    const { images, status } = useSelector((state: RootState) => {
        const i = selectAllImages(state);

        // this is probably the wrong way to use use selector???
        return {
            images: i.map(img => {
                return <li key={img.data.id}>
                    {img.data.subreddit}: {img.data.title}
                    <ul>
                        <li><img width="720px" src={img.data.url}></img></li>
                    </ul>
                </li>;
            }), status: state.images.status
        }
    });

    return (
        <div>
            {status === 'succeeded' ? <ul>
                {images}
            </ul> : 'loading'}
        </div>
    )
}