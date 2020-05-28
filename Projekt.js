let setID = 0;

function newTodo() {
    let todo = document.querySelector(".new-todo").value;
    if (todo === "") {
        todo = "";
    }
    else {
    const ul = document.querySelector(".todo-list");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const checkLabel = document.createElement("label");
    const button = document.createElement("button");

    ul.appendChild(li);
    li.appendChild(div);
    li.setAttribute("class", "task");

    div.setAttribute("class", "list-div");
    div.appendChild(input);
    div.appendChild(checkLabel);
    input.setAttribute("class", "checkbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "input-check-" + setID++);
    
    checkLabel.setAttribute("id", "checkLabel");
    checkLabel.setAttribute("class", "needToBeDone");
    checkLabel.htmlFor = "input-check-" + (setID-1);
    
    div.appendChild(label);
    label.setAttribute("class", "taskLabel");

    div.appendChild(button);
    button.setAttribute("class", "xButton");
    button.appendChild(document.createTextNode("X"));
    label.appendChild(document.createTextNode(todo));

    if (ul.childElementCount === 1) {
        const arrow = document.querySelector(".arrow");
        const p = document.createElement("p");
        arrow.appendChild(p);
        p.setAttribute("class", "text-arrow");
        p.appendChild(document.createTextNode("❯"));

        const footerDiv = document.querySelector(".footer-div");
        const listFooter = document.createElement("footer");

        const span = document.createElement("span");
        const linkSpan = document.createElement("span");
        const clearCompletedButton = document.createElement("button");
        const a1 = document.createElement("a");
        const a2 = document.createElement("a");
        const a3 = document.createElement("a");

        footerDiv.appendChild(listFooter);
        listFooter.setAttribute("class", "list-footer");
        listFooter.appendChild(span);

        span.setAttribute("class", "counter");

        listFooter.appendChild(linkSpan);
        linkSpan.setAttribute("class", "links");

        listFooter.appendChild(clearCompletedButton);
        clearCompletedButton.appendChild(document.createTextNode("Clear completed"));
        clearCompletedButton.setAttribute("class", "clearButton");

        linkSpan.appendChild(a1);
        linkSpan.appendChild(a2);
        linkSpan.appendChild(a3);
        a1.href = "#/All";
        a2.href = "#/Active";
        a3.href = "#/Completed";
        a1.appendChild(document.createTextNode("All"));
        a2.appendChild(document.createTextNode("Active"));
        a3.appendChild(document.createTextNode("Completed"));
    };

    button.onclick = event => {
        li.remove();
        if (ul.childElementCount === 0) {
        const listFooter = document.querySelector(".list-footer");
        listFooter.remove();
        const textArrow = document.querySelector(".text-arrow");
        textArrow.remove();
        }
    };
    /*Mark all todos as completed, not done*/
    const arrow = document.querySelector(".arrow");
    arrow.onclick = event => {
        const allInputs = document.querySelectorAll("#checkLabel");
        allInputs.forEach(input => {
            input.checked = true;
            if (input.checked) {
                input.className = "completed";
                }
            });
}

    input.onclick = event => {
        if (input.checked) {
            checkLabel.className = "completed";
        }
        else {
            checkLabel.className = "needToBeDone";
        }
    }
    /*Clear all completed todos by clicking the button "Clear completed"*/
    const clearCompletedButton = document.querySelector(".clearButton");
    clearCompletedButton.onclick = event => {
        const completedTodos = document.querySelectorAll(".completed");
        completedTodos.forEach(todo => {
            todo.parentElement.parentElement.remove();
            
        });
        if (ul.childElementCount === 0) {
            const listFooter = document.querySelector(".list-footer");
            listFooter.remove();
            const textArrow = document.querySelector(".text-arrow");
            textArrow.remove();
        }
        }
    /*Filter todos*/
    const active = document.querySelector("a[href='#/Active']");
    const completed = document.querySelector("a[href='#/Completed']")
    const all = document.querySelector("a[href='#/All']");
    const taskList = document.querySelectorAll("#checkLabel");
    active.onclick = event => {
        taskList.forEach(task => {
            if (task.classList.contains("completed")) {
                task.parentElement.parentElement.style.display = "none";
            }
            if (task.classList.contains("needToBeDone")) {
                task.parentElement.parentElement.style.display = "";
                location.hash = "#/Active";
            }
        });
    }
    completed.onclick = event => {
        taskList.forEach(task => {
            if (task.classList.contains("needToBeDone")) {
                task.parentElement.parentElement.style.display = "none";
            }
            if (task.classList.contains("completed")) {
                task.parentElement.parentElement.style.display = "";
                location.hash = "#/Completed";
            }
        });
    }
    all.onclick = event => {
        taskList.forEach(task => {
            if (task.classList.contains("needToBeDone") || task.classList.contains("completed")) {
                task.parentElement.parentElement.style.display = "";
                location.hash = "#/All";
            }
        });
    }
}
/*Editing todos, not complete
    const taskLabel = document.querySelector(".taskLabel");
    taskLabel.ondblclick = event => {
        taskLabel.forEach(task => {
            
            li.setAttribute("class", "editTask");
            console.log("hej");
        });
    }
    }
*/

    document.querySelector(".new-todo").value = "";
}
document.body.onkeyup = function(e) {
    if (e.keyCode === 13) {
        newTodo();
    }
};

