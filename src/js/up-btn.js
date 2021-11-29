$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('.upbutton').fadeIn();
  } else {
    $('.upbutton').fadeOut();
  }
});

$('.upbutton').click(scrollToTop);

export function scrollToTop() {
  $('html,body').animate(
    {
      scrollTop: 0,
    },
    600,
  );
  return false;
}
