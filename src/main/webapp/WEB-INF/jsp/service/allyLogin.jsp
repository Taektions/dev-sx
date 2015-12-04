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
		var ageGroup = $("#selAgeGroup option:selected").val();
		var sex = $("#selSex option:selected").val();
		var companyNo = $("#selCompany option:selected").val();
		
		alert(emailAddress + "로 인증번호가 발송되었습니다.");
		$.post("/ally/member/applyCertificationCode",
				{
					emailAddress : emailAddress,
					ageGroup : ageGroup,
					sex : sex,
					companyNo : companyNo
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
						document.location.reload();
					} else {
						var resultMsg = json.resultMsg;						
						alert(resultMsg);
					}					
				});
	});
	
	
	$("#btnRegisterAffiliate").click(function() {
		var affiliateShopName = $("#txtShopName").val();
		var representative = $("#txtReprName").val();
		var shopCategoryCode = $("#txtCatCode").val();
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
	
	
	$("#btnRegisterProduct").click(function() {
		var productName = $("#txtProductName").val();
		var categoryCode = $("#txtProductCategoryCode").val();
		var producDescription = $("#txtProductDescription").val();
		var affiliateStartYmdt = $("#txtStartYmdt").val();
		var affiliateEndYmdt = $("#txtEndYmdt").val();
		var productDiscountPercent = $("#txtDiscountPercent").val();
		var affiliateShopNo = $("#selShop option:selected").val();
		
		$.post("/ally/shop/registerProduct", 
				{
					productName : productName,
					categoryCode : categoryCode,
					producDescription : producDescription,
					affiliateStartYmdt : affiliateStartYmdt,
					affiliateEndYmdt : affiliateEndYmdt,
					productDiscountPercent : productDiscountPercent,
					affiliateShopNo : affiliateShopNo
				},
				function(json) {
					if(json.isSuccess) {
						alert("제휴상품이 등록되었습니다.")
						document.location.reload();
					} else {
						alert(json.resultMsg);
					}
				});
	});
	
});

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

