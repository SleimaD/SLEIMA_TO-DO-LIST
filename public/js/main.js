//todolist

document.addEventListener('DOMContentLoaded', () => {

    //? Get elements from the DOM
    let input = document.querySelector("#newtask");
    let form = document.querySelector("#form");
    let list = document.querySelector("#tasks");
    let tous = document.querySelector("#tous");
    let enCours = document.querySelector("#enCours");
    let fini = document.querySelector("#finies");
    let currentFilter = "tous";
    let taskInput;


    //? Add click event listeners to the filter buttons
    tous.addEventListener('click', () => {
        applyFilter("tous");
    });

    enCours.addEventListener('click', () => {
        applyFilter("enCours");
    });

    fini.addEventListener('click', () => {
        applyFilter("finies");
    });


    //? Apply the selected filter
    function applyFilter(filter) {
        currentFilter = filter;
        refresh();
    }


    //? Refresh the list of tasks based on the current filter
    function refresh() {
        let tasks = document.querySelectorAll(".task");
        tasks.forEach(task => {
            task.style.display = "flex";

            switch (currentFilter) {
                case "enCours":
                    if (task.classList.contains("finished")) {
                        task.style.display = "none";
                    }
                    break;
                case "finies":
                    if (!task.classList.contains("finished")) {
                        task.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        });
    }


        //? Handle click events on the task list
    list.addEventListener('click', (event) => {
        let targetButton = event.target;
        let task = targetButton.closest(".task");


        //? validate a task
        if (targetButton.classList.contains('valid')) {
            task.classList.toggle('finished');
            if (task.classList.contains('finished')) {
                targetButton.innerText = 'RETOUR';
            } else {
                targetButton.innerText = 'VALIDER';
            }
            
            refresh();
        }


        //? edit a taask
        if (targetButton.classList.contains('edit')) {
            taskInput = task.querySelector('.text');
            taskInput.removeAttribute('readonly');
            targetButton.innerText = 'MODIFIER';
            
        }


        //? save changes made to a task
        if (targetButton.classList.contains('save')) {
            taskInput.setAttribute("readonly", "readonly");
            targetButton.innerText = 'MODIFIER';
            targetButton.classList.remove('save');
            task.classList.add('finished');
            refresh();
        }

        //? delete a task
        if (targetButton.classList.contains('delete')) {
            let confirmDelete = confirm("Voulez-vous vraiment supprimer cette tâche?");
            if (confirmDelete) {
                list.removeChild(tache);
            } else {
                return
            }
           
        }
        

    });


    //? form submission
    form.addEventListener('submit', (event) => {
        let task = input.value.trim();

        //? check if task name is empty
        if (task === "") {
            alert("Veuillez entrer une tâche !");
            event.preventDefault();
            return;
        }


        //? Create new task element
        let tache = document.createElement('div');
        tache.classList.add('task');

        let taskContent = document.createElement('div');
        taskContent.classList.add('content');

        tache.appendChild(taskContent);

        taskInput = document.createElement('input');
        taskInput.classList.add('text');
        taskInput.type = 'text';
        taskInput.value = task;
        taskInput.setAttribute('readonly', 'readonly');

        taskContent.appendChild(taskInput);

        let mouv = document.createElement('div');
        mouv.classList.add('actions');

        let valid = document.createElement('button');
        valid.classList.add('valid');
        valid.innerText = 'VALIDER';

        let edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerText = 'MODIFIER';

        let deleter = document.createElement('button');
        deleter.classList.add('delete');
        deleter.innerText = 'SUPPRIMER';

        let save = document.createElement('button');
        save.classList.add('save');
        save.innerText = 'Save';
        save.style.display = 'none';

        mouv.appendChild(valid);
        mouv.appendChild(edit);
        mouv.appendChild(deleter);
        mouv.appendChild(save);

        tache.appendChild(mouv);

        list.appendChild(tache);

        input.value = '';

    
        //? click events on the edit button
        edit.addEventListener('click', (e) => {
            if (edit.innerText.toLowerCase() == "edit") {
                edit.innerText = "MODIFIER";
                taskInput.removeAttribute("readonly");
                taskInput.focus();

            } else {
                edit.innerText = "MODIFIER";
                taskInput.setAttribute("readonly", "readonly");
            }
        });


        //? click events on the delete button
        deleter.addEventListener('click', (e) => {
            list.removeChild(tache)
            refresh();
            
        });


        //? click events on the valid button
        valid.addEventListener('click', () => {
            taskInput.setAttribute("readonly", "readonly");
            refresh();
        });

        event.preventDefault();
    });
});


