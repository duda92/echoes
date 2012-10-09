/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define(["module"],function(e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={version:"2.0.3",strip:function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+"."+s.ext,h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.moduleName+"."+o.ext,a=r.toUrl(o.moduleName+"."+o.ext)+".js";t.load(u,r,function(n){var r=function(e){return i(a,e)};r.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,u,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t})