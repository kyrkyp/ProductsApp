$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3000/api/users",
    type: "GET",
    dataType: "json",
  }).done(function (response) {
    console.log(response);

    let data = response.data;

    let status = response.status;

    if (status) {
      createTbody(data);
    } else {
      console.log("Error getting users");
    }
  });

  $(".row").on("click", ".btnSubmit", function () {
    console.log("clicked");

    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();

    console.log(username, password, name, surname, email);

    const item = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      email: email,
    };

    console.log(item);

    $.ajax({
      url: "http://localhost:3000/api/users",
      type: "POST",
      data: item,
      dataType: "json",
    }).done(function (response) {
      console.log(response);

      let status = response.status;

      if (status) {
        console.log("User created");
      } else {
        console.log("Error creating user");
      }
    });
  });
});

function createTbody(data) {
  console.log(data);

  const len = data.length;

  for (let i = 0; i < len; i++) {
    let username = data[i].username;
    let name = data[i].name;
    let surname = data[i].surname;
    let email = data[i].email;

    console.log(username, name, surname, email);

    let tr_str =
      "<tr>" +
      "<td>" +
      username +
      "</td>" +
      "<td>" +
      name +
      "</td>" +
      "<td>" +
      surname +
      "</td>" +
      "<td>" +
      email +
      "</td>" +
      "</tr>";

    $("#userTable tbody").append(tr_str);
  }
}
