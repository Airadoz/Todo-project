// #region DOM variables
const content = document.querySelector(".content");
const dialog = document.querySelector("dialog");
const show_modal = document.querySelector("button.show");
//#endregion

const template = (() => {
    function get(temp) {
        if (!temp && typeof temp !== "string") return;
        const template_node = document.querySelector(temp);
        const clone = template_node.content.cloneNode(true);
        return clone;
    }

    return { get };
})();
const modal = (() => {
    const temp = template.get("#modal");

    function show(e) {
        e.addEventListener("click", () => {
            dialog.showModal();
        });
    }
    function close(e) {
        e.addEventListener("click", () => {
            dialog.close();
        });
    }

    return { show, close };
})();
