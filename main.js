// #region DOM variables
const content = document.querySelector(".content");
const dialog = document.querySelector("dialog");
const show_modal = document.querySelector("button.show");
//#endregion

const data = [];

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
    function get_data(template) {
        const nodes = get_nodes(template, "modal");
        const form = template.querySelector("form");

        modal.close(nodes.close);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const todo = {};
            todo.name = nodes.name.value;
            todo.status = nodes.status.value;
            todo.date = nodes.date.value;
            data.push(todo);
            console.log(data);
            return todo;
        });
    }

    return { show, close, get_data };
})();

function get_nodes(template, mode) {
    if (mode === "modal") {
        const name = template.querySelector("#name");
        const name_label = template.querySelector("[for='name']");
        const status = template.querySelector("#status");
        const status_label = template.querySelector("[for='status']");
        const date = template.querySelector("#date");
        const date_label = template.querySelector("[for='date']");
        const close = template.querySelector(".close");
        return {
            name,
            name_label,
            status,
            status_label,
            date,
            date_label,
            close,
        };
    } else if (mode === "todo") {
        const name = template.querySelector("[data-name]");
        const status = template.querySelector("[data-status]");
        const date = template.querySelector("[data-date]");
        return {
            name,
            status,
            date,
        };
    } else {
        return;
    }
}
function display_data(data) {
    if (!Array.isArray(data) && data.length < 0) return;

    data.forEach((element) => {});
}

dialog.append(template.get("#modal_template"));
modal.show(show_modal);
modal.get_data(dialog);
