(function(){
   


    var Magik_Infinite_JavaScript = function(jQuery)  
    {
        /* Your app's JavaScript here.
             $ in this scope references the jQuery object we'll use.
             Don't use 'jQuery', or 'jQuery191', here. Use the dollar sign
             that was passed as argument.*/

        // var $ = jQuery.noConflict(); 
        var shop_domain = Shopify.shop; 
        var host = "https://infinitescroller.magikcommerce.com"; 
        var api_url = host + "/get_setting";

        var navSelector     = ".pagination,.pagination-custom,.pagination-page"; 
        var nextSelector    = ".pagination span:last-child a,.pagination li:last-child a,.pagination-custom li:last-child a,.pagination-custom span:last-child a,.pagination-page li:last-child a,.pagination a.pagination__btn:last-child";
        var contentSelector = ".grid--uniform,.grid-uniform,.grid.grid__item,.products-listing,.grid-collage,.card-list.grid";
        var itemSelector    = ".grid__item,.grid-item,.grid_item,div.product,.card";
        var itemclass       = "";
        var loader          =  host+"/assets/images/mgk-loader.gif";
        var loader_img_position = "";
        jQuery(navSelector).hide();
        var loading_height = 400 ;
        var is_extra_integration_needed = 0 ;
        var integration_code = "" ;
  
        var mgk_infinite_scroll = 0; 

        // code for open product in new tab
        var open_products_in_new_tab = 0;
 
        jQuery.ajax({
            url: api_url,
            type: "POST",                      
            data: "shop_domain="+shop_domain,                     
            success: function (result)  
            {    
         
                var result = jQuery.parseJSON(result); 
                
                if(result.status = "success")
                {
                    site_settings = result.site_settings;
                    is_default_setting = result.is_default_setting;
                   
                    if(site_settings)
                    {
                        if(site_settings.nav_selector && is_default_setting != 1)
                        {
                            // navSelector     = navSelector+","+site_settings.nav_selector;
                            navSelector     = site_settings.nav_selector;

                        } 

                        if(site_settings.next_selector && is_default_setting != 1)
                        {
                            // nextSelector    = nextSelector+","+site_settings.next_selector;
                            nextSelector    = site_settings.next_selector;

                        }

                        if(site_settings.content_selector && is_default_setting != 1)
                        {
                            // contentSelector = contentSelector+","+site_settings.content_selector;
                            contentSelector = site_settings.content_selector;

                        }

                        if(site_settings.item_selector && is_default_setting != 1)
                        {
                            // itemSelector    = itemSelector+","+site_settings.item_selector;
                            itemSelector    = site_settings.item_selector;
                        }

                        if(site_settings.item_class && is_default_setting != 1)
                        {
                            // itemclass    = itemclass+","+site_settings.itemclass;
                            itemclass    = site_settings.item_class;
 
                        }
                        
                        
                        if(site_settings.loader_img_url)
                        {
                            loader          = site_settings.loader_img_url;
                        }

                        if(site_settings.loader_img_position)
                        {
                            loader_img_position          = site_settings.loader_img_position;
                        }

                        if(site_settings.loading_height != 0)
                        {
                            loading_height          = site_settings.loading_height;
                        }

                        if(site_settings.is_extra_integration_needed != 0)
                        {
                            is_extra_integration_needed    = site_settings.is_extra_integration_needed;
                        }

                        if(site_settings.integration_code )
                        {
                            integration_code          = site_settings.integration_code;
                        }

                        if(site_settings.open_products_in_new_tab )
                        {
                            open_products_in_new_tab          = site_settings.open_products_in_new_tab;
                        }
                        
                        mgk_infinite_scroll = site_settings.is_scrolling_enabled;  
                        get_infinite_scroller(mgk_infinite_scroll,navSelector,nextSelector,contentSelector,itemSelector,itemclass,loader,loading_height,loader_img_position,is_extra_integration_needed,integration_code, open_products_in_new_tab);

                        
                    } 
                     
                }
            } 
        }); 

      	
      
        function  get_infinite_scroller(mgk_infinite_scroll,navSelector,nextSelector,contentSelector,itemSelector,itemclass,loader,loading_height,loader_img_position,is_extra_integration_needed,integration_code,open_products_in_new_tab)
        {
             //console.log("scroller status:" + mgk_infinite_scroll);
            // console.log("loading_height:"+loading_height);
            if(mgk_infinite_scroll==1 )
            {
                
                // code for open product in new tab
                if(open_products_in_new_tab == 1)
                {
                    jQuery(contentSelector).find("a").attr("target","_blank"); 
                }

                var loading  = false;
                var finished = false;
                //console.log("nextSelector:"+nextSelector);
                jQuery(nextSelector).addClass("next");
                var next_page_url  = jQuery(nextSelector).attr('href'); // init next url

                console.log("next_page_url:"+next_page_url);  
                // console.log("nextSelector:"+jQuery(nextSelector).length);
                // console.log("navSelector:"+jQuery(navSelector).length);

                // console.log("itemSelector:"+jQuery(contentSelector+" "+ itemSelector).length);

                // console.log("contentSelector:"+jQuery(contentSelector).length); 
                // console.log(jQuery(".grid-uniform").length); 
                // console.log("contentSelector1:"); 
                 
                // console.log(jQuery(contentSelector).not(contentSelector1).length);
             
                contentSelector1 = "footer .grid-uniform,aside .grid-uniform";

 

                if( jQuery(nextSelector).length && jQuery(navSelector).length && jQuery(contentSelector+" "+ itemSelector).length && jQuery(contentSelector).length) 
                {
                     
                    // console.log("in if "+navSelector);
                    jQuery(navSelector).hide();
                    if(loader)
                    {
                        // console.log("loader_img_position:"+loader_img_position);
                        if(loader_img_position)
                        {
                            // console.log("in if");
                            eval(loader_img_position);
                        } 
                        else
                        {
                            // console.log("in else"); 
                            jQuery(contentSelector).not(contentSelector1).eq(0).after( '<div class="magik-infi-loader" style="display:inline-block;width:100%;text-align:center;margin-top:15px;"><img src="' + loader + '"  style="display:inline-block;" alt="Loading more images. Please wait."></div>' ); 
                        }
                    }          

                } 
                else 
                { 
                    // console.log("-----------in else"); 

                    jQuery(navSelector).show();
                   // jQuery(navSelector).css("display","inline-block");
                    finished = true;

                } 
               
         
                var magik_infinite_scrolling = function () 
                {
                    var page_last_element   = jQuery(contentSelector).not(contentSelector1).eq(0).find(itemSelector).last();

                    loading = true;
                    // console.log("show"); 
                    jQuery('.magik-infi-loader').show(); 
                   

                    next_page_url = decodeURIComponent(next_page_url);
                    next_page_url = next_page_url.replace(/^(?:\/\/|[^\/]+)*\//, "/");
                     // console.log("next_page_url:"+next_page_url);
                   
                    if( next_page_url == '' || (next_page_url.indexOf("javascript") > -1) || (next_page_url == "#") || (next_page_url == "undefined") )
                    { 
                        // console.log("hide");
                        jQuery('.magik-infi-loader').hide();  
                        finished = true;
                        loading = false;   
                    } 
                    else  
                    {
                        setTimeout( function()
                        {                               
                            jQuery.ajax({

                                    url         : next_page_url,
                                    dataType    : 'html',
                                    cache       : false,
                                    success     : function (data) 
                                    {
                                      

                                        
                                        var obj         = jQuery( data);
                                      //    console.log("obj-----:");
                                      // console.log(obj);
                                       
                                        new_elements    = obj.find(contentSelector).not(contentSelector1).eq(0).html();
                                        next_elements   = obj.find(nextSelector);
                                        current_url     = next_page_url;
                                       
                                      //   console.log("new_elements");
                                      // console.log(new_elements);
                                       // console.log("new_elements1");
                                      
                                        

                                        if( next_elements.length ) 
                                        {
                                            next_page_url = next_elements.attr( 'href' );
                                        }
                                        else 
                                        {
                                            finished = true;
                                        }                     
                                            // console.log("outside itemclass");

                                        

                                       if(itemclass)
                                       {
                                        // console.log("inside itemclass:"+itemclass);
                                           
                                            new_elements = $(new_elements);
                                            // console.log("new_elements:");
                                            // console.log(new_elements);
                                            new_elements.each(function () 
                                            {
                                                // console.log("in each");
                                                var t = jQuery(this);
                                                // t.removeClass(t.attr('class'));

                                                t.addClass(itemclass); 
                                            });
                                            // new_elements.find(itemSelector).addClass(itemclass);
                                      }

                                        page_last_element.after( new_elements );

                                        jQuery(contentSelector+" .grid__item").find(".pagination").parent().replaceWith("");  

                                        // code for open product in new tab
                                        if(open_products_in_new_tab == 1)
                                        {
                                            jQuery(contentSelector).find("a").attr("target","_blank"); 
                                        }
                
                                        if(is_extra_integration_needed == 1 && integration_code)
                                        {
                                            eval(integration_code); 
                                        }
                                        // if(jQuery(itemSelector+" div.pagination").length > 0 )
                                        // {
                                        //     console.log("exist");
                                        //     jQuery(itemSelector+" div.pagination").parent().replaceWith("");
                                        // }
                                        // jQuery("div.pagination").replaceWith("");
                                        
                                        // jQuery("div.pagination").parent().replaceWith("");

                                        loading = false;                    
                                        // console.log("hide");  

                                        jQuery('.magik-infi-loader').hide();
                                    }
                                });
                        }, 500);
                    }
                }; 

                   // set event
                    jQuery( window ).on( 'scroll touchstart', function ()
                    {
                         //set scroll position in session storage
                        jQuery(this).trigger('magik_scroll_start');
                    });

                    jQuery( window ).on( 'magik_scroll_start', function()
                    {
                        var t          = jQuery(this),
                        last_element   = jQuery(itemSelector).last();


                        if( typeof last_element == 'undefined' ) 
                        {
                            return;
                        }
             
                        if ( ! loading && ! finished && ( t.scrollTop() + t.height() ) >= ( last_element.offset().top + last_element.height() - loading_height ) ) 
                        {
                            magik_infinite_scrolling();
                        }
                    })
                     
            }
            else
            {
                jQuery(navSelector).show();
                //jQuery(navSelector).css("display","inline-block");
            }
        }
    };

    var loadScript = function(url, callback)
    {
        var script = document.createElement("script");
        script.type = "text/javascript";

          // If the browser is Internet Explorer.
        if (script.readyState){ 
            script.onreadystatechange = function(){
              if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
              }
            };
          // For any other browser.
        } 
        else 
        {
            script.onload = function()
            {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
   };

   

    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
        jQuery191 = jQuery.noConflict(true);
        Magik_Infinite_JavaScript(jQuery191);
      });
    } else {
      Magik_Infinite_JavaScript(jQuery);
    }
    
})();
