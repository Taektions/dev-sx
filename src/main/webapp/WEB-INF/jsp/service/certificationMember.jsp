<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="/ally/css/jquery.ui.css" type="text/css" />
<link rel="stylesheet" href="http://knit.naver.com/dist/css/knit.css">
<script type="text/javascript" src="/ally/js/jquery-1.7.js"></script>
<script type="text/javascript" src="/ally/js/jquery.tablesorter.js"></script>
<script type="text/javascript" src="/ally/js/admin_common.js"></script>
<script type="text/javascript" src="/ally/js/admin_tablesorter.js"></script>
<script type="text/javascript" src="http://knit.naver.com/dist/js/knit.min.js"></script>
<script type="text/javascript">

</script>
<body class="non-responsive">
        <div id="header" class="navbar navbar-default">
        	<h1 style="color:rgb(230,230,230);"> 우리회사 멤버쉽 이메일 인증</h1>
        </div>
        <div id="container">
        	<div class="table-responsive">
            <table class="table">
              <thead>
					<tr>
						<th>인증결과</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${resultMsg}</td>
					</tr>
				</tbody>
            </table>
          </div>
        <div id="footer">
        </div>
    </div>
</body>
</html>
