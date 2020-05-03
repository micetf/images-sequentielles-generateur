import React, { useRef, useEffect } from "react";
import "regenerator-runtime/runtime.js";
const loadFile = async (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (event) => reject(event);
        reader.readAsDataURL(file);
    });

const loadImage = async (src) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
    });

const loadImages = async (images) => {
    const wSequence = document
        .querySelector("#sequence")
        .getBoundingClientRect().width;
    const n = images.length;

    return Promise.all(
        images.map(async (file) => {
            const src = await loadFile(file);
            const img = await loadImage(src);

            const canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = Math.round(wSequence / n) * 0.95;
            canvas.height = Math.round((canvas.width * 297) / 210);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const ratio = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );
            const x = Math.floor(canvas.width - img.width * ratio) / 2;
            const y = Math.floor(canvas.height - img.height * ratio) / 2;
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                x,
                y,
                img.width * ratio,
                img.height * ratio
            );
            return canvas.toDataURL("image/png");
        })
    );
};
export default ({ changeImages, setMessage, setLoading }) => {
    const inputEl = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        inputEl.current.click();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setMessage({ error: false });
        const files = Object.values(e.target.files).filter(({ type }) =>
            type.match(/image.*/)
        );
        changeImages([]);
        if (files.length < 3) {
            setMessage({ error: "Nombre d'images insuffisant (< 3)" });
            return false;
        }
        if (files.length > 12) {
            setMessage({ error: "Nombre d'images excessif (> 12)" });
            return false;
        }
        setLoading("loading");
        loadImages(files).then((images) => {
            changeImages(images);
            setLoading("loaded");
        });
    };
    return (
        <div className="card-header bg-secondary text-light my-2 text-center">
            <h5 className="my-auto">
                Choisir entre 3 et 12 images à ordonner.
                <button className="btn btn-warning ml-2" onClick={handleClick}>
                    Importer les images
                </button>
                <input
                    type="file"
                    ref={inputEl}
                    className="sr-only"
                    onChange={handleChange}
                    multiple
                    accept="image/jpeg, image/png"
                />
            </h5>
        </div>
    );
};
