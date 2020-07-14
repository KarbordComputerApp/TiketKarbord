﻿var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    self.ADocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  

    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    var ADocHUri = server + '/api/ADocData/ADocH/'; // آدرس لیست سند ها 

    var allSearchADocH = true;

    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/ADocH/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableReport(data);
        });
    }


    //Get ADocH 
    function getADocH(select) {
        ajaxFunction(ADocHUri + ace + '/' + sal + '/' + group + '/top' + select + '/' + sessionStorage.userName + '/' + sessionStorage.AccessSanad, 'GET').done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.ADocHList(data);
        });
    }

    getRprtColsList();
    getADocH($('#pageCountSelector').val());

    //------------------------------------------------------
    self.currentPageADocH = ko.observable();
    self.pageSizeADocH = ko.observable(10);
    self.currentPageIndexADocH = ko.observable(0);

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterF01 = ko.observable("");
    self.filterF02 = ko.observable("");
    self.filterF03 = ko.observable("");
    self.filterF04 = ko.observable("");
    self.filterF05 = ko.observable("");
    self.filterF06 = ko.observable("");
    self.filterF07 = ko.observable("");
    self.filterF08 = ko.observable("");
    self.filterF09 = ko.observable("");
    self.filterF10 = ko.observable("");
    self.filterF11 = ko.observable("");
    self.filterF12 = ko.observable("");
    self.filterF13 = ko.observable("");
    self.filterF14 = ko.observable("");
    self.filterF15 = ko.observable("");
    self.filterF16 = ko.observable("");
    self.filterF17 = ko.observable("");
    self.filterF18 = ko.observable("");
    self.filterF19 = ko.observable("");
    self.filterF20 = ko.observable("");

    self.filterADocHList = ko.computed(function () {
        self.currentPageIndexADocH(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterSpec = self.filterSpec();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterModeName = self.filterModeName();
        var filterStatus = self.filterStatus();
        var filterSerialNumber = self.filterSerialNumber();
        var filterF01 = self.filterF01();
        var filterF02 = self.filterF02();
        var filterF03 = self.filterF03();
        var filterF04 = self.filterF04();
        var filterF05 = self.filterF05();
        var filterF06 = self.filterF06();
        var filterF07 = self.filterF07();
        var filterF08 = self.filterF08();
        var filterF09 = self.filterF09();
        var filterF10 = self.filterF10();
        var filterF11 = self.filterF11();
        var filterF12 = self.filterF12();
        var filterF13 = self.filterF13();
        var filterF14 = self.filterF14();
        var filterF15 = self.filterF15();
        var filterF16 = self.filterF16();
        var filterF17 = self.filterF17();
        var filterF18 = self.filterF18();
        var filterF19 = self.filterF19();
        var filterF20 = self.filterF20();


        if (!filterDocNo && !filterDocDate && !filterSpec && !filterEghdam && !filterTanzim && !filterTaeed && !filterModeName &&
            !filterStatus && !filterSerialNumber &&
            !filterF01 && !filterF02 && !filterF03 && !filterF04 && !filterF05 && !filterF06 && !filterF07 && !filterF08 && !filterF09 && !filterF10 &&
            !filterF11 && !filterF12 && !filterF13 && !filterF14 && !filterF15 && !filterF16 && !filterF17 && !filterF18 && !filterF19 && !filterF20) {
            $("#CountRecord").text(self.ADocHList().length);
            return self.ADocHList();
        } else {
            tempData = ko.utils.arrayFilter(self.ADocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                    (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Eghdam == null ? 'null' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.Tanzim == null ? 'null' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                    (item.Taeed == null ? 'null' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                    (item.ModeName == null ? 'null' : item.ModeName.toString().search(filterModeName) >= 0) &&
                    (item.Status == null ? 'null' : item.Status.toString().search(filterStatus) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                    (item.F01 == null ? 'null' : item.F01.toString().search(filterF01) >= 0) &&
                    (item.F02 == null ? 'null' : item.F02.toString().search(filterF02) >= 0) &&
                    (item.F03 == null ? 'null' : item.F03.toString().search(filterF03) >= 0) &&
                    (item.F04 == null ? 'null' : item.F04.toString().search(filterF04) >= 0) &&
                    (item.F05 == null ? 'null' : item.F05.toString().search(filterF05) >= 0) &&
                    (item.F06 == null ? 'null' : item.F06.toString().search(filterF06) >= 0) &&
                    (item.F07 == null ? 'null' : item.F07.toString().search(filterF07) >= 0) &&
                    (item.F08 == null ? 'null' : item.F08.toString().search(filterF08) >= 0) &&
                    (item.F09 == null ? 'null' : item.F09.toString().search(filterF09) >= 0) &&
                    (item.F10 == null ? 'null' : item.F10.toString().search(filterF10) >= 0) &&
                    (item.F11 == null ? 'null' : item.F11.toString().search(filterF11) >= 0) &&
                    (item.F12 == null ? 'null' : item.F12.toString().search(filterF12) >= 0) &&
                    (item.F13 == null ? 'null' : item.F13.toString().search(filterF13) >= 0) &&
                    (item.F14 == null ? 'null' : item.F14.toString().search(filterF14) >= 0) &&
                    (item.F15 == null ? 'null' : item.F15.toString().search(filterF15) >= 0) &&
                    (item.F16 == null ? 'null' : item.F16.toString().search(filterF16) >= 0) &&
                    (item.F17 == null ? 'null' : item.F17.toString().search(filterF17) >= 0) &&
                    (item.F18 == null ? 'null' : item.F18.toString().search(filterF18) >= 0) &&
                    (item.F19 == null ? 'null' : item.F19.toString().search(filterF19) >= 0) &&
                    (item.F20 == null ? 'null' : item.F20.toString().search(filterF20) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchADocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexADocH = 0;
        sessionStorage.searchADocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexADocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.ADocHList(), function (item) {
                indexADocH += 1;
                return item.SortDocNo == search;
                //return ko.utils.stringStartsWith(item.SortDocNo.toString(), search);
            });
            if (indexADocH < self.pageSizeADocH())
                self.currentPageIndexADocH(0);
            else {
                var a = Math.round((indexADocH / self.pageSizeADocH()), 0);
                if (a < (indexADocH / self.pageSizeADocH())) a += 1;
                self.currentPageIndexADocH(a - 1);
            }
            return value;
        }
    });

    self.currentPageADocH = ko.computed(function () {
        var pageSizeADocH = parseInt(self.pageSizeADocH(), 10),
            startIndex = pageSizeADocH * self.currentPageIndexADocH(),
            endIndex = startIndex + pageSizeADocH;
        return self.filterADocHList().slice(startIndex, endIndex);
    });

    self.nextPageADocH = function () {
        if (((self.currentPageIndexADocH() + 1) * self.pageSizeADocH()) < self.filterADocHList().length) {
            self.currentPageIndexADocH(self.currentPageIndexADocH() + 1);
        }
    };

    self.previousPageADocH = function () {
        if (self.currentPageIndexADocH() > 0) {
            self.currentPageIndexADocH(self.currentPageIndexADocH() - 1);
        }
    };

    self.firstPageADocH = function () {
        self.currentPageIndexADocH(0);
    };

    self.lastPageADocH = function () {
        tempCountADocH = parseInt(self.filterADocHList().length / self.pageSizeADocH(), 10);
        if ((self.filterADocHList().length % self.pageSizeADocH()) == 0)
            self.currentPageIndexADocH(tempCountADocH - 1);
        else
            self.currentPageIndexADocH(tempCountADocH);
    };


    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");
    self.iconTypeF01 = ko.observable("");
    self.iconTypeF02 = ko.observable("");
    self.iconTypeF03 = ko.observable("");
    self.iconTypeF04 = ko.observable("");
    self.iconTypeF05 = ko.observable("");
    self.iconTypeF06 = ko.observable("");
    self.iconTypeF07 = ko.observable("");
    self.iconTypeF08 = ko.observable("");
    self.iconTypeF09 = ko.observable("");
    self.iconTypeF10 = ko.observable("");
    self.iconTypeF11 = ko.observable("");
    self.iconTypeF12 = ko.observable("");
    self.iconTypeF13 = ko.observable("");
    self.iconTypeF14 = ko.observable("");
    self.iconTypeF15 = ko.observable("");
    self.iconTypeF16 = ko.observable("");
    self.iconTypeF17 = ko.observable("");
    self.iconTypeF18 = ko.observable("");
    self.iconTypeF19 = ko.observable("");
    self.iconTypeF20 = ko.observable("");

    self.sortTableADocH = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.search("");
        self.currentColumn(orderProp);
        self.ADocHList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeSpec('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeModeName('');
        self.iconTypeStatus('');
        self.iconTypeSerialNumber('');
        self.iconTypeF01('');
        self.iconTypeF02('');
        self.iconTypeF03('');
        self.iconTypeF04('');
        self.iconTypeF05('');
        self.iconTypeF06('');
        self.iconTypeF07('');
        self.iconTypeF08('');
        self.iconTypeF09('');
        self.iconTypeF10('');
        self.iconTypeF11('');
        self.iconTypeF12('');
        self.iconTypeF13('');
        self.iconTypeF14('');
        self.iconTypeF15('');
        self.iconTypeF16('');
        self.iconTypeF17('');
        self.iconTypeF18('');
        self.iconTypeF19('');
        self.iconTypeF20('');

        if (orderProp == 'SortDocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F01') self.iconTypeF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F02') self.iconTypeF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F03') self.iconTypeF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F04') self.iconTypeF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F05') self.iconTypeF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F06') self.iconTypeF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F07') self.iconTypeF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F08') self.iconTypeF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F09') self.iconTypeF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F10') self.iconTypeF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F11') self.iconTypeF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F12') self.iconTypeF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F13') self.iconTypeF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F14') self.iconTypeF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F15') self.iconTypeF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F16') self.iconTypeF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F17') self.iconTypeF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F18') self.iconTypeF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F19') self.iconTypeF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F20') self.iconTypeF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };



    $('#refreshADocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست سند ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getADocH($('#pageCountSelector').val());
            }
        })
    })

    $('#AddNewSanad').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        window.location.href = sessionStorage.urlADocH;
    });


    self.DeleteSanad = function (SanadBand) {
        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا سند انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(ADocHHiUri + ace + '/' + sal + '/' + group + '/' + SanadBand.SerialNumber + '/' + sessionStorage.ModeCode, 'DELETE').done(function (response) {
                    currentPage = self.currentPageIndexADocH();
                    //self.IDocHList(response);
                    getADocH($('#pageCountSelector').val());
                    self.currentPageIndexADocH(currentPage);
                    Swal.fire({ type: 'success', title: 'حذف موفق', text: ' سند حذف شد ' });
                });
            }
        })
    };


    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;
        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.CustCode = item.CustCode;
        sessionStorage.CustName = item.CustName;
        sessionStorage.Spec = item.Spec;
        sessionStorage.PriceCode = item.KalaPriceCode;
        sessionStorage.InvCode = item.InvCode;
        sessionStorage.Eghdam = item.Eghdam;

        sessionStorage.AddMinSpec1 = item.AddMinSpec1//== "" ? null : item.AddMinSpec1;
        sessionStorage.AddMinSpec2 = item.AddMinSpec2// == "" ? null : item.AddMinSpec2;
        sessionStorage.AddMinSpec3 = item.AddMinSpec3// == "" ? null : item.AddMinSpec3;
        sessionStorage.AddMinSpec4 = item.AddMinSpec4// == "" ? null : item.AddMinSpec4;
        sessionStorage.AddMinSpec5 = item.AddMinSpec5// == "" ? null : item.AddMinSpec5;
        sessionStorage.AddMinSpec6 = item.AddMinSpec6// == "" ? null : item.AddMinSpec6;
        sessionStorage.AddMinSpec7 = item.AddMinSpec7// == "" ? null : item.AddMinSpec7;
        sessionStorage.AddMinSpec8 = item.AddMinSpec8// == "" ? null : item.AddMinSpec8;
        sessionStorage.AddMinSpec9 = item.AddMinSpec9// == "" ? null : item.AddMinSpec9;
        sessionStorage.AddMinSpec10 = item.AddMinSpec10 //== "" ? null : item.AddMinSpec10;

        sessionStorage.AddMin1 = item.AddMinPrice1 == null ? 0 : item.AddMinPrice1;
        sessionStorage.AddMin2 = item.AddMinPrice2 == null ? 0 : item.AddMinPrice2;
        sessionStorage.AddMin3 = item.AddMinPrice3 == null ? 0 : item.AddMinPrice3;
        sessionStorage.AddMin4 = item.AddMinPrice4 == null ? 0 : item.AddMinPrice4;
        sessionStorage.AddMin5 = item.AddMinPrice5 == null ? 0 : item.AddMinPrice5;
        sessionStorage.AddMin6 = item.AddMinPrice6 == null ? 0 : item.AddMinPrice6;
        sessionStorage.AddMin7 = item.AddMinPrice7 == null ? 0 : item.AddMinPrice7;
        sessionStorage.AddMin8 = item.AddMinPrice8 == null ? 0 : item.AddMinPrice8;
        sessionStorage.AddMin9 = item.AddMinPrice9 == null ? 0 : item.AddMinPrice9;
        sessionStorage.AddMin10 = item.AddMinPrice10 == null ? 0 : item.AddMinPrice10;

        sessionStorage.Status = item.Status;
        sessionStorage.PaymentType = item.PaymentType;
        sessionStorage.Footer = item.Footer;
        window.location.href = sessionStorage.urlADocH;
    }

    self.ShowAction = function (Eghdam) {
        if (sessionStorage.DEL_ADOC == 'true') {
            if (sessionStorage.AccessViewADoc == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }
        else
            return false;
    }

    $("#searchADocH").on("keydown", function search(e) {
        var key = e.charCode || e.keyCode || 0;
        if (allSearchADocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105)
                );
            }
        }
        else {
            if (key == 68) {
                e.preventDefault();
                this.value = this.value + String.fromCharCode(1610);
            }
        }
    });


    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getADocH(select);
    }



    function CreateTableReport(data) {
        $("#TableList").empty();
        $('#TableList').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableADocH">' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('SerialNumber', data) +
            CreateTableTh('F01', data) +
            CreateTableTh('F02', data) +
            CreateTableTh('F03', data) +
            CreateTableTh('F04', data) +
            CreateTableTh('F05', data) +
            CreateTableTh('F06', data) +
            CreateTableTh('F07', data) +
            CreateTableTh('F08', data) +
            CreateTableTh('F09', data) +
            CreateTableTh('F10', data) +
            CreateTableTh('F11', data) +
            CreateTableTh('F12', data) +
            CreateTableTh('F13', data) +
            CreateTableTh('F14', data) +
            CreateTableTh('F15', data) +
            CreateTableTh('F16', data) +
            CreateTableTh('F17', data) +
            CreateTableTh('F18', data) +
            CreateTableTh('F19', data) +
            CreateTableTh('F20', data) +
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageADocH" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +
            CreateTableTd('F01', 0, 0, data) +
            CreateTableTd('F02', 0, 0, data) +
            CreateTableTd('F03', 0, 0, data) +
            CreateTableTd('F04', 0, 0, data) +
            CreateTableTd('F05', 0, 0, data) +
            CreateTableTd('F06', 0, 0, data) +
            CreateTableTd('F07', 0, 0, data) +
            CreateTableTd('F08', 0, 0, data) +
            CreateTableTd('F09', 0, 0, data) +
            CreateTableTd('F10', 0, 0, data) +
            CreateTableTd('F11', 0, 0, data) +
            CreateTableTd('F12', 0, 0, data) +
            CreateTableTd('F13', 0, 0, data) +
            CreateTableTd('F14', 0, 0, data) +
            CreateTableTd('F15', 0, 0, data) +
            CreateTableTd('F16', 0, 0, data) +
            CreateTableTd('F17', 0, 0, data) +
            CreateTableTd('F18', 0, 0, data) +
            CreateTableTd('F19', 0, 0, data) +
            CreateTableTd('F20', 0, 0, data) +
            '<td>' +
            '<a id = "UpdateSanad" data - bind="click: $root.UpdateHeader" >' +
            '<img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="20" height="20" style="margin-left:10px"/></a >' +
            '<a id="DeleteSanad" data-bind="click: $root.DeleteSanad, visible: $root.ShowAction(Tanzim)">' +
            '<img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="20" height="20"/></a>' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('SerialNumber', data) +
            CreateTableTdSearch('F01', data) +
            CreateTableTdSearch('F02', data) +
            CreateTableTdSearch('F03', data) +
            CreateTableTdSearch('F04', data) +
            CreateTableTdSearch('F05', data) +
            CreateTableTdSearch('F06', data) +
            CreateTableTdSearch('F07', data) +
            CreateTableTdSearch('F08', data) +
            CreateTableTdSearch('F10', data) +
            CreateTableTdSearch('F11', data) +
            CreateTableTdSearch('F12', data) +
            CreateTableTdSearch('F13', data) +
            CreateTableTdSearch('F14', data) +
            CreateTableTdSearch('F15', data) +
            CreateTableTdSearch('F16', data) +
            CreateTableTdSearch('F17', data) +
            CreateTableTdSearch('F18', data) +
            CreateTableTdSearch('F19', data) +
            CreateTableTdSearch('F20', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {
        text = '<th ';
        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';
        text += 'data-column="' + field + '">' +
            '<span data-column="' + field + '" >' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + field + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" data-column="' + field + '" ></i> </span> ' +
            '</th>';
        return text;
    }

    function CreateTableTd(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSum(field, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'id="textTotal"></td>';
                break;
            case 1:
                text += '></td>'
                break;
            case 2:
                text += 'id="total' + field + '" style="direction: ltr;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSearch(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }

};

ko.applyBindings(new ViewModel());
