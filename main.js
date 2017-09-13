// Butts
let quickAddBtn = document.getElementById('QuickAdd');
let quickAddFormDiv = document.querySelector('.quickaddForm');
let cancelBtn = document.getElementById('Cancel');
let AddBtn = document.getElementById('Add');
let sortBtn = document.getElementById('sort');
// Form
let fullname = document.getElementById('fullname');
let phone = document.getElementById('phone');
let address = document.getElementById('address');
let city = document.getElementById('city');




let xdd = true;
quickAddBtn.addEventListener("click", function () {
    if (xdd) {
        quickAddFormDiv.style.display = "block";
        xdd = false;
    }
    else {
        quickAddFormDiv.style.display = "none";
        xdd = true;
    }

});

cancelBtn.addEventListener("click", function () {
    quickAddFormDiv.style.display = "none";
    xdd = true;
});

AddBtn.addEventListener("click", addToBook);
AddBtn.addEventListener("click", function () {
    xdd = true;
});
// unused block  add Phones add Mails

let xs = 0; //couners
let xd = 0;

let phoneAddBtn = document.getElementById('AddPhone');
phoneAddBtn.addEventListener("click", function () {
    let addPhone = document.getElementById('additionalPhone');
    xs++;
    if (xs < 5) {
        let newdiv = document.createElement('div');
        newdiv.innerHTML = '<label for="phone">Additional phone</label><input type="text" class="phoneForms"> <br>';
        addPhone.appendChild(newdiv);
    }
    else {
        alert('Максимальное количество полей - 5');
    }

});

addMailBtn = document.getElementById('AddMail');
addMailBtn.addEventListener("click", function () {
    let addMail = document.getElementById('additionalMail');
    xd++;
    if (xd < 5) {
        let newdivMail = document.createElement('div');
        newdivMail.innerHTML = '<label for="phone">Additional mail</label><input type="text" class="emailForms"><br>';
        addMail.appendChild(newdivMail);
    }
    else {
        alert('Максимальное количество полей - 5');
    }
});

//Sort
sortBtn.addEventListener("click", function () {
    addressBook.sort(compareName);
    localStorage['addbook'] = JSON.stringify(addressBook);
    showAddressBook();
});
function compareName(a, s) {
    if (a.fullname > s.fullname) {
        return 1;
    }
    if (a.fullname < s.fullname) {
        return -1;
    }
    return 0;
}

// Storage Array
let addressBook = [];

//localStorage['addbook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","city":"Chandigarh"}]';
function jsonStructure(idContact, fullname, phone, address, city, email) {
    this.idContact = idContact;
    this.fullname = fullname;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.email = email;
}
let idContact = 0;
function generatorId() {
    if (addressBook.length === 0) {
        idContact = 1;
    }
    else {
        idContact = addressBook[addressBook.length - 1].idContact + 1;
    }
}

//Validation

let resProverka;
function proverka() {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = /^\d[\d\(\)\ -]{4,14}\d$/;
    for (i = 0; i < phoneForms.length; i++) {
            if (phone.value === '' || fullname.value==='' ) {
                resProverka = false;
                alert('Поле Phone и Name не могут быть пустыми');
                break;
            }
        else if(phoneForms[i].value === ''){
            resProverka = true;
        }
        else if (!phoneReg.test(phoneForms[i].value)) {
            resProverka = false;
            alert('Введите 6-12 цыфер в поле номер');
                break;
        }
        else {
            resProverka = true;
        }
        for (j = 0; j < emailForms.length; j++) {
            if(emailForms[j].value === ''){
                resProverka = true;
            }

            else if (!emailReg.test(emailForms[j].value)) {
                resProverka = false;
                alert('Введите email в правильном формате');
                break;
            }
            else {
                resProverka = true;
            }
        }
    }
}
let phoneForms = document.getElementsByClassName('phoneForms')
let emailForms = document.getElementsByClassName('emailForms');
function addToBook() {
    proverka();
    if (resProverka) {
        let phone = [];
        for (i = 0; i < phoneForms.length; i++) {
            phone.push(phoneForms[i].value);
        }

        let email = [];
        for (j = 0; j < emailForms.length; j++) {
            email.push(emailForms[j].value);
        }

        let obj = new jsonStructure(idContact, fullname.value, phone, address.value, city.value, email);
        addressBook.push(obj);
        localStorage['addbook'] = JSON.stringify(addressBook);
        clearForm();
        showAddressBook();
        quickAddFormDiv.style.display = "none";

    }
    }

    let addBookDiv = document.querySelector('.addbook');
    addBookDiv.addEventListener("click", removeEntry);
    function removeEntry(e) {
        // remove an entry
        if (e.target.classList.contains('delbutton')) {
            let remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();

        }
    }

    function remuveS(s) {
        addressBook.splice(s, 1);
        localStorage['addbook'] = JSON.stringify(addressBook);
        showAddressBook();
        show2('none');
    }

    function editEntry() {
        alert('В разработке')
    }

    function show2(state2) {
        document.querySelector('.bgBlack').style.display = state2;
        document.querySelector('.widowDataContact').style.display = state2;
    }

    function show3(state3) {
        document.querySelector('.bgBlack').style.display = state3;
        document.querySelector('.widowDataSearch').style.display = state3;
    }

    function clearForm() {
        let formFields = document.querySelectorAll('.formFields');
        for (let i in formFields) {
            formFields[i].value = '';
        }
        let phoneFormsCL = document.getElementsByClassName('phoneForms');
        for (let i in phoneFormsCL) {
            phoneFormsCL[i].value = '';
        }
        let emailFormsCL = document.getElementsByClassName('emailForms');
        for (let i in emailFormsCL) {
            emailFormsCL[i].value = '';
        }
        let additionalPhone = document.getElementById('additionalPhone');
        let additionalMail = document.getElementById('additionalMail');
        additionalMail.innerHTML = '';
        additionalPhone.innerHTML = '';
        xs = 0; //couners
        xd = 0;
    }


