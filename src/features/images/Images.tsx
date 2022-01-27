import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchImages, makePermalink, selectAllImages } from "./imagesSlice";

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
                const { id, subreddit, title, url, permalink } = img.data;
                return <li key={id}>
                    <a href={makePermalink(permalink)}>{subreddit}: {title}</a>
                    <ul>
                        <li><img width="720px" src={url}></img></li>
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