export default () => {
    $("#sequence").sortable({
        cursor: "move",
        deplacement: 10,
        axis: "x",
        opacity: "0.8",
        tolerance: "pointer",
        scroll: false,
    });
};
