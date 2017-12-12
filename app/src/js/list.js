function printBody(data)
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

$( document ).ready(function() {
  var url = "/api/list"; // the s            cript where you handle the form input.

  $.ajax({
    type: "GET",
    url: url,
    success: function(data)
    {
      printBody(data);
    }
  });
});

$("#form_delete").submit(function(e) {
  let nbChecked = $("input:checkbox[name=deleted]:checked").length;
  console.log(nbChecked);
  if (nbChecked > 0 && confirm("Voulez-vous vraimenter supprimer " + nbChecked + " élément(s) ?"))
  {
    var url = "/api/delete"; // the s            cript where you handle the form input.

    $.ajax({
      type: "DELETE",
      url: url,
      data: $("#form_delete").serialize(), // serializes the form's elements.
      success: function(data)
      {
        printBody(data);
      }
    });
  }


  e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("#btn_select_all").click(function() {
  if($(this).data('select'))
  {
    $("input:checkbox[name=deleted]").prop('checked', false);
    $(this).text("Tout sélectionner").data("select", false);
  } else {
    $("input:checkbox[name=deleted]").prop('checked', true);
    $(this).text("Tout désélectionner").data("select", true);
  }

});
