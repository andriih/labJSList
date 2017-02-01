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
            removeField = document.createElement("td");


        userNameField.innerText = str[i].fullName;
        shortInfo.innerText =  str[i].shortInfo;
        professionField.innerText =  str[i].profession;
        removeField.innerHTML = '<button type="click" class="btn" name="btn">Remove</button><br /><br /><button type="click"  class="btn" name="btn">Edit</button>';

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
                    if(innerXhr.readyState != 4){
                        return;
                    }

                    var str = JSON.parse(innerXhr.responseText);
                    var name = target.parentElement.parentElement.firstChild.innerHTML;

                    //console.log();

                    for(var j = 0;j<=str.length-1;j++){
                        if(str[i].fullName === name){
                            console.log(str[i].id);
                        }
                    }



                });
                innerXhr.send();
        }
    });
});
xhr.send();