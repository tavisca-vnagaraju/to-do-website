let AddToDo = () =>
{
    let todo = document.getElementById("to-do-name");
    if(todo.value)
    {
        let table = document.getElementById("to-do-table-id");
        let tr = document.createElement("tr");
        let tdDate = document.createElement("td");
        let tdName = document.createElement("td");
        let tdEdit = document.createElement("td");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        
        let editButtonText = document.createTextNode("Edit");
        editButton.appendChild(editButtonText);
        editButton.classList.add("edit-button");
        editButton.setAttribute("onclick","showTextBox(this)");
        
        let deleteButtonText = document.createTextNode("Delete");
        deleteButton.appendChild(deleteButtonText);
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("onclick","deleteElement(this)");
        
        
        let date = new Date();
        let dateNode = document.createTextNode(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear());
        let name = document.createTextNode(todo.value);
    
        tdDate.appendChild(dateNode);
        tdName.appendChild(name);
        tdEdit.appendChild(editButton);
        tdEdit.appendChild(deleteButton);
    
        tr.appendChild(tdDate);
        tr.appendChild(tdName);
        tr.appendChild(tdEdit);
    
        table.appendChild(tr);
    }
}
let deleteElement = (element) => {
    element.parentElement.parentElement.remove();
}
let getInputTextBox = () => {
    let inputBox = document.createElement("input");
    inputBox.setAttribute("type","text");
    return inputBox;
}
let showTextBox = (element) => {
    let edit = element.parentElement;
    let todoName = element.parentElement.previousElementSibling;
    let inputBox = getInputTextBox();
    inputBox.classList.add("input-box-in-to-do");
    inputBox.setAttribute("value",todoName.innerHTML);
    inputBox.autofocus = true;
    todoName.replaceChild(inputBox,todoName.childNodes[0]);
    
    let saveButton = document.createElement("button");
    let textNode = document.createTextNode("Save");
    saveButton.classList.add("edit-button");
    saveButton.setAttribute("onclick","saveText(this)");
    saveButton.appendChild(textNode);

    edit.replaceChild(saveButton,edit.childNodes[0]);

}
let saveText = (element) => {
    let inputTextNode = element.parentElement.previousElementSibling;
    let inputText = inputTextNode.childNodes[0].value;
    
    inputTextNode.innerHTML = inputText;
    element.setAttribute("onclick","showTextBox(this)");
    element.innerHTML = "Edit";
}
let validateForm = () => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordformat= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    let username = document.forms["login-form"]["username"].value;
    let password = document.forms["login-form"]["password"].value;
    if (username == "") {
      alert("Mail must not be empty");
      return false;
    }
    else if(!username.match(mailformat)){
        alert("unknown mail format");
        return false;
    }
    else if(password == ""){
        alert("Please enter some password");
    }
    else if(!password.match(passwordformat)){
        alert("Weak Password , Password Must Contain atleast one Capital letter, one Small letter, one digit,one special character, length must be between 7 to 15 characters");
    }
}
let searchInput = (inputNode) =>{
    let arr = ["vamsi","naveen","swarnesh","chaitanya","vasi","hello","hello world","hello people","hey"]
    let suggestion_box = document.getElementById("suggestion-box");
    suggestion_box.innerHTML = "";
    let suggestion_array = [];
    if(inputNode){
        for (let index = 0; index < arr.length; index++) {
            if(arr[index].substr(0,inputNode.value.length) == inputNode.value && inputNode.value.length > 0 ){
                suggestion_array.push(arr[index]);
            }
        }
    }
    for (let index = 0; index < suggestion_array.length; index++) {
        suggestion_box.appendChild(getSpanNode(suggestion_array[index]));
        suggestion_box.appendChild(document.createElement("br"));
    }
}
let getSpanNode = (text) =>{
    let spanNode = document.createElement("span");
    let spanTextNode = document.createTextNode(text);
    spanNode.appendChild(spanTextNode);
    return spanNode;
}