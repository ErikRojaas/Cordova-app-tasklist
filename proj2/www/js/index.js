$(function() {
    var dialog, editDialog, form, editForm, taskName, editTaskName, currentTask;

    taskName = $("#task-name");
    editTaskName = $("#edit-task-name");

    // Funció per afegir una tasca nova
    function addTask() {
        var task = taskName.val();
        if (task) {
            // Creem un nou element de la llista amb el text i els botons
            var taskItem = $("<li>")
                .append("<span class='task-text'>" + task + "</span>")
                .append("<button class='edit-btn'>edit</button>")
                .append("<button class='delete-btn'>X</button>");

            // Afegim el nou element a la llista
            $("#tasklist").append(taskItem);

            // Adjunta els esdeveniments d'edició i eliminació als botons
            attachTaskActions(taskItem);
        }

        // Tanquem el diàleg i reiniciem el formulari
        dialog.dialog("close");
    }

    // Funció per editar una tasca existent
    function editTask() {
        var newTaskName = editTaskName.val();
        if (newTaskName) {
            // Actualitza el text de la tasca
            currentTask.find(".task-text").text(newTaskName);
        }

        // Tanquem el diàleg d'edició
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
        });
    }

    // Inicialitzem el diàleg per afegir tasques
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

    // Inicialitzem el diàleg per editar tasques
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

    // Adjunta esdeveniments a les tasques existents
    $("#tasklist li").each(function() {
        attachTaskActions($(this));
    });
});
