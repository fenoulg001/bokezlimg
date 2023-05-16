jQuery( document )
	.ready( function ( c ) {
		c( "#J_downloadBar" )
			.length && c( window )
			.on( "scroll", function () {
				var n = c( window )
					.scrollTop();
				c( "#J_downloadBar" )[ ( 200 < n ? "add" : "remove" ) + "Class" ]( "sb-active" )
			} ), c( ".j-wbdlbtn-dlipp" )
			.length && c( ".j-wbdlbtn-dlipp" )
			.on( "click", function () {
				function e ( n, a ) {
					var t = '<div class="wbdl-main" id="J_ppoDownloadDLIPP">\n            <div class="dl-info">\n                <svg class="wb-icon wbsico-dlipp-confirm"><use xlink:href="#wbsico-dlipp-confirm"></use></svg>\n\n                <span>密码</span>\n                <b class="dl-psw">' + a + '</b>\n                <span>已复制</span>\n            </div>\n            <a class="wb-btn wb-btn-outlined wb-btn-download j-copy-psw" href="' + n + '" data-clipboard-text="' + a + '" target="_blank" rel="nofollow">\n                <svg class="wb-icon-dlipp wbsico-dlipp-download"><use xlink:href="#wbsico-dlipp-download"></use></svg>\n\n                <span>前往下载页面</span>\n            </a>\n        </div>\n        <div class="info-for-sp">\n            <span>低版本浏览器需手动复制密码再前往下载页面下载，谢谢</span>\n        </div>';
					return a && ( o.value = a, o.select(), document.execCommand( "Copy" ) ), t
				}
				var d = c( this ),
					n = wb_dlipp_config.pid || 0,
					a = wb_dlipp_config.ajax_url || "/admin-ajax.php",
					l = c( this ),
					t = l.data( "rid" ),
					o = document.querySelector( "#WBDL_PSW" );
				if ( l.data( "dl-url" ) ) {
					var i = l.data( "dl-url" ),
						s = l.data( "dl-pwd" ) || "",
						r = e( i, s );
					return s ? wbui.open( {
						content: r,
						type: "wbdl-dialog"
					} ) : window.open( i, "_blank" ), !1
				}
				c.post( a, {
					action: "wb_dlipp_front",
					pid: n,
					rid: t
				}, function ( n ) {
					switch ( n.code ) {
						case 0:
							var a, t = n.data.url,
								o = n.data.pwd;
							if ( "" === t ) {
								wbui.alert( "下载异常，请联系网站管理员修正下载链接" );
								break
							}
							l.data( "dl-url", t ), l.data( "dl-pwd", o ), o ? ( r = e( t, o ), wbui.open( {
									content: r,
									type: "wbdl-dialog"
								} ) ) : ( d.attr( "href", t ), null != ( a = window.open( t ) ) && void 0 !== a || wbui.open( {
									content: '<div class="dl-info">浏览器拦截了跳转，请重试。<br><br><a class="wb-btn wb-btn-outlined wb-btn-download" href="' + t + '" target="_blank" rel="nofollow">\n                   <svg class="wb-icon-dlipp wbsico-dlipp-download"><use xlink:href="#wbsico-dlipp-download"></use></svg>\n                <span>去下载</span>\n            </a></div>',
									type: "wbdl-dialog"
								} ) ), c( ".j-wbdl-count" )
								.length && c( ".j-wbdl-count" )
								.text( n.data.post_downs );
							break;
						case 1:
							wbui.alert( "下载异常，请联系网站管理员" );
							break;
						case 2:
							wbui.alert( "请先登录，谢谢" );
							break;
						case 3:
							wbui.toast( "请先留下您的评论，谢谢" );
							break;
						default:
							wbui.alert( "下载异常，请联系网站管理员" )
					}
					return !1
				}, "json" )
			} )
	} ),
( window, document );
