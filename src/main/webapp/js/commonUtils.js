// 여러 브라우저 지원위해서 event 값 전역변수 저장
var g_onkeypress_event;
document.onkeypress = function(e) {
    if( typeof(e) != "undefined" ) 
        g_onkeypress_event = e;
    else 
        g_onkeypress_event = event;
}

//json 형태에서 날짜 조합 
function getDateFromJason(target){
	return (target.year + 1900) + "-" + fillZero(target.month + 1) + "-" + fillZero(target.date) + " " + fillZero(target.hours) + ":" + fillZero(target.minutes); 
}

function getDateFromTimestamp(unixTimestamp) {
    var dt = new Date(unixTimestamp);

    var year = dt.getFullYear();
    var month = dt.getUTCMonth()+1;
    var day = dt.getUTCDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    
    if (month < 10)
    	month = '0' + month;
    
    if (day < 10)
    	day = '0' + day;
    
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

//날짜 시간 조건중 10 미만 0 붙여서 리턴
function fillZero(target){
	target = parseInt(target);
	return target < 10 ? '0' + target: target; 
}
function getGBSize(byteSize) {
	var gbSize = parseInt(byteSize, 10) / 1073741824;
	return parseInt(gbSize, 10);
}

//사이즈에 맞는 단위로 변환하여 리턴
function convertFileSizeUnit(byteUnit){  
	if(byteUnit == null){
		return '0KB';
	}
	if(byteUnit > 1024 * 1024 * 1024){
		return commify((byteUnit / 1024 / 1024/ 1024).toFixed(1)) + 'GB';
	}else if(byteUnit > 1024 * 1024 ){
		return commify((byteUnit / 1024 / 1024).toFixed(1)) + 'MB';
	}else{
		return getKBUnitFileSize(byteUnit);
	}
}

//파일 사이즈를 받아 kb 단위로 리턴한다. by 한승엽
function getKBUnitFileSize(byteUnit){
	return commify(Math.ceil(byteUnit / 1024)) + 'KB';   
	
}

//숫자 콤마 추가 
function commify(n) {
	  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	  n += '';                          // 숫자를 문자열로 변환

	  while (reg.test(n))
	    n = n.replace(reg, '$1' + ',' + '$2');

	  return n;
}

/**
 * 쿠키 설정
 * @param cookieName 쿠키명
 * @param cookieValue 쿠키값
 * @param expireDay 쿠키 유효날짜
 * @author leejaen
 */
function setNapCookie(cookieName, cookieValue) {
	 $.ajax({
	        type: 'get'
	        , async: false
	        , url: '/nap/member/setCookie?cookieValue='+ cookieValue + '&cookieName='+ cookieName
	        , error: function(data, status, err) {
	            alert('Cookie 생성에 실패 하였습니다. 관리자에게 문의하세요.' + err + '[' + status +']');
	          }
	    });
}

/**
 * 쿠키값 가져오기 
 * @param cookieName 쿠키명
 * @returns {String} 쿠키값
 * @author everblue
 */
function readNapCookie(cookieName) {
	var cookieValue = '';
	 $.ajax({
	        type: 'get'
	        , async: false
	        , success: function(data) {
	        	$.each(data, function(key, val) {
	        		if (key==cookieName) {
	        			cookieValue = val;   			
	        		}
	        	});
	        }
	        , url: '/nap/member/getCookie?cookieName='+ cookieName
	        , error: function(data, status, err) {
	            alert('Cookie 생성에 실패 하였습니다. 관리자에게 문의하세요.' + err + '[' + status +']');
	          }
	    });
	 
    return cookieValue;
}


// --- end of Cookie

var ENTER_KEY = 13;
function docReadyCommonProcess(){
	setEnterKeyEventInSearchValue();
	
	//화면이 불려진뒤 자동으로 조회 되도록 함 
	var loginId = readNapCookie('loginId');
	if(loginId != null && loginId != ''){
		$('#searchKey').val('loginId');
		$('#searchValue').val(loginId); 
		searchData(); 
	}
}

function setEnterKeyEventInSearchValue(){
	$('#searchValue').keydown(function(e){
		if(e.keyCode == ENTER_KEY){
			searchData(); 
	  	}
	});
}
//매월 말일 구하기
function getLastDay(year, month){
	var temp = new Date(year, month, 1);
	var temp2 = new Date(temp -1);
	return temp2.getDate(); 
}

//매월 말일 구하기
function getTodayDay(){
	var temp = new Date();
	return temp.getDate(); 
}

/*	
 * 	같은 내용의 TD를 merge 함
 * 	parameter :  td를 select 할수있는 string (ex) '#tbodyPromotionList tr td.merge'
 */ 
function mergeRowspan(targetTdString){    
	$(targetTdString).each(function(){
		var rows;
		if ($(targetTdString).attr("key") == undefined) {
			rows = $(targetTdString + ':contains("' + $(this).text() + '")');
		} else {
			rows = $(targetTdString + '[key="' + $(this).attr("key")+ '"]');
		}
		if (rows.length > 1) {
			rows.eq(0).attr("rowspan", rows.length);  
			rows.not(":eq(0)").remove();
		}
	});
}
/*	
 * 	같은 내용의 TD를 merge 함
 *  2번째 컬럼을 머지 
 * 	parameter :  td를 select 할수있는 string (ex) '#tbodyPromotionList tr td.merge'
 */ 
function mergeRowspan2(parentTdString, targetTdString){
	$(parentTdString).each(function(){
		var parentKey = $(this).text();  
		$(targetTdString + '[parentKey="' + parentKey + '"]').each(function(){
			var rows = $(targetTdString + '[parentKey="' + parentKey + '"]:contains("' + $(this).text() + '")');
			if (rows.length > 1) {
				rows.eq(0).attr("rowspan", rows.length);  
				rows.not(":eq(0)").remove();
			}
		});
	});
}

//이메일 체크 
function checkMailTypeYn(strMail) { 
   /** 체크사항 
     - @가 2개이상일 경우 
     - .이 붙어서 나오는 경우 
     -  @.나  .@이 존재하는 경우 
     - 맨처음이.인 경우 
     - @이전에 하나이상의 문자가 있어야 함 
     - @가 하나있어야 함 
     - Domain명에 .이 하나 이상 있어야 함 
     - Domain명의 마지막 문자는 영문자 2~4개이어야 함 **/
    var check1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;  
    var check2 = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/; 
     
    if ( !check1.test(strMail) && check2.test(strMail) ) { 
        return true; 
    } else { 
        return false; 
    } 
}







/**
 * commonCodeList를 selectBox로 가공한다.
 * param : 	groupCode, groupCode에 따른 commonCodeList를 만들기
 * 			innerSelectId, 생성될 select태그의 id명
 * 			innerSelectName, 생성될 select태그의 name명
 * 			innerHtmlTag, 삽입되어야 할 태그 id명
 * 			selectedValue, selected되어야 할 값
 */
function getCommonCodeSelectList(groupCode, innerSelectId, innerSelectName, innerHtmlTag, selectedValue) {
	if(groupCode == null || groupCode ==''){
		return; 
	}
	
	var selectList = '';
	$.get(
			"/nap/commonCode/getGroupCodeList"
			,{ searchGroupCode : groupCode }
			,function(json){
				
				if (typeof json != "object") {
					return;
				}

				selectList = '<select name="'+innerSelectName+'" id="'+innerSelectId+'">';
			   	$.each(json.commonList, function(i, Object) {
					if (Object != "undefined") {
						selectList += '<option value="'+Object.code+'">' + Object.codeName + '</option>';
					}
				});
			   	selectList += '</select>';
			   	$('#'+innerHtmlTag).html(selectList);
			   	if (selectedValue != '') {
			   		$('#'+innerSelectId).val(selectedValue);
			   	}
			}
	);
}

/*
function getCommonCodeSelectCategorizeList(groupCode, detailCategorizeCode, innerSelectId, innerSelectName, innerHtmlTag, selectedValue) {
	if(groupCode == null || groupCode ==''){
		return; 
	}
	var selectList = '';
	$.get(
			"/nap/commonCode/getGroupDetailCategorizeCodeList"
			,{ searchGroupCode : groupCode,  searchDetailCategorizeCode : detailCategorizeCode}
			,function(json){
				if (typeof json != "object") {
					return;
				}

				selectList = '<select name="'+innerSelectName+'" id="'+innerSelectId+'">';
			   	$.each(json.commonList, function(i, Object) {
					if (Object != "undefined") {
						selectList += '<option value="'+Object.code+'">' + Object.codeName + '</option>';
					}
				});
			   	selectList += '</select>';
			   	$('#'+innerHtmlTag).html(selectList);
			   	if (selectedValue != '') {
			   		$('#'+innerSelectId).val(selectedValue);
			   	}
			}
	);
}
*/


/**
 * 올바른 전화번호 형식(숫자-숫자-숫자)인지 체크합니다.
 */
function isvalidphone(str) {
    if (str.search(/^(\d+)-(\d+)-(\d+)$/g)!=-1) return true;
    else return false;
}

/**
 * 숫자로만 되어있는지 체크합니다.
 */
function isdigit(str) 
{
    if (str.search(/[^0-9]/g)==-1) return true;
    else return false;
}

/**
 * 특정문자를 삭제한 값을 리턴
 */
function removeChar(srcString, strchar) {
	var convString ='';
	for (z=0;z<srcString.length;z++) {
		if (srcString.charAt(z) != strchar)
			convString = convString + srcString.charAt(z);
	}
	return convString;
}

/**
 * 두 날짜간의 유효성 CHECK 시 사용 (시작날짜가 종료날짜보다 작을 경우 에러처리함)
 * */
function check_dates(obj1, obj2) {
	var s_date = removeFmt(obj1.val());
	var e_date = removeFmt(obj2.val());
	if (s_date != '' && e_date != '') {
		if (parseFloat(s_date) > parseFloat(e_date)) {
		    alert('시작날짜가 종료날짜보다 큽니다.');
		    obj1.focus();
			return false;
		}
	}
	return true;
}

/**
 * FORMAT 문자 전체삭제
 * */
function removeFmt(str) {
	result = removeChar(str, '.');
	result = removeChar(result, '-');
	result = removeChar(result, ',');
	result = removeChar(result, '/');

	return result;
}

/**
 * 날짜(년월일) FORMAT 처리
 * */
function makeDate(obj) {
    // ie외 브라우저의 event 값 캐취
    if (typeof(event) == "undefined") event = g_onkeypress_event;
    // event 유무 확인 : IE외 에서 keypress 이벤트 발생하지 않은 경우 ( g_onkeypress_event = null )
    if (typeof(event) == "undefined")	return false; 
	// 백스페이스키 무시
	if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || (event.keyCode >= 37 && event.keyCode <= 40))
      return false;
	var str = removeChar(obj.value,'-');
	str = removeChar(str,'.');
	if (str.length == 4) {
		obj.value = str + "-";
	}
	else if (str.length == 6) {
		obj.value = str.substring(0, 4) + "-" + str.substring(4,6) + "-";
	}
	else if (str.length >= 8) {
		obj.value = str.substring(0, 4) + "-" + str.substring(4,6) + "-" + str.substring(6, 8);
	}
}

