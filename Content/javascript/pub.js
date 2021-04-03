//iframe高度自适应,2015.3.18
var browserVersion = window.navigator.userAgent.toUpperCase();
function reinitIframe(iframeId) {
    try {
        var iframe = document.getElementById(iframeId);
        var bHeight = 0;
        if (browserVersion.indexOf("CHROME") == -1 && browserVersion.indexOf("SAFARI") == -1)
            bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = 0;
        if (browserVersion.indexOf("FIREFOX") != -1)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE() == false && browserVersion.indexOf("OPERA") == -1)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else
            bHeight = bHeight + 3;
        var height = Math.max(bHeight, dHeight);
        if (height < 560) height = 560;
        iframe.style.height = height + "px";
    } catch (ex) { }
}
function isIE() { if (!!window.ActiveXObject || "ActiveXObject" in window) return true; else return false; }
function startInit(iframeId) { window.setInterval("reinitIframe('" + iframeId + "')", 100); }

/*
 * 所有复选框选中
 * 参数 1、this 2、要选中的复选框name
 */
function selectAll(checkbox,name){
	if(checkbox.checked == true){
		$("input[name = "+name+"]").attr("checked","checked");
	}
	if(checkbox.checked == false){
		$("input[name = "+name+"]").attr("checked","");
	}
}


//打开窗口
function openWin(title,url, width, height,max) {
		$('#dataForm').show();
		$('#dataForm').window("open");
		var opt = {}
		opt.width = document.body.clientWidth-50;
		opt.height = document.documentElement.clientHeight-50;
		if (width) {
			opt.width = width;
		}
		if (height) {
			opt.height = height;
		}
		var l=0;
		var t=0;
		if(document.body.clientWidth>opt.width){
			l=document.body.clientWidth-opt.width;
		}
		if(document.documentElement.clientHeight>opt.height){
			t=document.documentElement.clientHeight-opt.height;
		}
		
		$('#dataForm').window('resize', opt);
		$('#dataForm').window('setTitle',title);
		if (width){
			$('#dataForm').window('move',{   
			  left:l/2,   
			  top:t/2   
			});
		}
		var link="";
		if(url.indexOf("?")>-1){
			link=url+"&rand="+Math.random();
		}else{
			link=url+"?rand="+Math.random();
		}
		document.getElementById("winSrc").src = link;
		try {
			if (formChanged) {
				formChanged = 0;
			}
		} catch (e) {
		}
}
//打开最顶层窗口
function openTopWin(title,url, width, height,max) {
	top.openWin(title,url, width, height,max);
}

//关闭窗口
function closeWin() {
	if(formChanged&&formChanged==1){
		if(window.confirm("数据有变化，是否退出？")){
			formChanged=0;
			$('#dataForm').hide();
			$('#dataForm').window("close");
		}else{
			return false;
		}
	}else{
		$('#dataForm').hide();
		$('#dataForm').window("close");
	}
}
// 展开类型选择层
function openWinDiv(id,url){ 
	var p = $("#"+id);

	var offset = p.offset();
	if(url != null){
		document.getElementById("winSrc").src = url;
	}  
	document.getElementById("dataForm").style.visibility="visible"; 
	 
	var left = offset.left;
	var top = offset.top + 28; 
	$('#dataForm').offset({top:top,left:left});
}

function disabledBtn(btnId){
	$("#"+btnId).attr("disabled", true);
	$("#"+btnId).attr("class", "btn btn_gray");
	$("#"+btnId).attr("value", "提交中...");
}
// 关闭类型选择层
function closeWinDiv(){ 
	document.getElementById("dataForm").style.visibility="hidden"; 
}
var num = 0;
// 复制html
function copyHtml(copyId,insertId){
	num = num + 1;

	var copy = $("#"+copyId).clone();
	$(copy).attr("id",copyId+"_"+num);
	$(copy).css("display","");
	copy.insertBefore('#'+insertId); 
}
// 删除html
function removeHtml(thisHtml,copyId){ 
	if($(thisHtml).attr("id") == copyId){
		return;
	} 
	$(thisHtml).remove(); 
}


function openNewWindow(title,url,height,width){ 
	window.open (url,title,'height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no') ;
}

/**
 * 隐藏查询条件
 * @param clickId
 * @param hideId
 * @return
 */
function hidSearch(clickId,hideId,showHtml,hidHtml){
	
	if($("#"+hideId).is(":hidden")){
		$("#"+hideId).show();
		$("#"+clickId).html(showHtml); 
	}else{
		$("#"+hideId).hide();
		$("#"+clickId).html(hidHtml); 
	} 
}

// 隐藏展示页面元素
function hidEelement(clickId,hideId){ 
	if($("#"+hideId).is(":hidden")){
		$("#"+hideId).show();
		$("#"+clickId).css("background","url("+getRootPath()+"/images/icon_off.png) center no-repeat"); 
	}else{
		$("#"+hideId).hide();
		$("#"+clickId).css("background","url("+getRootPath()+"/images/icon_on.png) center no-repeat");
	} 
}

