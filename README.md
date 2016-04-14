# admin

> Admin Console Using React + Async-props + Falcor + Restful API

You can see related slide: http://slides.com/ustccjw/react

Running and test rely on backend API, so it just demo case.

* [React Component Style][1]
* [Async-props][2]
* [Falcor + Restful API][3]
* [Async-props + Falcor][4]

[1]: http://slides.com/ustccjw/react#/14
[2]: http://slides.com/ustccjw/react#/8
[3]: http://slides.com/ustccjw/react#/9
[4]: http://slides.com/ustccjw/react#/10


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
