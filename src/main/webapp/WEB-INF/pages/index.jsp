<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>enviamensaje - Inicio</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width">

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/enviamensaje.css" rel="stylesheet">

    </head>
    <body>
    	<input type="hidden" id="hdNavbarSelectedOption" value="navItemIniciarSesion">

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-8">
                        <div class="demo-content bg-alt">

                            <form role="form" id="register_user" method="POST" action="sendsms">
                                <hr class="colorgraph">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <input type="number" name="phone" id="phone" class="form-control input-lg" placeholder="Teléfono (ej. 6141234567)" tabindex="1" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="text" id="text" class="form-control input-lg" placeholder="Texto" tabindex="4" required>
                                </div>
                                
                                <hr class="colorgraph">
                                <div class="row">
                                    <div class="col-xs-6 col-md-6">
                                        <input type="submit" value="Envíar SMS" id="send_btn" class="btn btn-primary btn-block btn-lg" tabindex="7">
                                    </div>
                                </div>
                            </form>

                            <hr/>
                            
                        </div>
                    </div>
                    
            </div>
        </div>
        
        <script src="js/bootstrap.min.js"></script>

    </body>
</html>
