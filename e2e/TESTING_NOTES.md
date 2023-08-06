# Notes for Testing

## 

2023-08-06T12:36:42.045Z - warn: [gme:server:standalone:WebSocket] socket not authorized to join room guest+taxonomy
2023-08-06T12:36:42.055Z - error: [gme:server:standalone:WebSocket] Error: Not authorized to read project [guest+taxonomy]
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\webgme-engine\src\server\storage\safestorage.js:558:27
    at _fulfilled (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:854:54)
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:883:30
    at Promise.promise.promiseDispatch (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:816:13)
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:624:44
    at runSingle (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:137:13)
    at flush (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:125:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
 Error: Caught by
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\webgme-engine\src\server\storage\websocket.js:759:56
    at _rejected (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:864:24)
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:890:30
    at Promise.when (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:1142:31)
    at Promise.promise.promiseDispatch (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:808:41)
    at C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:624:44
    at runSingle (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:137:13)
    at flush (C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\q\q.js:125:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
