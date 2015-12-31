(function (Vue, Clipboard) {

  'use strict';

  var parseArray = function (array, fn) {
    return array.map(fn).join('');
  };

  var parse = function (option) {
    return '<table style="width:100%;background-color:' + option.colors.bg + ';font-family:\'Microsoft YaHei\',arial,sans-serif">' +
      '<tr><td style="padding:0;padding-top:12px">' +
        '<table style="max-width:600px;margin:0 auto;color:' + option.colors.body.fg + '">' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + option.colors.title.bg + ';text-align:center;font-size:1.4em">' +
            '<a href="' + option.url + '" style="color:' + option.colors.title.fg + ';text-decoration:none">' +
              'Web Weekly #' + option.number +
            '</a>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + option.colors.body.bg + '">' +
            '<p>Web 组同学们~</p>' +
            '<p><a href="' + option.url + '" style="color:' + option.colors.text.a + '">Web 组第' + option.number + '期周报</a>出炉了~</p>' +
            '<p>本期热点:</p>' +
            '<ul style="margin:0;padding:0 0 0 24px">' +
              parseArray(option.topics, function (topic) {
                return '<li>' + topic.title + '&nbsp;<span style="color:' + option.colors.text.shadow + '">' + topic.description + '</span></li>';
              }) +
              '<li>......</li>' +
            '</ul>' +
            '<p>' +
              '编辑: <a href="https://github.com/' + option.editor + '" style="color:' + option.colors.text.a + '">' + option.editor + '</a>;<br/>' +
              '投稿:' +
              parseArray(option.volunteers, function (volunteer, volunteerIndex) {
                return '&nbsp;<a href="https://github.com/' + volunteer.name + '" style="color:' + option.colors.text.a + '">' + volunteer.name + '</a>' + (
                  volunteerIndex === option.volunteers.length - 1 ? '.' : ','
                );
              }) +
            '</p>' +
            '<p><a href="' + option.url + '" style="display:box;padding:8px 16px;background-color:' + option.colors.button.bg + ';color:' + option.colors.button.fg + ';text-decoration:none;border-radius:6px">点此阅读</a></p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + option.colors.body.bg + '">' +
            '<p>' + option.body + '</p>' +
            '<p style="text-align:right">' + option.sender + '<br/>' + option.date + '</p>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;background-color:' + option.colors.body.bg + ';text-align:center;font-size:0.8em">' +
            '<span style="color:' + option.colors.text.a + '">长期广告位:</span>&nbsp;' +
            '<a href="https://github.com/dyweb/web-stuff/issues" style="color:' + option.colors.text.a + '">周报投稿/建议</a>&nbsp;' +
            '<a href="http://git.tongqu.me/dy/guide/tree/master/web/project" style="color:' + option.colors.text.a + '">项目建立/加入</a>&nbsp;' +
            '<a href="http://qa.dongyue.io/" style="color:' + option.colors.text.a + '">提问/分享</a>' +
          '</td></tr>' +
          '<tr><td style="margin:0;padding:12px 8px;color:' + option.colors.text.a + ';text-align:center;font-size:0.75em">' +
            '<p style="margin:0;padding:0">东岳网络工作室 - Web 组</p>' +
            '<p style="margin:0;padding:0">Questions? Email <a href="mailto:web@dongyue.io" style="color:' + option.colors.text.a + '">web@dongyue.io</a></p>' +
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
    date: '',
    colors: {
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
    }
  };

  new Vue({
    el: '#template-box',
    data: {
      weekly: weekly
    },
    methods: {
      remove: function (array, $index) {
        array.splice($index, 1);
      },
      import: function () {
        var raw = prompt('Input JSON');
        try {
          if (raw) {
            this.weekly = JSON.parse(raw);
            Vue.nextTick(Color.render);
          }
        } catch (e) {}
      }
    }
  });

  var Color = {
    init: function () {
      $('input[type=color]').spectrum({
        preferredFormat: "hex",
        showInput: true
      });
    },
    render: function () {
      $('input[type=color]').each(function (i, e) {
        $(e).spectrum('set', $(e).val());
      });
    }
  }
  Color.init();

  function newClip(selector, fn) {
    new Clipboard(selector, {
      text: function (trigger) {
        var originText = trigger.innerText;
        trigger.innerText = 'Copied';
        setTimeout(function () {
          trigger.innerText = originText;
        }, 800);
        return fn(weekly);
      }
    });
  }

  newClip('#weekly-copy-html', parse);
  newClip('#weekly-copy-json', function (object) {
    return JSON.stringify(object, '\n', '  ');
  });

})(window.Vue, window.Clipboard);
