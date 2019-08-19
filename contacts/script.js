let input = document.getElementById('input');

input.addEventListener('keyup', search);

function search(e) {
    let text = input.value.toLowerCase();
    let contacts = document.getElementsByClassName('item');
    
    for(let i = 0; i < contacts.length; i++) {
        if(contacts[i].innerHTML.toLocaleLowerCase().indexOf(text) == -1) {
            contacts[i].style.display = 'none';
        }
        else {
            contacts[i].style.display = '';
        }
    }
}