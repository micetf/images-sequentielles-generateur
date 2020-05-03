import React from "react";

export default ({ zipImages }) => (
    <div className="card-footer bg-dark text-light text-center">
        <h5 className="text-center">
            Placer ces images dans l'ordre chronologique{" "}
            <button className="btn btn-success" onClick={zipImages}>
                Générer l'archive
            </button>
        </h5>
    </div>
);