// 根据url获取参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
	        return unescape(r[2]);
	    } else {
	        return "";
	    } 
}
//提示信息
function info(msg) {
	$.messager.alert('成功提示', msg, 'info');  
}
//错误信息
function error(msg) {
	$.messager.alert('错误提示', msg, 'error');
}
//浮动窗口提示信息
function show(msg) {
	$.messager.show({title:'操作提示', msg:msg, showType:'show'});
}

//通用查询
var flter
function searchload() {
	$('#commonQuery').dialog( {
		title : '查询',
		width : 450,
		height : 320,
		buttons : [ {
			text : 'Ok',
			iconCls : 'icon-ok',
			handler : function() {
				var fi = flter.toString();
				$('#dataTable').datagrid('load', {  
				    Filter: fi
				}); 
				$('#commonQuery').dialog('close');
			}
		}, {
			text : 'Cancel',
			handler : function() { 
				$('#commonQuery').dialog('close');
			}
		} ]
	});

	var opts = $('#dataTable').datagrid('options').columns[0];
	flter = new xFilter(document.getElementById("commonFilter"), {
		columns : opts,
		onchange : function() {
		}
	});
};

function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.trim=function(){  
	return this.replace(/(^\s*)|(\s*$)/g, "");  
}

Date.prototype.format = function(format){ 
var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
    if(/(y+)/.test(format)) 
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format)) 
    	
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    
    return format;
}


/*
  * 处理过长的字符串，截取并添加省略号
  * 注：半角长度为1，全角长度为2
  * 
  * pStr:字符串
  * pLen:截取长度
  * 
  * return: 截取后的字符串
  */
 function autoAddEllipsis(pStr, pLen ,rowNum) { 
	 
	 if(pStr == '' || pStr == null){
		 return pStr;
	 }
	 
	 var title = pStr;
	 var str = ''; 
	 var int = 0;
	 for (int = 0; int < rowNum; int++) {
		 
		 var _ret = cutString(pStr, pLen); 
	     var _cutFlag = _ret.cutflag; 
	     var _cutStringn = _ret.cutstring;  
	     str +=  _cutStringn; 
	     
	     pStr=pStr.replace(_cutStringn,""); 
	     if(int < (rowNum-1)){
	    	 str += '</br>';
	     }
	     
	     if(pStr.length < 1){
	    	 break;
	     }
	 }
	 
	 if(int > 0 && pStr.length > 0){
	     return str+'...' ;
	 }else{
	     return str ;
	 }
 } 
  
 /*
  * 取得指定长度的字符串
  * 注：半角长度为1，全角长度为2
  * 
  * pStr:字符串
  * pLen:截取长度
  * 
  * return: 截取后的字符串
  */
 function cutString(pStr, pLen) { 
  
     // 原字符串长度 
     var _strLen = pStr.length; 
  
     var _tmpCode; 
  
     var _cutString; 
  
     // 默认情况下，返回的字符串是原字符串的一部分 
     var _cutFlag = "1"; 
  
     var _lenCount = 0; 
  
     var _ret = false; 
  
     if (_strLen <= pLen/2) { 
         _cutString = pStr; 
         _ret = true; 
     } 
  
     if (!_ret) { 
         for (var i = 0; i < _strLen ; i++ ) { 
			 
             if (isFull(pStr.charAt(i))) { 
                 _lenCount += 2; 
             } else { 
                 _lenCount += 1; 
             } 
  
             if (_lenCount > pLen) { 
                 _cutString = pStr.substring(0, i); 
                 _ret = true; 
                 break; 
             } else if (_lenCount == pLen) { 
                 _cutString = pStr.substring(0, i + 1); 
                 _ret = true; 
                 break; 
             } 
         } 
     } 
      
     if (!_ret) { 
         _cutString = pStr; 
         _ret = true; 
     } 
  
     if (_cutString.length == _strLen) { 
         _cutFlag = "0"; 
     } 
  
     return {"cutstring":_cutString, "cutflag":_cutFlag}; 
 } 
  
 /*
  * 判断是否为全角
  * 
  * pChar:长度为1的字符串
  * return: tbtrue:全角
  *          false:半角
  */ 
 function isFull (pChar) { 
   for (var i = 0; i < pChar.length ; i++ ) { 
	   
     if ((pChar.charCodeAt(i) > 128)) {  
         return true; 
     } else {  
         return false; s
     }
	}
 }
 
 /**
  * 检查日期格式
  */
 function checkEndDate(startDateId,endDateId){
	 
	 $('#'+endDateId).datebox({
		 onSelect:function(date){ ;
		 	var startDate = $('#'+startDateId).datebox('getValue');
		 	var endDate = $('#'+endDateId).datebox('getValue');
		 	
		 	if(endDate < startDate){
		 		alert('选择日期不能早于'+startDate);
		 		$('#'+endDateId).datebox('setValue');
		 	}
	 	}
	 });  
 }
 //格式化日期为
 function formatDateText(date) {
	return date.formatDate("yyyy-MM-dd hh:mm");
}
//为date类添加一个format方法 
Date.prototype.formatDate = function (format) //author: meizz
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

