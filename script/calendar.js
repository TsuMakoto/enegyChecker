/* global clearData */

// １週間
const DAY_COUNT = 7;
// const NUM_TO_WEEK = {""};

$(window).on('load', function() {
    var currMonthInfo = $('.curr-month').text();
    var currMonth = getCurrMonth(currMonthInfo);
    showCalendar(currMonth.getFullYear(), currMonth.getMonth() + 1);
});

/**
 * 一ヶ月分のカレンダーを表示
 * @param {number} year 年の数字
 * @param {number} month 月の数字
 * */
function showCalendar(year, month) {
    // １日を取得
    const startDateInfo = new Date(year, month - 1, 1);
    // １日の曜日を数値で取得
    const startWeek = startDateInfo.getDay();
    // 前の月も含め、日曜日の日付を取得
    const firstWeekInfo = new Date(startDateInfo.getFullYear(), startDateInfo.getMonth(), startDateInfo.getDate());
    firstWeekInfo.setDate(firstWeekInfo.getDate() - startDateInfo.getDay());
    // 月の最終日を取得
    const endDate = new Date(year, month, 0).getDate();
    // 月の週の数
    const weekCount = (endDate - (DAY_COUNT - startWeek)) / DAY_COUNT + 1;
    var $calendar = $('.calendar tbody');
    for (var i = 0; i < weekCount; i++) {
        var week = createWeek(firstWeekInfo, month);
        $calendar.append(week);
        firstWeekInfo.setDate(firstWeekInfo.getDate() + DAY_COUNT);
    }
    setCurrMonth(year, month);
    clearData();
}

/** 
 * 日曜日から１週間分のデータを作成
 * @param {Date} startDate 日曜日の日付
 * @param {number} currMonth 現在の月
 *
 * @return {JQuery} １週間分のテーブルデータ
 * */
function createWeek(startDate, currMonth) {
    var week = $('<tr></tr>');
    for (var i = 0; i < DAY_COUNT; i++) {
        const dateInfo = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        dateInfo.setDate(dateInfo.getDate() + i);
        var dateData = $(`<td>${dateInfo.getDate()}</td>`);
        if (dateInfo.getMonth() + 1 < currMonth) {
            // 月が前の月ならprevMonthを付与
            dateData.attr('class', 'prev-month');
        } else if (dateInfo.getMonth() + 1 > currMonth) {
            // 月が次の月ならnextMonthを付与
            dateData.attr('class', 'next-month');
        } else if (isHoliday(dateInfo)) {
            // 休日ならholidayを付与
            dateData.attr('class', 'holiday');
        } else if (dateInfo.getDay() === DAY_COUNT - 1) {
            // 土曜ならsaturdayを付与
            dateData.attr('class', 'saturday');
        }
        week.append(dateData);
    }

    return week;
}

/** 
 * @param {string} currMonth (year / month) 現在の月
 *
 * @return {Date} currMonthをDate型にコンバートした値 
 *                コンバートできなければ、現在の日付
 * */
function getCurrMonth(currMonth) {
    // 年と月を配列へ変更
    var arrYAndM = currMonth.split(' / ');
    var currMonthInfo = new Date(Number(arrYAndM[0]), Number(arrYAndM[1] - 1));
    
    if (currMonthInfo !== undefined) {
        return currMonthInfo;
    } else {
        return new Date();
    }
}

/** 
 * 年月の設定し直し
 * yyyy / mm形式で登録
 * @param {number} year 年
 * @param {number} manth 月
 * */
function setCurrMonth(year, month) {
    $('.curr-month').text(`${year} / ${month}`);
}


/** 
 * 休日判定処理
 * @param {Date} targetDate 判定対象の日付
 *
 * @return 休日ならtrue (ただし、土曜はのぞく) : false
 *
 * */
function isHoliday(targetDate) {
    if (targetDate.getDay() === 0) {
        return true;
    } else {
        // TODO: 祝日の判定を記述
        return false;
    }
}
