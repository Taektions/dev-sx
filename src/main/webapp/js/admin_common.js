/**
 * admin common 을 위한 js
 */
jQuery.ajaxSettings.traditional = true;

var admin = {};

// 공통 처리를 위한 object
admin.common = {
	isValidDate : function(date) {
		if (Object.prototype.toString.call(date) !== "[object Date]") {
			return false;
		}
		return !isNaN(date.getTime());
	}
	,isValidDateString : function(dateString) {
		var date = null;
		try {
			var splitDateArray = dateString.split("-");
			var dateArray = splitDateArray[2].split(" ");
			var timeArray = dateArray[1].split(":");
			date = new Date(splitDateArray[0], splitDateArray[1], dateArray[0], timeArray[0], timeArray[1], timeArray[2]);	
		} catch(e) {
			return false;
		}
		return admin.common.isValidDate(date);
	}
	, getDateString : function(date) {
		if (admin.common.isValidDate(date)) {
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			
			var strDate = date.getFullYear()
				+ '-' + ((month < 10) ? '0' + month : month)
				+ '-' + ((day < 10) ? '0' + day : day)
				+ ' ' + ((hours < 10) ? '0' + hours : hours)
				+ ':' + ((minutes < 10) ? '0' + minutes : minutes)
				+ ':' + ((seconds < 10) ? '0' + seconds : seconds);
			return strDate;
		}
		return null;
	}
	, getDateKorString : function(date) {
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		
		var hours = date.getHours();
		var strHours;
		if(parseInt(hours) < 12) {
			strHours = "오전 " + hours;
		} else if (hours == 12) {
			strHours = "오후 " + hours;
		} else {
			strHours = "오후 " + parseInt(hours - 12);
		}
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var minutes = date.getMinutes();
		var strDate = date.getFullYear() 
			+ '-' + ((month < 10) ? '0' + month : month) 
			+ '-' + ((day < 10) ? '0' + day : day)
			+ ' ' + strHours
			+ ':' + ((minutes < 10) ? '0' + minutes : minutes);
		return strDate;
	}
	
	// byte size 를 GB 단위로 변환한다.
	// input : byte size - type String
	,getGBSize : function(byteSize) {
		var gbSize = parseInt(byteSize, 10) / 1073741824;
		return parseInt(gbSize, 10);
	}
	// GB --> Byte 
	, setByteSize : function(gbSize) {
		return parseInt(gbSize, 10) * 1024 * 1024 * 1024;
	}
	
	
	// getByteToGBSize : byte size 를 GB 단위로 변환한다.
    // input : byte size - type String
	// return GB바이트사이즈
   , getByteToGBSize : function(size) {
	   var temp = parseInt(size,10);
  	 if(temp <= parseInt(0,10)){
  		 return parseInt(0,10);
  	 }
     var gbSize = parseInt(size, 10) / 1073741824;
     return parseInt(gbSize, 10);
    }
	
   ,  //getGBToByteSize : GB--> Byte ,GB바이트 사이즈를  BYTE사이즈로 변환해서 스트링으로 넘겨준다.
      // input : GB바이트 사이즈 
      // return: BYTE사이즈 리턴
     getGBToByteSize : function(size) {	 
    	 var temp = parseInt(size,10);
    	 if(temp <= parseInt(0,10)){
    		 return parseInt(0,10);
    	 }	 
	   return parseInt(size, 10) * 1024 * 1024 * 1024;
	 }
	
	//IP 형식인지 체크한다.
	,isValidInternetProtocol : function(str){
	 var expUrl = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	 return expUrl.test(str);
	}
	//UUID형식인지 체크한다. 
	//UUID이면 true, UUID가  아니면 false
	, isValidUuid : function(str){
		var expUrl = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		return expUrl.test(str);
	}
	//패스워드형식인지 체크한다.
	//패스워드에 한글이 들어갈수없다.
	, isValidPasswd: function(str){
		var expUrl = /^[가-힣]*$/;
		return !expUrl.test(str);
	}
	// 회원 여부 판별
	, isValidMember : function(loginId) {
		var isValid = true;
		$.ajaxSetup({ async: false });
		$.get('/nap/member/isMember'
			, {loginId : loginId}
			, function(json) {
				if (json.errorTitle != undefined) {
					alert(json.errorTitle + ", " + json.errorMsg);
					isValid = false;
					return;
				}
				if (json.isMember != true) {
					isValid = false;
				}
			}
		);
		$.ajaxSetup({ async: true });
		return isValid;
	}
	// form 에 input box 하나가 있을때 form 이 submit 을 먹지 않게 하기 위한 스크립트
	, captureReturnKey : function(e) {
		if(e.keyCode == 13 && e.srcElement.type != 'textarea') {
			return false; 
		}
	}
	// 달력 모니터링용 날짜 표시 스트링 변환
	, toMonitoringDateString : function(date) {
		if (date.constructor != Date) {
			return "";
		}
		
		var thisMonth = date.getMonth() + 1;
		var thisDay = date.getDate();
		var thisHour = date.getHours();
		var thisMinute = date.getMinutes();
		
		return date.getFullYear().toString()
			+ ((thisMonth < 10) ? '0' + thisMonth : thisMonth) 
			+ ((thisDay < 10) ? '0' + thisDay : thisDay)
			+ ((thisHour < 10) ? "0" + thisHour : thisHour)
			+ ((thisMinute < 10) ? "0" + thisMinute : thisMinute)
			;
	} 
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};