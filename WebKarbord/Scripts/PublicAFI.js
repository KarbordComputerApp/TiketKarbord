﻿var server = localStorage.getItem('ApiAddress');
var ace = localStorage.getItem('ace');
var sal = localStorage.getItem('sal');
var group = localStorage.getItem('group');
var aceErj = 'Web2';
var salErj = '0000';

var userName = localStorage.getItem('userName');
var pass = localStorage.getItem('password');

Master_ProgName = localStorage.getItem('Master_ProgName');

//if (Master_ProgName == 'AFI1') Master_ProgName = 'Afi1';
//if (Master_ProgName == 'ACC5') Master_ProgName = 'Acc5';
//if (Master_ProgName == 'FCT5') Master_ProgName = 'Fct5';
//if (Master_ProgName == 'INV5') Master_ProgName = 'Inv5';
//if (Master_ProgName == 'ERJ1') Master_ProgName = 'Erj1';


var key_F1 = 112;
var key_F2 = 113;
var key_F3 = 114;
var key_F4 = 115;
var key_F5 = 116;
var key_F6 = 117;
var key_F7 = 118;
var key_F8 = 119;
var key_F9 = 120;
var key_F10 = 121;
var key_F11 = 122;
var key_F12 = 123;

var key_Space = 32;
var key_BackSpace = 8;
var key_Enter = 13;

var key_a = 97;
var key_b = 98;


text_Add = 'جدید';
text_Update = 'ویرایش';
text_Delete = 'حذف';
text_SettingColumn = 'تنظیم ستون ها';
text_Refresh = 'به روز رسانی';
text_Select = 'انتخاب';
text_OtherField = 'مشخصات اضافی';
text_LinkSanad = 'لینک اسناد';
text_Date = 'انتخاب تاریخ';

//data-bind="attr: {title:text_Date}"

text_FirstPage = 'اولین';
text_PreviousPage = 'قبلی';
text_NextPage = 'بعدی';
text_LastPage = 'آخرین';

text_Close = 'بستن';
//text_ = 'aaa';


Fct_or_Inv = localStorage.getItem('Fct_or_Inv');

$("#AccessRefresh").hide();
//$("#AddNewSanad_New").hide();

if (sessionStorage.versionTitle == "ورژن تست") {
    $("#AccessRefresh").show();
    // $("#AddNewSanad_New").show();

}

if (ace == 'Web8') {
    $("#VerDllCheck").text(
        'ACC6 ' + localStorage.getItem('VerDllCheckAcc6') + ' - ' +
        'FCT6 ' + localStorage.getItem('VerDllCheckFct6') + ' - ' +
        'Inv6 ' + localStorage.getItem('VerDllCheckInv6')
    );
}
else if (ace == 'Web1') {
    $("#VerDllCheck").text('Afi2 ' + localStorage.getItem('VerDllCheckAfi2'));
}


var tiketUrl = 'http://localhost:51091/';
//var tiketUrl = 'http://192.168.0.114:903/';

sessionStorage.userNameFa = localStorage.getItem('userNameFa');
sessionStorage.CoName = localStorage.getItem('CoName');
sessionStorage.aceName = localStorage.getItem('aceName');
sessionStorage.userName = userName;
sessionStorage.pass = pass;
var serverAccount = localStorage.getItem('serverAccount');

//sessionStorage.ModeCode = localStorage.getItem("ModeCode");



function showLoad() {

}

function ajaxFunction(uri, method, data, sync, error) {

    //$('#loading-image').show();
    var userNameAccount = localStorage.getItem("userNameAccount");
    var passAccount = localStorage.getItem("passAccount");

    return $.ajax({
        type: method,
        async: sync == null ? false : sync,
        encoding: 'UTF-8',
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },
        url: uri,//+ '/' + userNameAccount + '/' + passAccount,
        dataType: 'json',

        cache: false,
        timeout: 300000,
        onLoading: showLoad(),
        headers: {
            'userName': userNameAccount,
            'password': passAccount,
            'userKarbord': sessionStorage.userName,
            'device': "Web"
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        //async: true,
        //crossDomain: true,
        //cache: false,
        contentType: 'application/json',
        //contentType: 'application/x-www-form-urlencoded',
        // xhrFields: { withCredentials: true },
        data: data ? JSON.stringify(data) : null
        //data: data ? data : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        error != false ?
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
        // Swal.fire({ type: 'danger', title: 'اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید', text: errorThrown });
    });
}


function ajaxFunctionAccount(uri, method, sync, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },
        cache: false,
        timeout: 30000,
        complete: function () {
            if (sync == true) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}


function ajaxFunctionOther(uri, method, data) {

    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 30000,
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}


function ajaxFunctionUpload(uri, data, sync) {

    var userNameAccount = localStorage.getItem("userNameAccount");
    var passAccount = localStorage.getItem("passAccount");
    return $.ajax({
        url: uri,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,

        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },

        headers: {
            'userName': userNameAccount,
            'password': passAccount,
            'userKarbord': sessionStorage.userName,
            'device': 'Web',
        },
        success: function (fileName) {
            // $("#fileProgress").hide();
            // $("#lblMessage").html("<b>" + fileName + "</b> has been uploaded.");
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        xhr: function () {
            var fileXhr = $.ajaxSettings.xhr();
            if (fileXhr.upload) {
                $("progress").show();
                fileXhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        $("#fileProgress").attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                }, false);
            }
            return fileXhr;
        }
    });
}




var DictionaryUri = server + '/api/Web_Data/Web_Dictionary/'; // آدرس  دیکشنری

//localStorage.removeItem('dict');
var dict = localStorage.getItem('dict');
if (dict != null)
    dict = JSON.parse(dict);
else {
    ajaxFunction(DictionaryUri, 'GET', false).done(function (data) {
        a = '{\"en\":{';
        for (var i = 0; i < data.length; i++) {
            a += '"' + data[i].Fa + '": "' + data[i].En + '",';
        }
        a += '"":""'
        a += "},"
        a += '\"ar\": { }}';
        localStorage.setItem('dict', a);
        dict = JSON.parse(a);
    });
}



/*
var dict =
{
    en: {
        'تنظیمات نرم افزار': 'Program Setting',
        'نرم افزار سیستم جامع': 'Comprehensive system software',
        'نرم افزار مالی بازرگانی': 'Commercial financial software',
        '': '',
        '': '',
        '': 'ترجمه نشده',
    },
    ar: {}
}


*/
var ModeInsertSanad = localStorage.getItem('ModeInsertSanad');

if (ModeInsertSanad == "New") {
    $("#ModeInsertSanad").val(0);
}
else {
    $("#ModeInsertSanad").val(1);
}


$("#ModeInsertSanad").change(function () {
    if ($('#ModeInsertSanad').val() == 0) {
        localStorage.setItem("ModeInsertSanad", "New");
    }
    else {
        localStorage.setItem("ModeInsertSanad", "Old");
    }
});


var lang = 'en';
var dir_lang = 'ltr'





var DefultLang = localStorage.getItem('DefultLang');

if (DefultLang == "en") {
    $("#SelectLang").val(1);
    lang = 'en';
    dir_lang = 'ltr';
}
else {
    $("#SelectLang").val(0);
    lang = 'fa';
    dir_lang = 'rtl';
}

var lastSelectLang = $('#SelectLang').val();
$("#SelectLang").change(function () {

    multilang = localStorage.getItem('multilang');
    if (multilang != 'true') {
        $('#SelectLang').val(lastSelectLang);
        return showNotification('دسترسی ندارید', 0);
    }

    if ($('#SelectLang').val() == 1) {
        localStorage.setItem("DefultLang", "en");
    }
    else {
        localStorage.setItem("DefultLang", "fa");
    }
    location.reload();
});



//lang = 'fa';

//dir_lang = 'rtl';

function translate(text) {
    if (lang == 'fa' || lang == null || dict == null)
        return text
    else {
        dic = dict[lang][text];
        if (dic == null) {
            return '! ' + text + ' !';
        }
        else
            return dic;
    }
}

function TranslateData(data) {
    if (lang == 'fa')
        return data
    else {
        var tempData = data;
        for (var i = 0; i < data.length; i++) {
            if (tempData[i].Translate == 1) {
                trans = dict[lang][tempData[i].Name];
                if (trans != null)
                    tempData[i].Name = trans;
                else
                    tempData[i].Name = '!! ' + tempData[i].Name + ' !!';
            }
        }
        return tempData;
    }
}

var mes_Refresh = translate('تایید به روز رسانی');
var mes_Delete = translate('تایید حذف');
var text_Yes = translate('بله');
var text_No = translate('خیر');



if (lang == 'en') {
    $("body").addClass("right-to-left");
    $(".date").addClass("right-to-left");
    $("body").removeClass("rtlSite");

    $(".sidebar").css({ left: 0 });
    $(".navbar-header").css({ float: "left" });
    $(".navbar-header").css({ "border-top-left-radius": 0 });
    $(".navbar-header").css({ "border-top-right-radius": "50px" });


    $("#leftsidebar").css({ "border-bottom-left-radius": "0px" });
    $("#leftsidebar").css({ "border-bottom-right-radius": "50px" });


    $(".sidemenu-collapse").css({ "padding-left": "44px" });
    $(".sidemenu-collapse").css({ "padding-right": "20px" });


    $("#navbar_Buttom").removeClass("pull-right");
    $("#navbar_Buttom").addClass("pull-left");

    $("#navbar_Menu").removeClass("navbar-right");
    $("#navbar_Menu").addClass("navbar-left");

    $("#content").removeClass("content");
    $("#content").addClass("contentltr");

    $(".form-control").addClass("right-to-left");

    $(".form-label").css({ "left": "0px" });

    $(".menu-toggle").addClass("menu-toggleltr");

    $(".useBlank").css({ "padding-left": "50px" });
    $(".useBlank").css({ "padding-right": "9px" });
    $(".useBlank").css({ "font-family": "Merriweather-Light" });
    $("button").css({ "font-family": "Merriweather-Light" });


    $("button").removeClass("pull-left");
    $("button").addClass("pull-right");

    $(".panel_AllSettingColumns").css({ "direction": "rtl" });


    $("#buttom-header-dropdown").css({ "left": "unset", "right": "15px" });
    $("#refreshKala img").css({ "margin-right": "10px" });
    $("#refreshAcc img").css({ "margin-right": "10px" });
    $("#refreshCust img").css({ "margin-right": "10px" });
    $("#refreshADocH img").css({ "margin-right": "10px" });
    $("#refreshFDocH img").css({ "margin-right": "10px" });
    $("#refreshErjDocH img").css({ "margin-right": "10px" });
    $("#refreshIdocH img").css({ "margin-right": "10px" });
    // $("#buttom-footer-grid-arrow").css({ "direction": "rtl" });

    $(".nextPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-back.png");
    $(".previousPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-next.png");
    $(".lastPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-first.png");

    $(".firstPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-last.png");

    $("#logoMenu").attr("src", "/Content/img/Logo_En.jpg");
    $("#LogoLogin").attr("src", "/Content/img/Login/LogoLogin_En.png");

    /* if ($('img[src="/Content/img/list/streamline-icon-navigation-first.png"]').length > 0) {
        $('img[src="/Content/img/list/streamline-icon-navigation-first.png"]').attr("src", "temp1001");
    }

    if ($('img[src="/Content/img/list/streamline-icon-navigation-last.png"]').length > 0) {
        $('img[src="/Content/img/list/streamline-icon-navigation-last.png"]').attr("src", "temp1002");
    }

    if ($('img[src="/Content/img/list/streamline-icon-navigation-back.png"]').length > 0) {
        $('img[src="/Content/img/list/streamline-icon-navigation-back.png"]').attr("src", "temp1003");
    }
    if ($('img[src="/Content/img/list/streamline-icon-navigation-next.png"]').length > 0) {
        $('img[src="/Content/img/list/streamline-icon-navigation-next.png"]').attr("src", "temp1004");
    }
    */



    $("#footer-grid-rowcount").removeClass("pull-left");
    $("#footer-grid-rowcount").css({ "float": "right" });


    $(".panel_Arrow").css({ "text-align": "right" });
    $(".panel_CountRecord").css({ "text-align": "right" });

    $(".panel_CountRecord_Sanad").addClass("pull-right");


    $(".tableFix").addClass("tableFixltr");
    $(".tableFix").removeClass("tableFix");

    $("select").css({ "font-family": "Merriweather-Light" });

    $("#titleVerNumber").css({ "font-family": "Merriweather-Light" });
    $("#titleVer").css({ "font-family": "Merriweather-Light" });
    $("span").css({ "font-family": "Merriweather-Light" });
    $(".dropdown-menu").addClass("dropdown-menultr");
    // $(".dropdown-menu").removeClass("dropdown-menu");
    $(".popover mds-bootstrap-persian-datetime-picker-popover fade show bs-popover-top").css({ "font-family": "Merriweather-Light" });


}
else {
    $(".panel_CountRecord_Sanad").addClass("pull-left");
}



//localStorage.setItem("NewTab", "ShowNewTab");
var ShowNewTab = localStorage.getItem('NewTab');

if (ShowNewTab == "ShowNewTab") {
    $("#NewTab").val(1);
    $('.useBlank').attr('target', '_blank');
}
else {
    $("#NewTab").val(0);
    $('.useBlank').attr('target', '_self');
}


$("#NewTab").change(function () {

    if ($('#NewTab').val() == 1) {
        localStorage.setItem("NewTab", "ShowNewTab");
        $('.useBlank').attr('target', '_blank');
    }
    else {
        localStorage.setItem("NewTab", "NotShowNewTab");
        $('.useBlank').attr('target', '_self');
    }
});





href = window.location.href;
sp = href.split('/');
hrefHome = '/' + sp[3] + '/' + sp[4];
hrefSetting = '/' + sp[3] + '/' + sp[4];



if (ShowNewTab == "ShowNewTab" && (hrefHome != localStorage.getItem("urlIndex") && hrefSetting != localStorage.getItem("urlSetting"))) {
    $("#P_Setting").css({ display: "none" });
    $("#P_Home").css({ display: "none" });
    $("body").addClass("side-closed");
    $("body").addClass("submenu-closed");
    $(".sidebar-user-panel").css({ display: "none" });
}
else {
    $("#P_Setting").css({ display: "block" });
    $("#P_Home").css({ display: "block" });
    $("body").removeClass("side-closed");
    $("body").removeClass("submenu-closed");
    $(".sidebar-user-panel").css({ display: "block" });
}


if (ShowNewTab == "ShowNewTab" && hrefHome == localStorage.getItem("urlIndex")) {
    $("#P_Home").css({ display: "none" });
}

if (ShowNewTab == "ShowNewTab" && hrefSetting == localStorage.getItem("urlSetting")) {
    $("#P_Setting").css({ display: "none" });
}




















sessionStorage.CoName = localStorage.getItem("CoName");

sessionStorage.BeginDateAcc = localStorage.getItem("BeginDateAcc");
sessionStorage.BeginDateFct = localStorage.getItem("BeginDateFct");
sessionStorage.BeginDateInv = localStorage.getItem("BeginDateInv");
sessionStorage.EndDateAcc = localStorage.getItem("EndDateAcc");
sessionStorage.EndDateFct = localStorage.getItem("EndDateFct");
sessionStorage.EndDateInv = localStorage.getItem("EndDateInv");

sessionStorage.DeghatAcc = localStorage.getItem("DeghatAcc");
sessionStorage.DeghatFct = localStorage.getItem("DeghatFct");
sessionStorage.DeghatInv = localStorage.getItem("DeghatInv");

sessionStorage.InvDefult = localStorage.getItem("InvDefult");
sessionStorage.GPriceDefultS = localStorage.getItem("GPriceDefultS");
sessionStorage.GPriceDefultP = localStorage.getItem("GPriceDefultP");
sessionStorage.GPriceDefultI = localStorage.getItem("GPriceDefultI");


sessionStorage.ADOC_TestZeroPrice = localStorage.getItem("ADOC_TestZeroPrice");
sessionStorage.ADOC_TestTraf = localStorage.getItem("ADOC_TestTraf");
sessionStorage.ADOC_TestCheck = localStorage.getItem("ADOC_TestCheck");

sessionStorage.FDOCSO_TestCust = localStorage.getItem("FDOCSO_TestCust");
sessionStorage.FDOCSP_TestCust = localStorage.getItem("FDOCSP_TestCust");
sessionStorage.FDOCS_TestCust = localStorage.getItem("FDOCS_TestCust");
sessionStorage.FDOCSR_TestCust = localStorage.getItem("FDOCSR_TestCust");
sessionStorage.FDOCSH_TestCust = localStorage.getItem("FDOCSH_TestCust");
sessionStorage.FDOCSE_TestCust = localStorage.getItem("FDOCSE_TestCust");
sessionStorage.FDOCPO_TestCust = localStorage.getItem("FDOCPO_TestCust");
sessionStorage.FDOCPP_TestCust = localStorage.getItem("FDOCPP_TestCust");
sessionStorage.FDOCP_TestCust = localStorage.getItem("FDOCP_TestCust");
sessionStorage.FDOCPR_TestCust = localStorage.getItem("FDOCPR_TestCust");

sessionStorage.FDOCSO_TestZeroAmount = localStorage.getItem("FDOCSO_TestZeroAmount");
sessionStorage.FDOCSP_TestZeroAmount = localStorage.getItem("FDOCSP_TestZeroAmount");
sessionStorage.FDOCS_TestZeroAmount = localStorage.getItem("FDOCS_TestZeroAmount");
sessionStorage.FDOCSR_TestZeroAmount = localStorage.getItem("FDOCSR_TestZeroAmount");
sessionStorage.FDOCSH_TestZeroAmount = localStorage.getItem("FDOCSH_TestZeroAmount");
sessionStorage.FDOCSE_TestZeroAmount = localStorage.getItem("FDOCSE_TestZeroAmount");
sessionStorage.FDOCPO_TestZeroAmount = localStorage.getItem("FDOCPO_TestZeroAmount");
sessionStorage.FDOCPP_TestZeroAmount = localStorage.getItem("FDOCPP_TestZeroAmount");
sessionStorage.FDOCP_TestZeroAmount = localStorage.getItem("FDOCP_TestZeroAmount");
sessionStorage.FDOCPR_TestZeroAmount = localStorage.getItem("FDOCPR_TestZeroAmount");

sessionStorage.FDOCSO_TestZeroPrice = localStorage.getItem("FDOCSO_TestZeroPrice");
sessionStorage.FDOCSP_TestZeroPrice = localStorage.getItem("FDOCSP_TestZeroPrice");
sessionStorage.FDOCS_TestZeroPrice = localStorage.getItem("FDOCS_TestZeroPrice");
sessionStorage.FDOCSR_TestZeroPrice = localStorage.getItem("FDOCSR_TestZeroPrice");
sessionStorage.FDOCSH_TestZeroPrice = localStorage.getItem("FDOCSH_TestZeroPrice");
sessionStorage.FDOCSE_TestZeroPrice = localStorage.getItem("FDOCSE_TestZeroPrice");
sessionStorage.FDOCPO_TestZeroPrice = localStorage.getItem("FDOCPO_TestZeroPrice");
sessionStorage.FDOCPP_TestZeroPrice = localStorage.getItem("FDOCPP_TestZeroPrice");
sessionStorage.FDOCP_TestZeroPrice = localStorage.getItem("FDOCP_TestZeroPrice");
sessionStorage.FDOCPR_TestZeroPrice = localStorage.getItem("FDOCPR_TestZeroPrice");

sessionStorage.FDOCSO_TestInv = localStorage.getItem("FDOCSO_TestInv");
sessionStorage.FDOCSP_TestInv = localStorage.getItem("FDOCSP_TestInv");
sessionStorage.FDOCS_TestInv = localStorage.getItem("FDOCS_TestInv");
sessionStorage.FDOCSR_TestInv = localStorage.getItem("FDOCSR_TestInv");
sessionStorage.FDOCSH_TestInv = localStorage.getItem("FDOCSH_TestInv");
sessionStorage.FDOCSE_TestInv = localStorage.getItem("FDOCSE_TestInv");
sessionStorage.FDOCPO_TestInv = localStorage.getItem("FDOCPO_TestInv");
sessionStorage.FDOCPP_TestInv = localStorage.getItem("FDOCPP_TestInv");
sessionStorage.FDOCP_TestInv = localStorage.getItem("FDOCP_TestInv");
sessionStorage.FDOCPR_TestInv = localStorage.getItem("FDOCPR_TestInv");


sessionStorage.IDOCI_TestThvl = localStorage.getItem("IDOCI_TestThvl");
sessionStorage.IDOCO_TestThvl = localStorage.getItem("IDOCO_TestThvl");

sessionStorage.IDOCI_TestZeroAmount = localStorage.getItem("IDOCI_TestZeroAmount");
sessionStorage.IDOCO_TestZeroAmount = localStorage.getItem("IDOCO_TestZeroAmount");

sessionStorage.AllInvSameNo = localStorage.getItem("AllInvSameNo");

sessionStorage.IDOCIAmountAfterBarCode = localStorage.getItem("IDOCIAmountAfterBarCode");
sessionStorage.IDOCOAmountAfterBarCode = localStorage.getItem("IDOCOAmountAfterBarCode");

sessionStorage.FDOCSOAmountAfterBarCode = localStorage.getItem("FDOCSOAmountAfterBarCode");
sessionStorage.FDOCSPAmountAfterBarCode = localStorage.getItem("FDOCSPAmountAfterBarCode");
sessionStorage.FDOCSAmountAfterBarCode = localStorage.getItem("FDOCSAmountAfterBarCode");
sessionStorage.FDOCSRAmountAfterBarCode = localStorage.getItem("FDOCSRAmountAfterBarCode");
sessionStorage.FDOCSHAmountAfterBarCode = localStorage.getItem("FDOCSHAmountAfterBarCode");
sessionStorage.FDOCSEAmountAfterBarCode = localStorage.getItem("FDOCSEAmountAfterBarCode");
sessionStorage.FDOCPOAmountAfterBarCode = localStorage.getItem("FDOCPOAmountAfterBarCode");
sessionStorage.FDOCPPAmountAfterBarCode = localStorage.getItem("FDOCPPAmountAfterBarCode");
sessionStorage.FDOCPAmountAfterBarCode = localStorage.getItem("FDOCPAmountAfterBarCode");
sessionStorage.FDOCPRAmountAfterBarCode = localStorage.getItem("FDOCPRAmountAfterBarCode");


if (ace == 'Web8') {
    sessionStorage.Move_SCONT = localStorage.getItem("Move_SCONT");
    sessionStorage.Move_SORD = localStorage.getItem("Move_SORD");
    sessionStorage.Move_SPFCT = localStorage.getItem("Move_SPFCT");
    sessionStorage.Move_SFCT = localStorage.getItem("Move_SFCT");
    sessionStorage.Move_SRFCT = localStorage.getItem("Move_SRFCT");
    sessionStorage.Move_SHVL = localStorage.getItem("Move_SHVL");
    sessionStorage.Move_SEXT = localStorage.getItem("Move_SEXT");
    sessionStorage.Move_PCONT = localStorage.getItem("Move_PCONT");
    sessionStorage.Move_PORD = localStorage.getItem("Move_PORD");
    sessionStorage.Move_PPFCT = localStorage.getItem("Move_PPFCT");
    sessionStorage.Move_PFCT = localStorage.getItem("Move_PFCT");
    sessionStorage.Move_PRFCT = localStorage.getItem("Move_PRFCT");
}
else {
    sessionStorage.Move_SPFCT = localStorage.getItem("Move_SPFCT");
    sessionStorage.Move_SFCT = localStorage.getItem("Move_SFCT");
    sessionStorage.Move_SRFCT = localStorage.getItem("Move_SRFCT");
    sessionStorage.Move_PPFCT = localStorage.getItem("Move_PPFCT");
    sessionStorage.Move_PFCT = localStorage.getItem("Move_PFCT");
    sessionStorage.Move_PRFCT = localStorage.getItem("Move_PRFCT");
}









$('#TextUserName').text(sessionStorage.userName);
var access = JSON.parse(localStorage.getItem('Access'));
var accessReport = JSON.parse(localStorage.getItem("AccessReport"));

var accessErj = JSON.parse(localStorage.getItem("AccessErj"));
var accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));

var salMaliList = JSON.parse(localStorage.getItem("SalMaliList"));

var lockNumber = localStorage.getItem("lockNumber");

const MODECODE_ADOC_A = 1;
const MODECODE_ADOC_EFT = 2;
const MODECODE_ADOC_EKH = 3;
const MODECODE_ADOC_SODZYN = 4;

const Web1 = 'Web1';
const Web8 = 'Web8';

const titlePrice = ' ریال ';

var listFilter;

var colorRadif = '#d9d9d9';

var ListColumns;

var printName;
var printPublic;
var printVariable = "";
var resTestSavePrintForm = "";






var ParamUri = server + '/api/Web_Data/Param/'; // آدرس پارامتر
var ChangeDatabaseUri = server + '/api/Web_Data/ChangeDatabase/'; // آدرس بازسازی اطلاعات
var ChangeDatabaseConfigUri = server + '/api/Web_Data/ChangeDatabaseConfig'; // آدرس بازسازی اطلاعات کانفیگ
var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
var AccessUri = server + '/api/Web_Data/AccessUser/'; // آدرس سطح دسترسی
var AccessReportUri = server + '/api/Web_Data/AccessUserReport/'; // آدرس سطح دسترسی گزارشات
var AccessReportErjUri = server + '/api/Web_Data/AccessUserReportErj/'; // آدرس سطح دسترسی گزارشات
var CountTableUri = server + '/api/Web_Data/CountTable/'; // تعداد رکورد ها 
var RprtColsSaveUri = server + '/api/Web_Data/RprtColsSave/'; // آدرس ذخیره ستون ها 

var LogOutUri = server + '/api/Web_Data/LogOut'; // خروج کاربر
var LoginTestUri = server + '/api/Web_Data/LoginTest'; // تست ورود کاربر


var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
var RprtColsDefultUri = server + '/api/Web_Data/RprtColsDefult/'; // آدرس مشخصات ستون های پیش فرض

var PrintFormsUri = server + '/api/Web_Data/PrintForms/'; // آدرس فرم های چاپ
var DeletePrintFormUri = server + '/api/Web_Data/DeletePrintForm/'; // آدرس حذف فرم های چاپ
var SavePrintFormUri = server + '/api/Web_Data/SavePrintForm/'; // آدرس ذخیره فرم های چاپ
var TestSavePrintFormUri = server + '/api/Web_Data/TestSavePrintForm/'; // آدرس تست ذخیره فرم های چاپ
var SelectedPrintFormUri = server + '/api/Web_Data/SelectedPrintForm/'; // آدرس انتخاب فرم چاپ
var SelectedAccessGhimatPrintFormUri = server + '/api/Web_Data/SelectedAccessGhimatPrintForm/'; // آدرس دسترسی قیمت فرم چاپ

