rm msn.js
cat	lib/md5_crypt.js \
	src/hellow/protocol/msnp.js \
	src/hellow/protocol/notification.js \
	src/hellow/protocol/msnp8.js >> msn.js
rhino msn.js
	
