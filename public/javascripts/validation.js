$('#createPost').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#title').val() || !$('textarea#description').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger"> Title and description required, please try again</div>');
    }
    return false;
  }
});

$('#local-reg').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#username').val() || !$('input#password').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger"> Username and password required, please try again</div>');
    }
    return false;
  }
});
