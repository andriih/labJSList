var tbl =  $('#users-table');
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
//////////REMOVE FUNC//////////////////////////////
tbl.click(function(e){
    if(e.target.id === "remove"){
        //console.log(e.target.parentElement.parentElement.id);
        e.target.parentElement.parentElement.remove();
        $.get('/user',function(data){
            $.ajax({
                url: '/user?id='+e.target.parentElement.parentElement.id +'',
                type: 'DELETE',
                success: function(result){
                    //console.log(result);
                }
            });
        });
    }
});
