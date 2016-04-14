hproxy.yaml:

````
- host: crmtest.baixing.com.cn
  path: "/__webpack_hmr"
  to:
    host: localhost:3000
- host: crmtest.baixing.com.cn
  path: "/weini/admin/*"
  to:
    host: localhost:3000
- host: crmtest.baixing.com.cn:9876
  path: "*"
  to:
    host: localhost:9876
````
