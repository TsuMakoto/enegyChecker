function previewDateList(dateList) {
    var weekList = $('list-item');
    for (var i = 0; i < dateList.length; i++) {
        var dateItem = $('li');
        dateItem.addClass('week-list-item');
        
        var dateInfo = dateList[i];
        // icon情報
        var iconData = $('<img>');
        iconData.attr('src', $('.nico-icons img').eq(_niconicoData[dateInfo['niconico-icon']]).attr('src'));

        // コメント情報
        var commentData = $('<pre></pre>');
        commentData.[dateInfo['comment']]
    }

}
