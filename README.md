## LaSociale
Logical Address Gone Social

##Local Debuging
```
parse-dashboard --appId test --masterKey test --serverURL "http://localhost:1337/parse" --appName gorilla
```
###Cloud Code
```
curl -X POST \
	-H "X-Parse-Application-Id: test" \
	-H "X-Parse-REST-API-Key: test" \
	-H "Content-Type: application/json" \
	-d '{"objectId":"5k8ortqZqH", "rating": 3}' \
	http://localhost:1337/parse/functions/ratePost
```
```
curl -X POST \
  -H "X-Parse-Application-Id: test" \
  -H "X-Parse-REST-API-Key: test" \
  -H "Content-Type: application/json" \
  http://localhost:1337/parse/functions/hello
```
## Special Users
```
['logicaladdress','retnan','daser','lasociale'];
```