var MessageUri = serverAccount + 'Account/Messages/'; // آدرس پیام ها

var DateUri = server + '/api/Web_Data/Date/'; // آدرس  تاریخ سرور

var StatementsSaveUri = server + '/api/Web_Data/SaveStatements'; // آدرس  ذخیره عبارات تعریف شده

var V_Del_ADocUri = server + '/api/Web_Data/V_Del_ADoc/'; //  آدرس حذف سند کنترل 

var LogXUri = server + '/api/Web_Data/LogX/'; //  آدرس لاگ 






/*
var source = ["Apples", "Oranges", "Bananas"];
$(function () {
    $("#auto").autocomplete({
        source: function (request, response) {
            var result = $.ui.autocomplete.filter(source, request.term);
            $("#add").toggle($.inArray(request.term, result) < 0);
            response(result);
        }
    });

    $("#add").on("click", function () {
        source.push($("#auto").val());
        $(this).hide();
    });
});
*/

var Statements = localStorage.getItem('StatementsList');

if (Statements != '' && Statements != null) {
    Statements = Statements.split(',');
}

$(".autocomplete").autocomplete({
    source: Statements
});


var currentMousePos = { x: -1, y: -1 };

$(document).mousemove(function (event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

var id_Autocomplete;
$(".autocomplete").select(function () {
    /*var rect = e.target.getBoundingClientRect();
       var x = e.clientX - rect.left; //x position within the element.
       var y = e.clientY - rect.top;*/
    // var parentOffset = $(this).parent().offset();
    //or $(this).offset(); if you really just want the current element's offset
    //var relX = e.pageX - parentOffset.left;
    // var relY = e.pageY - parentOffset.top;

    id_Autocomplete = this.id;

    //var parentOffset = $(this).parent().position();
    // var parentOffset = $("#" + id_Autocomplete).parent().offset();

    $("#p_Statement").css({ top: currentMousePos.y - 10, left: currentMousePos.x - 70 });
    // $("#p_Statement").show();



    //var offset = $("#" + id_Autocomplete).position();
    //$("#saveStatement").css({ top: offset.top, left: offset.left });
    //$("#saveStatement").show();
    //getSelectedText();
});


$(".autocomplete").click(function () {
    $("#p_Statement").hide();
});

/*
$(".autocomplete").focusout(function () {
    $("#saveStatement").hide();
});
*/




$("#saveStatement").on("click", function () {
    //val = $(".autocomplete").val();
    val = $("#" + id_Autocomplete).val();
    var StatementsList = localStorage.getItem('StatementsList');
    if (StatementsList.search(val) == -1) {

        SaveStatementsDatabase(val);
        StatementsList += ',' + val;
        localStorage.setItem('StatementsList', StatementsList);
        Statements.push(val);

        /*Statement_ListNew = localStorage.getItem('Statement_ListNew');
        if (Statement_ListNew == null) {
            Statement_ListNew = val;
        }
        else {
            Statement_ListNew += ',' + val;
        }
        localStorage.setItem('Statement_ListNew', Statement_ListNew);*/

    }
    $("#p_Statement").hide();
});


$("#refreshStatement").on("click", function () {

    Statements = [];
    temp = '';
    ajaxFunction(server + '/api/Web_Data/Statements', 'GET', true).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            Statements.push(data[i].Name);
            if (i < data.length - 1)
                temp += data[i].Name + ',';
            else
                temp += data[i].Name;
        }
    });
    localStorage.setItem('StatementsList', temp);

    //Statements = localStorage.getItem('StatementsList');

    //if (Statements != '') {
    //    Statements = Statements.split(',');
    //}
    //localStorage.removeItem('Statement_ListNew');
    $("#p_Statement").hide();
    showNotification(translate('برای اعمال تغییرات مرورگر را رفرش کنید'), 1)
});



function SaveStatementsDatabase(comm) {

    /*Statement_ListNew = localStorage.getItem('Statement_ListNew');
    if (Statement_ListNew != null) {
        var obj = [];
        data = Statement_ListNew.split(',');

        for (i = 0; i < data.length; i++) {
            temp = {
                'Comm': data[i],
            };
            obj.push(temp);
        }

        ajaxFunction(StatementsSaveUri, 'POST', obj).done(function (response) {
            localStorage.removeItem('Statement_ListNew');
        });
    }*/




    if (comm != "" && comm != "null") {
        obj = {
            'Comm': comm,
        };

        ajaxFunction(StatementsSaveUri, 'POST', obj).done(function (response) {
            localStorage.removeItem('Statement_ListNew');
        });
    }
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}



var MachineId = localStorage.getItem("MachineIdKarbord");
if (MachineId == null || MachineId == '') {
    var d = new Date();
    id = d.getDate() + d.getTime();
    localStorage.setItem("MachineIdKarbord", id);
}



ParamList = ko.observableArray([]); // پارامتر ها
DatabseSalList = ko.observableArray([]); // دیتابیس های سال
AccessList = ko.observableArray([]); // سطح دسترسی
AccessListReport = ko.observableArray([]); // سطح دسترسی گزارشات

PrintFormsList = ko.observableArray([]); // لیست چاپ 
PosList = ko.observableArray([]); // لیست دستگاه کارتخوان 

MessageList = ko.observableArray([]);





$("#Btn_ShowMessage").click(function () {
    if ((lockNumber != '' || lockNumber != null) && sessionStorage.Login == "OK") {
        getMessageList();
    }
});

//Get Message List
function getMessageList() {
    ajaxFunction(MessageUri + lockNumber, 'GET').done(function (data) {
        MessageList(data);
    });
}


selectMessage = function (item) {
    $('#titleMessage').text(item.title);
    $('#bodyMessage').val(item.body);
    $('#modal-Message').modal('show');
}


/*
var DateNow;
var SalNow;
//Get Date List
function getDateServer() {
    var date;
    if (server != null) {

        ajaxFunction(DateUri, 'GET', true, true).done(function (data) {
            listDate = data[0].split("/");
            DateNow = data[0];
            SalNow = listDate[0];
        });
    }
}

getDateServer();

*/

//Get kala List
/*function getKalaList() {
    var KalaObject = {
        withimage: false,
        updatedate: null,
        Mode: 2,
        UserCode: sessionStorage.userName,
    }
    ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject).done(function (data) {
        self.KalaList(data);
    });
}*/


$('#userNameFa').text(sessionStorage.userNameFa);
$('#userNameHome').text(sessionStorage.userNameFa + ' ');

$('#coName_TitleMenu').val(sessionStorage.CoName);
$('#ace_TitleMenu').val(sessionStorage.aceName);
$('#group_TitleMenu').val(group == "0" ? translate('انتخاب نشده') : group);
$('#sal_TitleMenu').val(sal == "0" ? translate('انتخاب نشده') : sal);



if (ace == 'Web1') {
    sessionStorage.MODECODE_FDOC_SO = 0;
    sessionStorage.MODECODE_FDOC_SP = 51;
    sessionStorage.MODECODE_FDOC_S = 52;
    sessionStorage.MODECODE_FDOC_SR = 53;
    sessionStorage.MODECODE_FDOC_SH = 0;
    sessionStorage.MODECODE_FDOC_SE = 0;
    sessionStorage.MODECODE_FDOC_PO = 0;
    sessionStorage.MODECODE_FDOC_PP = 54;
    sessionStorage.MODECODE_FDOC_P = 55;
    sessionStorage.MODECODE_FDOC_PR = 56;
    $('#FDOC_SO').attr('hidden', '');
    $('#FDOC_SH').attr('hidden', '');
    $('#FDOC_SE').attr('hidden', '');
    $('#FDOC_PO').attr('hidden', '');
} else {
    sessionStorage.MODECODE_FDOC_SO = 'SORD';
    sessionStorage.MODECODE_FDOC_SP = 'SPFCT';
    sessionStorage.MODECODE_FDOC_S = 'SFCT';
    sessionStorage.MODECODE_FDOC_SR = 'SRFCT';
    sessionStorage.MODECODE_FDOC_SH = 'SHVL';
    sessionStorage.MODECODE_FDOC_SE = 'SEXT';
    sessionStorage.MODECODE_FDOC_PO = 'PORD';
    sessionStorage.MODECODE_FDOC_PP = 'PPFCT';
    sessionStorage.MODECODE_FDOC_P = 'PFCT';
    sessionStorage.MODECODE_FDOC_PR = 'PRFCT';
    $('#FDOC_SO').removeAttr('hidden', '');
    $('#FDOC_SH').removeAttr('hidden', '');
    $('#FDOC_SE').removeAttr('hidden', '');
    $('#FDOC_PO').removeAttr('hidden', '');
}


const MODECODE_FDOC_SandSR = 81;
const MODECODE_FDOC_PandPR = 82;

const MODECODE_IDOC_AVAL = 101;
const MODECODE_IDOC_I = 102;
const MODECODE_IDOC_ISR = 103;
const MODECODE_IDOC_O = 104;
const MODECODE_IDOC_OPR = 105;
const MODECODE_IDOC_IMOVE = 106;
const MODECODE_IDOC_OMOVE = 107;
const MODECODE_IDOC_IP = 108;
const MODECODE_IDOC_OS = 109;
const MODECODE_IDOC_IMAHSOOL = 110;
const MODECODE_IDOC_OMAVAD = 111;



//تنظیمات هشدار ها

var afiAccessApi;
var erjAccessApi;
var erjGroupApi;


afiaccess = [false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false]



tempAccess = localStorage.getItem("afi1Access");
if (ace != 'Web2') {
    if (tempAccess == "null" || tempAccess == "" || tempAccess == null) {
        afiAccessApi = localStorage.getItem('afi8Access').split("*")
    }
    else {
        afiAccessApi = localStorage.getItem('afi1Access').split("*")
    }


    for (var i = 0; i <= 34; i++) {
        afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
        afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
        afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
        afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;
        afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
        afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;

        afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
        afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
        afiAccessApi[i] == 'TrzIKala' ? afiaccess[8] = true : null;
        afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[9] = true : null;
        afiAccessApi[i] == 'IDocR' ? afiaccess[10] = true : null;
        afiAccessApi[i] == 'FDocR_S' ? afiaccess[11] = true : null;
        afiAccessApi[i] == 'FDocR_P' ? afiaccess[12] = true : null;
        afiAccessApi[i] == 'TrzAcc' ? afiaccess[13] = true : null;
        afiAccessApi[i] == 'Dftr' ? afiaccess[14] = true : null;
        afiAccessApi[i] == 'ADocR' ? afiaccess[15] = true : null;
        afiAccessApi[i] == 'TChk' ? afiaccess[16] = true : null;
        afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[17] = true : null;
        afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[18] = true : null;
        afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[19] = true : null;
        afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[20] = true : null;
        afiAccessApi[i] == 'ADOC' ? afiaccess[21] = true : null;
        afiAccessApi[i] == 'SFORD' ? afiaccess[22] = true : null;
        afiAccessApi[i] == 'SHVL' ? afiaccess[23] = true : null;
        afiAccessApi[i] == 'SEXT' ? afiaccess[24] = true : null;
        afiAccessApi[i] == 'PFORD' ? afiaccess[25] = true : null;
        afiAccessApi[i] == 'Krdx' ? afiaccess[26] = true : null;
        afiAccessApi[i] == 'Kala' ? afiaccess[27] = true : null;
        afiAccessApi[i] == 'Cust' ? afiaccess[28] = true : null;
        afiAccessApi[i] == 'Acc' ? afiaccess[29] = true : null;
        afiAccessApi[i] == 'Mkz' ? afiaccess[30] = true : null;
        afiAccessApi[i] == 'Opr' ? afiaccess[31] = true : null;
        afiAccessApi[i] == 'AGMkz' ? afiaccess[32] = true : null;
        afiAccessApi[i] == 'AGOpr' ? afiaccess[33] = true : null;
        afiAccessApi[i] == 'Arz' ? afiaccess[34] = true : null;
    }

}


if (localStorage.getItem("erjAccess") != null && localStorage.getItem("erjAccess") != "") {
    erjAccessApi = localStorage.getItem("erjAccess").split("*")
    erjGroupApi = localStorage.getItem("erjList").split("-")
}




function CheckGroupErj(GroupName) {
    if (GroupName == '') {
        return false;
    }
    else {
        if (erjGroupApi != null) {
            for (var i = 0; i < erjGroupApi.length; i++) {
                if (erjGroupApi[i] == GroupName)
                    return true;
            }
        }
        else
            return false;
    }
    return false;
}


erjaccess = [false, false, false, false, false]

if (CheckGroupErj(group) == true) {
    for (var i = 0; i < 5; i++) {
        erjAccessApi[i] == 'ErjDocK' ? erjaccess[0] = true : null;
        erjAccessApi[i] == 'ErjDocErja' ? erjaccess[1] = true : null;
        erjAccessApi[i] == 'ErjDoc' ? erjaccess[2] = true : null;
        erjAccessApi[i] == 'Erja_Resive' ? erjaccess[3] = true : null;
        erjAccessApi[i] == 'Erja_Send' ? erjaccess[4] = true : null;
    }
}

sessionStorage.placementFrom = 'top';
sessionStorage.placementAlign = 'right';
sessionStorage.animateEnter = '';
sessionStorage.animateExit = '';
sessionStorage.colorName = 'alert-danger';

/*afiaccess[0] == 0 ? $("#FDOC_SP").hide() : $("#FDOC_SP").show();
afiaccess[1] == 0 ? $("#FDOC_S").hide() : $("#FDOC_S").show();
afiaccess[2] == 0 ? $("#FDOC_SR").hide() : $("#FDOC_SR").show();
afiaccess[3] == 0 ? $("#FDOC_PP").hide() : $("#FDOC_PP").show();
afiaccess[4] == 0 ? $("#FDOC_P").hide() : $("#FDOC_P").show();
afiaccess[5] == 0 ? $("#FDOC_PR").hide() : $("#FDOC_PR").show();
afiaccess[6] == 0 ? $("#IDOC_I").hide() : $("#IDOC_I").show();
afiaccess[7] == 0 ? $("#IDOC_O").hide() : $("#IDOC_O").show();*/

$("#ADOC").hide();

$("#FDOC_SO").hide();
$("#FDOC_SP").hide();
$("#FDOC_S").hide();
$("#FDOC_SR").hide();
$("#FDOC_SH").hide();
$("#FDOC_SE").hide();
$("#FDOC_PO").hide();
$("#FDOC_PP").hide();
$("#FDOC_P").hide();
$("#FDOC_PR").hide();

$("#IDOC_I").hide();
$("#IDOC_O").hide();

$("#ErjaDOC").hide();


$("#TrzAcc").hide();
$("#Dftr").hide();
$("#ADocR").hide();
$("#TChk").hide();


$("#FDocR_S").hide();
$("#FDocR_P").hide();
$("#TrzFKala_S").hide();
$("#TrzFKala_P").hide();
$("#TrzFCust_S").hide();
$("#TrzFCust_P").hide();


$("#TrzIKala").hide();
$("#TrzIKalaExf").hide();
$("#IDocR").hide();
$("#Krdx").hide();

$("#ErjDocK").hide();
$("#ErjDocB_Last").hide();


$("#Base_Menu").hide();
$("#ADOC_Menu").hide();
$("#FDOC_Menu").hide();
$("#IDOC_Menu").hide();
$("#AReport_Menu").hide();
$("#FReport_Menu").hide();
$("#IReport_Menu").hide();
$("#EReport_Menu").hide();
$("#ErjaDOC_Menu").hide();
$("#P_NotificationErja").hide();

/*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
    afiaccess[2] == 0 && afiaccess[3] == 0 &&
    afiaccess[4] == 0 && afiaccess[5] == 0)
    $("#FDOC_Menu").hide();
else
    $("#FDOC_Menu").show();

if (afiaccess[6] == 0 && afiaccess[7] == 0)
    $("#IDOC_Menu").hide();
else
    $("#IDOC_Menu").show();*/



//function ajaxFunction(uri, method, data) {
//    return $.ajax({
//        type: method,
//        url: uri,
//        dataType: 'json',
//        contentType: 'application/json',
//        data: data ? JSON.stringify(data) : null
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        Swal.fire({ type: 'danger', title: 'خطای دیباگ', text: errorThrown });
//    });
//}




function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function GetDataApi(Url, localStorageName) { // دریافت اطلاعات از ای پی ای
    $.ajax({
        url: Url,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            sessionStorage.setItem(localStorageName, JSON.stringify(data));
            //showNotification(' دیتای ' + localStorageName + ' دریافت شد ');
        },
        error: function (xhr, textStatus, errorThrown) {
            //showNotification('خطا در دریافت اطلاعات از سرور' + '(' + errorThrown + ')');
        }
    });
}

function CountTable(tableName, ModeCode, InOut) {
    ajaxFunction(CountTableUri + ace + '/' + sal + '/' + group + '/' + tableName + '/' + ModeCode + '/' + InOut, 'GET').done(function (dataCount) {
        count = dataCount;
    });
    return count;
}



function SearchArry(Node, Key, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Node === Node && myArray[i].Key === Key) {
            return myArray[i].Param;
        }
    }
    return '';
}

function SearchMode(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Name === name) {
            return myArray[i].Code;
        }
    }
    return '';
}


