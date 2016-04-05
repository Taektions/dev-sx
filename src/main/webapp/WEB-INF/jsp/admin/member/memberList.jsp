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
	
});
</script>
<style type="text/css">
tbody tr {background-color: white;}
</style>
<body class="fixed-top">
	<div id="wrap">
		<div id="header" class="navbar navbar-default navbar-fixed-top">
			<%@ include file="/WEB-INF/jsp/admin/layer/adminHeader.jsp" %>
		</div>
		
		<div style="width:100%;padding:10px;">
			<!-- Begin page content-->
			<div class="well" style="min-height:400px; max-height:800px;">
				<table>
					<thead>
						<tr>
							<td >
								<table>
									<thead>
										<tr>
											<th style="width:50px;">조회조건</th>
											<td style="width:85px;">
												<select id="selSearchCondition">
													<option value="">전체</option>
													<option value="affiliateShopNo">업체번호</option>
													<option value="affiliateShopName">업체이름</option>
													<option value="representative">대표자</option>
													<option value="telephoneNo">전화번호</option>
													<option value="cellphoneNo">휴대폰번호</option>
													<option value="loginID">로그인ID</option>
												</select>
											</td>
											<td style="width:150px;">
												<input id="txtSeachValue" type="text" style="height: 18px; font-size:smaller;" disabled="disabled"/>
											</td>
											<th style="width:50px;">업체분류</th>
											<td style="width:65px;">
												<select id="selShopCategoryCode">
													<option value="">전체</option>
													<option value="">기타</option>
												</select>
											</td>
											<th style="width:30px;">상태</th>
											<td style="width:65px;">
												<select id="selAffiliateShopStatusCode">
													<option value="">전체</option>
													<option value="">정상</option>
												</select>
											</td>
										</tr>										
									</thead>
					            </table>
							</td>
							<td>  
						        <button id="btnSearch" type="button" class="btn btn-default btn-sm">조회</button>
						    </td>		    
						</tr>
					</thead>
				</table>				
				<div style="height:30px; margin-left:-10px; margin-right:-10px; margin-bottom:3px; background-color:#4A8ED8;" align="left">
					<h3 style="color:#FFFFFF; padding-left:10px; padding-top:5px;">회원 정보</h3>
				</div>
				<table class="table" style="text-align: center;">
					<thead>
						<tr>
							<th style="text-align: center;">회원번호</th>
							<th colspan="2" style="text-align: center;">로그인ID</th>
							<th colspan="1" style="text-align: center;">소속 회사명</th>		
							<th style="text-align: center;">성별</th>
							<th style="text-align: center;">연령대</th>						
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${memberList}" var="member">
						<tr onMouseOver="this.style.backgroundColor='#e5f1f9'" onMouseOut="this.style.backgroundColor=''">
							<td style="text-align: center;">${member.memberNo}</td>
							<td colspan="2" style="text-align: center;">${member.loginID}</td>
							<td colspan="1" style="text-align: center;">${member.companyName}</td>
							<td style="text-align: center;">
								<c:choose>
									<c:when test="${member.sex eq 'male'}">남성</c:when>
									<c:when test="${member.sex eq 'female'}">여성</c:when>
									<c:otherwise>-</c:otherwise>
								</c:choose>
							</td>
							<td style="text-align: center;">
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
						</tr>
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