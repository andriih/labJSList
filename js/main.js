var tbl =  $('#users-table'),
    form = $('.users-edit');

$.get('/user',function(data){
    $.each(data,function(index,value){
        var tr = $("<tr></tr>");
        tr.attr('id',value.id);
        tbl.append(tr.append('<td>'+value.fullName+'</td>'));
        tbl.append(tr.append('<td>'+value.profession+'</td>'));
        tbl.append(tr.append('<td>'+value.shortInfo+'</td>'));
        tbl.append(tr.append('<td>' +
            '<button id="edit">Edit</button> <button id="remove">Remove</button></td>'));
    });
});
//////////REMOVE-EDIT FUNC//////////////////////////////
tbl.click(function(e){
    //REMOVE
    if(e.target.id === "remove"){
        //console.log(e.target.parentElement.parentElement.id);
        e.target.parentElement.parentElement.remove();
        $.get('/user',function(){
            $.ajax({
                url: '/user?id='+e.target.parentElement.parentElement.id +'',
                type: 'DELETE'
            });
        });
    }
    //EDIT
    if(e.target.id === "edit"){
        form.removeClass('users-edit-hidden');
        $('#fullname').val('fullname');
        $('#birthday').val('birthday');
        $('#address').val('address');
        ////////////////GET COUNTRIES//////////////
        $.get('/countries',function(data){
            $.each(data,function(index,value){
                $('#country').append('<option>'+value+'</option>');
            });
        });
        //$('#country').
        $('#short-info').val('short-info');
        $('#full-info').val('full-info');

    }
});
////////////////////CANCEL botton/////////////
$('#cancel').click(function(e){
    e.preventDefault();
    form.addClass('users-edit-hidden');
});
