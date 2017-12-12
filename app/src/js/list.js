$( document ).ready(function() {
  var url = "/api/list"; // the s            cript where you handle the form input.

  $.ajax({
    type: "GET",
    url: url,
    success: function(data)
    {
      let headers = [];
      let bodyTable = '';
      Object.keys(data.data[0]).forEach((key, index) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });

      data.data.forEach((user, index) => {
        bodyTable += `<tr>\
          <th scope="row"><input type="checkbox" name="deleted" value="${index}" /></th>\
          <td>${user.firstname}</td>\
          <td>${user.lastname}</td>\
          <td>${user.address}</td>\
          <td>${user.pseudo}</td>\
          <td>${user.email}</td>\
        </tr>`
      });

      $('#tbody_table_users').html(bodyTable);
    }
  });
});

$("#form_delete").submit(function(e) {
  var url = "/api/delete"; // the s            cript where you handle the form input.

  $.ajax({
    type: "DELETE",
    url: url,
    data: $("#form_delete").serialize(), // serializes the form's elements.
    success: function(data)
    {
      $('#response')
        .removeClass("hidden alert-danger")
        .addClass("alert-success")
        .text(data.message); // show response from the php script.
    }
  });

  e.preventDefault(); // avoid to execute the actual submit of the form.
});
