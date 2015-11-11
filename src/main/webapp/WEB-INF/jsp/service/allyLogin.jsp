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
$(document).ready(function() {

	$("#btnSendEmail").click(function() {
		var emailAddress = $("#txtEmailAddress").val() + $("#txtEmailDomain").text();
		alert(emailAddress);
		$.post("/ally/member/applyCertificationCode",
				{
					emailAddress : emailAddress
				},
				function(json) {
					var result = json.result;
					var resultStr = "발송 실패 (" + json.serverTime + ")";
					
					if (result == true) {
						resultStr = "발송 성공(" + json.serverTime + ")";						
					}					
					$("#divResult").text(resultStr);
					
					if (result == true) {
						var second = 180;
						var counter = setInterval(function timer() {
							second=second-1;
							if (second <= 0) {
								clearInterval(counter);
								$("#divResult").text("인증시간이 초과되었습니다. 인증번호를 재발급 받으세요.");
								return;
						  	}
							$("#divResult").text(second + "초");
						}, 1000);
					}
				});
	});
	
	$("#btnRegisterMember").click(function() {
		var emailAddress = $("#txtEmailAddress").val() + $("#txtEmailDomain").text();
		var ageGroup = $("#selAgeGroup option:selected").val();
		var sex = $("#selSex option:selected").val();
		var companyNo = $("#selCompany option:selected").val();
		var certificationCode = $("#txtCertificationCode").val();
		
		
		$.post("/ally/member/certificationMember",
				{
					emailAddress : emailAddress,
					ageGroup : ageGroup,
					sex : sex,
					companyNo : companyNo,
					certificationCode : certificationCode
				},
				function(json) {
					var isSuccess = json.isSuccess;
					
					if (isSuccess) {
						alert("인증완료");
					} else {
						var resultMsg = json.resultMsg;						
						alert(resultMsg);
					}					
				});
	});
	
});

</script>
<body class="non-responsive">
    <div id="wrap" class="container">
        <div id="header" class="navbar navbar-default">
        </div>
        <div id="container">
        	<div class="table-responsive">
            <table class="table">
              <thead>
					<tr>
						<th colspan="5">메일 발송</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="1"><input type="text" id="txtEmailAddress"/><p id="txtEmailDomain" style="margin-top: -22px; padding-left: 140px;">@nhn.com</p></td>
						<td colspan="4"><button type="button" id="btnSendEmail" class="btn btn-default btn-lg">전송</button></td>
					</tr>
					<tr>
						<td colspan="2">
							<select id="selAgeGroup">
								<option value="1">10대</option>
								<option value="2">20대</option>
								<option value="3">30대</option>
								<option value="4">40대</option>
								<option value="5">50대</option>
								<option value="6">60대</option>
								<option value="7">70대</option>
							</select>
							<select id="selSex">
								<option value="male">남성</option>
								<option value="female">여성</option>
							</select>
							<select id="selCompany">
								<option value="1">NAVER</option>
							</select>
						</td>
						<td colspan="3">
							<input type="text" id="txtCertificationCode" />
							<button type="button" id="btnRegisterMember" class="btn btn-default btn-lg">가입인증</button>
						</td>					
					</tr>
					<tr>
						<th colspan="5"><div id="divResult"></div></th>
					</tr>
					<tr>
						<th>회원번호</th>
						<th>로그인ID</th>
						<th>성별</th>
						<th>연령대</th>
						<th>소속 회사명</th>		
					</tr>
					<c:forEach items="${memberList}" var="member">
					<tr>
						<td>${member.memberNo}</td>
						<td>${member.loginID}</td>
						<td>
							<c:choose>
								<c:when test="${member.sex eq 'male'}">남성</c:when>
								<c:when test="${member.sex eq 'female'}">여성</c:when>
								<c:otherwise>-</c:otherwise>
							</c:choose>
						</td>
						<td>
							<c:choose>
								<c:when test="${member.ageGroup == 1}">10대</c:when>
								<c:when test="${member.ageGroup == 2}">20대</c:when>
								<c:when test="${member.ageGroup == 3}">30대</c:when>
								<c:when test="${member.ageGroup == 4}">40대</c:when>
								<c:when test="${member.ageGroup == 5}">50대</c:when>
								<c:when test="${member.ageGroup == 6}">60대</c:when>
								<c:when test="${member.ageGroup == 7}">70대</c:when>
								<c:when test="${member.ageGroup == 8}">80대</c:when>
								<c:otherwise>-</c:otherwise>
							</c:choose>
						</td>
						<td>${member.companyName}</td>
					</tr>
					</c:forEach>
				</tbody>
            </table>
          </div>
        </div>
        <div id="footer">
        </div>
    </div>
</body>
</html>
