
// mad-web-cache
// teadrinker / Martin Eklund, 2024
// GPL-3.0 license

/*

Basic caching/archiving proxy server as single deno script.
 * Tries to store all files locally requested as you browse.
 * Access the web through `localhost/mad-web-cache/`  instead of `https://`
 * Tries to remap links using basic search n replace (in all text files)
 * Querystrings for urls ending with .php, .asp, /css, /css2 are hashed and included in local cache filenames to enable multiple cached results

*/

import { serveFile } from "jsr:@std/http/file-server";
//import { createHash } from "https://deno.land/std@0.179.0/crypto/mod.ts"; // could not get built-in md5 to work...

function md5(d : string) {var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}


async function cacheResponse(response: Response, localPath: string): Promise<Response> {

    const data = new Uint8Array(await response.arrayBuffer());
    const dirURL = localPath.split('/').slice(0, -1).join('/')

    // console.log(localPath);

    await Deno.mkdir(dirURL, { recursive: true });
    await Deno.writeFile(localPath, data);
  
    return new Response(data, {
      status: response.status,
      headers: response.headers,
    });
  }

function urlMaybeScript(url: string): boolean {
  const scriptExts = ['.php', '.asp', '.aspx', '.jsp', '.cgi', '.pl', '.py', '.rb', '.lua', '.shtml', '.ejs', '.php5', '.twig', '.phtml', 
                      '/css', '/css2', ];
  for (const ext of scriptExts) {
      if (url.endsWith(ext)) {
      return true;
      }
  }
  return false;
}

async function fileExists(path: string): Promise<boolean> {
    const fileInfo = await Deno.stat(path).catch(() => null);
    return fileInfo !== null && fileInfo.isFile;
}

async function safeStat(path: string): Promise<Deno.FileInfo | null> {
  try {
    const stats : Deno.FileInfo = await Deno.stat(path);
    return stats;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return null; // Return null if the file or directory does not exist
    }
    throw error; // Rethrow other errors
  }
}

async function checkIfRedirected(url: string, verboseLog: boolean): Promise<string> {
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (response.redirected) {
                                                                                if(verboseLog) console.log('---- checkIfRedirected ' + url + '  ->  ' + response.url);
      return response.url;
    }
                                                                                if(verboseLog) console.log('---- checkIfRedirected ' + url + '  (no redirect detected)');
  } catch (error) {
    console.error(`checkIfRedirected Error: ${error}`);
  }
  return '';
}

function redirect(url: string): Response {
  return new Response(null, { status: 302, headers: { 'Location': url } });
}

function isTextContent(response: Response): boolean {
  const contentType = response.headers.get("content-type") || "";
  return contentType.startsWith("text/") || 
         contentType.includes("application/javascript") ||
         contentType.includes("application/json") ||
         contentType.includes("application/xml") ||
         contentType.includes("application/x-www-form-urlencoded") ||
         contentType.includes("application/xhtml+xml");
}

function replaceAll(target: string, search: string, replacement: string): string {
  return target.split(search).join(replacement);
}

function stripQuerystringAndHash(url: URL): URL {
  try {
    url = new URL(url);
    url.search = '';
    url.hash = '';
    return url;
  } catch (error) {
    console.error('Invalid URL:', error);
    return url; // Return the original URL if there's an error
  }
}

function urlAttachQuerystringAndHash(baseUrl: string, existingUrl: URL): string {
  if(existingUrl.hash == '' && existingUrl.search == '')
    return baseUrl;
  const newUrl = new URL(baseUrl);
  newUrl.hash = existingUrl.hash;
  newUrl.search = existingUrl.search;
  return newUrl.toString();
}

function removeTrailingSlash(url: string): string {
  if (url.endsWith('/')) {
      return url.slice(0, -1);
  }
  return url;
}

function hashIfNotEmpty(text: string): string {
  if(text == '')
    return '';
  const queryStringHashSeparator = '__qs__';
  return queryStringHashSeparator + md5(text);
  //const hash = createHash("md5");
  //hash.update(text);
  //return queryStringHashSeparator + hash.toString();
}



