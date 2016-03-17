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
	function admissionRegister(affiliateShopNo) {
		$.post("/ally/shop/admissionRegister", 
				{
					affiliateShopNo : affiliateShopNo
				},
				function(json) {
					if(json.isSuccess) {
						alert("승인완료")
						document.location.reload();
					} else {
						alert(json.resultMsg);
					}
				});
	}
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
					<h3 style="color:#FFFFFF; padding-left:10px; padding-top:5px;">제휴가입승인</h3>
				</div>
				<table class="table" style="text-align: center;">
	            	<thead>
	            		<tr>
							<th style="text-align: center;">업체번호</th>
							<th style="text-align: center;">업체이름</th>
							<th style="text-align: center;">대표자</th>
							<th style="text-align: center;">업체분류</th>
							<th style="text-align: center;">전화번호</th>
							<th style="text-align: center;">핸드폰번호</th>
							<th style="text-align: center;">로그인ID</th>
							<th style="text-align: center;">등록상품개수</th>
							<th style="text-align: center;">상태</th>
							<th style="text-align: center;">승인</th>
						</tr>						
	            	</thead>
	            	<tbody>
	            		<c:forEach items="${shopList}" var="shop">
							<c:if test="${shop.affiliateShopStatusCode == 'WAIT'}">
								<tr>
									<td>${shop.affiliateShopNo}</td>
									<td>${shop.affiliateShopName}</td>
									<td>${shop.representative}</td>
									<td>${shop.shopCategoryCode}</td>
									<td>${shop.telephoneNo}</td>
									<td>${shop.cellphoneNo}</td>
									<td>${shop.loginID}</td>
									<td>${shop.productCount}</td>
									<td>${shop.affiliateShopStatusCode}</td>
									<td><button type="button" class="btn btn-default btn-sm" onclick="admissionRegister(${shop.affiliateShopNo});">가입승인</button></td>
								</tr>
							</c:if>
						</c:forEach>
	            	</tbody>
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