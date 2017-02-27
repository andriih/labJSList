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

function addRow(data){
     var tr = $("<tr></tr>");
                    tr.attr('id',data.id);
                    tbl.append(tr.append('<td>'+data.fullName+'</td>'));
                    tbl.append(tr.append('<td>'+data.profession+'</td>'));
                    tbl.append(tr.append('<td>'+data.shortInfo+'</td>'));
                    tbl.append(tr.append('<td>' +
                        '<button id="edit">Edit</button> <button id="remove">Remove</button></td>'));
}

function getUsers (){
        $.get('/user',function(data){
            $.each(data,function(index,value){
                addRow(value);
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
                    $('#short-info').val(value.shortInfo);
                    $('#full-info').val(value.fullInfo);
                    ////////////////GET COUNTRIES//////////////
                    getCountries();
                    
                    ////////PUT REQUEST/////////
                    form.submit(function(e){ 
                        e.preventDefault();
                         var newUser = {
                            id: value.id,
                            fullName:  $('#fullname').val(),
                            birthday:  $('#birthday').val(),
                            profession:  $('#profession').val(),
                            address:    $('#address').val(),
                            shortInfo:  $('#short-info').val(),
                            fullInfo:  $('#full-info').val()
                            };
                            
                            var str = JSON.stringify(newUser);
                            console.dir(str);
                            $.ajax({
                                url:'/user?id='+value.id+'',
                                type:"PUT",
                                data:  str,
                                contentType: 'application/json',
                                dataType:"json",
                                success: function(data){
                                    
                                    $.get('/user?id='+data.id+'',function(data){
                                        addRow(data);
                                        //console.log(data);
                                    });
                                   
                                    $('.users-edit')[0].reset();
                                    form.addClass('users-edit-hidden');
                                  }
                            });

                        return false;
                    });
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

        if(
            $('#fullname').val()    !== "" &&
            $('#birthday').val()    !== "" &&
            $('#profession').val()  !== "" &&
            $('#address').val()     !== "" &&
            $('#short-info').val()  !== "" &&
            $('#full-info').val()
        ){
        var newUser = {
            fullName:  $('#fullname').val(),
            birthday:  $('#birthday').val(),
            profession:  $('#profession').val(),
            address:    $('#address').val(),
            shortInfo:  $('#short-info').val(),
            fullInfo:  $('#full-info').val()
        };
        var str = JSON.stringify(newUser);

        $.ajax({
            url:'/user',
            type:"POST",
            data:  str,
            contentType: 'application/json',
            dataType:"json",
            success: function(data){
                //getUsers();
                $.get('/user?id='+data.id+'',function(data){
                    addRow(data);
                });
               // console.log('/user?id='+data.id+'');
                $('.users-edit')[0].reset();
                form.addClass('users-edit-hidden');
              }
        });
        
        return false;

        }else{
            alert("Fiel all Fields");
            return false;
        }

    });
});

////////////////////CANCEL botton/////////////
$('#cancel').click(function(e){
    //getUsers();
    e.preventDefault();
    form.addClass('users-edit-hidden');
});
