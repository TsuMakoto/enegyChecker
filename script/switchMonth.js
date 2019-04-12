/* global showCalendar */
/* global getCurrMonth */


/**
 * 年月からカレンダーの表示を切り替え
 *
 * @param {number} year 年
 * @param {number} month 月
 *
 * */
function changedMonth(year, month) {
    var calendarTable = $('.calendar table tr');
    var rowCount = calendarTable.length;
    for (var i = 1; i < rowCount; i++) {
        // 一つ目の要素は曜日が書いてあるため削除しない
        calendarTable.eq(i).remove();
    }
    showCalendar(year, month);
}

$(function() {
    /** 
     * 前月に戻るボタンが押された時のイベント
     * */
    $('#switch-prev-btn').click(function () {
        // 現在の日付を取得
        var currMonthInfo = $('.curr-month').text();
        var currMonth = getCurrMonth(currMonthInfo);
        // 年月を取得
        var year = currMonth.getFullYear();
        var month = currMonth.getMonth() + 1; 
        if (month === 1) {
            year--;
            month = 12;
        } else {
            month--;
        }
        changedMonth(year, month);
    });

    /** 
     * 次月に進むボタンが押された時のイベント
     * */
    $('#switch-next-btn').click(function () {
        // 現在の日付を取得
        var currMonthInfo = $('.curr-month').text();
        var currMonth = getCurrMonth(currMonthInfo);
        // 年月を取得
        var year = currMonth.getFullYear();
        var month = currMonth.getMonth() + 1; 
        if (month === 12) {
            year++;
            month = 1;
        } else {
            month++;
        }
        changedMonth(year, month);
    });
});
