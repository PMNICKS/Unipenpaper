
$.ajaxSetup({
    cache: false
});

function callAjax(data_type, url, callback, input_data, form) {
    $.ajax({
        url: url,
        data: input_data,
        dataType: data_type,
        type: 'POST',
        error: function(jqxhr, ts, err) {
            // console.error(jqxhr);
        },
        success: function(data) {
            isAuthError(data);
//                     if(typeof(form) != "undefined"){
            if (!(is_error = isError(data, form)) && typeof(form) == "object")
//            console.log(isError(data, form));
                callback(data);
            else
                callback(data, is_error);
        }
    })
}

function callAjaxFileUpload(url, form_object, callback) {
    $.ajax(form_object.action, {
        data: $("[name]", form_object).not(":file").serializeArray(),
        url: url,
        files: $(":file", form_object),
        iframe: true,
        type: 'POST',
        dataType: 'json',
        processData: false,
        error: function(jqxhr, ts, err) {
            //console.log(ts);
//            isAuthError(data);
        },
        success: function(data) {
                     isAuthError(data);
                     if(!isError(data, $(form_object)))
                            callback(data);
        }
    })
}

function isError(data_array, element) {
    var result = false;
    $.each(data_array, function(key, value) {
//console.log(value);
//console.log(key);
        if (typeof(value.error) == "string") {
//console.log(1);
            //console.log(data_array);
            //console.log(key);
            alert(key, "Attantion", value.error);
            result = true;
        } else if (typeof(value.error) == "object") {
//console.log(2);
            $.each(value.error, function(name, text) {
                if (typeof(element) == "object")
                    showFormElemError(element, name, text);
                else{
                    //console.error(text);
                }
            })
            result = true;
        } else if ($.isArray(value)) {
//console.log(3);
            result = isError(value, element);
        }
    })
    return result;
}

function isAuthError(response) {
    return false;
    if (response != null)
        if (typeof(response["auth_error"]) != "undefined") {
            top.location.href = "/" + response["auth_error"]["auth_controller"];
        } else if (typeof(response["debug"]) != "undefined") {
            $.each(response["debug"], function(key, item) {
                alert("debug info key=" + key + " item=" + item);
            });
        }
}
