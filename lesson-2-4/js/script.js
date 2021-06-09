//Task 1-2 Begin
function task12() {
    let str = document.getElementById('task1').innerHTML;
    const regexp = /\B'|'\B/g;
    document.getElementById('task1').innerHTML += '<br>' + str.replace(regexp, '"')
}

task12();
//Task 1-2 End
//Task 3 Begin
function task3() {
    const rename = /^[A-Za-z]+$/g;
    const remail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    const rephone= /^(\+7)(\(\d{3}\))\d{3}-\d{4}$/g ;
    document.getElementById('name').style.border ='';
    document.getElementById('phone').style.border ='';
    document.getElementById('email').style.border ='';

    let str = document.getElementById('name').value;
    if (!rename.test(str)) {
        document.getElementById('name').style.border = '2px solid red';
    }
    str = document.getElementById('phone').value;
    if (!rephone.test(str)) {
        document.getElementById('phone').style.border = '2px solid red';
    }
    str = document.getElementById('email').value;
    if (!remail.test(str)) {
        document.getElementById('email').style.border = '2px solid red';
    }
}
//Task 3 End