function SetSelectProgram() {
    group = $("#DropGroup").val();
    sal = $("#DropSal").val();

    //group = group.length == 1 ? "0" + group : group;

    if (server == '' || server == null) {
        showNotification(translate('دوباره لاگین کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود به نرم افزار', text: 'دوباره لاگین کنید' });
        return false;
    }

    if (ace == '0' || ace == null) {
        showNotification(translate('نرم افزار را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'نرم افزار را انتخاب کنید' });
        return false;
    }
    if (group == '0' || group == null) {
        showNotification(translate('گروه را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'گروه را انتخاب کنید' });
        return false;
    }
    if (sal == '0' || sal == null) {
        showNotification(translate('سال را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'سال را انتخاب کنید' });
        return false;
    }
    try {

        localStorage.setItem('ace', ace);
        localStorage.setItem('group', group);
        localStorage.setItem('sal', sal);

        //sessionStorage.url = server + '/api/'; 
        $('#SaveParam').attr('disabled', 'disabled');

        getParamList();
        getAccessList(true);
        $('#SaveParam').removeAttr('disabled');

        localStorage.setItem("ModeCode", '');
        sessionStorage.ModeCode = '';


        getRprtAllCols();

        return true;
    } catch (e) {
        $('#SaveParam').removeAttr('disabled');
        showNotification(translate('خطای ورود') + ' ' + e, 0);
        //Swal.fire({ type: 'danger', title: 'خطای ورود', text: e });
        return false;
    }
}

//if ($("#DropAce").val() != '0' && $("#DropGroup").val() != '0' && $("#DropSal").val() != '0') {
//    SetSelectProgram();
//}

$("#SaveParam").click(function () {
    group = $("#DropGroup").val();
    sal = $("#DropSal").val();


    if (sal == '0000')
        ace = 'Web2'
    else {
        if (localStorage.getItem('afi1List') == 'null' && localStorage.getItem('afi8List') != 'null')
            ace = 'Web8';
        else
            ace = 'Web1'
    }

    localStorage.setItem('ace', ace);
    localStorage.setItem('group', group);
    localStorage.setItem('sal', sal);

    if (group == '0' || group == null)
        return showNotification(translate('گروه را انتخاب کنید'), 0);

    if (sal == '0' || sal == null)
        return showNotification(translate('سال را انتخاب کنید'), 0);

    ajaxFunction(ChangeDatabaseUri + ace + '/' + sal + '/' + group + '/true/' + lockNumber, 'GET', null, true).done(function (data) {

        localStorage.removeItem('AccStatus');
        localStorage.removeItem('FctStatus');
        localStorage.removeItem('InvStatus');
        localStorage.removeItem('ErjDocYears');


        localStorage.removeItem('Mahramaneh');
        localStorage.removeItem('ErjStatus');


        localStorage.setItem("listKalaUse", "0");
        localStorage.setItem("listCustUse", "0");
        localStorage.setItem("listAccUse", "0");
        localStorage.setItem("listOprUse", "0");
        localStorage.setItem("listMkzUse", "0");
        localStorage.setItem("listArzUse", "0");
        localStorage.setItem("listSanadHesabUse", "0")
        localStorage.setItem("listFactorUse", "0")
        localStorage.setItem("listSanadAnbarUse", "0")
        localStorage.setItem("listErjDocHUse", "0")

        $('#loadingsite').css('display', 'none');
        $('#loadingsite').attr('class', 'page-loader-wrapper');

        if (data != "OK") {

            if (data.search(translate("لطفا منتظر بمانید")) > 0) {
                return showNotification(data, 0);
            }
            else if (data == "UseLog") {
                showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
            }
            else {
                if (ace == 'Web8') {
                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی . مطمئن باشید که سال مالی') + ' ' + sal + ' ' + translate('برای تمام سیستم ها ایجاد کرده اید') + ' ' + " <br /> <br />" + data, 0);
                } else {
                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی') + data, 0);
                }
            }
        }


        SetSelectProgram();
    });
});




$("#repairDatabase").click(function () {
    group = $("#DropGroup").val();
    sal = $("#DropSal").val();

    if (group == '0' || group == null)
        return showNotification(translate('گروه را انتخاب کنید'), 0);

    if (sal == '0' || sal == null)
        return showNotification(translate('سال را انتخاب کنید'), 0);

    Swal.fire({
        title: translate('بازسازی بانک اطلاعاتی'),
        text: translate("آیا اطلاعات گروه") + ' ' + group + ' ' + translate("سال") + ' ' + sal + translate("بازسازی شود ؟"),
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {

            Swal.fire({
                title: translate('تایید نهایی'),
                text: translate("در زمان بازسازی کاربران دیگر دچار اختلال می شوند . آیا بازسازی انجام شود ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    ajaxFunction(ChangeDatabaseUri + ace + '/' + sal + '/' + group + '/false/' + lockNumber, 'GET', null, true).done(function (data) {
                        $('#loadingsite').css('display', 'none');
                        $('#loadingsite').attr('class', 'page-loader-wrapper');
                        if (data == "OK") {
                            showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
                        } else {

                            if (data.search(translate("لطفا منتظر بمانید")) > 0) {
                                return showNotification(data, 0);
                            }
                            else if (data == "UseLog") {
                                showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
                            }
                            else {
                                if (ace == 'Web8') {
                                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی . مطمئن باشید که سال مالی') + ' ' + sal + ' ' + translate('برای تمام سیستم ها ایجاد کرده اید') + " <br /> <br />" + data, 0);
                                } else {
                                    return showNotification(translate('خطا در بازسازی اطلاعات') + " <br /> <br />" + data, 0);
                                }
                            }
                            //showNotification(data, 0);
                        }
                    });
                }
            })
        }
    })

});





$("#repairDatabaseConfig").click(function () {
    Swal.fire({
        title: translate('بازسازی اطلاعات سیستم'),
        text: translate("آیا اطلاعات بازسازی شود ؟"),
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {

            Swal.fire({
                title: translate('تایید نهایی'),
                text: translate("در زمان بازسازی کاربران دیگر دچار اختلال می شوند . آیا بازسازی انجام شود ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    ajaxFunction(ChangeDatabaseConfigUri + '/' + lockNumber + '/false', 'GET', null, true).done(function (data) {
                        $('#loadingsite').css('display', 'none');
                        $('#loadingsite').attr('class', 'page-loader-wrapper');
                        if (data == "OK") {
                            showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
                        }
                        else if (data == "UseLog") {
                            showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
                        }
                        else {
                            if (data.search(translate("لطفا منتظر بمانید")) > 0)
                                return showNotification(data, 0);
                            else
                                return showNotification(translate('خطا در بازسازی اطلاعات') + ' ' + " <br /> <br />" + data, 0);
                        }
                    });
                }
            })
        }
    })

});




function getProgName(value) {
    if (ace == 'Web8') {
        if (value == 'A')
            return 'Acc5';
        else if (value == 'S')
            return 'Fct5';
        else if (value == 'P')
            return 'Inv5';
    }
    else if (ace == 'Web1')
        return 'Afi1';
    else
        return 'نامشخص';
}

//Get Param List
async function getParamList() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        ParamList(data);
        $('#information').hide();
        if (self.ParamList().length > 0) {

            sessionStorage.CoName = SearchArry("CoName", "Value", self.ParamList());
            localStorage.setItem("CoName", sessionStorage.CoName);
            $('#coName_TitleMenu').val(sessionStorage.CoName);

            sessionStorage.BeginDate = SearchArry("SalMali", "BeginDate", self.ParamList());
            localStorage.setItem("BeginDateAcc", sessionStorage.BeginDate);
            localStorage.setItem("BeginDateFct", sessionStorage.BeginDate);
            localStorage.setItem("BeginDateInv", sessionStorage.BeginDate);

            sessionStorage.EndDate = SearchArry("SalMali", "EndDate", self.ParamList());
            localStorage.setItem("EndDateAcc", sessionStorage.EndDate);
            localStorage.setItem("EndDateFct", sessionStorage.EndDate);
            localStorage.setItem("EndDateInv", sessionStorage.EndDate);

            sessionStorage.Deghat = SearchArry("Deghat", "Deghat", self.ParamList());
            localStorage.setItem("DeghatAcc", sessionStorage.Deghat);
            localStorage.setItem("DeghatFct", sessionStorage.Deghat);
            localStorage.setItem("DeghatInv", sessionStorage.Deghat);





            sessionStorage.InvDefult = SearchArry("Inv", "Default", self.ParamList());
            localStorage.setItem("InvDefult", sessionStorage.InvDefult);
            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultS", sessionStorage.GPriceDefultS);
            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultP", sessionStorage.GPriceDefultP);
            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultI", sessionStorage.GPriceDefultI);


            sessionStorage.ADOC_TestZeroPrice = SearchArry("ADOC_TestZeroPrice", "ADOC_TestZeroPrice", self.ParamList());
            localStorage.setItem("ADOC_TestZeroPrice", sessionStorage.ADOC_TestZeroPrice);
            sessionStorage.ADOC_TestTraf = SearchArry("ADOC_TestTraf", "ADOC_TestTraf", self.ParamList());
            localStorage.setItem("ADOC_TestTraf", sessionStorage.ADOC_TestTraf);
            sessionStorage.ADOC_TestCheck = SearchArry("ADOC_TestCheck", "ADOC_TestCheck", self.ParamList());
            localStorage.setItem("ADOC_TestCheck", sessionStorage.ADOC_TestCheck);

            sessionStorage.FDOCSO_TestCust = SearchArry("FDOCSO_TestCust", "FDOCSO_TestCust", self.ParamList());
            localStorage.setItem("FDOCSO_TestCust", sessionStorage.FDOCSO_TestCust);
            sessionStorage.FDOCSP_TestCust = SearchArry("FDOCSP_TestCust", "FDOCSP_TestCust", self.ParamList());
            localStorage.setItem("FDOCSP_TestCust", sessionStorage.FDOCSP_TestCust);
            sessionStorage.FDOCS_TestCust = SearchArry("FDOCS_TestCust", "FDOCS_TestCust", self.ParamList());
            localStorage.setItem("FDOCS_TestCust", sessionStorage.FDOCS_TestCust);
            sessionStorage.FDOCSR_TestCust = SearchArry("FDOCSR_TestCust", "FDOCSR_TestCust", self.ParamList());
            localStorage.setItem("FDOCSR_TestCust", sessionStorage.FDOCSR_TestCust);
            sessionStorage.FDOCSH_TestCust = SearchArry("FDOCSH_TestCust", "FDOCSH_TestCust", self.ParamList());
            localStorage.setItem("FDOCSH_TestCust", sessionStorage.FDOCSH_TestCust);
            sessionStorage.FDOCSE_TestCust = SearchArry("FDOCSE_TestCust", "FDOCSE_TestCust", self.ParamList());
            localStorage.setItem("FDOCSE_TestCust", sessionStorage.FDOCSE_TestCust);
            sessionStorage.FDOCPO_TestCust = SearchArry("FDOCPO_TestCust", "FDOCPO_TestCust", self.ParamList());
            localStorage.setItem("FDOCPO_TestCust", sessionStorage.FDOCPO_TestCust);
            sessionStorage.FDOCPP_TestCust = SearchArry("FDOCPP_TestCust", "FDOCPP_TestCust", self.ParamList());
            localStorage.setItem("FDOCPP_TestCust", sessionStorage.FDOCPP_TestCust);
            sessionStorage.FDOCP_TestCust = SearchArry("FDOCP_TestCust", "FDOCP_TestCust", self.ParamList());
            localStorage.setItem("FDOCP_TestCust", sessionStorage.FDOCP_TestCust);
            sessionStorage.FDOCPR_TestCust = SearchArry("FDOCPR_TestCust", "FDOCPR_TestCust", self.ParamList());
            localStorage.setItem("FDOCPR_TestCust", sessionStorage.FDOCPR_TestCust);

            sessionStorage.FDOCSO_TestZeroAmount = SearchArry("FDOCSO_TestZeroAmount", "FDOCSO_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSO_TestZeroAmount", sessionStorage.FDOCSO_TestZeroAmount);
            sessionStorage.FDOCSP_TestZeroAmount = SearchArry("FDOCSP_TestZeroAmount", "FDOCSP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSP_TestZeroAmount", sessionStorage.FDOCSP_TestZeroAmount);
            sessionStorage.FDOCS_TestZeroAmount = SearchArry("FDOCS_TestZeroAmount", "FDOCS_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCS_TestZeroAmount", sessionStorage.FDOCS_TestZeroAmount);
            sessionStorage.FDOCSR_TestZeroAmount = SearchArry("FDOCSR_TestZeroAmount", "FDOCSR_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSR_TestZeroAmount", sessionStorage.FDOCSR_TestZeroAmount);
            sessionStorage.FDOCSH_TestZeroAmount = SearchArry("FDOCSH_TestZeroAmount", "FDOCSH_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSH_TestZeroAmount", sessionStorage.FDOCSH_TestZeroAmount);
            sessionStorage.FDOCSE_TestZeroAmount = SearchArry("FDOCSE_TestZeroAmount", "FDOCSE_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSE_TestZeroAmount", sessionStorage.FDOCSE_TestZeroAmount);
            sessionStorage.FDOCPO_TestZeroAmount = SearchArry("FDOCPO_TestZeroAmount", "FDOCPO_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPO_TestZeroAmount", sessionStorage.FDOCPO_TestZeroAmount);
            sessionStorage.FDOCPP_TestZeroAmount = SearchArry("FDOCPP_TestZeroAmount", "FDOCPP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPP_TestZeroAmount", sessionStorage.FDOCPP_TestZeroAmount);
            sessionStorage.FDOCP_TestZeroAmount = SearchArry("FDOCP_TestZeroAmount", "FDOCP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCP_TestZeroAmount", sessionStorage.FDOCP_TestZeroAmount);
            sessionStorage.FDOCPR_TestZeroAmount = SearchArry("FDOCPR_TestZeroAmount", "FDOCPR_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPR_TestZeroAmount", sessionStorage.FDOCPR_TestZeroAmount);

            sessionStorage.FDOCSO_TestZeroPrice = SearchArry("FDOCSO_TestZeroPrice", "FDOCSO_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSO_TestZeroPrice", sessionStorage.FDOCSO_TestZeroPrice);
            sessionStorage.FDOCSP_TestZeroPrice = SearchArry("FDOCSP_TestZeroPrice", "FDOCSP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSP_TestZeroPrice", sessionStorage.FDOCSP_TestZeroPrice);
            sessionStorage.FDOCS_TestZeroPrice = SearchArry("FDOCS_TestZeroPrice", "FDOCS_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCS_TestZeroPrice", sessionStorage.FDOCS_TestZeroPrice);
            sessionStorage.FDOCSR_TestZeroPrice = SearchArry("FDOCSR_TestZeroPrice", "FDOCSR_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSR_TestZeroPrice", sessionStorage.FDOCSR_TestZeroPrice);
            sessionStorage.FDOCSH_TestZeroPrice = SearchArry("FDOCSH_TestZeroPrice", "FDOCSH_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSH_TestZeroPrice", sessionStorage.FDOCSH_TestZeroPrice);
            sessionStorage.FDOCSE_TestZeroPrice = SearchArry("FDOCSE_TestZeroPrice", "FDOCSE_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSE_TestZeroPrice", sessionStorage.FDOCSE_TestZeroPrice);
            sessionStorage.FDOCPO_TestZeroPrice = SearchArry("FDOCPO_TestZeroPrice", "FDOCPO_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPO_TestZeroPrice", sessionStorage.FDOCPO_TestZeroPrice);
            sessionStorage.FDOCPP_TestZeroPrice = SearchArry("FDOCPP_TestZeroPrice", "FDOCPP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPP_TestZeroPrice", sessionStorage.FDOCPP_TestZeroPrice);
            sessionStorage.FDOCP_TestZeroPrice = SearchArry("FDOCP_TestZeroPrice", "FDOCP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCP_TestZeroPrice", sessionStorage.FDOCP_TestZeroPrice);
            sessionStorage.FDOCPR_TestZeroPrice = SearchArry("FDOCPR_TestZeroPrice", "FDOCPR_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPR_TestZeroPrice", sessionStorage.FDOCPR_TestZeroPrice);

            sessionStorage.FDOCSO_TestInv = SearchArry("FDOCSO_TestInv", "FDOCSO_TestInv", self.ParamList());
            localStorage.setItem("FDOCSO_TestInv", sessionStorage.FDOCSO_TestInv);
            sessionStorage.FDOCSP_TestInv = SearchArry("FDOCSP_TestInv", "FDOCSP_TestInv", self.ParamList());
            localStorage.setItem("FDOCSP_TestInv", sessionStorage.FDOCSP_TestInv);
            sessionStorage.FDOCS_TestInv = SearchArry("FDOCS_TestInv", "FDOCS_TestInv", self.ParamList());
            localStorage.setItem("FDOCS_TestInv", sessionStorage.FDOCS_TestInv);
            sessionStorage.FDOCSR_TestInv = SearchArry("FDOCSR_TestInv", "FDOCSR_TestInv", self.ParamList());
            localStorage.setItem("FDOCSR_TestInv", sessionStorage.FDOCSR_TestInv);
            sessionStorage.FDOCSH_TestInv = SearchArry("FDOCSH_TestInv", "FDOCSH_TestInv", self.ParamList());
            localStorage.setItem("FDOCSH_TestInv", sessionStorage.FDOCSH_TestInv);
            sessionStorage.FDOCSE_TestInv = SearchArry("FDOCSE_TestInv", "FDOCSE_TestInv", self.ParamList());
            localStorage.setItem("FDOCSE_TestInv", sessionStorage.FDOCSE_TestInv);
            sessionStorage.FDOCPO_TestInv = SearchArry("FDOCPO_TestInv", "FDOCPO_TestInv", self.ParamList());
            localStorage.setItem("FDOCPO_TestInv", sessionStorage.FDOCPO_TestInv);
            sessionStorage.FDOCPP_TestInv = SearchArry("FDOCPP_TestInv", "FDOCPP_TestInv", self.ParamList());
            localStorage.setItem("FDOCPP_TestInv", sessionStorage.FDOCPP_TestInv);
            sessionStorage.FDOCP_TestInv = SearchArry("FDOCP_TestInv", "FDOCP_TestInv", self.ParamList());
            localStorage.setItem("FDOCP_TestInv", sessionStorage.FDOCP_TestInv);
            sessionStorage.FDOCPR_TestInv = SearchArry("FDOCPR_TestInv", "FDOCPR_TestInv", self.ParamList());
            localStorage.setItem("FDOCPR_TestInv", sessionStorage.FDOCPR_TestInv);


            sessionStorage.IDOCI_TestThvl = SearchArry("IDOCI_TestThvl", "IDOCI_TestThvl", self.ParamList());
            localStorage.setItem("IDOCI_TestThvl", sessionStorage.IDOCI_TestThvl);
            sessionStorage.IDOCO_TestThvl = SearchArry("IDOCO_TestThvl", "IDOCO_TestThvl", self.ParamList());
            localStorage.setItem("IDOCO_TestThvl", sessionStorage.IDOCO_TestThvl);

            sessionStorage.IDOCI_TestZeroAmount = SearchArry("IDOCI_TestZeroAmount", "IDOCI_TestZeroAmount", self.ParamList());
            localStorage.setItem("IDOCI_TestZeroAmount", sessionStorage.IDOCI_TestZeroAmount);
            sessionStorage.IDOCO_TestZeroAmount = SearchArry("IDOCO_TestZeroAmount", "IDOCO_TestZeroAmount", self.ParamList());
            localStorage.setItem("IDOCO_TestZeroAmount", sessionStorage.IDOCO_TestZeroAmount);

            sessionStorage.AllInvSameNo = SearchArry("AllInvSameNo", "AllInvSameNo", self.ParamList());
            localStorage.setItem("AllInvSameNo", sessionStorage.AllInvSameNo);

            sessionStorage.IDOCIAmountAfterBarCode = SearchArry("IDOCIAmountAfterBarCode", "IDOCIAmountAfterBarCode", self.ParamList());
            localStorage.setItem("IDOCIAmountAfterBarCode", sessionStorage.IDOCIAmountAfterBarCode);
            sessionStorage.IDOCOAmountAfterBarCode = SearchArry("IDOCOAmountAfterBarCode", "IDOCOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("IDOCOAmountAfterBarCode", sessionStorage.IDOCOAmountAfterBarCode);

            sessionStorage.FDOCSOAmountAfterBarCode = SearchArry("FDOCSOAmountAfterBarCode", "FDOCSOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSOAmountAfterBarCode", sessionStorage.FDOCSOAmountAfterBarCode);
            sessionStorage.FDOCSPAmountAfterBarCode = SearchArry("FDOCSPAmountAfterBarCode", "FDOCSPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSPAmountAfterBarCode", sessionStorage.FDOCSPAmountAfterBarCode);
            sessionStorage.FDOCSAmountAfterBarCode = SearchArry("FDOCSAmountAfterBarCode", "FDOCSAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSAmountAfterBarCode", sessionStorage.FDOCSAmountAfterBarCode);
            sessionStorage.FDOCSRAmountAfterBarCode = SearchArry("FDOCSRAmountAfterBarCode", "FDOCSRAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSRAmountAfterBarCode", sessionStorage.FDOCSRAmountAfterBarCode);
            sessionStorage.FDOCSHAmountAfterBarCode = SearchArry("FDOCSHAmountAfterBarCode", "FDOCSHAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSHAmountAfterBarCode", sessionStorage.FDOCSHAmountAfterBarCode);
            sessionStorage.FDOCSEAmountAfterBarCode = SearchArry("FDOCSEAmountAfterBarCode", "FDOCSEAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSEAmountAfterBarCode", sessionStorage.FDOCSEAmountAfterBarCode);
            sessionStorage.FDOCPOAmountAfterBarCode = SearchArry("FDOCPOAmountAfterBarCode", "FDOCPOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPOAmountAfterBarCode", sessionStorage.FDOCPOAmountAfterBarCode);
            sessionStorage.FDOCPPAmountAfterBarCode = SearchArry("FDOCPPAmountAfterBarCode", "FDOCPPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPPAmountAfterBarCode", sessionStorage.FDOCPPAmountAfterBarCode);
            sessionStorage.FDOCPAmountAfterBarCode = SearchArry("FDOCPAmountAfterBarCode", "FDOCPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPAmountAfterBarCode", sessionStorage.FDOCPAmountAfterBarCode);
            sessionStorage.FDOCPRAmountAfterBarCode = SearchArry("FDOCPRAmountAfterBarCode", "FDOCPRAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPRAmountAfterBarCode", sessionStorage.FDOCPRAmountAfterBarCode);

            sessionStorage.ArzCalcMode = SearchArry("ArzCalcMode", "ArzCalcMode", self.ParamList());
            sessionStorage.ArzCalcMode = 1;
            localStorage.setItem("ArzCalcMode", sessionStorage.ArzCalcMode);

            if (ace == 'Web8') {
                sessionStorage.Move_SCONT = SearchArry("MoveTo", "SCONT", self.ParamList());
                localStorage.setItem("Move_SCONT", sessionStorage.Move_SCONT);
                sessionStorage.Move_SORD = SearchArry("MoveTo", "SORD", self.ParamList());
                localStorage.setItem("Move_SORD", sessionStorage.Move_SORD);
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "SPFCT", self.ParamList());
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "SFCT", self.ParamList());
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "SRFCT", self.ParamList());
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_SHVL = SearchArry("MoveTo", "SHVL", self.ParamList());
                localStorage.setItem("Move_SHVL", sessionStorage.Move_SHVL);
                sessionStorage.Move_SEXT = SearchArry("MoveTo", "SEXT", self.ParamList());
                localStorage.setItem("Move_SEXT", sessionStorage.Move_SEXT);
                sessionStorage.Move_PCONT = SearchArry("MoveTo", "PCONT", self.ParamList());
                localStorage.setItem("Move_PCONT", sessionStorage.Move_PCONT);
                sessionStorage.Move_PORD = SearchArry("MoveTo", "PORD", self.ParamList());
                localStorage.setItem("Move_PORD", sessionStorage.Move_PORD);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "PPFCT", self.ParamList());
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "PFCT", self.ParamList());
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "PRFCT", self.ParamList());
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }
            else if (ace == 'Web1') {
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "51", self.ParamList());
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "52", self.ParamList());
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "53", self.ParamList());
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "54", self.ParamList());
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "55", self.ParamList());
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "56", self.ParamList());
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }


            sessionStorage.invSelect = "";
            localStorage.setItem("invSelect", sessionStorage.invSelect);
            /* $('#param1').text(ace == "null" ? "انتخاب نشده است" : sessionStorage.ace);
             $('#param2').text(group == "null" ? "انتخاب نشده است" : sessionStorage.group);
             $('#param3').text(sal == "null" ? "انتخاب نشده است" : sessionStorage.sal);
             $('#param4').text(sessionStorage.BeginDate == "null" ? "انتخاب نشده است" : sessionStorage.BeginDate);
             $('#param5').text(sessionStorage.EndDate == "null" ? "انتخاب نشده است" : sessionStorage.EndDate);
             $('#param6').text(sessionStorage.Deghat == "null" ? "انتخاب نشده است" : sessionStorage.Deghat);
             $('#param7').text(sessionStorage.InvDefult == '' ? "انتخاب نشده است" : sessionStorage.InvDefult);
             $('#param8').text(sessionStorage.GPriceDefultS == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultS);
             $('#param9').text(sessionStorage.GPriceDefultP == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultP);
             $('#param10').text(sessionStorage.GPriceDefultI == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultI);
 
             //sessionStorage.GPriceDefultS == 0 ? sessionStorage.GPriceDefultS = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultS
             //sessionStorage.GPriceDefultP == 0 ? sessionStorage.GPriceDefultP = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultP
             //sessionStorage.GPriceDefultI == 0 ? sessionStorage.GPriceDefultI = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultI*/
        }
    });
}





function getParamFct() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateFct = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateFct", sessionStorage.BeginDateFct);

            sessionStorage.EndDateFct = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateFct", sessionStorage.EndDateFct);

            sessionStorage.DeghatFct = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatFct", sessionStorage.DeghatFct);

            sessionStorage.FDOCSO_TestCust = SearchArry("FDOCSO_TestCust", "FDOCSO_TestCust", data);
            localStorage.setItem("FDOCSO_TestCust", sessionStorage.FDOCSO_TestCust);
            sessionStorage.FDOCSP_TestCust = SearchArry("FDOCSP_TestCust", "FDOCSP_TestCust", data);
            localStorage.setItem("FDOCSP_TestCust", sessionStorage.FDOCSP_TestCust);
            sessionStorage.FDOCS_TestCust = SearchArry("FDOCS_TestCust", "FDOCS_TestCust", data);
            localStorage.setItem("FDOCS_TestCust", sessionStorage.FDOCS_TestCust);
            sessionStorage.FDOCSR_TestCust = SearchArry("FDOCSR_TestCust", "FDOCSR_TestCust", data);
            localStorage.setItem("FDOCSR_TestCust", sessionStorage.FDOCSR_TestCust);
            sessionStorage.FDOCSH_TestCust = SearchArry("FDOCSH_TestCust", "FDOCSH_TestCust", data);
            localStorage.setItem("FDOCSH_TestCust", sessionStorage.FDOCSH_TestCust);
            sessionStorage.FDOCSE_TestCust = SearchArry("FDOCSE_TestCust", "FDOCSE_TestCust", data);
            localStorage.setItem("FDOCSE_TestCust", sessionStorage.FDOCSE_TestCust);
            sessionStorage.FDOCPO_TestCust = SearchArry("FDOCPO_TestCust", "FDOCPO_TestCust", data);
            localStorage.setItem("FDOCPO_TestCust", sessionStorage.FDOCPO_TestCust);
            sessionStorage.FDOCPP_TestCust = SearchArry("FDOCPP_TestCust", "FDOCPP_TestCust", data);
            localStorage.setItem("FDOCPP_TestCust", sessionStorage.FDOCPP_TestCust);
            sessionStorage.FDOCP_TestCust = SearchArry("FDOCP_TestCust", "FDOCP_TestCust", data);
            localStorage.setItem("FDOCP_TestCust", sessionStorage.FDOCP_TestCust);
            sessionStorage.FDOCPR_TestCust = SearchArry("FDOCPR_TestCust", "FDOCPR_TestCust", data);
            localStorage.setItem("FDOCPR_TestCust", sessionStorage.FDOCPR_TestCust);

            sessionStorage.FDOCSO_TestZeroAmount = SearchArry("FDOCSO_TestZeroAmount", "FDOCSO_TestZeroAmount", data);
            localStorage.setItem("FDOCSO_TestZeroAmount", sessionStorage.FDOCSO_TestZeroAmount);
            sessionStorage.FDOCSP_TestZeroAmount = SearchArry("FDOCSP_TestZeroAmount", "FDOCSP_TestZeroAmount", data);
            localStorage.setItem("FDOCSP_TestZeroAmount", sessionStorage.FDOCSP_TestZeroAmount);
            sessionStorage.FDOCS_TestZeroAmount = SearchArry("FDOCS_TestZeroAmount", "FDOCS_TestZeroAmount", data);
            localStorage.setItem("FDOCS_TestZeroAmount", sessionStorage.FDOCS_TestZeroAmount);
            sessionStorage.FDOCSR_TestZeroAmount = SearchArry("FDOCSR_TestZeroAmount", "FDOCSR_TestZeroAmount", data);
            localStorage.setItem("FDOCSR_TestZeroAmount", sessionStorage.FDOCSR_TestZeroAmount);
            sessionStorage.FDOCSH_TestZeroAmount = SearchArry("FDOCSH_TestZeroAmount", "FDOCSH_TestZeroAmount", data);
            localStorage.setItem("FDOCSH_TestZeroAmount", sessionStorage.FDOCSH_TestZeroAmount);
            sessionStorage.FDOCSE_TestZeroAmount = SearchArry("FDOCSE_TestZeroAmount", "FDOCSE_TestZeroAmount", data);
            localStorage.setItem("FDOCSE_TestZeroAmount", sessionStorage.FDOCSE_TestZeroAmount);
            sessionStorage.FDOCPO_TestZeroAmount = SearchArry("FDOCPO_TestZeroAmount", "FDOCPO_TestZeroAmount", data);
            localStorage.setItem("FDOCPO_TestZeroAmount", sessionStorage.FDOCPO_TestZeroAmount);
            sessionStorage.FDOCPP_TestZeroAmount = SearchArry("FDOCPP_TestZeroAmount", "FDOCPP_TestZeroAmount", data);
            localStorage.setItem("FDOCPP_TestZeroAmount", sessionStorage.FDOCPP_TestZeroAmount);
            sessionStorage.FDOCP_TestZeroAmount = SearchArry("FDOCP_TestZeroAmount", "FDOCP_TestZeroAmount", data);
            localStorage.setItem("FDOCP_TestZeroAmount", sessionStorage.FDOCP_TestZeroAmount);
            sessionStorage.FDOCPR_TestZeroAmount = SearchArry("FDOCPR_TestZeroAmount", "FDOCPR_TestZeroAmount", data);
            localStorage.setItem("FDOCPR_TestZeroAmount", sessionStorage.FDOCPR_TestZeroAmount);

            sessionStorage.FDOCSO_TestZeroPrice = SearchArry("FDOCSO_TestZeroPrice", "FDOCSO_TestZeroPrice", data);
            localStorage.setItem("FDOCSO_TestZeroPrice", sessionStorage.FDOCSO_TestZeroPrice);
            sessionStorage.FDOCSP_TestZeroPrice = SearchArry("FDOCSP_TestZeroPrice", "FDOCSP_TestZeroPrice", data);
            localStorage.setItem("FDOCSP_TestZeroPrice", sessionStorage.FDOCSP_TestZeroPrice);
            sessionStorage.FDOCS_TestZeroPrice = SearchArry("FDOCS_TestZeroPrice", "FDOCS_TestZeroPrice", data);
            localStorage.setItem("FDOCS_TestZeroPrice", sessionStorage.FDOCS_TestZeroPrice);
            sessionStorage.FDOCSR_TestZeroPrice = SearchArry("FDOCSR_TestZeroPrice", "FDOCSR_TestZeroPrice", data);
            localStorage.setItem("FDOCSR_TestZeroPrice", sessionStorage.FDOCSR_TestZeroPrice);
            sessionStorage.FDOCSH_TestZeroPrice = SearchArry("FDOCSH_TestZeroPrice", "FDOCSH_TestZeroPrice", data);
            localStorage.setItem("FDOCSH_TestZeroPrice", sessionStorage.FDOCSH_TestZeroPrice);
            sessionStorage.FDOCSE_TestZeroPrice = SearchArry("FDOCSE_TestZeroPrice", "FDOCSE_TestZeroPrice", data);
            localStorage.setItem("FDOCSE_TestZeroPrice", sessionStorage.FDOCSE_TestZeroPrice);
            sessionStorage.FDOCPO_TestZeroPrice = SearchArry("FDOCPO_TestZeroPrice", "FDOCPO_TestZeroPrice", data);
            localStorage.setItem("FDOCPO_TestZeroPrice", sessionStorage.FDOCPO_TestZeroPrice);
            sessionStorage.FDOCPP_TestZeroPrice = SearchArry("FDOCPP_TestZeroPrice", "FDOCPP_TestZeroPrice", data);
            localStorage.setItem("FDOCPP_TestZeroPrice", sessionStorage.FDOCPP_TestZeroPrice);
            sessionStorage.FDOCP_TestZeroPrice = SearchArry("FDOCP_TestZeroPrice", "FDOCP_TestZeroPrice", data);
            localStorage.setItem("FDOCP_TestZeroPrice", sessionStorage.FDOCP_TestZeroPrice);
            sessionStorage.FDOCPR_TestZeroPrice = SearchArry("FDOCPR_TestZeroPrice", "FDOCPR_TestZeroPrice", data);
            localStorage.setItem("FDOCPR_TestZeroPrice", sessionStorage.FDOCPR_TestZeroPrice);

            sessionStorage.FDOCSO_TestInv = SearchArry("FDOCSO_TestInv", "FDOCSO_TestInv", data);
            localStorage.setItem("FDOCSO_TestInv", sessionStorage.FDOCSO_TestInv);
            sessionStorage.FDOCSP_TestInv = SearchArry("FDOCSP_TestInv", "FDOCSP_TestInv", data);
            localStorage.setItem("FDOCSP_TestInv", sessionStorage.FDOCSP_TestInv);
            sessionStorage.FDOCS_TestInv = SearchArry("FDOCS_TestInv", "FDOCS_TestInv", data);
            localStorage.setItem("FDOCS_TestInv", sessionStorage.FDOCS_TestInv);
            sessionStorage.FDOCSR_TestInv = SearchArry("FDOCSR_TestInv", "FDOCSR_TestInv", data);
            localStorage.setItem("FDOCSR_TestInv", sessionStorage.FDOCSR_TestInv);
            sessionStorage.FDOCSH_TestInv = SearchArry("FDOCSH_TestInv", "FDOCSH_TestInv", data);
            localStorage.setItem("FDOCSH_TestInv", sessionStorage.FDOCSH_TestInv);
            sessionStorage.FDOCSE_TestInv = SearchArry("FDOCSE_TestInv", "FDOCSE_TestInv", data);
            localStorage.setItem("FDOCSE_TestInv", sessionStorage.FDOCSE_TestInv);
            sessionStorage.FDOCPO_TestInv = SearchArry("FDOCPO_TestInv", "FDOCPO_TestInv", data);
            localStorage.setItem("FDOCPO_TestInv", sessionStorage.FDOCPO_TestInv);
            sessionStorage.FDOCPP_TestInv = SearchArry("FDOCPP_TestInv", "FDOCPP_TestInv", data);
            localStorage.setItem("FDOCPP_TestInv", sessionStorage.FDOCPP_TestInv);
            sessionStorage.FDOCP_TestInv = SearchArry("FDOCP_TestInv", "FDOCP_TestInv", data);
            localStorage.setItem("FDOCP_TestInv", sessionStorage.FDOCP_TestInv);
            sessionStorage.FDOCPR_TestInv = SearchArry("FDOCPR_TestInv", "FDOCPR_TestInv", data);
            localStorage.setItem("FDOCPR_TestInv", sessionStorage.FDOCPR_TestInv);

            sessionStorage.FDOCSOAmountAfterBarCode = SearchArry("FDOCSOAmountAfterBarCode", "FDOCSOAmountAfterBarCode", data);
            localStorage.setItem("FDOCSOAmountAfterBarCode", sessionStorage.FDOCSOAmountAfterBarCode);
            sessionStorage.FDOCSPAmountAfterBarCode = SearchArry("FDOCSPAmountAfterBarCode", "FDOCSPAmountAfterBarCode", data);
            localStorage.setItem("FDOCSPAmountAfterBarCode", sessionStorage.FDOCSPAmountAfterBarCode);
            sessionStorage.FDOCSAmountAfterBarCode = SearchArry("FDOCSAmountAfterBarCode", "FDOCSAmountAfterBarCode", data);
            localStorage.setItem("FDOCSAmountAfterBarCode", sessionStorage.FDOCSAmountAfterBarCode);
            sessionStorage.FDOCSRAmountAfterBarCode = SearchArry("FDOCSRAmountAfterBarCode", "FDOCSRAmountAfterBarCode", data);
            localStorage.setItem("FDOCSRAmountAfterBarCode", sessionStorage.FDOCSRAmountAfterBarCode);
            sessionStorage.FDOCSHAmountAfterBarCode = SearchArry("FDOCSHAmountAfterBarCode", "FDOCSHAmountAfterBarCode", data);
            localStorage.setItem("FDOCSHAmountAfterBarCode", sessionStorage.FDOCSHAmountAfterBarCode);
            sessionStorage.FDOCSEAmountAfterBarCode = SearchArry("FDOCSEAmountAfterBarCode", "FDOCSEAmountAfterBarCode", data);
            localStorage.setItem("FDOCSEAmountAfterBarCode", sessionStorage.FDOCSEAmountAfterBarCode);
            sessionStorage.FDOCPOAmountAfterBarCode = SearchArry("FDOCPOAmountAfterBarCode", "FDOCPOAmountAfterBarCode", data);
            localStorage.setItem("FDOCPOAmountAfterBarCode", sessionStorage.FDOCPOAmountAfterBarCode);
            sessionStorage.FDOCPPAmountAfterBarCode = SearchArry("FDOCPPAmountAfterBarCode", "FDOCPPAmountAfterBarCode", data);
            localStorage.setItem("FDOCPPAmountAfterBarCode", sessionStorage.FDOCPPAmountAfterBarCode);
            sessionStorage.FDOCPAmountAfterBarCode = SearchArry("FDOCPAmountAfterBarCode", "FDOCPAmountAfterBarCode", data);
            localStorage.setItem("FDOCPAmountAfterBarCode", sessionStorage.FDOCPAmountAfterBarCode);
            sessionStorage.FDOCPRAmountAfterBarCode = SearchArry("FDOCPRAmountAfterBarCode", "FDOCPRAmountAfterBarCode", data);
            localStorage.setItem("FDOCPRAmountAfterBarCode", sessionStorage.FDOCPRAmountAfterBarCode);

            if (ace == 'Web8') {
                sessionStorage.Move_SCONT = SearchArry("MoveTo", "SCONT", data);
                localStorage.setItem("Move_SCONT", sessionStorage.Move_SCONT);
                sessionStorage.Move_SORD = SearchArry("MoveTo", "SORD", data);
                localStorage.setItem("Move_SORD", sessionStorage.Move_SORD);
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "SPFCT", data);
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "SFCT", data);
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "SRFCT", data);
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_SHVL = SearchArry("MoveTo", "SHVL", data);
                localStorage.setItem("Move_SHVL", sessionStorage.Move_SHVL);
                sessionStorage.Move_SEXT = SearchArry("MoveTo", "SEXT", data);
                localStorage.setItem("Move_SEXT", sessionStorage.Move_SEXT);
                sessionStorage.Move_PCONT = SearchArry("MoveTo", "PCONT", data);
                localStorage.setItem("Move_PCONT", sessionStorage.Move_PCONT);
                sessionStorage.Move_PORD = SearchArry("MoveTo", "PORD", data);
                localStorage.setItem("Move_PORD", sessionStorage.Move_PORD);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "PPFCT", data);
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "PFCT", data);
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "PRFCT", data);
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }
            else if (ace == 'Web1') {
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "51", data);
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "52", data);
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "53", data);
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "54", data);
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "55", data);
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "56", data);
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }






            sessionStorage.InvDefult_Fct = SearchArry("Inv", "Default", data);
            localStorage.setItem("InvDefult_Fct", sessionStorage.InvDefult_Fct);

            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", data);
            localStorage.setItem("GPriceDefultS", sessionStorage.GPriceDefultS);

            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", data);
            localStorage.setItem("GPriceDefultP", sessionStorage.GPriceDefultP);

            sessionStorage.ArzCalcMode_Fct = SearchArry("ArzCalcMode", "ArzCalcMode", data);
            sessionStorage.ArzCalcMode_Fct = 1;
            localStorage.setItem("ArzCalcMode_Fct", sessionStorage.ArzCalcMode_Fct);

            sessionStorage.invSelect_Fct = "";
            localStorage.setItem("invSelect_Fct", sessionStorage.invSelect_Fct);






        }
    });
}


