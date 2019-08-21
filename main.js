searchInput();
function AddToDo()
{
    var todo = document.getElementById("to-do-name");
    if(todo.value)
    {
        var table = document.getElementById("to-do-table-id");
        var tr = document.createElement("tr");
        var tdDate = document.createElement("td");
        var tdName = document.createElement("td");
        var tdEdit = document.createElement("td");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        
        var editButtonText = document.createTextNode("Edit");
        editButton.appendChild(editButtonText);
        editButton.classList.add("edit-button");
        editButton.setAttribute("onclick","showTextBox(this)");
        
        var deleteButtonText = document.createTextNode("Delete");
        deleteButton.appendChild(deleteButtonText);
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("onclick","deleteElement(this)");
        
        
        var date = new Date();
        var dateNode = document.createTextNode(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear());
        var name = document.createTextNode(todo.value);
    
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
function deleteElement(element){
    element.parentElement.parentElement.remove();
}
function getInputTextBox(){
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type","text");
    return inputBox;
}
function showTextBox(element){
    var edit = element.parentElement;
    var todoName = element.parentElement.previousElementSibling;
    var inputBox = getInputTextBox();
    inputBox.setAttribute("value",todoName.innerHTML);
    todoName.replaceChild(inputBox,todoName.childNodes[0]);
    
    var saveButton = document.createElement("button");
    var textNode = document.createTextNode("Save");
    saveButton.classList.add("edit-button");
    saveButton.setAttribute("onclick","saveText(this)");
    saveButton.appendChild(textNode);

    edit.replaceChild(saveButton,edit.childNodes[0]);

}
function saveText(element){
    var inputTextNode = element.parentElement.previousElementSibling;
    var inputText = inputTextNode.childNodes[0].value;
    
    inputTextNode.innerHTML = inputText;
    element.setAttribute("onclick","showTextBox(this)");
    element.innerHTML = "Edit";
}
function validateForm() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordformat= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    var username = document.forms["login-form"]["username"].value;
    var password = document.forms["login-form"]["password"].value;
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
function searchInput(inputNode){
    var arr = ["vamsi","naveen","swarnesh","chaitanya","vasi","hello","hello world","hello people","hey"]
    var suggestion_box = document.getElementById("suggestion-box");
    suggestion_box.innerHTML = "";
    var suggestion_array = [];
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
function getSpanNode(text){
    var spanNode = document.createElement("span");
    var spanTextNode = document.createTextNode(text);
    spanNode.appendChild(spanTextNode);
    return spanNode;
}