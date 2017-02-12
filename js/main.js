var table = document.getElementById("users-table")
create = document.getElementById("create"),
    form = document.forms[0],
    fullname = form.elements.fullname,
    birthday = form.elements.birthday,
    profession = form.elements.profession,
    address = form.elements.address,
    country = form.elements.country,
    shortInfo = document.querySelector("#short-info"),
    fullInfo = document.querySelector("#full-info"),
    btnSave = document.querySelector(".btn-save"),
    btnCancel = document.querySelector(".btn-cancel");
var hiddenIdElement = document.getElementById("id");

var Request = {};
Request.execute = function(url,method,callback,data){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState != 4) {
            return;
        }
        callback(this.response);
    });
    var dataToSend = null;
    if(data){
        dataToSend = JSON.stringify(data);
    }
    xhr.send(dataToSend);
};
Request.get = function(url,method,callback){
    Request.execute(url, method,callback);
};
Request.put = function(url,method,callback){
    Request.execute(url,method);
};
Request.delete = function(url,method,callback){
    Request.execute(url,method,callback);
};
Request.post = function(url,method,data,callback){
    Request.execute(url,data,method);
};


Request.get('/user','GET',function(json){
    for (var i = 0; i <= json.length - 1; i++) {
        var newTr = document.createElement("tr"),
            userNameField = document.createElement("td"),
            shortInfoCell = document.createElement("td"),
            professionField = document.createElement("td"),
            removeField = document.createElement("td"),
            btnRemove = document.createElement("BUTTON"),
            btnEdit = document.createElement("BUTTON");

        btnRemove.innerText = "Remove";
        btnEdit.innerText = "Edit";
        btnRemove.setAttribute("id", json[i].id);
        btnEdit.setAttribute("id",   json[i].id);


        userNameField.innerText =   json[i].fullName;
        shortInfoCell.innerText =   json[i].shortInfo;
        professionField.innerText = json[i].profession;

        removeField.appendChild(btnRemove);
        removeField.appendChild(btnEdit);

        newTr.appendChild(userNameField);
        newTr.appendChild(professionField);
        newTr.appendChild(shortInfoCell);
        newTr.appendChild(removeField);

        table.appendChild(newTr);
    };
});

    table.addEventListener("click", function (e) {
        var target = e.target;
        ////////////////////////REMOVE USER functionality/////////////////////////////////////
        // if (target.innerText === "Remove") {

        //     Request.get("/user","GET",function(json){

        //         for (var i = 0; i <= json.length - 1; i++) {
        //             if (json[i].id === target.id) {
        //                 //DELETE request
        //                 Request.delete('/user?id=' + target.id + '',"DELETE",function(){
        //                     target.parentElement.parentElement.remove();
        //                 });
        //             }
        //         }); 
        // }
        ///////////////////EDIT USER functionality//////////////////////////////////////////
        if (target.innerText === "Edit") {

           Request.get("/user","GET",function(){
               for (var i = 0; i < objects.length; i++) {
                   //console.log( objects[i]);
                   if (objects[i].id === userID) {
                       form.classList.remove("users-edit-hidden");
                       fullname.value = objects[i].fullName;
                       birthday.value = objects[i].birthday;
                       profession.value = objects[i].profession;
                       address.value = objects[i].address;
                       shortInfo.value = objects[i].shortInfo;
                       fullInfo.value = objects[i].fullInfo;


                       hiddenIdElement.setAttribute("id", '' + objects[i].id + '');

                       if (hiddenIdElement.getAttribute("id") != objects[i].id) {
                           ////////////////////////////
                           var putObj = {
                               id: objects[i].id,
                               fullName: fullname.value,
                               birthday: birthday.value,
                               profession: profession.value,
                               address: address.value,
                               country: country.innerHTML,
                               shortInfo: shortInfo.value,
                               fullInfo: fullInfo.value
                           }
                           var str = JSON.stringify(putObj);
                           ///////////////////////PUT REQUEST FOR EDIT USER
                           Request.put('/user?id=' + objects[i].id + '',"PUT");
                           ///////////////////////END PUT////////////////////////////
                       }
                   }
               }
           });
           };
        });

    create.addEventListener("click", function () {
        form.classList.remove("users-edit-hidden");
        form.reset();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/countries");
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState != 4) {
                return;
            }
            var str = JSON.parse(xhr.responseText);

            for (var i = 0; i <= str.length - 1; i++) {
                var netOption = document.createElement("OPTION");
                netOption.innerText = str[i];
                country.appendChild(netOption);
            }
        });
        xhr.send();
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        ////////////////////
        //var shortInfo2 = document.querySelector("#short-info");
        //var country2 = form.elements.country;
        var newUser = {
            id: "",
            fullName: fullname.value,
            birthday: birthday.value,
            profession: profession.value,
            address: address.value,
            country: country.innerHTML,
            shortInfo: shortInfo.value,
            fullInfo: fullInfo.value
        };

        if (fullname.value != "" &&
            birthday.value != "" &&
            profession.value != "" &&
            address.value != "" &&
            //country.value != "";
            fullInfo.value != "") {
            var str = JSON.stringify(newUser);
            //console.log(str);
            ////////////////POST REQUEST///////////////////////////////////
            Request.post("/user","POST",function () {
                var newTr = document.createElement("tr"),
                userNameField = document.createElement("td"),
                shortInfoCell = document.createElement("td"),
                professionField = document.createElement("td"),
                removeField = document.createElement("td"),
                btnRemove = document.createElement("BUTTON"),
                btnEdit = document.createElement("BUTTON");

            btnRemove.innerText = "Remove";
            btnEdit.innerText = "Edit";
            btnRemove.setAttribute("id", json.id);
            btnEdit.setAttribute("id", json.id);


            userNameField.innerText = json.fullName;
            shortInfoCell.innerText = json.shortInfo;
            professionField.innerText = json.profession;

            removeField.appendChild(btnRemove);
            removeField.appendChild(btnEdit);

            newTr.appendChild(userNameField);
            newTr.appendChild(professionField);
            newTr.appendChild(shortInfoCell);
            newTr.appendChild(removeField);

            table.appendChild(newTr);
            /////////////////////////

            form.reset();
            form.classList.add("users-edit-hidden");

            },json);
            //////////////// END POST REQUEST///////////////////////////////////

            
            
            table.addEventListener("click", function (e) {
                var target = e.target;
                //Remove functionality
                if (target.innerText === "Remove") {
                        Request.get("/user","GET",function(json){
                            for (var i = 0; i <= str.length - 1; i++) {
                                if (json[i].id === target.id) {
                                    //DELETE request
                                    Request.delete('/user?id=' + target.id + '',"DELETE",function(){
                                        target.parentElement.parentElement.remove();
                                    });
                                }
                            }
                        });
                }
             });

        }
    });

    btnCancel.addEventListener("click", function () {
        form.classList.add("users-edit-hidden");
    });

