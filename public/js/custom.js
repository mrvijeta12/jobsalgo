// jQuery(function ($) {
//   "use strict";

//   $("#overlayer").delay(1000).fadeOut("slow");

//   var siteMenuClone = function () {
//     // Prevent double cloning
//     if ($(".site-mobile-menu-body .site-nav-wrap").length === 0) {
//       $(".js-clone-nav").each(function () {
//         $(this)
//           .clone()
//           .removeClass("js-clone-nav")
//           .addClass("site-nav-wrap")
//           .appendTo(".site-mobile-menu-body");
//       });
//     }

//     setTimeout(function () {
//       $(".site-mobile-menu .has-children").each(function (index) {
//         var $this = $(this);

//         // create arrow once
//         if ($this.find("> .arrow-collapse").length === 0) {
//           $this.prepend('<span class="arrow-collapse collapsed"></span>');
//         }

//         // 🔥 generate STABLE unique id
//         var uniqueId =
//           "mobile-collapse-" +
//           index +
//           "-" +
//           Math.random().toString(36).substr(2, 5);

//         $this.find("> .arrow-collapse").attr({
//           "data-toggle": "collapse",
//           "data-target": "#" + uniqueId,
//           "aria-expanded": "false",
//         });

//         $this.find("> ul").attr({
//           class: "collapse",
//           id: uniqueId,
//         });
//       });

//       // ✅ RESET all dropdowns after cloning
//       $(".site-mobile-menu .collapse").removeClass("show");
//       $(".site-mobile-menu .arrow-collapse")
//         .removeClass("active")
//         .addClass("collapsed");
//     }, 1000);

//     $("body").on("click", ".arrow-collapse", function (e) {
//       var $this = $(this);
//       var $collapse = $this.closest("li").find("> .collapse");

//       if ($collapse.hasClass("show")) {
//         $collapse.collapse("hide");
//         $this.removeClass("active");
//       } else {
//         $collapse.collapse("show");
//         $this.addClass("active");
//       }
//       e.preventDefault();
//     });

//     $(window).resize(function () {
//       var $this = $(this),
//         w = $this.width();

//       if (w > 768) {
//         if ($("body").hasClass("offcanvas-menu")) {
//           $("body").removeClass("offcanvas-menu");
//         }
//       }
//     });
//     // 🔥 FIX: keep dropdown & arrow in sync on route changes
//     $("body")
//       .on("show.bs.collapse", ".site-mobile-menu .collapse", function () {
//         $(this)
//           .closest("li")
//           .find("> .arrow-collapse")
//           .addClass("active")
//           .removeClass("collapsed");
//       })
//       .on("hide.bs.collapse", ".site-mobile-menu .collapse", function () {
//         $(this)
//           .closest("li")
//           .find("> .arrow-collapse")
//           .removeClass("active")
//           .addClass("collapsed");
//       });

//     // $("body").on("click", ".js-menu-toggle", function (e) {
//     //   var $this = $(this);
//     //   e.preventDefault();

//     //   if ($("body").hasClass("offcanvas-menu")) {
//     //     $("body").removeClass("offcanvas-menu");
//     //     $this.removeClass("active");
//     //   } else {
//     //     $("body").addClass("offcanvas-menu");
//     //     $this.addClass("active");
//     //   }
//     // });

//     // click outisde offcanvas

//     $("body").on("click", ".js-menu-toggle", function (e) {
//       var $this = $(this);
//       e.preventDefault();

//       if ($("body").hasClass("offcanvas-menu")) {
//         $("body").removeClass("offcanvas-menu");
//         $this.removeClass("active");

//         // ✅ Close all dropdowns when menu is closed
//         $(".site-mobile-menu .collapse").collapse("hide");
//         $(".site-mobile-menu .arrow-collapse")
//           .removeClass("active")
//           .addClass("collapsed");
//       } else {
//         $("body").addClass("offcanvas-menu");
//         $this.addClass("active");

//         // ✅ Force all dropdowns closed when menu opens
//         $(".site-mobile-menu .collapse").collapse("hide");
//         $(".site-mobile-menu .arrow-collapse")
//           .removeClass("active")
//           .addClass("collapsed");
//       }
//     });

//     $(document).mouseup(function (e) {
//       var container = $(".site-mobile-menu");
//       if (!container.is(e.target) && container.has(e.target).length === 0) {
//         if ($("body").hasClass("offcanvas-menu")) {
//           $("body").removeClass("offcanvas-menu");
//         }
//       }
//     });
//   };
//   siteMenuClone();

//   var sitePlusMinus = function () {
//     $(".js-btn-minus").on("click", function (e) {
//       e.preventDefault();
//       if ($(this).closest(".input-group").find(".form-control").val() != 0) {
//         $(this)
//           .closest(".input-group")
//           .find(".form-control")
//           .val(
//             parseInt(
//               $(this).closest(".input-group").find(".form-control").val()
//             ) - 1
//           );
//       } else {
//         $(this).closest(".input-group").find(".form-control").val(parseInt(0));
//       }
//     });
//     $(".js-btn-plus").on("click", function (e) {
//       e.preventDefault();
//       $(this)
//         .closest(".input-group")
//         .find(".form-control")
//         .val(
//           parseInt(
//             $(this).closest(".input-group").find(".form-control").val()
//           ) + 1
//         );
//     });
//   };
//   // sitePlusMinus();

