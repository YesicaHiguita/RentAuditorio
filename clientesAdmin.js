function getClients () {
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'GET',
        dataType: 'json',
        success : function (clientes) {
            $('#ClientesAdmin').empty();
            let cs = clientes.items;
            $('#ClientesAdmin').append("<thead> <th> Nombre </th> <th> Correo </th><th> Edad </th>\
            <th id=edit>Edit</th> <th id=del>Del</th> </thead> ");
            for (i=0 ; i<cs.length ; i++) { 
                $("#ClientesAdmin").append("<tr><td>"+cs[i].name+"</td><td>"+cs[i].email+"</td>\
                <td>"+cs[i].age+"</td> <td><button onclick='showdatatoupdate(" + JSON.stringify(cs[i]) + ")'\
                class='table_btn' id='edit_btn' >Editar</button></td> <td><button onclick='borrarCliente("+cs[i].id+")' class='table_btn' id='delete_btn'>Borrar</button></td>  </tr>")
            }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
            }
    });
}

function borrarCliente(idCliente) {
    let data = {
        id: idCliente
    };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'DELETE',
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function (reset) {
            Clear();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
            },
        complete : function() {
            getClients();
        }
    }); 
}

function showdatatoupdate(client) { 
    window.last = client.id;
    $("#NombreCliente_tf").val(client.name);
    $("#EmailCliente").val(client.email);
    $("#EdadCliente").val(client.age); 
}
function Update(){
    let newName = $("#NombreCliente_tf").val();
    let newEmail = $("#EmailCliente").val();
    let newAge = $("#EdadCliente").val();
    let last = window.last;
    let data = {
        id: last,
        name: newName,
        email: newEmail,
        age: newAge
    }
    console.log(data);
    let dataToSend  = JSON.stringify(data);
    
    $.ajax({
        url : 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'PUT',
        data: dataToSend,
        contentType: 'application/json',
        success: function(reset){
            $("#NombreCliente_tf").val("");
            $("#EmailCliente").val("");
            $("#EdadCliente").val("");
        },
        error: function(xhr, status){
            alert("Error: " + xhr.status + " " + status);    
        },
        complete: function(){
            getClients();
        }
    });
}



function Clear(){
    $("#NombreCliente_tf").val("");
    $("#EmailCliente").val("");
    $("#EdadCliente").val("");
}
function AddClients(){
    let nameClient = $("#NombreCliente_tf").val();
    let emailClient = $("#EmailCliente").val();
    let ageClient = $("#EdadCliente").val();

    let data = {
        name: nameClient,
        email: emailClient,
        age: ageClient,
    }

    let dataToSend  = JSON.stringify(data);
    
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'POST',
        data: dataToSend,
        contentType: 'application/json',

        success: function(response) {
            $("#NombreCliente_tf").val("");
            $("#EmailCliente").val("");
            $("#EdadCliente").val("");
        },
        error: function () {
            alert('ha sucedido un problema');
        },
        complete: function () {
            getClients();
            alert('Guardado exitosamente')
        }
    });
}