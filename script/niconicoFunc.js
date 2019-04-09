$(document).on({
    'mouseenter' : function () {
        $(this).addClass('hover-date');
    },
    'mouseleave' : function () {
        $(this).removeClass('hover-date');
    }
}, '.calendar td');
