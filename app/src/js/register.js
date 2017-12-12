$("#form_register").submit(function(e) {
  var url = "/api/register"; // the s            cript where you handle the form input.

  $.ajax({
    type: "POST",
    url: url,
    data: $("#form_register").serialize(), // serializes the form's elements.
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
