
// Når man lager ny sak eller redigerer sak, fade dialogboks inn
$(document).on('click', '#add-box-btn', function () {
  $(".new-case").hide().fadeIn(300);
});

$(document).on('click', '#totop', function () {
  $(".new-case").hide().fadeIn(300);
});

// Når man trykker på cancel, fade dialogboks ut
$(document).on('click', '#cancel-case-btn', function () {
  $(".new-case").fadeOut(300, function () {
    $('.new-case').remove(function () {
      $('.list-page').slideUp(300);
    });
  });
});

// Funksjon som skroller vinduet helt til toppen
$(document).on('click', '#totop', function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

