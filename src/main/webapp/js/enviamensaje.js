$(document).ready(function () {

    $("#success-alert").hide();
    $("#alert-success-register-user").hide();
    $("#alert-fail-register-user").hide();    
    $('#added_error').hide(); 
    
    /********Events********/    
    $("#login_form").validate({
        rules: {
            password_login: {
                required: true,
                minlength: 5
            },
            email_login: {
                required: true,
                email: true
            }
        },
        messages: {
            password_login: {
                required: "Ingresa tu contrase&ntilde;a",
                minlength: "Tu contrase&ntilde;a debe tener al menos 5 caracteres."
            },
            email_login: "Ingresa un e-mail v&aacute;lido"
        }
    });

    $("#register_user").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            password: {
                required: true,
                minlength: 5
            },
            password_confirmation: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            first_name: "Por favor ingresa tu nombre",
            last_name: "Por favor ingresa tus apellidos",
            password: {
                required: "Ingresa tu contrase&ntilde;a",
                minlength: "Tu contrase&ntilde;a debe tener al menos 5 caracteres."
            },
            password_confirmation: {
                required: "Ingresa tu contrase&ntilde;a de nuevo",
                minlength: "Tu contrase&ntilde;a debe tener al menos 5 caracteres.",
                equalTo: "Ingresa la misma contrase&ntilde;a."
            },
            email: "Ingresa un e-mail v&aacute;lido"
        }
    });

    $("#change_password_form").validate({
        rules: {
            currentPassword: {
                required: true,
                minlength: 5
            },
            newPassword: {
                required: true,
                minlength: 5,
                notEqualTo: "#currentPassword"
            },
            retypeNewPassword: {
                required: true,
                minlength: 5,
                equalTo: "#newPassword"
            }
        },
        messages: {
            currentPassword: {
                required: "Por favor ingresa tu contrase&ntilde;a actual",
                minlength: "La contrase&ntilde;a debe tener al menos 5 caracteres."
            },
            newPassword: {
                required: "Por favor ingresa la nueva contrase&ntilde;a",
                minlength: "La contrase&ntilde;a debe tener al menos 5 caracteres."
            },
            retypeNewPassword: {
                required: "Por favor confirme la nueva contrase&ntilde;a",
                minlength: "La contrase&ntilde;a debe tener al menos 5 caracteres.",
                equalTo: "La nueva contrase&ntilde;a debe coincidir."
            }
        }
    });

    $.validator.addMethod("notEqualTo", function (value, element, param) {
        var target = $(param);
        if (value) return value != target.val();
        else return this.optional(element);
    }, "La nueva contrase&ntilde;a debe ser diferente a la actual.");

    $("#delete_account_form").validate({
        rules: {
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            password: {
                required: "Ingresa tu contrase&ntilde;a",
                minlength: "Tu contrase&ntilde;a debe tener al menos 5 caracteres."
            }
        }
    });

    $('#delete_account_form').on('submit', function(e) {
        if ($(this).valid()) {
            var currentForm = this;
            e.preventDefault();
            bootbox.confirm("Toda la informaci&oacute;n relacionada con su cuenta ser&aacute; eliminada.<br/>" + 
                            "&iquest;Est&aacute; seguro(a) que desea continuar?", function(result) {
                if (result) {
                    currentForm.submit();
                }
            });
        }
    });

    $("#menu-toggle").on('click', function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $('.remove_placa').on('click', function(e) {
    	e.preventDefault();
    	var licensePlate = $(this).attr('plate');
        bootbox.confirm("&iquest;Est&aacute; seguro(a) que desea eliminar la placa '" + licensePlate + "' de su cuenta?", function(result) {
            
            if (result) {
                $.ajax({
                	method: "GET",
                    url:  'remove.do',
                    data: {placa: licensePlate},
                    async: false,
                    success: function (dataSuccess) {
                    	console.log(dataSuccess);
                    	window.location.href = "placas.do";
                    },
                    error: function (dataError) {
                    	console.log(dataError);
                    }
                });
            }
            
        });
    });

    $('#register_user').on('submit', function(e) {
    	var email = $("#email").val();
        var data = $.ajax({
	                   data: {email: email},
	                   method: "POST",
	                   url:  'exists.do',
	                   async: false
	               }).responseText;
        var exists = jQuery.parseJSON(data);
        if (exists.exists) {
            var msj = "El correo <strong>" + email + "</strong> ya est&aacute; registrado. Intenta iniciar sesi&oacute;n.";
            $('#registration_error').html('<span>' + msj + '</span>');
            $('#registration_error').show();
            e.preventDefault();
        }
     });
    
    $('#buscar_placa').on('click', function(e) {

    	var placa = $('#placa').val();
    	
    	if (! /^[0-9a-z]{5,7}$/i.test(placa)) {
    		$('#placas').html('<b>Ingrese una placa v&aacute;lida.</b>');
    	    return;
    	}

        $(this).prop('disabled', true);
        $('#placas').html('Buscando...');
    	
    	$.ajax({
            data: {placa: placa},
            method: "POST",
            url:  'exists_license_plate.do',
            async: true,
            success: function (dataSuccess) {
                checkIfLicensePlateExists(dataSuccess, placa);
            },
            error: function (dataError) {
                showErrorFindingLicensePlate(dataError);
            }
        });
    });

    function showErrorFindingLicensePlate(dataError) {
        console.log("Error: " + dataError);
        $('#placas').html('<b>Servicio no disponible, intente m&aacute;s tarde.</b>');
        $('#buscar_placa').prop('disabled', false);
    }

    function checkIfLicensePlateExists(existInfo, placa) {        
        if (existInfo.exists) {            
            var carInfo = existInfo.car;            
            var marca = carInfo.marca;
            var linea = carInfo.linea;
            var modelo = carInfo.modelo;

            var code = '<ol class="breadcrumb">';
            code += '<li>' + carInfo.placa + '</li>';
            code += '<li>' + marca + '</li>';
            code += '<li>' + linea + '</li>';
            code += '<li>' + modelo + '</li>';

            if (existInfo.inAccount) {
                console.log(existInfo.inAccount + " - " + (existInfo.inAccount == true));
                code += '<li><b>Este auto ya est&aacute; ligado a tu cuenta</b></li>';
            } else {
                code += '<li><a href="link_to_account.do?placa=' + placa + '" class="btn btn-primary">Ligar a tu cuenta</a></li>';
            }
            
            $('#placas').html(code);

            $('#buscar_placa').prop('disabled', false);

        } else {

            $.ajax({
                method: "POST",
                data: {placa: placa},
                url:  'search_license_plates.do',
                async: true,
                success: function (dataSuccess) {
                    console.log("Succes: " + dataSuccess);
                    
                    if (dataSuccess != null && dataSuccess.placa !== undefined) {
                        
                        var marca = dataSuccess.marca;
                        var linea = dataSuccess.linea;
                        var modelo = dataSuccess.modelo;
                        
                        var code = '<ol class="breadcrumb">';
                        code += '<li>' + dataSuccess.placa + '</li>';
                        code += '<li>' + marca + '</li>';
                        code += '<li>' + linea + '</li>';
                        code += '<li>' + modelo + '</li>';
                        
                        code += '<li><a href="link_to_account.do?placa=' + placa + '" class="btn btn-primary">Ligar a tu cuenta</a></li>';
                        $('#placas').html(code);
                        
                    } else {
                        $('#placas').html('<b>No encontramos ning&uacute;n veh&iacute;culo con placas: ' + placa + '</b>');
                    }

                    $('#buscar_placa').prop('disabled', false);
                },
                error: function (dataError) {
                    showErrorFindingLicensePlate(dataError);
                }
            });            
        }
    }
     
    $('#email').on('focus', function (e) {
        $('#registration_error').hide();
    });
     
    $('#email_login').on('focus', function (e) {
        $('#login_error').hide();
    });

    $('#forgotPassword').on('click', function (e) {
        e.preventDefault();

        bootbox.prompt({
            title: "Ingrese su e-mail",
            value: $('#email_login').val(),
            callback: function(result) {
                if (result !== null) {
                    result = result.trim();
                    if (validateEmail(result)) {
                        //Send email
                        $.ajax({
                            method: "GET",
                            url:  'forgotPassword.do',
                            data: {email: result},
                            async: false,
                            success: function (dataSuccess) {
                                dataSuccess = JSON.parse(dataSuccess);
                                var message = "En breve recibir&aacute; un email con su nueva contrase&ntilde;a";

                                if (dataSuccess) {
                                    if (dataSuccess.error) {
                                        message = dataSuccess.message;
                                    }
                                } else {
                                    message = "Error al tratar de enviar el correo";
                                }

                                bootbox.alert(message, function() {});
                            },
                            error: function (dataError) {
                                bootbox.alert(dataError, function() {});
                            }
                        });
                    } else {
                        bootbox.alert("E-mail inv&aacute;lido", function() {});
                    }
                }
            }
        });
    });

    /**********IIFE*********/

    //Menu logic for active option
    (function ($) {

        var hdNavbarSelectedOption = $('#hdNavbarSelectedOption');
        if (hdNavbarSelectedOption) {
            var navBarOption = $('#' + hdNavbarSelectedOption.val());
            if (navBarOption) {
                navBarOption.addClass("active");
            }
        }

    }(jQuery));

    // Show number of registered users:
    (function ($) {

        var divRegisteredUsers = $('#registered_users_count');
        if (divRegisteredUsers) {
            $.ajax({
                method: "GET",
                url:  'registered_users_count.do',
                async: false,
                success: function (dataSuccess) {
                    divRegisteredUsers.append('<h5>' + dataSuccess.count + ' usuarios registrados </h5>');
                },
                error: function (dataError) {
                    console.log("Error: " + dataError);
                }
            });
        }

    }(jQuery));

    //Filter for placas
    (function ($) {

        $('#filter').on('keyup', function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })

    }(jQuery));

    /********Utils*********/
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
});