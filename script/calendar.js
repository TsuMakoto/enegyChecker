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
    const startDate = startDateInfo.getDate();
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
        var week = createWeek(firstWeekInfo);
        $calendar.append(week);
        firstWeekInfo.setDate(firstWeekInfo.getDate() + DAY_COUNT);
    }
}

/** 
 * 日曜日から１週間分のデータを作成
 * @param {Date} startDate 日曜日の日付
 *
 * @return {JQuery} １週間分のテーブルデータ
 * */
function createWeek(startDate) {
    var week = $('<tr></tr>');
    for (var i = 0; i < DAY_COUNT; i++) {
        const dateInfo = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        dateInfo.setDate(dateInfo.getDate() + i);
        var dateData = $(`<td>${dateInfo.getDate()}</td>`);
        if (dateInfo.getDay() === 0) {
            dateData.attr('class', 'sunday');
        } else if (dateInfo.getDay() === DAY_COUNT - 1) {
            dateData.attr('class', 'saturday');
        }
        week.append(dateData);
    }

    return week;
}

/** 
 * @param {string} currMonth 現在の月
 *
 * @return {Date} currMonthをDate型にコンバートした値 
 *                コンバートできなければ、現在の日付
 * */
function getCurrMonth(currMonth) {
    var currMonth = new Date(currMonth);
    
    if (currMonth !== undefined) {
        return currMonth;
    } else {
        return new Date();
    }
}
