## mad-web-cache

Basic/experimental caching/archiving proxy server, as single deno script.

If you want to use this to convert a blog to static form:

  **use --skipglobalremap**

By default, it tries to re-write all urls to go through the proxy,
so for instance embedded youtube video urls will be rewritten as
a relative URL (something like `../../../youtube.com/`) which will no longer work...

How it works:
 * Tries to store all requests as local files as you browse the web. For offline access or analysis.
 * Access the web through `localhost:8000/mad-web-cache/`  instead of `https://`
 * Tries to remap links using basic search n replace (in all text content)
 * Querystrings for urls ending with .php, .asp, /css, /css2 etc, are hashed and the hash is included in local cache filenames to enable multiple cached results

 Additional info
 * Currently don't handle characters that are allowed in urls but not on the local file system
 * Only works well on simple sites
 * Only tested on Windows 10
 * GPL-3.0 license
