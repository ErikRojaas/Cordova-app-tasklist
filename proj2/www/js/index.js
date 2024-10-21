$(function() {
    var dialog, editDialog, form, editForm, taskName, editTaskName, currentTask;

    taskName = $("#task-name");
    editTaskName = $("#edit-task-name");

    // Funció per carregar tasques del Local Storage
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem("tasklist")) || [];

        // Si no hi ha tasques al Local Storage, afegim les tasques predeterminades només un cop
        if (tasks.length === 0) {
            tasks = ["FER LA COMPRA", "ACABAR EXERCICI TASKLIST", "TRUCAR AL METGE"];
            localStorage.setItem("tasklist", JSON.stringify(tasks)); // Desa les tasques predeterminades
        }

        // Afegeix les tasques desades al Local Storage al DOM
        tasks.forEach(function(task) {
            addTaskToDOM(task);
        });
    }

    // Funció per desar la llista de tasques al Local Storage
    function saveTasks() {
        var tasks = [];
        $("#tasklist li").each(function() {
            tasks.push($(this).find(".task-text").text());
        });
        localStorage.setItem("tasklist", JSON.stringify(tasks));
    }

    // Funció per afegir una nova tasca al DOM i al Local Storage
    function addTask() {
        var task = taskName.val();
        if (task) {
            addTaskToDOM(task); // Afegeix al DOM
            saveTasks(); // Desa al Local Storage
        }
        dialog.dialog("close");
    }

    // Funció per afegir una tasca al DOM
    function addTaskToDOM(task) {
        var taskItem = $("<li>")
            .append("<span class='task-text'>" + task + "</span>")
            .append("<button class='edit-btn'>edit</button>")
            .append("<button class='delete-btn'>X</button>");

        $("#tasklist").append(taskItem);
        attachTaskActions(taskItem); // Adjunta els esdeveniments a les tasques
    }

    // Funció per editar una tasca existent
    function editTask() {
        var newTaskName = editTaskName.val();
        if (newTaskName) {
            currentTask.find(".task-text").text(newTaskName);
            saveTasks(); // Desa els canvis al Local Storage
        }
        editDialog.dialog("close");
    }

    // Funció per adjuntar esdeveniments als botons d'edició i eliminació
    function attachTaskActions(taskItem) {
        // Botó d'edició
        taskItem.find(".edit-btn").on("click", function() {
            currentTask = $(this).closest("li");
            editTaskName.val(currentTask.find(".task-text").text());
            editDialog.dialog("open");
        });

        // Botó d'eliminació
        taskItem.find(".delete-btn").on("click", function() {
            $(this).closest("li").remove();
            saveTasks(); // Desa després d'eliminar la tasca
        });
    }

    // Inicialització del diàleg per afegir tasques
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Afegir Tasca": addTask,
            Cancelar: function() {
                dialog.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
        }
    });

    // Inicialització del diàleg per editar tasques
    editDialog = $("#dialog-edit-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Guardar": editTask,
            Cancelar: function() {
                editDialog.dialog("close");
            }
        },
        close: function() {
            editForm[0].reset();
        }
    });

    // Captura del formulari d'afegir tasques
    form = dialog.find("form").on("submit", function(event) {
        event.preventDefault();
        addTask();
    });

    // Captura del formulari d'editar tasques
    editForm = editDialog.find("form").on("submit", function(event) {
        event.preventDefault();
        editTask();
    });

    // Obrir el diàleg d'afegir tasca quan es clica el botó
    $("#add-task").button().on("click", function() {
        dialog.dialog("open");
    });

    // Carrega la llista de tasques quan es carrega la pàgina
    loadTasks();
});