Deno.serve(async (req: Request) => {

  const verboseLog = Deno.args.indexOf("--verbose") != -1;
  const noRemoteCalls = Deno.args.indexOf("--blockremote") != -1;
  const globalRemap = !(Deno.args.indexOf("--skipglobalremap") != -1);
  const mirrorFolderName = 'mad-web-cache';

                                                                                if(verboseLog) console.log("---- SERVE: " + req.url + "   ref: " + req.headers.get('Referer'));

  const reqUrl = new URL(req.url);
  const pathname = stripQuerystringAndHash(reqUrl).pathname;
  const usesMirrorFolderName = pathname.startsWith('/' + mirrorFolderName + '/')

  if(!usesMirrorFolderName) {
    const ref = req.headers.get('Referer');
    if(ref != null && ref != "") {
      const refUrl = new URL(ref);
      const refPathname = stripQuerystringAndHash(refUrl).pathname;
      const refUsesMirrorFolderName = refPathname.startsWith('/' + mirrorFolderName + '/')
      if(refUsesMirrorFolderName) {
        const referrerDir = refPathname.split('/').slice(0, 3).join('/');
                                                                                if(verboseLog) console.log("---- redirect to inferred dir: " + referrerDir + ", pathname:" + pathname);
        //pathname = referrerDir + pathname;
        //usesMirrorFolderName = true;
        return redirect(urlAttachQuerystringAndHash(reqUrl.origin + referrerDir + pathname, reqUrl) );
      }
      else {
        console.warn("Missing mirrorFolderName: " + mirrorFolderName + ", pathname: " + pathname + ", headers.Referer: "+ref);
      }
    }
    else {
      console.warn("Missing mirrorFolderName: " + mirrorFolderName + ", also missing headers.Referer, pathname: " + pathname);
    }
  }

  if (usesMirrorFolderName) {
    const localPath = pathname.substring(1); // remove first slash  
    const splitPath = localPath.split('/');  // "mad-web-cache/www.teadrinker.net/music/" -> ['mad-web-cache', 'www.teadrinker.net', 'music', '']
    const isDomainRoot = splitPath.length <= 2;
    const localPathEndsWithSlash = localPath.endsWith('/');

    if(isDomainRoot && !localPathEndsWithSlash)
    {
      // we need to redirect local client/browser, 
      // otherwise, when it requests additional files, 
      // their relative paths will be wrong      
                                                                                  if(verboseLog) console.log(`---- root/domain level redirect ${localPath + '/'} (added slash)`);
      return redirect(urlAttachQuerystringAndHash(reqUrl.origin + '/' + localPath + '/', reqUrl) );
    }

    let queryString = urlMaybeScript(localPath) ? reqUrl.search : '';  // if file extension does not indicate script, ignore caching per querystring
    let likelyDir = isDomainRoot || localPathEndsWithSlash;//  !hasCommonExt(localPath);
    let remoteURL = "https://" + localPath.substring(mirrorFolderName.length + 1);

    // follow all redirects, require extra file for all files??
    /*
    let localRedirectPath = localPath + "." + mirrorFolderName + ".redirect"
    let redirect : string? = await Deno.readTextFile(localRedirectPath).catch(() => null);

    const response = await fetch(url, { method: "HEAD" });
    if (response.redirected) {
    */

    const localFileInfo = await safeStat(removeTrailingSlash(localPath) + hashIfNotEmpty(queryString));
    if(localFileInfo != null) {
      likelyDir = localFileInfo.isDirectory;
                                                                                  if(verboseLog) console.log(`---- found cache ${localPath}` + (likelyDir ? '(folder)' : ''));
      if(localFileInfo.isDirectory && !localPathEndsWithSlash) {
                                                                                  if(verboseLog) console.log(`---- redirect to ${localPath + '/'} (added slash)`);
        return redirect(urlAttachQuerystringAndHash(reqUrl.origin + '/' + localPath + '/', reqUrl) );
      }
    } 
    else // localFileInfo == null
    { 
      if(noRemoteCalls) {
        console.warn(`Not locally cached: ${localPath}`);
        return new Response("404: Not locally cached", { status: 404 });
      }

      const redir = await checkIfRedirected(urlAttachQuerystringAndHash(remoteURL, reqUrl), verboseLog);
      if(redir != '') {
        // we need to redirect local client/browser, 
        // otherwise, when it requests additional files, 
        // their relative paths will be wrong
        let baseUrl = ''
        if(redir == remoteURL + '/') {
          baseUrl = reqUrl.origin + '/' + localPath + '/'
          await Deno.mkdir(localPath + hashIfNotEmpty(queryString)); // cache as dir
                                                                                  if(verboseLog) console.log(`---- redirect to ${baseUrl} (adding slash at the end)`);
        }
        else if(redir + '/' == remoteURL) {
          baseUrl = reqUrl.origin + '/' + localPath.slice(0, -1);
                                                                                  if(verboseLog) console.log(`---- redirect to ${baseUrl} (removed slash at the end)`);
        }
        if(baseUrl != '') {
          return redirect(urlAttachQuerystringAndHash(baseUrl, reqUrl));
        }
        else {
          if(redir.startsWith("https://")) {
            baseUrl = reqUrl.origin + '/' + mirrorFolderName + '/' + redir.substring("https://".length);
                                                                                  if(verboseLog) console.log(`---- redirect to ${baseUrl}`);
            return redirect(urlAttachQuerystringAndHash(baseUrl, reqUrl));
          }
          console.error("Error! redirection ignored: "+remoteURL+"  ->  "+redir);
        }
      }
    }

    var addURLParts = !likelyDir ? [""] : ["index.html", "index.shtml", "index.php", "index.htm", ""];//, "default.html", "Default.htm", "default.html", "Default.html", "default.shtml", "Default.shtml", "page1.html", "index.pl", "index.cgi", "index.php3", "index.phtml", "home.htm", "home.html", "home.shtml", "index.wml"];

    // check for local file
    try {    
        for (const part of addURLParts) {
            let fullLocalPath = localPath + hashIfNotEmpty(queryString) + part;
            if(await fileExists(fullLocalPath)) {
                // console.log(`serve cached file : ${fullLocalPath}`);
                return await serveFile(req, fullLocalPath);
            }
        }
    } catch (error) {
        console.error("Exception checking for local file: " + error); 
    }

    if(noRemoteCalls) {
      console.warn(`Not locally cached: ${localPath}`);
      return new Response("404: Not locally cached", { status: 404 });
    }

    // check for remote file
    try {    
        for (const part of addURLParts) {
            let fullRemotePath = remoteURL + part;
            let response = await fetch(urlAttachQuerystringAndHash(fullRemotePath, reqUrl));
            if (!response.ok) {
                                                                                  if(verboseLog) console.log(`---- failed fetch: ${fullRemotePath}`);
                continue;
            }

            if(isTextContent(response)) {
              const relativePath = "../".repeat(splitPath.length < 3 ? 0 : splitPath.length - 3);
              const domainName = replaceAll(splitPath[1],'www.', '');
                                                                                  if(verboseLog) console.log(`---- caching file: ${fullRemotePath} (remap URLs to relative/local URLs)`);
              let text = await response.text();
              text = replaceAll(text, 'https://www.'+domainName+ '/', relativePath);
              text = replaceAll(text, 'https://www.'+domainName     , relativePath);
              text = replaceAll(text, 'https://'    +domainName+ '/', relativePath);
              text = replaceAll(text, 'https://'    +domainName     , relativePath);
              text = replaceAll(text, 'http://www.' +domainName+ '/', relativePath);
              text = replaceAll(text, 'http://www.' +domainName     , relativePath);
              text = replaceAll(text, 'http://'     +domainName+ '/', relativePath);
              text = replaceAll(text, 'http://'     +domainName     , relativePath);
              // text = text.replace(new RegExp(`https://[^.]+\\.${mydomain}`, 'g'), relativePath);
              // text = text.replace(new RegExp(`http://[^.]+\\.${mydomain}`, 'g'), relativePath);
              
              if(globalRemap) {
                // re-link global urls to local as well
                text = replaceAll(text, 'https://' , relativePath + '../');
                text = replaceAll(text, 'http://'  , relativePath + '../');
              }
          
              response = new Response(text, {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers,
              });
            }
            else 
            {
                                                                                  if(verboseLog) console.log(`---- caching file: ${fullRemotePath}`);
            }

            return await cacheResponse(response, localPath + hashIfNotEmpty(queryString) + part);
        }
        console.error("All fetches failed: "+remoteURL);
    } catch (error) {
        console.error("Exception getting/caching remote file: " + error + "\n\n" + error.stack); 
    }
  }

    return new Response("404: Not Found", { status: 404 });
});