function getParamInv() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateInv = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateInv", sessionStorage.BeginDateInv);

            sessionStorage.EndDateInv = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateInv", sessionStorage.EndDateInv);

            sessionStorage.DeghatInv = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatInv", sessionStorage.DeghatInv);

            sessionStorage.InvDefult_Inv = SearchArry("Inv", "Default", data);
            localStorage.setItem("InvDefult_Inv", sessionStorage.InvDefult_Inv);

            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", data);
            localStorage.setItem("GPriceDefultI", sessionStorage.GPriceDefultI);

            sessionStorage.ArzCalcMode_Inv = SearchArry("ArzCalcMode", "ArzCalcMode", data);
            sessionStorage.ArzCalcMode_Inv = 1;
            localStorage.setItem("ArzCalcMode_Inv", sessionStorage.ArzCalcMode_Inv);

            sessionStorage.invSelect_Inv = "";
            localStorage.setItem("invSelect_Inv", sessionStorage.invSelect_Inv);

            sessionStorage.IDOCI_TestThvl = SearchArry("IDOCI_TestThvl", "IDOCI_TestThvl", data);
            localStorage.setItem("IDOCI_TestThvl", sessionStorage.IDOCI_TestThvl);
            sessionStorage.IDOCO_TestThvl = SearchArry("IDOCO_TestThvl", "IDOCO_TestThvl", data);
            localStorage.setItem("IDOCO_TestThvl", sessionStorage.IDOCO_TestThvl);

            sessionStorage.IDOCI_TestZeroAmount = SearchArry("IDOCI_TestZeroAmount", "IDOCI_TestZeroAmount", data);
            localStorage.setItem("IDOCI_TestZeroAmount", sessionStorage.IDOCI_TestZeroAmount);
            sessionStorage.IDOCO_TestZeroAmount = SearchArry("IDOCO_TestZeroAmount", "IDOCO_TestZeroAmount", data);
            localStorage.setItem("IDOCO_TestZeroAmount", sessionStorage.IDOCO_TestZeroAmount);

            sessionStorage.AllInvSameNo = SearchArry("AllInvSameNo", "AllInvSameNo", data);
            localStorage.setItem("AllInvSameNo", sessionStorage.AllInvSameNo);

            sessionStorage.IDOCIAmountAfterBarCode = SearchArry("IDOCIAmountAfterBarCode", "IDOCIAmountAfterBarCode", data);
            localStorage.setItem("IDOCIAmountAfterBarCode", sessionStorage.IDOCIAmountAfterBarCode);
            sessionStorage.IDOCOAmountAfterBarCode = SearchArry("IDOCOAmountAfterBarCode", "IDOCOAmountAfterBarCode", data);
            localStorage.setItem("IDOCOAmountAfterBarCode", sessionStorage.IDOCOAmountAfterBarCode);
        }
    });
}


function getParamAcc() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateAcc = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateAcc", sessionStorage.BeginDateAcc);

            sessionStorage.EndDateAcc = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateAcc", sessionStorage.EndDateAcc);

            sessionStorage.DeghatAcc = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatAcc", sessionStorage.DeghatAcc);


            sessionStorage.ADOC_TestZeroPrice = SearchArry("ADOC_TestZeroPrice", "ADOC_TestZeroPrice", data);
            localStorage.setItem("ADOC_TestZeroPrice", sessionStorage.ADOC_TestZeroPrice);
            sessionStorage.ADOC_TestTraf = SearchArry("ADOC_TestTraf", "ADOC_TestTraf", data);
            localStorage.setItem("ADOC_TestTraf", sessionStorage.ADOC_TestTraf);
            sessionStorage.ADOC_TestCheck = SearchArry("ADOC_TestCheck", "ADOC_TestCheck", data);
            localStorage.setItem("ADOC_TestCheck", sessionStorage.ADOC_TestCheck);
        }
    });
}




function CheckAccess(TrsName, Prog) {
    if (localStorage.getItem('admin_Afi1') == '1' && ace == 'Web1')
        return true;
    else if (Prog.includes('Acc5') && localStorage.getItem('admin_Acc5') == '1' && ace == 'Web8')
        return true;
    else if (Prog.includes('Fct5') && localStorage.getItem('admin_Fct5') == '1' && ace == 'Web8')
        return true;
    else if (Prog.includes('Inv5') && localStorage.getItem('admin_Inv5') == '1' && ace == 'Web8')
        return true;

    /*if (access[0].TrsName == 'ADMIN') {
        if (ace == 'afi1') {
            return true;
        }
        else {
            if (Prog == null)
                alert(TrsName)
               // Prog = 'Acc5';

            if (Prog.length > 4) {
                Prog = Prog.split('-');
                for (var i = 0; i < Prog.length; i++) {
                    if (access[0].OrgProgName == Prog[i]) {
                        return true;
                    }
                }
            }
            else if (access[0].OrgProgName == Prog) {
                return true;
            }
        }
    }*/
    else {
        if (TrsName == "KALA" || TrsName.lastIndexOf("_KALA") > 0) {
            for (var i = 0; i < access.length; i++) {
                if (access[i].TrsName == TrsName && access[i].OrgProgName == Fct_or_Inv)
                    return true;
            }
        }
        else if (TrsName == "OPR" || TrsName == "MKZ" || TrsName == "ARZ" || TrsName.lastIndexOf("_OPR") > 0 || TrsName.lastIndexOf("_MKZ") > 0 || TrsName.lastIndexOf("_ARZ") > 0) {
            for (var i = 0; i < access.length; i++) {
                if (access[i].TrsName == TrsName && access[i].OrgProgName == Master_ProgName)
                    return true;
            }
        }
        else {
            for (var i = 0; i < access.length; i++) {
                if (access[i].TrsName == TrsName)
                    return true;
            }
        }
    }
    return false
}

/*
function CheckAccessAcc(TrsName) {
    if (accessAcc[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        if (TrsName == "OPR" || TrsName == "MKZ" || TrsName.lastIndexOf("_OPR") > 0 || TrsName.lastIndexOf("_MKZ") > 0) {
            for (var i = 0; i < accessAcc.length; i++) {
                if (accessAcc[i].TrsName == TrsName && accessAcc[i].OrgProgName == Master_ProgName)
                    return true;
            }
        }
        else {
            for (var i = 0; i < accessAcc.length; i++) {
                if (accessAcc[i].TrsName == TrsName)
                    return true;
            }
        }
    }
    return false
}

function CheckAccessFct(TrsName) {
    if (accessFct[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        if (TrsName == "KALA" || TrsName.lastIndexOf("_KALA") > 0) {
            for (var i = 0; i < accessFct.length; i++) {
                if (accessFct[i].TrsName == TrsName && accessFct[i].OrgProgName == Fct_or_Inv)
                    return true;
            }
        }
        else if (TrsName == "OPR" || TrsName == "MKZ" || TrsName.lastIndexOf("_OPR") > 0 || TrsName.lastIndexOf("_MKZ") > 0) {
            for (var i = 0; i < accessFct.length; i++) {
                if (accessFct[i].TrsName == TrsName && accessFct[i].OrgProgName == Master_ProgName)
                    return true;
            }
        }
        else {
            for (var i = 0; i < accessFct.length; i++) {
                if (accessFct[i].TrsName == TrsName)
                    return true;
            }
        }
    }
    return false
}

function CheckAccessInv(TrsName) {
    if (accessInv[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        if (TrsName == "KALA" || TrsName.lastIndexOf("_KALA") > 0) {
            for (var i = 0; i < accessInv.length; i++) {
                if (accessInv[i].TrsName == TrsName && accessInv[i].OrgProgName == Fct_or_Inv)
                    return true;
            }
        }
        else if (TrsName == "OPR" || TrsName == "MKZ" || TrsName.lastIndexOf("_OPR") > 0 || TrsName.lastIndexOf("_MKZ") > 0) {
            for (var i = 0; i < accessInv.length; i++) {
                if (accessInv[i].TrsName == TrsName && accessInv[i].OrgProgName == Master_ProgName)
                    return true;
            }
        }
        else {
            for (var i = 0; i < accessInv.length; i++) {
                if (accessInv[i].TrsName == TrsName)
                    return true;
            }
        }
    }
    return false
}*/


function CheckAccessReport(Code, Prog) {


    /*if (access[0].TrsName == 'ADMIN') {
        if (ace == 'afi1') {
            return true;
        }
        else {
            if (Prog == null)
                alert(Code)

            if (Prog.length > 4) {
                Prog = Prog.split('-');
                for (var i = 0; i < Prog.length; i++) {
                    if (access[0].OrgProgName == Prog[i]) {
                        return true;
                    }
                }
            }
            else if (access[0].OrgProgName == Prog) {
                return true;
            }
        }
    }*/
    if (Prog.includes('Acc5') && localStorage.getItem('admin_Acc5') == '1')
        return true;
    else if (Prog.includes('Fct5') && localStorage.getItem('admin_Fct5') == '1')
        return true;
    else if (Prog.includes('Inv5') && localStorage.getItem('admin_Inv5') == '1')
        return true;
    else if (Prog.includes('Afi1') && localStorage.getItem('admin_Afi1') == '1')
        return true;
    else {
        for (var i = 0; i < accessReport.length; i++) {
            if (accessReport[i].Code == Code)
                return accessReport[i].Trs;
        }
    }
    return false;
}


function CheckAccessErj(TrsName) {
    /*if (accessErj[0].TrsName == 'ADMIN') {
        return true;
    }*/
    if (localStorage.getItem('admin_Erj1') == '1')
        return true;
    else {
        for (var i = 0; i < accessErj.length; i++) {
            if (accessErj[i].TrsName == TrsName)
                return true;
        }
    }
    return false
}

function CheckAccessReportErj(Code) {
    /*if (accessErj[0].TrsName == 'ADMIN') {
        return true;
    }*/
    if (localStorage.getItem('admin_Erj1') == '1')
        return true;
    else {
        for (var i = 0; i < accessReportErj.length; i++) {
            if (accessReportErj[i].Code == Code)
                return accessReportErj[i].Trs;
        }
    }
    return false;
}


function FindTextField(field, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Code == field && data[i].Visible == 1) {
            return data[i].Name;
        }
    }
    return 0;
}

function FindTypeField(field, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Code == field && data[i].Visible == 1) {
            return data[i].Type;
        }
    }
    return 0;
}

/*
function GetNameField(Code, InOut) {
    for (var i = 0; i < FldNames.length; i++) {
        if (FldNames[i].Code == Code && FldNames[i].InOut == InOut ) {
            return FldNames[i].Name;
        }
    }
    return '';
}
 
function GetShowField(Code, InOut) {
    for (var i = 0; i < FldNames.length; i++) {
        if (FldNames[i].Code == Code && FldNames[i].InOut == InOut) {
            return FldNames[i].Visible;
        }
    }
    return 0;
}
*/

//Get Access List
function getAccessList(GoHome) {

    AccountUri = serverAccount + 'Account/'; // آدرس حساب
    ajaxFunctionAccount(AccountUri + localStorage.getItem("userNameAccount") + '/' +
        localStorage.getItem("passAccount"), 'GET', true).done(function (data) {
            if (data === null) {
                return showNotification(translate(' نام کاربری یا کلمه عبور اشتباه است '), 0);
                // return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
            }
            else {
                serverAddress = data.AddressApi;
                apiAddressPos = data.AddressApiPos;
                afi1List = data.AFI1_Group;
                afi8List = data.AFI8_Group;
                erjList = data.ERJ_Group;

                afi1Access = data.AFI1_Access;
                afi8Access = data.AFI8_Access;
                erjAccess = data.ERJ_Access;

                lockNumber = data.lockNumber;
                multilang = data.multilang;
                logoutmin = data.logoutmin;

                whereKala = data.WhereKala;
                whereCust = data.WhereCust;
                whereAcc = data.WhereAcc;

                Master_ProgName = data.ProgName;
                Fct_or_Inv = data.Fct_or_Inv == 'FCT5' ? 'Fct5' : Fct_or_Inv == 'INV5' ? 'Inv5' : '';

                localStorage.setItem("ApiAddressPos", apiAddressPos);

                localStorage.setItem('DataAccount', JSON.stringify(data));
                localStorage.setItem('afi1List', afi1List);
                localStorage.setItem('afi8List', afi8List);
                localStorage.setItem('erjList', erjList);

                localStorage.setItem('afi1Access', afi1Access);
                localStorage.setItem('afi8Access', afi8Access);
                localStorage.setItem('erjAccess', erjAccess);
                localStorage.setItem('multilang', multilang);
                localStorage.setItem('logoutmin', logoutmin);

                localStorage.setItem('whereKala', whereKala);
                localStorage.setItem('whereCust', whereCust);
                localStorage.setItem('whereAcc', whereAcc);

                localStorage.setItem('Master_ProgName', Master_ProgName);
                localStorage.setItem('Fct_or_Inv', Fct_or_Inv);



                afiaccess = [false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false]

                if (ace == 'Web2') {
                    afiAccessApi = '';
                }
                else {
                    if (ace == 'Web1') {
                        afi1Access != null ? afiAccessApi = afi1Access.split("*") : afiAccessApi = ''
                    }
                    else if (ace == 'Web8') {
                        afi8Access != null ? afiAccessApi = afi8Access.split("*") : afiAccessApi = ''
                    }

                    for (var i = 0; i <= 34; i++) {
                        afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
                        afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
                        afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
                        afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;

                        afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
                        afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;
                        afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
                        afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
                        afiAccessApi[i] == 'TrzIKala' ? afiaccess[8] = true : null;
                        afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[9] = true : null;
                        afiAccessApi[i] == 'IDocR' ? afiaccess[10] = true : null;
                        afiAccessApi[i] == 'FDocR_S' ? afiaccess[11] = true : null;
                        afiAccessApi[i] == 'FDocR_P' ? afiaccess[12] = true : null;
                        afiAccessApi[i] == 'TrzAcc' ? afiaccess[13] = true : null;
                        afiAccessApi[i] == 'Dftr' ? afiaccess[14] = true : null;
                        afiAccessApi[i] == 'ADocR' ? afiaccess[15] = true : null;
                        afiAccessApi[i] == 'TChk' ? afiaccess[16] = true : null;
                        afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[17] = true : null;
                        afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[18] = true : null;
                        afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[19] = true : null;
                        afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[20] = true : null;
                        afiAccessApi[i] == 'ADOC' ? afiaccess[21] = true : null;
                        afiAccessApi[i] == 'SFORD' ? afiaccess[22] = true : null;
                        afiAccessApi[i] == 'SHVL' ? afiaccess[23] = true : null;
                        afiAccessApi[i] == 'SEXT' ? afiaccess[24] = true : null;
                        afiAccessApi[i] == 'PFORD' ? afiaccess[25] = true : null;
                        afiAccessApi[i] == 'Krdx' ? afiaccess[26] = true : null;
                        afiAccessApi[i] == 'Kala' ? afiaccess[27] = true : null;
                        afiAccessApi[i] == 'Cust' ? afiaccess[28] = true : null;
                        afiAccessApi[i] == 'Acc' ? afiaccess[29] = true : null;
                        afiAccessApi[i] == 'Mkz' ? afiaccess[30] = true : null;
                        afiAccessApi[i] == 'Opr' ? afiaccess[31] = true : null;
                        afiAccessApi[i] == 'AGMkz' ? afiaccess[32] = true : null;
                        afiAccessApi[i] == 'AGOpr' ? afiaccess[33] = true : null;
                        afiAccessApi[i] == 'Arz' ? afiaccess[34] = true : null;
                    }
                }

                erjaccess = [false, false]

                if (CheckGroupErj(group) == true) {
                    for (var i = 0; i < 5; i++) {
                        erjAccessApi[i] == 'ErjDocK' ? erjaccess[0] = true : null;
                        erjAccessApi[i] == 'ErjDocB_Last' ? erjaccess[1] = true : null;
                        erjAccessApi[i] == 'ErjDoc' ? erjaccess[2] = true : null;
                        erjAccessApi[i] == 'Erja_Resive' ? erjaccess[3] = true : null;
                        erjAccessApi[i] == 'Erja_Send' ? erjaccess[4] = true : null;
                    }

                    ajaxFunction(AccessUri + aceErj + '/' + group + '/' + sessionStorage.userName, 'GET', true).done(function (data) {
                        self.AccessList(data);
                        if (self.AccessList().length > 0) {
                            localStorage.setItem('AccessErj', JSON.stringify(data));
                            accssErj = JSON.parse(localStorage.getItem("AccessErj"));

                            ajaxFunction(AccessReportErjUri + 'Web2' + '/' + group + '/' + sessionStorage.userName, 'GET', true).done(function (data) {
                                self.AccessListReport(data);
                                if (self.AccessListReport().length > 0) {
                                    localStorage.setItem('AccessReportErj', JSON.stringify(data));
                                    accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));
                                    SetValidationErj();
                                }
                            });
                        }
                    });


                }

                ajaxFunction(AccessUri + ace + '/' + group + '/' + sessionStorage.userName, 'GET', true).done(function (data) {
                    self.AccessList(data);
                    if (self.AccessList().length > 0) {
                        admin = data.filter(s => s.TrsName == 'ADMIN');

                        admin_Acc5 = 0;
                        admin_Fct5 = 0;
                        admin_Inv5 = 0;
                        admin_Afi1 = 0;
                        admin_Erj1 = 0;

                        for (var i = 0; i < admin.length; i++) {
                            if (admin[i].OrgProgName == 'Acc5') admin_Acc5 = 1;
                            if (admin[i].OrgProgName == 'Fct5') admin_Fct5 = 1;
                            if (admin[i].OrgProgName == 'Inv5') admin_Inv5 = 1;
                            if (admin[i].OrgProgName == 'Afi1') admin_Afi1 = 1;
                            if (admin[i].OrgProgName == 'Erj1') admin_Erj1 = 1;
                        }

                        localStorage.setItem('admin_Acc5', admin_Acc5);
                        localStorage.setItem('admin_Fct5', admin_Fct5);
                        localStorage.setItem('admin_Inv5', admin_Inv5);
                        localStorage.setItem('admin_Afi1', admin_Afi1);
                        localStorage.setItem('admin_Erj1', admin_Erj1);


                        localStorage.setItem('Access', JSON.stringify(data));
                        //if (sessionStorage.userName == 'ACE') {
                        //    localStorage.setItem('Access', 1);
                        //} else {


                        //}


                        access = localStorage.getItem('Access');

                        /* sessionStorage.OrgProgName = '';
                         if (access.includes('Erj1')) sessionStorage.OrgProgName = 'Erj1';
                         if (access.includes('Inv5')) sessionStorage.OrgProgName = 'Inv5';
                         if (access.includes('Fct5')) sessionStorage.OrgProgName = 'Fct5';
                         if (access.includes('Acc5')) sessionStorage.OrgProgName = 'Acc5';*/

                        access = JSON.parse(localStorage.getItem('Access'));

                        ajaxFunction(AccessReportUri + ace + '/' + group + '/' + sessionStorage.userName, 'GET', true).done(function (data) {
                            self.AccessListReport(data);
                            if (self.AccessListReport().length > 0) {
                                localStorage.setItem('AccessReport', JSON.stringify(data));
                                accessReport = JSON.parse(localStorage.getItem("AccessReport"));
                                SetValidation();
                            }
                        });
                    }
                });

                localStorage.setItem("Inbox", 0);
                ajaxFunction(AccessUri + "null" + '/' + "0" + '/' + sessionStorage.userName, 'GET', true).done(function (data) {
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].TrsName == "Inbox") {
                                localStorage.setItem("Inbox", 1);
                            }
                        }
                    }

                    if (sessionStorage.userName == "ACE") {
                        localStorage.setItem("Inbox", 1);
                    }
                    if (GoHome == true)
                        window.location.href = localStorage.getItem("urlIndex");//sessionStorage.urlIndex;
                    else
                        location.reload();
                });



            }
        });
}

SetValidation();
SetValidationErj();

var DateNow;
var SalNow;

if (sessionStorage.userName != '' && sessionStorage.userName != null)
    setInterval(TestUser, 60000);
function TestUser() {
    if (sessionStorage.userName != "" && sessionStorage.userName != null) {

        groupNo = '';
        if (erjGroupApi.includes(group) == true) {
            if (accessErj != null) {
                groupNo = group
            }
        }
        var LoginTestObject = {
            MachineId: MachineId,
            IPWan: '',
            Country: '',
            City: '',
            UserCode: sessionStorage.userName,
            ProgName: ace,
            ProgVer: '',
            ProgCaption: '',
            FlagTest: 1,
            GroupNo: groupNo,
            Year: sal,
        }

        ajaxFunction(LoginTestUri, 'POST', LoginTestObject).done(function (datalogin) {
            if (datalogin.ID >= 0) {
                //showNotification('لطفا دوباره وارد شوید', 0);
                //sleep(10000);
                sessionStorage.userName = '';
                window.location.href = localStorage.getItem("urlLogin");//sessionStorage.urlLogin;
            }
            else {
                DateNow = datalogin.SrvDate;
                listDate = DateNow.split("/");
                SalNow = listDate[0];

                count = datalogin.CountErja;

                updateDateCols = datalogin.UpdateDate;

                lastUpdateDateCols = localStorage.getItem('UpdateDateCols');

                //if (lastUpdateDateCols != null && updateDateCols != null && lastUpdateDateCols < updateDateCols)
                if (lastUpdateDateCols != updateDateCols && lastUpdateDateCols != 'null') {
                    getRprtAllCols();
                    localStorage.setItem('UpdateDateCols', updateDateCols);
                }


                // if (updateDateCols != null)
                //  localStorage.setItem('UpdateDateCols', updateDateCols);

                if (count > 0) {
                    $("#notificationCount").text(count);
                    // showNotification('تعداد ' + count + ' ارجاع دریافت کرده اید ', 3, "bottom", null, 2000)
                }
                else {
                    $("#notificationCount").text('');
                }

            }
        });
    }
};


