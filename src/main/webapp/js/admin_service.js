/**
 * ADMIN service 를 위한 JS
 */

admin.service = {};

// 장애 관리를 위한 object
admin.service.trouble = {
	getTroubleList : function() {
		var instanceType = $('#selInstanceType option:selected').val();
		var solvedYn = $('#selTroubleSolvedYn option:selected').val();
		var troubleNo = $('#txtOperationTroubleNo').val();
		var instanceNo = $('#txtInstanceNo').val();
		var uuid = $('#txtUuId').val();
		var fromDate = $('#dateFrom').val();
		var toDate = $('#dateTo').val();
		var page = $('#pageNo').val();
		
		if (isNaN(troubleNo)) {
			alert("OP장애번호는 숫자가 되어야 합니다.");
			$('#txtOperationTroubleNo').focus().select();
			return;
		}
		if (isNaN(instanceNo)) {
			alert("인스턴스번호는 숫자가 되어야 합니다.");
			$('#txtInstanceNo').focus().select();
			return;
		}
		
		
		var paramString = "?page=1" + 	"&fromDate=" + fromDate 
		             	+ "&toDate=" + toDate+ "&instanceTypeCode=" + instanceType
			            + "&troubleSolvedYn=" + solvedYn+ "&operationTroubleNo=" + troubleNo
		             	+ "&uuId=" + uuid+ "&instanceNo=" + instanceNo;
//		var paramString = "?page=" +page+ "&fromDate=" + fromDate 
//		+ "&toDate=" + toDate+ "&instanceTypeCode=" + instanceType
//		+ "&troubleSolvedYn=" + solvedYn+ "&operationTroubleNo=" + troubleNo
//		+ "&uuId=" + uuid+ "&instanceNo=" + instanceNo;
		
		document.location.href = "/nap/service/trouble/list" + paramString;  
	}
};

admin.service.instance={};

admin.service.instance.server = {
		
       getList : function(){
			var searchCondition = $('#selSearchCondition option:selected').val();
			var txtSearch = $('#txtSearch').val();
			var searchConditionStatus  = $('#selSearchConditionStatus option:selected').val();
			
			if("all" != searchCondition && '' == txtSearch){
				   alert("검색조건을  입력하세요.");
				   return ;
			   }
			
			if("all" == searchCondition && '' != txtSearch){
				  alert("조회조건을  선택하세요.");
				   return ;
			}
			
			var paramString = "?page=" + $('#pageNo').val()
					          +"&searchCondition="+searchCondition
			                  +"&searchConditionStatus=" +searchConditionStatus
			                  +"&txtSearchValue="+txtSearch;		
			document.location.href = "/nap/service/instance/server/list" + paramString;   	
        }

       , getDetail: function(instanceNumber, memberNumber, computingNodeClusterNo,physicalMachineNumber){
    	   
		   var pageNo = $('#pageDetailNo').val();
		   
		   if(''==pageNo || null == pageNo){
			   pageNo = 1;
		   }
    	   		   
           var paramString =  "?page=" + pageNo 
        	                   +"&instanceNumber=" + instanceNumber
	                           +"&memberNumber="+memberNumber
	                           +"&computingNodeClusterNumber="+computingNodeClusterNo
	                           +"&physicalMachineNumber="+physicalMachineNumber;		
              document.location.href = "/nap/service/instance/server/detail" + paramString;   	
    		
       }
       

};

admin.service.instance.publicIp = {
		getList : function(){
			   var searchCondition = $('#selSearchCondition option:selected').val();
			   var txtSearch = $('#txtSearch').val();
			   var searchConditionStatus  = $('#selSearchConditionStatus option:selected').val();		
				
				if("all" != searchCondition && '' == txtSearch){
					   alert("검색조건을  입력하세요.");
					   return ;
				   }
				
				if("all" == searchCondition && '' != txtSearch){
					  alert("조회조건을  선택하세요.");
					   return ;
				}
				
			   var paramString = "?page=" + $('#pageNo').val()
						          +"&searchCondition="+searchCondition
						          +"&searchConditionStatus=" +searchConditionStatus
				                  +"&txtSearchValue="+txtSearch;	
				document.location.href = "/nap/service/instance/publicip/list" + paramString;   	
	        }

	  , getDetail: function(instanceNumber,memberNumber){	  
		   var pageNo = $('#pageDetailNo').val();
		    
		   if(''==pageNo || null == pageNo){
			   pageNo = 1;
		   }
			var paramString ="?page=" + pageNo 
		                       +"&instanceNumber="+instanceNumber
	                           +"&memberNumber="+memberNumber;	
            document.location.href = "/nap/service/instance/publicip/detail" + paramString;    
		}	  
};

admin.service.instance.loadbalance = {
		getList : function(){
			   var searchCondition = $('#selSearchCondition option:selected').val();
			   var txtSearch = $('#txtSearch').val();	
			   var searchConditionStatus  = $('#selSearchConditionStatus option:selected').val();											
									
					if("all" != searchCondition && '' == txtSearch){
						   alert("검색조건을  입력하세요.");
						   return ;
					   }
					
					if("all" == searchCondition && '' != txtSearch){
						  alert("조회조건을  선택하세요.");
						   return ;
					}
									
				var paramString = "?page=" + $('#pageNo').val()
						          +"&searchCondition="+searchCondition
						          +"&searchConditionStatus=" +searchConditionStatus
				                  +"&txtSearchValue="+txtSearch;		
				document.location.href = "/nap/service/instance/loadbalance/list" + paramString;   	
	        }

       , getDetail : function(instanceNumber,memberNumber){   				
   	    	var paramString ="?instanceNumber="+instanceNumber
                          +"&memberNumber="+memberNumber;	
           document.location.href = "/nap/service/instance/loadbalance/detail" + paramString;   	
	   
       }
};

