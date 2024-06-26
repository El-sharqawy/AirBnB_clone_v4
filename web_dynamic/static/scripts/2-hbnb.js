/*
 * If in the status is “OK”
 * add the class available to the div#api_status
 * Otherwise
 * remove the class available to the div#api_status.
 */

$(document).ready(function () {
  const aments = {};
  $('input:checkbox').change(function () {
    const input = $(this)[0];
    const id = input.dataset.id;
    const name = input.dataset.name;

    if ($(this).is(':checked')) {
      aments[id] = name;
    } else {
      delete aments[id];
    }
    let text = Object.values(amnt).toString().slice(0, 28);

    text += text.length >= 28 ? '...' : '';
    if (text === '') {
      text = '&nbsp;';
    }
    $('#amnts_cheked').html(text);
  });

  CheckAPIStatus();
});

function CheckAPIStatus () {
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    dataType: 'text',
    success: function (data) {
      const status = JSON.parse(data).status;
      if (status !== 'OK') {
        return;
      }
      if ($('#api_status').hasClass('available')) {
        $('#api_status').removeClass('available');
      } else {
        $('#api_status').addClass('available');
      }
    }
  });
}
