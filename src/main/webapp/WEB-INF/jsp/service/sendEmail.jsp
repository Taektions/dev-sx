<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/ia/css/jquery.ui.css" type="text/css" />
<link rel="stylesheet" href="http://knit.naver.com/dist/css/knit.css">
<script type="text/javascript" src="/ia/js/jquery-1.7.js"></script>
<script type="text/javascript" src="/ia/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="/ia/js/admin_common.js"></script>
<script type="text/javascript" src="/ia/js/admin_tablesorter.js"></script>
<script type="text/javascript" src="http://knit.naver.com/dist/js/knit.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {

	$("#btnSendEmail").click(function() {
		var emailAddress = $("#txtEmailAddress").val();
		
		$.post("/ia/sendCertificationEmail",
				{
					emailAddress : emailAddress
				},
				function(json) {
					var result = json.result;
					var resultStr = "발송 성공";
					
					if (result == false) {
						resultStr = "발송 실패";
					}
					
					$("#divResult").text(resultStr);
				});
	});
	
});
</script>
<body class="non-responsive">
    <div id="wrap" class="container">
        <div id="header" class="navbar navbar-default">
        </div>
        <div id="container">
        	<table>
				<thead>
					<tr>
						<th colspan="2">메일 발송</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" id="txtEmailAddress"/></td>
						<td><button type="button" id="btnSendEmail" class="btn btn-default btn-lg">전송</button></td>
					</tr>
					<tr>
						<th colspan="2"><div id="divResult"></div></th>
					</tr>
				</tbody>
			</table>
        </div>
        <div id="footer">
        </div>
    </div>
</body>
</html>
