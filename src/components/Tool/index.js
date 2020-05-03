import React, { useEffect, useState } from "react";
import "jquery";
import "jquery-ui";
import "jquery-ui/ui/widgets/sortable";
import "jquery-ui-touch-punch/jquery.ui.touch-punch";
import "jszip/dist/jszip.min";
import saveAs from "file-saver";
import init from "./generateur";

import Uploader from "./Uploader";
import Plateau from "./Plateau";
import Downloader from "./Downloader";
import JSZip from "jszip";
const Tool = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState({ error: false });
    useEffect(() => {
        init();
    }, []);

    const handleChangeImages = setImages;
    const handleSetMessage = setMessage;
    const handleOnLoad = setLoading;
    const handleZipImages = () => {
        const zip = new JSZip();
        const sortedImg = [].slice.call(
            document.querySelectorAll("#sequence img")
        );
        sortedImg.forEach(({ src }, index) => {
            zip.file(
                `image${index.toString().padStart(2, "0")}.png`,
                src.split("base64,")[1],
                {
                    base64: true,
                }
            );
        });
        zip.generateAsync({ type: "blob" }).then((content) =>
            saveAs(content, "images-sequentielles.zip")
        );
    };
    return (
        <div className="card m-2">
            <Uploader
                changeImages={handleChangeImages}
                setMessage={handleSetMessage}
                setLoading={handleOnLoad}
            />
            <Plateau
                images={images}
                setLoading={handleOnLoad}
                loading={loading}
                message={message}
            />
            {loading === "loaded" && <Downloader zipImages={handleZipImages} />}
        </div>
    );
};

export default Tool;
