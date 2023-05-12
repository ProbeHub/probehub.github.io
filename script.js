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
  var typed = new Typed('.hero-container h1', {
    strings: ['<span>Coming Soon...</span><span class="typed-cursor"></span>'],
    typeSpeed: 150,
    backSpeed: 0,
    smartBackspace: false,
    loop: false,
    cursorChar: '|'
  });
});
