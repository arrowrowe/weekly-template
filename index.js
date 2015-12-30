(function (Vue, Clipboard) {

  'use strict';

  // $('input.color')

  var parseArray = function (array, fn) {
    return array.map(fn).join('');
  };

  var parse = function (option) {
    return '<table style="width:100%;background-color:' + colors.bg + ';font-family:\'Microsoft YaHei\',arial,sans-serif">' +
      '<tr><td style="padding:0;padding-top:12px">' +
        '<table style="max-width:600px;margin:0 auto;color:' + colors.body.fg + '">' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + colors.title.bg + ';text-align:center;font-size:1.4em">' +
            '<a href="' + option.url + '" style="color:' + colors.title.fg + ';text-decoration:none">' +
              'Web Weekly #' + option.number +
            '</a>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + colors.body.bg + '">' +
            '<p>Web 组同学们~</p>' +
            '<p><a href="' + option.url + '" style="color:' + colors.text.a + '">Web 组第' + option.number + '期周报</a>出炉了~</p>' +
            '<p>本期热点:</p>' +
            '<ul style="margin:0;padding:0 0 0 24px">' +
              parseArray(option.topics, function (topic) {
                return '<li>' + topic.title + '&nbsp;<span style="color:' + colors.text.shadow + '">' + topic.description + '</span></li>';
              }) +
              '<li>......</li>' +
            '</ul>' +
            '<p>' +
              '编辑: <a href="https://github.com/' + option.editor + '" style="color:' + colors.text.a + '">' + option.editor + '</a>;<br/>' +
              '投稿:' +
              parseArray(option.volunteers, function (volunteer, volunteerIndex) {
                return '&nbsp;<a href="https://github.com/' + volunteer.name + '" style="color:' + colors.text.a + '">' + volunteer.name + '</a>' + (
                  volunteerIndex === option.volunteers.length - 1 ? '.' : ','
                );
              }) +
            '</p>' +
            '<p><a href="' + option.url + '" style="display:box;padding:8px 16px;background-color:' + colors.button.bg + ';color:' + colors.button.fg + ';text-decoration:none;border-radius:6px">点此阅读</a></p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + colors.body.bg + '">' +
            '<p>' + option.body + '</p>' +
            '<p style="text-align:right">' + option.sender + '<br/>' + option.date + '</p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + colors.body.bg + ';text-align:center;font-size:0.8em">' +
            '<span style="color:' + colors.text.a + '">长期广告位:</span>&nbsp;' +
            '<a href="https://github.com/dyweb/web-stuff/issues" style="color:' + colors.text.a + '">周报投稿/建议</a>&nbsp;' +
            '<a href="http://git.tongqu.me/dy/guide/tree/master/web/project" style="color:' + colors.text.a + '">项目建立/加入</a>&nbsp;' +
            '<a href="http://qa.dongyue.io/" style="color:' + colors.text.a + '">提问/分享</a>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;color:' + colors.text.a + ';text-align:center;font-size:0.75em">' +
            '<p style="margin:0;padding:0">东岳网络工作室 - Web 组</p>' +
            '<p style="margin:0;padding:0">Questions? Email <a href="mailto:web@dongyue.io" style="color:' + colors.text.a + '">web@dongyue.io</a></p>' +
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

  var colors = {
    bg: '#ffbaba',
    title: {
      bg: '#ff0000',
      fg: '#ffffff'
    },
    body: {
      bg: '#ffdcdc',
      fg: '#000000'
    },
    text: {
      a: '#ff3b3b',
      shadow: '#ffa3a3'
    },
    button: {
      bg: '#ee0000',
      fg: '#eeeeee'
    }
  };

  new Vue({
    el: '#template-box',
    data: {
      weekly: weekly,
      colors: colors
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
