<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Mensaje envíado - enviamensaje</title>
<meta name="viewport" content="width=device-width">

<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
	rel="stylesheet">

</head>
<body>
	<input type="hidden" id="hdNavbarSelectedOption" value="navItemIndex">

	<div id="wrap">
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-collapse">
						<span class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
				</div>
			</div>
		</div>

		<div class="jumbotron">
			<div class="container">
				<h2>Mensaje envíado exitosamente a ${phone}</h2>
			</div>
		</div>

		<hr>

		<footer>
			<p>© Leo Gutiérrez R.</p>
		</footer>
	</div>

</body>

</html>