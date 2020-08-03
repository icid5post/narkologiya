// Carousels init

$('.main-banner').owlCarousel({
    loop:true,
    margin: 0,
    nav: true,
    dots: true,
    items:1,
});

$('.news-slider').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 0,
    nav: true,
    dots: false,
    items: 1,
});

$('.news-section-slider').owlCarousel({
    loop:true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ["<i data-feather='chevron-left'></i>","<i data-feather='chevron-right'></i>"],
    responsive:{
        0:{
            items:1,
        },
        480:{
            items:2,
        },
        750:{
            items:3,
        },
        1000:{
            items:4,
        }
    }
});

$('.partners-slider').owlCarousel({
    loop:true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ["<i data-feather='chevron-left'></i>","<i data-feather='chevron-right'></i>"],
    responsive:{
        0:{
            items:1,
        },
        480:{
            items:2,
        },
        750:{
            items:3,
        },
        1000:{
            items:4,
        }
    }
});


// Datepicker
$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'dd:mm:yyyy',
        language: 'ru'
    });
});


$('.gallery-list').lightGallery({
    selector: '.gall-img',
    thumbnail: false
});


// Toggle slide nav
$(document).ready(function(){

    var slideout = new Slideout({
        'panel': document.getElementById('wrapper'),
        'menu': document.getElementById('sidebarMenu'),
        'padding': 256,
        'tolerance': 70
    });

    $(document).on('click', '.sideout-toggle', function (e) {
        e.preventDefault();
        slideout.toggle();
    });

    $(document).on('click', '.slideout-menu-close', function (e) {
        e.preventDefault();
        slideout.close();
    });

});

//Init tooltips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()
});

//Forms validation
$(document).ready(function(){
    var forms = $('.from-validation');
// Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});


//Custom select
$(document).ready(function () {
    $('.ex-select').selectpicker();
});

//Custom file upload
function bs_input_file() {
    $(".input-file").before(
        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
$(function() {
    bs_input_file();
});


//Sidebar nav

$(document).ready(function () {
    $("#metismenu").metisMenu();
});



//Progress chart
$(document).ready(function () {

});
