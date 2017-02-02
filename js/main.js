var table =  document.getElementById("users-table");
 var xhr = new XMLHttpRequest();

xhr.open("GET","/user");

xhr.addEventListener("readystatechange",function(){
    if(xhr.readyState != 4){
        return;
    }

    var str = JSON.parse(xhr.responseText);
   // console.log(str);

    for(var i = 0;i<=str.length-1;i++){
        var newTr = document.createElement("tr"),
            userNameField = document.createElement("td"),
            shortInfo = document.createElement("td"),
            professionField = document.createElement("td"),
            removeField = document.createElement("td")
            btnRemove = document.createElement("BUTTON"),
            btnEdit = document.createElement("BUTTON");

        btnRemove.innerText="Remove";
        btnEdit.innerText = "Edit";
        btnRemove.setAttribute("id",str[i].id);
        btnEdit.setAttribute("id",str[i].id);


        userNameField.innerText = str[i].fullName;
        shortInfo.innerText =  str[i].shortInfo;
        professionField.innerText =  str[i].profession;
        //removeField.innerHTML = '<button type="click" class="btn" name="btn">Remove</button><br /><br /><button type="click"  class="btn" name="btn">Edit</button>';

        removeField.appendChild(btnRemove);
        removeField.appendChild(btnEdit);

        newTr.appendChild(userNameField);
        newTr.appendChild(professionField);
        newTr.appendChild(shortInfo);
        newTr.appendChild(removeField);

        table.appendChild(newTr);
    };

    table.addEventListener("click",function(e){
        var target = e.target;

        if(target.innerText === "Remove"){

            var innerXhr = new XMLHttpRequest();
                innerXhr.open("GET","/user");
                innerXhr.addEventListener("readystatechange",function(){

                    if(innerXhr.readyState != 4 && innerXhr.status != 200){
                        return;
                    }

                   var str = JSON.parse(innerXhr.responseText);

                    for(var i = 0;i<=str.length-1;i++){
                        if(str[i].id === target.id){
                            //DELETE request
                        }
                    }
                });
                innerXhr.send();
        }
    });
});
xhr.send();