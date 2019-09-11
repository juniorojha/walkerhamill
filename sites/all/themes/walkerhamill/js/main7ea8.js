		

	jQuery(function($) {
		var transitioning = false;
		var upShowing = false;
		var downShowing = true;
		var navStatus;
		var searchStatus;
		var searchPanelHeight;
		var files = [];

		$('body.home .frame').before('<div class="frame-bg"></div>');
			var h = $(window).height();
			var r = 1382/922;
			var w = h*r;
			$('body.home, body.home .frame, .frame-bg').css({
				'max-width': (w+40)+'px',
				'height': h+'px'
			});

		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		    var viewportmeta = document.querySelector('meta[name="viewport"]');
		    if (viewportmeta) {
		        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
		        document.body.addEventListener('gesturestart', function () {
		            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		        }, false);
		    }
		}

		

		if ($('.field-name-field-user-person').length > 0){
				var uid = $('.field-name-field-user-person .field-item').html();
				var utitle = $('.page-title .first-name').html();
				var utitle = utitle + "'s";
				$('.field-name-field-user-person .field-item').html('<p><a href="user-search-results/'+uid+'">Examples of '+utitle+' current searches</a></p>');
				//$('.field-name-field-user-person .field-item').html('');
	
	    }
	    
		
		//Change the department links on the people detail pages
		if ($('.departments').length > 0){
			$('.departments p').each(function(){
				//var dept = 'department-search-results/'+$(this).attr('href').split('/')[4];
				var dept = $(this).html().replace(/\s+/g, '-').toLowerCase();
				//$(this).attr('href',dept);
				$(this).html('<a href="department-search-results/'+dept+'">Examples of current searches from ' + utitle + ' team</a>');
				//$(this).append(' ');
	    	});
	    }
	   
	  $('body:not(.logged-in) .menuToggle').css('top','20px');
	  $('body.logged-in .menuToggle').css('top','49px');
	  
		revealNav = function() {
			transitioning = true;
			$('body.home:not(.logged-in) nav#main-menu').stop(1,1).animate({
				top:'20px'
			},500,function(){
				$(this).addClass('active');
				navStatus = "showing";
				transitioning = false;
			});
			$('body.home.logged-in nav#main-menu').stop(1,1).animate({
				top:'49px'
			},500,function(){
				$(this).addClass('active');
				navStatus = "showing";
				transitioning = false;
			});
			$('.menuToggle').stop(1,1).animate({
				top:'-50px'
			});
		};
		hideNav = function() {
			transitioning = true;
			$('body.home:not(.logged-in) nav#main-menu').stop(1,1).animate({
				top:($('body.home nav#main-menu').outerHeight()*-1)+'px'
			},500,function(){
				$(this).addClass('active');
				navStatus = "hidden";
				transitioning = false;
			});
			$('body.home.logged-in nav#main-menu').stop(1,1).animate({
				top:($('body.home nav#main-menu').outerHeight()*-1)+'px'
			},500,function(){
				$(this).addClass('active');
				navStatus = "hidden";
				transitioning = false;
			});
			$('.menuToggle').stop(1,1).animate({
				top:'20px'
			});
		};
		revealSearch = function() {
			
			transitioning = true;
			$('div.searchPanel').stop(1,1).animate({
				bottom:'20px'
			},500,function(){
				$(this).addClass('active');
				searchStatus = "showing";
				transitioning = false;
			});
			$('.searchToggle').stop(1,1).animate({
				bottom:'-30px'
			});
		};
		hideSearch = function() {
			transitioning = true;
			searchPanelHeight = $('div.searchPanel').outerHeight(false);
			$('div.searchPanel').stop(1,1).animate({
				bottom:'-'+searchPanelHeight+'px'
			},500,function(){
				$(this).addClass('active');
				searchStatus = "hidden";
				transitioning = false;
			});
			$('.searchToggle').stop(1,1).animate({
				bottom:'20px'
			});
		};

		verticalAlign = function() {
			$('.vertical-center').each(function(){
				var offset = ($(window).height()-$(this).outerHeight())/2;
				$(this).css({
					'marginTop': offset-100
				});
			});
		};

		if ($(window).width()>480) {
			searchPanelHeight = $('div.searchPanel').outerHeight(false);

			$('.searchPanel').append('<a class="close" href="#">&#215;</a>');
			$('.searchPanel').on('click','a.close',function(e){
				e.preventDefault();
				hideSearch();
			});
			
			$('body.home nav#main-menu').animate({
				top:($('body.home nav#main-menu').outerHeight()*-1)+'px'
			},1000,function(){
				navStatus = "hidden";
			});
			$('div.searchPanel').animate({
				bottom: '-'+searchPanelHeight+'px'
			},1000,function(){
				searchStatus = "hidden";
				if ($(this).css('display') == 'none')
					$(this).css('display','block');
			});
		//	$('body.home section.page').prepend('<a class="menuToggle">Menu</a>');
			//$('section.page:not(.search)').append('<a class="searchToggle">Search</a>');
			$('body').not('.search,.section-job-search-results,.section-job').find('section.page').append('<a class="searchToggle">Search</a>');
		} else {
			$('.searchPanel').appendTo('article.content');
		}
		
		//var personURL = $('#node_person_teaser_group_specifics h2 a').attr('href');
		
		$("#node_person_teaser_group_specifics h2 a").each(function(){
	    //do something with the element here.
	    	var personURL = $(this).attr('href');
		});

		
		
		/* Remove for now as form selects are sending the labels as values */
		// $('form .hideLabel select').parent().prev('label').hide();
		//$('.hideLabel .form-item-jump label').hide();
		
		$('.infield label:not(label[for="edit-keys"])').inFieldLabels();
		$('.webform-component label').inFieldLabels();
		$('.hideLabel').each(function(){
			$this = $(this);
			var label = $this.find('label').html();
			$this.find('select option:selected').removeAttr('selected');
			$this.find('select').prepend('<option value="-" selected="selected">'+label+'</option>').change();
			$this.find('select').val('-');
		});

		
		$('section.page').after('<div id="bgnav">');
		$('.bgs .views-row').maximage({
			cycleOptions: {
				fx: 	'fade',
				pager:  '#bgnav',
				sync:	0,
				speedOut:1500,
				speedIn: 1500,
				before: changeSlogan
			},
	        onFirstImageLoaded: function() {
	            jQuery('#maximage').fadeIn('fast');
	        }
		});
		
		// if ($(window).width()>480) {
			$('body.home .headline')
				.appendTo('body.home')
				.css({
					'z-index': -2,
					'margin-left': 'auto',
					'margin-right': 'auto',
					'display': 'block',
					'text-align': 'center',
				});
		// }

		$('.testimonials').cycle({
			pager: 		'#quoteNav'
		});

		var CollManag = (function () {
			//var $homeCtCollContainer = $('.home .content'),
			var $ctCollContainer = $('.masonry'),
				//        colCnt = 1,
				init = function () {
					changeColCnt();
					initEvents();
					initPlugins();
				},
				changeColCnt = function () {
					var w_w = $(window).width();
					if( $('body').hasClass('blog') ){
						if (w_w <= 480) n = 2;
						else if (w_w <= 768) n = 3;
						else if (w_w <= 950) n = 4;
						else n = 5;
					}
					else{
					if (w_w <= 360) n = 1;
					else if (w_w <= 480) n = 2;
					else if (w_w <= 535) n = 2;
					else if (w_w <= 895) n = 3;
					else if (w_w <= 1075) n = 5;
					else n = 6;
					}
				},
				initEvents = function () {
					var ar = $('.people .masonry').children();
					ar.each(function(){
						if ($(this).hasClass('wide') && !$(this).hasClass('quote')) {
							// $(this).css('height',($(this).width()/2.028)+'px');
						} else if ($(this).hasClass('quote')){
							// $(this).css('height',($(this).width()/1)+'px');
						} else {
							// $(this).css('height',$(this).width()+'px');
						}

					});
					$(window).on('smartresize.CollManag', function (event) {
						changeColCnt();
						ar.each(function(){
							if ($(this).hasClass('wide') && !$(this).hasClass('quote')) {
								// $(this).css('height',($(this).width()/2.028)+'px');
							} else if ($(this).hasClass('quote')){
								// $(this).css('height',($(this).width()/1)+'px');
							} else {
								// $(this).css('height',$(this).width()+'px');
							}

						});
					});

				},
				initPlugins = function () {
					$ctCollContainer.imagesLoaded(function () {
						
						var ar = $('.masonry').children();
						if( $('body').hasClass('people')){
							ar.sort(function(a,b){
							  // Get a random number between 0 and 10
							  var temp = parseInt( Math.random()*10 );
							  // Get 1 or 0, whether temp is odd or even
							  var isOddOrEven = temp%2;
							  // Get +1 or -1, whether temp greater or smaller than 5
							  var isPosOrNeg = temp>5 ? 1 : -1;
							  // Return -1, 0, or +1
							  return( isOddOrEven*isPosOrNeg );
							});
						}
						$('.masonry').html(ar);
						$('.masonry').children('.quote, .word, .large').appendTo('.masonry');
						$('.masonry').children('.word').last().addClass('reordered').insertAfter('.masonry > div:eq(3)');
						$('.masonry').children('.quote').last().addClass('reordered').insertAfter('.masonry > div:eq(6)');
						$('.masonry').children('.large').last().addClass('reordered').insertBefore('.masonry > div:eq(16)');
						$('.masonry').children('.large').last().addClass('reordered').insertBefore('.masonry > div:eq(21)');
						$ctCollContainer.masonry({
							'itemSelector': '.masonry-item',
							'columnWidth': function (containerWidth) {
								return Math.floor((containerWidth-((n-1)*5)) / n);
							},
							'gutterWidth': 5,
							'isAnimated': true,
							'animationOptions': {
								'duration': 400
							}
						});
					   
						$('.masonry').masonry('reload');
					});

				};
			return {
				init: init
			};
		})();
		if ($('.masonry').length)
			CollManag.init();


		$('a.searchToggle').click(function() {
			if (searchStatus == "hidden") {
				revealSearch();
			}
		});
		
		$('a.menuToggle').click(function(e) {
			e.preventDefault();
			$(this).toggleClass('menu-open');
			$('nav#main-menu').toggleClass('menu-open');
			$('section.page').toggleClass('page-fix');
		
		});
		console.log('checking cookies');
		if ($.cookie('wham-cookieMsg') != '1') {
			console.log('first visit');
			$('#cookieMsg').fadeIn();
			setTimeout(function(){
				$('#cookieMsg').fadeOut();
			}, 12000);
			$.cookie('wham-cookieMsg', '1', { expires: 20 });
		} else {
			console.log('cookie set');
		}

		hideFormPaymentFields = function() {
			var dropDownVal = $('#edit-field-salary-minimum-values').val();
			//console.log('called'+dropDownVal);
			jQuery('#min-salary,#max-salary,#min-hourly,#max-hourly').hide()
		};

		initialFormPaymentFields = function() {
			console.log('called after');
			jQuery('#min-hourly,#max-hourly').hide();
		};

		// form 
		
		// Add events
		
		 
		// Grab the files and set them to our variable
		function prepareUpload(event)
		{
		  files = event.target.files;
		}

		
		// Catch the form submit and upload the files
		
		//Set validate to ignore nothing, so it will validate hidden form elements
		$.validator.setDefaults({
	   		 ignore: "",
	   		 submitHandler: function(form) {

	   		 	if(form.id == 'views-exposed-form-job-search-results-page-1'||'views-exposed-form-bottom-search-form-block-form')
	   		 	{
	   		 		form.submit();
	   		 		return false;
	   		 	}

	   		 	var formData = new FormData(form);
	   		 	if(files.length > 0){
		   		 	$.each(files, function(key, value)
			 		{
			 			formData.append(key, value);
			 		});
	   		 	}	
				$.ajax({
	    		    	url:form.action,
	    		    	type:'POST',
	    		    	data:formData,
	    		    	processData: false, // Don't process the files
	    		    	contentType: false,
	    		    	dataType:'html',
	    		    	beforeSend:function(){
	    		    		$('#cboxLoadedContent').empty();
	    		    		$('#cboxLoadingGraphic').show();
	    		    	},
	    		    	complete:function(){
	    		    		files = [];
	    		    		$('#cboxLoadingGraphic').hide();
	    		    	},
	    		    	success:function(data){
	    		    		
	    		    		var parser = new DOMParser();
	    		    		var doc = parser.parseFromString(data, "text/html");
	    		    		var page = $(doc).find('.page').html();
	    		    		$('#cboxLoadedContent').append(page);
	    		    		$('#cboxLoadedContent div.links').hide();
	    		    	}
	    		    });	
	    		return false;
		  	}
		 });

	// 	$.validator.addMethod('lessThanEqual', function(value, element, param) {
	//     return this.optional(element) || parseInt(value) <= parseInt($(param).val());
	// });
	// 	$.validator.addMethod('lessThanEqual', function(value, element, param) {
	//     return this.optional(element) || parseInt(value) >= parseInt($(param).val());
	// });

		// validate signup form on keyup and submit
		$("#views-exposed-form-job-search-results-page-1,#views-exposed-form-bottom-search-form-block-form").validate({
			errorLabelContainer: $(".error-box"),
			wrapper: "li",
			rules: {
				field_minimum_salary_value: {
					required:
						function(element) {
	    					return $("select#edit-field-contract-type-tid").val() != 89;
	  					}/*,
	  			lessThanEqual: '#edit-field-salary-maximum-value'*/
				
					},
				field_maximum_salary_value: {
					required:
						function(element) {
	    					return $("select#edit-field-contract-type-tid").val() != 89;
	  					}/*,
	  			moreThanEqual: '#edit-field-salary-minimum-value2'*/
	  				},
	  			field_minimum_hourly_value: {
					required:
						function(element) {
	    					return $("select#edit-field-contract-type-tid").val() == 89;
	  					}
				
					},
				field_maximum_hourly_value: {
					required:
						function(element) {
	    					return $("select#edit-field-contract-type-tid").val() == 89;
	  					}
	  				}
			},
			messages: {
				field_minimum_salary_value: "Please enter a minimum salary and ensure it‘s less than the maximum.",
				field_maximum_salary_value: "Please enter a maximum salary and ensure it‘s more than the minimum.",
				field_minimum_hourly_value: "Please enter a minimum hourly",
				field_maximum_hourly_value: "Please enter a maximum hourly"
			}
		});	

		clearErrorBox = function(){
			$(".error-box").empty();	
		}
					
		$("#edit-go, #edit-go--2").hide();

		updateFormPaymentFields = function(selectedValue) {	
		if(!selectedValue){
			return false;
		}
		//If the jump menu on credentials (only one with :: in value)
		if(selectedValue.toString().indexOf("::") > 1){
			var cleanQuery = selectedValue.split("::");
			
			//reset dropown values so if uyou go back it doesn't remember the last selected and redirect again before you change.
			$("#edit-jump, #edit-jump--2").val('');
			window.location = cleanQuery[1];
			
		}
			//Clear validation error fields if select box was contract type.
			if(selectedValue >87 && selectedValue <91){
				console.log(selectedValue);
				clearErrorBox();
			}
			hideFormPaymentFields();
			selection = jQuery('select#edit-field-contract-type-tid').val();
			switch (selection) {
				
				case 'All':
					jQuery('#min-salary,#max-salary').show();
					break;
				case '90':
					jQuery('#min-salary,#max-salary').show();
					break;
				case '88':
					jQuery('#min-salary,#max-salary').show();
					break;
				//Temp type chosen so show hourly drop-downs.
				case '89':
					jQuery('#min-hourly,#max-hourly').show();
					break;
			}
		}

		displayAsterik = function(value,text){
			text = text.toLowerCase().replace(" ","-");
			var func = 'hide';
			if(value == '-'){
				func = 'show';
			}
			$('.minict_wrapper.active .asterisk')[func]();
		}
		//=init
		//hideFormPaymentFields();
		initialFormPaymentFields();

		
		//Move form fields
		$('#edit-field-contract-type-tid-wrapper').after($('#min-salary'));
		$('#edit-field-contract-type-tid-wrapper')
		$('#min-salary').after($('#max-salary'));
		$('#edit-field-contract-type-tid-wrapper').after($('#min-hourly'));
		$('#min-hourly').after($('#max-hourly'));

		// jQuery('#edit-field-contract-type-tid-wrapper').after(jQuery('#min-salary'));
		// jQuery('#edit-field-contract-type-tid-wrapper')
		// jQuery('#min-salary').after(jQuery('#max-salary'));
		// jQuery('#edit-field-contract-type-tid-wrapper').after(jQuery('#min-hourly'));
		// jQuery('#min-hourly').after(jQuery('#max-hourly'))jQuery

		//replace any text
		$('#edit-field-locations-tid option').eq(1).text('All Locations')
		
		if (!Modernizr.touch) {
			$("select").minimalect({
			
				onchange: function (value, text) {
					displayAsterik(value,text);
					updateFormPaymentFields(value);

		 		}
		 	}).change();
		}else{
			$("select").on('change',function(){
				var value = $(this).val();
				updateFormPaymentFields(value);
			});
		}
	 	

	 	$('select.form-select option:first-child').attr('value', 'All');
	 	
	 	//Remove values of min/max salary otherwise it the form will send incorrect values if a selections not made.
	    $("select.form-select-wage option:first-child").attr('value', '');
	    
	    $("#edit-field-maximum-salary-value-wrapper input,#edit-field-minimum-salary-value-wrapper input,#edit-field-maximum-hourly-value-wrapper input,#edit-field-minimum-hourly-value-wrapper input").attr('disabled', 'disabled');
		
		
	    
		$('a.fancybox').on('click', function(e){
			e.preventDefault();
			var data = $(this).attr('href').split('#');
			
			$.colorbox({
				href: data[0] + ' #' + data[1],
				width: 600,
				maxWidth:'95%',
				maxHeight:'95%',
				opacity: 0.5,
				onComplete: function(){
					
					$('#colorbox label').inFieldLabels();
					//$('#colorbox form .hideLabel select').prev('label').hide();
					$('#colorbox .hideLabel').each(function(){
						var label = $(this).find('label').html();
						$(this).find('select').prepend('<option selected>'+label+'</option>');
					});	

					$('input[type=file]').on('change', prepareUpload);

					// hide upload buttons
					hideUploadButton('#edit-submitted-attach-your-cv-upload-button,#edit-submitted-attach-a-job-spec-upload-button');
					
					
					$("#colorbox .form-file").addClass('required');
					
					// subtmit cv
					var $validator = $("#webform-client-form-143").validate({
					
						rules:{
							'submitted[name]':{
								required:true
							},
							'submitted[email]':{
								required:true,
								email:true
							},
							'submitted[enquiry]':{
								required:true
							},
							'files[submitted_attach_your_cv]':{
								required:true
							}
						},	
					});

					// refer friend
					var $validatorReferFriend = $("#webform-client-form-170").validate({
						
						rules:{

							'submitted[your_details]':{
								required:true
							},
							'submitted[your_details][work_address]':{
								required:true
							},
							'submitted[your_details][town_city]':{
								required:true
							},
							'submitted[your_details][country]':{
								required:true
							},
							'submitted[your_details][postcode]':{
								required:true
							},
							'submitted[your_details][your_email_address]':{
								required:true,
								email:true
							},
							'submitted[your_details][confirm_email_address]':{
								required:true,
								email:true,
								equalTo:'#edit-submitted-your-details-your-email-address'
							},
							'submitted[your_details][your_position]':{
								required:true
							},
							'submitted[your_details][telephone]':{
								required:true
							},
							'submitted[your_details][your_company]':{
								required:true
							},
							'submitted[referral_details][full_name]':{
								required:true
							},
							'submitted[referral_details][position]':{
								required:true
							},
							'submitted[referral_details][company]':{
								required:true
							},
							'submitted[referral_details][qualification]':{
								required:true
							},
							'submitted[referral_details][email_address]':{
								required:true,
								email:true
							},
							'submitted[referral_details][confirm_ref_email_address]':{
								required:true,
								email:true,
								equalTo:'#edit-submitted-referral-details-email-address'
							},
							'submitted[referral_details][telephone]':{
								required:true
							}
						},	
					});
					
					// register vacancy
					var $validator = $("#webform-client-form-171").validate({
						
						rules:{
							'submitted[name]':{
								required:true
							},
							'submitted[title]':{
								required:true
							},
							'submitted[company]':{
								required:true
							},
							'submitted[vacancy_job_title]':{
								required:true
							},
							'submitted[email_address]':{
								required:true,
								email:true
							},
							'files[submitted_attach_a_job_spec]':{
								required:true
							},
						},	
					});

								
				}
		});
		});


		if (Modernizr.touch) {
			console.log('tap init');
			$('.masonry-item.company').css('cursor','pointer');
			$('.masonry').on('click','.company',function(){
				console.log('tapped');
				$('.masonry-item.company').removeClass('active');
				$('.masonry-item.company .info').hide();
				$(this).find('.info').show();
				$(this).addClass('active');
			});
			$('input').on('focus', function(){
		    $('body').addClass('keyboard');
		    $(window).scrollTop(0)    
			});
			$('input').on('blur', function(){
		    $('body').removeClass('keyboard');
			});
		}
		
		
		
		$(document).on('mousemove',function(e){
			var y = e.clientY;
			var y2 = $(window).height()-searchPanelHeight-40;
			if (!transitioning) {
				if (e.clientY<100) {
					if (navStatus == "hidden") {
						revealNav();
					}
				} else if (e.clientY<($(window).height()-searchPanelHeight-40)) {
					// if (searchStatus == "showing" ) {
					// 	hideSearch();
					// }
					if (navStatus == "showing") {
						hideNav();
					}
				} else {
					if (navStatus == "showing") {
						hideNav();
					}
				}
			}
		});
		$(document).on('scroll',function(){
			if ($('.arrow').length) {
				var arrow = $('.arrow').offset();
				var scrollPos = $('body').scrollTop();
				if ((arrow.top-$('body').scrollTop()) < 280 && !transitioning && !upShowing) {
					transitioning = true;
					$('.arrow').animate({
						top: '-=50px'
					},300, function(){
						downShowing = false;
						$(this)
							.removeClass('down')
							.addClass('up')
							.css('left','-5000px');
						var currHref = $('.arrow').find('img').attr('src');
						console.log(currHref);
						if( $('body').hasClass('alt') ){
							newHref = currHref.replace('down_blk','up_wht');
						}
						else{
							newHref = currHref.replace('down_wht','up_grey');
						}
						$('.arrow').find('img').attr('src',newHref);
						$('.arrow').css({
							'top':'0px',
							'left':'auto'
						}).animate({
							top: '-=65px'
						},300,function(){
								transitioning = false;
								upShowing = true;
						});
					});
				}
				if ((arrow.top-$('body').scrollTop()) >= 280 && !transitioning && !downShowing) {
					transitioning = true;
					$('.arrow').animate({
						top: '+=50px'
					},300, function(){
						upShowing = false;
						$(this)
							.removeClass('up')
							.addClass('down')
							.css('left','-5000px');
						var currHref = $('.arrow').find('img').attr('src');
						console.log(currHref);
						if( $('body').hasClass('alt') ){
							newHref = currHref.replace('up_wht','down_blk');
						}
						else{
						newHref = currHref.replace('up_grey','down_wht');
						}
						$('.arrow').find('img').attr('src',newHref);
						$('.arrow').css({
							'top':'-80px',
							'left':'auto'
						}).animate({
							top: '+=39px'
						},300,function(){
								transitioning = false;
								downShowing = true;
						});
					});
				}
			}

		});
		$(window).resize(function(){
			var smlH = $('.small').height();
			$('.person .small.word').each(function(){
				smlH = $(this).width();
				$(this).css('height',smlH+'px');
			});
			$('.quote').each(function(){
				// $(this).css('height',smlH+'px');
			});
			var h = $(window).height();
			var r = 1382/922;
			var w = h*r;
			$('body.home, body.home .frame, .frame-bg').css({
				'max-width': (w+40)+'px',
				'height': h+'px'
			});
			
			
		});
		$(window).load(function(){
			verticalAlign();
			var smlH = $('.small').height();
			$('.person .small.word').each(function(){
				smlH = $(this).width();
				$(this).css('height',smlH+'px');
			});
			// $('.masonry-item.quote').each(function(){
			// 	$(this).css('height',smlH+'px');
			// });
			
			
			
		});

		

		
		function changeSlogan(){
			$('.slogan').toggle();
		}
		$('.slogan').eq(0).hide();

		//append Asterisks 
		if (!Modernizr.touch) {
			$('#min-salary input, #max-salary input, #min-hourly input, #max-hourly input').after('<span class="asterisk">*</span>');
		} else {
			// $('#min-salary select option:first-child, #max-salary select option:first-child, #min-hourly select option:first-child, #max-hourly select option:first-child').append(document.createTextNode("*"));
		}

		function hideUploadButton(id){
			$(id).hide();
		}

		hideUploadButton('#edit-submitted-attach-your-cv-upload-button'); 
	});