//打开模态窗口,chrome 37版本以上不支持此方法
function openDialog(url,hei,wie){
	window.showModalDialog(url,window,'dialogWidth='+hei+'px;dialogHeight='+wie+'px'); 
}
function closeDialog(){
	window.close();
}
//varid select框的id   varname 隐藏域的id
function getselect(varid,varname){
	var text=document.getElementById(varid).options[document.getElementById(varid).selectedIndex].getAttribute("text");
	document.getElementById(varname).value=text;
	alert(text);
}

/**
 * 获取<f:checkbox/>和<f:radio/>的描述，多选获取的结果为','分割
 * @param name (name属性值)
 * @param hidId (隐藏域id)
 * @return (描述值，多选','分割)
 */
function getCheckAndRadio(name,hidId){
	var str=document.getElementsByName(name);
	var objarray=str.length;
	var chestr="";
	for (i=0;i<objarray;i++){ 
		if(str[i].checked == true){
			if(chestr != ""){
				chestr+=',';
			}
			chestr+=str[i].getAttribute("text");
		}
	}
	document.getElementById(hidId).value=chestr;
}
/**
 * 获取根目录
 * @returns
 */
function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
}

function showCode(){
	if(parent.getCurWin()){
		var functionId=parent.getCurWin().name;
		if(functionId){
			parent.openWin("源码",getRootPath()+"/base/tabBaseFunction.do?functionId="+functionId+"&rand="+Math.random(),850, 550);
		}
	}
}
function resetForm(formDivId){
	if(!formDivId){
		$(':input', '#searchDiv').not(':button, :submit, :reset, :hidden').val('')
		.removeAttr('checked').removeAttr('selected');
	}else{
		$(':input', '#'+formDivId).not(':button, :submit, :reset, :hidden').val('')
		.removeAttr('checked').removeAttr('selected');
	}
}

function getUserNamesByUserIds(userIds){
	jQuery.ajax({
		url : getRootPath()+"/base/getUserNamesByUserIdsBaseUser.do?userIds="+userIds, // 提交的页面
		success : function(data) {
			var object = eval('(' + data + ')');
			if (object.success) {
				return object.userNames;
			} else {
				return null;
			}
		}
	});
}
//查找iframe中的元素对象
function findIframeObject(iframeId,objId) {  
    var o = null;  
    o = $(window.frames[iframeId].document).find("#" + objId);  
    return o;  
}

//验证以,分割的多邮箱地址
function checkEmail(email)
{
	if(email==''||email==null)return true;
	var str="";
	if(email!="" && email.indexOf(",")>0)	
	{
		var arremail=email.split(",");
		for(var i=0;i <arremail.length;i++)
		{
			if(arremail[i].replace(/\s+/g,"").search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)==-1)
			{
				str=str+"邮箱"+arremail[i]+"格式错误!\n";
			}
		}
	}else
	{
		if(email.replace(/\s+/g,"").search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)==-1)
		{
			str="邮箱"+email+"格式错误!\n";
		}
	}
	if(str!="")
	{
		alert(str);
		return false;
	}else{
		return true;
	}
}


/**
 * 把form转成json对象
 */
(function($){
	$.fn.serializeJson=function(){
		var serializeObj={};
		var array=this.serializeArray();
		var str=this.serialize();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
					serializeObj[this.name].push(this.value);
				}else{
					serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
				serializeObj[this.name]=this.value;	
			}
		});
		return serializeObj;
	};
})(jQuery);

//tab切换类
function tab(o, s, cb, ev) { 
	var $ = function(o) {
		return document.getElementById(o)
	};
	var css = o.split((s || '_'));
	if (css.length != 4)
		return;
	this.event = ev || 'onclick';
	o = $(o);
	if (o) {
		this.ITEM = [];
		o.id = css[0];
		var item = o.getElementsByTagName(css[1]);
		var j = 1;
		for ( var i = 0; i < item.length; i++) {
			if (item[i].className.indexOf(css[2]) >= 0
					|| item[i].className.indexOf(css[3]) >= 0) {
				if (item[i].className == css[2])
					o['cur'] = item[i];
				item[i].callBack = cb || function() {
				};
				item[i]['css'] = css;
				item[i]['link'] = o;
				this.ITEM[j] = item[i];
				item[i]['Index'] = j++;
				item[i][this.event] = this.ACTIVE;
			}
		}
		return o;
	}
}
tab.prototype = {
	ACTIVE : function() {
		var $ = function(o) {
			return document.getElementById(o)
		};
		this['link']['cur'].className = this['css'][3];
		this.className = this['css'][2];
		try {
			$(this['link']['id'] + '_' + this['link']['cur']['Index']).style.display = 'none';
			$(this['link']['id'] + '_' + this['Index']).style.display = 'block';
		} catch (e) {
		}
		this.callBack.call(this);
		this['link']['cur'] = this;
	}
}