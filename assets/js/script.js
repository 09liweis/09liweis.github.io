$(function() {
    'use strict';
    $('.percentage').each(function() {
        $(this).animate({
            'width': $(this).data('percentage'),
        });
    });
});