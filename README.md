## mad-web-cache

Basic caching/archiving proxy server as single deno script.
 * Tries to store all files locally requested as you browse.
 * Access the web through `localhost/mad-web-cache/`  instead of `https://`
 * Tries to remap links using basic search n replace (in all text files)
 * Querystrings for urls ending with .php, .asp, /css, /css2 etc, are hashed and included in local cache filenames to enable multiple cached results
 * Currently don't handle characters that are allowed in urls but not on the file system
 * Only works well on simple sites
 * Only tested on Windows 10
 * GPL-3.0 license
