
var itemsList = document.getElementById("items");
var form = document.getElementById("addForm");
var search = document.getElementById("filter");

form.addEventListener('submit', addItem);

itemsList.addEventListener("click", removeItem);
search.addEventListener("keyup", searchItem);

function addItem(e) {
    e.preventDefault();
    var li = document.createElement('li');
    li.className = "list-group-item";
    li.innerText = document.getElementById("item").value;
    var btn = document.createElement('button');
    btn.className = "btn btn-danger btn-sm float-right delete";
    btn.innerText = "X";
    li.appendChild(btn);
    itemsList.appendChild(li);
    item.value = '';
}

function removeItem(e) {
    if(e.target.classList.contains('delete')) {	
	e.target.parentNode.remove();
    }
}


function searchItem(e) {
    var text = search.value.toLowerCase();
    var items = document.getElementsByTagName('li');
    Array.from(items).forEach(function(item) {
	var x = item.innerText.toLowerCase();
	if(x.indexOf(text) !== -1) {
	    item.style.display = 'block';
	}else {
	    item.style.display = 'none';
	}
    });
}
