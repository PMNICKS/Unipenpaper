var validator_default_txt = {};
var FORM_VALIDATOR_CONFIGS_DIR = "/public/js/form_validate_configs/";
var FORM_VALIDATORS = new Array();
var FORM_VALIDATE_CONFIGS = {};

$.getJSON(FORM_VALIDATOR_CONFIGS_DIR + 'default_error_txt.json', false,
        function(data) {
            validator_default_txt = data;
            for (num in validator_default_txt) {
                for (JQVname in validator_default_txt[num]['JQVname']) {
                    //                            console.log(validator_default_txt[num]['JQVname'][JQVname]+' '+validator_default_txt[num]['text']);
                    $.validator.messages[validator_default_txt[num]['JQVname'][JQVname]] = validator_default_txt[num]['text'];
                }
            }
        });

//should be removed ----------------VVV
function validateForm(form, rules, messages, error_class) {
    if (typeof(error_class) == "undefined")
        error_class = "error";
    FORM_VALIDATORS[form.attr('id')] = form.validate({
        debug: true,
        errorElement: "em",
        errorClass: error_class,
        rules: rules,
        messages: messages,
        errorPlacement: function(error, element) {
//                     console.log(form);
//                     console.log(element.attr("name"));
//                     console.log(error.html());
            showFormElemError(form, element.attr("name"), error.html());
        }
    });
    return FORM_VALIDATORS[form.attr('id')];
}

//error alert
function showFormElemError(form, element_name, text) {
    var element = form.find("[name='" + element_name + "']");
    clearFormElemErrors(element);

    //console.log('go ' + element_name);
    if (typeof text == 'number' && validator_default_txt[text]) {
        text = validator_default_txt[text].text;
    }

  //console.log('go ' + text);
    if (typeof(element.attr("error")) == "undefined" || element.attr("error") != text) {
        var error_data = {
            error_id: element_name,
            text: text
        }
        switch (element.attr("type")) {
            case("checkbox"):
            case("radio"):
                element.closest(".block_element").children(".block_element_head").after((new jSmart($("#error-alert").html())).fetch(error_data));
                break;
            default:
                if (element.parent('div').hasClass('error-after')) {
                    element.parent('div.error-after').after((new jSmart($("#error-alert").html())).fetch(error_data));
                } else {
                    element.attr("error", text).after((new jSmart($("#error-alert").html())).fetch(error_data));
                }
//                element.attr("error", text).after((new jSmart($("#error-alert").html())).fetch(error_data));
                break;
        }
//        console.log((new jSmart($("#error-alert").html())).fetch(error_data));

//        if ($(element.closest("div")).hasClass("element"))
//            $(element.closest("div")).addClass("error control-group");
    }
}

function resetFormValidation(form) {
    if (typeof(form) == "object") {
        if (typeof(FORM_VALIDATORS[form.attr('id')]) != "undefined")
            FORM_VALIDATORS[form.attr('id')].resetForm();
        form.find("input,select,textarea").each(function() {
            clearFormElemErrors($(this));
        })
    }
}

function hasValidationRule(form_id, elem_name, rule_name) {
//       console.log(form_id);
//       console.log(FORM_VALIDATORS);
    return (typeof(FORM_VALIDATORS[form_id].settings["rules"][elem_name][rule_name]) != "undefined");
}

function changeValidationRules(form_id, elem_name, rule_name, rule_value, apply) {
    /*window.setTimeout("console.log(FORM_VALIDATORS['"+form_id+"'])",1000);
     return false;*/
//    console.log(FORM_VALIDATORS[form_id].settings["rules"]);
//    console.log(FORM_VALIDATORS);
//    console.log(elem_name);
    if (typeof(FORM_VALIDATORS[form_id]) != "undefined"
            && typeof(FORM_VALIDATORS[form_id].settings["rules"]) != "undefined"
            && typeof(FORM_VALIDATORS[form_id].settings["rules"][elem_name]) != "undefined") {
        FORM_VALIDATORS[form_id].settings["rules"][elem_name][rule_name] = rule_value;
        if (apply > 0)
            FORM_VALIDATORS[form_id].element("[name='" + elem_name + "']");
    }
}

function clearFormElemErrors(input) {
//    console.log('clear ' + input.attr('name'));
    if (typeof(input.attr('error')) != "undefined") {
        input.closest(".element").find("div.alert-error").each(function() {
            $(this).remove();
        })
        input.closest(".block_element").find(".error[generated='true']").remove();
    }
    input.attr("error", false);
    input.removeClass("error");
    input.closest(".block_element").find(".alert").remove();
//    if ($(element.closest("div.element")).hasClass("error"))
//        $(element.closest("div.element")).removeClass("error");
}



