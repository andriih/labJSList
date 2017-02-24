$.get('/user',function(data){
    var tbl =  $('#users-table');
    $.each(data,function(index,value){
        var tr = $("<tr></tr>");
        tbl.append(tr.append('<td>'+value.fullName+'</td>'));
        tbl.append(tr.append('<td>'+value.profession+'</td>'));
        tbl.append(tr.append('<td>'+value.shortInfo+'</td>'));
        // var optionBtns = tbl.append(tr.append('<td></td>'));
        // optionBtns.text("hello");

    });
});