</script>
<body class="non-responsive">
    <div id="wrap" class="container">
        <div id="header" class="navbar navbar-default">
        	<h1 style="color:rgb(230,230,230);"> 우리회사 멤버쉽 TEST PAGE</h1>
        </div>
        <div id="container">
        	<div class="table-responsive">
            <table class="table">
              <thead>
					<tr>
						<th colspan="8">회원가입</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Email</th>
						<td><input type="text" id="txtEmailAddress"  style="width:100%;"/></td>
						<th><p id="txtEmailDomain" style="height: 10px;font-size:large;"><b>@nhn.com</b></p></th>
						<th><button type="button" id="btnSendEmail" class="btn btn-default btn-lg">인증번호전송</button></th>
						<th colspan="4"></th>
					</tr>
					<tr>
						<th>
							<select id="selAgeGroup" style="width:100%;">
								<option value="1">10대</option>
								<option value="2">20대</option>
								<option value="3">30대</option>
								<option value="4">40대</option>
								<option value="5">50대</option>
								<option value="6">60대</option>
								<option value="7">70대</option>
							</select>
						</th>
						<th>
							<select id="selSex" style="width:100%;">
								<option value="male">남성</option>
								<option value="female">여성</option>
							</select>
						</th>
						<th>
							<select id="selCompany" style="width:100%;">
								<option value="1">NAVER</option>
							</select>
						</th>
						<th style="text-align:right;">메일인증</th>
						<th>
							<input type="text" id="txtCertificationCode" />
							<button type="button" id="btnRegisterMember" class="btn btn-default btn-sm">가입인증</button>
						</th>	
						<th colspan="3"></th>				
					</tr>
					<tr>
						<th colspan="8"><div id="divResult"></div></th>
					</tr>
					<tr>
						<td colspan="8"></td>
					</tr>
					<tr>
						<th colspan="8" style="text-align:center;">회원 정보</th>
					</tr>
					<tr>
						<th style="text-align: center;">회원번호</th>
						<th colspan="2" style="text-align: center;">로그인ID</th>
						<th colspan="1" style="text-align: center;">소속 회사명</th>		
						<th style="text-align: center;">성별</th>
						<th style="text-align: center;">연령대</th>						
					</tr>
					<c:forEach items="${memberList}" var="member">
					<tr>
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
          <br>
          <br>
          <br>
          <br>
          <div class="table-responsive">
            <table class="table">
            	<thead>
            		<tr>
            			<th colspan="6">제휴가입신청</th>
            		</tr>
            		<tr>
						<th>업체이름</th>
						<td><input type="text" id="txtShopName" style="width:100%;" /></td>
						<th>대표자</th>
						<td><input type="text" id="txtReprName" style="width:100%;" /></td>
						<th>업체분류</th>
						<td><input type="text" id="txtCatCode" style="width:100%;" /></td>
            		</tr>
            		<tr>
            			<th>로그인ID</th>
            			<td><input type="text" id="txtLoginID" style="width:100%;"/></td>
						<th>전화번호</th>
						<td><input type="text" id="txtTelNo" style="width:100%;" /></td>
						<th>핸드폰번호</th>
						<td><input type="text" id="txtCellNo" style="width:100%;" /></td>
            		</tr>
            		<tr>
            			<th>로그인PW</th>
            			<td><input type="text" id="txtLoginPW" style="width:100%;" /></td>
            			<th colspan="3"></th>
            			<th><button type="button" id="btnRegisterAffiliate" class="btn btn-default btn-lg">제휴신청</button></th>
            		</tr>
            	</thead>
            </table>
          </div>          
          
           <div class="table-responsive">
            <table class="table" style="text-align: center;">
            	<thead>
            		<tr>
            			<th colspan="10">제휴가입승인</th>
            		</tr>
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
            	</thead>
            </table>
          </div>          
          
          <div class="table-responsive">
            <table class="table" style="text-align: center;">
				<tbody>
					<tr>
						<th colspan="9" style="text-align:center;">제휴업체 정보</th>
					</tr>
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
					</tr>
					<c:forEach items="${shopList}" var="shop">
						<c:if test="${shop.affiliateShopStatusCode != 'WAIT'}">
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
						</tr>
						</c:if>
					</c:forEach>
				</tbody>
            </table>
          </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class="table-responsive">
            <table class="table">
            	<thead>
            		<tr>
            			<th colspan="6">제휴상품등록</th>
            		</tr>
            		<tr>
						<th>업체선택</th>
						<td>
							<select id="selShop" style="width:100%;">
								<c:forEach items="${shopList}" var="shop">
									<c:if test="${shop.affiliateShopStatusCode != 'WAIT'}">
									<option value="${shop.affiliateShopNo}">${shop.affiliateShopName}</option>
									</c:if>
								</c:forEach>			
							</select>
						</td>
						<th colspan="4"></th>
            		</tr>
            		<tr>
						<th>상품명</th>
						<td><input type="text" id="txtProductName" style="width:100%;"/></td>
						<th>상품분류</th>
						<td><input type="text" id="txtProductCategoryCode" style="width:100%;"/></td>
						<th>상품설명</th>
						<td><input type="text" id="txtProductDescription" style="width:100%;"/></td>
            		</tr>
            		<tr>
            			<th>제휴시작날짜</th>
            			<td><input type="text" id="txtStartYmdt" style="width:100%;"/></td>
						<th>제휴종료날짜</th>
						<td><input type="text" id="txtEndYmdt" style="width:100%;"/></td>
						<th>할인률</th>
						<td><input type="text" id="txtDiscountPercent" style="width: 30%;"/>%</td>
            		</tr>
            		<tr>
            			<th colspan="5"></th>
            			<th><button type="button" id="btnRegisterProduct" class="btn btn-default btn-lg">상품등록</button></th>
            		</tr>
            	</thead>
            </table>
          </div>          
        
        <div class="table-responsive">
            <table class="table" style="text-align: center;">
				<tbody>
					<tr>
						<th colspan="8" style="text-align:center;">제휴상품 정보</th>
					</tr>
					<tr>
						<th style="text-align: center;">상품번호</th>
						<th style="text-align: center;">상품명</th>
						<th style="text-align: center;">상품분류</th>
						<th style="text-align: center;">상품설명</th>
						<th style="text-align: center;">제휴시작날짜</th>
						<th style="text-align: center;">제휴종료날짜</th>
						<th style="text-align: center;">할인률(%)</th>
						<th style="text-align: center;">제휴업체번호</th>
					</tr>
					<c:forEach items="${productList}" var="product">
					<tr>
						<td>${product.productNo}</td>
						<td>${product.productName}</td>
						<td>${product.categoryCode}</td>
						<td>${product.producDescription}</td>
						<td>${product.affiliateStartYmdt}</td>
						<td>${product.affiliateEndYmdt}</td>
						<td>${product.productDiscountPercent}</td>
						<td>${product.affiliateShopNo}</td>
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