admin.service.instance.serverImage = {
		getList : function(){
			var searchCondition = $('#selSearchCondition').val();
			var searchStateCode = $('#selSearchStateCode').val();
			var txtSearch = $.trim($('#txtSearch').val());
			
			if("all" != searchCondition && '' == txtSearch){
				   alert("검색조건을  입력하세요.");
				   return ;
			   }
			
			if("all" == searchCondition && '' != txtSearch){
				  alert("조회조건을  선택하세요.");
				   return ;
			}

			var paramString = "?page=" + $('#pageNo').val() + "&searchCondition="
							+ searchCondition + "&txtSearchValue=" + txtSearch
							+ "&searchStateCode=" + searchStateCode;
			document.location.href = "/nap/service/instance/serverImage/list"+ paramString;	
		}
		, getDetail :function(instanceNumber){
	        var pageNo = $('#pageDetailNo').val();        
			   if(''==pageNo || null == pageNo){
				   pageNo = 1;
			   }
	         var paramString = "?page=" + pageNo+"&instanceNumber=" + instanceNumber;	
	        document.location.href = "/nap/service/instance/serverImage/detail" + paramString;   
		}
};

admin.service.instance.snapshot = {
		getList : function(){
			var searchCondition = $('#selSearchCondition').val();
			var searchStateCode = $('#selSearchStateCode').val();
			var txtSearch = $.trim($('#txtSearch').val());
			
			if("all" != searchCondition && '' == txtSearch){
				   alert("검색조건을  입력하세요.");
				   return ;
			   }
			
			if("all" == searchCondition && '' != txtSearch){
				  alert("조회조건을  선택하세요.");
				   return ;
			}
			
			var paramString = "?page=" + $('#pageNo').val() + "&searchCondition="+ searchCondition +
			                   "&txtSearchValue=" + txtSearch+ "&searchStateCode=" + searchStateCode;
			document.location.href = "/nap/service/instance/snapshot/list"+ paramString;
		}
		, getDetail :function(instanceNumber){
	        var pageNo = $('#pageDetailNo').val();
			 if(''==pageNo || null == pageNo){
				   pageNo = 1;
			   }         
	         var paramString = "?page=" + pageNo+"&instanceNumber=" + instanceNumber;		
	        document.location.href = "/nap/service/instance/snapshot/detail" + paramString;   
		}
};

admin.service.instance.storage = {
		getList : function(){
			var searchCondition = $('#selSearchCondition').val();
			var searchStateCode = $('#selSearchStateCode').val();
			var txtSearch = $.trim($('#txtSearch').val());

			if("all" != searchCondition && '' == txtSearch){
				   alert("검색조건을  입력하세요.");
				   return ;
			   }
			
			if("all" == searchCondition && '' != txtSearch){
				  alert("조회조건을  선택하세요.");
				   return ;
			}
			
			var paramString = "?page=" + $('#pageNo').val() + "&searchCondition="+ searchCondition 
			                  + "&txtSearchValue=" + txtSearch+ "&searchStateCode=" + searchStateCode;
			document.location.href = "/nap/service/instance/storage/list"+ paramString;
		}

		, getDetail :function(instanceNumber){
	        var pageNo = $('#pageDetailNo').val();
			   if(''==pageNo || null == pageNo){
				   pageNo = 1;
			   }   
	         var paramString = "?page=" + pageNo 
	        	              + "&instanceNumber=" + instanceNumber;	 
	        document.location.href = "/nap/service/instance/storage/detail" + paramString;   
		}
};

admin.service.instance.portforwarding = {
		 getList : function(){
			 
			   var searchCondition = $('#selSearchCondition option:selected').val();
			   var searchCondition2 = $('#selSearchCondition2 option:selected').val();
			   var txtSearch = $('#txtSearch').val();	
			   var txtSearch2 = $('#txtSearch2').val();
			   //var searchConditionStatus  = $("input:radio[name=searchConditionStatus]:checked").val();
							
					if("all" != searchCondition && '' == txtSearch){
						   alert("검색조건1을  입력하세요.");
						   return ;
					   }
					
					if("all" == searchCondition && '' != txtSearch){
						   txtSearch = '';
					}
					
					if("all" != searchCondition2 && '' == txtSearch2){
						   alert("검색조건2을  입력하세요.");
						   return ;
					   }
					
					if("all" == searchCondition2 && '' != txtSearch2){
						   txtSearch2 = '';
					}
					
					if("memberName" == searchCondition2){
						txtSearch2 = encodeURI(encodeURIComponent(txtSearch2));
					}
					
				var paramString = "?page=" + $('#pageNo').val()
						          +"&searchCondition="+searchCondition
						          //+"&searchConditionStatus=" +searchConditionStatus
				                  +"&txtSearchValue="+txtSearch
				                  +"&searchCondition2="+searchCondition2
				                  +"&txtSearchValue2="+txtSearch2
				                  ;		
				
				//alert(paramString);
				document.location.href = "/nap/service/instance/portforwarding/list" + paramString;   	
	        }
};
