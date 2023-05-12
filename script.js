// Code for smooth scrolling
$(document).ready(function() {
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  // Code for text typing animation
  var typed = new Typed('.news-container h1 auto-type', {
    strings: ["Welcome to ProbeHub", "New contents are coming soon..."],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true,
  });
});
