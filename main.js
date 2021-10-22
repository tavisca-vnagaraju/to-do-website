let arr = [];
let AddToDo = () =>
{
    let todo = document.getElementById("to-do-name");
    if(todo.value)
    {
        addTableRow(todo.value);
    }
}
let addTableRow = (todoName)=>{
    arr.push(todoName);
    let table = document.getElementById("to-do-table-id");
    table.style.display = "table";
    let noToDo = document.getElementById("no-to-do-message");
    noToDo.style.display = "none";
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
    let name = document.createTextNode(todoName);

    tdDate.appendChild(dateNode);
    tdName.appendChild(name);
    tdEdit.appendChild(editButton);
    tdEdit.appendChild(deleteButton);

    tr.appendChild(tdDate);
    tr.appendChild(tdName);
    tr.appendChild(tdEdit);

    table.appendChild(tr);
}
let deleteElement = (element) => {
    element.parentElement.parentElement.remove();
    let todoName = element.parentElement.previousElementSibling.innerHTML;
    let index = arr.indexOf(todoName);
    arr.splice(index,1);
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
    if(inputText){
        inputTextNode.innerHTML = inputText;
        element.setAttribute("onclick","showTextBox(this)");
        element.innerHTML = "Edit";
    }
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
    let table = document.getElementById("to-do-table-id");
    for (let index = 2; index < table.childNodes.length; index++) {
        let name = table.childNodes[index].childNodes[1].innerHTML;
        if(inputNode.value == name.substr(0,inputNode.value.length)){
            table.childNodes[index].style.display = "table-row";
        }else{
            table.childNodes[index].style.display = "none";
        }
    }
}
let getSpanNode = (text) =>{
    let spanNode = document.createElement("span");
    let spanTextNode = document.createTextNode(text);
    spanNode.appendChild(spanTextNode);
    return spanNode;
}
let onLoad = () =>{
    let table = document.getElementById("to-do-table-id");
    let noToDo = document.getElementById("no-to-do-message");
    if(arr.length>0){
        table.style.display = "table";
        noToDo.style.display = "none";
    }else{
        table.style.display = "none";
    }
}
let addToDoFromApi = ()=>{
    let loading = document.getElementById("loading");
    loading.innerHTML = "";
    let loadingNode = document.createElement("img");
    loadingNode.setAttribute("src","loading.jpg");
    loading.appendChild(loadingNode);
    loading.style.display="block";
    setTimeout(function(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                for(var i=0;i<myObj.length;i++){
                    addTableRow(myObj[i].title);
                }
            }
            loading.style.display="none";
            loading.innerHTML="";
        }
    },2000);
    
}
onLoad();