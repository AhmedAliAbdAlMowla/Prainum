const qrGen = (i, user, fileId) => {
  document.getElementById("qrcode").innerHTML = "";
  let location = window.location.href;
  let qrText =
    location.substr(0, location.length - 13) +
    "/file/share/" +
    user +
    "/" +
    fileId;
  console.log(qrText);

  const options = {
    // ====== Basic
    text: qrText,
    width: 256,
    height: 256,
    quietZone: 0,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
    dotScale: 1,
  };

  // Create QRCode Object
  new QRCode(document.getElementById("qrcode"), options);
  document.getElementById("Qr_pop").style.display = "block";
  let share = document.querySelectorAll("#share")[i];
  share.checked = true;
  ShareSwitch(i, fileId);
};
const qrDownload = () => {
  let src = document.getElementById("qrcode").getElementsByTagName("img")[0]
    .src;
  console.log(src);
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.setAttribute("href", src);
  link.setAttribute("download", "Praium-File-QrCode.png");
  link.click();
};

function pop(i, user, fileId) {
  document.getElementById("link_pop").style.display = "block";

  let urData = `/file/share/${user}/${fileId}`;

  let location = window.location.href;
  urData = location.substr(0, location.length - 13) + urData;
  document.getElementById("url").value = urData;
  let share = document.querySelectorAll("#share")[i];
  share.checked = true;
  ShareSwitch(i, fileId);
}

const ShareSwitch = (i, fileId) => {
  let share = document.querySelectorAll("#share")[i];

  let data;

  if (share.checked == true) {
    data = {
      fileId: fileId,
      state: true,
    };
  } else {
    data = {
      fileId: fileId,
      state: false,
    };
  }


  
  fetch("http://" + window.location.hostname +":8080"+ "/file/setShareState", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
//        copy
const copy = () => {
  let urData = document.getElementById("url");
  urData.select();
  urData.setSelectionRange(0, 99999);
  document.execCommand("copy");
  let x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");

    document.getElementById("link_pop").style.display = "none";
  }, 1600);
};

function readSingleFile(e) {
  const name = e[0].name;
  document.getElementById("file-label").textContent = name;
}

// /////////////////

(function ($) {
  "use strict";

  /* Preloader */
  $(window).on("load", function () {
    var preloaderFadeOutTime = 500;

    function hidePreloader() {
      var preloader = $(".spinner-wrapper");
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on("scroll load", function () {
    if ($(".navbar").offset().top > 60) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on("click", "a.page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          600,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function (event) {
    if (!$(this).parent().hasClass("dropdown"))
      $(".navbar-collapse").collapse("hide");
  });

  /* Back To Top Button */
  // create the back to top button
  $("body").prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $("a.back-to-top").fadeIn("500");
    } else {
      $("a.back-to-top").fadeOut("500");
    }
  });

  /* Removes Long Focus On Buttons */
  $(".button, a, button").mouseup(function () {
    $(this).blur();
  });

  /* Removes Long Focus On Buttons */
  $(".button, a, button").mouseup(function () {
    $(this).blur();
  });
})(jQuery);