// #region DOM variables
const content = document.querySelector(".content");
const dialog = document.querySelector("dialog");
const show_modal = document.querySelector("button.show");
//#endregion

let editing = false;

const data = [
    {
        name: "Finish this todo project",
        status: "working",
        date: "29.12.2025T16:52:00",
        id: 786465498464684546846,
    },
];

const formatter = new Intl.DateTimeFormat("ru-RU");

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
            if (!editing) {
                todo.name = nodes.name.value;
                todo.status = nodes.status.value;
                todo.date = nodes.date.value;
                todo.id = Date.now();
                data.push(todo);
                modal.close();
            } else {
                const id = get_id();
                data[id].date = nodes.date.value;
                data[id].name = nodes.name.value;
                data[id].status = nodes.status.value;
                modal.close();
            }
            display_data(data);
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
        const todo = template.querySelector(".todo");
        const name = template.querySelector("[data-name]");
        const status = template.querySelector("[data-status]");
        const date = template.querySelector("[data-date]");
        const edit_btn = template.querySelector(".edit");
        const delete_btn = template.querySelector(".delete");

        return {
            name,
            status,
            date,
            todo,
            edit_btn,
            delete_btn,
        };
    } else {
        return;
    }
}

function get_id(id) {
    return id;
}

function edit_todo(id, node, source) {
    if (!id) return;
    editing = true;
    get_id(id);
    const index = data.findIndex((val) => val.id === id);
    if (source === "select") {
        data[index].status = node.value;
    } else {
        dialog.showModal();
    }
    console.log(data);

    editing = false;
}
function display_data(data) {
    if (!Array.isArray(data) && data.length < 0) return;
    content.innerHTML = "";

    data.forEach((element) => {
        const todo = template.get("#todo_template");
        const nodes = get_nodes(todo, "todo");
        nodes.name.innerHTML = element.name;
        nodes.status.value = element.status;
        nodes.date.innerHTML = formatter.format(element.date.value);
        nodes.todo.setAttribute("data-id", element.id);
        nodes.status.addEventListener("change", () => {
            edit_todo(element.id, nodes.status, "select");
        });
        nodes.edit_btn.addEventListener("click", () => {
            edit_todo(element.id, nodes.status);
        });
        content.append(todo);
    });
}

dialog.append(template.get("#modal_template"));
modal.show(show_modal);
modal.get_data(dialog);
display_data(data);
