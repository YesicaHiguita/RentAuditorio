$(document).ready(function () {
    getmessages();
});

function getmessages() {
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
        dataType: 'json',
        success: function (messages) {
            $('#MensajesAdmin').empty();
            let ms = messages.items;
            $('#MensajesAdmin').append("<thead> <th> Mensaje </th> \
            <th id=edit>Edit</th> <th id=del>Del</th> </thead> ");
            for (i=0 ; i<ms.length ; i++) { 
                $("#MensajesAdmin").append("<tr><td>"+ms[i].messagetext+"</td>\
                 <td><button onclick='showdatatoupdate(" + JSON.stringify(ms[i]) + ")'\
                class='table_btn' id='edit_btn' >Editar</button></td> <td><button onclick='borrarMensaje("+ms[i].id+")' class='table_btn' id='delete_btn'>Borrar</button></td>  </tr>")
            }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
            }
    });
}



function savemessage() {
    let message = $("#message").val();

    let data = {
        messagetext: message
    };

    let dataToSend = JSON.stringify(data);

    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'POST',
        data: dataToSend,
        contentType: 'application/json',

        success: function (response) {
            $("#message").val("");
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        },
        complete: function () {
            getmessages();
            alert('Guardado exitosamente')
        }
    });
}

function showdatatoupdate(message) {
    window.last = message.id;
    $("#message").val(message.messagetext);

}

function Clear(){
    $("#message").val("");
}

function updatemessage() {
    let message = $("#message").val();
    let last = window.last;
    let data = {
        id: last,
        messagetext: message
    }

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'PUT',
        data: dataToSend,
        contentType: 'application/json',
        success: function (response) {
            $("#message").val("");
        },
        error: function (xhr, status) {
            alert("Error: " + xhr.status + " " + status);
        },
        complete: function () {
            getmessages();
        }
    });

}

function borrarMensaje(idmessage) {
    let data = {
        id: idmessage
    };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'DELETE',
        dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function (reset) {
            Clear();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        },
        complete: function () {
            getmessages();
        }
    });

}