/*

AlertErja();

setInterval(AlertErja, 60000);
function AlertErja() {
    if (erjGroupApi.includes(group) == true) {
        if (accessErj != null && sessionStorage.userName != "" && sessionStorage.userName != null) {

            var aceErj = 'Web2';
            var salErj = '0000';

            var CountErjDocB_LastUri = server + '/api/Web_Data/Web_CountErjDocB_Last/';

            var DocB_LastObject = {
                erjaMode: '1',
                docBMode: '5',
                fromUserCode: '',
                toUserCode: sessionStorage.userName,
                azDocDate: '',
                taDocDate: '',
                azRjDate: '',
                taRjDate: '',
                azMhltDate: '',
                taMhltDate: '',
                status: 'فعال',
                custCode: '',
                khdtCode: '',
                srchSt: '',
            };
            ajaxFunction(CountErjDocB_LastUri + aceErj + '/' + salErj + '/' + group, 'POST', DocB_LastObject, false).done(function (response) {
                count = parseInt(response);
                if (count > 0) {
                    $("#notificationCount").text(count);
                    // showNotification('تعداد ' + count + ' ارجاع دریافت کرده اید ', 3, "bottom", null, 2000)
                }
                else {
                    $("#notificationCount").text('');
                }
            });
        }
    }
}

*/