/**
 * 날짜(년월) FORMAT 처리
 * */
function makeMonthDate(obj) {
    // ie외 브라우저의 event 값 캐취
    if (typeof(event) == "undefined") event = g_onkeypress_event;
    // event 유무 확인 : IE외 에서 keypress 이벤트 발생하지 않은 경우 ( g_onkeypress_event = null )
    if (typeof(event) == "undefined")	return false; 
	// 백스페이스키 무시
   	if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || (event.keyCode >= 37 && event.keyCode <= 40))
      return false;
	var str = removeChar(obj.value,'-');
	str = removeChar(str,'.');
	if (str.length == 4) {
		obj.value = str + "-";
	}
	else if (str.length >= 6) {
		obj.value = str.substring(0, 4) + "-" + str.substring(4,6);
	}
}

/**
 * 시간(Time) FORMAT 처리
 * */
function makeTime(obj) {
	// ie외 브라우저의 event 값 캐취
    if (typeof(event) == "undefined") event = g_onkeypress_event;
    // event 유무 확인 : IE외 에서 keypress 이벤트 발생하지 않은 경우 ( g_onkeypress_event = null )
    if (typeof(event) == "undefined")	return false; 
	// 백스페이스키 무시
   	if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || (event.keyCode >= 37 && event.keyCode <= 40))
      return false;
	var str = removeChar(obj.value,':');
	if (str.length == 2) {
		obj.value = str + ":";
	} else if (str.length == 3) {
		obj.value = str.substr(0, 2) + ":" + str.substr(2, 1);
	}
}
