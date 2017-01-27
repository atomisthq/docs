function scrollTocIntoView() {
  $(function() {
    $.fn.isFullyWithinViewport = function(){
      try {
        var viewport = {};
        viewport.top = $(window).scrollTop();
        viewport.bottom = viewport.top + $(window).height();
        var bounds = {};
        bounds.top = this.offset().top;
        bounds.bottom = bounds.top + this.outerHeight();
        return ( ! (
              (bounds.top <= viewport.top) ||
              (bounds.bottom >= viewport.bottom)
              ) );
      } catch (e) {return true}
    };
    if( $('li.third-level.active') &&
        !$('li.third-level.active').isFullyWithinViewport() &&
        !$('.bs-sidebar').is(':hover')) {
      $('.bs-sidebar')
        .scrollTop(
            $('li.third-level.active').offset().top -
            $('.bs-sidebar').offset().top -
            60
            );
    }
  });
}

/* Highlight */
$( document ).ready(function() {
    hljs.initHighlightingOnLoad();
    $('table').addClass('table table-striped table-hover');
    scrollTocIntoView();
    $(window).scroll(function(){
      scrollTocIntoView();
    });
});

$('body').scrollspy({
    target: '.bs-sidebar',
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});