function SetValidation() {
    var ShowMenu = [false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false];
    if (access == null) return false;
    if (access.length == 0) return false;
    sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    //sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.UserAdmin = true;
        if (sessionStorage.userName == 'ACE')
            $('#TextNoUser').text(translate('مدیر سیستم'));
        else
            $('#TextNoUser').text(translate('مدیر'));
    }
    else {
        sessionStorage.UserAdmin = false;
        $('#TextNoUser').text(translate('کاربر'));
    }

    $('#persionUserName').text(sessionStorage.userName);

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
        afiaccess[2] == 0 && afiaccess[3] == 0 &&
        afiaccess[4] == 0 && afiaccess[5] == 0)
        $("#FDOC_Menu").hide();
    else
        $("#FDOC_Menu").show();
 
 
    if (afiaccess[6] == 0 && afiaccess[7] == 0)
        $("#IDOC_Menu").hide();
    else
        $("#IDOC_Menu").show();*/

    validation = CheckAccess('DOC', localStorage.getItem('ProgAccess')); //ثبت اسناد
    ShowMenu[0] = validation;

    validation = CheckAccess('ADOC', 'Acc5'); //اسناد حسابداری
    ShowMenu[25] = validation;

    validation = CheckAccess('FSDOC', 'Fct5'); //اسناد فروش
    ShowMenu[1] = validation;

    validation = CheckAccess('FPDOC', 'Fct5'); // اسناد خرید
    ShowMenu[2] = validation;

    validation = CheckAccess('RPRT', localStorage.getItem('ProgAccess')); // گزارشات
    ShowMenu[11] = validation;

    validation = CheckAccessReport('TrzIKala', 'Inv5');
    ShowMenu[12] = validation;  // گزارش موجودی کالا

    validation = CheckAccessReport('TrzIKalaExf', 'Inv5');
    ShowMenu[13] = validation;  // گزارش موجودی کالا به تفکیک ویژگیها

    validation = CheckAccessReport('IDocR', 'Inv5');
    ShowMenu[14] = validation;  // گزارش ريز گردش اسناد انبارداری 

    validation = CheckAccessReport('FDocR_S', 'Fct5');
    ShowMenu[15] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('FDocR_P', 'Fct5');
    ShowMenu[16] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('TrzAcc', 'Acc5');
    ShowMenu[17] = validation;  // تراز دفاتر حسابداری

    validation = CheckAccessReport('Dftr', 'Acc5');
    ShowMenu[18] = validation;  // دفتر حساب حسابداری 

    validation = CheckAccessReport('ADocR', 'Acc5');
    ShowMenu[19] = validation;  // دفتر حساب روزنامه

    validation = CheckAccessReport('TChk', 'Acc5');
    ShowMenu[20] = validation;  // صورت ریز چک  

    validation = CheckAccessReport('TrzFKala_S', 'Fct5');
    ShowMenu[21] = validation;  // صورت ریز چک   

    validation = CheckAccessReport('TrzFKala_P', 'Fct5');
    ShowMenu[22] = validation;  // صورت ریز چک 

    validation = CheckAccessReport('TrzFCust_S', 'Fct5');
    ShowMenu[23] = validation;  // تراز فروش به خریداران 

    validation = CheckAccessReport('TrzFCust_P', 'Fct5');
    ShowMenu[24] = validation;  // تراز خرید از فروشندگان

    validation = CheckAccessReport('Krdx', 'Inv5');
    ShowMenu[30] = validation;  // گزارش کاردکس

    validation = CheckAccess('KALA', Fct_or_Inv);
    ShowMenu[31] = validation;  // کالاها

    validation = CheckAccess('CUST', 'Fct5');
    ShowMenu[32] = validation;  // خریداران / فروشندگان

    validation = CheckAccess('ACC', 'Acc5');
    ShowMenu[33] = validation;  // حساب ها

    validation = CheckAccess('MKZ', localStorage.getItem('ProgAccess'));
    ShowMenu[34] = validation;  // مرکز هزینه

    validation = CheckAccess('OPR', localStorage.getItem('ProgAccess'));
    ShowMenu[35] = validation;  // پروژه

    validation = CheckAccessReport('AGMkz', 'Acc5');
    ShowMenu[36] = validation;  // گردش مراکز هزینه

    validation = CheckAccessReport('AGOpr', 'Acc5');
    ShowMenu[37] = validation;  // گردش پروژه ها 

    validation = CheckAccessReport('ARZ', localStorage.getItem('ProgAccess'));
    ShowMenu[38] = validation;  // گردش ارز ها




    //localStorage.setItem("", );
    localStorage.setItem("FDoc_REP_PRICE", CheckAccessReport('FDoc_REP_PRICE', 'Fct5')); // خرید و فروش دسترسی مبلغ در گزارشات
    localStorage.setItem("IDoc_REP_PRICE", CheckAccessReport('IDoc_REP_PRICE', 'Inv5')); // دسترسی مبلغ در گزارشات انبار
    //sessionStorage.FDoc_REP_PRICE = CheckAccessReport('FDoc_REP_PRICE');
    //sessionStorage.IDoc_REP_PRICE = CheckAccessReport('IDoc_REP_PRICE');


    localStorage.setItem("VIEW_ADOC", ace == "Web1" ? true : CheckAccess('VIEW_ADOC', 'Acc5'));

    localStorage.setItem("VIEW_SFORD", ace == "Web1" ? true : CheckAccess('VIEW_SFORD', 'Fct5'));
    localStorage.setItem("VIEW_SPDOC", ace == "Web1" ? true : CheckAccess('VIEW_SPDOC', 'Fct5'));
    localStorage.setItem("VIEW_SFDOC", ace == "Web1" ? true : CheckAccess('VIEW_SFDOC', 'Fct5'));
    localStorage.setItem("VIEW_SRDOC", ace == "Web1" ? true : CheckAccess('VIEW_SRDOC', 'Fct5'));
    localStorage.setItem("VIEW_SHVL", ace == "Web1" ? true : CheckAccess('VIEW_SHVL', 'Fct5'));
    localStorage.setItem("VIEW_SEXT", ace == "Web1" ? true : CheckAccess('VIEW_SEXT', 'Fct5'));
    localStorage.setItem("VIEW_PFORD", ace == "Web1" ? true : CheckAccess('VIEW_PFORD', 'Fct5'));
    localStorage.setItem("VIEW_PPDOC", ace == "Web1" ? true : CheckAccess('VIEW_PPDOC', 'Fct5'));
    localStorage.setItem("VIEW_PFDOC", ace == "Web1" ? true : CheckAccess('VIEW_PFDOC', 'Fct5')); //VIEW_PDOC
    localStorage.setItem("VIEW_PRDOC", ace == "Web1" ? true : CheckAccess('VIEW_PRDOC', 'Fct5'));

    localStorage.setItem("VIEW_IIDOC", ace == "Web1" ? true : CheckAccess('VIEW_IIDOC', 'Inv5'));
    localStorage.setItem("VIEW_IODOC", ace == "Web1" ? true : CheckAccess('VIEW_IODOC', 'Inv5'));


    /*
    localStorage.setItem("AccessViewSanad", CheckAccess('OTHERUSER_CHG_ADOC')) 

    localStorage.setItem("AccessViewSefareshForosh", CheckAccess('OTHERUSER_CHG_SFORD')) 
    localStorage.setItem("AccessViewPishFactorForosh", CheckAccess('OTHERUSER_CHG_SPDOC')) 
    localStorage.setItem("AccessViewFactorForosh", CheckAccess('OTHERUSER_CHG_SFDOC')) 
    localStorage.setItem("AccessViewBackFactorForosh", CheckAccess('OTHERUSER_CHG_SRDOC')) 
    localStorage.setItem("AccessViewHavaleForosh", CheckAccess('OTHERUSER_CHG_SHVL')) 
    localStorage.setItem("AccessViewBargeKhoroj", CheckAccess('OTHERUSER_CHG_SEXT')) 
    localStorage.setItem("AccessViewSefareshKharid", CheckAccess('OTHERUSER_CHG_PFORD')) 
    localStorage.setItem("AccessViewPishFactorKharid", CheckAccess('OTHERUSER_CHG_PPDOC')) 
    localStorage.setItem("AccessViewFactorKharid", CheckAccess('OTHERUSER_CHG_PFDOC')) 
    localStorage.setItem("AccessViewBackFactorKharid", CheckAccess('OTHERUSER_CHG_PRDOC')) 

    localStorage.setItem("AccessViewSanadAnbarVarede", CheckAccess('OTHERUSER_CHG_IIDOC')) 
    localStorage.setItem("AccessViewSanadAnbarSadere", CheckAccess('OTHERUSER_CHG_IODOC')) 
    */

    localStorage.setItem("AccessSanad_ADOC", CheckAccess('OTHERUSER_VIEW_ADOC', 'Acc5'))

    localStorage.setItem("AccessSanad_SFORD", CheckAccess('OTHERUSER_VIEW_SFORD', 'Fct5'))
    localStorage.setItem("AccessSanad_SPDOC", CheckAccess('OTHERUSER_VIEW_SPDOC', 'Fct5'))
    localStorage.setItem("AccessSanad_SFDOC", CheckAccess('OTHERUSER_VIEW_SFDOC', 'Fct5'))
    localStorage.setItem("AccessSanad_SRDOC", CheckAccess('OTHERUSER_VIEW_SRDOC', 'Fct5'))
    localStorage.setItem("AccessSanad_SHVL", CheckAccess('OTHERUSER_VIEW_SHVL', 'Fct5'))
    localStorage.setItem("AccessSanad_SEXT", CheckAccess('OTHERUSER_VIEW_SEXT', 'Fct5'))
    localStorage.setItem("AccessSanad_PFORD", CheckAccess('OTHERUSER_VIEW_PFORD', 'Fct5'))
    localStorage.setItem("AccessSanad_PPDOC", CheckAccess('OTHERUSER_VIEW_PPDOC', 'Fct5'))
    localStorage.setItem("AccessSanad_PFDOC", CheckAccess('OTHERUSER_VIEW_PFDOC', 'Fct5'))
    localStorage.setItem("AccessSanad_PRDOC", CheckAccess('OTHERUSER_VIEW_PRDOC', 'Fct5'))

    localStorage.setItem("AccessSanad_IIDOC", CheckAccess('OTHERUSER_VIEW_IIDOC', 'Inv5'))
    localStorage.setItem("AccessSanad_IODOC", CheckAccess('OTHERUSER_VIEW_IODOC', 'Inv5'))






    /*  if (accessReport[i].Code == 'TrzIKala') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'TrzIKalaExf') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'IDocR') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'FDocR') {
          return accessReport[i].Trs;
      }*/


    // سند حسابداری
    /*  if (sessionStorage.ModeCode == 'ADOC') {
          validation = CheckAccess('NEW_ADOC');// new Sanad Hesab
          validation == true ? $("#AddNewSanad").show() : $("#AddNewSanad").hide()
  
          localStorage.setItem("moveSanad", validation);
          sessionStorage.moveSanad = validation;
  
          validation = CheckAccess('CHG_ADOC');// edit Sanad Hesab
          validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
          validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
          validation == true ? $("#UpdateSanad").show() : $("#UpdateSanad").hide()
  
          validation = CheckAccess('DEL_ADOC'); // delete Sanad Hesab
          //validation == true ? $("#DeleteSanad").show() : $("#DeleteSanad").hide()
  
          validation == true ? sessionStorage.DEL_ADOC = true : sessionStorage.DEL_ADOC = false
          validation == true ? localStorage.setItem("DEL_ADOC", "true") : localStorage.setItem("DEL_ADOC", "false")
  
  
          validation = CheckAccess('TAEED_ADOC');// AccessTaeed
          validation == true ? sessionStorage.Access_TAEED_ADOC = true : sessionStorage.Access_TAEED_ADOC = false
          validation == true ? localStorage.setItem("Access_TAEED_ADOC", "true") : localStorage.setItem("Access_TAEED_ADOC", "false")
  
          validation = CheckAccess('DAEM_ADOC');// AccessDaem
          validation == true ? sessionStorage.Access_DAEM_ADOC = true : sessionStorage.Access_DAEM_ADOC = false
          validation == true ? localStorage.setItem("Access_DAEM_ADOC", "true") : localStorage.setItem("Access_DAEM_ADOC", "false")
  
          validation = CheckAccess('OTHERUSER_VIEW_ADOC');
          validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
          validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
  
          validation = CheckAccess('PRN_ADOC'); // Print Sanad Hesab
          validation == true ? sessionStorage.AccessPrint_SanadHesab = true : sessionStorage.AccessPrint_SanadHesab = false
          validation == true ? localStorage.setItem("AccessPrint_SanadHesab", "true") : localStorage.setItem("AccessPrint_SanadHesab", "false")
  
  
          validation = CheckAccess('OTHERUSER_CHG_ADOC');// AccessViewADoc
          if (validation == true) {
              sessionStorage.AccessViewSanad = true;
              localStorage.setItem("AccessViewSanad", "true"); 
          }
          else {
              sessionStorage.AccessViewSanad = false;
              localStorage.setItem("AccessViewSanad", "false"); 
          }
      }
      */


    validation = CheckAccess('SFORD', 'Fct5');
    ShowMenu[26] = validation;  // سفارش فروش

    /*$("#AddNewFactor").hide();
    $("#TabPor").hide();
    $("#UpdateFactor").hide();
    $("#DeleteFactor").hide();*/

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SO) {
        validation = CheckAccess('NEW_SFORD');// new sefaresh forosh
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
       

        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_SFORD');// edit sefaresh forosh
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
       // validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()


        validation = CheckAccess('DEL_SFORD'); // delete sefaresh forosh

        //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SFORD = true : sessionStorage.DEL_SFORD = false
        validation == true ? localStorage.setItem("DEL_SFORD", "true") : localStorage.setItem("DEL_SFORD", "false")

        validation = CheckAccess('PRN_SFORD'); // Print 
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        validation = CheckAccess('OTHERUSER_VIEW_SFORD');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('SHOWPRICE_SFORD');// AccessPrice
        validation == true ? sessionStorage.Access_SHOWPRICE_SFORD = true : sessionStorage.Access_SHOWPRICE_SFORD = false
        validation == true ? localStorage.setItem("Access_SHOWPRICE_SFORD", "true") : localStorage.setItem("Access_SHOWPRICE_SFORD", "false")

        validation = CheckAccess('TAEED_SFORD');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_SFORD = true : sessionStorage.Access_TAEED_SFORD = false
        validation == true ? localStorage.setItem("Access_TAEED_SFORD", "true") : localStorage.setItem("Access_TAEED_SFORD", "false")

        validation = CheckAccess('CANCEL_SFORD');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_SFORD = true : sessionStorage.Access_CANCEL_SFORD = false
        validation == true ? localStorage.setItem("Access_CANCEL_SFORD", "true") : localStorage.setItem("Access_CANCEL_SFORD", "false")

        validation = CheckAccess('TASVIB_SFORD');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_SFORD = true : sessionStorage.Access_TASVIB_SFORD = false
        validation == true ? localStorage.setItem("Access_TASVIB_SFORD", "true") : localStorage.setItem("Access_TASVIB_SFORD", "false")

        validation = CheckAccess('OTHERUSER_CHG_SFORD');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSefareshForosh = true;
            localStorage.setItem("AccessViewSefareshForosh", "true")
        }
        else {
            sessionStorage.AccessViewSefareshForosh = false;
            localStorage.setItem("AccessViewSefareshForosh", "false")

        }

        validation = CheckAccess('MOVE_SFORD');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/



    validation = CheckAccess('SPDOC', 'Fct5');
    ShowMenu[3] = validation;  // پیش فاکتور قروش
    //sessionStorage.AccessSanad = true; // بعد از ایجاد دسترسی پاک شود

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SP) {
        validation = CheckAccess('NEW_SPDOC');// new pish Factor forosh
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_SPDOC');// edit pish Factor forosh
        //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

        validation = CheckAccess('DEL_SPDOC'); // delete pish Factor forosh
       // validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SPDOC = true : sessionStorage.DEL_SPDOC = false
        validation == true ? localStorage.setItem("DEL_SPDOC", "true") : localStorage.setItem("DEL_SPDOC", "false")

        validation = CheckAccess('OTHERUSER_VIEW_SPDOC');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('PRN_SPDOC'); // Print pish Factor forosh
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        //validation = CheckAccess('AccessSanad_SPDOC');// AccessSanad
        //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('SHOWPRICE_SPDOC');// AccessPrice
        validation == true ? sessionStorage.Access_SHOWPRICE_SPDOC = true : sessionStorage.Access_SHOWPRICE_SPDOC = false
        validation == true ? localStorage.setItem("Access_SHOWPRICE_SPDOC", "true") : localStorage.setItem("Access_SHOWPRICE_SPDOC", "false")

        validation = CheckAccess('TAEED_SPDOC');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_SPDOC = true : sessionStorage.Access_TAEED_SPDOC = false
        validation == true ? localStorage.setItem("Access_TAEED_SPDOC", "true") : localStorage.setItem("Access_TAEED_SPDOC", "false")

        validation = CheckAccess('CANCEL_SPDOC');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_SPDOC = true : sessionStorage.Access_CANCEL_SPDOC = false
        validation == true ? localStorage.setItem("Access_CANCEL_SPDOC", "true") : localStorage.setItem("Access_CANCEL_SPDOC", "false")

        validation = CheckAccess('TASVIB_SPDOC');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_SPDOC = true : sessionStorage.Access_TASVIB_SPDOC = false
        validation == true ? localStorage.setItem("Access_TASVIB_SPDOC", "true") : localStorage.setItem("Access_TASVIB_SPDOC", "false")


        validation = CheckAccess('OTHERUSER_CHG_SPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorForosh = true;
            localStorage.setItem("AccessViewPishFactorForosh", "true")
        }
        else {
            sessionStorage.AccessViewPishFactorForosh = false;
            localStorage.setItem("AccessViewPishFactorForosh", "false")
        }

        validation = CheckAccess('MOVE_SPDOC');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/

    // OTHERUSER_SDOC

    validation = CheckAccess('SFDOC', 'Fct5');
    ShowMenu[4] = validation;  //  فاکتور قروش

    /*  if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_S) {
         validation = CheckAccess('NEW_SFDOC');// new Factor forosh
         //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
         //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
         sessionStorage.newFactor = validation;
         localStorage.setItem("newFactor", validation);
 
         validation = CheckAccess('CHG_SFDOC');// edit Factor forosh
         validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
         validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
         //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
 
 
         validation = CheckAccess('DEL_SFDOC'); // delete Factor forosh
         //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
         validation == true ? sessionStorage.DEL_SDOC = true : sessionStorage.DEL_SDOC = false
         validation == true ? localStorage.setItem("DEL_SDOC", "true") : localStorage.setItem("DEL_SDOC", "false")
 
         validation = CheckAccess('PRN_SFDOC'); // Print Factor forosh
         validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
         validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")
 
         validation = CheckAccess('OTHERUSER_VIEW_SFDOC');// AccessSanad
         validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
         validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
         //sessionStorage.AccessSanad = true;
 
         validation = CheckAccess('SHOWPRICE_SFDOC');// AccessPrice
         validation == true ? sessionStorage.Access_SHOWPRICE_SFDOC = true : sessionStorage.Access_SHOWPRICE_SFDOC = false
         validation == true ? localStorage.setItem("Access_SHOWPRICE_SFDOC", "true") : localStorage.setItem("Access_SHOWPRICE_SFDOC", "false")
 
         validation = CheckAccess('TAEED_SFDOC');// AccessTaeed
         validation == true ? sessionStorage.Access_TAEED_SFDOC = true : sessionStorage.Access_TAEED_SFDOC = false
         validation == true ? localStorage.setItem("Access_TAEED_SFDOC", "true") : localStorage.setItem("Access_TAEED_SFDOC", "false")
 
         validation = CheckAccess('CANCEL_SFDOC');// AccessCANCEL  باطل
         validation == true ? sessionStorage.Access_CANCEL_SFDOC = true : sessionStorage.Access_CANCEL_SFDOC = false
         validation == true ? localStorage.setItem("Access_CANCEL_SFDOC", "true") : localStorage.setItem("Access_CANCEL_SFDOC", "false")
 
         validation = CheckAccess('TASVIB_SFDOC');// AccessTasvib
         validation == true ? sessionStorage.Access_TASVIB_SFDOC = true : sessionStorage.Access_TASVIB_SFDOC = false
         validation == true ? localStorage.setItem("Access_TASVIB_SFDOC", "true") : localStorage.setItem("Access_TASVIB_SFDOC", "false")
 
 
         validation = CheckAccess('OTHERUSER_CHG_SFDOC');// AccessViewSanad
         if (validation == true) {
             sessionStorage.AccessViewFactorForosh = true;
             localStorage.setItem("AccessViewFactorForosh", "true")
         }
         else {
             sessionStorage.AccessViewFactorForosh = false;
             localStorage.setItem("AccessViewFactorForosh", "false")
         }
 
         validation = CheckAccess('MOVE_SFDOC');
         validation == true ? $("#TabMove").show() : $("#TabMove").hide()
         sessionStorage.moveFactor = validation;
         localStorage.setItem("moveFactor", validation);
     }*/

    validation = CheckAccess('SRDOC', 'Fct5');
    ShowMenu[5] = validation;  // برگشت فاکتور قروش

    /*  if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR) {
         validation = CheckAccess('NEW_SRDOC');// new back Factor forosh
         //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
         //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
         sessionStorage.newFactor = validation;
         localStorage.setItem("newFactor", validation);
 
         validation = CheckAccess('CHG_SRDOC');// edit back Factor forosh
         //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
         validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
         validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
 
         validation = CheckAccess('DEL_SRDOC'); // delete back Factor forosh
         //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
         validation == true ? sessionStorage.DEL_SRDOC = true : sessionStorage.DEL_SRDOC = false
         validation == true ? localStorage.setItem("DEL_SRDOC", "true") : localStorage.setItem("DEL_SRDOC", "false")
 
         validation = CheckAccess('PRN_SRDOC'); // Print back Factor forosh
         validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
         validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")
 
         validation = CheckAccess('OTHERUSER_VIEW_SRDOC');// AccessSanad
         validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
         validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
 
         validation = CheckAccess('SHOWPRICE_SRDOC');// AccessPrice
         validation == true ? sessionStorage.Access_SHOWPRICE_SRDOC = true : sessionStorage.Access_SHOWPRICE_SRDOC = false
         validation == true ? localStorage.setItem("Access_SHOWPRICE_SRDOC", "true") : localStorage.setItem("Access_SHOWPRICE_SRDOC", "false")
 
         validation = CheckAccess('TAEED_SRDOC');// AccessTaeed
         validation == true ? sessionStorage.Access_TAEED_SRDOC = true : sessionStorage.Access_TAEED_SRDOC = false
         validation == true ? localStorage.setItem("Access_TAEED_SRDOC", "true") : localStorage.setItem("Access_TAEED_SRDOC", "false")
 
         validation = CheckAccess('CANCEL_SFDOC');// AccessCANCEL  باطل
         validation == true ? sessionStorage.Access_CANCEL_SFDOC = true : sessionStorage.Access_CANCEL_SFDOC = false
         validation == true ? localStorage.setItem("Access_CANCEL_SFDOC", "true") : localStorage.setItem("Access_CANCEL_SFDOC", "false")
 
 
         validation = CheckAccess('TASVIB_SRDOC');// AccessTasvib
         validation == true ? sessionStorage.Access_TASVIB_SRDOC = true : sessionStorage.Access_TASVIB_SRDOC = false
         validation == true ? localStorage.setItem("Access_TASVIB_SRDOC", "true") : localStorage.setItem("Access_TASVIB_SRDOC", "false")
 
         validation = CheckAccess('OTHERUSER_CHG_SRDOC');// AccessViewSanad
         if (validation == true) {
             sessionStorage.AccessViewBackFactorForosh = true;
             localStorage.setItem("AccessViewBackFactorForosh", "true")
         }
         else {
             sessionStorage.AccessViewBackFactorForosh = false;
             localStorage.setItem("AccessViewBackFactorForosh", "false")
         }
 
         validation = CheckAccess('MOVE_SRDOC');
         validation == true ? $("#TabMove").show() : $("#TabMove").hide()
         sessionStorage.moveFactor = validation;
         localStorage.setItem("moveFactor", validation);
     }*/


    validation = CheckAccess('SHVL', 'Fct5');
    ShowMenu[27] = validation;  // حواله فروش

    /*  if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH) {
         validation = CheckAccess('NEW_SHVL');// new 
         //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
         //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
         sessionStorage.newFactor = validation;
         localStorage.setItem("newFactor", validation);
 
         validation = CheckAccess('CHG_SHVL');// edit
         //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
         validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
         validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
 
         validation = CheckAccess('DEL_SHVL'); // delete 
         //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
         validation == true ? sessionStorage.DEL_SHVL = true : sessionStorage.DEL_SHVL = false
         validation == true ? localStorage.setItem("DEL_SHVL", "true") : localStorage.setItem("DEL_SHVL", "false")
 
         validation = CheckAccess('PRN_SHVL'); // Print
         validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
         validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")
 
         validation = CheckAccess('OTHERUSER_VIEW_SHVL');
         validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
         validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
 
         validation = CheckAccess('TAEED_SHVL');// AccessTaeed
         validation == true ? sessionStorage.Access_TAEED_SHVL = true : sessionStorage.Access_TAEED_SHVL = false
         validation == true ? localStorage.setItem("Access_TAEED_SHVL", "true") : localStorage.setItem("Access_TAEED_SHVL", "false")
 
         validation = CheckAccess('CANCEL_SFDOC');// AccessCANCEL  باطل
         validation == true ? sessionStorage.Access_CANCEL_SFDOC = true : sessionStorage.Access_CANCEL_SFDOC = false
         validation == true ? localStorage.setItem("Access_CANCEL_SFDOC", "true") : localStorage.setItem("Access_CANCEL_SFDOC", "false")
 
         validation = CheckAccess('TASVIB_SHVL');// AccessTasvib
         validation == true ? sessionStorage.Access_TASVIB_SHVL = true : sessionStorage.Access_TASVIB_SHVL = false
         validation == true ? localStorage.setItem("Access_TASVIB_SHVL", "true") : localStorage.setItem("Access_TASVIB_SHVL", "false")
 
 
         validation = CheckAccess('OTHERUSER_CHG_SHVL');
         if (validation == true) {
             sessionStorage.AccessViewHavaleForosh = true;
             localStorage.setItem("AccessViewHavaleForosh", "true")
         }
         else {
             sessionStorage.AccessViewHavaleForosh = false;
             localStorage.setItem("AccessViewHavaleForosh", "false")
         }
 
         validation = CheckAccess('MOVE_SHVL');
         validation == true ? $("#TabMove").show() : $("#TabMove").hide()
         sessionStorage.moveFactor = validation;
         localStorage.setItem("moveFactor", validation);
     }*/


    validation = CheckAccess('SEXT', 'Fct5');
    ShowMenu[28] = validation;  //برگه خروج 

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {
        validation = CheckAccess('NEW_SEXT');// new 
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_SEXT');// edit 
        //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

        validation = CheckAccess('DEL_SEXT'); // delete 
        //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SEXT = true : sessionStorage.DEL_SEXT = false
        validation == true ? localStorage.setItem("DEL_SEXT", "true") : localStorage.setItem("DEL_SEXT", "false")

        validation = CheckAccess('PRN_SEXT'); // Print
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        validation = CheckAccess('OTHERUSER_VIEW_SEXT');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('TAEED_SEXT');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_SEXT = true : sessionStorage.Access_TAEED_SEXT = false
        validation == true ? localStorage.setItem("Access_TAEED_SEXT", "true") : localStorage.setItem("Access_TAEED_SEXT", "false")

        validation = CheckAccess('CANCEL_SEXT');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_SEXT = true : sessionStorage.Access_CANCEL_SEXT = false
        validation == true ? localStorage.setItem("Access_CANCEL_SEXT", "true") : localStorage.setItem("Access_CANCEL_SEXT", "false")

        validation = CheckAccess('TASVIB_SEXT');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_SEXT = true : sessionStorage.Access_TASVIB_SEXT = false
        validation == true ? localStorage.setItem("Access_TASVIB_SEXT", "true") : localStorage.setItem("Access_TASVIB_SEXT", "false")


        validation = CheckAccess('OTHERUSER_CHG_SEXT');
        if (validation == true) {
            sessionStorage.AccessViewBargeKhoroj = true;
            localStorage.setItem("AccessViewBargeKhoroj", "true")
        }
        else {
            sessionStorage.AccessViewBargeKhoroj = false;
            localStorage.setItem("AccessViewBargeKhoroj", "false")
        }

        validation = CheckAccess('MOVE_SEXT');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/


    validation = CheckAccess('PFORD', 'Fct5');
    ShowMenu[29] = validation;  // سفارش خرید

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PO) {
        validation = CheckAccess('NEW_PFORD');// new
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_PFORD');// edit
        //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

        validation = CheckAccess('DEL_PFORD'); // delete
        //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PFORD = true : sessionStorage.DEL_PFORD = false
        validation == true ? localStorage.setItem("DEL_PFORD", "true") : localStorage.setItem("DEL_PFORD", "false")

        validation = CheckAccess('PRN_PFORD'); // Print
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        validation = CheckAccess('OTHERUSER_VIEW_PFORD');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('SHOWPRICE_PFORD');// AccessPrice
        validation == true ? sessionStorage.Access_SHOWPRICE_PFORD = true : sessionStorage.Access_SHOWPRICE_PFORD = false
        validation == true ? localStorage.setItem("Access_SHOWPRICE_PFORD", "true") : localStorage.setItem("Access_SHOWPRICE_PFORD", "false")

        validation = CheckAccess('TAEED_PFORD');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_PFORD = true : sessionStorage.Access_TAEED_PFORD = false
        validation == true ? localStorage.setItem("Access_TAEED_PFORD", "true") : localStorage.setItem("Access_TAEED_PFORD", "false")

        validation = CheckAccess('CANCEL_SEXT');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_SEXT = true : sessionStorage.Access_CANCEL_SEXT = false
        validation == true ? localStorage.setItem("Access_CANCEL_SEXT", "true") : localStorage.setItem("Access_CANCEL_SEXT", "false")

        validation = CheckAccess('TASVIB_PFORD');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_PFORD = true : sessionStorage.Access_TASVIB_PFORD = false
        validation == true ? localStorage.setItem("Access_TASVIB_PFORD", "true") : localStorage.setItem("Access_TASVIB_PFORD", "false")


        validation = CheckAccess('OTHERUSER_CHG_PFORD');
        if (validation == true) {
            sessionStorage.AccessViewSefareshKharid = true;
            localStorage.setItem("AccessViewSefareshKharid", "true")
        }
        else {
            sessionStorage.AccessViewSefareshKharid = false;
            localStorage.setItem("AccessViewSefareshKharid", "false")
        }

        validation = CheckAccess('MOVE_PFORD');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/



    validation = CheckAccess('PPDOC', 'Fct5');
    ShowMenu[6] = validation;  // پیش فاکتور خرید

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PP) {
        validation = CheckAccess('NEW_PPDOC');// new pish Factor kharid
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_PPDOC');// edit pish Factor kharid
        //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

        validation = CheckAccess('DEL_PPDOC'); // delete pish Factor kharid
        //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PPDOC = true : sessionStorage.DEL_PPDOC = false
        validation == true ? localStorage.setItem("DEL_PPDOC", "true") : localStorage.setItem("DEL_PPDOC", "false")

        validation = CheckAccess('PRN_PPDOC'); // Print pish Factor kharid
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        //validation = CheckAccess('OTHERUSER_PPDOC');// AccessSanad
        //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_VIEW_PPDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('SHOWPRICE_PPDOC');// AccessPrice
        validation == true ? sessionStorage.Access_SHOWPRICE_PPDOC = true : sessionStorage.Access_SHOWPRICE_PPDOC = false
        validation == true ? localStorage.setItem("Access_SHOWPRICE_PPDOC", "true") : localStorage.setItem("Access_SHOWPRICE_PPDOC", "false")

        validation = CheckAccess('TAEED_PPDOC');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_PPDOC = true : sessionStorage.Access_TAEED_PPDOC = false
        validation == true ? localStorage.setItem("Access_TAEED_PPDOC", "true") : localStorage.setItem("Access_TAEED_PPDOC", "false")

        validation = CheckAccess('CANCEL_PPDOC');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_PPDOC = true : sessionStorage.Access_CANCEL_PPDOC = false
        validation == true ? localStorage.setItem("Access_CANCEL_PPDOC", "true") : localStorage.setItem("Access_CANCEL_PPDOC", "false")

        validation = CheckAccess('TASVIB_PPDOC');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_PPDOC = true : sessionStorage.Access_TASVIB_PPDOC = false
        validation == true ? localStorage.setItem("Access_TASVIB_PPDOC", "true") : localStorage.setItem("Access_TASVIB_PPDOC", "false")

        validation = CheckAccess('OTHERUSER_CHG_PPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorKharid = true;
            localStorage.setItem("AccessViewPishFactorKharid", "true")
        }
        else {
            sessionStorage.AccessViewPishFactorKharid = false;
            localStorage.setItem("AccessViewPishFactorKharid", "false")
        }

        validation = CheckAccess('MOVE_PPDOC');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/

    validation = CheckAccess('PFDOC', 'Fct5');
    ShowMenu[7] = validation;  //  فاکتور خرید

    /* if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_P) {
        validation = CheckAccess('NEW_PFDOC');// new Factor kharid
        //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
        sessionStorage.newFactor = validation;
        localStorage.setItem("newFactor", validation);

        validation = CheckAccess('CHG_PFDOC');// edit Factor kharid
        //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

        validation = CheckAccess('DEL_PFDOC'); // delete Factor kharid
        //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PDOC = true : sessionStorage.DEL_PDOC = false
        validation == true ? localStorage.setItem("DEL_PDOC", "true") : localStorage.setItem("DEL_PDOC", "false")

        validation = CheckAccess('PRN_PFDOC'); // Print Factor kharid
        validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
        validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")

        validation = CheckAccess('OTHERUSER_VIEW_PFDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

        validation = CheckAccess('SHOWPRICE_PFDOC');// AccessPrice
        validation == true ? sessionStorage.Access_SHOWPRICE_PFDOC = true : sessionStorage.Access_SHOWPRICE_PFDOC = false
        validation == true ? localStorage.setItem("Access_SHOWPRICE_PFDOC", "true") : localStorage.setItem("Access_SHOWPRICE_PFDOC", "false")

        validation = CheckAccess('TAEED_PFDOC');// AccessTaeed
        validation == true ? sessionStorage.Access_TAEED_PFDOC = true : sessionStorage.Access_TAEED_PFDOC = false
        validation == true ? localStorage.setItem("Access_TAEED_PFDOC", "true") : localStorage.setItem("Access_TAEED_PFDOC", "false")

        validation = CheckAccess('CANCEL_PFDOC');// AccessCANCEL  باطل
        validation == true ? sessionStorage.Access_CANCEL_PFDOC = true : sessionStorage.Access_CANCEL_PFDOC = false
        validation == true ? localStorage.setItem("Access_CANCEL_PFDOC", "true") : localStorage.setItem("Access_CANCEL_PFDOC", "false")

        validation = CheckAccess('TASVIB_PFDOC');// AccessTasvib
        validation == true ? sessionStorage.Access_TASVIB_PFDOC = true : sessionStorage.Access_TASVIB_PFDOC = false
        validation == true ? localStorage.setItem("Access_TASVIB_PFDOC", "true") : localStorage.setItem("Access_TASVIB_PFDOC", "false")

        validation = CheckAccess('OTHERUSER_CHG_PFDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewFactorKharid = true;
            localStorage.setItem("AccessViewFactorKharid", "true")
        }
        else {
            sessionStorage.AccessViewFactorKharid = false;
            localStorage.setItem("AccessViewFactorKharid", "false")
        }

        validation = CheckAccess('MOVE_PFDOC');
        validation == true ? $("#TabMove").show() : $("#TabMove").hide()
        sessionStorage.moveFactor = validation;
        localStorage.setItem("moveFactor", validation);
    }*/


    validation = CheckAccess('PRDOC', 'Fct5');
    ShowMenu[8] = validation;  // برگشت فاکتور خرید

    /*  if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
          validation = CheckAccess('NEW_PRDOC');// new back Factor kharid
          //validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
          //validation == true ? $("#TabPor").show() : $("#TabPor").hide()
          sessionStorage.newFactor = validation;
          localStorage.setItem("newFactor", validation);
  
          validation = CheckAccess('CHG_PRDOC');// edit back Factor kharid
          //validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
          validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
          validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
  
  
          validation = CheckAccess('DEL_PRDOC'); // delete back Factor kharid
          //validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
          validation == true ? sessionStorage.DEL_PRDOC = true : sessionStorage.DEL_PRDOC = false
          validation == true ? localStorage.setItem("DEL_PRDOC", "true") : localStorage.setItem("DEL_PRDOC", "false")
  
          validation = CheckAccess('PRN_PRDOC'); // Print back Factor kharid
          validation == true ? sessionStorage.AccessPrint_Factor = true : sessionStorage.AccessPrint_Factor = false
          validation == true ? localStorage.setItem("AccessPrint_Factor", "true") : localStorage.setItem("AccessPrint_Factor", "false")
  
          validation = CheckAccess('OTHERUSER_VIEW_PRDOC');// AccessSanad
          validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
          validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
  
          validation = CheckAccess('SHOWPRICE_PRDOC');// AccessPrice
          validation == true ? sessionStorage.Access_SHOWPRICE_PRDOC = true : sessionStorage.Access_SHOWPRICE_PRDOC = false
          validation == true ? localStorage.setItem("Access_SHOWPRICE_PRDOC", "true") : localStorage.setItem("Access_SHOWPRICE_PRDOC", "false")
  
          validation = CheckAccess('TAEED_PRDOC');// AccessTaeed
          validation == true ? sessionStorage.Access_TAEED_PRDOC = true : sessionStorage.Access_TAEED_PRDOC = false
          validation == true ? localStorage.setItem("Access_TAEED_PRDOC", "true") : localStorage.setItem("Access_TAEED_PRDOC", "false")
  
          validation = CheckAccess('CANCEL_PRDOC');// AccessCANCEL  باطل
          validation == true ? sessionStorage.Access_CANCEL_PRDOC = true : sessionStorage.Access_CANCEL_PRDOC = false
          validation == true ? localStorage.setItem("Access_CANCEL_PRDOC", "true") : localStorage.setItem("Access_CANCEL_PRDOC", "false")
  
          validation = CheckAccess('TASVIB_PRDOC');// AccessTasvib
          validation == true ? sessionStorage.Access_TASVIB_PRDOC = true : sessionStorage.Access_TASVIB_PRDOC = false
          validation == true ? localStorage.setItem("Access_TASVIB_PRDOC", "true") : localStorage.setItem("Access_TASVIB_PRDOC", "false")
  
          validation = CheckAccess('OTHERUSER_CHG_PRDOC');// AccessViewSanad
          if (validation == true) {
              sessionStorage.AccessViewBackFactorKharid = true;
              localStorage.setItem("AccessViewBackFactorKharid", "true")
          }
          else {
              sessionStorage.AccessViewBackFactorKharid = false;
              localStorage.setItem("AccessViewBackFactorKharid", "false")
          }
  
          validation = CheckAccess('MOVE_PRDOC');
          validation == true ? $("#TabMove").show() : $("#TabMove").hide()
          sessionStorage.moveFactor = validation;
          localStorage.setItem("moveFactor", validation);
  
      }*/







    validation = CheckAccess('IIDOC', 'Inv5');
    ShowMenu[9] = validation;  // وارده انبار

    /*   if (sessionStorage.ModeCode == '' && sessionStorage.InOut == 1) {
           validation = CheckAccess('NEW_IIDOC');// new varedae anbar
           validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
           sessionStorage.moveSanadAnbar = validation;
           localStorage.setItem("moveSanadAnbar", validation);
   
           validation = CheckAccess('CHG_IIDOC');// edit varedae anbar
           validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
           validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
           validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
   
           validation = CheckAccess('DEL_IIDOC'); // delete varedae anbar
           validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
           validation == true ? sessionStorage.DEL_IIDOC = true : sessionStorage.DEL_IIDOC = false
           validation == true ? localStorage.setItem("DEL_IIDOC", "true") : localStorage.setItem("DEL_IIDOC", "false")
   
           validation = CheckAccess('PRN_IIDOC'); // Print
           validation == true ? sessionStorage.AccessPrint_SanadAnbar = true : sessionStorage.AccessPrint_SanadAnbar = false
           validation == true ? localStorage.setItem("AccessPrint_SanadAnbar", "true") : localStorage.setItem("AccessPrint_SanadAnbar", "false")
   
   
           validation = CheckAccess('SHOWPRICE_IIDOC');// AccessPrice
           validation == true ? sessionStorage.Access_SHOWPRICE_IIDOC = true : sessionStorage.Access_SHOWPRICE_IIDOC = false
           validation == true ? localStorage.setItem("Access_SHOWPRICE_IIDOC", "true") : localStorage.setItem("Access_SHOWPRICE_IIDOC", "false")
   
           validation = CheckAccess('TAEED_IIDOC');// AccessTaeed
           validation == true ? sessionStorage.Access_TAEED_IIDOC = true : sessionStorage.Access_TAEED_IIDOC = false
           validation == true ? localStorage.setItem("Access_TAEED_IIDOC", "true") : localStorage.setItem("Access_TAEED_IIDOC", "false")
   
           validation = CheckAccess('CANCEL_IIDOC');// AccessCANCEL  باطل
           validation == true ? sessionStorage.Access_CANCEL_IIDOC = true : sessionStorage.Access_CANCEL_IIDOC = false
           validation == true ? localStorage.setItem("Access_CANCEL_IIDOC", "true") : localStorage.setItem("Access_CANCEL_IIDOC", "false")
   
           validation = CheckAccess('TASVIB_IIDOC');// AccessTasvib
           validation == true ? sessionStorage.Access_TASVIB_IIDOC = true : sessionStorage.Access_TASVIB_IIDOC = false
           validation == true ? localStorage.setItem("Access_TASVIB_IIDOC", "true") : localStorage.setItem("Access_TASVIB_IIDOC", "false")
   
   
           validation = CheckAccess('OTHERUSER_VIEW_IIDOC');// AccessSanad
           validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
           validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
   
           validation = CheckAccess('OTHERUSER_CHG_IIDOC');// AccessViewSanad
           if (validation == true) {
               sessionStorage.AccessViewSanadAnbarVarede = true;
               localStorage.setItem("AccessViewSanadAnbarVarede", "true")
           }
           else {
               sessionStorage.AccessViewSanadAnbarVarede = false;
               localStorage.setItem("AccessViewSanadAnbarVarede", "false")
           }
       }*/

    validation = CheckAccess('IODOC', 'Inv5');
    ShowMenu[10] = validation;  // صادره انبار

    /*  if (sessionStorage.ModeCode == '' && sessionStorage.InOut == 2) {
          validation = CheckAccess('NEW_IODOC');// new sadere anbar
          validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
          sessionStorage.moveSanadAnbar = validation;
          localStorage.setItem("moveSanadAnbar", validation);
  
  
          validation = CheckAccess('CHG_IODOC');// edit sadere anbar
          validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
          validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
          validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
  
          validation = CheckAccess('DEL_IODOC'); // delete sadere anbar
          validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
          validation == true ? sessionStorage.DEL_IODOC = true : sessionStorage.DEL_IODOC = false
          validation == true ? localStorage.setItem("DEL_IODOC", "true") : localStorage.setItem("DEL_IODOC", "false")
  
          validation = CheckAccess('PRN_IODOC'); // Print
          validation == true ? sessionStorage.AccessPrint_SanadAnbar = true : sessionStorage.AccessPrint_SanadAnbar = false
          validation == true ? localStorage.setItem("AccessPrint_SanadAnbar", "true") : localStorage.setItem("AccessPrint_SanadAnbar", "false")
  
  
          validation = CheckAccess('SHOWPRICE_IODOC');// AccessPrice
          validation == true ? sessionStorage.Access_SHOWPRICE_IODOC = true : sessionStorage.Access_SHOWPRICE_IODOC = false
          validation == true ? localStorage.setItem("Access_SHOWPRICE_IODOC", "true") : localStorage.setItem("Access_SHOWPRICE_IODOC", "false")
  
          validation = CheckAccess('TAEED_IODOC');// AccessTaeed
          validation == true ? sessionStorage.Access_TAEED_IODOC = true : sessionStorage.Access_TAEED_IODOC = false
          validation == true ? localStorage.setItem("Access_TAEED_IODOC", "true") : localStorage.setItem("Access_TAEED_IODOC", "false")
  
          validation = CheckAccess('CANCEL_IODOC');// AccessCANCEL  باطل
          validation == true ? sessionStorage.Access_CANCEL_IODOC = true : sessionStorage.Access_CANCEL_IODOC = false
          validation == true ? localStorage.setItem("Access_CANCEL_IODOC", "true") : localStorage.setItem("Access_CANCEL_IODOC", "false")
  
          validation = CheckAccess('TASVIB_IODOC');// AccessTasvib
          validation == true ? sessionStorage.Access_TASVIB_IODOC = true : sessionStorage.Access_TASVIB_IODOC = false
          validation == true ? localStorage.setItem("Access_TASVIB_IODOC", "true") : localStorage.setItem("Access_TASVIB_IODOC", "false")
  
          validation = CheckAccess('OTHERUSER_VIEW_IODOC');// AccessSanad
          validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
          validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
  
          validation = CheckAccess('OTHERUSER_CHG_IODOC');// AccessViewSanad
          if (validation == true) {
              sessionStorage.AccessViewSanadAnbarSadere = true;
              localStorage.setItem("AccessViewSanadAnbarSadere", "true")
          }
          else {
              sessionStorage.AccessViewSanadAnbarSadere = false;
              localStorage.setItem("AccessViewSanadAnbarSadere", "false")
          }
  
      }*/

    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.AccessSanad = true;
        localStorage.setItem("AccessSanad", "true");
        //localStorage.setItem("AccessViewSanadAnbarVarede", "true")
        //sessionStorage.AccessViewSanadAnbarVarede = true;
    }



    if (afiaccess[27] == true || afiaccess[28] == true || afiaccess[29] == true || afiaccess[30] == true || afiaccess[31] == true || afiaccess[34] == true) {
        if (ShowMenu[31] || ShowMenu[32] || ShowMenu[33] || ShowMenu[34] || ShowMenu[35] || ShowMenu[38]) {
            $("#Base_Menu").show();
            (ShowMenu[31] == true) && (afiaccess[27] == true) ? $("#BaseKala").show() : $("#BaseKala").hide();
            (ShowMenu[32] == true) && (afiaccess[28] == true) ? $("#BaseCust").show() : $("#BaseCust").hide();
            (ShowMenu[33] == true) && (afiaccess[29] == true) ? $("#BaseAcc").show() : $("#BaseAcc").hide();
            (ShowMenu[34] == true) && (afiaccess[30] == true) ? $("#BaseMkz").show() : $("#BaseMkz").hide();
            (ShowMenu[35] == true) && (afiaccess[31] == true) ? $("#BaseOpr").show() : $("#BaseOpr").hide();
            (ShowMenu[38] == true) && (afiaccess[34] == true) ? $("#BaseArz").show() : $("#BaseArz").hide();
        }
        else {
            $("#Base_Menu").hide();
        }
    }
    else {
        $("#Base_Menu").hide();
    }

    if (ShowMenu[0]) {
        if (afiaccess[21] == true) {
            if (ShowMenu[25]) {
                $("#ADOC_Menu").show();
                (ShowMenu[25] == true) && (afiaccess[21] == true) ? $("#ADOC").show() : $("#ADOC").hide();
            }
            else {
                $("#ADOC_Menu").hide();
            }
        }
        else {
            $("#ADOC_Menu").hide();
        }

        if (afiaccess[0] == true || afiaccess[1] == true || afiaccess[2] == true || afiaccess[3] == true || afiaccess[4] == true || afiaccess[5] == true
            || afiaccess[22] == true || afiaccess[23] == true || afiaccess[24] == true || afiaccess[25] == true) {
            if (ShowMenu[1] || ShowMenu[2]) {
                if (ShowMenu[3] || ShowMenu[4] || ShowMenu[5] || ShowMenu[6] || ShowMenu[7] || ShowMenu[8] || ShowMenu[26] || ShowMenu[27] || ShowMenu[28] || ShowMenu[29]) {
                    $("#FDOC_Menu").show();
                    (ShowMenu[3] == true) && (afiaccess[1] == true) ? $("#FDOC_SP").show() : $("#FDOC_SP").hide();
                    (ShowMenu[4] == true) && (afiaccess[0] == true) ? $("#FDOC_S").show() : $("#FDOC_S").hide();
                    (ShowMenu[5] == true) && (afiaccess[2] == true) ? $("#FDOC_SR").show() : $("#FDOC_SR").hide();
                    (ShowMenu[6] == true) && (afiaccess[3] == true) ? $("#FDOC_PP").show() : $("#FDOC_PP").hide();
                    (ShowMenu[7] == true) && (afiaccess[4] == true) ? $("#FDOC_P").show() : $("#FDOC_P").hide();
                    (ShowMenu[8] == true) && (afiaccess[5] == true) ? $("#FDOC_PR").show() : $("#FDOC_PR").hide();

                    (ShowMenu[26] == true) && (afiaccess[22] == true) ? $("#FDOC_SO").show() : $("#FDOC_SO").hide(); //سفارش فروش
                    (ShowMenu[27] == true) && (afiaccess[23] == true) ? $("#FDOC_SH").show() : $("#FDOC_SH").hide(); //حواله فروش
                    (ShowMenu[28] == true) && (afiaccess[24] == true) ? $("#FDOC_SE").show() : $("#FDOC_SE").hide(); //برگه خروج
                    (ShowMenu[29] == true) && (afiaccess[25] == true) ? $("#FDOC_PO").show() : $("#FDOC_PO").hide();// سفارش خرید 
                }
                else {
                    $("#FDOC_Menu").hide();
                }
            }
            else {
                $("#FDOC_Menu").hide();
            }
        }
        else {
            $("#FDOC_Menu").hide();
        }


        if (afiaccess[6] == true || afiaccess[7] == true) {
            if (ShowMenu[9] || ShowMenu[10]) {
                $("#IDOC_Menu").show();
                (ShowMenu[9] == true) && (afiaccess[6] == true) ? $("#IDOC_I").show() : $("#IDOC_I").hide();
                (ShowMenu[10] == true) && (afiaccess[7] == true) ? $("#IDOC_O").show() : $("#IDOC_O").hide();
            }
            else {
                $("#IDOC_Menu").hide();
            }
        }
        else {
            $("#IDOC_Menu").hide();
        }
    }
    else {
        $("#ADOC_Menu").hide();
        $("#FDOC_Menu").hide();
        $("#IDOC_Menu").hide();
    }

    if (ShowMenu[11]) {    // گزارشات
        if (afiaccess[8] || afiaccess[9] || afiaccess[10] || afiaccess[26]) {
            $("#IReport_Menu").show();
            afiaccess[8] && ShowMenu[12] ? $("#TrzIKala").show() : $("#TrzIKala").hide();
            afiaccess[9] && ShowMenu[13] ? $("#TrzIKalaExf").show() : $("#TrzIKalaExf").hide();
            afiaccess[10] && ShowMenu[14] ? $("#IDocR").show() : $("#IDocR").hide();
            afiaccess[26] && ShowMenu[30] ? $("#Krdx").show() : $("#Krdx").hide();

            if (ShowMenu[12] == false && ShowMenu[13] == false && ShowMenu[14] == false && ShowMenu[30] == false)
                $("#IReport_Menu").hide();
        }
        else {
            $("#IReport_Menu").hide();
        }

        if (afiaccess[11] || afiaccess[12] || afiaccess[17] || afiaccess[18] || afiaccess[19] || afiaccess[20]) {
            $("#FReport_Menu").show();
            afiaccess[11] && ShowMenu[15] ? $("#FDocR_S").show() : $("#FDocR_S").hide();
            afiaccess[12] && ShowMenu[16] ? $("#FDocR_P").show() : $("#FDocR_P").hide();
            afiaccess[17] && ShowMenu[21] ? $("#TrzFKala_S").show() : $("#TrzFKala_S").hide();
            afiaccess[18] && ShowMenu[22] ? $("#TrzFKala_P").show() : $("#TrzFKala_P").hide();
            afiaccess[19] && ShowMenu[23] ? $("#TrzFCust_S").show() : $("#TrzFCust_S").hide();
            afiaccess[20] && ShowMenu[24] ? $("#TrzFCust_P").show() : $("#TrzFCust_P").hide();


            if (ShowMenu[15] == false && ShowMenu[16] == false && ShowMenu[21] == false && ShowMenu[22] == false && ShowMenu[23] == false && ShowMenu[24] == false)
                $("#FReport_Menu").hide();
        }
        else {
            $("#FReport_Menu").hide();
        }

        if (afiaccess[13] || afiaccess[14] || afiaccess[15] || afiaccess[16] || afiaccess[32] || afiaccess[33]) {
            $("#AReport_Menu").show();
            afiaccess[13] && ShowMenu[17] == true ? $("#TrzAcc").show() : $("#TrzAcc").hide();
            afiaccess[14] && ShowMenu[18] == true ? $("#Dftr").show() : $("#Dftr").hide();
            afiaccess[15] && ShowMenu[19] == true ? $("#ADocR").show() : $("#ADocR").hide();
            afiaccess[16] && ShowMenu[20] == true ? $("#TChk").show() : $("#TChk").hide();

            afiaccess[32] && ShowMenu[36] == true ? $("#AGMkz").show() : $("#AGMkz").hide();
            afiaccess[33] && ShowMenu[37] == true ? $("#AGOpr").show() : $("#AGOpr").hide();

            if (ShowMenu[17] == false && ShowMenu[18] == false && ShowMenu[19] == false) {
                $("#AReport_Menu").hide();
            }
        }
        else {
            $("#AReport_Menu").hide();
        }
    }

    // window.location.href = localStorage.getItem("urlIndex");

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
   afiaccess[2] == 0 && afiaccess[3] == 0 &&
   afiaccess[4] == 0 && afiaccess[5] == 0)
   $("#FDOC_Menu").hide();
