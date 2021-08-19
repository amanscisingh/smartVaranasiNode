var checkboxes = document.getElementsByClassName("checkbox");
const container = document.getElementById("container");
const topContainer = document.getElementById("top-container");
const bottomContainer = document.getElementById("bottom-container");
var map = document.getElementById('map');
const navigate = document.getElementById("navigate");
const hidden = document.getElementById("hidden");

var s="?";
var cnt=1;
var values = [];
for (i=0; i < checkboxes.length;  i++) {
    if (checkboxes[i].checked) {
        values.push(checkboxes[i].value);
        s+= "id" + String(cnt) + "=" + checkboxes[i].value + "&";
        cnt++;
    }
};
s = s.slice(0, -1);

//creating a custom form
var form = document.createElement("form");
var action = '/admin/route/' + location.pathname.split('/')[3] ;
action += s;
console.log(action);
form.setAttribute("method", "POST");
form.setAttribute("action", action);

const input = document.createElement("input");
input.setAttribute("type", "submit");
input.setAttribute("value", "Create Task");

form.appendChild(input);

setTimeout(()=> {
    bottomContainer.appendChild(form);
    console.log('form created');
}, 1500);