jQuery(document).ready(function ($) {
  var form = $('form[name="form1"]'),
    radio = $('input[name="collection"]'),
    choice = "";
  const username = document.getElementById("username").value;
  form.attr("action", "/forgot/phone/" + username);
  radio.change(function (e) {
    choice = this.value;

    if (choice === "yes") {
      form.attr("action", "/forgot/phone/" + username);
    } else {
      form.attr("action", "/forgot/email/" + username);
    }
  });
});
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
