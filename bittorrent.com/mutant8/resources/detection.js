/* BrowserDetect thanks to quirksmode
http://www.quirksmode.org/js/detect.html
Edited to add in silk/kindle detection */
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", this.OS = this.searchString(this.dataOS) || "an unknown OS"
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string,
                dataProp = data[i].prop;
            if (this.versionSearchString = data[i].versionSearch || data[i].identity, dataString) {
                if (-1 != dataString.indexOf(data[i].subString)) return data[i].identity
            } else if (dataProp) return data[i].identity
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (-1 != index) return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.userAgent,
        subString: "Silk",
        identity: "Silk"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iPad"
    },
     {
        string: navigator.userAgent,
        subString: "Android",
        identity: "Android"
    }, {
        string: navigator.userAgent,
        subString: "Silk",
        identity: "Android"
    }, {
        string: navigator.userAgent,
        subString: "Windows Phone",
        identity: "Windows Phone"
    }, {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]
};
BrowserDetect.init();

/* Custom Functionality - WAT */
(function($) {
  var _browser_information = BrowserDetect;

  var setDetection = {
    b_info : undefined,

    init : function (browser_info) {
      if (typeof(browser_info) == 'undefined')
        return false;

      this.b_info = browser_info;

      this.browser_class = (browser_info.OS + '-' + browser_info.browser).toLowerCase();

      $('body').addClass(this.browser_class);

      return true;
    },

    switch_instructions : function () {
      if (typeof(this.b_info) == 'undefined' || this.b_info.OS == 'Android' || this.b_info.OS == 'Linux')
        return false;

      var browser_info = this.b_info,
          client_shots = $('.clnt'),
          torrent_shots = $('.trnt'),
          root_path = '/images/site/instructions/',
          paths = [
            ['install-download-', 'install-installer-', 'install-launch-'],
            ['torrent-download-', 'torrent-draganddrop-', 'torrent-getfiles-']
          ];

      $.each(client_shots, function(i, sht) {
        if (i === 0)
          var c_info = (browser_info.OS + '-' + browser_info.browser).toLowerCase() + '.jpg';
        else
          var c_info = browser_info.OS.toLowerCase() + '.jpg';

        $(sht).css('background-image', 'url(\'' + root_path + paths[0][i] + c_info + '\')');
      });

      $.each(torrent_shots, function(i, sht) {
        if (i === 0)
          var c_info = (browser_info.OS + '-' + browser_info.browser).toLowerCase() + '.jpg';
        else
          var c_info = browser_info.OS.toLowerCase() + '.jpg';

        $(sht).css('background-image', 'url(\'' + root_path + paths[1][i] + c_info + '\')');
      });

      return true;
    }
  };

  $(document).ready(function() {
    setDetection.init(_browser_information);

    var i_screens = $('.instructions-screenshot');

    if (i_screens.length > 0)
      setDetection.switch_instructions();
  });
}(jQuery));
