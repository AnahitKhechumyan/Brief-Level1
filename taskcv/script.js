import { programmers as personList } from "./data.js";

let personFromStorage = getFromStorage("users") || saveToStorage(personList);
let dynamicData = [...personFromStorage];
console.log(personFromStorage);

initList();

function initList() {
  let cvbox = document.querySelector(".inputUserBox");
  personFromStorage.forEach(function (data) {
    cvbox.innerHTML += ` <div class="box"><a href="#addNew?id=${data.id}" >${data.firstName} ${data.lastName}</a></div>`;
  });
}

let cvbox = document.querySelector(".nexted_box");
cvbox.innerHTML += `<div class="cvbox"><a href="#addNew?id">+</a></div>`;

initGridList();

function initGridList() {
  let box = document.querySelector(".cvbox");

  personList.forEach((cvbox) => {
    box.innerHTML += `<div class="nexted_box">
                           <a href="#Anahit?id=${cvbox.id}">${cvbox.firstName} ${cvbox.lastName}</a> 
                      </div>`;
  });
}
window.addEventListener("hashchange", () => {
  let container = document.querySelector(".cvbox");
  let personalPage = document.querySelector(".box");
  let inputUserBox = document.querySelector(".inputUserBox");

  if (window.location.hash.includes("Anahit")) {
    container.classList.add("hidden");
    personalPage.classList.remove("hidden");
    inputUserBox.classList.add("hidden");

    let hashArr = window.location.hash.split("=");
    let id = hashArr[1];
    const userObj = getUserById(id);
    addUserData(userObj);

  } else if (window.location.hash.includes("addNew")) {
    container.classList.add("hidden");
    personalPage.classList.add("hidden");
    inputUserBox.classList.remove("hidden");
  } else {
    container.classList.remove("hidden");
    personalPage.classList.add("hidden");
    inputUserBox.classList.add("hidden");
  }
   
   
});

function getUserById(id) {
  const personObj = personList.find(function (person) {
    return person.id == id;
  });
  return personObj;
}

document
  .querySelector(".add-new-user")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let firstName = document.getElementById("firstName-field").value;
    let lastName = document.getElementById("lastName-field").value;
    let phone = document.querySelector(".phone-field").value;
    let email = document.querySelector(".email-field").value;
    let education = document.querySelector(".education-field").value;
    let workExperience = document.querySelector(".workexperience-field").value;
    let id = "id_" + new Date().valueOf();
    let newUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      education: education,
      workExperience: workExperience,
    };

    personFromStorage.push(newUser);
    saveToStorage(personFromStorage);
    window.location.replace("task.html");
  });

function addUserData(persons) {
  document.querySelector(".firstName").innerHTML = persons.firstName;
  document.querySelector(".lastName").innerHTML = persons.lastName;
  document.querySelector(".phone").innerHTML = persons.phone;
  document.querySelector(".email").innerHTML = persons.email;
  document.querySelector(".education").innerHTML = persons.education;
  document.querySelector(".workExperience").innerHTML = persons.workExperience;
  document.querySelector(".trainings").innerHTML = persons.trainings;
}
function saveToStorage(data) {
  let stringifiedData = JSON.stringify(data);
  window.localStorage.setItem("users", stringifiedData);
  return data;
}
function getFromStorage(persons) {
  let dataFromStorage = window.localStorage.getItem(persons);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
}
