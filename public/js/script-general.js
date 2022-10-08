(function ($) {

    $(document).ready(function() {

        /**
         =================================================
         Sticky Scroll Script Begin
         =================================================
         +*/

        $(window).scroll(function() {

            if (this.scrollY > 20) {
                $('.cc-navbar').addClass("cc-sticky");
            } else {
                $('.cc-navbar').removeClass("cc-sticky");
            }

            if (this.scrollY > 500) {

                $('.cc-scroll-up-btn').addClass("cc-show");

            } else {

                $('.cc-scroll-up-btn').removeClass("cc-show");

            }

        });

        /***** ===== Sticky Scroll Script End ===== *****/



        /**
         =================================================
         Toggle Menu/Navbar Script Begin
         =================================================
         +*/

        $(".me-menu-btn").click(function() {

            $(".me-navbar-sidebar").addClass("me-show");

            $(".me-navbar-sidebar-overlay").addClass("me-show");

        });

        $(".me-menu-icon-close, .me-navbar-sidebar-overlay").click(function() {

            $(".me-navbar-sidebar").removeClass("me-show");

            $(".me-navbar-sidebar-overlay").removeClass("me-show");

        });

        /***** ===== Toggle Menu/Navbar Script End ===== *****/



        /**
         =================================================
         Slide-up Script Begin
         =================================================
         +*/

        $('.cc-scroll-up-btn').click(function() {

            $("html").animate({
                scrollTop: 0,
            });

        });

        /***** ===== Slide-up Script End ===== *****/



        /**
         =================================================
         Owl Carousel Script Begin
         =================================================
         +*/

        $(".cc-hero-slide").owlCarousel({

            margin: 0,

            loop: true,

            autoplay: true,

            autoplayTimeOut: 100,

            autoplayHoverPause: true,

            smartSpeed: 650,

            responsive: {

                0: {
                    items: 1,
                    nav: false
                },

                600: {
                    items: 1,
                    nav: false
                },

                1000: {
                    items: 1,
                    nav: false
                }

            }

        });

        $(".cc-user-choice").owlCarousel({

            margin: 50,

            loop: true,

            autoplay: false,

            autoplayTimeOut: 100,

            autoplayHoverPause: true,

            smartSpeed: 650,

            responsive: {

                0: {
                    items: 1,
                    nav: true
                },

                600: {
                    items: 2,
                    nav: true
                },

                1000: {
                    items: 3,
                    nav: true
                }

            }

        });

        $(".cc-tabs").owlCarousel({

            margin: 30,

            loop: true,

            autoplay: false,

            autoplayTimeOut: 100,

            autoplayHoverPause: true,

            smartSpeed: 650,

            responsive: {

                0: {
                    items: 3,
                    nav: false
                },

                600: {
                    items: 4,
                    nav: false
                },

                1000: {
                    items: 5,
                    nav: false
                }

            }

        });

        /***** ===== Owl Carousel Script End ===== *****/

    });

}(jQuery));
