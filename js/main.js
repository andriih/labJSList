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

var xhr = new XMLHttpRequest();

xhr.open("GET", "/user");

xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState != 4) {
        return;
    }

    var str = JSON.parse(xhr.responseText);
    // console.log(str);

    for (var i = 0; i <= str.length - 1; i++) {
        var newTr = document.createElement("tr"),
            userNameField = document.createElement("td"),
            shortInfoCell = document.createElement("td"),
            professionField = document.createElement("td"),
            removeField = document.createElement("td"),
            btnRemove = document.createElement("BUTTON"),
            btnEdit = document.createElement("BUTTON");

        btnRemove.innerText = "Remove";
        btnEdit.innerText = "Edit";
        btnRemove.setAttribute("id", str[i].id);
        btnEdit.setAttribute("id", str[i].id);


        userNameField.innerText = str[i].fullName;
        shortInfoCell.innerText = str[i].shortInfo;
        professionField.innerText = str[i].profession;

        removeField.appendChild(btnRemove);
        removeField.appendChild(btnEdit);

        newTr.appendChild(userNameField);
        newTr.appendChild(professionField);
        newTr.appendChild(shortInfoCell);
        newTr.appendChild(removeField);

        table.appendChild(newTr);
    }
    ;

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
        //EDIT functionality
        if (target.innerText === "Edit") {
            console.log(target.id);
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
            fullInfo.value != "")
        {
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
                //EDIT functionality
                if (target.innerText === "Edit") {
                    console.log(target.id);
                }
            });

        }

    });

    btnCancel.addEventListener("click", function () {
        form.classList.add("users-edit-hidden");
    });


});
xhr.send();