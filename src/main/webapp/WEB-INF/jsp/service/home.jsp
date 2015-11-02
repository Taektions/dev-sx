<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/ia/css/jquery.ui.css" type="text/css" />
<script type="text/javascript" src="/ia/js/jquery-1.7.js"></script>
<script type="text/javascript" src="/ia/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="/ia/js/admin_common.js"></script>
<script type="text/javascript" src="/ia/js/admin_tablesorter.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	
	$("#btn").click(function() {
		alert("${dataValue}");
	});
	
});
</script>
<body>
<h1>
	Hello world!  
</h1>
	<input type="button" id="btn"/>

<P>  The time on the server is ${serverTime}. </P>
</body>
</html>
