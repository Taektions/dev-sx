/**
 * admin product 를 위한 js
 */

// 제한 수량/용량 validation 체크 실패 시 이전 값으로 되돌리기 위한 전역 변수
var prevPurchase = '';

admin.product = {
	// 상품 리스트 조회
};

admin.promotion = {
	productInfoSeq : 1
	// 프로모션 파라미터 생성
	,
	makePromotionParamString : function(pageNo, promotionTypeCode) {
		var searchKey = $('#selSearchKey option:selected').val();
		var searchValue = $('#txtSearchValue').val();
		var promotionStatus = $('input[name="rdoPromotionStatus"]:checked')
				.first().val();
		if (pageNo == undefined) {
			pageNo = ($('#pageNo').val() == "") ? 1 : $('#pageNo').val();
		}
		var paramString = "?page=" + pageNo + "&searchKey=" + searchKey
				+ "&searchValue=" + escape(encodeURIComponent(searchValue))
				+ "&promotionStatus=" + promotionStatus;
		if (promotionTypeCode != undefined) {
			paramString += "&promotionTypeCode=" + promotionTypeCode;
		}
		return paramString;
	}
	// 에코 프로그램 리스트 조회
	,
	getPromotionList : function(pageNo, promotionTypeCode) {
		var paramString = admin.promotion.makePromotionParamString(pageNo,
				promotionTypeCode);
		document.location.href = "/nap/product/discount/promotion/promotionList"
				+ paramString;
	}
	// 에코 프로그램 프로모션 엑셀다운로드
	,
	downloadPromotionExcel : function(promotionTypeCode) {
		var paramString = admin.promotion.makePromotionParamString(1,
				promotionTypeCode);
		document.location.href = "/nap/product/discount/promotion/downloadExcel"
				+ paramString;
	}
	// 에코 프로그램 상세내용 보기
	,
	showEcoProgramDetail : function(promotionNo) {
		$
				.get(
						"/nap/product/discount/promotion/detail",
						{
							promotionNo : promotionNo
						},
						function(json) {
							if (json.errorTitle != undefined) {
								alert(json.errorTitle + ", " + json.errorMsg);
								return;
							}
							var promotionDiscountList = json.promotionDiscountList;
							var productInfoTags = [];
							$
									.each(
											promotionDiscountList,
											function(i, promotionDiscount) {
												var countUnit = admin.promotion
														.getPurchaseCountUnit(promotionDiscount.infraResourceTypeCode);
												var isUsedPurchaseCount = admin.promotion
														.isUsedPurchaseCount(promotionDiscount.infraResourceTypeCode);
												var productInfoTag = '<tr>'
														+ '<td>'
														+ promotionDiscount.infraResourceTypeName
														+ '</td>'
														+ '<td>'
														+ promotionDiscount.productName
														+ '</td>'
														+ '<td>'
														+ promotionDiscount.feesTypeName
														+ '</td>'
														+ '<td>'
														+ (isUsedPurchaseCount ? promotionDiscount.purchaseCount
																+ countUnit
																: '-')
														+ '</td>'
														+ '<td>'
														+ (isUsedPurchaseCount ? '-'
																: promotionDiscount.purchaseQuantity
																		+ 'GB')
														+ '</td>'
														+ '<td>'
														+ (promotionDiscount.purchaseRestrictionCount == null ? '-'
																: promotionDiscount.purchaseRestrictionCount
																		+ countUnit)
														+ '</td>'
														+ '<td>'
														+ (promotionDiscount.purchaseRestrictionQuantity == "" ? '-'
																: promotionDiscount.purchaseRestrictionQuantity
																		+ 'GB')
														+ '</td>' + '</tr>';
												productInfoTags
														.push(productInfoTag);
											});
							$('#tbdPromotionDetail').html(
									productInfoTags.join(''));
							$('#divMemo')
									.html(
											$(
													'#hidPromotionDesc_'
															+ promotionNo)
													.val());
						});
		$('.promotionRow').removeClass("selected");
		$('#trPromotion_' + promotionNo).addClass("selected");
		if ($('#hidPromotionContractYn_' + promotionNo).val() == 'Y') {
			$('#btnModifyPromotion').addClass('btnDisabled');
			$('#btnDeletePromotion').addClass('btnDisabled');
		} else {
			$('#btnModifyPromotion').removeClass('btnDisabled');
			$('#btnDeletePromotion').removeClass('btnDisabled');
		}
	}
	// 프로모션 상세내용 보기
	,
	showPromotionDetail : function(promotionNo, loginId) {
		if (promotionNo == undefined) {
			promotionNo = $('#hidPromotionNo').val();
		}
		if (promotionNo == "") {
			alert("프로모션을 선택하세요.");
			return -1;
		}
		if (loginId == undefined) {
			loginId = $('#txtLoginId').val();
		}
		var detailListCount = 0;
		$.ajaxSetup({
			async : false
		});
		$
				.get(
						"/nap/product/discount/promotion/detail",
						{
							promotionNo : promotionNo,
							loginId : loginId
						},
						function(json) {
							if (json.errorTitle != undefined) {
								alert(json.errorTitle + ", " + json.errorMsg);
								detailListCount = -1;
								return;
							}
							var promotionDiscountList = json.promotionDiscountList;
							if (promotionDiscountList != undefined) {
								detailListCount = promotionDiscountList.length;
							}
							var productInfoTags = [];
							$
									.each(
											promotionDiscountList,
											function(i, promotionDiscount) {
												var countUnit = admin.promotion
														.getPurchaseCountUnit(promotionDiscount.infraResourceTypeCode);
												var purchaseRestrictionCount = (promotionDiscount.purchaseRestrictionCount == null ? '-'
														: promotionDiscount.purchaseRestrictionCount);
												var purchaseRestrictionQuantity = (promotionDiscount.purchaseRestrictionQuantity == "" ? '-'
														: promotionDiscount.purchaseRestrictionQuantity);

												var productInfoTag = '<tr>'
														+ '<td>'
														+ promotionDiscount.infraResourceTypeName
														+ '</td>'
														+ '<td>'
														+ promotionDiscount.productName
														+ '</td>'
														+ '<td>'
														+ promotionDiscount.feesTypeName
														+ '</td>'
														+ '<td>'
														+ '<span class="purchaseNoneEditable">'
														+ (purchaseRestrictionCount == '-' ? purchaseRestrictionCount
																: purchaseRestrictionCount
																		+ countUnit)
														+ '</span>'
														+ '<span class="purchaseEditable" style="display:none;">'
														+ (purchaseRestrictionCount == '-' ? '-'
																: '<input type="text" style="width:40px;" name="promotionDiscountList['
																		+ i
																		+ '].purchaseRestrictionCount" value="'
																		+ purchaseRestrictionCount
																		+ '">'
																		+ countUnit)
														+ '</span>'
														+ '</td>'
														+ '<td>'
														+ '<span class="purchaseNoneEditable">'
														+ (purchaseRestrictionQuantity == '-' ? purchaseRestrictionQuantity
																: purchaseRestrictionQuantity
																		+ 'GB')
														+ '</span>'
														+ '<span class="purchaseEditable" style="display:none;">'
														+ (purchaseRestrictionQuantity == '-' ? '-'
																: '<input type="text" style="width:60px;" name="promotionDiscountList['
																		+ i
																		+ '].purchaseRestrictionQuantity" value="'
																		+ purchaseRestrictionQuantity
																		+ '">GB')
														+ '</span>'
														+ '</td>'
														+ '</tr>'
														+ '<tr style="display:none;">'
														+ '<td>'
														+ '<input type="hidden" name="promotionDiscountList['
														+ i
														+ '].promotionNo" value="'
														+ promotionDiscount.promotionNo
														+ '">'
														+ '<input type="hidden" name="promotionDiscountList['
														+ i
														+ '].discountSequence" value="'
														+ promotionDiscount.discountSequence
														+ '">'
														+ '<input type="hidden" name="promotionDiscountList['
														+ i
														+ '].productCode" value="'
														+ promotionDiscount.productCode
														+ '">'
														+ '<input type="hidden" name="promotionDiscountList['
														+ i
														+ '].feeSystemNo" value="'
														+ promotionDiscount.feeSystemNo
														+ '">'
														+ '<input type="hidden" name="promotionDiscountList['
														+ i
														+ '].purchaseRestrictionTypeCode" value="'
														+ promotionDiscount.purchaseRestrictionTypeCode
														+ '">'
														+ '</td>'
														+ '</tr>';
												productInfoTags
														.push(productInfoTag);
											});
							$('#tbdPromotionDetail').html(
									productInfoTags.join(''));
							$('#divMemo')
									.html(
											$(
													'#hidPromotionDesc_'
															+ promotionNo)
													.val());
							$('#ePrmotionName').text(
									' - '
											+ $(
													'#divPromotionName_'
															+ promotionNo)
													.text());
						});
		$.ajaxSetup({
			async : true
		});
		$('#hidPromotionNo').val(promotionNo);
		$('.promotionRow').removeClass("selected");
		$('#trPromotion_' + promotionNo).addClass("selected");
		return detailListCount;
	},
	isUsedPurchaseCount : function(infraResourceTypeCode) {
		if (infraResourceTypeCode == 'BST') {
			return false;
		}
		return true;
	},
	getPurchaseCountUnit : function(infraResourceTypeCode) {
		var countUnit = '대';
		if (infraResourceTypeCode == 'PBLIP') {
			countUnit = '개';
		}
		return countUnit;
	}
	// 프로모션 삭제
	,
	deletePromotion : function() {
		if ($('#btnDeletePromotion').hasClass('btnDisabled')) {
			alert('해당 프로모션으로 이미 계약이 생성되어 수정,삭제가 안됩니다.');
			return;
		}
		var deletePromotionCount = $('.chkPromotion:checked').size();
		var promotionNoList = [];
		if (deletePromotionCount == 0) {
			if ($('tr.selected').length == 1) {
				promotionNoList.push($('tr.selected td input.chkPromotion')
						.first().val());
				deletePromotionCount++;
			} else {
				alert("삭제할 프로모션을 선택하세요.");
				return;
			}
		}
		if (!confirm(deletePromotionCount + "개의 프로모션을 삭제하시겠습니까?")) {
			return;
		}
		$('.chkPromotion:checked').each(function() {
			promotionNoList.push($(this).val());
		});
		$.post('/nap/product/discount/promotion/delete', {
			promotionNoList : promotionNoList
		}, function(json) {
			if (json.errorTitle != undefined) {
				alert(json.errorTitle + ", " + json.errorMsg);
				return;
			}
			if (json.isSuccess == true) {
				admin.promotion.getPromotionList(1, 'ECO');
			} else {
				alert("알수 없는 오류로 프로모션 삭제가 되지않았습니다.\n관리자에게 문의하세요.");
			}
		});
	}
	// 프로모션 신규 생성
	,
	viewAddPromotionPopup : function(promotionTypeCode) {
		var url = '/nap/product/discount/promotion/add';
		if (promotionTypeCode != undefined) {
			url += '?promotionTypeCode=' + promotionTypeCode;
		}
		window.open(url,'promotionAddPopup','height=700,width=1200, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes');
	},
	isValidAddingPromotionProduct : function() {
		var purchaseCount = $.trim($('#txtPurchaseCount').val());
		var purchaseQuantity = $.trim($('#txtPurchaseQuantity').val());
		var selProductCount = $('#selProduct option').size();
		
		if (selProductCount <= 0) {
			alert("상품구성이 없는 상품입니다.");
			$('#selProduct').focus();
			return false;
		}

		if ((purchaseCount == "" && purchaseQuantity == "")
				|| isNaN(purchaseCount) || isNaN(purchaseQuantity)) {
			alert("정확한 프로모션 한도를 설정하세요.");
			if ($('#txtPurchaseCount').attr('disabled')) {
				$('#txtPurchaseQuantity').select();
				$('#txtPurchaseQuantity').focus();
			} else {
				$('#txtPurchaseCount').select();
				$('#txtPurchaseCount').focus();
			}
			return false;
		}

		var infraResourceList = $('.divInfraResourceType');
		var productNameList = $('.divProductName');
		var feeSystemTypeList = $('.divFeeSystemType');
		var listCount = (infraResourceList != undefined) ? infraResourceList
				.size() : 0;
		var isValid = true;
		var curInfraResourceType = $('#selInfraResourceType option:selected')
				.text();
		var curProductName = $('#selProduct option:selected').text();
		var curFeeSystemType = $('#selFeeSystemType option:selected').text();
		for ( var i = 0; i < listCount; i++) {
			if (curInfraResourceType == infraResourceList.eq(i).text()
					&& curProductName == productNameList.eq(i).text()
					&& curFeeSystemType == feeSystemTypeList.eq(i).text()) {

				var removeStatus = infraResourceList.eq(i).parent().parent()
						.find('input.removeStatusList').val();
				if (removeStatus != "Y") {
					alert("중복된 프로모션 상품이 있습니다.");
					isValid = false;
					break;
				}
			}
		}
		return isValid;
	}
	// 프로모션 신규 생성을 위한 상품 추가
	,
	addPromotionProductForAddition : function() {
		if (!admin.promotion.isValidAddingPromotionProduct()) {
			return;
		}
		var isPurchaseCountDisabled = $('#txtPurchaseCount').attr('disabled') != undefined;
		var isPurchaseQuantityDisabled = $('#txtPurchaseQuantity').attr(
				'disabled') != undefined;

		// 수량/용량 제한이 될 id(productInfoSeq) 를 form 전송에 추가한다.
		var purchaseRestrictionType;
		if (isPurchaseQuantityDisabled) {
			purchaseRestrictionType = "CNT";
		} else if (isPurchaseCountDisabled) {
			purchaseRestrictionType = "QTY";
		}

		var countUnit = "<span>"
				+ admin.promotion.getPurchaseCountUnit($(
						'#selInfraResourceType option:selected').val())
				+ "</span>";

		var tag = '<tr class="newProductInfo" id="trProductInfo_new_' + admin.promotion.productInfoSeq + '">'
				+ '<td><div class="divInfraResourceType">' + $('#selInfraResourceType option:selected').text() + '</div></td>'
				+ '<td><div class="divProductName">' + $('#selProduct option:selected').text() + '</div></td>'
				+ '<td><div class="divFeeSystemType">' + $('#selFeeSystemType option:selected').text() + '</div></td>'
				+ '<td><div>' + ($('#txtPurchaseCount').val() == "" ? '-' : $('#txtPurchaseCount').val() + countUnit) + '</div></td>'
				+ '<td><div>' + ($('#txtPurchaseQuantity').val() == "" ? '-' : $('#txtPurchaseQuantity').val() + 'GB') + '</div></td>'
				+ '<td><div><a href="javascript:admin.promotion.deleteProductInfoRow(' + admin.promotion.productInfoSeq + ');" class="btn_sml"><span>삭제</span></a></div></td>'
				+ '</tr>'
				+ '<tr id="trProductParam_new_'	+ admin.promotion.productInfoSeq + '" style="display: none;">'
				+ '<td>' + '<input type="hidden" name="productCodeList" value="' + $('#selProduct option:selected').val() + '">'
				+ '<input type="hidden" name="feeSystemNoList" value="'	+ $('#selFeeSystemType option:selected').val() + '">'
				+ '<input type="hidden" name="purchaseRestrictionCountList" value="' + $('#txtPurchaseCount').val() + '">'
				+ '<input type="hidden" name="purchaseRestrictionQuantityList" value="' + $('#txtPurchaseQuantity').val() + '">'
				+ '<input type="hidden" name="purchaseRestrictionTypeCodeList" value="' + purchaseRestrictionType + '">'
				+ '<input type="hidden" name="infraResourceTypeCodeList" value="' + $('#selInfraResourceType option:selected').val() + '">'	+ '</td>'
				+ '</tr>';
		$('#tbdPromotionProduct').prepend(tag);
		admin.promotion.productInfoSeq++;
	}
	// 프로모션 신규 생성
	,
	createPromotion : function() {
		// validation start
		if ($('#txtPromotionName').val() == "") {
			alert("프로모션 이름을 입력하세요.");
			$('#txtPromotionName').select();
			$('#txtPromotionName').focus();
			return;
		} else if ($('#loginIdList').val() == "") {
			alert("고객ID를 선택하세요.");
			$('#btnMemberSelect').focus();
			return;
		} else if ($('.newProductInfo').size() < 1) {
			alert("상품을 추가해주세요.");
			return;
		}
		
		var loginIdList = $('#loginIdList').val();
		loginIdList = loginIdList.trim();
		
		$('#loginIdList').val(loginIdList);
		
		// validation end
		if (!confirm("프로모션을 생성하시겠습니까?")) {
			return;
		}

		$('#promotionStartYmdtString').val($('#dateFrom').val());
		$('#promotionEndYmdtString').val($('#dateTo').val());
		
		
		$("#frmPromotion").attr("action", "/nap/product/discount/promotion/createPromotion");
		$("#frmPromotion").attr("target", "addPromotionResultPopup");
		$("#frmPromotion").attr("method", "post");
		
		var addPromotionResultPopup = window.open("","addPromotionResultPopup","height=650,width=600,resizable=yes,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes");
		$("#frmPromotion").submit();
		addPromotionResultPopup.focus();
		
		//$.post('/nap/product/discount/promotion/createPromotion', $(
		//		'#frmPromotion').serialize(), function(json) {
		//	if (json.errorTitle != undefined) {
		//		alert(json.errorTitle + ", " + json.errorMsg);
		//		return;
		//	}
			
		//	opener.location.reload();
		//	opener.window.open('/nap/product/discount/promotion/addPromotionResultPopup', 
		//			'addPromotionResultPopup',
		//	'toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=yes, height=380, width=400');

			
		//	self.close();
		//});
	}
	// 프로모션 수정을 위한 상품 추가
	,
	addPromotionProductForModification : function() {
		if (!admin.promotion.isValidAddingPromotionProduct()) {
			return;
		}
		var isPurchaseCountDisabled = $('#txtPurchaseCount').attr('disabled') != undefined;
		var isPurchaseQuantityDisabled = $('#txtPurchaseQuantity').attr(
				'disabled') != undefined;
		var purchaseCountDisabledAttribute = isPurchaseCountDisabled ? 'disabled="'
				+ $('#txtPurchaseCount').attr('disabled') + '"'
				: "";
		var purchaseQuantityDisabledAttribute = isPurchaseQuantityDisabled ? 'disabled="'
				+ $('#txtPurchaseQuantity').attr('disabled') + '"'
				: "";

		// 수량/용량 제한이 될 id(productInfoSeq) 를 form 전송에 추가한다.
		var purchaseRestrictionType;
		if (isPurchaseQuantityDisabled) {
			purchaseRestrictionType = "CNT";
		} else if (isPurchaseCountDisabled) {
			purchaseRestrictionType = "QTY";
		}

		var countUnit = "<span>"
				+ admin.promotion.getPurchaseCountUnit($(
						'#selInfraResourceType option:selected').val())
				+ "<span>";

		var tag = '<tr id="trProductInfo_new_'
				+ admin.promotion.productInfoSeq
				+ '">'
				+ '<td><div class="divInfraResourceType newDivInfraResourceType">'
				+ $('#selInfraResourceType option:selected').text()
				+ '</div></td>'
				+ '<td><div class="divProductName newDivProductName">'
				+ $('#selProduct option:selected').text()
				+ '</div></td>'
				+ '<td><div class="divFeeSystemType newDivFeeSystemType">'
				+ $('#selFeeSystemType option:selected').text()
				+ '</div></td>'
				+ '<td><div>0'
				+ countUnit
				+ '</div></td>'
				+ '<td><div>0GB</div></td>'
				+ '<td><div><input class="purchaseRestriction" style="width: 40px;" type="text" name="newPurchaseRestrictionCountList" value="'
				+ $('#txtPurchaseCount').val()
				+ '" '
				+ purchaseCountDisabledAttribute
				+ '>'
				+ countUnit
				+ '</div></td>'
				+ '<td><div><input class="purchaseRestriction" style="width: 40px;" type="text" name="newPurchaseRestrictionQuantityList" value="'
				+ $('#txtPurchaseQuantity').val()
				+ '" '
				+ purchaseQuantityDisabledAttribute
				+ '>GB</div></td>'
				+ '<td><div><a href="javascript:admin.promotion.deleteProductInfoRow('
				+ admin.promotion.productInfoSeq
				+ ');" class="btn_sml"><span>삭제</span></a></div></td>'
				+ '</tr>'
				+ '<tr id="trProductParam_new_'
				+ admin.promotion.productInfoSeq
				+ '" style="display: none;">'
				+ '<td>'
				+ '<input type="hidden" name="newProductCodeList" value="'
				+ $('#selProduct option:selected').val()
				+ '">'
				+ '<input type="hidden" name="newFeeSystemNoList" value="'
				+ $('#selFeeSystemType option:selected').val()
				+ '">'
				+ '<input type="hidden" name="newPurchaseRestrictionTypeCodeList" value="'
				+ purchaseRestrictionType
				+ '">'
				+ '<input type="hidden" name="newInfraResourceTypeCodeList" value="'
				+ $('#selInfraResourceType option:selected').val() + '">'
				+ '</td>' + '</tr>';
		$('#tbdPromotionProduct').prepend(tag);
		admin.promotion.productInfoSeq++;
	}
	// 상품 삭제 상태 토글 (서버에 저장된 상품만 토글된다. 사용자가 추가하고 저장하지 않은 상품은
	// deleteProductInfoRow로 가서 row삭제)
	,
	toggleRemoveStatus : function(statusCount) {
		if ($('#remove_status_' + statusCount).val() == 'N') {
			$('#remove_status_' + statusCount).val('Y');
			$('#trProductInfo_exist_' + statusCount).css('background-color',
					'lightGray');
			$('#remove_status_' + statusCount).prev().html('<span>취소</span>');
		} else {
			if (admin.promotion.checkDuplicatePromotionDiscount(statusCount)) {
				$('#remove_status_' + statusCount).val('N');
				$('#trProductInfo_exist_' + statusCount).css(
						'background-color', '');
				$('#remove_status_' + statusCount).prev().html(
						'<span>삭제</span>');
			}
		}
	}
	// 상품 삭제 취소 시 중복된 상품이 추가되었는지 체크
	,
	checkDuplicatePromotionDiscount : function(statusCount) {
		var isValid = true;

		var curInfraResourceType = $(
				'#trProductInfo_exist_' + statusCount
						+ ' .divInfraResourceType').text();
		var curProductName = $(
				'#trProductInfo_exist_' + statusCount + ' .divProductName')
				.text();
		var curFeeSystemType = $(
				'#trProductInfo_exist_' + statusCount + ' .divFeeSystemType')
				.text();

		var infraResourceList = $('.newDivInfraResourceType');
		var productNameList = $('.newDivProductName');
		var feeSystemTypeList = $('.newDivFeeSystemType');
		var listCount = (infraResourceList != undefined) ? infraResourceList
				.size() : 0;

		for ( var i = 0; i < listCount; i++) {
			if (curInfraResourceType == infraResourceList.eq(i).text()
					&& curProductName == productNameList.eq(i).text()
					&& curFeeSystemType == feeSystemTypeList.eq(i).text()) {

				alert("중복된 프로모션 상품이 있습니다.");
				isValid = false;
				break;
			}
		}
		return isValid;
	}
	// 제한 수량/용량 이전 값 세팅
	,
	setPrevPurchase : function(purchase) {
		prevPurchase = purchase;
	}
	// 제한 수량/용량 validation check
	,
	checkPurchase : function(obj) {
		var errorMsg;
		var str = $.trim(obj.val());
		if (str == '') {
			errorMsg = '수량 또는 용량을 입력해 주세요.';
		} else if (str.search(/[^0-9]/g) != -1) {
			errorMsg = '숫자로만 입력해 주세요.';
		} else {
			var parsedValue = parseInt(str, 10);
			if (parsedValue < 0) {
				errorMsg = '음수는 입력할 수 없습니다.';
			} else {
				obj.val(parsedValue);
				return;
			}
		}

		alert(errorMsg);
		obj.val(prevPurchase);
	}
	// 프로모션을 수정한다.
	,
	modifyPromotion : function() {
		// validation start
		if ($('#txtPromotionName').val() == "") {
			alert("프로모션 이름을 입력하세요.");
			$('#txtPromotionName').select();
			$('#txtPromotionName').focus();
			return;
		} else if ($('#txtLoginId').val() == ""
				|| $('#hidMemberNo').val() == "") {
			alert("고객ID를 선택하세요.");
			$('#btnMemberSelect').focus();
			return;
		}

		// validation end
		if (!confirm("프로모션을 수정하시겠습니까?")) {
			return;
		}

		$('#promotionStartYmdtString').val($('#dateFrom').val());
		$('#promotionEndYmdtString').val($('#dateTo').val());
		$('.purchaseRestriction').attr("disabled", false);
		$.post('/nap/product/discount/promotion/modifyPromotion', $(
				'#frmPromotion').serialize(), function(json) {
			if (json.errorTitle != undefined) {
				alert(json.errorTitle + ", " + json.errorMsg);
				return;
			} else {
				alert("성공하였습니다.");
			}
			opener.location.reload();
			self.close();
		});
	}
	// 고객을 선택하는 팝업을 보여준다.
	,
	showMemberPopup : function(checkBoxUsageYn) {
		window.open(
						'/nap/product/discount/promotion/showMember' + '?checkBoxUsageYn=' + checkBoxUsageYn,
						'memberPopup',
						'toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=yes, height=810, width=800');
	}
	// 고객 정보를 가져온다.
	,
	getMemberList : function(checkBoxUsageYn) {
		var loginId = $('#txtLoginId').val();
		var memberName = $('#txtMemberName').val();
		var memberStatusCode = $('[name=memberStatusCode] option:selected').val();
		var memberGroupCode = $('[name=memberGroupCode] option:selected').val();
		var memberTypeCode = $('[name=memberTypeCode] option:selected').val();
		var memberCategorizeCode = $('[name=memberCategorizeCode] option:selected').val();
		var paramString = "?&loginId=" + escape(encodeURIComponent(loginId))
			+ "&memberName=" + escape(encodeURIComponent(memberName))
			+ "&memberStatusCode=" + encodeURIComponent(memberStatusCode)
			+ "&memberGroupCode=" + encodeURIComponent(memberGroupCode)
			+ "&memberTypeCode=" + encodeURIComponent(memberTypeCode)
			+ "&memberCategorizeCode=" + encodeURIComponent(memberCategorizeCode)
			+ "&checkBoxUsageYn=" + encodeURIComponent(checkBoxUsageYn);
		
		document.location.href = "/nap/product/discount/promotion/showMember" + paramString;
	}
	// 고객을 선택한다.
	,
	selectMember : function(memberNo, loginId, memberName) {
		$('.memberRow').removeClass("selected");
		$('#trmember_' + memberNo).addClass("selected");

		$('#hidSelectedMemberNo').val(memberNo);
		$('#hidSelectedLoginId').val(loginId);
		$('#hidSelectedMemberName').val(memberName);
	}
	// 프로모션 상품정보 row 제거
	,
	deleteProductInfoRow : function(productInfoSeq) {
		$('#trProductInfo_new_' + productInfoSeq).remove();
		$('#trProductParam_new_' + productInfoSeq).remove();
	}
	// 상품 유형 변경 시
	,
	onChangeInfraResourceTypeSelectBox : function() {
		$.ajaxSetup({
			async : false
		});
		var infraResourceTypeCode = $('#selInfraResourceType option:selected')
				.val();
		$.get('/nap/product/discount/promotion/productList', {
			infraResourceTypeCode : infraResourceTypeCode
		}, function(json) {
			if (json.errorTitle != undefined) {
				alert(json.errorTitle + ", " + json.errorMsg);
				return;
			}
			var productList = json.productList;
			var tags = [];
			$.each(productList, function(i, product) {
				tags.push('<option value="' + product.productCode + '">'
						+ product.productName + '</option>');
			});
			$('#selProduct').html(tags.join(''));
			$('#hidQuantityBaseYn').val(json.quantityBaseYn);
		});
		$.ajaxSetup({
			async : true
		});
		$('#txtPurchaseCount').val("");
		$('#txtPurchaseQuantity').val("");
		if ($('#hidQuantityBaseYn').val() == "Y") {
			$('#txtPurchaseCount').attr('disabled', true);
			$('#txtPurchaseQuantity').attr('disabled', false);
		} else {
			$('#txtPurchaseCount').attr('disabled', false);
			$('#txtPurchaseQuantity').attr('disabled', true);
		}
	}
	// 상품 구성 변경 시
	,
	onChangeProductSelectBox : function() {
		var productCode = $('#selProduct option:selected').val();
		$.get('/nap/product/discount/promotion/feeSystemTypeList', {
			productCode : productCode
		}, function(json) {
			if (json.errorTitle != undefined) {
				alert(json.errorTitle + ", " + json.errorMsg);
				return;
			}
			var feeSystemTypeList = json.feeSystemTypeList;
			var tags = [];
			$.each(feeSystemTypeList, function(i, feeSystemType) {
				tags.push('<option value="' + feeSystemType.feeSystemNo + '">'
						+ feeSystemType.feeSystemTypeName + '</option>');
			});
			$('#selFeeSystemType').html(tags.join(''));
		});
	}
	// 프로모션 수정 팝업 화면 보기
	,
	viewModifyPromotionPopup : function(promotionTypeCode) {
		if ($('#btnModifyPromotion').hasClass('btnDisabled')) {
			alert('해당 프로모션으로 이미 계약이 생성되어 수정,삭제가 안됩니다.');
			return;
		}
		var url = '/nap/product/discount/promotion/modify';
		var promotionNo = "";
		$('.promotionRow').each(
				function() {
					if ($(this).hasClass('selected')) {
						promotionNo = $(this).children().find('.chkPromotion')
								.first().val();
					}
				});
		if (promotionNo == "") {
			alert("수정할 프로모션을 선택하세요.");
			return;
		}
		url += '?promotionNo=' + promotionNo;
		if (promotionTypeCode != undefined) {
			url += '&promotionTypeCode=' + promotionTypeCode;
		}
		window
				.open(
						url,
						'promotionModifyPopup',
						'height=700,width=1200, toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes');
	}
};