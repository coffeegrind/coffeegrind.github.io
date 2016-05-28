(function ($) {
    // adds classes then removes it after animations complete
    $.fn.hotClass = function (classList, callback) {
        this.addClass(classList);
        var onAnimationEnd = function ($this) {
            return function (e) {
                $this.removeClass(classList);
                if (callback) callback(e);
            };
        };
        this.one('webkitAnimationEnd oAnimationEnd msAnimationEnd animationend', onAnimationEnd(this));
    };
}(jQuery));

// COLLAPSE MENU

$(document).ready(function() {
    /*$('.slide-button').click(function() {
        $('.menu').toggleClass('open');
    })*/
});

// MAILCHIMP
// -- Adapted from http://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration

$(document).ready(function() {

    // spam-free email links (a#email)
    var email = document.getElementById('email');
    if (email) {
        email.setAttribute('href', email.getAttribute('href').replace('nospam-at-', 'hello@'));
        email.innerHTML = email.innerHTML.replace('nospam-at-', 'hello@');
    }
  
    // Validate email
    function isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if ($('.subscribe form').length > 0) {
        $('form input[type="submit"]').bind('click', function(event) {
            if (event) event.preventDefault();
            
            var $email = $(".subscribe form [name='email']");
            if (!isEmail($email.val())) {
                $email.focus();
                if ($email.val().length > 0) {
                    $email.select();
                    $email.hotClass('animated shake');
                }
            } else {
                register($('.subscribe form'));
            }
        });
    }
});

function register($form) {
    // Prepare for Mailchimp
    var email = $form.find('input[type=email]');
    email.attr('name', 'EMAIL');

    var data = {};
    var dataArray = $form.serializeArray();
    $.each(dataArray, function(index, item) {
        data[item.name] = item.value;
    });

    $.ajax({
        url: '//startupshell.us8.list-manage.com/subscribe/post-json?u=ab309f640b0f94f8e5fd0a2e8&amp&id=af8824bb76&c=?',
        data: data,
        dataType: 'jsonp',
        error: function(err) {
            console.log(err);
            alert("Could not connect to the subscription server. Please try again later.");
        },
        success: function(data) {
            if (data.result !== "success") {
                console.log(data);
                alert("Submittion error. Please try again.");
            } else {
                $('.subscribe form input[type=submit]').prop('value', 'Success!');
                $('.subscribe form input[type=submit]').css('background', 'green');
            }
        }
    });
}