else
   $("#FDOC_Menu").show();
 
 
if (afiaccess[6] == 0 && afiaccess[7] == 0)
   $("#IDOC_Menu").hide();
else
   $("#IDOC_Menu").show();*/

}


function SetValidationErj() {
    var ShowMenuErj = [false, false];
    if (accessErj == null) return false;
    if (accessErj.length == 0) return false;


    if (sessionStorage.userName == 'ACE')
        accessErj[0].TrsName = 'ADMIN';

    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.userModeErj = 'ADMIN';
        localStorage.setItem("userModeErj", "ADMIN");

    }
    else {
        sessionStorage.userModeErj = 'USER';
        localStorage.setItem("userModeErj", "USER");
    }



    if (accessErj[0].Trs == 0) {
        sessionStorage.AccessSanadErj = true;
        localStorage.setItem("AccessSanadErj", "true");
    }

    validation = CheckAccessReportErj('ErjDocK');
    ShowMenuErj[0] = validation;  // گزارش فهرست پرونده


    validation = CheckAccessReportErj('ErjDocErja');
    ShowMenuErj[1] = validation;  // گزارش فهرست ارجاعات

    validation = CheckAccessErj('ErjDoc');
    ShowMenuErj[2] = validation;  // پرونده ها

    validation = CheckAccessErj('AllDoc');
    ShowMenuErj[3] = validation;  // اسناد اتوماسیون

    if (erjaccess[0] == true || erjaccess[1] == true) {
        $("#EReport_Menu").show();
        erjaccess[0] == true && ShowMenuErj[0] == true ? $("#ErjDocK").show() : $("#ErjDocK").hide();
        erjaccess[1] == true && ShowMenuErj[1] == true ? $("#ErjDocB_Last").show() : $("#ErjDocB_Last").hide();

        if (ShowMenuErj[0] == false && ShowMenuErj[1] == false)
            $("#EReport_Menu").hide();
    }
    else {
        $("#EReport_Menu").hide();
    }

    if (ShowMenuErj[3] == true) {

        if (erjaccess[2] == true || erjaccess[3] == true || erjaccess[4] == true) {
            $("#ErjaDOC_Menu").show();
            erjaccess[2] == true && ShowMenuErj[2] == true ? $("#ErjaDOC").show() : $("#ErjaDOC").hide();
            erjaccess[3] == true ? $("#Erja_Resive").show() : $("#Erja_Resive").hide();
            erjaccess[3] == true ? $("#P_NotificationErja").show() : $("#P_NotificationErja").hide();
            erjaccess[4] == true ? $("#Erja_Send").show() : $("#Erja_Send").hide();
            //erjaccess[0] == true && ShowMenuErj[0] == true ? $("#ErjDocK").show() : $("#ErjDocK").hide();
            //erjaccess[1] == true && ShowMenuErj[1] == true ? $("#ErjDocB_Last").show() : $("#ErjDocB_Last").hide();
        }
        else {
            $("#ErjaDOC_Menu").hide();
            $("#P_NotificationErja").hide();
        }



        validation = CheckAccessErj('NEW_ErjDOC');// new parvandeh
        validation == true ? $("#AddNewErjDocH").show() : $("#AddNewErjDocH").hide()

        validation = CheckAccessErj('CHG_ErjDOC');// edit parvandeh
        //validation == true ? $("#UpdateErjDocH").show() : $("#UpdateErjDocH").hide()
        validation == true ? sessionStorage.CHG_ErjDOC = true : sessionStorage.CHG_ErjDOC = false
        validation == true ? localStorage.setItem("CHG_ErjDOC", "true") : localStorage.setItem("CHG_ErjDOC", "false")

        validation = CheckAccessErj('DEL_ErjDOC'); // delete parvandeh
        //validation == true ? $("#DeleteErjDocH").show() : $("#DeleteErjDocH").hide()
        validation == true ? sessionStorage.DEL_ErjDOC = true : sessionStorage.DEL_ErjDOC = false
        validation == true ? localStorage.setItem("DEL_ErjDOC", "true") : localStorage.setItem("DEL_ErjDOC", "false")

        validation = CheckAccessErj('OTHERUSER_ErjDOC');
        validation == true ? sessionStorage.AccessSanadErj = true : sessionStorage.AccessSanadErj = false
        validation == true ? localStorage.setItem("AccessSanadErj", "true") : localStorage.setItem("AccessSanadErj", "false")

        validation = CheckAccessErj('ATTACH');
        validation == true ? localStorage.setItem("ATTACH", "true") : localStorage.setItem("ATTACH", "false")

        validation = CheckAccessErj('NEW_ATTACH');
        validation == true ? localStorage.setItem("NEW_ATTACH", "true") : localStorage.setItem("NEW_ATTACH", "false")

        validation = CheckAccessErj('DEL_ATTACH');
        validation == true ? localStorage.setItem("DEL_ATTACH", "true") : localStorage.setItem("DEL_ATTACH", "false")

        validation = CheckAccessErj('VIEW_ATTACH');
        validation == true ? localStorage.setItem("VIEW_ATTACH", "true") : localStorage.setItem("VIEW_ATTACH", "false")


    }
    else {
        //$("#EReport_Menu").hide();
        $("#ErjaDOC_Menu").hide();
        $("#P_NotificationErja").hide();
    }
}



$('.rightClick').on("contextmenu", function () {
    id = $(this).attr('id');
    if (id == "ADOC") {
        sessionStorage.setItem('listFilter', null);
        localStorage.setItem("ModeCode", 'ADOC');
        sessionStorage.ModeCode = 'ADOC';
        sessionStorage.lastPageSelect = 0;
    }
});

$('.rightClick').click("contextmenu", function () {
    id = $(this).attr('id');

});



/*
 $('a').mousedown(function(event) {
            switch (event.which) {
                case 1:
                    //alert('Left mouse button pressed');
                    $(this).attr('target','_self');
                    break;
                case 2:
                    //alert('Middle mouse button pressed');
                    $(this).attr('target','_blank');
                    break;
                case 3:
                    //alert('Right mouse button pressed');
                    $(this).attr('target','_blank');
                    break;
                default:
                    //alert('You have a strange mouse');
                    $(this).attr('target','_self"');
            }
        });
 */
//localStorage.removeItem("listForms");


var host = 'http://' + $(location).attr('host');

/*
$(".useBlank").click(function () {
    var url = host + $(this).attr('addr');
    var id = $(this).attr('id');
    var target = $(this).attr('target');
    if (target == "_self") {
        localStorage.removeItem("listForms");
        window.open(url, '_self');
    }
    else {
        var listForms = localStorage.getItem("listForms");
        data = '!!' + id;
        if (listForms == null) {
            localStorage.setItem("listForms", data);
        }
        else {
            list = listForms.split('!!');
            find = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i] == id) {
                    find = true;
                }
            }
        }

        if (find == true) {
            return showNotification(translate('در برگ نشان دیگری وجود دارد', 0))
        }
        else {
            if (id != null)
                localStorage.setItem("listForms", listForms + data);
            window.open(url, '_blank').focus();
        }
    }
});*/







$("#ADOC").click(function () {
    sessionStorage.setItem('listFilter', null);
    localStorage.setItem("ModeCode", 'ADOC');
    sessionStorage.ModeCode = 'ADOC';
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);

    localStorage.setItem("DocNoAFISanad", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));

    sessionStorage.IsReport = "false";

    /*    var newTabs = [];
        newTabs.push(window.open("/AFISanad/Index", "_blank"));
        newTabs[0].focus();
        newTabs[0].close();*/
});

$("#FDOC_SO").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SO;
    sessionStorage.InOut = 2; // فروش
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);

    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDOC_SP").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SP;
    sessionStorage.InOut = 2; // فروش
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_S").click(function () {
    sessionStorage.setItem('listFilter', null);
    localStorage.setItem("ModeCode", sessionStorage.MODECODE_FDOC_S);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_S;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SR").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SR;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SH").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SH;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SE").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SE;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_PO").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PO;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_PP").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PP;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_P").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_P;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDOC_PR").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PR;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#IDOC_I").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 1;
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFISanadAnbar", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#IDOC_O").click(function () {
    sessionStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 2;
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFISanadAnbar", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});



$("#Erja_Resive").click(function () {
    sessionStorage.ModeCodeErja = 1;
    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#P_NotificationErja").click(function () {
    sessionStorage.ModeCodeErja = 1;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
});


$("#Erja_Send").click(function () {
    sessionStorage.ModeCodeErja = 2;

    localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});


$("#ErjaDOC").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#ErjDocK").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#ErjDocB_Last").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});




$("#TrzAcc").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("LevelReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#ADocR").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#Dftr").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("AccNameReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#TChk").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#AGMkz").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#AGOpr").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#TrzFKala_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFKala_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFCust_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFCust_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDocR_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDocR_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});



$("#Krdx").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#TrzIKala").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#TrzIKalaExf").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#IDocR").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});








//MODECODE_IDOC_AVAL = 101 'موجودي اول دوره';
//MODECODE_IDOC_I: 102 'رسيد ورود به انبار';
//MODECODE_IDOC_ISR: 103 'برگشت فروش به انبار';
//MODECODE_IDOC_IMOVE: 106  'انتقال به انبار';
//MODECODE_IDOC_IP: 108 'رسيد خريد';
//MODECODE_IDOC_IMAHSOOL: 110 'رسيد محصول';

//MODECODE_IDOC_O: 104 'حواله خروج از انبار';
//MODECODE_IDOC_OPR: 105 'برگشت خريد از انبار';
//MODECODE_IDOC_OMOVE: 107 'انتقال از انبار';
//MODECODE_IDOC_OS: 109 'حواله فروش';
//MODECODE_IDOC_OMAVAD: 111 'حواله مواد';

/*function ShamsiDate() {
    d = new Date();
    date = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate(), 'Short');
    date.jm <= 9 ? mah = '0' + date.jm : mah = date.jm;
    date.jd <= 9 ? day = '0' + date.jd : day = date.jd;
    temp = date.jy + '/' + mah + '/' + day;
    SalNow = date.jy;
    DateNow = temp;
    return temp;
}

ShamsiDate();*/



function showNotification(text, colorNumber, From, Align, time) {

    placementFrom = From == null ? sessionStorage.placementFrom : From;
    placementAlign = Align == null ? sessionStorage.placementAlign : Align;
    animateEnter = sessionStorage.animateEnter;
    animateExit = sessionStorage.animateExit;
    if (colorNumber == 0)
        colorName = 'alert-danger';
    else if (colorNumber == 1)
        colorName = 'alert-success';
    else if (colorNumber == 2)
        colorName = 'alert-warning';
    else if (colorNumber == 3)
        colorName = 'alert-info';


    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'خطای برنامه نویسی : متن هشدار وارد نشده است'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: time = null ? 1000 : time,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
}

/*$(function () {
    //Textare auto growth
    autosize($('textarea.auto-growth'));
 
    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm',
        clearButton: true,
        rtl: true,
        weekStart: 1
    });
 
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('.datepicker2').bootstrapMaterialDatePicker({
        format: 'DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        rtl: true,
        time: false
    });
 
    $('.timepicker').bootstrapMaterialDatePicker({
        format: 'HH:mm',
        clearButton: true,
        rtl: true,
        date: false
    });
 
    $('input#input_text, textarea#textarea2').characterCounter();
});*/


/*
 
$("#ace0").click(function () {
    $("#group").empty();
    $("#sal").empty();
    $.ajax({
        type: 'POST',
        url: '/Home/GetGroup',//'@Url.Action("GetGroup")',//نام تابع با خروجی جیسون
        dataType: 'json',
        data: { ace: $("#ace").val() },
        success: function (mems) {
            $.each(mems, function (i, member) {
                $("#group").append('<option value="'
                    + member.Value + '">'
                    + member.Text + '</option>');
            });
        },
        error: function (ex) {
            Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        }
    });
});
 
 
$("#group0").click(function () {
    var ace = $("#ace").val();
    var group = $("#group").val();
    $("#sal").empty();
    ajaxFunction(DatabseSalUrl + ace + '/' + group, 'GET').done(function (data) {
        self.DatabseSalList(data);
        if (self.DatabseSalList().length > 0) {
 
            for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                var sal = self.DatabseSalList()[i - 1];
                $("#sal").append('<option value="'
                    + sal.Name + '">'
                    + sal.Name + '</option>');
            }
 
        }//else{
        //    Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        //}
    });
});
*/



$('#ADOC_Menu').click(function () {
    sessionStorage.SelectMenu = 0;
});

$('#FDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 1;
});

$('#IDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 2;
});

$('#AReport_Menu').click(function () {
    sessionStorage.SelectMenu = 3;
});

$('#FReport_Menu').click(function () {
    sessionStorage.SelectMenu = 4;
});

$('#IReport_Menu').click(function () {
    sessionStorage.SelectMenu = 5;
});


$('#EReport_Menu').click(function () {
    sessionStorage.SelectMenu = 6;
});

$('#ErjaDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 7;
});

$('#Base_Menu').click(function () {
    sessionStorage.SelectMenu = 8;
});



$('#Base_Menu').removeAttr('class');
$('#ADOC_Menu').removeAttr('class');
$('#FDOC_Menu').removeAttr('class');
$('#IDOC_Menu').removeAttr('class');
$('#AReport_Menu').removeAttr('class');
$('#IReport_Menu').removeAttr('class');
$('#FReport_Menu').removeAttr('class');
$('#EReport_Menu').removeAttr('class');
$('#ErjaDOC_Menu').removeAttr('class');

