var ORDER_FORM_ID = "#form_writer_registration";
var FORM_VALIDATOR_OPTIONS_RULES = {
    rules: {
        name: {
            required: true,
            onlyLatinName: true,
            minlength: 2,
            maxlength: 20
        },
        surname: {
            required: true,
            onlyLatinName: true,
            minlength: 2,
            maxlength: 20
        },
        birthday: {
            required: true,
            digitsBfault: true,
            validDate: true,
            legalage: true
        },
        gender: "required",
        country: "required",
        city: {
            required: true,
            onlyLatinAndSymbol: true,
            minlength: 3
        },
        email: {
            required: true,
            forbiddenMails: true,
            temporaryMails: true,
            email: true
        },
        phone: {
            required: true,
            digits: true,
            minlength: 7,
            maxlength: 13
        },
        alt_phone: {
            digits: true,
            minlength: 7,
            maxlength: 13
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 24,
            onlyLatinAndSymbol: true,
        },
        password_confirm: {
            required: true,
            onlyLatinAndSymbol: true,
            equalTo: "#password",
            minlength: 6,
            maxlength: 24
        },
        native_laguage: "required",
        'other_language[]': {
            required: true
        },
        academic_level: "required",
        degree: {
            required: true,
            onlyLatinAndSymbol: true,
            minlength: 3,
            maxWordCount: ['15']
        },
        'disciplines[]': {
            disciplinesSpesial: true
        },
        'software[]': {
            required: true,
            minlength: 1,
            maxlength: 10
        },
        about: {
            required: true,
            onlyLatinSpecSymbols: true,
            wordCount: ['3', '500']
        },
        motivationletter: {
            required: true,
            onlyLatinSpecSymbols: true,
            wordCount: ['3', '100']
        },
        referer: 'required',
        recommendation: {
            required: true,
            // onlyLatin: true,
            onlyLatinAndSymbol: true,
            // minlength: 3,
            maxWordCount: ['5']
        },
        other: {
            required: true,
            onlyLatinAndSymbol: true,
            maxWordCount: ['5']
        },
        referer_custom: {
            required: true,
            maxWordCount: ['5'],
            onlyLatinAndSymbol: true
        },
        socialacc: {
            required: true,
            onlyLatinAndSymbol: true,
        },
        telegram: 'required',
        agree: 'required'
    },
    messages: {
        name: {
            required: "Please enter a valid value",
            minlength: "Please enter no less than 2 characters",
            maxlength: "Please enter less than 20 characters"
        },
        surname: {
            required: "Please enter a valid value",
            minlength: "Please enter no less than 2 characters",
            maxlength: "Please enter less than 20 characters"
        },
        birthday: {
            digitsBfault: "Please provide a valid date",
            validDate: "Please insert the correct date in a format: dd/mm/yyyy"
        },
        gender: "Please select your gender",
        country: "Please provide a valid country",
        city: {
            required: "Please enter a valid value",
            minlength: "Please enter no less than 3 characters"
        },
        email: {
            email: "Your email address must be in the format of name@domain.com"
        },
        phone: {
            digits: "Please provide a valid number",
            minlength: "Phone should be at least 7 symbols and 13 symbols maximum",
            maxlength: "Phone should be at least 7 symbols and 13 symbols maximum"
        },
        alt_phone: {
            digits: "Please provide a valid number",
            minlength: "Phone should be at least 7 symbols and 13 symbols maximum",
            maxlength: "Phone should be at least 7 symbols and 13 symbols maximum"
        },
        password: {
            required: "Please enter a valid value",
            minlength: "Please enter no less than 6 characters",
            maxlength: "Please enter less than 24 characters"
        },
        password_confirm: {
            required: "Please enter a valid value",
            equalTo: "Password Mismatch",
            minlength: "Please enter no less than 6 characters",
            maxlength: "Please enter less than 24 characters"
        },
        degree: {
            required: "Please enter a valid value",
            minlength: "Please specify your degree major",
            maxlength: "Please type your response in no more than 15 words"
        },
        'disciplines[]': {
            required: "Please select at least 3 disciplines",
            minlength: "Please select at least 3 disciplines",
            maxlength: "Please select from no more then 7 disciplines"
        },
        'software[]': {
            required: "Please select at least 1 option",
            minlength: "Please select at least 1 option",
            maxlength: "Please select from no more then 10 option"
        },
        about: {
            required: "Please submit no less than 3 words and no more than 500 words",
            wordCount: "Please submit no less than 3 words and no more than 500 words"
        },
        motivationletter: {
            required: "Please submit no less than 3 words and no more than 100 words",
            wordCount: "Please submit no less than 3 words and no more than 100 words"
        },
        referer: {
            required: "Let us know how did you learn about our service"
        },
        recommendation: {
            required: "Please specify who recommended us"
        },
        other: {
            required: "Please specify how did you learn about us"
        },
        referer_custom: {
            required: "Please specify how did you learn about us"
        },
        socialacc: {
            required: "Please enter a valid value",
            minlength: "Please submit than 3-5 words"
        },
        telegram: {
            required: "To be informed about our updates you have to agree with the use of Telegram app"
        },
        agree: {
            required: "To start working with us you have to agree with our policies first"
        }
    },
    invalidHandler: function (form, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            validator.errorList[0].element.focus();
        }
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
};

