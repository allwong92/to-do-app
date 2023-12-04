
// variables for items in document
// new task
let taskInput = document.getElementById("new-task");

// first button
let addButton = document.getElementById("addButton");

// incomplete-tasks
let incompleteTasks = document.getElementById("incomplete-tasks");

// completed-tasks
let completedTasks = document.getElementById("completed-tasks");

// clear button
let clearButton = document.getElementById("clear");

function toggleLightDarkMode() {
    // alert("You've clicked on the toggle button!");
    var element = document.body;
    element.classList.toggle("dark-mode");

    var inputbox = document.getElementById("new-task");
    inputbox.classList.toggle("input-dark");

    var heading3 = document.getElementById("head3");
    heading3.classList.toggle("h3-dark");
    var heading2 = document.getElementById("head2");
    heading2.classList.toggle("h3-dark");
    var heading1 = document.getElementById("head1");
    heading1.classList.toggle("label-dark");

    var darklight = document.getElementById("darkLight");
    addButton.classList.toggle("button-dark");
    darklight.classList.toggle("button-dark"); // for when it's a button
    clearButton.classList.toggle("button-dark");

    var editButtons = document.getElementsByClassName("edit");
    var deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < editButtons.length; i++){
        editButtons[i].classList.toggle("button-dark");
        deleteButtons[i].classList.toggle("button-dark");
    }

}

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    // select listitems children
    let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    
    // bind editTask to edit button
    editButton.onclick = editTask;

    // bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    // bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

// add to-do
let addTask = function() {
    if (taskInput.value =="") {
        alert("Task to be added should not be empty!");
        return;
    }
    let listItem = createNewTask(taskInput.value);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// create new task

let createNewTask = function(taskName) {
    // create List Item
    let listItem = document.createElement("li");
    // input checkbox
    let checkBox = document.createElement("input");
    // label
    let label = document.createElement("label");
    // input (text)
    let editInput = document.createElement("input");
    // edit button
    let editButton = document.createElement("button");
    // delete button
    let deleteButton = document.createElement("button");

    // Each element needs to be modified
    checkBox.type = "checkBox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    if (document.body.classList.contains("dark-mode")) {
        editButton.classList.toggle("button-dark");
        deleteButton.classList.toggle("button-dark");
    }

    label.innerText = taskName;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// edit task
function editTask(){

    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");

    // if the listItem element contains the editMode class
    if (containsClass) {
        // Switch from .editMode
        // label text become the input's value
        label.innerText = editInput.value;
        this.innerText = "Submit";
        
    } else {
        // Switch to .editMode
        // input value becomes the labels text
        editInput.value = label.innerText;
        this.innerText = "Submit";
    }

    // Toggle .editMode class on and off
    listItem.classList.toggle("editMode")
    this.innerText = "Edit";
}

// delete tasks
let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// mark task as completed
let taskCompleted = function() {
    // When the checkbox is checked
    // Append the task list item to the completed-tasks ul

    let listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// mark task as incomplete
let taskIncomplete = function() {
    // When the Checkbox is unchecked append to incomplete-tasks
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted); 
}

// clear ALL tasks 
let clear = function() {
    incompleteTasks.innerHTML = "";
    completedTasks.innerHTML = "";
}
addButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clear);