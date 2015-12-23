(function (Vue, Clipboard) {

  'use strict';

  var parseArray = function (array, fn) {
    return array.map(fn).join('');
  };

  var parse = function (option) {
    return '<table style="width:100%;background-color:#ffbaba;font-family:\'Microsoft YaHei\',arial,sans-serif">' +
      '<tr><td style="padding:0;padding-top:12px">' +
        '<table style="max-width:600px;margin:0 auto">' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:#f00;color:#fff;text-align:center;font-size:1.4em">' +
            'Web Weekly #' + option.number +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:#ffdcdc">' +
            '<p>Web 组同学们~</p>' +
            '<p><a href="' + option.url + '" style="color:#ff3b3b">Web 组第' + option.number + '期周报</a>出炉了~</p>' +
            '<p>本期热点:</p>' +
            '<ul style="margin:0;padding:0 0 0 24px">' +
              parseArray(option.topics, function (topic) {
                return '<li>' + topic.title + '&nbsp;<span style="color:#ffa3a3">' + topic.description + '</span></li>';
              }) +
              '<li>......</li>' +
            '</ul>' +
            '<p>' +
              '编辑: <a href="https://github.com/' + option.editor + '" style="color:#ff3b3b">' + option.editor + '</a>;<br/>' +
              '投稿:' +
              parseArray(option.volunteers, function (volunteer, volunteerIndex) {
                return '&nbsp;<a href="https://github.com/' + volunteer.name + '" style="color:#ff3b3b">' + volunteer.name + '</a>' + (
                  volunteerIndex === option.volunteers.length - 1 ? '.' : ','
                );
              }) +
            '</p>' +
            '<p><a href="' + option.url + '" style="display:box;padding:8px 16px;background-color:#e00;color:#eee;text-decoration:none;border-radius:6px">点此阅读</a></p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:#ffdcdc">' +
            '<p>' + option.body + '</p>' +
            '<p style="text-align:right">' + option.sender + '<br/>' + option.date + '</p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:#ffdcdc;text-align:center;font-size:0.8em">' +
            '<span style="color:#ff3b3b">长期广告位:</span>' +
            '<a href="https://github.com/dyweb/web-stuff/issues" style="color:#ff3b3b">周报投稿/建议</a>' +
            '<a href="http://git.tongqu.me/dy/guide/tree/master/web/project" style="color:#ff3b3b">项目建立/加入</a>' +
            '<a href="http://qa.dongyue.io/" style="color:#ff3b3b">提问/分享</a>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;color:#ff3b3b;text-align:center;font-size:0.75em">' +
            '<p style="margin:0;padding:0">东岳网络工作室 - Web 组</p>' +
            '<p style="margin:0;padding:0">Questions? Email <a href="mailto:web@dongyue.io" style="color:#ff3b3b">web@dongyue.io</a></p>' +
          '</td></tr>' +
        '</table>' +
      '</td></tr>' +
    '</table>';
  };

  Vue.filter('parse', parse);

  var weekly = {
    number: '',
    url: '',
    topics: [{title: '', description: ''}],
    editor: '',
    volunteers: [{name: ''}],
    body: '',
    sender: '',
    date: ''
  };

  new Vue({
    el: '#template-box',
    data: {
      weekly: weekly
    },
    methods: {
      remove: function (array, $index) {
        array.splice($index, 1);
      }
    }
  });

  new Clipboard('#weekly-copy-html', {
    text: function (trigger) {
      trigger.innerText = 'Copied';
      setTimeout(function () {
        trigger.innerText = 'Copy HTML';
      }, 800);
      return parse(weekly);
    }
  });

})(window.Vue, window.Clipboard);