// book showing function
    function showAddressBook() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for (let n in addressBook) {
                let str = '<div id="' + n + '"   class="entry">';
                str += '<div class="phone"><p>' + addressBook[n].phone [0] + '</p></div>';
                str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
                str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email [0] + '</p></div>';
                str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                str += '<div class="show"><a href="#" onclick = "windowContact(' + n + ')" >Show</a></div>';
                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }
// Window with search results
let widowDataSearch = document.querySelector('.widowDataSearch');
    function showAddressBookSearch() {
        widowDataSearch.innerHTML = '';
        for (let n in serchResArr) {
            let stn = '<div class="entry">';
            stn += '<div> <div class="phone"><p>' + serchResArr[n].phone + '</p></div>';
            stn += '<div class="name"><p>' + serchResArr[n].fullname + '</p></div>';
            stn += '<div class="city"><p>' + serchResArr[n].city + '</p></div>';
            stn += '<div class="address"><p>' + serchResArr[n].address + '</p></div>';
            stn += '<div class="email"><p>' + serchResArr[n].email + '</p></div></div>';

            stn += '</div>';
            widowDataSearch.innerHTML += stn;
        }
    }

// window contact details

    
    let ContactDetil = document.querySelector('.widowDataContact');
    function windowContact(n) {
        
        show2('block');
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        }
        else {
            let saveContactBtn = document.getElementById('saveContactBtn');
            saveContactBtn.addEventListener("click", );
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            ContactDetil.innerHTML = '';
            let sts = '<div class="windowContactContent">';
            sts += '<div class="topRow">';
            sts += '<div class="windowNameForm"><h1> Name:</h1><input value="'+ addressBook[n].fullname +'"></div>';
            sts += '<div class="editbutton"><a href="#" class="editbutton" onclick="editEntry()">Edit</a></div>';
            sts += '<div class="delbuttonS"><a href="#" class="delbuttonSS" onclick="remuveS(' + n + ')">Delete</a></div>';
            sts += '</div>';
            sts += '<div class="windowPhoneForm"><p>Phone number:</p><input value="'+ addressBook[n].phone[0] +'"><br>';
            sts += '<div id="additionalphonesWindow"> ';
            sts += '<input value="'+ addressBook[n].phone[1] +'"><br>';
            sts += '<input value="'+ addressBook[n].phone[2] +'"><br>';
            sts += '<input value="'+ addressBook[n].phone[3] +'"><br>';
            sts += '<input value="'+ addressBook[n].phone[4] +'"><br>';

            sts += ' </div></div>';
            sts += '<div class="windowCityForm"><p>City: </p><input value="'+ addressBook[n].city +'"></div><br>';
            sts += '<div class="windowAddressForm"><p>Adress: </p><input value="'+ addressBook[n].address +'"></div><br>';
            sts += '<div class="windowEmailForm"><p>E-mail: </p><input value="'+ addressBook[n].email[0] +'"><br>';
            sts += '<div id="additionalmailsWindow"> ';
            sts += '<input value="'+ addressBook[n].email[1] +'"><br>';
            sts += '<input value="'+ addressBook[n].email[2] +'"><br>';
            sts += '<input value="'+ addressBook[n].email[3] +'"><br>';
            sts += '<input value="'+ addressBook[n].email[4] +'"><br>';
            sts += '</div> </div>';
            sts += '<button id="saveContactBtn"> save</button>';
            sts += '</div>';
            ContactDetil.innerHTML += sts;
        }
    }
//Search
    let searchStr = document.getElementById('search');
    let searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener("click", searchFunc);
    function searchFunc() {
        let searchStrLowerC = searchStr.value.toLowerCase();
        if (searchStrLowerC === '') {
            alert('Поле не меожет быть пустым');
        }
        else if (searchStrLowerC === ' ') {
            alert('Поле не меожет быть пустым');
        }
        else {

            asdfasdf = localStorage['addbook'];
            qwqwerqwe = asdfasdf.toLowerCase();
            qwerq = JSON.parse(qwqwerqwe);
            serchResArr = qwerq.filter(function (item) {
                return (item.phone == searchStrLowerC || item.phone1 == searchStrLowerC || item.phone2 == searchStrLowerC || item.fullname == searchStrLowerC || item.city == searchStrLowerC || item.address == searchStrLowerC || item.email == searchStrLowerC || item.email1 == searchStrLowerC || item.email2 == searchStrLowerC);
            });
            if(serchResArr.length >0){
                show3('block');
                showAddressBookSearch();
            }
            else {
                alert(' Поиск не дал результатов');
            }

        }

    };

    showAddressBook();