/**
 * Created by Jazz on 6/19/2016.
 */
$(document).ready(function () {
    $('#an2').click(function () {
        $('#an1').addClass('animated fadeOutLeft');
        $('#an2').addClass('animated fadeOutLeft');
    })
});



$(document).on('click', '#an2', function() {
    $('#an1').addClass('animated fadeOutLeft');
    $('#an2').addClass('animated fadeOutLeft');
});