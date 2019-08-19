class UI {
    static display_tasks() {
        let tasks = Store.get_tasks();

        for (let i of tasks) {
            UI.add_task(i.task, i.date, i.check);
            
        }
    }

    static add_task(task, date, check='') {
        var tr = document.createElement('tr')
        tr.innerHTML = `<td>${task}</td>
                        <td>${date}</td>
                        <td> <input type="checkbox" class="check" ${check}></td>
                        <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
        if(check == 'checked') {
            tr.getElementsByTagName('td')[0].style.textDecoration = "line-through green";
        }
        document.getElementById('todo-list').appendChild(tr);
    }

    static delete_task(e) {
        e.target.parentNode.parentNode.remove();
        UI.show_alert('task deleted', 'danger')
    }

    static check_task(e) {
        var row = e.target.parentNode.parentNode;
        if (e.target.checked) {
            row.firstChild.style.textDecoration = "line-through green";
            UI.show_alert('Good job', 'success');
        } else {
            row.firstChild.style.textDecoration = "none";
        }
    }

    static show_alert(message, type) {
        var div = document.createElement('div');
        div.className = `alert alert-${type}`;
        div.innerHTML = message;
        var form = document.getElementById('todo-form');
        document.querySelector('body .container').insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}


class Store {
    static get_tasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static add_task(task) {
        var tasks = Store.get_tasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static delete_task(task, date) {
        var tasks = Store.get_tasks();
        tasks.forEach((element, index) => {
            if (element['task'] === task && element['date'] == date) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static check_task(task, date, e) {
        var tasks = Store.get_tasks();
        
        tasks.forEach((element) => {
            if (element['task'] === task && element['date'] == date) {
                if(e.target.checked) element['check'] = 'checked';
                else element['check'] = '';
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
    }
}


document.getElementById("todo-form").addEventListener('submit', (e) => {
    e.preventDefault();
    var task = document.getElementById('task');
    var date = document.getElementById('date');

    if (task.value === '' || date.value == '') {
        alert('please Enter date and task');
    } else {
        UI.add_task(task.value, date.value);
        Store.add_task({
            task: task.value,
            date: date.value,
            check: ''
        });
        task.value = '';
        date.value = '';
    }
});

document.getElementById("todo-list").addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        UI.delete_task(e);
        var row = e.target.parentNode.parentNode.getElementsByTagName('td');
        Store.delete_task(row[0].textContent, row[1].textContent);
    }
    if (e.target.classList.contains('check')) {
        UI.check_task(e);
        var row = e.target.parentNode.parentNode.getElementsByTagName('td');
        Store.check_task(row[0].textContent, row[1].textContent, e);
    }
});

UI.display_tasks();
console.log(Store.get_tasks());
