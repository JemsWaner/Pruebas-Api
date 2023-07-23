const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");
const resetButton = document.querySelector(".reset");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //////the new FormData gives me a prototype, so I copy it using [...] and the I receive one array with more arrays inside that contains the values of the form
  let datas = new FormData(form);
  let newData = [...datas];

  fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: newData[0][1],
      email: newData[1][1],
      password: newData[2][1],
    }),
  }).then((a) => {
    console.log(a);
    LastValue();
  });
});

function LastValue() {
  fetch("http://localhost:3000/user", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((e) => {
      let lastArray = e[e.length - 1];
      console.log(lastArray);
      ///Now I create new rows to show the users I saved in my json
      const rows = document.createElement("tr");
      rows.innerHTML = `<td>${lastArray.username}</td> <td>${lastArray.email}</td> <td>${lastArray.password}</td>`;
      tableBody.appendChild(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

//////Now I use fetch mith the method Get to acces to the list created previously

function TableValues() {
  fetch("http://localhost:3000/user", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((elem) => {
      console.log(elem);
      elem.forEach((e) => {
        ///Now I create new rows to show the users I saved in my json
        const rows = document.createElement("tr");
        rows.innerHTML = `<td>${e.username}</td> <td>${e.email}</td> <td>${e.password}</td>`;
        tableBody.appendChild(rows);
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
}
TableValues();

//////Deleting last element one by one by clicking the button event
function DeleteLastValue() {
  fetch("http://localhost:3000/user")
    .then((data) => data.json())
    .then((e) => {
      let lastArray = e[e.length - 1];
      console.log(lastArray);
      return lastArray;
    })
    .then((a) => {
      fetch(`http://localhost:3000/user/${a}`, {
        method: "DELETE",
      });
    });
}

//////Deleting last users of the table
resetButton.addEventListener("click", DeleteLastValue());
