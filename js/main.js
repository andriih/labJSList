var tbl =  $('#users-table'),
    form = $('.users-edit'),
    hidden = $('#id');
 
 function getCountries(){
    $.get('/countries',function(data){
        $.each(data,function(index,value){
            $('#country').append('<option>'+value+'</option>');
        });
    });
}

function getUsers (){
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
}

getUsers();

//////////REMOVE-EDIT FUNC//////////////////////////////
tbl.click(function(e){
    //REMOVE
    if(e.target.id === "remove"){
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
        $.get('/user',function(data){
            $.each(data,function(index,value){
                if(e.target.parentElement.parentElement.id === value.id){
                    hidden.attr('id',e.target.parentElement.parentElement.id);
                    $('#fullname').val(value.fullName);
                    $('#birthday').val(value.birthday);
                    $('#address').val(value.address);
                    $('#profession').val(value.profession);
                    ////////////////GET COUNTRIES//////////////
                    getCountries();
                    
                    $('#short-info').val(value.shortInfo);
                    $('#full-info').val(value.fullInfo);
                }
            });
        });
    }
    return false;
});
///////////ID - IDentificator/////////////////////////////////
$('#create').click(function(e){
    form.removeClass('users-edit-hidden');
    hidden.attr('id','id');
    $('.users-edit')[0].reset();
    getCountries();
    form.submit(function(e){
        e.preventDefault();

        // var newUser = {
        //     fullName:  $('#fullname').val(),
        //     birthday:  $('#birthday').val(),
        //     profession:  $('#profession').val(),
        //     address:  $('#address').val(),
        //     shortInfo:  $('#shortInfo').val(),
        //     fullInfo:  $('#fullInfo').val()
        // };
        // var str = JSON.stringify(newUser);
        
        $.post('/user',form.serialize(),function(data){
            getUsers();
            console.log(data);
            $('.users-edit')[0].reset();
        },'json');


        return false;
        
    });
});

////////////////////CANCEL botton/////////////
$('#cancel').click(function(e){
    e.preventDefault();
    form.addClass('users-edit-hidden');
});
