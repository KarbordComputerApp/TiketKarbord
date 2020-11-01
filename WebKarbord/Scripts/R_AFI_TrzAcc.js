﻿var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    self.AccList = ko.observableArray([]); // ليست حساب ها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.AModeList = ko.observableArray([]); // ليست نوع سند ها

    self.TrzAccList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند  

    var TrzAccUri = server + '/api/ReportAcc/TrzAcc/'; // آدرس گزارش 
    var TrzAccCountUri = server + '/api/ReportAcc/TrzAccCount/'; // تعداد رکورد های گزارش 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");


    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);

    //$('#aztarikh').val(sessionStorage.BeginDate);
    //$('#tatarikh').val(sessionStorage.EndDate);
    // $('#tatarikh').change();



    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });


    var AccCode = '';
    var counterAcc = 0;
    var list_AccSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();

    var AModeCode = '';
    var counterAMode = 0;
    var list_AModeSelect = new Array();



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TrzAcc';
    var columns = [
        'AccCode',
        'AccName',
        'Bede',
        'Best',
        'MonBede',
        'MonBest',
        'MonTotal'
    ];

    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }
        });

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/ReportAFI/TrzAcc", columns, self.SettingColumnList());
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false, sessionStorage.userName);
    });

    $('#AllSettingColumns').change(function () {
        var allCheck = $('#AllSettingColumns').is(':checked');
        for (var i = 1; i <= columns.length; i++) {
            $('#SettingColumns' + i).prop('checked', allCheck);
        }
    });

    $('#DefultColumn').click(function () {
        $('#AllSettingColumns').prop('checked', false);
        getRprtColsDefultList();
    });

    getRprtColsList(true, sessionStorage.userName);




    //Get Acc List
    function getAccList() {
        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AccList(data);
        });
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.OprList(data);
        });
    }

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.MkzList(data);
        });
    }

    //Get AMode List
    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
        });
    }


    getAccList();
    getOprList();
    getMkzList();
    getAModeList();
    getLevel();
    getSathTaraz();


    $('#nameAcc').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameAMode').val('همه موارد');


    //Get TrzAcc
    function getTrzAcc() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        sath = $("#SathTaraz").val();
        level = $("#Level").val();

        var accCode = '';
        for (var i = 0; i <= counterAcc - 1; i++) {
            if (i < counterAcc - 1)
                accCode += list_AccSelect[i] + '*';
            else
                accCode += list_AccSelect[i];
        }


        var aModeCode = '';
        for (var i = 0; i <= counterAMode - 1; i++) {
            if (i < counterAMode - 1)
                aModeCode += list_AModeSelect[i] + '*';
            else
                aModeCode += list_AModeSelect[i];
        }


        var mkzcode = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1)
                mkzcode += list_MkzSelect[i] + '*';
            else
                mkzcode += list_MkzSelect[i];
        }

        var oprcode = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1)
                oprcode += list_OprSelect[i] + '*';
            else
                oprcode += list_OprSelect[i];
        }


        var TrzAccObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            AModeCode: aModeCode,
            AccCode: accCode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            Level: level,
            Sath: sath,
        };

        ajaxFunction(TrzAccUri + ace + '/' + sal + '/' + group, 'POST', TrzAccObject).done(function (response) {
            self.TrzAccList(response);
            //calcsum(self.TrzAccList());
        });
    }

    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        totalMonBede = 0;
        totalMonBest = 0;
        totalMonTotal = 0;

        sathTaraz = $('#SathTaraz').val();

        for (var i = 0; i < list.length; ++i) {
            TrzAccData = list[i];

            if (sathTaraz == 2 && TrzAccData.Level == 1) {
                totalBede += TrzAccData.Bede;
                totalBest += TrzAccData.Best;
                totalMonBede += TrzAccData.MonBede;
                totalMonBest += TrzAccData.MonBest;
                totalMonTotal += TrzAccData.MonTotal;
            }
            else if (sathTaraz == 1) {
                totalBede += TrzAccData.Bede;
                totalBest += TrzAccData.Best;
                totalMonBede += TrzAccData.MonBede;
                totalMonBest += TrzAccData.MonBest;
                totalMonTotal += TrzAccData.MonTotal;
            }
        }

        $("#textTotal").text('جمع');
        $("#totalBede").text(NumberToNumberString(totalBede));
        $("#totalBest").text(NumberToNumberString(totalBest));
        $("#totalMonBede").text(NumberToNumberString(totalMonBede));
        $("#totalMonBest").text(NumberToNumberString(totalMonBest));
        $("#totalMonTotal").text(NumberToNumberString(totalMonTotal));
    }

    $("#CreateReport").click(function () {
        getTrzAcc();
    });







    //Level AccCode  AccName Bede Best MonBede MonBest  MonTotal




    //------------------------------------------------------
    self.currentPageTrzAcc = ko.observable();
    self.pageSizeTrzAcc = ko.observable(10);
    self.currentPageIndexTrzAcc = ko.observable(0);
    self.iconType = ko.observable("");

    self.iconTypeAccCode = ko.observable("");
    self.iconTypeAccName = ko.observable("");
    self.iconTypeBede = ko.observable("");
    self.iconTypeBest = ko.observable("");
    self.iconTypeMonBede = ko.observable("");
    self.iconTypeMonBest = ko.observable("");
    self.iconTypeMonTotal = ko.observable("");


    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal

    self.filterAccCode = ko.observable("");
    self.filterAccName = ko.observable("");
    self.filterBede = ko.observable("");
    self.filterBest = ko.observable("");
    self.filterMonBede = ko.observable("");
    self.filterMonBest = ko.observable("");
    self.filterMonTotal = ko.observable("");

    self.filterTrzAccList = ko.computed(function () {

        self.currentPageIndexTrzAcc(0);
        var filterAccCode = self.filterAccCode();
        var filterAccName = self.filterAccName();
        var filterBede = self.filterBede();
        var filterBest = self.filterBest();
        var filterMonBede = self.filterMonBede();
        var filterMonBest = self.filterMonBest();
        var filterMonTotal = self.filterMonTotal();
        // , AccName, Bede, Best, MonBede, MonBest, MonTotal
        // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal

        tempData = ko.utils.arrayFilter(self.TrzAccList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.AccCode.toString().toLowerCase(), filterAccCode) &&
                (item.AccName == null ? '' : item.AccName.toString().search(filterAccName) >= 0) &&
                ko.utils.stringStartsWith(item.Bede.toString().toLowerCase(), filterBede) &&
                ko.utils.stringStartsWith(item.Best.toString().toLowerCase(), filterBest) &&
                ko.utils.stringStartsWith(item.MonBede.toString().toLowerCase(), filterMonBede) &&
                ko.utils.stringStartsWith(item.MonBest.toString().toLowerCase(), filterMonBest) &&
                ko.utils.stringStartsWith(item.MonTotal.toString().toLowerCase(), filterMonTotal)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzAcc);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzAcc = 0;
        sessionStorage.searchTrzAcc = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzAcc(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzAccList(), function (item) {
                indexTrzAcc += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzAcc < self.pageSizeTrzAcc())
                self.currentPageIndexTrzAcc(0);
            else {
                var a = Math.round((indexTrzAcc / self.pageSizeTrzAcc()), 0);
                if (a < (indexTrzAcc / self.pageSizeTrzAcc())) a += 1;
                self.currentPageIndexTrzAcc(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzAcc = ko.computed(function () {
        var pageSizeTrzAcc = parseInt(self.pageSizeTrzAcc(), 10),
            startIndex = pageSizeTrzAcc * self.currentPageIndexTrzAcc(),
            endIndex = startIndex + pageSizeTrzAcc;
        return self.filterTrzAccList().slice(startIndex, endIndex);
    });

    self.nextPageTrzAcc = function () {
        if (((self.currentPageIndexTrzAcc() + 1) * self.pageSizeTrzAcc()) < self.filterTrzAccList().length) {
            self.currentPageIndexTrzAcc(self.currentPageIndexTrzAcc() + 1);
        }
    };

    self.previousPageTrzAcc = function () {
        if (self.currentPageIndexTrzAcc() > 0) {
            self.currentPageIndexTrzAcc(self.currentPageIndexTrzAcc() - 1);
        }
    };

    self.firstPageTrzAcc = function () {
        self.currentPageIndexTrzAcc(0);
    };

    self.lastPageTrzAcc = function () {
        tempCountTrzAcc = parseInt(self.filterTrzAccList().length / self.pageSizeTrzAcc(), 10);
        if ((self.filterTrzAccList().length % self.pageSizeTrzAcc()) == 0)
            self.currentPageIndexTrzAcc(tempCountTrzAcc - 1);
        else
            self.currentPageIndexTrzAcc(tempCountTrzAcc);
    };

    self.sortTableTrzAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null;

        self.currentColumn(orderProp);
        self.TrzAccList.sort(function (left, right) {
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



        self.iconTypeAccCode('');
        self.iconTypeAccName('');
        self.iconTypeBede('');
        self.iconTypeBest('');
        self.iconTypeMonBede('');
        self.iconTypeMonBest('');
        self.iconTypeMonTotal('');

        if (orderProp == 'AccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccName') self.iconTypeAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bede') self.iconTypeBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Best') self.iconTypeBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBede') self.iconTypeMonBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBest') self.iconTypeMonBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonTotal') self.iconTypeMonTotal((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    }


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageAcc = ko.observable();
    self.pageSizeAcc = ko.observable(10);
    self.currentPageIndexAcc = ko.observable(0);

    self.filterAcc0 = ko.observable("");
    self.filterAcc1 = ko.observable("");
    self.filterAcc2 = ko.observable("");

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.AccList();
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAcc = ko.computed(function () {
        var pageSizeAcc = parseInt(self.pageSizeAcc(), 10),
            startIndex = pageSizeAcc * self.currentPageIndexAcc(),
            endIndex = startIndex + pageSizeAcc;
        return self.filterAccList().slice(startIndex, endIndex);
    });

    self.nextPageAcc = function () {
        if (((self.currentPageIndexAcc() + 1) * self.pageSizeAcc()) < self.filterAccList().length) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() + 1);
        }
    };

    self.previousPageAcc = function () {
        if (self.currentPageIndexAcc() > 0) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() - 1);
        }
    };

    self.firstPageAcc = function () {
        self.currentPageIndexAcc(0);
    };

    self.lastPageAcc = function () {
        countAcc = parseInt(self.filterAccList().length / self.pageSizeAcc(), 10);
        if ((self.filterAccList().length % self.pageSizeAcc()) == 0)
            self.currentPageIndexAcc(countAcc - 1);
        else
            self.currentPageIndexAcc(countAcc);
    };

    self.sortTableAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshAcc').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست حساب ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddAcc = function (item) {

        AccCode = item.Code;
        find = false;
        list_AccSelect.forEach(function (item, key) {
            if (item == AccCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListAcc').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_AccSelect[counterAcc] = item.Code;
            counterAcc = counterAcc + 1;
        }
    };


    self.AddAllAcc = function () {
        list_AccSelect = new Array();
        list = self.AccList();
        $("#TableBodyListAcc").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListAcc').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_AccSelect[i] = list[i].Code;
            counterAcc = i + 1;
        }
    };


    self.DelAllAcc = function () {
        list_AccSelect = new Array();
        counterAcc = 0;
        $("#TableBodyListAcc").empty();
    };


    $('#modal-Acc').on('hide.bs.modal', function () {
        if (counterAcc > 0)
            $('#nameAcc').val(counterAcc + ' مورد انتخاب شده ')
        else
            $('#nameAcc').val('همه موارد');
    });

    $('#modal-Acc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageMkz = ko.observable();
    self.pageSizeMkz = ko.observable(10);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");

    self.filterMkzList = ko.computed(function () {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();

        if (!filter0 && !filter1 && !filter2) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageMkz = ko.computed(function () {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function () {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function () {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function () {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function () {
        countMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(countMkz - 1);
        else
            self.currentPageIndexMkz(countMkz);
    };

    self.sortTableMkz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshMkz').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست مرکز هزینه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getMkzList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
            }
        })
    })


    self.AddMkz = function (item) {

        MkzCode = item.Code;
        find = false;
        list_MkzSelect.forEach(function (item, key) {
            if (item == MkzCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListMkz').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[counterMkz] = item.Code;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
        list_MkzSelect = new Array();
        list = self.MkzList();
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListMkz').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[i] = list[i].Code;
            counterMkz = i + 1;
        }
    };


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz + ' مورد انتخاب شده ')
        else
            $('#nameMkz').val('همه موارد');
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageOpr = ko.observable();
    self.pageSizeOpr = ko.observable(10);
    self.currentPageIndexOpr = ko.observable(0);

    self.filterOpr0 = ko.observable("");
    self.filterOpr1 = ko.observable("");
    self.filterOpr2 = ko.observable("");

    self.filterOprList = ko.computed(function () {

        self.currentPageIndexOpr(0);
        var filter0 = self.filterOpr0().toUpperCase();
        var filter1 = self.filterOpr1();
        var filter2 = self.filterOpr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.OprList();
        } else {
            tempData = ko.utils.arrayFilter(self.OprList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageOpr = ko.computed(function () {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function () {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function () {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function () {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function () {
        countOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(countOpr - 1);
        else
            self.currentPageIndexOpr(countOpr);
    };

    self.sortTableOpr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshOpr').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست پروژه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getOprList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddOpr = function (item) {

        OprCode = item.Code;
        find = false;
        list_OprSelect.forEach(function (item, key) {
            if (item == OprCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListOpr').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[counterOpr] = item.Code;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
        list_OprSelect = new Array();
        list = self.OprList();
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListOpr').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[i] = list[i].Code;
            counterOpr = i + 1;
        }
    };


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr + ' مورد انتخاب شده ')
        else
            $('#nameOpr').val('همه موارد');
    });

    $('#modal-Opr').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });









    self.currentPageAMode = ko.observable();
    self.pageSizeAMode = ko.observable(10);
    self.currentPageIndexAMode = ko.observable(0);

    self.filterAMode0 = ko.observable("");
    self.filterAMode1 = ko.observable("");
    self.filterAMode2 = ko.observable("");

    self.filterAModeList = ko.computed(function () {

        self.currentPageIndexAMode(0);
        var filter0 = self.filterAMode0().toUpperCase();
        var filter1 = self.filterAMode1();
        var filter2 = self.filterAMode2();

        if (!filter0 && !filter1 && !filter2) {
            return self.AModeList();
        } else {
            tempData = ko.utils.arrayFilter(self.AModeList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAMode = ko.computed(function () {
        var pageSizeAMode = parseInt(self.pageSizeAMode(), 10),
            startIndex = pageSizeAMode * self.currentPageIndexAMode(),
            endIndex = startIndex + pageSizeAMode;
        return self.filterAModeList().slice(startIndex, endIndex);
    });

    self.nextPageAMode = function () {
        if (((self.currentPageIndexAMode() + 1) * self.pageSizeAMode()) < self.filterAModeList().length) {
            self.currentPageIndexAMode(self.currentPageIndexAMode() + 1);
        }
    };

    self.previousPageAMode = function () {
        if (self.currentPageIndexAMode() > 0) {
            self.currentPageIndexAMode(self.currentPageIndexAMode() - 1);
        }
    };

    self.firstPageAMode = function () {
        self.currentPageIndexAMode(0);
    };

    self.lastPageAMode = function () {
        countAMode = parseInt(self.filterAModeList().length / self.pageSizeAMode(), 10);
        if ((self.filterAModeList().length % self.pageSizeAMode()) == 0)
            self.currentPageIndexAMode(countAMode - 1);
        else
            self.currentPageIndexAMode(countAMode);
    };

    self.sortTableAMode = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.AModeList.sort(function (left, right) {
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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshAMode').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست پروژه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getAModeList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddAMode = function (item) {

        AModeCode = item.Code;
        find = false;
        list_AModeSelect.forEach(function (item, key) {
            if (item == AModeCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListAMode').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_AModeSelect[counterAMode] = item.Code;
            counterAMode = counterAMode + 1;
        }
    };


    self.AddAllAMode = function () {
        list_AModeSelect = new Array();
        list = self.AModeList();
        $("#TableBodyListAMode").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListAMode').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_AModeSelect[i] = list[i].Code;
            counterAMode = i + 1;
        }
    };


    self.DelAllAMode = function () {
        list_AModeSelect = new Array();
        counterAMode = 0;
        $("#TableBodyListAMode").empty();
    };


    $('#modal-AMode').on('hide.bs.modal', function () {
        if (counterAMode > 0)
            $('#nameAMode').val(counterAMode + ' مورد انتخاب شده ')
        else
            $('#nameAMode').val('همه موارد');
    });

    $('#modal-AMode').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    function CreateTableReport(data) {
        $("#TableReport").empty();

        level = $("#Level").val();

        createTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzAcc">' +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('MonBede', data) +
            CreateTableTh('MonBest', data) +
            CreateTableTh('MonTotal', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageTrzAcc}" style="cursor: default;">';
        if (level == 1)
            createTable +=
                '     <tr>'
        else
            createTable +=
                '     <tr data-bind="style: { \'background-color\': Level == 1 && MainLevel > 1 ? \'#f5efeb\' : \'\' }" >'

        createTable +=
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Best', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBest', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonTotal', sessionStorage.Deghat, 2, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('AccCode', 0, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('MonBede', 2, data) +
            CreateTableTdSum('MonBest', 2, data) +
            CreateTableTdSum('MonTotal', 2, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('MonBede', data) +
            CreateTableTdSearch('MonBest', data) +
            CreateTableTdSearch('MonTotal', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableReport').append(
            createTable
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
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










    function getSathTaraz() {
        select = document.getElementById('SathTaraz');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 1;
                opt.innerHTML = 'تراز در سطح';
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 2;
                opt.innerHTML = 'تراز تا سطح';
            }
            select.appendChild(opt);
        }
    };


    function getLevel() {
        select = document.getElementById('Level');
        for (var i = 0; i <= 4; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 1;
                opt.innerHTML = 'کل';
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 2;
                opt.innerHTML = 'معین';
            }
            if (i == 2) {
                opt.value = 3;
                opt.innerHTML = 'تفصیلی 1';
            }
            if (i == 3) {
                opt.value = 4;
                opt.innerHTML = 'تفصیلی 2';
            }
            if (i == 4) {
                opt.value = 5;
                opt.innerHTML = 'تفصیلی 3';
            }
            select.appendChild(opt);
        }
    };




    $('.fix').attr('class', 'form-line date focused fix');

    createViewer();
    $('#Print').click(function () {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();
        setReport(self.filterTrzAccList(), 'Report_TrzAcc', FromDate, ToDate);
    });
};

ko.applyBindings(new ViewModel());