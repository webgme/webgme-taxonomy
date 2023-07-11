__Installation Log__

> C:\_\wl\webgme-taxonomy>npm install --force
> npm WARN using --force Recommended protections disabled.
> npm WARN ERESOLVE overriding peer dependency
> npm WARN While resolving: webgme-json-importer@1.4.1
> npm WARN Found: webgme@2.44.0-beta
> npm WARN node_modules/webgme
> npm WARN   webgme@"github:webgme/webgme#azure" from the root > project
> npm WARN
> npm WARN Could not resolve dependency:
> npm WARN peer webgme@"^2.23.0" from webgme-json-importer@1.4.1
> npm WARN node_modules/webgme-json-importer
> npm WARN   webgme-json-importer@"^1.4.1" from the root project
> npm WARN
> npm WARN Conflicting peer dependency: webgme@2.43.0
> npm WARN node_modules/webgme
> npm WARN   peer webgme@"^2.23.0" from webgme-json-importer@1.4.1
> npm WARN   node_modules/webgme-json-importer
> npm WARN     webgme-json-importer@"^1.4.1" from the root project
> npm WARN ERESOLVE overriding peer dependency
> npm WARN While resolving: webgme-transformations@0.5.1
> npm WARN Found: webgme@2.44.0-beta
> npm WARN node_modules/webgme
> npm WARN   webgme@"github:webgme/webgme#azure" from the root > project
> npm WARN
> npm WARN Could not resolve dependency:
> npm WARN peer webgme@"^2.24.0" from webgme-transformations@0.5.1
> npm WARN node_modules/webgme-transformations
> npm WARN   webgme-transformations@"^0.5.1" from the root project
> npm WARN
> npm WARN Conflicting peer dependency: webgme@2.43.0
> npm WARN node_modules/webgme
> npm WARN   peer webgme@"^2.24.0" from webgme-transformations@0.5.1
> npm WARN   node_modules/webgme-transformations
> npm WARN     webgme-transformations@"^0.5.1" from the root project
> npm WARN ERESOLVE overriding peer dependency
> npm WARN deprecated source-map-url@0.4.1: See https://github.com/> lydell/source-map-url#deprecated
> npm WARN deprecated urix@0.1.0: Please see https://github.com/> lydell/urix#deprecated
> npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/> resolve-url#deprecated
> npm WARN deprecated source-map-resolve@0.5.3: See https://github.> com/lydell/source-map-resolve#deprecated
> npm WARN deprecated formidable@1.2.6: Please upgrade to latest, > formidable@v2 or formidable@v3! Check these notes: https://bit.ly/> 2ZEqIau
> npm WARN deprecated chokidar@1.7.0: Chokidar 2 will break on node > v14+. Upgrade to chokidar 3 with 15x less dependencies.
> npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || > >=4 <4.3.1 have a low-severity ReDos regression when used in a > Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.> 1. (https://github.com/visionmedia/debug/issues/797)
> npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || > >=4 <4.3.1 have a low-severity ReDos regression when used in a > Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.> 1. (https://github.com/visionmedia/debug/issues/797)
> npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
> npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || > >=4 <4.3.1 have a low-severity ReDos regression when used in a > Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.> 1. (https://github.com/visionmedia/debug/issues/797)
> npm WARN deprecated querystring@0.2.0: The querystring API is > considered Legacy. new code should use the URLSearchParams API > instead.
> npm WARN deprecated uuid@3.1.0: Please upgrade  to version 7 or > higher.  Older versions may use Math.random() in certain > circumstances, which is known to be problematic.  See https://v8.> dev/blog/math-random for details.
> npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no > longer supported. Please update to mkdirp 1.x. (Note that the API > surface has changed to use Promises in 1.x.)
> npm WARN deprecated superagent@3.8.3: Please upgrade to v7.0.2+ of > superagent.  We have fixed numerous issues with streams, > form-data, attach(), filesystem errors not bubbling up (ENOENT on > attach()), and all tests are now passing.  See the releases tab > for more information at <https://github.com/visionmedia/superagent/> releases>.
> npm WARN deprecated buffer@4.9.1: This version of 'buffer' is > out-of-date. You must update to v4.9.2 or newer
> npm WARN deprecated json-schema-ref-parser@3.3.1: Please switch to > @apidevtools/json-schema-ref-parser
> npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer > maintained and not recommended for usage due to the number of > issues. Because of the V8 engine whims, feature detection in old > core-js versions could cause a slowdown up to 100x even if nothing > is polyfilled. Some versions have web compatibility issues. > Please, upgrade your dependencies to the actual version of core-js.
> npm WARN deprecated bower@1.8.8: We don't recommend using Bower > for new projects. Please consider Yarn and Webpack or Parcel. You > can read how to migrate legacy project here: https://bower.io/blog/> 2017/how-to-migrate-away-from-bower/
> 
> > webgme-taxonomy@1.2.2 prepublish
> > husky install
> 
> husky - Git hooks installed
> 
> > webgme-taxonomy@1.2.2 prepare
> > npm run build && cd src/routers/Dashboard/app && npm install && > cd ../../Search/dashboard && npm install
> 
> npm WARN using --force Recommended protections disabled.
> npm WARN using --force Recommended protections disabled.
> 
> > webgme-taxonomy@1.2.2 build
> > tsc --build
> 
> npm WARN using --force Recommended protections disabled.
> npm WARN using --force Recommended protections disabled.
> 
> > taxonomy-dashboard@1.0.0 prepare
> > npm run build
> 
> npm WARN using --force Recommended protections disabled.
> npm WARN using --force Recommended protections disabled.
> 
> > taxonomy-dashboard@1.0.0 build
> > vite build
> 
> vite v3.2.2 building for production...
> transforming (42) node_modules\@smui\card\dist\MediaContent.> js3:07:39 PM [vite-plugin-svelte] C:/_/wl/webgme-taxonomy/src/> routers/Dashboard/app/node_modules/@smui/card/dist/PrimaryAction.> svelte:1:0 A11y: noninteractive element cannot have positive > tabIndex value
> 1: <div
>    ^
> 2:   bind:this={element}
> 3:   use:useActions={use}
> ✓ 173 modules transformed.
> dist/index.html                  0.82 KiB
> dist/assets/index.c5c1bc02.css   106.27 KiB / gzip: 10.98 KiB
> dist/assets/index.0e13efa8.js    80.68 KiB / gzip: 20.55 KiB
> 
> added 176 packages, and audited 177 packages in 25s
> 
> 13 packages are looking for funding
>   run `npm fund` for details
> 
> 1 high severity vulnerability
> 
> To address all issues, run:
>   npm audit fix
> 
> Run `npm audit` for details.
> npm WARN using --force Recommended protections disabled.
> npm WARN using --force Recommended protections disabled.
> 
> > taxonomy-search@1.0.0 postinstall
> > patch-package
> 
> patch-package 6.4.7
> Applying patches...
> @smui-extra/autocomplete@6.2.0 ✔
> 
> > taxonomy-search@1.0.0 prepare
> > npm run build
> 
> npm WARN using --force Recommended protections disabled.
> npm WARN using --force Recommended protections disabled.
> 
> > taxonomy-search@1.0.0 build
> > rollup -c && smui-theme compile public/build/smui.css -i src/> theme
> 
> 
> src/main.ts → public/build/bundle.js...
> (!) Circular dependencies
> node_modules/@smui/textfield/node_modules/@smui/common/dist/index.> js -> node_modules/@smui/textfield/node_modules/@smui/common/dist/> CommonLabel.svelte -> node_modules/@smui/textfield/node_modules/> @smui/common/dist/index.js
> node_modules/@smui/textfield/node_modules/@smui/common/dist/index.> js -> node_modules/@smui/textfield/node_modules/@smui/common/dist/> CommonIcon.svelte -> node_modules/@smui/textfield/node_modules/> @smui/common/dist/index.js
> node_modules/@smui/list/node_modules/@smui/common/dist/index.js -> > node_modules/@smui/list/node_modules/@smui/common/dist/CommonLabel.> svelte -> node_modules/@smui/list/node_modules/@smui/common/dist/> index.js
> ...and 15 more
> (!) Plugin svelte: TagItem has unused export property 'depth'. If > it is for external reference only, please consider using `export > const depth`
> src/components/TagItem.svelte
>  6: import { Item, Text, } from "@smui/list";
>  7: export let tag;
>  8: export let depth = 0;
>                ^
>  9: // Given a tag object, create a list of paths to nested values
> 10: const fqnValues = getFullyQualifiedEntries(tag).sort();
> created public/build/bundle.js in 33.9s
> 
> src/TaxonomyReference.ts → dist/TaxonomyReference.js...
> (!) Plugin typescript: @rollup/plugin-typescript: Rollup > 'sourcemap' option must be set to generate source maps.
> (!) Mixing named and default exports
> https://rollupjs.org/guide/en/#outputexports
> The following entry modules are using named and default exports > together:
> src/TaxonomyReference.ts
> 
> Consumers of your bundle will have to use chunk['default'] to > access their default export, which may not be what you want. Use > `output.exports: 'named'` to disable this warning
> created dist/TaxonomyReference.js in 380ms
> Compiling SMUI Styles...
> Warning: both $level and $color are required; received $level: > '0', $color: ''
>     node_modules\@material\elevation\_elevation-theme.scss 234:5   > -shadow()
>     node_modules\@material\elevation\_elevation-theme.scss 466:20  > resolver()
>     node_modules\@material\tokens\_resolvers.scss 5:11             > -material-elevation()
>     node_modules\@material\elevation\_elevation-theme.scss 426:21  > with-resolver()
>     node_modules\@material\banner\_banner-theme.scss 437:3         > -banner-elevation()
>     node_modules\@material\banner\_banner-theme.scss 154:3         > theme-styles()
>     node_modules\@material\banner\_banner.scss 63:5                > core-styles()
>     node_modules\@material\banner\styles.scss 25:1                 > @use
>     node_modules\@smui\banner\_style.scss 1:1                      > @use
>     node_modules\smui-theme\_style.scss 2:1                        > @use
>     node_modules\smui-theme\_index.scss 2:1                        > root stylesheet
> 
> Writing CSS to public/build/smui.css...
> 
> added 776 packages, and audited 777 packages in 2m
> 
> 31 packages are looking for funding
>   run `npm fund` for details
> 
> 2 vulnerabilities (1 moderate, 1 high)
> 
> To address all issues, run:
>   npm audit fix
> 
> Run `npm audit` for details.
> 
> added 1091 packages, and audited 1092 packages in 10m
> 
> 66 packages are looking for funding
>   run `npm fund` for details
> 
> 44 vulnerabilities (2 low, 16 moderate, 19 high, 7 critical)
> 
> To address issues that do not require attention, run:
>   npm audit fix
> 
> To address all issues possible (including breaking changes), run:
>   npm audit fix --force
> 
> Some issues need review, and may require choosing
> a different dependency.
> 
> Run `npm audit` for details.