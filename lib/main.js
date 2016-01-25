;$(function() {
	var addApiKeyAuthorization = function(){
	    var key = encodeURIComponent($('#input_apiKey')[0].value);
	    if(key && key.trim() != "") {
	        var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");
	        window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);
	        log("added key " + key);
	    }
	  };
	   var initSwaggerUi = function() {
	   window.swaggerUi = new SwaggerUi({
        url: 'apiyamls/news.yaml',
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function(swaggerApi, swaggerUi){
          if(typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "your-app-name", 
              scopeSeparator: ",",
              additionalQueryStringParams: {}
            });
          }

          if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }

          $('pre code').each(function(i, e) {
            hljs.highlightBlock(e)
          });

          addApiKeyAuthorization();
        },
        onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        apisSorter: "alpha",
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });
	};
	 $.ajax('home.html').done(function(content) {
	 	$('.apirules').html(content);
	 });

	$('a.menuitem').click(function() {
		// alert($(this).data('id'));
		var id = $(this).data('id');
		if(id === 'home') {
			$('#swagger-ui-container').hide();
			$('.apirules').show();
			return;
		}
		if(!window.swaggerUi) {
			$.getScript("swagger-ui.min.js", function() {
				initSwaggerUi();
				window.swaggerUi.setOption('url', 'apiyamls/' + id +'.yaml');
				window.swaggerUi.load();
			});
		}
		else {
			window.swaggerUi.setOption('url', 'apiyamls/' + id +'.yaml');
			window.swaggerUi.load();
		}
		$('.apirules').hide();
		$('#swagger-ui-container').show();
	});
});