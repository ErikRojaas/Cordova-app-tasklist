$(function() {
    var dialog, form,
        taskName = $("#task-name");

    function addTask() {
        var task = taskName.val();
        if (task) {
            $("#tasklist").append("<li>" + task + "</li>");
        }
        dialog.dialog("close");
    }

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

    form = dialog.find("form").on("submit", function(event) {
        event.preventDefault();
        addTask();
    });

    $("#add-task").button().on("click", function() {
        dialog.dialog("open");
    });
});