function checkMails() {

        if (!$("input#email").hasClass("error")) {
        
        let email = $("input#email").val();
        console.log('email_check', email);
                    $.ajax({
                        url: "?ajax=checkMails",
                        dataType: "json",
                        type: 'POST',
                        data: {email: email},
                        async: false, 
                        success: function (response) {
                            if (response.duplicate_email) {
                                $("#email").parents(".form__block").find("label.error").remove();
                                $("#email").addClass("error");
                                $("#email").parents(".form__block").append('<label for="email" generated="true" class="error duplicate_error">' + response.duplicate_email + '</label>');
                            } else {
                                $("#email").removeClass("error");
                                $("#email").parents(".form__block").find("label.error").remove();
                            }
                        }
                    });
        }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}
;

function changeStap(tab_id) {
    $('.tab__link.active-tab').addClass('tab__link--filled');
    $('.form__tabs .tab__link').removeClass('active-tab');
    $('.tab__content').removeClass('active-tab');
    $(this).addClass('active-tab');
    $("div[data-tab='" + tab_id + "']").addClass('active-tab');
    $("#" + tab_id).addClass('active-tab');
}

function hideDisciplines(len, Value, Text, Choice) {
    len += $('.form__block3 .menu .item.active').length;
    if (len >= 7) {
        $('.form__block3 .menu .item[data-value!=' + Value + ']').each(function () {
            var element = $(this);
            if (!element.hasClass('active')) {
                $(element).addClass("disabled_dis");
            }
        });

        $("body").on("click", ".menu.transition.visible", function (e) {

            if (len >= 7) {
                $(".apply-form .multiple-group label.error").hide();

                $(".disciplines_main_wrapper").append('<label for="dropdown-discipline-my" generated="true" class="error new_custom_error" style="display: block;">You can select no more than 7 disciplines</label>');

                setTimeout(function () {
                    $("body").find(".new_custom_error").remove();
                }, 2000);
            }



        })

    } else if (len < 7) {
        $('.form__block3 .menu .item').each(function () {
            $(this).removeClass("disabled_dis");
        });
    }
}

function initVerificationContent(verification_data, email) {
    var verification_button = $("[data-verification-view] [data-verify-button]");
    verification_button
            .attr('data-count-verify-attempts', verification_data.email_verification_max_new_admin - verification_data.email_verification_count)
            .attr('data-max-count-verify-attempts', verification_data.email_verification_max_new_admin)
            .attr('data-verification-url', verification_data.verification_url);

    $("[data-verification-view] [data-email-view]").html(email);
    $("[data-verification-view] [data-count-attempts-span]")
            .html(verification_data.email_verification_max_new_admin - verification_data.email_verification_count);

    console.log('init 1 ', verification_button.length, email, $("[data-verification-view] [data-email-view]").length);
}

