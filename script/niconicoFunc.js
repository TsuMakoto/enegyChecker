/** 
 * 入力されている日毎のデータを連想配列で保存
 * key : 日付
 * value : 
 *      niconico-icon : アイコンの右からの番号,
 *      comment : 一言コメント,
 *      reflection : 振り返り
 *
 *      データベースへの保存用配列(にできると思われる)
 * */
var _niconicoData= {};

/** 
 * 日付の上をマウスがホバーした時のイベントを登録
 * マウスがホバーした時に、カレンダーの日付の背景の色を変更
 * */
$(document).on({
    'mouseenter' : function () {
        if (!$(this).hasClass('day-area')) {
            $(this).addClass('hover-date');
        }
    },
    'mouseleave' : function () {
        if (!$(this).hasClass('day-area')) {
            $(this).removeClass('hover-date');
        }
    }
}, '.calendar td');

/**
 * 日付がクリックされた時のイベント
 * ニコニコ機能({@link #niconicoFunc})を呼びだし、カレンダーに
 * iconを表示する。
 * ただし、前月、次月が選択された時は何もしない
 *
 * */
$(document).on('click', '.calendar td', function() {
    if (!$(this).hasClass('prev-month') 
        && !$(this).hasClass('next-month') 
        && !$(this).hasClass('day-area')) {
        // 現在選択されている日付を解除
        $('.selected-date').removeClass('selected-date');
        // 選択された日付にクラスを付与
        $(this).addClass('selected-date');

        // TODO: NICONICO_DATAから現在の状態を取得し
        // previewNicoFuncで現在の状態をサイドバーに反映
        previewNicoFunc($(this).text());
    }
});


/** 
 * アイコンをクリックした時に、アイコンが選択状態にする
 * 先に選択されているアイコンは選択を解除する。
 * */
$(document).on('click', '.nico-icons img', function() {
    // 現在選択されているアイコンを解除
    $('.selected-icon').removeClass('selected-icon');
    // 選択された日付にアイコンを付与
    $(this).addClass('selected-icon');
});


/**
 * 保存ボタンが押された時に、値を更新する。
 * 配列がからである可能性があるので、都度更新をかける
 * */
$(document).on('click', '#registed', function() {
    // 現在設定されているカレンダーの日付を取得
    const idxSelectedDate = $('.calendar td').index($('.selected-date'));
    if (idxSelectedDate !== -1) {
        
        const dateNum = $('.calendar table td').eq(idxSelectedDate).text(); 
        // 値の更新
        _niconicoData[dateNum] = {
            'niconico-icon' : $('#nico-condition img').index($('.selected-icon')),
            'comment' :  $('#day-comment').val(),
            'reflection' : $('#reflection').val()
        };
        if (_niconicoData[dateNum]['niconico-icon'] !== -1) {
            $('.calendar table td').eq(idxSelectedDate)
                .css('background-image',  'url("' + $('.selected-icon').attr('src') + '")');
        }
        
    }

    
});


/** 
 * 現在のニコニコ機能の状態を表示
 * @param {string} targetDate ニコニコ機能の配列の表示したい日付
 *
 * */
function previewNicoFunc(targetDate) {
    const selectedDateNicoItem = _niconicoData[targetDate];
    var dayComment = '';
    var reflection = '';
    if (selectedDateNicoItem !== undefined) {
        // icon情報を取得
        var idxSelectedIcon = selectedDateNicoItem['niconico-icon'];
        if (idxSelectedIcon === -1) {
            $('.selected-icon').removeClass('selected-icon');
        } else {
            $('#nico-condition img')
                .eq(idxSelectedIcon)
                .addClass('selected-icon');
        }
        // コメント情報を取得
        dayComment = selectedDateNicoItem['comment'];
        if (dayComment === undefined) {
            dayComment = '';
        }
        $('#day-comment').val(dayComment);
        // １日の反省に関する情報を取得
        reflection = selectedDateNicoItem['reflection'];
        if (reflection === undefined) {
            reflection = '';
        }
        $('#reflection').val(reflection);
    } else {
        // 日付に情報が設定されいなければ、そのまま初期表示する
        $('.selected-icon').removeClass('selected-icon');
        $('#day-comment').val(dayComment);
        $('#reflection').val(reflection);
    }
}


/**
 * 保持しているデータをクリアする
 *  外部呼び出し用
 * */
function clearData() {
     _niconicoData = {};
}
