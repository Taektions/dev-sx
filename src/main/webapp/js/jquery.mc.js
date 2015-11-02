/** jquery wrapping - ntruss 서버군에 대해 checkbox 클릭 과 row 클릭에 대한 제어
 * 
 * 1. 공통 함수
 *  a. isStatusIng : status 변경중인 상태를 판단하는 함수
 *  b. fnCheck : checkbox 값을 check/uncheck 하는 함수
 *  c. fnSetSelectedStyle : 선택한 row 의 selected css 를 설정하는 함수
 *   
 * 2. checkClick 메서드 - mc 의 row 단위 checkbox 가 클릭된 event에 대한 처리를 수행한다.
 * 	a. settings : checkbox 클릭에 대해 필요한 class, id, postfix 명을 파라미터로 받는다.
 * 	b. fnGetSubTree : 클릭된 checkbox 를 포함하는 table tr 이 sub tr 을 가지는 경우 tree 형식의 데이터를 가져오기 위한 함수
 * 					  params - checkbox, divSubTreeId
 * 					  result - subtree 존재여부(boolean)
 * 	c. fnSetEnable : 현재 클릭에 대해 button 및 팝업 레이어의 enable/disable 설정을 위한 함수
 * 					  params - checkbox
 * 	d. fnGetDetail : row 클릭에 대해 상세 화면을 보여주기 위한 함수
 * 
 * 3. rowClick 메서드 - mc 의 row 가 클릭된 event에 대한 처리를 수행한다.
 * 	a. settings : row 클릭에 대해 필요한 class, id 명을 파라미터로 받는다. 
 * 	b. fnSetEnable : 현재 클릭에 대해 button 및 팝업 레이어의 enable/disable 설정을 위한 함수
 * 
 * 4. checkAllClick 메서드 - mc 의 전체선택 checkbox 클릭된 event에 대한 처리를 수행한다.
 * 	a. settings : class, id 명을 파라미터로 받는다. 
*/ 
if(jQuery)( function() {
	var $lastSelectedCheckBox = null;
	// 서버 상태 변화가 진행중인지 여부를 판단하는 함수
	jQuery.isStatusIng = function(currStatus) {
		currStatus = $.trim(currStatus);
		if (currStatus == "shutting down"
			|| currStatus == "booting"
			|| currStatus == "rebooting"
			|| currStatus == "terminating"
			|| currStatus == "creating"
			|| currStatus == "init"
			|| currStatus == "initialized"
			|| currStatus == "attaching"
			|| currStatus == "detaching"
			|| currStatus == "changingSpec"
			|| currStatus == "repairing"
			|| currStatus == "INIT"
			|| currStatus == "CREAT"
			|| currStatus == "START"
			|| currStatus == "RPLCA"
			|| currStatus == "RESTA"
			|| currStatus == "MODFY"
			|| currStatus == "BACKP"
			|| currStatus == "RESTR"
			|| currStatus == "TERMT"
			|| currStatus == "using"
			|| currStatus == "disusing"
			|| currStatus == "copying"
			|| currStatus == "setting up"
			|| currStatus == "changing"
			|| currStatus == "hard shutting down"
			|| currStatus == "hard rebooting"
			|| currStatus == "detachFailed"
			/*|| currStatus == "start_failed"
			|| currStatus == "shutdown_failed"
			|| currStatus == "reboot_failed"*/
		) {
			return true;
		}
		return false;
	};
	
	// 서버 상태가 실패 상태인지 판단 
	jQuery.isStatusFailed = function(currStatus) {
		currStatus = $.trim(currStatus);
		if (currStatus == "shutdown_failed" || currStatus == "reboot_failed" || currStatus == "start_failed") {
			return true;
		}
		return false;
	};
	
	// 서버를 강제 정지할 수 있는 상태인지 판단 
	jQuery.isStatusForceStoppable = function(currStatus) {
		currStatus = $.trim(currStatus);
		if (currStatus == "shutting down"|| currStatus == "rebooting" || currStatus == "shutdown_failed" || currStatus == "reboot_failed" || currStatus == "start_failed") {
			return true;
		}
		return false;
	};
	
	jQuery.fnGetId = function($checkbox) {
		if ($checkbox == undefined || $checkbox == null || $checkbox.size() == 0) {
			return "";
		}
			
		var idString = $checkbox.attr('id');
		var idArray = idString.split('_');
		return idArray[0];
	};
	
	// row 의 checkbox 를 클릭한다.
	jQuery.fnCheck = function($checkbox, check, settings) {
		var obj = {
			statusPostFix : '_status'
		}; 
		obj = $.extend({}, obj, settings);
		
		if (check == undefined) {
			check = true;
		}
		
		$checkbox.attr('checked', check);
		/*var id = $.fnGetId($checkbox);
		var status = $('#' + id + obj.statusPostFix).val();
		if (!$.isStatusIng(status)) {
			$checkbox.attr('checked', check);
		} else {
			$checkbox.attr('checked', false);
		}*/
	};
	
	// 선택된 row의 style 변경, $currentTr = tr
	jQuery.fnSetSelectedStyle = function($currentTr, selectClass, settings) {
		var obj = {
			statusPostFix : '_status',
			checkboxClass : '._checkbox'
		}; 
		obj = $.extend({}, obj, settings);
		
		var status = $('#' + $currentTr.attr('id') + obj.statusPostFix).val();
		
		if (selectClass == undefined) {
			if (!$.isStatusIng(status)) {
				if ($currentTr.find(obj.checkboxClass).is(":checked")) {
					$currentTr.addClass("selected");
				} else {
					$currentTr.removeClass("selected");
				}
			} else {
				if ($currentTr.find(obj.checkboxClass).is(":checked")) {
					$currentTr.addClass("w_selected");
				} else {
					$currentTr.removeClass("w_selected");
				}
			}
		} else if (selectClass == "select") {
			if ($.isStatusIng(status)) {
				$currentTr.addClass("w_selected");
			} else {
				$currentTr.addClass("selected");
			}
		} else if (selectClass == "unselect") {
			$currentTr.removeClass("selected");
			$currentTr.removeClass("w_selected");
		}
	};
	
	jQuery.fnRowClick = function(ev, obj, $trCurrent, settings, fnSetEnable, fnGetDetail, fnCloseDetail, fnGetSubTree) {
		var $thisCheckBox = $trCurrent.find(obj.checkboxClass).first();
		
		// ctrl 키가 눌러진 상태가 아니면 모든 select 를 해제한다.
		if (!ev.ctrlKey) {
			$(obj.rowClass).each(function() {
				$(this).find(obj.checkboxClass).each(function() {
					if ($(this).attr('id') != $thisCheckBox.attr('id')) {
						$.fnCheck($(this), false, settings);
					} 
				});
				$.fnSetSelectedStyle($(this), "unselect", settings);
			});
		} else {
			var id = $trCurrent.attr('id');
			var currStatus = $('#' + id + obj.statusPostFix).val();
			// ctrl 키를 누르고 선택한 row가 상태 변경 중일 경우 return (선택 되어 있는 row가 하나도 없을 경우에는 제외)
			if ($.isStatusIng(currStatus) && $(obj.checkboxClass + ':checked').size() > 0) {
				return;
			}
			// 선택한 row 외에 현재 선택되어 있는 상태 변경 중인 row가 있을 경우 return
			if ($(obj.checkboxClass + ':checked:hidden').size() > 0) {
				return;
			}
		} 
		
		// shift 키가 눌러진 상태이면 멀티 select 를 처리한다.
		if (ev.shiftKey) {
			// 마지막 선택된 row가 상태 변경 중일 경우
			if ($lastSelectedCheckBox.is(':hidden')) {
				$lastSelectedCheckBox[0].click();
				return;
			}
			var $checkboxes = $(obj.checkboxClass);
			var lastIndex = $checkboxes.index($thisCheckBox);
			var firstIndex = $checkboxes.index($lastSelectedCheckBox);
			var directNext;
			if (firstIndex <= lastIndex) {
				directNext = true;
			} else {
				directNext = false;
			} 
			var currIndex = $checkboxes.index($lastSelectedCheckBox);
			var endIndex = $checkboxes.index($thisCheckBox);
			$.fnCheck($checkboxes.eq(currIndex), true, settings);
			$.fnSetSelectedStyle($(obj.rowClass).eq(currIndex), null, settings);
			while(currIndex != endIndex) {
				if (directNext) {
					currIndex += 1;
				} else {
					currIndex -= 1;
				}
				// 상태 변경 중이 아닐 때만 check
				var id = $.fnGetId($checkboxes.eq(currIndex));
				if (!$.isStatusIng($('#' + id + obj.statusPostFix).val())) {
					$.fnCheck($checkboxes.eq(currIndex), true, settings);
					$.fnSetSelectedStyle($(obj.rowClass).eq(currIndex), null, settings);
				}
			}
			
			// 상세내용을 표시한다.
			if (fnGetDetail != undefined) {
				// 상태 변경 중이 아닌 row를 2개 이상 선택했을 때만 상세내용을 변경한다.
				if ($(obj.checkboxClass + ':checked:visible').size() >= 1) {
					fnGetDetail($thisCheckBox);
				}
			}
			
			// 버튼 enable/disable 을 설정한다.
			if (fnSetEnable != undefined) {
				fnSetEnable($thisCheckBox);
			}
			var checkedSize = $(obj.checkboxClass + ':checked').size();
			if (checkedSize == 0) {
				if (fnCloseDetail != undefined) {
					fnCloseDetail();
				}
			} else if (checkedSize > 1) {
				if (fnCloseDetail != undefined) {
					fnCloseDetail();
				}
			}
			
			/* check 시 sub 페이지를 제어한다. - START */
			if (fnGetSubTree != undefined) {
				if (checkedSize == 1) {
					var isExistSubTree = fnGetSubTree($thisCheckBox, obj.subTreeId);
					if (isExistSubTree) {
						$(obj.subrowClass).hide();
						var currentCheckId = $thisCheckBox.val();
						var trCurrentSubId = currentCheckId + obj.subrowPostFix;
						$("#" + trCurrentSubId).show();
						$("#" + trCurrentSubId).children().append($('#' + obj.subTreeId));
						$('#' + currentCheckId + obj.subTreeIconPostFix).addClass('pos_name_selected');
					} else {
						$(obj.subrowClass).hide();
					}
				} else {
					$(obj.subrowClass).hide();
				}
			}
			/* check 시 sub 페이지를 제어한다. - END */
		} else {
			$lastSelectedCheckBox = $thisCheckBox;
	 		//this = tr 이므로 chkSelected 를 찾아 0번째 클릭을 수행한다.
	 		$trCurrent.find(obj.checkboxClass)[0].click();
		}
	};
	
	
	
	obj = $.extend($.fn, {
		// 파일스토리지의 이름 바꾸기 시 range 설정
		selectRange : function(start, end) {
		    var e = document.getElementById($(this).attr('id')); // I don't know why... but $(this) don't want to work today :-/
		    if (!e) return;
		    else if (e.setSelectionRange) { e.focus(); e.setSelectionRange(start, end); } /* WebKit */ 
		    else if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
		    else if (e.selectionStart) { e.selectionStart = start; e.selectionEnd = end; }
		},
		
		// checkbox 클릭
		checkClick : function(settings, fnGetSubTree, fnSetEnable, fnGetDetail, fnCloseDetail) {
			var obj = {
				checkboxClass : '._checkbox',
				rowClass : '._row',
				subrowClass : '._subrow',
				checkboxAllId : 'chkAllSelected',
				subTreeId : 'subTree',
				statusPostFix : '_status',
				subrowPostFix : '_sub',
				subTreeIconPostFix : '_treeIcon'
			}; 
			obj = $.extend({}, obj, settings);
			
			$(this).click(function(evt) {
				// parent 로 event bubbling 을 제거한다.
				evt.cancelBubble = true;
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				var id = $.fnGetId($(this));
				// 현재 변경중인 건에 대해서는 check 하지 않는다.
				/*var currStatus = $('#' + id + obj.statusPostFix).val();
				if ($.isStatusIng(currStatus)) {
					$(this).attr('checked', false);
				} */
				
				// 현재 선택된 row 외에 상태 변경 중인 row 가 있으면 선택 해제한다.
				$(obj.rowClass).each(function() {
					$(this).find(obj.checkboxClass).each(function() {
						var status = $('#' + $.fnGetId($(this)) + obj.statusPostFix).val();
						if ($.fnGetId($(this)) != id && $.isStatusIng(status)) {
							$.fnCheck($(this), false, settings);
							$.fnSetSelectedStyle($('#' + $.fnGetId($(this)) + obj.rowClass), "unselect", settings);
						} 
					});
				});
				
				var $trCurrent = $('#' + id);
				$.fnSetSelectedStyle($trCurrent, null, settings);
				
				// 전체 선택을 제거한다.
				$('#' + obj.checkboxAllId).attr("checked", false);
				
				var isExistSubTree = false;
				var checkedSize = $(obj.checkboxClass + ':checked').size();
				var $checkbox = $(obj.checkboxClass + ':checked').first();
				
				// 상세내용을 표시한다. 
				if (fnGetDetail != undefined) {
					fnGetDetail($checkbox);
				}
				
				// sub 페이지를 동적으로 가져온다.
				/* check 시 sub 페이지를 제어한다. - START */
				var currStatus = $('#' + id + obj.statusPostFix).val();
				if (fnGetSubTree != undefined && !$.isStatusIng(currStatus)) {
					if (checkedSize == 1) {
						isExistSubTree = fnGetSubTree($checkbox, obj.subTreeId);
						if (isExistSubTree) {
							$(obj.subrowClass).hide();
							var currentCheckId = $checkbox.val();
							var trCurrentSubId = currentCheckId + obj.subrowPostFix;
							$("#" + trCurrentSubId).show();
							$("#" + trCurrentSubId).children().append($('#' + obj.subTreeId));
							$('#' + currentCheckId + obj.subTreeIconPostFix).addClass('pos_name_selected');
						} else {
							$(obj.subrowClass).hide();
						}
					} else {
						$(obj.subrowClass).hide();
					}
				// 상태 변경 중인 row 클릭 시 다른 sub 페이지 숨김
				} else if ($.isStatusIng(currStatus)) {
					$(obj.subrowClass).hide();
				}
				/* check 시 sub 페이지를 제어한다. - END */
				
				// 버튼 enable/disable 을 설정한다.
				if (fnSetEnable != undefined) {
					fnSetEnable($checkbox);
				}

				if (checkedSize == 0) {
					if (fnCloseDetail != undefined) {
						fnCloseDetail();
					}
				} else if (checkedSize > 1) {
					if (fnCloseDetail != undefined) {
						fnCloseDetail();
					}
				}
				$(".contextMenu, .ly_rightmenu2").hide();
			});
			
			$(this).mouseup(function(evt) {
				// parent 로 event bubbling 을 제거한다.
				evt.cancelBubble = true;
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
			});
		},
		
		// row 클릭시
		rowClick : function(settings, fnSetEnable, fnGetDetail, fnCloseDetail, fnGetSubTree) {
			var obj = {
				checkboxClass : '._checkbox',
				rowClass : '._row',
				statusPostFix : '_status',
				subrowClass : '._subrow',
				subrowPostFix : '_sub',
				subTreeId : 'subTree',
				subTreeIconPostFix : '_treeIcon'
			};
			obj = $.extend({}, obj, settings);
			
			$(this).mouseup(function(ev) {
				if (ev.button == 2) {
					return;
				}
				$.fnRowClick(ev, obj, $(this), settings, fnSetEnable, fnGetDetail, fnCloseDetail, fnGetSubTree);
			});
			
			$(this).bind('mouseup.rightClick', function(e) {
				if (e.button == 2) {	// 오른쪽 마우스 클릭시
					// row 선택 여부를 판단하여 클릭 제어
					var $trCurrent = $(this);
					var $checkbox = $trCurrent.find('._checkbox').first();
					if ($checkbox.is(':checked') == false) {
						$.fnRowClick(e, obj, $(this), settings, fnSetEnable, fnGetDetail, fnCloseDetail, fnGetSubTree);
					}
					
					if ($checkbox.attr('checked') == false) {
						$(this).disableContextMenu();
					} else {
						$(this).enableContextMenu();
					}
				}
			});
		},
		
		// 전체 선택 checkbox 클릭시
		checkAllClick : function (settings, fnGetDetail, fnSetEnable, fnCloseDetail) {
			var obj = {
				checkboxClass : '._checkbox',
				rowClass : '._row',
				statusPostFix : '_status',
				subrowClass : '._subrow'
			};
			obj = $.extend({}, obj, settings);
			
			$(this).click(function() {
				if ($(obj.checkboxClass).size() == 0) {
					return;
				}
				
				if ($(this).is(':checked')) {
					// 운영 중 모두 체크
					$(obj.checkboxClass + ':not(checked):visible').each(function() {
						$.fnCheck($(this), true, settings);
					});
					// 상태 변경 중 모두 체크 해제
					$(obj.checkboxClass + ':hidden').each(function() {
						$.fnCheck($(this), false, settings);
					});
				} else {
					$(obj.checkboxClass + ':checked').each(function() {
						$.fnCheck($(this), false, settings);
					});
				}
				
				$(obj.rowClass).each(function() {
					$.fnSetSelectedStyle($(this), null, settings);
				});
				
				var $checkbox = $(obj.checkboxClass + ":checked").first(); 
				// 상세내용을 표시한다. 
				if (fnGetDetail != undefined) {
					fnGetDetail($checkbox);
				}
				
				// 버튼 enable/disable 을 설정한다.
				if (fnSetEnable != undefined) {
					// 전체 선택이므로 특정 하나의 checkbox 선택이 아님 - fnSetEnable 을 정의 할 때 파라미터가 undefined 인지 체크해야함
					fnSetEnable($checkbox);
				}
				
				var checkedSize = $(obj.checkboxClass + ':checked').size();
				if (checkedSize == 0) {
					if (fnCloseDetail != undefined) {
						fnCloseDetail();
					}
				} else if (checkedSize > 1) {
					if (fnCloseDetail != undefined) {
						fnCloseDetail();
					}
				}
				
				$(obj.subrowClass).hide();
			});
		}
	});
})(jQuery);