function bindValidate(form, name) {

    var settings = {};
    settings.rules = {};
    settings.messages = {};
    var data = {};
    var config_name = name ? name : form.attr('id').replace('form_', '');


    function _bindValidate() {
        data = FORM_VALIDATE_CONFIGS[config_name];
//              console.log(data);
        for (field_name in data) {
            //break;
            var rules = {};
            var messages = {};
            if (data[field_name]['error_txt'])
                for (err_name in data[field_name]['error_txt']) {
                    if (data[field_name]['error_txt']['0'] != undefined) {
                        messages = data[field_name]['error_txt']['0'];
                        break;
                    }
                    msg = data[field_name]['error_txt'][err_name];
                    switch (err_name) {
                        case "password_mismatch":
                            messages["equalTo"] = msg;
                            break;
                        case 'wrong_symbols':
                            messages["email"] = msg;
                            messages["url"] = msg;
                            messages["date"] = msg;
                            messages["digits"] = msg;
                            break;
                        case "wrong_length":
                            messages['maxlength'] = msg;
                            messages['minlength'] = msg;
                            messages['max'] = msg;
                            break;
                        case 'not_defined':
                            messages['required'] = msg;
                            break;
                        case 'no_equal':
                            messages['equalTo'] = msg;
                            break;
                        case 'min_words':
                            messages['minWords'] = msg;
                            break;
			case 'notEqual':
			    messages['notEqual'] = msg;
			    break;
                        default :
                            messages[data[field_name][err_name]] = msg;
                    }
                }
            //                                   console.log(messages);
            for (rule_name in data[field_name]) {
                if (rule_name == 'error_txt')
                    continue;
                switch (rule_name) {
                    case 'max_length':
                        rules['maxlength'] = data[field_name][rule_name] * 1;
                        break;
                    case 'min_length' :
                        rules['minlength'] = data[field_name][rule_name] * 1;
                        break;
                    case 'not_null':
                        rules['required'] = (data[field_name][rule_name] == "1");
                        break;
                    case 'min_words':
                        rules['minWords'] = data[field_name][rule_name] * 1;
                        break;
                    case 'lettersonly':
                        rules['lettersonly'] = data[field_name][rule_name] * 1;
                        break;
                    case 'letterswithbasicpunc':
                        rules['letterswithbasicpunc'] = data[field_name][rule_name] * 1;
                        break;
                    case 'digits':
                        rules['digits'] = data[field_name][rule_name] * 1;
                        break;
                    case 'equal_to':
                        rules['equalTo'] = '#' + form.attr('id') + ' input[name=\'' + data[field_name][rule_name] + '\']';
                        break;
		    case 'notEqual':
			rules['notEqual'] = data[field_name][rule_name];
			break;
                    case 'type':
                        switch (data[field_name][rule_name] * 1) {
                            case 6:
                                rules['email'] = {
        depends:function(){
            $(this).val($.trim($(this).val()));
            return true;
        }};
                                break;
                            case 7:
                                rules['digits'] = {
        depends:function(){
            $(this).val($.trim($(this).val()));
            return true;
        }};
                                break;
                            case 8:
                                rules['date'] = true;
                                break;
                        }
                }
            }

            settings['rules'][field_name] = rules;
            settings['messages'][field_name] = messages;
            settings.errorPlacement = function(error, element) {
                //                                          console.log(form);
                //                                          console.log(element.attr("name"));
                //                                          console.log(error.html());
                showFormElemError(form, element.attr("name"), error.html());
            };
            settings.invalidHandler = function(form, validator) {

                if (!validator.numberOfInvalids())
                    return;

                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 30
                });

            }
            settings.unhighlight = function(input) {
                //                          console.log("success");
                clearFormElemErrors($(input));
            }
//                     form.find("[name='" + field_name + "']").each(function(){
//                            var elem = $(this);
//                            elem.on("focusout", function(){
//                                   elem.
//                                   console.log(elem.attr("name"));
//                            })
//                     })
        }
              console.log(settings);
        FORM_VALIDATORS[form.attr('id')] = form.validate(settings);
        delete settings;
        delete rules;
        delete messages;


    }

    if (typeof FORM_VALIDATE_CONFIGS[config_name] == 'undefined') {
        $.getJSON(FORM_VALIDATOR_CONFIGS_DIR + (config_name + '.json'),
                function(idata) {
                    FORM_VALIDATE_CONFIGS[config_name] = idata;
                    _bindValidate();
                }
        );
    } else {
        _bindValidate();
    }


}

$(document).ready(function() {

    $('.validated_form').each(function() {
        //              console.log(FORM_VALIDATOR_CONFIGS_DIR + $(this).attr('id').replace('form_','') + '.json');
        var form = $(this);
        bindValidate(form);

    });

    $('.radio_text input[type=\'radio\']').find('input[type=\'text\']').attr('disabled', 'disabled');
    $('.radio_text input[type=\'radio\']').change(function() {
        if ($(this).attr('checked')) {
            if ($(this).hasClass('disable_text')) {
                $(this).parent().parent().find('input[type=\'text\']').attr('disabled', 'disabled');
            } else if ($(this).hasClass('enable_text')) {
                $(this).parent().parent().find('input[type=\'text\']').attr('disabled', false);
            }
        }
    });

});
