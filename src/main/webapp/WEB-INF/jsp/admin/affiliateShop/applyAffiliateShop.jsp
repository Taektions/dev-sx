<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<title>UMAP - 우리회사 멤버십 어드민 포털</title>
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
	$("#btnRegisterAffiliate").click(function() {
		var affiliateShopName = $("#txtShopName").val();
		var representative = $("#txtReprName").val();
		var shopCategoryCode = $("#selCatCode option:selected").val();
		var loginID = $("#txtLoginID").val();
		var telephoneNo = $("#txtTelNo").val();
		var cellphoneNo = $("#txtCellNo").val();
		var loginPassword = $("#txtLoginPW").val();
		
		$.post("/ally/shop/registerAffiliateShop", 
				{
					affiliateShopName : affiliateShopName,
					representative : representative,
					shopCategoryCode : shopCategoryCode,
					telephoneNo : telephoneNo,
					cellphoneNo : cellphoneNo,
					loginID : loginID,
					loginPassword : loginPassword
				},
				function(json) {
					if(json.isSuccess) {
						alert("제휴신청이 완료되었습니다.")
						document.location.reload();
					} else {
						alert(json.resultMsg);
					}
				});
	});
});
</script>
<body class="fixed-top">
	<div id="wrap">
		<div id="header" class="navbar navbar-default navbar-fixed-top">
			<%@ include file="/WEB-INF/jsp/admin/layer/adminHeader.jsp" %>
		</div>
		
		<div style="width:100%;padding:10px;">
			<!-- Begin page content-->
			<div class="well" style="height:800px">
				<div style="height:30px; margin-top:-15px; margin-left:-10px; margin-right:-10px; margin-bottom:3px; background-color:#4A8ED8;" align="left">
					<h3 style="color:#FFFFFF; padding-left:10px; padding-top:5px;">제휴가입신청</h3>
				</div>
				<table class="table">
					<colgroup>
						<col width="15%">
						<col width="35%">
						<col width="15%">
						<col width="35%">
					</colgroup>
	            	<thead>
	            		<tr>
							<th style="text-align:center;">업체분류</th>
							<td colspan="3">
								<select id="selCatCode" style="width:100%;">
									<option value="1">분류 1</option>
									<option value="2">분류 2</option>
									<option value="3">분류 3</option>
								</select>
							</td>
	            		</tr>
	            		<tr>
	            			<th style="text-align:center;">업체이름</th>
							<td><input type="text" id="txtShopName" style="width:100%;" /></td>
	            			<th style="text-align:center;">대표자</th>
							<td><input type="text" id="txtReprName" style="width:100%;" /></td>
	            		</tr>
	            		<tr>
	            			<th style="text-align:center;">전화번호</th>
							<td><input type="text" id="txtTelNo" style="width:100%;" /></td>
							<th style="text-align:center;">핸드폰번호</th>
							<td><input type="text" id="txtCellNo" style="width:100%;" /></td>
	            		</tr>
	            		<tr>
	            			<th style="text-align:center;">로그인ID</th>
	            			<td><input type="text" id="txtLoginID" style="width:100%;"/></td>
	            			<th style="text-align:center;">로그인PW</th>
	            			<td><input type="text" id="txtLoginPW" style="width:100%;" /></td>
	            		</tr>
	            		<tr>
	            			<th colspan="4" style="text-align:right"><button type="button" id="btnRegisterAffiliate" class="btn btn-default btn-lg">제휴신청</button></th>
	            		</tr>
	            	</thead>
	            </table>
			</div>
			<!-- End page content-->
		</div>
		
		<div id="footer">
			<%@ include file="/WEB-INF/jsp/admin/layer/adminFooter.jsp" %>
		</div>
	</div>
</body>
</html>