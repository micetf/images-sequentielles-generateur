import React from "react";

const renderImage = (src, index) => {
    return (
        <div key={index}>
            <img className="my-2" src={src} />
        </div>
    );
};

const renderInfo = (info) => (txt) => (
    <div className="d-flex flex-column justify-content-center h300">
        {info(txt)}
    </div>
);

const message = (error) => (
    <h5 className="bg-danger text-light p-2">{error}</h5>
);

const spinner = () => (
    <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>;
    </div>
);

export default ({ images, loading, message: { error } }) => {
    return (
        <div className="card-body m-2" id="tri">
            <div
                className="d-flex flex-row justify-content-around align-items-stretch mx-auto my-2 text-center"
                id="sequence"
            >
                {loading === "loading" ? (
                    renderInfo(spinner)()
                ) : error ? (
                    renderInfo(message)(error)
                ) : loading === "loaded" ? (
                    images.map(renderImage)
                ) : (
                    <div className="h300"></div>
                )}
            </div>
        </div>
    );
};