if (sessionStorage.SelectMenu == 0) {
    $('#ADOC_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 1) {
    $('#FDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 2) {
    $('#IDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 3) {
    $('#AReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 4) {
    $('#FReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 5) {
    $('#IReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 6) {
    $('#EReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 7) {
    $('#ErjaDOC_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 8) {
    $('#Base_Menu').attr('class', 'active');
}


$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
    });
};






var counterColumn;

function CreateTableColumn(data) {
    var cols = '';
    $("#TableColumn").empty();

    for (var i = 1; i <= data.length; i++) {
        cols += ' <tr id="PanelColumns' + i + '"> ' +
            '    <td id="RowColumns' + i + '"></td> ' +
            '    <td id="TextColumns' + i + '"></td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input id = "SettingColumns' + i + '" type = "checkbox" />' +
            '    </td > ' +
            '</tr> '
    }

    $('#TableColumn').append(
        cols
    );
}


/*function CreateTableColumn(data) {
    var cols = '';
    $("#TableColumn").empty();

    for (var i = 1; i <= data.length; i++) {
        cols += ' <tr id="PanelColumns' + i + '"> ' +
            '    <td id="RowColumns' + i + '"></td> ' +
            '    <td id="TextColumns' + i + '"></td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input id = "SettingColumns' + i + '" type = "checkbox" />' +
            '    </td > ' +
            '</tr> '
    }

    $('#TableColumn').append(
        ' <table class="table table-addmin">' +
        '   <thead style="cursor: pointer;">' +
        '       <tr>' +
        '           <td data-bind="text:translate('ردیف')"></td>' +
        '           <td style="width:250px;" data-bind="text:translate('نام ستون')"> </td>' +
        '            <td class="panel_AllSettingColumns" style="text-align: left;padding: 0px 10px 0px 10px;"> ' +
        '                <label for="AllSettingColumns" data-bind="text:translate('انتخاب همه')"></label> ' +
        '                <input id="AllSettingColumns" type="checkbox" /> ' +
        '           </td> ' +
        '      </tr>' +
        '   </thead >' +
        ' <tbody>' +
        cols +
        ' </tbody>' +
        '</table >'
    );
}*/

function SetColumn(code, indexId, data, mode) {
    var index = -1;
    var name = '';
    var user = '';
    for (i = 0; i < data.length; i++) {
        item = data[i];
        user = item.UserCode;
        if (item.Code == code && item.Name != "") {
            index = i;
        }
    }
    if (index >= 0) {
        counterColumn++;
        name = data[index].Name;
        visible = data[index].Visible;
        findCode = code.search("Code");
        if (user == "*Default*" &&
            (
                (code.lastIndexOf("Code") > 0 && code != "AccCode" && code != "AccFullCode") ||
                code.lastIndexOf("LtnCode") > 0 ||
                code.lastIndexOf("Amount2") > 0 ||
                code.lastIndexOf("Amount3") > 0 ||
                code.lastIndexOf("UnitPrice2") > 0 ||
                code.lastIndexOf("UnitPrice3") > 0 ||

                code.lastIndexOf("UnitName2") > 0 ||
                code.lastIndexOf("UnitName3") > 0 ||

                code == "iAddMin1" ||
                code == "iAddMin2" ||
                code == "iAddMin3" ||

                code == "DimX" ||
                code == "DimY" ||
                code == "DimZ" ||

                code == "Amount" ||
                code == "Amount2" ||
                code == "Amount3" ||

                code == "UnitPrice2" ||
                code == "UnitPrice3" ||

                code == "CheckRadif" ||
                code == "CheckComm" ||
                code == "CheckVosoolDate" ||

                code == "ThvlRegion" ||
                code == "ThvlOstan" ||
                code == "ThvlShahrestan" ||
                code == "ThvlCity" ||
                code == "ThvlStreet" ||
                code == "ThvlAlley" ||
                code == "ThvlPlack" ||
                code == "ThvlZipCode" ||
                code == "ThvlTel" ||
                code == "ThvlMobile" ||
                code == "ThvlFax" ||
                code == "ThvlEMail" ||
                code == "ThvlAddress" ||
                code == "ThvlMelliCode" ||
                code == "ThvlEcoCode" ||

                code == "CustEcoCode" ||
                code == "CustMelliCode" ||
                code == "CustTel" ||
                code == "CustFax" ||
                code == "CustMobile" ||
                code == "CustEmail" ||
                code == "CustCity" ||
                code == "CustStreet" ||
                code == "CustAlley" ||
                code == "CustPlack" ||
                code == "CustZipCode" ||
                code == "CustAddress" ||
                code == "CustOstan" ||
                code == "CustShahrestan" ||
                code == "CustRegion" ||
                code == "ArzName" ||
                code == "ArzRate" ||
                code == "ArzValue" ||
                (code == "ToUserName" && mode == "ErjDocB_Last_D") ||
                (code == "FromUserName" && mode == "ErjDocB_Last_E") ||
                code == "Shobe" ||
                code == "Jari" ||
                code == "F01" ||
                code == "F02" ||
                code == "F03" ||
                code == "F04" ||
                code == "F05" ||
                code == "F06" ||
                code == "F07" ||
                code == "F08" ||
                code == "F09" ||
                code == "F10" ||
                code == "F11" ||
                code == "F12" ||
                code == "F13" ||
                code == "F14" ||
                code == "F15" ||
                code == "F16" ||
                code == "F17" ||
                code == "F18" ||
                code == "F19" ||
                code == "F20" ||

                code == "CustF01" ||
                code == "CustF02" ||
                code == "CustF03" ||
                code == "CustF04" ||
                code == "CustF05" ||
                code == "CustF06" ||
                code == "CustF07" ||
                code == "CustF08" ||
                code == "CustF09" ||
                code == "CustF10" ||
                code == "CustF11" ||
                code == "CustF12" ||
                code == "CustF13" ||
                code == "CustF14" ||
                code == "CustF15" ||
                code == "CustF16" ||
                code == "CustF17" ||
                code == "CustF18" ||
                code == "CustF19" ||
                code == "CustF20" ||

                code == "KalaF01" ||
                code == "KalaF02" ||
                code == "KalaF03" ||
                code == "KalaF04" ||
                code == "KalaF05" ||
                code == "KalaF06" ||
                code == "KalaF07" ||
                code == "KalaF08" ||
                code == "KalaF09" ||
                code == "KalaF10" ||
                code == "KalaF11" ||
                code == "KalaF12" ||
                code == "KalaF13" ||
                code == "KalaF14" ||
                code == "KalaF15" ||
                code == "KalaF16" ||
                code == "KalaF17" ||
                code == "KalaF18" ||
                code == "KalaF19" ||
                code == "KalaF20"
            )
        ) {
            visible = 0;
        }
        $('#RowColumns' + indexId).text(counterColumn);
        $('#TextColumns' + indexId).text(name);
        $('#SettingColumns' + indexId).prop('checked', visible == 1 ? true : false);
        $('#PanelColumns1').removeAttr('hidden', '');
    }
    else {
        $('#PanelColumns' + indexId).attr('hidden', '');
        $('#TextColumns' + indexId).text(translate('تعریف نشده'));
        $('#SettingColumns' + indexId).prop('checked', false);
        $('#RowColumns' + indexId).text(-1);
    }
}

function SaveColumn(ace, sal, group, rprtId, route, columns, data) {
    var obj = [];
    for (i = 1; i <= columns.length; i++) {
        item = data[i];
        $('#SettingColumns' + (i)).is(':checked') == true ? Visible = 1 : Visible = 0;
        tmp = {
            'UserCode': sessionStorage.userName,
            'RprtId': rprtId,
            'Code': columns[i - 1],
            'Visible': Visible,
            'Position': i,
            'Width': 100
        };
        obj.push(tmp);
    }

    $('#modal-SettingColumn').modal('hide');
    showNotification(translate('در حال ذخیره تنظیمات ستون ها ...'), 1);
    ajaxFunction(RprtColsSaveUri + ace + '/' + sal + '/' + group, 'POST', obj).done(function (response) {
        getRprtAllCols();
    });

    window.location.href = route;
}


logoutmin = localStorage.getItem('logoutmin');
if (logoutmin != null && logoutmin != 'null' && logoutmin != '0' && logoutmin != '') {
    logoutmin = logoutmin * 60000
    setInterval(LogOut, logoutmin);
}

function LogOut() {
    if (sessionStorage.userName != '' && sessionStorage.userName != null) {
        var LogOutObject = {
            MachineId: MachineId,
            UserCode: sessionStorage.userName,
            ProgName: ace
        }
        ajaxFunction(LogOutUri, 'POST', LogOutObject).done(function (datalogin) {
            RemoveUseSanad(ace, sal, '', 0);
            RemoveUseSanad(aceErj, salErj, '', 0);
            sessionStorage.userName = '';
            sessionStorage.pass = '';
            localStorage.setItem("userName", '');
            localStorage.setItem('password', '');
            localStorage.removeItem("listForms");
            window.location.href = localStorage.getItem("urlLogin");//sessionStorage.urlLogin;
        });
    }
}

$('#LogOut').click(function () {
    LogOut();
});

$('#LogOutSetting').click(function () {
    LogOut();
});


//report

var viewer = null;
var designer = null;
var options = null;
var report = null;
var dataSet = null;

function createViewer() {
    if (options == null) {
        // var Stimulsoft = require('stimulsoft-reports-js');
        Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("/Content/Report/Lang/fa.xml", true, "persion (fa)");
        //Stimulsoft.Base.StiFontCollection(Stimulsoft.Base.StiFontCollection.getFontFamilies());

        /*Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BARABICS.ttf", "Karbord_ARABICS");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BArash.ttf", "Karbord_Arash");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BAria.ttf", "Karbord_Aria");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BARSHIA.ttf", "Karbord_ARSHIA");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBadkonk.ttf", "Karbord_Badkonk");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBADR.ttf", "Karbord_BADR");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBADRBD.ttf", "Karbord_BADRBD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChini.ttf", "Karbord_Chini");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChshmeh.ttf", "Karbord_Chshmeh");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChshmhB.ttf", "Karbord_ChshmhB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BCOMPSET.ttf", "Karbord_COMPSET");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BCOMSETB.ttf", "Karbord_COMSETB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BDAVAT.ttf", "Karbord_DAVAT");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BELHAM.ttf", "Karbord_ELHAM");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BESFHNBD.ttf", "Karbord_ESFHNBD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFANTEZY.ttf", "Karbord_FANTEZY");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFARNAZ.ttf", "Karbord_FARNAZ");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFERDOSI.ttf", "Karbord_FERDOSI");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHaleh.ttf", "Karbord_Haleh");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHalehBd.ttf", "Karbord_HalehBd");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHOMA.ttf", "Karbord_HOMA");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJADIDBD.ttf", "Karbord_JADIDBD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJalal.ttf", "Karbord_Jalal");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJalalBd.ttf", "Karbord_JalalBd");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJohar.ttf", "Karbord_Johar");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRAN.ttf", "Karbord_KAMRAN");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRANB.ttf", "Karbord_KAMRANB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRANO.ttf", "Karbord_KAMRANO");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKaveh.ttf", "Karbord_Kaveh");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKOODAKO.ttf", "Karbord_KOODAKO");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKOODB.ttf", "Karbord_KOODB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKourosh.ttf", "Karbord_Kourosh");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BLOTUS.ttf", "Karbord_LOTUS");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BLOTUSB.ttf", "Karbord_LOTUSB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMahsa.ttf", "Karbord_Mahsa");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMAJIDSH.ttf", "Karbord_MAJIDSH");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMasjed.ttf", "Karbord_Masjed");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMedad.ttf", "Karbord_Medad");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMITRA.ttf", "Karbord_MITRA");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMITRABD.ttf", "Karbord_MITRABD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMoj.ttf", "Karbord_Moj");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMorvard.ttf", "Karbord_Morvard");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNarm.ttf", "Karbord_Narm");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNASIMB.ttf", "Karbord_NASIMB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANB.ttf", "Karbord_NAZANB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BPaatcBd.ttf", "Karbord_PaatcBd");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BPaatch.ttf", "Karbord_Paatch");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BROYA.ttf", "Karbord_ROYA");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BROYABD.ttf", "Karbord_ROYABD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSahra.ttf", "Karbord_Sahra");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSiavash.ttf", "Karbord_Siavash");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSINABD.ttf", "Karbord_SINABD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSooreh.ttf", "Karbord_Sooreh");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSoorehB.ttf", "Karbord_SoorehB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSorkhpu.ttf", "Karbord_Sorkhpu");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTABASSO.ttf", "Karbord_TABASSO");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTAWFIGO.ttf", "Karbord_TAWFIGO");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTRAFB.ttf", "Karbord_TRAFB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTRAFFIC.ttf", "Karbord_TRAFFIC");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVahidBd.ttf", "Karbord_VahidBd");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVosta.ttf", "Karbord_Vosta");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVostaI.ttf", "Karbord_VostaI");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYAGB.ttf", "Karbord_YAGB");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYAGUT.ttf", "Karbord_YAGUT");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYas.ttf", "Karbord_Yas");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYasBd.ttf", "Karbord_YasBd");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTir.ttf", "Karbord_Tir");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZARBOLD.ttf", "Karbord_ZARBOLD");*/

        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZiba.ttf", "Karbord_Ziba");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZAR.ttf", "Karbord_ZAR");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYEKAN.ttf", "Karbord_YEKAN");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTITRBD.ttf", "Karbord_TITRBD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANIN.ttf", "Karbord_NAZANIN");
        //Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Vazir-FD-WOL.ttf", "Vazir-FD-WOL");

        options = new Stimulsoft.Viewer.StiViewerOptions();
        viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);



        options.appearance.showSystemFonts = false;
        options.height = "100%";
        options.appearance.fullScreenMode = true;
        options.appearance.scrollbarsMode = true;
        options.toolbar.showSaveButton = true;


        //options.toolbar.showDesignButton = false;
        options.toolbar.showDesignButton = sessionStorage.UserAdmin == 'true';

        if (sessionStorage.UserAdmin == 'true') {
            $('#DesignPrint').attr('style', 'display: unset');
        } else {
            $('#DesignPrint').attr('style', 'display: none');
        }




        options.toolbar.showFullScreenButton = false;

        options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
        options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
        options.toolbar.zoom = 100;
        options.toolbar.showCloseButton = true;
        options.toolbar.showSendEmailButton = true;


        viewer.onEmailReport = function (args) {
            sendMail();
            // args.settings -  send email form
            // args.settings.email  -  email adress
            // args.settings.subject  -  email subject
            // args.settings.message  -  email message
            // args.format  -  export format - PDF, HTML, HTML 5, Excel2007, Word2007, CSV
            // args.fileName - report file name (name of attachement)
            // args.data  -  byte array with exported report file

        }


        report = new Stimulsoft.Report.StiReport();
        viewer.onDesignReport = function (e) {

            createDesigner();
        };
        viewer.renderHtml("viewerContent");

        var userButton = viewer.jsObject.SmallButton("userButton", "خروج");

        userButton.action = function () {
            $("#modal-Report").modal('hide');
        }

        var toolbarTable = viewer.jsObject.controls.toolbar.firstChild.firstChild;
        var buttonsTable = toolbarTable.rows[0].firstChild.firstChild;
        var userButtonCell = buttonsTable.rows[0].insertCell(0);
        userButtonCell.className = "stiJsViewerClearAllStyles";
        userButtonCell.appendChild(userButton);
    }
}


function sendMail() {
    var link = "mailto:partopc1@yahoo.com"
        + "?cc=partopc@yahoo.com"
        + "&subject=" + encodeURIComponent("This is my subject")
        + "&body=" + encodeURIComponent("body")
        ;

    window.location.href = link;
}


var DataReport;
function createDesigner() {
    viewer.visible = false;
    designer = null;
    var options = new Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = true;
    options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;

    designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
    designer.renderHtml("designerContent");

    designer.onExit = function (e) {
        this.visible = false;
        viewer.visible = false;
        $("#modal-Report").modal('hide');
    }

    designer.onSaveReport = function (e) {
        if (printPublic == false) {
            //designer.jsObject.SendCommandSaveAsReport();
            var jsonStr = e.report.saveToJsonString();
            SavePrintForm(sessionStorage.ModePrint, e.fileName, jsonStr);
        }
        else {
            alert(translate('فرم های چاپ عمومی امکان تغییر را ندارند'));
        }
    }

    designer.onSaveAsReport = function (e) {
        var jsonStr = e.report.saveToJsonString();
        var name = e.fileName;
        resTestSavePrintForm = "";

        TestSavePrintForm(sessionStorage.ModePrint, e.fileName);

        if (resTestSavePrintForm == "FindFile") {
            alert(translate("نام گزارش تکراری است و امکان ذخیره وجود ندارد"));
        }
        else {
            SavePrintForm(sessionStorage.ModePrint, e.fileName, jsonStr);
        }
    };

    report._reportFile = printName == null ? 'فرم چاپ' : printName;
    designer.report = report;
    designer.visible = true;

}




function setReport(reportObject, addressMrt, variablesObject) {
    DataReport = reportObject;
    if (DataReport.length == 0 || DataReport == null || DataReport == "") {
        return showNotification(translate('ابتدا گزارش گیری کنید'), 0);
    }

    var dStart = new Date();
    var secondsStart = dStart.getTime();
    dateDifference = DateNow + secondsStart; // عدد یونیک

    //addressMrt = '/Content/Report/' + addressMrt + '.mrt?dt=' + dateDifference;

    //if (addressMrt != "Free") {
    //    report.loadFile(j);
    //}

    report = new Stimulsoft.Report.StiReport();
    report.loadFile(addressMrt);

    report.dictionary.databases.clear();
    dataSet = new Stimulsoft.System.Data.DataSet("Database");
    DataReport = '{"Data":' + JSON.stringify(DataReport) + '}';

    dataSet.readJson(DataReport);
    report.regData(dataSet.dataSetName, "", dataSet);

    variablesDataSet = new Stimulsoft.System.Data.DataSet("variables");
    //"{"Data":[{"CoName":"","Amount1":11,"Amount2":0,"Amount3":0,"BandNo":1,"BandSpec":"","Comm":"232132\n21312","KalaCode":"16001","MainUnit":1,"MkzCode":"","OprCode":"","PrdCode":"","SerialNumber":129,"TotalPrice":0,"UnitPrice":0,"UP_Flag":true,"KalaName":"شکر","KalaZarib1":1,"KalaZarib2":1000,"KalaZarib3":1000000,"KalaUnitName1":"گرم","KalaUnitName2":"کيلو گرم","KalaUnitName3":"تن","KalaFanniNo":"","DeghatM1":2,"DeghatM2":2,"DeghatM3":2,"DeghatR1":2,"DeghatR2":2,"DeghatR3":2,"KGruCode":"101","MainUnitName":"گرم","DeghatR":2,"DocNo":"26","DocDate":"1384/03/30","Spec":"","InOut":2,"ThvlCode":"","ThvlName":"","InvCode":"1","InvName":"انبار مواد اولیه","ModeCode":"102","ModeName":"حواله خروج انبار","Footer":"","UnitName":"گرم","Amount":11,"EghdamName":"سوپروایزر","TanzimName":"سوپروایزر","TaeedName":"سوپروایزر","TasvibName":""}]}"
    variablesReport = '{"variables":[{' + variablesObject + '}]}';
    variablesDataSet.readJson(variablesReport);
    report.regData(variablesDataSet.dataSetName, "", variablesDataSet);


    titlesObject = '';
    for (var i = 0; i < ListColumns.length; i++) {
        titlesObject += '"' + ListColumns[i].Code + '":"' + ListColumns[i].Name + '",';
    }


    titlesDataSet = new Stimulsoft.System.Data.DataSet("Titles");
    titlesReport = '{"Titles":[{' + titlesObject + '}]}';
    titlesDataSet.readJson(titlesReport);
    report.regData(titlesDataSet.dataSetName, "", titlesDataSet);


    report.dictionary.synchronize();

    viewer.report = report;
    //report.render();

    viewer.visible = true;
    $('#modal-Report').modal('show');

    viewer.onExit = function (e) {
        this.visible = false;
    }

}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'octet/stream' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};




var serverPos = localStorage.getItem("ApiAddressPos");
CodePos = ko.observable();

function GetPosList() {


    if (serverPos != "undefined" && serverPos != "" && serverPos != null && serverPos != "null") {

        var PosListUri = serverPos + '/api/Web_Data/PosList/';


        ajaxFunction(PosListUri, 'GET').done(function (data) {
            PosList(data);
        });
    }
}

if ((serverPos != '' && serverPos != null) && (PosList.length == 0)) {
    GetPosList();
}




function GetPrintForms(Mode) {

    var PrintForms_Object = {
        LockNumber: lockNumber,
        mode: Mode
    };
    ajaxFunction(PrintFormsUri + ace, 'POST', PrintForms_Object).done(function (data) {
        PrintFormsList(data);
    });
}


$('#refreshPrintForms').click(function () {
    Swal.fire({
        title: mes_Refresh,
        text: translate("لیست فرم های چاپ") + " " + translate("به روز رسانی شود ؟"),
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {
            $("div.loadingZone").show();
            GetPrintForms(sessionStorage.ModePrint);
            $("div.loadingZone").hide();
        }
    })
})

$('#modal-Report').on('hide.bs.modal', function () {
    GetPrintForms(sessionStorage.ModePrint);
});




function DeletePrintForm(address) {

    var DeletePrintForm_Object = {
        LockNumber: lockNumber,
        Address: address
    };
    ajaxFunction(DeletePrintFormUri + ace, 'POST', DeletePrintForm_Object).done(function (data) {

    });
}

function TestSavePrintForm(mode, name) {

    var TestSavePrintForm_Object = {
        LockNumber: lockNumber,
        Name: name,
        Mode: mode
    };
    ajaxFunction(TestSavePrintFormUri + ace, 'POST', TestSavePrintForm_Object).done(function (data) {
        resTestSavePrintForm = data;
    });
}

function SavePrintForm(mode, name, data) {

    var SavePrintForm_Object = {
        LockNumber: lockNumber,
        Name: name,
        Mode: mode,
        Data: data
    };
    ajaxFunction(SavePrintFormUri + ace, 'POST', SavePrintForm_Object).done(function (data) {

    });
}


function SelectedPrintForm(address, isPublic) {

    var SelectedPrintForm_Object = {
        LockNumber: lockNumber,
        Address: address,
        isPublic: isPublic,
    };
    ajaxFunction(SelectedPrintFormUri + ace, 'POST', SelectedPrintForm_Object).done(function (data) {

    });
}


function SelectedAccessGhimatPrintForm(address, isPublic) {

    var SelectedAccessGhimatPrintForm_Object = {
        LockNumber: lockNumber,
        Address: address,
        isPublic: isPublic,
    };
    ajaxFunction(SelectedAccessGhimatPrintFormUri + ace, 'POST', SelectedAccessGhimatPrintForm_Object).done(function (data) {
        if (data == "FindFile") {
            showNotification(translate('فایلی با نام مشابه وجود دارد و امکان تغییر نیست'), 0);
        }
    });
}




function FixSortName(name) {
    /*
        str = str.replace(String.fromCharCode(1570), String.fromCharCode(11000));
        str = str.replace(String.fromCharCode(1575), String.fromCharCode(11001));
        str = str.replace(String.fromCharCode(1576), String.fromCharCode(11002));
        str = str.replace(String.fromCharCode(1662), String.fromCharCode(11003));
        str = str.replace(String.fromCharCode(1578), String.fromCharCode(11004));
        str = str.replace(String.fromCharCode(1579), String.fromCharCode(11005));
        str = str.replace(String.fromCharCode(1580), String.fromCharCode(11006));
        str = str.replace(String.fromCharCode(1670), String.fromCharCode(11007));
        str = str.replace(String.fromCharCode(1581), String.fromCharCode(11008));
        str = str.replace(String.fromCharCode(1582), String.fromCharCode(11009));
        str = str.replace(String.fromCharCode(1583), String.fromCharCode(11010));
        str = str.replace(String.fromCharCode(1584), String.fromCharCode(11011));
        str = str.replace(String.fromCharCode(1585), String.fromCharCode(11012));
        str = str.replace(String.fromCharCode(1586), String.fromCharCode(11013));
        str = str.replace(String.fromCharCode(1688), String.fromCharCode(11014));
        str = str.replace(String.fromCharCode(1587), String.fromCharCode(11015));
        str = str.replace(String.fromCharCode(1588), String.fromCharCode(11016));
        str = str.replace(String.fromCharCode(1589), String.fromCharCode(11017));
        str = str.replace(String.fromCharCode(1590), String.fromCharCode(11018));
        str = str.replace(String.fromCharCode(1591), String.fromCharCode(11019));
        str = str.replace(String.fromCharCode(1592), String.fromCharCode(11020));
        str = str.replace(String.fromCharCode(1593), String.fromCharCode(11021));
        str = str.replace(String.fromCharCode(1594), String.fromCharCode(11022));
        str = str.replace(String.fromCharCode(1601), String.fromCharCode(11023));
        str = str.replace(String.fromCharCode(1602), String.fromCharCode(11024));
        str = str.replace(String.fromCharCode(1603), String.fromCharCode(11025));
        str = str.replace(String.fromCharCode(1705), String.fromCharCode(11026));
        str = str.replace(String.fromCharCode(1711), String.fromCharCode(11027));
        str = str.replace(String.fromCharCode(1604), String.fromCharCode(11028));
        str = str.replace(String.fromCharCode(1605), String.fromCharCode(11029));
        str = str.replace(String.fromCharCode(1606), String.fromCharCode(11030));
        str = str.replace(String.fromCharCode(1608), String.fromCharCode(11031));
        str = str.replace(String.fromCharCode(1607), String.fromCharCode(11032));
        str = str.replace(String.fromCharCode(1470), String.fromCharCode(11033));
        str = str.replace(String.fromCharCode(1740), String.fromCharCode(11033));
     */

    if (typeof name == "string" && name != "" && name.substring(0, 4) != '    ') {
        /*str = '';
            value = name.split('-');
            if (value.length > 1) {
                for (var i = 0; i < value.length; i++) {
                    str = str + fixedSize_JS(value[i], 10)
                }
            }
            else {*/
        str = name.trim();
        str = str.replaceAll('آ', String.fromCharCode(1000));
        str = str.replaceAll('ا', String.fromCharCode(1001));
        str = str.replaceAll('ب', String.fromCharCode(1002));
        str = str.replaceAll('پ', String.fromCharCode(1003));
        str = str.replaceAll('ت', String.fromCharCode(1004));
        str = str.replaceAll('ث', String.fromCharCode(1005));
        str = str.replaceAll('ج', String.fromCharCode(1006));
        str = str.replaceAll('چ', String.fromCharCode(1007));
        str = str.replaceAll('ح', String.fromCharCode(1008));
        str = str.replaceAll('خ', String.fromCharCode(1009));
        str = str.replaceAll('د', String.fromCharCode(1010));
        str = str.replaceAll('ذ', String.fromCharCode(1011));
        str = str.replaceAll('ر', String.fromCharCode(1012));
        str = str.replaceAll('ز', String.fromCharCode(1013));
        str = str.replaceAll('ژ', String.fromCharCode(1014));
        str = str.replaceAll('س', String.fromCharCode(1015));
        str = str.replaceAll('ش', String.fromCharCode(1016));
        str = str.replaceAll('ص', String.fromCharCode(1017));
        str = str.replaceAll('ض', String.fromCharCode(1018));
        str = str.replaceAll('ط', String.fromCharCode(1019));
        str = str.replaceAll('ظ', String.fromCharCode(1020));
        str = str.replaceAll('ع', String.fromCharCode(1021));
        str = str.replaceAll('غ', String.fromCharCode(1022));
        str = str.replaceAll('ف', String.fromCharCode(1023));
        str = str.replaceAll('ق', String.fromCharCode(1024));
        str = str.replaceAll('ك', String.fromCharCode(1025));
        str = str.replaceAll('ک', String.fromCharCode(1026));
        str = str.replaceAll('گ', String.fromCharCode(1027));
        str = str.replaceAll('ل', String.fromCharCode(1028));
        str = str.replaceAll('م', String.fromCharCode(1029));
        str = str.replaceAll('ن', String.fromCharCode(1030));
        str = str.replaceAll('و', String.fromCharCode(1031));
        str = str.replaceAll('ه', String.fromCharCode(1032));
        str = str.replaceAll('ی', String.fromCharCode(1033));
        str = str.replaceAll('ي', String.fromCharCode(1033));
        //}
    }
    else {
        str = name;
    }

    return str
}

function fixedSize_JS(value, size) {
    if (typeof value != "string")
        value = value.toString();

    return value.padStart(size).substring(0, size);
}

function ViewSpec(Spec) {
    if (Spec.length > 15) {
        $('#titleComm').text(translate('ملاحظات'));
        $('#modal-Comm').modal('show');
        $('#comm').val(Spec);
    }
}

function ViewCustName(CustName) {
    if (CustName.length > 15) {
        $('#titleComm').text(translate('نام مشتری'));
        $('#modal-Comm').modal('show');
        $('#comm').val(CustName);
    }
}



$("#P_Box").hide();

if (localStorage.getItem("Inbox") == "1") {
    $("#P_Box").show();
}

if (group == "0") {
    $("#P_NotificationErja").hide();
}


function AppendAnbar(invName) {
    if (invName != null) {
        inc = invName.includes("انبار");
        if (inc == false) {
            invName = 'انبار ' + invName
        }
    }
    return invName
}


$("#AccessRefresh").click(function () {
    getAccessList(false);
});


$("#btn_Tiket").click(function () {
    window.open(tiketUrl + '?' + (lockNumber * 114820000008), '_blank');
});



function TestUseSanad(prog, year, FormName, Id, Insert, docNo) {
    var listUse = localStorage.getItem("list" + FormName + "Use");
    if (listUse == null) {
        localStorage.setItem("list" + FormName + "Use", "0");
        listUse = localStorage.getItem("list" + FormName + "Use");
    }
    data = ',' + Id;
    list = listUse.split(',');
    find = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == Id) {
            find = true;
        }
    }



    dMode = 0;
    switch (FormName) {
        case "SanadHesab":
            dMode = 1;
            break;
        case "Factor":
            dMode = 2;
            break;
        case "SanadAnbar":
            dMode = 3;
            break;
        case "ErjDocH":
            dMode = 8;
            break;
    }


    useWindows = false;
    var userUse = "";
    var userUseName = "";
    if (FormName != "Kala" && FormName != "Cust" && FormName != "Acc" && FormName != "Opr" && FormName != "Mkz" && FormName != "Arz" && find == false) {
        DocInUseUri = server + '/api/Web_Data/DocInUse/';
        var DocInUseObject = {
            Prog: prog,
            DMode: dMode,
            GroupNo: group,
            Year: year,
            SerialNumber: Id
        };
        ajaxFunction(DocInUseUri, 'POST', DocInUseObject, false).done(function (response) {
            userUse = response[0].UserCode;
            userUseName = response[0].UserName;
            if (userUse != "") {
                useWindows = true;
            }
        });
    }


    if (useWindows == true /*&& userUse != sessionStorage.userName*/) {
        showNotification(translate('توسط') + ' ' + userUseName + ' ' + translate('درحال استفاده است'), 0);
        return true;
    }
    else {
        if (find == true) {
            switch (FormName) {
                case "SanadHesab":
                    showNotification(translate('سند در تب دیگری وجود دارد'), 0)
                    break;
                case "Factor":
                    showNotification(translate('فاکتور در تب دیگری وجود دارد'), 0)
                    break;
                case "SanadAnbar":
                    showNotification(translate('سند انبار در تب دیگری وجود دارد'), 0)
                    break;
                case "ErjDocH":
                    showNotification(translate('پرونده در تب دیگری وجود دارد'), 0)
                    break;
            }
            return true;
            //showNotification('در حال استفاده', 0)
        }
        else {
            if (Insert == true) {
                localStorage.setItem("list" + FormName + "Use", list + data);

                if (docNo != null && docNo != "") {
                    // ذخیره سند باز شده در ویندوز
                    SaveDocInUseUri = server + '/api/Web_Data/SaveDocInUse/';
                    var SaveDocInUseObject = {
                        Prog: prog,
                        DMode: dMode,
                        GroupNo: group,
                        Year: year,
                        SerialNumber: Id,
                        DocNo: docNo
                    };
                    ajaxFunction(SaveDocInUseUri, 'POST', SaveDocInUseObject, false).done(function (response) {
                        a = response;
                    });
                }

            }
            return false;
        }
    }
}

function RemoveUseSanad(prog, year, FormName, Id) {
    if (Id != null) {


        listUse = localStorage.getItem("list" + FormName + "Use");

        if (listUse == null) {
            localStorage.setItem("list" + FormName + "Use", "0");
            listUse = localStorage.getItem("list" + FormName + "Use");
        }

        listUse = listUse.replace(',' + Id, '');
        localStorage.setItem("list" + FormName + "Use", listUse);


        if ((FormName != "Kala" && FormName != "Cust" && FormName != "Acc" && FormName != "Opr" && FormName != "Mkz" && FormName != "Arz")) {
            dMode = 0;
            switch (FormName) {
                case "SanadHesab":
                    dMode = 1;
                    break;
                case "Factor":
                    dMode = 2;
                    break;
                case "SanadAnbar":
                    dMode = 3;
                    break;
                case "ErjDocH":
                    dMode = 8;
                    break;
            }

            // حذف سند باز شده توسط وب در ویندوز
            var DeleteDocInUseUri = server + '/api/Web_Data/DeleteDocInUse/';
            var DeleteDocInUseObject = {
                Prog: prog,
                DMode: dMode,
                GroupNo: group,
                Year: year,
                SerialNumber: Id,
            };
            ajaxFunction(DeleteDocInUseUri, 'POST', DeleteDocInUseObject, true, false).done(function (response) {
                //showNotification('1',0);
            });
        }
    }
}


function getRprtAllCols() {
    ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/all/' + sessionStorage.userName, 'GET').done(function (data) {
        data = TranslateData(data);
        localStorage.removeItem('RprtCols');
        localStorage.setItem('RprtCols', JSON.stringify(data))
        // a = JSON.parse(localStorage.getItem('RprtCols'));
    });


    if (CheckGroupErj(group)) {
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/all/' + sessionStorage.userName, 'GET').done(function (data) {
            data = TranslateData(data);
            localStorage.removeItem('RprtColsErj');
            localStorage.setItem('RprtColsErj', JSON.stringify(data))
        });
    }
}



function getRprtCols(rprtId, username) {
    data = JSON.parse(localStorage.getItem('RprtCols'));
    result = data.filter(s => s.RprtId == rprtId && s.UserCode == username);
    if (result.length == 0)
        result = data.filter(s => s.RprtId == rprtId && s.UserCode == "*Default*");
    return result;
}



function getRprtColsErj(rprtId, username) {
    data = JSON.parse(localStorage.getItem('RprtColsErj'));
    result = data.filter(s => s.RprtId == rprtId && s.UserCode == username);
    if (result.length == 0)
        result = data.filter(s => s.RprtId == rprtId && s.UserCode == "*Default*");
    return result;
}

/*
if (navigator.browserLanguage) {
    lang = navigator.browserLanguage;
} else {
    lang = navigator.language;
}

lang = lang0.substr(0, 2).toLowerCase();
*/


const EditMode_New = 1;
const EditMode_Chg = 2;
const EditMode_Darj = 3;
const EditMode_Del = 4;

const LogMode_ADoc = 1;
const LogMode_IDoc = 2;
const LogMode_FDoc = 3;
const LogMode_Acc = 4;
const LogMode_MKZ = 5;
const LogMode_OPR = 6;
const LogMode_ARZ = 7;
const LogMode_KALA = 8;
const LogMode_CUST = 9;



function SaveLog(progName, editMode, logMode, code, DocNo, serialNumber) {
    //mIdKarbord = localStorage.getItem("MachineIdKarbord")
    ipw = localStorage.getItem("IPW");
    //country = localStorage.getItem("CountryLogin");
    //city = localStorage.getItem("CityLogin");

    LogXObject = {
        'ProgName_': progName,
        'IP_': ipw,
        'GroupNo_': group,
        'Year_': sal,
        'EditMode_': editMode,
        'LogMode_': logMode,
        'Code_': code,
        'DocNo_': DocNo,
        'SerialNumber_': serialNumber
    };

    ajaxFunction(LogXUri, 'POST', LogXObject, true).done(function (response) {
        a = response;
        a = response;
    });
}
