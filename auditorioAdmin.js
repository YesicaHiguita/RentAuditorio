function getAudience() {
    $.ajax({
        url: 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience',
        type: 'GET',
        dataType: 'json',
        success : function (auditorios) {
            $('#AuditorioAdmin').empty();
            let ad = auditorios.items;
            $('#AuditorioAdmin').append("<thead> <th> Propietario </th> <th> Capacidad </th><th> Categoría </th> <th> Nombre </th>\
            <th id=edit>Edit</th> <th id=del>Del</th> </thead> ");
            for (i=0 ; i<ad.length ; i++) { 
                $("#AuditorioAdmin").append("<tr><td>"+ad[i].owner+"</td><td>"+ad[i].capacity+"</td>\
                <td>"+ad[i].category_id+"</td> <td>"+ad[i].name+"</td> <td><button onclick='showdatatoupdate(" + JSON.stringify(ad[i]) + ")'\
                class='table_btn' id='edit_btn' >Editar</button></td> <td><button onclick='borrarAuditorio("+ad[i].id+")' class='table_btn' id='delete_btn'>Borrar</button></td>  </tr>")
            }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
            }
    });
}

function Clear(){
    $("#propietario").val("");
    $("#capacidad").val("");
    $("#categoria").val("");
	$("#nombre").val("");
}


function guardarAuditorio(){
    let propietarioAuditorio=$("#propietario").val();
    let capacidadAuditorio=$("#capacidad").val();
    let categoriaAuditorio=$("#categoria").val();
	let nombreAuditorio=$("#nombre").val();

    let data={
        owner:propietarioAuditorio,
        capacity:capacidadAuditorio,
        category_id:categoriaAuditorio,
		name:nombreAuditorio
    };
    
    let dataToSend=JSON.stringify(data);
    

    $.ajax({
        url : 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience',
        type : 'POST',
        data : dataToSend,
        contentType: 'application/json',

        success : function(respuesta) {
            $("#propietario").val("");
            $("#capacidad").val("");
            $("#categoria").val("");
			$("#nombre").val("");
        },
        error : function(xhr, status) {
         alert('ha sucedido un problema');
        },
		complete: function () {
            getAudience();
        }
    });
}

function showdatatoupdate(audience) { 
    window.last = audience.id;
    $("#propietario").val(audience.owner);
    $("#capacidad").val(audience.capacity);
    $("#categoria").val(audience.category_id);
	$("#nombre").val(audience.name); 
}


function editarAuditorio(){
	let propietario=$("#propietario").val();
	let capacidad=$("#capacidad").val();
	let categoriaAuditorio=$("#categoria").val();
	let nombreAuditorio=$("#nombre").val();

	let data={
		id:last,
		owner:propietario,
		capacity:capacidad,
		category_id:categoriaAuditorio,
		name:nombreAuditorio
	};
	let dataToSend=JSON.stringify(data);
	
	$.ajax({    
	    url : 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience',
	    type : 'PUT',
	    data: dataToSend,
	    contentType:'application/json',
	    success : function(edit) {
			$("#propietario").val("");
			$("#capacidad").val("");
			$("#categoria").val("");
			$("#nombre").val("");
			alert("Actualización exitosa")
	    },
	    error : function(xhr, status) {
			alert("Error: " + xhr.status + " " + status);
	    },
	    complete: function(){
	    	getAudience();
	    }
	});

}

function borrarAuditorio(idAuditorio){
	let data={
		id:idAuditorio
	};
	let dataToSend=JSON.stringify(data);

	$.ajax({    
	    url : 'https://g4c9266e71926ed-md8u8t5nbh1i7y35.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience' ,
	    type : 'DELETE',
	    dataType : 'json',
	    data: dataToSend,
	    contentType:'application/json',
	    success : function(borrar) {
			$("#idAuditorio").val("");
			$("#propietario").val("");
			$("#capacidad").val("");
			$("#idCategoria").val("");
			$("#nombreAuditorio").val("");
	    },
	    error : function(xhr, status) {
	   		alert('ha sucedido un problema');
	    },
	    complete: function(){
	    	getAudience();
	    }
	});

}





 

	
 