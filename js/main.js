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
    xhr.send();

};

Request.get = function(url,method,callback){
    Request.execute(url, method,callback);
};

Request.put = function(url,method,callback){
    Request.execute(url,method);
};

Request.delete = function(url,method,callback){
    Request.execute(url,method);
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
        //Remove functionality
        if (target.innerText === "Remove") {

            var innerXhr = new XMLHttpRequest();
            innerXhr.open("GET", "/user");
            innerXhr.addEventListener("readystatechange", function () {

                if (innerXhr.readyState != 4) {
                    return;
                }

                var str = JSON.parse(innerXhr.responseText);

                for (var i = 0; i <= str.length - 1; i++) {
                    if (str[i].id === target.id) {
                        //DELETE request
                        var deleteXhr = new XMLHttpRequest();
                        deleteXhr.open("DELETE", '/user?id=' + target.id + '');
                        deleteXhr.addEventListener("readystatechange", function () {
                            if (deleteXhr.readyState != 4 && deleteXhr.status != 200) {
                                return;
                            }
                            target.parentElement.parentElement.remove();
                            //target.parentElement.parentElement.parentElement.removeChild( target.parentElement.parentElement );

                        });

                        deleteXhr.send();
                    }
                }
            });
            innerXhr.send();
        }
        ///////////////////EDIT functionality//////////////////////////////////////////
        if (target.innerText === "Edit") {
            var userID = target.id;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/user");
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState != 4) {
                    return;
                }
                var objects = JSON.parse(xhr.responseText);
                //console.log(objects[0].id);
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

                        //EMPROWMENT

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
                            ///////////////////////
                            var putXhr = new XMLHttpRequest();
                            putXhr.open("PUT", '/user?id=' + objects[i].id + '');
                            putXhr.setRequestHeader('Content-Type', 'application/json');
                            putXhr.addEventListener("readystatechange", function () {
                                if (putXhr.readyState != 4) {
                                    return;
                                }

                            });
                            putXhr.send(str);
                        }
                    }
                }
            });
            xhr.send();

        }
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
            console.log(str);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/user");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState != 4) {
                    return;
                }
            });
            xhr.send(str);
            /////////////////////////
            var json = JSON.parse(str);////PArse json
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

            table.addEventListener("click", function (e) {
                var target = e.target;
                //Remove functionality
                if (target.innerText === "Remove") {

                    var innerXhr = new XMLHttpRequest();
                    innerXhr.open("GET", "/user");
                    innerXhr.addEventListener("readystatechange", function () {

                        if (innerXhr.readyState != 4) {
                            return;
                        }
                        var str = JSON.parse(innerXhr.responseText);

                        for (var i = 0; i <= str.length - 1; i++) {
                            if (str[i].id === target.id) {
                                //DELETE request
                                var deleteXhr = new XMLHttpRequest();
                                deleteXhr.open("DELETE", '/user?id=' + target.id + '');
                                deleteXhr.addEventListener("readystatechange", function () {
                                    if (deleteXhr.readyState != 4 && deleteXhr.status != 200) {
                                        return;
                                    }
                                    target.parentElement.parentElement.remove();
                                    //target.parentElement.parentElement.parentElement.removeChild( target.parentElement.parentElement );

                                });

                                deleteXhr.send();
                            }
                        }
                    });
                    innerXhr.send();
                }
            });

        }

    });

    btnCancel.addEventListener("click", function () {
        form.classList.add("users-edit-hidden");
    });

