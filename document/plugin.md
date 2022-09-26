# 插件开发教程

> 警告！在开发的过程中切勿添加恶意代码泄露学校信息

开发插件教程需要注意的地方如下：
- 在开发插件之前建议你需要足够了解学校教务处的登陆流程再进行模拟浏览器去访问学校教务处
- 在模拟浏览器访问教务处页面过程中，会需要进行用户登陆认证操作。我们需要提供正确的用户名，密码以及验证码才能进入到教务系统并去获取课程信息
- 教务处的登陆网页的验证码是随着默认cookie值的变化而改变的，所以我们要保证我们在进行登陆操作时是带着我们在第一次获取到的默认cookie值来完成登陆，从而避免验证码不一致的情况发生。
- 对于获取到的验证码图片应转换成base64来传输给前端进行还原并提供给用户
- 用户成功登陆后网页会进行重定向操作进入教务处主页，并在此期间重新设置了cookie值，此cookie值可以直接用于访问教务处主页无需登陆操作，故我们将其保存下来，供我们模拟浏览器去获取用户教务处课程信息。



开发插件教程的步骤如下：
1. 第一次访问教务处登陆页面并获取到默认cookie值
2. 带着默认cookie值去得到教务处的登陆网页的验证码图片信息
3. 带着默认cookie值将用户输入的用户名，密码以及验证码通过post的请求去访问教务处登陆界面，返回是否登陆成功的信息。若成功登陆页面会进行重定向操作，需要保存重定向的url地址以去获取重新设置的cookie值。
4. 模拟浏览器访问保存的url值，获取并保存到重新设置的cookie信息
5. 带着用户cookie信息从课程网页解析html中的课程信息


具体实现操作由以下代码提供参考：


```java

private CookieStore cStore;// cookie
private PoolingHttpClientConnectionManager cm;//提供连接池，保证页面访问所携带的cookie值统一
httpClient = HttpClients.custom().setConnectionManager(cm).setDefaultCookieStore(cStore).build();//设置连接池以及绑定默认cookie

//第一次进入教务处登陆页面并获取到cookie值
public void doGetNJUST() {
        HttpGet httpGet = new HttpGet("http://202.119.81.113:9080/njlgdx/xk/Verifyservlet");
        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(httpGet);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (response != null)
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }

//带着默认cookie值去获取登陆页面给出的验证码信息
public String doCodeImageNJUST() {
    HttpGet httpGet = new HttpGet("http://202.119.81.113:9080/njlgdx/verifycode.servlet");
    CloseableHttpResponse response = null;
    try {
        response = httpClient.execute(httpGet);
        if (response.getStatusLine().getStatusCode() == 200){
            HttpEntity httpEntity = response.getEntity();
            String contentType = httpEntity.getContentType().getValue();
            byte[] bytes = EntityUtils.toByteArray(httpEntity);
            String base64Str = Base64.getEncoder().encodeToString(bytes);
            base64Str = "data:" + contentType + ";base64," + base64Str;
            EntityUtils.consume(httpEntity);
            return base64Str;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (response != null)
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
        return "";
    }
}

//带着默认cookie值将用户输入的用户名，密码以及验证码通过post的请求去访问教务处登陆界面，返回是否登陆成功的信息。
public String doPostNJUST(SchoolUser user) throws UnsupportedEncodingException {

        HttpPost httpPost = new HttpPost("http://202.119.81.113:9080/njlgdx/xk/Verifyservlet");
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("USERNAME", user.getUsername()));
        params.add(new BasicNameValuePair("PASSWORD", user.getPassword()));
        params.add(new BasicNameValuePair("RANDOMCODE", user.getCode()));
        httpPost.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
        httpPost.setHeader("Referer", "http://202.119.81.113:9080/njlgdx/xk/Verifyservlet");
        httpPost.setHeader("origin", "http://202.119.81.113:9080");
        httpPost.setHeader("user-agent",
                "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36");
        httpPost.setHeader("Cache-Control", "max-age=0");
        httpPost.setHeader("Upgrade-Insecure-Requests", "1");

        CloseableHttpResponse response = null;
        try {

            response = httpClient.execute(httpPost);
            List<Cookie> cookies = cStore.getCookies();
            System.out.println("Post" + cookies.get(0).getValue());
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity httpEntity = response.getEntity();
                String content = EntityUtils.toString(httpEntity, "utf-8");
                System.out.println(content.length());
                Document doc = Jsoup.parse(content);
                Element element1 = doc.select("font[color=red]").first();
                if (element1 == null) {
                    return "用户名或密码错误！";
                }
                System.out.println(element1);
                return element1.text();
            } else if (response.getStatusLine().getStatusCode() == 302) {
                Header[] headers = response.getHeaders("Location");
                for (Header header : headers) {
                    url = header.getValue();
                    url = url.replaceFirst("113", "112");
                }//若成功登陆页面会进行重定向操作，需要保存重定向的url地址以去获取重新设置的cookie值。
                return "成功获取cookie";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (response != null)
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
        return "";
    }
//模拟浏览器访问保存的url值，获取并保存到重新设置的cookie信息，并带着用户cookie信息从课程网页解析html中的课程信息
public void doGetCourse() throws UnsupportedEncodingException {
        HttpGet httpGet = new HttpGet(url);

        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(httpGet);
            List<Cookie> cookies = cStore.getCookies();
            JSESSIONID = cookies.get(0).getValue();//获取到重新设置的cookie信息
            courseInfo = new GetCourseInfo(JSESSIONID);
            Spider.create(courseInfo)
                    .addUrl("http://202.119.81.112:9080/njlgdx/xskb/xskb_list.do?Ves632DSdyV=NEW_XSD_PYGL").run();//解析用户课程信息
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (response != null)
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }
```
