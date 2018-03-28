(function($) {
    $(document).ready(function() {
        /* Mobile Nav */
        $('#mobile-nav-link').on('click', function() {
            $('#header-nav').toggleClass('mobile_view');
        });
        var $navCategories = $('.nav-category');
        $.each($navCategories, function(i, nc) {
            $(nc).on('click', function(e) {
                var $subNav = $(nc).next('.sub-nav');
                if ($subNav) { $subNav.toggleClass('mobile_view'); }
            });
        });

        var fadeInModal = function(modalClass) {
          setTimeout(function() {
            $('.JS_MODAL_SCREEN').fadeIn(700);
            $(modalClass).fadeIn(700);
          }, 1000);

          $('.JS_CLOSE_MODAL, .JS_MODAL_SCREEN').click(function() {
            $(modalClass).fadeOut();
            $('.JS_MODAL_SCREEN').fadeOut();
          });
        };

        $('.surf-modal-btn').on('click', function(){
          fadeInModal('.surf-modal');
        });

        $('.bt-dl-btn').click(function() {
          window.location.href = $(this).attr('href');
        });
       
        $('.sync-dl-btn').click(function() {
            try{
                __adroll.record_user({'adroll_segments': 'sync_download'})
           } catch(err) {}
        });

        //SYNC DOWNLOAD MODAL
        $('.sync-dl-btn, .sync-modal').click(function() {
          $dl_link = $(this).attr('href');
          if ($('.sync-modal').length > 0) 
            $('.auto-sync-download-link').attr('href', $dl_link)
          setTimeout(window.location.href=$dl_link, 3000);
          fadeInModal('.SYNC_JS_MODAL');
        });

        //COLORBOX
        if ((!$.browser.msie || ($.browser.msie && parseInt($.browser.version, 10) > 8)) && ($(window).width() >= 690) && top === self) {
            $('.youtube').colorbox({iframe:true, innerWidth:'640px', innerHeight:'360px', opacity: 0.4});
        }

        /*Fixed Header*/
        var $header = $('#header'),
            $navContainer = $('.header-nav-container', $header),
            $buttonContainer = $('.header-download-container', $header),
            $button = $('.header-download-btn', $buttonContainer);

       $navContainer.css({ 'right': '-' + $buttonContainer.outerWidth() + 'px' });
	   
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            // shows top nav "download" only after scrolling past primary cta
            if(scrollTop >= 250) {
                $header.addClass('above');
                $navContainer.css({ 'right': 0 });
            } else {
              $header.removeClass('above');
              $navContainer.css({
                  'right': '-' + $buttonContainer.outerWidth() + 'px'
              });
            }
        });

        var sendMailChimp = function(pageName, modalClass, emailText, success, emailID) {
          $.ajax({
            url: '/mailChimp/mailChimp_address.php',
            data: 'ajax=true&page='+ pageName +'&email=' + emailEntered,
            success: function(msg) {
              setTimeout(function() {
                $(emailText).fadeOut(100)
                $(success).fadeIn(700);
                $('.FORM_TEXT_FIELD').value = "";
              }, 300);
              setTimeout(function() {
                $(modalClass).fadeOut();
                $('.JS_MODAL_SCREEN').fadeOut();
                if(modalClass == '.BT_JS_MODAL'){  
                  window.location.href = btdlredirect;
                }
              }, 2000);
            }
          });
          return false;
        };

        //POST DOWNLOAD STUFF
        if ($('#subFormSync').length > 0 || $('#subForm').length > 0 || $('#subForm2').length > 0 ) {
            $('#mc-embedded-subscribe-bt').bind('click', function(e){ 
                var result = validateMail('#mce-EMAIL-bt', '#subForm', '.BT_JS_MODAL', '.BT_NOTIF_EMAIL', '.BT_NOTIF_SUCCESS', '.BT_NOTIF_ERROR', '.BT_FORM_CHECKBOX', '.BT_TERMS_TEXT', '.BT_TERMS_TEXT_ERROR');
                return result;
             });
             
             $('#mc-embedded-subscribe-sync').bind('click', function(e){ 
                  var result =  validateMail('#mce-EMAIL-sync', '#subFormSync', '.SYNC_JS_MODAL', '.SYNC_NOTIF_EMAIL', '.SYNC_NOTIF_SUCCESS', '.SYNC_NOTIF_ERROR', '.SYNC_FORM_CHECKBOX', '.SYNC_TERMS_TEXT', '.SYNC_TERMS_TEXT_ERROR');
                  return result;
              });
              
              $('#mc-embedded-subscribe').bind('click', function(e){ 
                   var result = validateMail('#mce-EMAIL', '#subForm', '.JS_MODAL', '.NOTIF_EMAIL', '.NOTIF_SUCCESS', '.NOTIF_ERROR', '.FORM_CHECKBOX', '.TERMS_TEXT', '.TERMS_TEXT_ERROR');
                   return result;
              });
            
          var validateMail = function(emailID, formID, modalClass, emailText, success, error, checkbox, termsText, termsErr) {   
            var checkedCheckbox = false; 
            if($(checkbox+':checkbox:checked').length > 0) {
                checkedCheckbox = true;
            }
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var emailaddressVal = $(emailID).val();
            var complete = true;
            
            // check for email validation
            if(emailaddressVal === '' || !emailReg.test(emailaddressVal)) {
              $(error).fadeIn(700);
              $('.FORM_TEXT_FIELD').css({ "border": "1px solid #ff0000" });
              complete = false;
            } else { // reset initial state in case it was erroring before
              $(error).fadeOut();
              $('.FORM_TEXT_FIELD').css({ "border": "1px solid #8D8D8D" });
            }
            // make sure checkbox is checked
            if (checkedCheckbox === false)  $(termsErr).fadeIn(700);  
            else  $(termsErr).fadeOut(700); 
            
            if (complete === true) { emailEntered = escape($(emailID).val()); }
            else  emailEntered = ""; //passing empty param so that mailchimp logic error's out
            
            // POST DL/INSTALL stuff
            if(checkedCheckbox === true ){                
                if (modalClass == '.BT_JS_MODAL') { $('#subForm').submit(sendMailChimp('postDL', '.BT_JS_MODAL', emailText, success, emailID)); }
                else if (modalClass == '.SYNC_JS_MODAL') { $('#subFormSync').submit(sendMailChimp('syncPostDL', '.SYNC_JS_MODAL',  emailText, success, emailID)); }
                else { $('#subForm2').submit(sendMailChimp('postInstall', '.AUTO_JS_MODAL', emailText, success, emailID)); }
            }
            else return false;
         }
        }

        //Language drop-down
        $('.lang-menu').click(function(){
         $('.lang-list').toggleClass('lang-list-active');
        });

        //language selector homepage
        $('.fa-angle-up, .fa-globe').on('click', function(){
          open($('.lang-select'));
        })

        $('.lang-select').on('change',function() {
            window.location.href = $(this).val();
        });

        //select appropriate language after reload
        var langSplitUrl = window.location.pathname.split( '/' );

        if (langSplitUrl[1] == "lang"){
          $('.lang-select option[value="/lang/'+langSplitUrl[2]+'/index/setLocale/locale/'+langSplitUrl[2]+'"]').prop('selected', true);      
        }
        else {
          $('.lang-select option[value="/index/setLocale/locale/en"]').prop("selected",true);
        }

        //opens select box when clicking on arrow or globe
        function open(elem) {
            if (document.createEvent) {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                elem[0].dispatchEvent(e);
            } else if (element.fireEvent) {
                elem[0].fireEvent("onmousedown");
            }
        }

        //nutshell form validation
        var formValid = function(fields) {
            var fieldname,
              checkedAtLeastOne = false;
            for(fieldname in fields) {
                var currentField = fields[fieldname];

                if ($.trim($(currentField).val()) === "") {
                    $(currentField).css({'border-color':'#d1201a', 'box-shadow': '0 1px 1px rgba(0,0,0,.075)inset'});
                    $('.error_note').show();
                    return false;
                }
                else {
                    $('.error_note').hide();
                    $(currentField).css({'border-color': '#e6e6e6', 'box-shadow':'none'});
                }
            }

            //check to see if form has a checkbox checked
            $('.checkbox-validator').each(function() {
                if ($(this).is(":checked")) {
                  checkedAtLeastOne = true;
                  return checkedAtLeastOne;
                }
            });

            //if checkbox is not checked and required
            if ($('.checkbox-validator').length){
              if (checkedAtLeastOne !== true){
                $('.error_note').show();
                $("html, body").animate({ scrollTop: $('form').offset().top }, "fast");
                return false;
              }
              else {
                $('.error_note').hide();
              }
            }
            

            fadeInModal('.success-form-modal');
            $('.modal').hide();


            return true;
        };

        $('.nutshell-form').submit(function(e){
           // array of required fields
           var fields = $('.form-validator').toArray();
           if (!formValid(fields)) {
            e.preventDefault();
           } 
        });

        //end nutshell form validation
    });
})(jQuery);
