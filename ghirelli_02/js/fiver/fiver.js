jQuery(function() {
	// Top dropdown
	jQuery(".top-dropdown").mouseenter(function() {
			jQuery(this).click();
	});
	jQuery(".top-dropdown").click(function() {
		jQuery(this).addClass('hover');
		jQuery(this).find("ul").stop(true, true).delay(300).fadeIn(300, "easeOutCubic");
	}).mouseleave(function() {
		jQuery(this).find("ul").stop(true, true).delay(300).fadeOut(300, "easeInCubic");
	});
	// Shopping cart dropdown		
	jQuery(".mini-cart").hover(function() {
			jQuery(this).addClass('hover');
			jQuery(".mini-cart .block-content").stop(true, true).delay(300).fadeIn(500, "easeOutCubic");
		}, function() {
			jQuery(".mini-cart .block-content").stop(true, true).delay(300).fadeOut(500, "easeInCubic");
	});
	jQuery(".item").hover(function() {
		jQuery(".fiver-quick-act", this).transition({y: '-35px'});
	}, function() {
		jQuery(".fiver-quick-act", this).transition({y: '0'});
	});	
	//Flex slider hover
	jQuery(".hidden-buttons").hover(function() {
		jQuery(".owl-buttons", this).transition({opacity:1});
	}, function() {
		jQuery(".owl-buttons", this).transition({opacity:0});
	});	
	// Product action
	jQuery(".item").hover(function() {
		jQuery(".fiver-quick-act", this).transition({y: '-35px'});
	}, function() {
		jQuery(".fiver-quick-act", this).transition({y: '0'});
	});	
	// Product quick view
	jQuery(".item").hover(function() {
		jQuery(".quickview-box", this).transition({x: '98px'});
	}, function() {
		jQuery(".quickview-box", this).transition({x: '0'});
	});	
	// Sort by dropdown
	jQuery(".sorter .sort-by").mouseenter(function() {
			jQuery(this).click();
	});
	jQuery(".sorter .sort-by").click(function() {
		jQuery(this).addClass('hover');
		jQuery(this).find("ul").stop(true, true).delay(300).fadeIn(500, "easeOutCubic");
	}).mouseleave(function() {
		jQuery(this).find("ul").stop(true, true).delay(300).fadeOut(500, "easeInCubic");
	});	
	// Limiter dropdown
	jQuery(".sorter .limiter").mouseenter(function() {
			jQuery(this).click();
	});
	jQuery(".sorter .limiter").click(function() {
		jQuery(this).addClass('hover');
		jQuery(this).find("ul").stop(true, true).delay(300).fadeIn(500, "easeOutCubic");
	}).mouseleave(function() {
		jQuery(this).find("ul").stop(true, true).delay(300).fadeOut(500, "easeInCubic");
	});
	
	//Color box content html popup
	jQuery(".inline-size-guide").colorbox({inline:true, width:"50%",opacity:0.7, close: "<i class=\"icon-cancel-7\"></i>"});	
	jQuery.each(jQuery('#accordion a.accordion-toggle'), function(i, link){
	    
	        jQuery('#collapse' + 1).collapse({
	            toggle : true,
	            parent : '#accordion'
	        });
	jQuery(link).on('click', 
	    function(){
	        jQuery('#collapse' + 1).collapse('toggle');
	    }
	)
	});
	jQuery('.collapsible').each(function(index) {
			jQuery(this).prepend('<span class="mobile-coll-arrow">+</span>');
			if (jQuery(this).hasClass('active'))
			{
				jQuery(this).children('.block-content').css('display', 'block');
			}
			else
			{
				jQuery(this).children('.block-content').css('display', 'none');
			}			
	});
	jQuery('.collapsible .mobile-coll-arrow').click(function() {
			
			var parent = jQuery(this).parent();
			if (parent.hasClass('active'))
			{
				jQuery(this).siblings('.block-content').stop(true).slideUp(300, "easeOutCubic");
				parent.removeClass('active');
				jQuery(this).html('+');
			}
			else
			{
				jQuery(this).siblings('.block-content').stop(true).slideDown(300, "easeOutCubic");
				parent.addClass('active');
				jQuery(this).html('-');
			}
			
		});
	//brands slider
    jQuery(".brands-list").owlCarousel({     
	    items : 6,
	    itemsDesktop : [1199,6],
	    itemsDesktopSmall : [979,5],
		itemsTablet: [600,4], //2 items between 600 and 0;
		itemsMobile : [320,2],
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 300,
		navigationText : ["<i class=\"icon-left-open-big\"></i>","<i class=\"icon-right-open-big\"></i>"],
		pagination : false    
    });	
	jQuery('.ajaxcart_colorbox').live('mouseenter', function(){
		jQuery(this).colorbox({
			iframe:true,
			opacity:	0.8,
			width:"420",
			height:"200",
			opacity:0.7, 
			close: "<i class=\"icon-cancel-7\"></i>"
		});
	});	

   jQuery('.act-quickview-button').live('mouseenter', function(){
   	jQuery(this).colorbox({iframe:true, width:"780px", height:"480px",opacity:0.7, close: "<i class=\"icon-cancel-7\"></i>"});
   	});	
   	//Video
   	jQuery(".fiver-video").colorbox({iframe:true, innerWidth:"99%", innerHeight:"100%",opacity:0.7,close: "<i class=\"icon-cancel-7\"></i>"});
	// Add (+/-) Button Number Incrementers 
	jQuery(".button-qty").on("click", function() {
	  var $button = jQuery(this);
	  var oldValue = $button.parent().find("input").val();
	
	  if ($button.text() == "+") {
		  var newVal = parseFloat(oldValue) + 1;
		} else {
	   // Don't allow decrementing below zero
	    if (oldValue > 1) {
	      var newVal = parseFloat(oldValue) - 1;
	    } else {
	      newVal = 1;
	    }
	  }
	
	  $button.parent().find("input").val(newVal);
	
	});
	// Fiver Animation
	jQuery('.fiver-animation').waypoint(function() {
	     var animation = jQuery(this).attr("data-animation");
	     jQuery(this).addClass(animation);
	     jQuery(this).addClass('start-anim');
	}, { offset: '80%' });	
	
				
				
});
function setAjaxData(data,iframe){
		if(data.status == 'ERROR'){
			alert(data.message);
		}else{
			if(jQuery('.mini-cart')){
	            jQuery('.mini-cart').replaceWith(data.sidebar);
	        }
					// Shopping cart dropdown		
					jQuery(".mini-cart").hover(function() {
							jQuery(this).addClass('hover');
							jQuery(".mini-cart .block-content").stop(true, true).delay(300).fadeIn(500, "easeOutCubic");
						}, function() {
							jQuery(".mini-cart .block-content").stop(true, true).delay(300).fadeOut(500, "easeInCubic");
					});
			jQuery.colorbox.close();			 					      	        
		}
}
function ajaxcart(url,id) {
 url += 'isAjax/1';
 url = url.replace("checkout/cart","ajax/index");
 jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>Loading...</p></div></div>');
 jQuery('.alert-box').fadeIn('slow');
 try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {
                        if(data.status == 'SUCCESS'){    
                             jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>' + data.message + '</p></div></div>');
							 jQuery('.alert-box').fadeIn('slow').delay(2000).fadeOut('slow', function() {
							 	jQuery('.alert-bg').remove();
							 }); 
							 
                        }else{
                            bootbox.alert('<p class="error-msg">' + data.message + '</p>');
                        }   
                        jQuery(".button-ajax-cart-id-"+id).html('<span class="act-icon"><i class="icon-ok"></i></span>');

                        setAjaxData(data,false);
                            
                    }
                });
            } catch (e) {
 }
}
function deletecart(url){
		url = url.replace("checkout/cart","ajax/index");
 		try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {  
                        setAjaxData(data,false);   
                    }
                });
            } catch (e) {
 		}
}
function setAjaxCompareData(data,iframe){
		if(data.status == 'ERROR'){
			alert(data.message);
		}else{
			if(jQuery('.block-compare')){
	            jQuery('.block-compare').replaceWith(data.sidebar);
	        }
			if(jQuery('.ajax-compare')){
	            jQuery('.ajax-compare').replaceWith(data.dropdown);
	        }
						 					      	        
		}
}
function ajaxcompare(url,id) {
 url = url.replace("catalog/product_compare/add","ajax/index/compare");
 jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>Loading...</p></div></div>');
 jQuery('.alert-box').fadeIn('slow');
 try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {
                        if(data.status == 'SUCCESS'){    
                             jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>' + data.message + '</p></div></div>');
							 jQuery('.alert-box').fadeIn('slow').delay(2000).fadeOut('slow', function() {
							 	jQuery('.alert-bg').remove();
							 }); 
                        }else{
                            bootbox.alert('<p class="error-msg">' + data.message + '</p>');
                        }   
                        setAjaxCompareData(data,false);
                        jQuery(".button-ajax-compare-id-"+id).html('<i class="icon-ok added"></i>'); 
                            
                    }
                });
            } catch (e) {
 }
}
function removeCompare(url){
	url = url.replace("catalog/product_compare/remove","ajax/index/removecompare"); 
 		try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {  
                        setAjaxCompareData(data,false);   
                    }
                });
            } catch (e) {
 		}
}
function clearCompare(url){
	url = url.replace("catalog/product_compare/clear","ajax/index/clearcompare"); 
 		try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {  
                        setAjaxCompareData(data,false); 
                    }
                });
            } catch (e) {
 		}
}
function ajaxwishlist(url,id) {
 url = url.replace("wishlist/index/add","ajax/index/addwishlist");
 jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>Loading...</p></div></div>');
 jQuery('.alert-box').fadeIn('slow');
 try {
                jQuery.ajax( {
                    url : url,
                    dataType : 'json',
                    success : function(data) {
                        if(data.status == 'SUCCESS'){  
                             jQuery('#notification').html('<div class="alert-bg"><div class="alert-box" style="display: none;"><p>' + data.message + '</p></div></div>');
							 jQuery('.alert-box').fadeIn('slow').delay(2000).fadeOut('slow', function() {
							 	jQuery('.alert-bg').remove();
							 }); 
							if(jQuery('.count-wishlist-box')){
	            				jQuery('#count-wishlist-'+id).replaceWith(data.sidebar);
	            				jQuery('.wishlist-link').replaceWith(data.wishlist_header);
	       					 }                        	  
                        }else{
                            bootbox.alert('<p class="error-msg">' + data.message + '</p>');
                        }   
                        jQuery(".button-ajax-wishlist-id-"+id).html('<i class="icon-ok added"></i>'); 
                            
                    }
                });
            } catch (e) {
 }
}