//   var siteIstotope = function () {
//     /* activate jquery isotope */
//     var $container = $("#posts").isotope({
//       itemSelector: ".item",
//       isFitWidth: true,
//     });

//     $(window).resize(function () {
//       $container.isotope({
//         columnWidth: ".col-sm-3",
//       });
//     });

//     $container.isotope({ filter: "*" });

//     // filter items on button click
//     $("#filters").on("click", "button", function (e) {
//       e.preventDefault();
//       var filterValue = $(this).attr("data-filter");
//       $container.isotope({ filter: filterValue });
//       $("#filters button").removeClass("active");
//       $(this).addClass("active");
//     });
//   };

//   siteIstotope();

//   var fancyBoxInit = function () {
//     $(".fancybox").on("click", function () {
//       var visibleLinks = $(".fancybox");

//       $.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

//       return false;
//     });
//   };
//   fancyBoxInit();

//   var stickyFillInit = function () {
//     $(window)
//       .on("resize orientationchange", function () {
//         recalc();
//       })
//       .resize();

//     function recalc() {
//       if ($(".jm-sticky-top").length > 0) {
//         var elements = $(".jm-sticky-top");
//         Stickyfill.add(elements);
//       }
//     }
//   };
//   stickyFillInit();

//   // navigation
//   // var OnePageNavigation = function () {
//   //   var navToggler = $(".site-menu-toggle");
//   //   $("body").on(
//   //     "click",
//   //     ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
//   //     function (e) {
//   //       e.preventDefault();

//   //       var hash = this.hash;

//   //       $("html, body").animate(
//   //         {
//   //           scrollTop: $(hash).offset().top,
//   //         },
//   //         600,
//   //         "easeInOutCirc",
//   //         function () {
//   //           window.location.hash = hash;
//   //         }
//   //       );
//   //     }
//   //   );
//   // };
//   // OnePageNavigation();

//   var OnePageNavigation = function () {
//     var navToggler = $(".site-menu-toggle");

//     $("body").on(
//       "click",
//       ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
//       function (e) {
//         e.preventDefault();
//         var hash = this.hash;

//         // Only run smooth scroll if element exists
//         if (hash && $(hash).length) {
//           $("html, body").animate(
//             {
//               scrollTop: $(hash).offset().top,
//             },
//             600,
//             "easeInOutCirc",
//             function () {
//               window.location.hash = hash;
//             }
//           );
//         }
//         //  else {

//         //   window.location.href = this.href;
//         // }
//       }
//     );
//   };
//   OnePageNavigation();

//   var counterInit = function () {
//     if ($(".section-counter").length > 0) {
//       $(".section-counter").waypoint(
//         function (direction) {
//           if (
//             direction === "down" &&
//             !$(this.element).hasClass("ftco-animated")
//           ) {
//             var comma_separator_number_step =
//               $.animateNumber.numberStepFactories.separator(",");
//             $(".number").each(function () {
//               var $this = $(this),
//                 num = $this.data("number");
//               // console.log(num);
//               $this.animateNumber(
//                 {
//                   number: num,
//                   numberStep: comma_separator_number_step,
//                 },
//                 7000
//               );
//             });
//           }
//         },
//         { offset: "95%" }
//       );
//     }
//   };
//   counterInit();

//   var selectPickerInit = function () {
//     $(".selectpicker").selectpicker();
//   };
//   selectPickerInit();

//   var owlCarouselFunction = function () {
//     $(".single-carousel").owlCarousel({
//       loop: true,
//       margin: 0,
//       nav: true,
//       autoplay: true,
//       items: 1,
//       nav: false,
//       smartSpeed: 1000,
//     });
//   };
//   owlCarouselFunction();

//   var quillInit = function () {
//     var toolbarOptions = [
//       ["bold", "italic", "underline", "strike"], // toggled buttons
//       ["blockquote", "code-block"],

//       [{ header: 1 }, { header: 2 }], // custom button values
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }], // superscript/subscript
//       [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//       [{ direction: "rtl" }], // text direction

//       [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],

//       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//       [{ font: [] }],
//       [{ align: [] }],

//       ["clean"], // remove formatting button
//     ];

//     if ($(".editor").length > 0) {
//       var quill = new Quill("#editor-1", {
//         modules: {
//           toolbar: toolbarOptions,
//         },
//         placeholder: "Compose an epic...",
//         theme: "snow", // or 'bubble'
//       });
//       var quill = new Quill("#editor-2", {
//         modules: {
//           toolbar: toolbarOptions,
//         },
//         placeholder: "Compose an epic...",
//         theme: "snow", // or 'bubble'
//       });
//     }
//   };
//   quillInit();
// });