function showTimerButton($timeBlock, callbackAfterStopTimer) {
    var callbackAfterStopTimer = callbackAfterStopTimer || null;
    var intervalEmail = setInterval(function () {

        var timeNow = Math.floor(Date.now() / 1000);
        var time = $timeBlock.attr('data-time-left-verify') - timeNow;
        if (time > 0) {

            $timeBlock.show();
            var minutes = Math.floor(time / 60);
            if (minutes < 10) {
                minutes = '0' + minutes.toString();
            }

            var seconds = time % 60;
            if (seconds < 10) {
                seconds = '0' + seconds.toString();
            }

            var timeShow = minutes + ':' + seconds;
            $timeBlock.text(
                    $timeBlock.attr('data-text').replace('%time%', timeShow)
                    );
        } else {
            $timeBlock.hide();
            clearInterval(intervalEmail);
            callbackAfterStopTimer($timeBlock);
        }
    }, 1000);
}

if (typeof site_url === 'undefined') {
    var site_url = '';
}

$(function () {
    $(document).ready(function () {
        var tmpEmailDomains = [];
        $.getJSON('/public/js/form_validate_configs/temporary_email_domains.json', false, function (data) {
            tmpEmailDomains = data;
        });

        /**/
        var remember_fields = $(ORDER_FORM_ID).find(
                '[name="name"],[name="surname"],[name="birthday"],[name="gender"],[name="country"],[name="city"],' +
                '[name="email"],[name="phone"],[name="email_alt"],[name="alt_phone"],[name="native_laguage"],' +
                '[name^="other_language"],[name="academic_level"],[name="degree"],[name^="disciplines"],[name^="software"],' +
                '[name="avalible24"],[name="avalibleurgentorders"],[name="about"],[name="motivationletter"],[name="referer"],' +
                '[name="socialacc"],[name="recommendation"],[name="referer_custom"]');
      /*  remember_fields.bind("click change keyup", function () {
            var self = this;
            if (self.timer)
                clearTimeout(self.timer);

            self.timer = setTimeout(function ()
            {
                self.timer = null;
                var remember_fields_serialize = $(ORDER_FORM_ID).find(
                        '[name="name"],[name="surname"],[name="birthday"],[name="gender"],[name="country"],[name="city"],' +
                        '[name="email"],[name="phone"],[name="email_alt"],[name="alt_phone"],[name="native_laguage"],' +
                        '[name^="other_language"],[name="academic_level"],[name="degree"],[name^="disciplines"],[name^="software"],[name="avalible24"],' +
                        '[name="avalibleurgentorders"],[name="about"],[name="motivationletter"],[name="referer"],' +
                        '[name="socialacc"],[name="recommendation"],[name="referer_custom"]'
                        ).serialize();

                callAjax('json', site_url + '/apply.html?ajax=remember_input', function () {}, remember_fields_serialize, $(this).closest("form" + ORDER_FORM_ID));
            }, 10);
        });*/
        /**/

        $(".password-wrapper").each(function (index) {
            $(this).on("click", function () {
                if (!$(this).hasClass("toggle-password")) {
                    $(this).addClass("toggle-password");
                    $(this).prev(".form__input").attr('type', 'password');
                } else {
                    $(this).removeClass("toggle-password");
                    $(this).prev(".form__input").attr('type', 'text');
                }
            });
        });

        $('#country-dropdown').dropdown({
            onChange: function () {
                var code = $("#country-dropdown option:selected").attr('phone_prefix');
                $("#_phone_prefix, #_alt_phone_prefix").text("+" + code);
            }
        });
        $('#lang-dropdown').dropdown();

        $('#other-lang-dropdown').dropdown({
            maxSelections: 10,
            // useLabels: false,
            onChange: function () {
                if ($("#other-lang-dropdown").dropdown("get value").length - 1 >= 1 && !$.inArray("999", $("#other-lang-dropdown").dropdown("get value"))) {
                    $('#other-lang-dropdown option[value="999"]').attr("selected", false);
                    $('.other_lang_wrp').find(".menu .item[data-value='999']").removeClass("active").removeClass("filtered");
                    $('.other_lang_wrp').find("a.ui.label[data-value='999']").remove();

                }
            },

        });

        $(".other_lang_wrp").find(".menu .item.active").on("click", function () {
            let curr_val = $(this).attr("data-value");
            console.log(curr_val);
            $(this).removeClass("active").removeClass("filtered");
            $('.other_lang_wrp').find("a.ui.label[data-value=" + curr_val + "]").remove();
        });

        $('#other-lang-dropdown').dropdown('set selected', ['999']);

        $('#degree-dropdown').dropdown({placeholder: 'Please select'});

        $('#recomendation-dropdown').dropdown({
            'onChange': function (value, text, $choise) {
                if (value == '7') {
                    $('.recomspec').show();
                    $('[name="recommendation"]').show();
                    $('.otherspec').hide();
                } else if (value == '999') {
                    $('.otherspec').show();
                    $('[name="referer_custom"]').show();
                    $('.recomspec').hide();
                } else {
                    $('.recomspec').hide();
                    $('.otherspec').hide();
                }
            }
        });

        $('.ui.no.label').dropdown({
            useLabels: false,
            onAdd: function (Value, Text, Choice) {
                hideDisciplines(1, Value, Text, Choice);
            },
            onRemove: function (Value, Text, Choice) {
                hideDisciplines(-1, Value, Text, Choice);
            }
        });

        $('#dropdown-software').dropdown({
            maxSelections: 10
        });

        $(ORDER_FORM_ID).find("input[name='timezone']").val(new Date().getTimezoneOffset() / 60 * -1);



        jQuery.validator.addMethod("onlyLatinName", function (value, element) {
            return this.optional(element) || /^[a-z .'\- \r\n]+$/ig.test(value);
        },
                jQuery.validator.format("Please enter only latin characters")
                );


        jQuery.validator.addMethod("onlyLatin", function (value, element) {
            return this.optional(element) || /^[a-z \r\n]+$/ig.test(value);
        },
                jQuery.validator.format("Please enter only latin characters")
                );

        jQuery.validator.addMethod("onlyLatinAndSymbol", function (value, element) {
            return this.optional(element) || /^[a-z0-9 ~`!@#£€$¢¥§%°^&*()\-_+={}\[\]\|\\\/:;“’'"<>,\.\?]+$/ig.test(value);
        },
                jQuery.validator.format("Please enter only latin characters")
                );




        jQuery.validator.addMethod("onlyLatinSpecSymbols", function (value, element) {
            return this.optional(element) || /^[a-z0-9 \r\n$&+,:"'`“«»„“‘’”“”‘ `;=?@#|/'<>.^*()%!-]+$/ig.test(value);
        },
                jQuery.validator.format("Please enter only latin characters")
                );

        jQuery.validator.addMethod("validDate", function (value, element) {
            return this.optional(element) || /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/.test(value);
        },
                jQuery.validator.format("Please insert the correct date in a format: dd/mm/yyyy")
                );

        jQuery.validator.addMethod("legalage", function (value, element) {
            var date = value.split('/');
            if (date[2] > 2005) {
                return false;
            } else {
                return true;
            }
        }, jQuery.validator.format("You must be of legal age to start cooperating with us"));

        jQuery.validator.addMethod("wordCount", function (value, element, params) {
            var typedWords = jQuery.trim(value).split(' ').length;
            if (typedWords >= params[0] && typedWords <= params[1]) {
                return true;
            }
            var typedWords = jQuery.trim(value).split('\n').length;
            if (typedWords >= params[0] && typedWords <= params[1]) {
                return true;
            }
        },
                jQuery.validator.format("A maximum of {0} words is required here.")
                );

        jQuery.validator.addMethod("maxWordCount", function (value, element, params) {
            var typedWords = jQuery.trim(value).split(' ').length;
            if (typedWords == 0) {
                typedWords = jQuery.trim(value).split('\r\n').length
            }
            if (typedWords <= params[0]) {
                return true;
            }
        },
                jQuery.validator.format("A maximum of {0} words is required here.")
                );

        jQuery.validator.addMethod("forbiddenMails", function (value, element) {
            var domains = ['hotmail.com', 'live.com', 'outlook.com', 'aol.com'];
            var email = value.toLowerCase();
            var result = true;

            for (let value of domains) {
                if (email.indexOf(value) != -1) {
                    result = false;
                    break;
                }
            }

            return result;
        },
                jQuery.validator.format("Please use different email (Hotmail / Microsoft accounts cause email delivery problems)")
                );

        jQuery.validator.addMethod("temporaryMails", function (value, element) {
            var email = value.split('@');
            var result = true;

            for (let value of tmpEmailDomains) {
                if (email[0].trim() === value) {
                    result = false;
                    break;
                }
                if (email[1].trim() === value) {
                    result = false;
                    break;
                }
            }

            return result;
        },
                jQuery.validator.format("Please provide a valid permanent email address. Temporary email addresses cannot be used")
                );

        jQuery.validator.addMethod("digitsBfault", function (value, element) {
            var date = value.split('/');
            var result = true;

            for (let value of date) {
                if (isNaN(value)) {
                    result = false;
                    break;
                }
            }

            return result;
        },
                jQuery.validator.format("Please provide a valid date")
                );

        jQuery.validator.addMethod("disciplinesSpesial", function (value, element) {

            var countSelected = 0;
            var result = true;

            $('[name^="disciplines"]').each(function () {
                countSelected += $(this).find('option:selected').length;
            });

            if (countSelected <= 2) {
                $('.multiple-group').removeClass('filled-input');
                result = false;

            } else {

                $('.multiple-group').addClass('filled-input');
            }
            
            if (jQuery("label.error:contains(Please select at least 3 disciplines)").is(":visible")) {
                jQuery("label.error:contains(Please select at least 3 disciplines)").text("");                
            } 

            return result;
        }
        , jQuery.validator.format("Please select at least 3 disciplines")
                );

        
     

        $(ORDER_FORM_ID).validate(FORM_VALIDATOR_OPTIONS_RULES);

        /*$(".form__block3").focusout(function () {
            $('[name^="disciplines"]').valid();
            $(".error").each(function () {
                if (!$(this).is(":visible")) {
                    $(this).prev("div").removeClass("error-input");
                } else {
                    $(this).prev("div").addClass("error-input");
                }
            });
        });*/

        $('.next-step, .tab__link').click(function () {

            if (!$(this).hasClass("tab__link--filled")) {

                var tab_id = $(this).attr('data-tab');

                if (!$(ORDER_FORM_ID).valid()) {
                    $(".error").each(function () {
                        if (!$(this).is(":visible")) {
                            $(this).prev("div").removeClass("error-input");
                        } else {
                            $(this).prev("div").addClass("error-input");
                        }
                    });
                    return false;
                }
                
                 if (tab_id == 'tab-2') {
                    checkMails();
                }
                
                if ($("body").find(".duplicate_error").length > 0) {
                    $("body").find(".duplicate_error").show();
                    $("#email").focus();
                    console.log('duplicate_error', 'TRUE');
                    return false;
                } else {
                    $("body").find(".duplicate_error").hide();
                }

            }

            if ((tab_id == 'tab-1' || tab_id == 'tab-2') && $('[name="country"]').valid() == 0) {
                return false;
            }
            if (tab_id == 'tab-3' && $('[name="native_laguage"],[name^="other_language"],[name="academic_level"],[name^="disciplines"],[name^="software"]').valid() == 0) {
                return false;
            }
            changeStap(tab_id);
            $("html, body").animate({scrollTop: 0}, '100');
        });

        $('.prev-step').click(function () {
            var tab_id = $(this).attr('data-tab');
            changeStap(tab_id);
            $("html, body").animate({scrollTop: 0}, '100');
        });

        $('#date').keyup(function (e) {
            if (e.keyCode === 8 || e.keyCode === 46) {
                return true;
            } else {
                this.value = this.value.replace(/^(\d\d)$/g, '$1/').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
            }
        });

        /*$('#date').keyup(function () {
         this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'');
         });*/


        var phone_prefix = $("#_phone_prefix, #_alt_phone_prefix");
        $.ajax({
            url: "https://evolutionwriters.com/client_lead?ajax=getPhonePrefix",
            dataType: "json",
            type: 'POST',
            success: function (country) {
                phone_prefix.text("+" + country.current_country.phone_prefix);
            }
        });

        $('.next-step, .tab__link').click(function () {
            var tab_id = $(this).attr('data-tab');
            if (tab_id != 'tab-1') {
                $('[name="country"]').valid();
                $(".error").each(function () {
                    if (!$(this).is(":visible")) {
                        $(this).prev("div").removeClass("error-input");
                    } else {
                        $(this).prev("div").addClass("error-input");
                    }
                });
            }
            if (tab_id != 'tab-2') {
                $('[name="native_laguage"],[name^="other_language"],[name="academic_level"],[name^="disciplines"],[name^="software"]').valid();
                $(".error").each(function () {
                    if (!$(this).is(":visible")) {
                        $(this).prev("div").removeClass("error-input");
                    } else {
                        $(this).prev("div").addClass("error-input");
                    }
                });
            }
            if (tab_id != 'tab-3') {
                $('[name="referer"]').valid();
                $(".error").each(function () {
                    if (!$(this).is(":visible")) {
                        $(this).prev("div").removeClass("error-input");
                    } else {
                        $(this).prev("div").addClass("error-input");
                    }
                });
            }
        });

        $('[name="country"],[name="native_laguage"],[name="other_language"],[name="academic_level"],[name^="software"],[name="referer"]').on('change', function () { //[name^="disciplines"],
            $(this).valid();
            $(".error").each(function () {
                if (!$(this).is(":visible")) {
                    $(this).prev("div").removeClass("error-input");
                } else {
                    $(this).prev("div").addClass("error-input");
                }
            });
        });

        $('#submitwb').click(function () {
            if ($(ORDER_FORM_ID).valid()) {
                if ($('[name="referer"]').valid()) {
                    form = $(ORDER_FORM_ID);
                    callAjax('json', '/apply.html?ajax=createWriter', function (data) {
                        if (data.create_writer == true && data.verification_data.is_verification == 1) {
                            
                            $('body').append('<iframe id="iframe_logout" style="position: absolute; width: 1px; height: 1px; left:-500px; display:none;" src="https://admin.writerbay.com/auth?logout=true"></iframe>');
                            dataLayer.push({'event': 'writer_form_submit'});
                           
                            var empty = getUrlParameter("empty");
                            if (empty == 1) {
                                window.parent.location.href = "https://www.writerbay.com/apply.html?apply=1" + "&parrams=" + btoa(JSON.stringify(data.verification_data));
                            } else {
                            initVerificationContent(data.verification_data, form.find('input[name="email"]').val());
                                                        
                            $("[data-verification-view]").show();
                            $('body').addClass('apply-form-verify');
                            $("[data-apply-view]").hide();
                            }
                            
                        } else if (data.create_writer == true) {

                            dataLayer.push({'event': 'writer_form_submit'});
                            $('#hidden_auth_form input[name="email"]').val(form.find('input[name="email"]').val());
                            $('#hidden_auth_form input[name="pass"]').val(form.find('input[name="password"]').val());
                            $('#hidden_auth_form').submit();

                        } else {
                            if (data.create_writer.error) {
                                $.each(
                                        data.create_writer.error,
                                        function (field, error) {
                                            var errorText = '';
                                            if (field == 'email') {
                                                errorText = 'This email address already exists in the system, please try another one';
                                            }
                                            if (field == 'phone') {
                                                errorText = 'This phone number already exists in the system, please try another one';
                                            }
                                            var error_html = "<label for='" + field + "' generated='true' class='error'>" + errorText + "</label>";
                                            var input_block = form.find('[name="' + field + '"]');
                                            changeStap(input_block.closest('.tab__content')[0].getAttribute("id"));
                                            input_block.closest('.input-wrapper').addClass('error-input');
                                            input_block.closest('.form__input').addClass('error');
                                            input_block.closest('.form__block').append(error_html);
                                            if (field === "password") {
                                                input_block.closest('.form__block').find("label.error[for='" + field + "']").text(data.create_writer.error.password);
                                            }

                                            if (field === "password_confirm") {
                                                input_block.closest('.form__block').find("label.error[for='" + field + "']").text(data.create_writer.error.password_confirm);
                                            }
                                        }
                                )
                            } else {
                                if(data.create_writer.request_error) {
                                        $('#blockApplyModal').modal('show');
                                    }
                                console.log(data.create_writer);
                            }
                        }
                    }, form.serialize(), form
                            );
                }
            }
        });

        $("#rep-password").on("focus", function () {
            $(this).parents(".form__block").find("label[for='password_confirm']").text("");
        });

        $("#email").on("input", function () {
            setTimeout(function () {
                let trim_value = $("#email").val().toString();
                trim_value = trim_value.replace(/\s+/g, ' ').trim();
                $("#email").val("");
                $("#email").val(trim_value);
            }, 100)
        })

        $(document).on('click', '[data-submit-verification]', function (e) {
            e.preventDefault();
            $('body').addClass('apply-form-verify');
            $(this).parents().find('.success_verification-wrap').fadeIn(300);
        });

        
        var vefirication_button_submitted = false;
        $(document).on('click', '[data-verification-view] [data-verify-button]', function (event) {

            event.preventDefault();
            event.stopPropagation();
            
            
            if(vefirication_button_submitted){
                return false;
            }
            vefirication_button_submitted = true;

            var $button = $(this);
            if ($button.hasClass($button.attr("data-class-success")) || $button.hasClass($button.attr("data-class-disabled")) || $button.attr('data-count-verify-attempts') <= 0) {
                if ($button.attr('data-count-verify-attempts') <= 0) {
                    $button.removeClass($button.attr("data-class-success")).addClass($button.attr("data-class-disabled"));
                }
                return false;
            }

            $.ajax({
                url: $button.attr('data-verification-url'),
                type: "POST",
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    if (data.result) {
                        if ($button.attr('data-count-verify-attempts') == 1) {

                            //button
                            $button.removeClass($button.attr("data-class-success")).addClass($button.attr("data-class-disabled"));
                            $button.attr('data-count-verify-attempts', 0);
                           
                            //alerts                                                        
                            $button.parent().find('[data-email-verify-email-hint="2"]').text('You have 0 attempts left').fadeIn(300);

                            //timer
                            $button.find('[data-time-block-verify]').hide();
                        } else {

                            //button
                            $button.removeClass($button.attr("data-class-success")).addClass($button.attr("data-class-disabled"));
                            $button.attr('data-count-verify-attempts', $button.attr('data-count-verify-attempts') - 1);
                            
                            //alerts            
                            $button.parent().find('[data-email-verify-email-hint="2"]').text('You have ' + ($button.attr('data-count-verify-attempts')) + ' ' + ($button.attr('data-count-verify-attempts') == '1' ? 'attempt left' : 'attempts')).fadeIn(300);

                            //timer
                            var durationTime = (1 * 60);
                            var timeToActive = Math.floor(Date.now() / 1000) + durationTime;
                            var $timeBlock = $button.find('[data-time-block-verify]');
                            $timeBlock.attr('data-time-left-verify', timeToActive);
                            showTimerButton($timeBlock, function (_$timeBlock) {
                                _$timeBlock.closest('button').removeClass($button.attr("data-class-disabled"));
                            });
                        }                      
                    }
                    vefirication_button_submitted = false;
                }
            });
        });

    });
});



