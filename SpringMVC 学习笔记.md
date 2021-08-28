# SpringMVC 学习笔记

**MVC：**  **模型**（dao， service）  **视图**（jsp） **控制器**（Servlet）

公共依赖

pom.xml中

```xml
<!--    导入依赖-->
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.0.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.2</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
    </dependencies>
```

# 一  HelloSpringMVC

**如果不是建的web项目注意添加web支持 ，成功后 web文件夹上有蓝点（idea）**

1. 配置web.xml文件（该文件在web文件下自动生成）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--1. 注册 DispatcherServlet -->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--关联一个 springmvc 的配置文件：【servlet-name】-servlet.xml -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <!--启动级别-1-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!-- /  匹配所有的请求： （不包括 .jsp）-->
    <!-- /*  匹配所有的请求： （包括 .jsp）-->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

**注意这里的 springmvc-servlet.xml 需要我们取配置，就是一个spring配置文件，写在 resource 文件夹下**

```xml
<init-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>classpath:springmvc-servlet.xml</param-value>
</init-param>
```



2. 配置**springmvc-servlet.xml**  文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    添加处理映射器-->
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
<!--    添加处理器适配器-->
    <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
<!--    添加视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <!--        前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--        后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>
    
    <!--    BeanNameUrlHandlerMapping: bean-->
    <bean id="/hello" class="com.shishi.controller.HelloController"/>

</beans>
```

3. 编写我们要操作业务Controler，要么实现Controller接口，要么增加注解：需要返回一个ModelAndView，装数据，封视图

**注意千万不要导错Controller包**

```java
//真实开发不会这样写，这是原理讲解
package com.shishi.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//注意：这里我们先导入Controller接口
public class HelloController implements Controller {//注意导入第二包，第一个是注解
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //ModelAndView 模型和视图
        ModelAndView mv = new ModelAndView();

        //封装对象，放在 ModelAndView 中。Model
        mv.addObject("msg","HelloSpringMVC");
        //封装要跳转的视图，放在ModelAndView中
        mv.setViewName("Hello");//: /WEB-INF/jsp/helo.jsp  查看之前的spring配置，前缀和后缀那里
        return mv;
    }
}
```

4. 将自己的类交给SpringIOC容器，注册bean

```xml
<!--    Handler-->
    <bean id="/hello" class="com.shishi.controller.HelloController"/>
```

5. 写要跳转的jsp页面，显示我们的 ModelAndView 存放的数据，以及我们的正常页面

**注意该文件的路径要和我们配置的一样 ，（前缀和后缀）**

```jsp
<%--
  Created by IntelliJ IDEA.
  User: 礻礻
  Date: 2021/5/26
  Time: 22:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

${msg}

</body>
</html>
```

6. 配置Tomcat 启动测试

可能会遇到如下问题：

* 查看控制台输出，看是不是少了 某个jar 包
* **如果jar包存在，显示无法输出，就在idea的项目发布中添加lib依赖**，**把所有的包都放进去**
* 重启 Tomcat

# 二 使用注解开发SpringMVC

1. 创一个普通maven项目

2. 在 **pom.xml**中引入相关的依赖

   主要有 Spring 框架核心库、Spring MVC、servlet、JSTL 等。

3. 配置 **web.xml**  （idea右键项目 添加springframe支持选中web ， 会生成带 **蓝点** 的web文件夹）

   **注意点：**

   * web.xml版本问题，要最新版
   * 注册DispatcherServlet
   * 关联SpringMVC的配置文件
   * 启动级别为1
   * 映射路径为  **/**  【不要**/***，会404】
   * **点击项目结构，创建lib目录，将所有包导进入**

   web.xml 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- 配置DispatchServlet：这个是SpringMVC的核心：请求分发器，前端控制器 -->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- DispatcherServlet 要绑定SpringMVC（就是 Spring ）的配置文件 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <!-- 启动级别： 1 -->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!--
        在SpringMVC中，  /   /*
            /： 只会匹配所有的请求，不包括 jsp 页面
            /*：匹配所有的请求，包括jsp页面
      -->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

4. 添加**springmvc-servlet** 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
       https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc 
       https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--  自动扫描包，让指定包下的注解生效，让IOC容器统一管理  -->
    <context:component-scan base-package="com.shishi.controller"/>
    <!--  让Spring MVC不处理静态资源  .css .js  .html  .mp3  .mp4 -->
    <mvc:default-servlet-handler/>
    <!--  
    支持mvc注解驱动
        在spring中一般采用@RequestMapping注解来完成映射关系
        要想使  @RequestMapping 注解生效，
        必须向上下文中注册 DefaultAnnotationHandlerMapping 
        和 一个 AnnotationMethodHandlerAdapter 实例
        这两个实例分别在类级别和方法级别处理
        二annotation-driver配置帮助我们自动完成上述两个实例的注入。
    -->
    <mvc:annotation-driven/>
    
    <!--  视图解析器  -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <!--    前缀    -->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--    后缀    -->
        <property name="suffix" value=".jsp"/>
    </bean>
    
</beans>
```

注意扫描包controller是自己建的，其他所有的都是固定好的写法

在视图解析器中我们把所有的视图都放在 **/WEB-INFO/** 目录下，这样可以保证视图安全，因为这个目录下的文件，客户端不能直接访问

5. 创建**controller**

使用注解方式而不是实现接口

```java
package com.shishi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller //代表这个类会被Spring接管，被这个注解的类中的所有方法如果有返回值，且是String类型，并且有具体的视图页面跳转，那么就会被视图解析器解析
public class HelloController {
    
    @RequestMapping("/hello")
    public String hello(Model model){
        //封装数据
        model.addAttribute("msg","Hello SpringMVCAnnotation");
        
        return "hello";  //会被视图解析器处理
    }
    
    @RequestMapping("/hello2")
    public String hello2(Model model){
        //封装数据
        model.addAttribute("msg","Hello2 SpringMVCAnnotation");
        
        return "hello";  //会被视图解析器处理
    }
    
    @RequestMapping("/hello3")
    public String hello3(Model model){
        //封装数据
        model.addAttribute("msg","Hello3 SpringMVCAnnotation");
        
        return "hello";  //会被视图解析器处理
    }
}
```

**注意：如果@RequestMapping("/hello")作用在类上，表示类里的方法都是它的子路由**

```java
@Controller
@RequestMapping("/hello")
public class HelloController {
    
    @RequestMapping("/h1")//   ip:port/hello/h1
    public String hello(Model model){
        //封装数据
        model.addAttribute("msg","Hello SpringMVCAnnotation");
        
        return "hello";  //会被视图解析器处理
    }
    
    @RequestMapping("/h2")//ip:port/hello/h2
    public String hello2(Model model){
        //封装数据
        model.addAttribute("msg","Hello2 SpringMVCAnnotation");
        
        return "hello";  //会被视图解析器处理
    }
}
```

6. 创建视图层 hello.jsp

   ```jsp
   <%@ page contentType="text/html;charset=UTF-8" language="java" %>
   <html>
   <head>
       <title>Title</title>
   </head>
   <body>
   ${msg}
   </body>
   </html>
   ```



RestFul风格携带参数

```java
@PathVariable 注解拿参数
```

```java
//原来的： http://locahost:8080/sum/?a=1&b=2
//RestFul: http://locahost:8080/sum/a/b

@RequestMapping("/sum/{a}/{b}")
public String sum(@PathVariable int a,@PathVariable int b, Model model){
    //封装数据
    int sum = a+b;
    model.addAttribute("msg","结果为： "+sum);

    return "hello";  //会被视图解析器处理
}
```

指明请求方式为GET

```java
@RequestMapping(value = "/sum/{a}/{b}",method = RequestMethod.GET )
```

或者使用衍生注解

```java
@GetMapping("/sum/{a}/{b}")
```

同样的还有其他的请求方式



HttpServletRequest，和  HttpServletResponse 参数

```java
sanimport org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class ModelTest {

    @RequestMapping("/t1")
    public String test(HttpServletRequest req, HttpServletResponse response){

        HttpSession session = req.getSession();
        System.out.println(session.getId());// 6794605198F0DAA0C6B1C2DC61C44EFD

        return "hello";
    }
}
```

# 三 不使用视图解析器（**非正常人的方式**）

在 springmvc-servlet.xml 中将视图解析器注释掉，就是仅仅只配置了扫描包

```java
package com.shishi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ModelTest {

    @RequestMapping("/t1")
    public String test(Model model){

        model.addAttribute("msg","没有视图解析器");

        return "/WEB-INF/jsp/hello.jsp";
    }
}
```

```java
//转发  加上 forward 前缀
return "forward:/WEB-INF/jsp/hello.jsp";
```

```java
//重定向  加上 redirect 前缀
return "redirect:index.jsp";//index.jsp在WEB-INFO文件下啊
```

**注意在有视图解析器情况下，转发直接return ”hello“，重定向 也是在 return  ”redirect: index.jsp“**(可以理解为重定向不走视图解析器)

# 四 接受请求参数以及数据回显

例子

这里使用了lombok包

pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.16.10</version>
    </dependency>
</dependencies>
```

定义user类

```java
package com.shishi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private int age;

}
```

controller类

```java
@Controller
@RequestMapping("/user")
public class UserController {

    //localhost:8080/user/t1?name=xxx
    @GetMapping("/t1")
    public String test1(String name, Model model){
        //接受前端参数
        System.out.println("接受到前端数据为："+name);

        //将返回的结果传递给前端
        model.addAttribute("msg",name);

        //跳转视图
        return "hello";
    }
}
```

这里参数名和方法里的名字一样，如果不一样则收不到。

但是我们可以加入参数注解 **@RequestParam("username")** 表明前端应该使用 **username**作为参数名

```java
public String test1(@RequestParam("username") String name, Model model){
```

如果是一个对象，不建议连续写多个参数，而是直接传这个对象，注意参数名必须和类里的属性名一致

```java
//前端接受的是一个对象：  id， name ， age
@GetMapping("/t2")//http://localhost:8080/user/t2?id=1&name=zx&age=12
public String test2(User user){
    System.out.println(user);//User(id=1, name=zx, age=12)
    return "hello";
}
```

**小结：**

1. **接受前端用户传递的参数，判断参数的名字，如果名字在方法参数里，可以直接使用**
2. **前端传递一个User对象，匹配User对象中的字段名：如果一致则ok，否则匹配不到（该属性会为null，其他匹配一致的不会收影响）**

## 解决中文乱码问题

前端提交的表单如果有中文，则接受到的可能会变成乱码,主要是 post方式接受到的会变乱码

SpringMVC给我们提供了一个过滤器，可以在**web.xml**中配置（修改该文件需要重启服务器）

**以下配置可以直接写死在里面**

```xml
<!--  配置SpringMVC的乱码过滤  -->
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

**注意 使用  /*  来匹配到 jsp文件，否则这个过滤没有经过**

​	

# 五 JSON相关

## 1. Jackson 

 目前比较好的json解析工具

导入包依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.3</version>
</dependency>
```

配置DispacthServelet和过滤器（web.xml）和SpringMVC配置（自定义）查看  **二 使用注解开发SpringMVC**

controller，这里使用 @ResponseBody向前端页面直接返回一个 字符串，中文会有乱码，不用管，就是一个小测试，测试返回字符串而不走试图解析器而已

```java
package com.shishi.controller;

import com.shishi.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @RequestMapping("j1")
    @ResponseBody  //配置了时候，它就不会走视图解析器，也就是return不会去找页面了，会直接返回一个 字符串
    public String json1(){

        //创建一个对象
        User user = new User(7,"皇上",3);

       return user.toString();//前端接受到 User(id=7, name=??, age=3)

    }
}
```

二 使用**jackson**，这里不做其他处理还是会中文乱码

```java
@RequestMapping("j2")
@ResponseBody  //配置了时候，它就不会走视图解析器，也就是return不会去找页面了，会直接返回一个 字符串
public String json2() throws JsonProcessingException {

    //Jackson， ObjectMapper
    ObjectMapper mapper = new ObjectMapper();

    //创建一个对象
    User user = new User(7,"皇上",3);

    //使用该方法将对象变为字符串
    String str = mapper.writeValueAsString(user);//该方法会 抛出异常，注意写throws

    return str;//前端接受到 {"id":7,"name":"??","age":3} 注意和第一种的区别

}
```

乱码解决

	1. 在注解里设置，这种方法显得比较麻烦

```java
@RequestMapping(value = "j2",produces = "application/json;charset=utf-8")
```

2. 在Springmvc中统一配置，加在<mvc:annotation-driven>标签里，之前只是写了闭合，现在加了内容

```xml
<!--  JSON乱码问题配置 只要用来 Jackson就配置以下配置 -->
<mvc:annotation-driven>
    <mvc:message-converters register-defaults="true">
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <constructor-arg value="UTF-8"/>
        </bean>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
            <property name="objectMapper">
                <bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
                    <property name="failOnEmptyBeans" value="false"/>
                </bean>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

**注意：也可以在类上标注 @RestController 这样类下的所有的方法都不会走视图解析器，而是返回字符串了**

## 2. FastJson

FastJson.jar 是阿里开发的一款专门用于Java开发的包，

* 可以方便的实现**json对象**和**JavaBean对象**的转换
* 可以方便的实现**JavaBean对象**和**json字符串**的转换
* 可以方便的实现**json对象**和**json字符串**的转换

1. 导入依赖

   ```xml
   <dependency>
       <groupId>com.alibaba</groupId>
       <artifactId>fastjson</artifactId>
       <version>1.2.60</version>
   </dependency>
   ```

2. 使用

   fastjson 三个主要的类：

   * JSONObject 代表 json对象
   * JSONArray 代表 json对象数组
   * JSON代表 JSONObject 和JSONArray 的装换

   ​	

   ```java
   @RequestMapping("j3")
   public String test3(){
   
       List<User> userList = new ArrayList<>();
   
       User user1 = new User(1,"shishi1",25);
       User user2 = new User(2,"shishi2",25);
       User user3 = new User(3,"shishi3",25);
       User user4 = new User(4,"shishi4",25);
   
       userList.add(user1);
       userList.add(user2);
       userList.add(user3);
       userList.add(user4);
   
       String s = JSON.toJSONString(userList);
   
       return s;//前端接受到 [{"age":25,"id":1,"name":"shishi1"},{"age":25,"id":2,"name":"shishi2"},{"age":25,"id":3,"name":"shishi3"},{"age":25,"id":4,"name":"shishi4"}]
   }
   ```

这个包里提供了很多方法，可以点进去看，甚至包括了时间格式的转换



# 六 SpringMVC拦截器

**拦截器**是**AOP思想**的具体应用

* 拦截器是SpringMVC框架自己的，只有在使用了SpringMVC框架的工程才能使用
* 拦截器只会拦截访问的控制方法，如果访问的是jsp/html/css/image/js是不会拦截的

## 1. 自定义拦截器

想要自定义拦截器，必须实现 **HanderInterceptor** 接口 

​	HandlerInterceptor 接口点进去可以看到里面的方法

​	方法不是必须实现的，可以自己去选择实现

新建Springmvc的工程，添加web支持，配置好web.xml和springmvc.xml 文件后

编写一个拦截器

```java
ackage com.shishi.config;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
    
    //这个方法return true 表示执行下一个，就是放行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("-------处理前------");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("-------处理后------");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("-------清理------");
    }
}
```

**注意：after那个方法不是处理后，post才是**

2. 把这个拦截器配置进去

```xml
<!--    拦截器配置-->
<mvc:interceptors>
    <mvc:interceptor>
        <!--      /**包括这个请求下的所有请求      -->
        <mvc:mapping path="/**"/>
        <bean class="com.shishi.config.MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

编写controller测试

```java
package com.shishi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("t1")
    public String test1(){
        System.out.println("test1执行了");
        return "hello";
    }
}
```

输出

```shell
-------处理前------
test1执行了
-------处理后------
-------清理------
```

**一般就写第一个方法，用来拦截等等，另外两个可以用来加日志等功能**

# 七  文件上传和下载

文件上传是项目开发中最常见的功能之一 ,springMVC 可以很好的支持文件上传，但是SpringMVC上下文中默认没有装配MultipartResolver，因此默认情况下其不能处理文件上传工作。如果想使用Spring的文件上传功能，则需要在上下文中配置MultipartResolver。

前端表单要求：为了能上传文件，必须将表单的method设置为POST，并将enctype设置为multipart/form-data。只有在这样的情况下，浏览器才会把用户选择的文件以二进制数据发送给服务器；

**对表单中的 enctype 属性做个详细的说明：**

- application/x-www=form-urlencoded：默认方式，只处理表单域中的 value 属性值，采用这种编码方式的表单会将表单域中的值处理成 URL 编码方式。
- multipart/form-data：这种编码方式会以二进制流的方式来处理表单数据，这种编码方式会把文件域指定文件的内容也封装到请求参数中，不会对字符编码。
- text/plain：除了把空格转换为 "+" 号外，其他字符都不做编码处理，这种方式适用直接通过表单发送邮件。

```html
<form action="" enctype="multipart/form-data" method="post">
   <input type="file" name="file"/>
   <input type="submit">
</form>
```

一旦设置了enctype为multipart/form-data，浏览器即会采用二进制流的方式来处理表单数据，而对于文件上传的处理则涉及在服务器端解析原始的HTTP响应。在2003年，Apache Software Foundation发布了开源的Commons FileUpload组件，其很快成为Servlet/JSP程序员上传文件的最佳选择。

- Servlet3.0规范已经提供方法来处理文件上传，但这种上传需要在Servlet中完成。
- 而Spring MVC则提供了更简单的封装。
- Spring MVC为文件上传提供了直接的支持，这种支持是用即插即用的MultipartResolver实现的。
- Spring MVC使用Apache Commons FileUpload技术实现了一个MultipartResolver实现类：
- CommonsMultipartResolver。因此，SpringMVC的文件上传还需要依赖Apache Commons FileUpload的组件。

## 文件上传

1、导入文件上传的jar包，commons-fileupload ， Maven会自动帮我们导入他的依赖包 commons-io包；

```xml
<!--文件上传-->
<dependency>
   <groupId>commons-fileupload</groupId>
   <artifactId>commons-fileupload</artifactId>
   <version>1.3.3</version>
</dependency>
<!--servlet-api导入高版本的-->
<dependency>
   <groupId>javax.servlet</groupId>
   <artifactId>javax.servlet-api</artifactId>
   <version>4.0.1</version>
</dependency>
```

2、配置bean：multipartResolver

【**注意！！！这个bena的id必须为：multipartResolver ， 否则上传文件会报400的错误！在这里栽过坑,教训！**】

```xml
<!--文件上传配置-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
   <!-- 请求的编码格式，必须和jSP的pageEncoding属性一致，以便正确读取表单的内容，默认为ISO-8859-1 -->
   <property name="defaultEncoding" value="utf-8"/>
   <!-- 上传文件大小上限，单位为字节（10485760=10M） -->
   <property name="maxUploadSize" value="10485760"/>
   <property name="maxInMemorySize" value="40960"/>
</bean>
```

CommonsMultipartFile 的 常用方法：

- **String getOriginalFilename()：获取上传文件的原名**
- **InputStream getInputStream()：获取文件流**
- **void transferTo(File dest)：将上传文件保存到一个目录文件中**

 我们去实际测试一下

3、编写前端页面

```jsp
<form action="/upload" enctype="multipart/form-data" method="post">
 <input type="file" name="file"/>
 <input type="submit" value="upload">
</form>
```

4、**Controller**

```java
package com.kuang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@Controller
public class FileController {
   //@RequestParam("file") 将name=file控件得到的文件封装成CommonsMultipartFile 对象
   //批量上传CommonsMultipartFile则为数组即可
   @RequestMapping("/upload")
   public String fileUpload(@RequestParam("file") CommonsMultipartFile file ,HttpServletRequest request) throws IOException {

       //获取文件名 : file.getOriginalFilename();
       String uploadFileName = file.getOriginalFilename();

       //如果文件名为空，直接回到首页！
       if ("".equals(uploadFileName)){
           return "redirect:/index.jsp";
      }
       System.out.println("上传文件名 : "+uploadFileName);

       //上传路径保存设置
       String path = request.getServletContext().getRealPath("/upload");
       //如果路径不存在，创建一个
       File realPath = new File(path);
       if (!realPath.exists()){
           realPath.mkdir();
      }
       System.out.println("上传文件保存地址："+realPath);

       InputStream is = file.getInputStream(); //文件输入流
       OutputStream os = new FileOutputStream(new File(realPath,uploadFileName));//文件输出流

       //读取写出
       int len=0;
       byte[] buffer = new byte[1024];
       while ((len=is.read(buffer))!=-1){
           os.write(buffer,0,len);
           os.flush();
      }
       os.close();
       is.close();
       return "redirect:/index.jsp";
  }
}
```

5、测试上传文件，OK！

**采用file.Transto 来保存上传的文件**

1、编写Controller

```java
/*
* 采用file.Transto 来保存上传的文件
*/
@RequestMapping("/upload2")
public String  fileUpload2(@RequestParam("file") CommonsMultipartFile file,HttpServletRequest request) throws IOException {

   //上传路径保存设置
   String path = request.getServletContext().getRealPath("/upload");
   File realPath = new File(path);
   if (!realPath.exists()){
       realPath.mkdir();
  }
   //上传文件地址
   System.out.println("上传文件保存地址："+realPath);

   //通过CommonsMultipartFile的方法直接写文件（注意这个时候）
   file.transferTo(new File(realPath +"/"+ file.getOriginalFilename()));

   return "redirect:/index.jsp";
}
```

2、前端表单提交地址修改

3、访问提交测试，OK！

## 文件下载

**文件下载步骤：**

1、设置 response 响应头

2、读取文件 -- InputStream

3、写出文件 -- OutputStream

4、执行操作

5、关闭流 （先开后关）

**代码实现：**

```java
@RequestMapping(value="/download")
public String downloads(HttpServletResponse response ,HttpServletRequest request)throws Exception{
   //要下载的图片地址
   String  path = request.getServletContext().getRealPath("/upload");
   String  fileName = "基础语法.jpg";

   //1、设置response 响应头
   response.reset(); //设置页面不缓存,清空buffer
   response.setCharacterEncoding("UTF-8"); //字符编码
   response.setContentType("multipart/form-data"); //二进制传输数据
   //设置响应头
   response.setHeader("Content-Disposition",
           "attachment;fileName="+URLEncoder.encode(fileName, "UTF-8"));

   File file = new File(path,fileName);
   //2、 读取文件--输入流
   InputStream input=new FileInputStream(file);
   //3、 写出文件--输出流
   OutputStream out = response.getOutputStream();

   byte[] buff =new byte[1024];
   int index=0;
   //4、执行 写出操作
   while((index= input.read(buff))!= -1){
       out.write(buff, 0, index);
       out.flush();
  }
   out.close();
   input.close();
   return null;
}
```

前端

```jsp
<a href="/download">点击下载</a>
```

测试，文件下载OK

