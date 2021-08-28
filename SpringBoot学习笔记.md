# SpringBoot学习笔记

**java8 及以上**

**maven3.3以上**

## 一 HelloWorld

以下步骤为官方文档

1. 创建maven项目，编辑pom

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
   
       <groupId>com.shishi</groupId>
       <artifactId>SpringBoot-study</artifactId>
       <version>1.0-SNAPSHOT</version>
   
       <properties>
           <maven.compiler.source>8</maven.compiler.source>
           <maven.compiler.target>8</maven.compiler.target>
       </properties>
   
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>2.5.0</version>
       </parent>
   
   </project>
   ```

2. 添加web场景启动器，（就不用像spring项目那样去需要我们自己配置和添加一大堆东西了）

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
   </dependencies>
   ```

3. 编写代码

   * 编写主程序类

   ```java
   package com.shishi.boot;
   
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   
   /**
    * 主程序类
    * @SpringBootApplication 指定他是一个SpringBoot类
    */
   @SpringBootApplication
   public class MainApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(MainApplication.class,args);
       }
   }
   ```

   * 编写controller类

   ```java
   package com.shishi.boot.controller;
   
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   public class HelloController {
   
       @RequestMapping("/hello")
       public String handle01(){
           return "Hello,SpringBoot2";
       }
   }
   ```

   

**完全没有写任何配置和配置tomcat，直接运行主程序类就创建了一个web服务程序**

因为springboot有默认的配置，如果我们要改配置的话，在resource文件夹下创建application.properties文件写配置就行了

所有的配置都可以写里面

例如:	将默认端口（8080）改为 8000

```properties
server.port=8000
```

配置项说明查看官方文档：**Application Properties** 说明，里面有各个方面的平台



打包jar包(一般称为 “fat jar”。包含整个运行环境，所以能直接运行)运行（简化了之前的部署）

1. 加入插件

   ```xml
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
           </plugin>
       </plugins>
   </build>
   ```

2. 点开maven 运行 clean和package 应用

3. 打包完成后在Target目录下生成 对应的jar包

4. cmd 运行  

   ```shell
   java -jar jar文件
   ```

5. 网页访问成功

这个框架真的太简单容易使用了！！！



## 二 SpringBoot特点

### 2.1 依赖管理

* 父项目做依赖管理

  ```xml
  <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.5.0</version>
  </parent>
  ```

  * 他的父项目的父项目几乎声明了所有开发常用jar包的依赖

  * 所以我们添加依赖时候不用加入版本号了

* 开发导入starter场景启动器

  * 会经常见到 `spring-boot-starter-*`，*代表某种场景

  * 只要引入`starter`, 这个场景的所有常规需要的依赖我们都自动引入

  * Spring Boot所有支持的场景：https://docs.spring.io/spring-boot/docs/2.5.0/reference/html/using.html#using.build-systems.starters

  * 见到的 `*-spring-boot-starter`: 第三方为我们提供的简化的场景启动器

  * 所有场景启动器最底层的依赖

    ```xml
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
      <version>2.5.0</version>
      <scope>compile</scope>
    </dependency>
    ```

  * **idea**中可以右键Diagrams选择依赖树分析查看依赖树

* 无需关注版本号，自动版本仲裁

  * 以后引入依赖默认都可以不写
  * 引入非版本仲裁的jar，要写版本号

* 可以修改版本号

  * 在当前项目编写如下，这里用更改mysql版本为例子

  * ```xml
    <properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
    ```

### 2.2 自动配置

（这些在加入starter启动器后，就加入了，不用我们引入，这里只是做了分析，这些都可以在依赖文件中找到）

* 自动配好Tomcat

  * 引入Tomcat
  * 配置Tomcat

* 自动配好SpringMVC

  * 引入SpringMVC全套组件
  * 自动配置号SpringMVC常用组件（功能）

* 自动配好Web常见功能，如：字符编码问题

  * SpringBoot帮我们配置号了所有web开发的常见场景

* 默认的包结构

  * 主程序**所在的包**及**其下边的所有子包**都会被默认扫描进来。

  * 无需要以前的包扫描配置

  * 想要改变扫描路径，更改主程序注解**@SpringBootApplication(scanBasePackages = "com.shishi")**

    * 或者： @ComponentScan()指定扫描路径，当然这里这个注解在@SpringBootApplication中写过了，所以这里不能是直接简单加在上面来使用，如下

      ```java
      @SpringBootApplication
      等同于（将这一行换成下面这三行来写）
      @SpringBootConfiguration
      @EnableAutoConfiguration
      @ComponentScan  // 在这里修改就行了
      ```

* 各种配置拥有默认值

  * 记得去application.properties文件里去修改默认值
  * 默认配置最终都是映射到某一个类上的
  * 配置文件的值最终会绑定到某个类上，这个类会在容器中创建对象

* 按需加载所有配置项

  * 非常多的starter
  * 引入了哪些场景，这个场景的自动配置才会开启
  * SpringBoot的所有自动配置功能都在`spring-boot-autoconfigure`包里面

* ...



## 三 容器功能

### 3.1 组件增加

1. **@Configuration**
   * 基本使用
   * Full模式与Lite模式
     * 示例
     * 最佳实战
       * 配置类组件之间无依赖关系用Lite模式加速容器启动过程，减少判断
       * 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式
   
   实例:  这里省去User类和Pet类组件的创建
   
   ```java
   package com.shishi.boot.config;
   
   import com.shishi.boot.bean.Pet;
   import com.shishi.boot.bean.User;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   /**
    * 配置类里面使用@Bean标注在方法上给容器注册组件，默认也是单实例的
    * 配置类本身也是一个组件
    * proxyBeanMethods: 代理bean的方法（默认就是true）
    *          Full(proxyBeanMethods = true)
    *          Lite(proxyBeanMethods = false)
    *          组件依赖
    */
   @Configuration(proxyBeanMethods = true)  //告诉 SpringBoot 这是一个配置类  == 配置文件
   public class MyConfig {
   
       /**
        * 外部无论对配置类中的这个方法调用多少次，获取到的都是之前注册容器中的单实例对象
        * @return
        */
       @Bean //给容器中添加组件，以方法名作为组件的id，返回类型是组件类型。返回值就是组件在容器中的实例
       public User user01(){
           User shishi = new User("shishi", 23);
           //User组件依赖了Pet组件
           shishi.setPet(cat());
           return shishi;
       }
   
       @Bean("Tom") //或者我们可以直接指定组件名字
       public Pet cat(){
           return new Pet("Tom");
       }
   }
   *************************************************************************************************
   ackage com.shishi.boot;
   
   import com.shishi.boot.bean.Pet;
   import com.shishi.boot.bean.User;
   import com.shishi.boot.config.MyConfig;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.context.ConfigurableApplicationContext;
   
   /**
    * 主程序类
    * @SpringBootApplication 指定他是一个SpringBoot类
    */
   @SpringBootApplication
   public class MainApplication {
   
       public static void main(String[] args) {
   
           //1. 返回我们的IOC容器
           ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
   
           //2. 查看容器里的组件
   //        String[] names = run.getBeanDefinitionNames();
   //        for (String name : names) {
   //            System.out.println(name);
   //        }
   
           //3.从容器中获取组件
   //        Pet tom01 = run.getBean("Tom", Pet.class);
   //        Pet tom02 = run.getBean("Tom", Pet.class);
   //        Pet tom03 = run.getBean("Tom", Pet.class);
   //        System.out.println(tom01 == tom02);//true
   
           //4.也可以获取到配置类这个组件
           MyConfig bean = run.getBean(MyConfig.class);
           System.out.println(bean);
   
           //如果@Configuration(proxyBeanMethods = true)代理对象调用方法，SpringBoot总会检查这个组件是否在容器中有
           //保持组件单实例
           User user = bean.user01();
           User user1 = bean.user01();
           System.out.println(user == user1);
   
           User shishi = run.getBean("user01",User.class);
           Pet tom = run.getBean("Tom", Pet.class);
           //如果@Configuration(proxyBeanMethods = true)，返回true
           //如果@Configuration(proxyBeanMethods = false)，返回false
           System.out.println("用户的宠物是不是组件注册的宠物:"+(shishi.getPet() == tom));
   
       }
   }
   ```
   
   
   
2. **@Bean、@Component、@Controller、@Service、@Repository**

   * 这些注解只要篇写在包扫描的范围内，都可以用

3. **@ComponentScan、@Import**

   * ```java
     @Import({User.class,其他类型组件.class}) 可以写在任何组件类的上面，包括配置类组件
        表示给容器中自动创建出这两个类型的组件、默认组件的名字就是给类的全类名
     ```

4. **@Conditional**

   * 条件装配，满足Condition指定的条件，则进行组件注入
   * 有很多衍生注解

   例子：

   @ConditionalOnBean 表示有某个类才生效

   ```Java
   @ConditionalOnBean(name="Tom")
   ```

### 3.2原生配置文件引入

1. **@ImportResource**

   用来引入其他的以前的Spring配置文件

   ```java
   @ImportResource("classpath:beans.xml")
   ```



### 3.3 配置绑定

如何使用Java读取到properties文件中的内容，并且把他封装到javaBean中，以供随时使用；

```java
public class getProperties{
    public static void main(){
        Properties pps = new Properties();
        pps.load(new FileInputStream("a.properties"));
        Enumeration enum1 = pps.propertiesNames();
        while(enum1.hasMoreElements()){
            String strKey = (String)enum1.nextElement();
            String strValue = pps.getProperty(strKey);
            //封装到JavaBean
            ...
        }
    }
}
```

原来的这种方法非常麻烦



1. @ConfigurationProperties
2. @EnableConfigurationProperties + @ConfigurationProperties
3. @Component + @ConfigurationProperties

实例：

新建Car类

```java
public class Car {

    private String brand;
    private Integer price;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
}
```

配置文件里写入汽车的配置

```properties
server.port=8000

mycar.brand=BYD
mycar.price=10000
```

在要读取配置的类上加上注解，注意该类一定要写getset方法

这是第一种方式，@EnableConfigurationProperties + @ConfigurationProperties

在要读取配置的类上加上注解@ConfigurationProperties和@Component

```java
/**
 * 只有在容器照中的组件才拥有SpringBoot提供的功能
 */
@Component
@ConfigurationProperties(prefix = "mycar")//前缀为 mycar的配置，注意属性名要一样（brand price）
public class Car {

    private String brand;
    private Integer price;
```

编写Controller测试

```java
@RestController
public class HelloController {

    @Autowired
    Car car;

    @RequestMapping("/car")
    public Car car(){
        return car;
    }

    @RequestMapping("/hello")
    public String handle01(){
        return "Hello,SpringBoot2";
    }
}
```

运行程序，网页访问输出

```html
{"brand":"BYD","price":10000}
```

第二种方式 @Component + @ConfigurationProperties

在配置类上加上注解和类上加上@ConfigurationProperties(prefix = "mycar")

```java
@EnableConfigurationProperties(Car.class)
//开启car的属性配置功能
//把car组件自动注册到容器中，（就是car类不用加@Component注解了）
```



## 四 自动配置原理入门

### 引导加载自动配置

主程序类上的注解**@SpringBootApplication**

```java
@SpringBootApplication
等同于（将这一行换成下面这三行来写）
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan 
```

分析：

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {...}

========================================

```

1. **@SpringBootConfiguration** 

   源码点进去有 @Configuration，代表当前是一个配置类

2. **@ComponentScan**

   指定要扫描哪些包

3. **@EnableAutoConfiguration** 核心注解

   ```java
   @AutoConfigurationPackage
   @Import({AutoConfigurationImportSelector.class})
   public @interface EnableAutoConfiguration {
   ```

   1. **@AutoConfigurationPackage**

      * 自动配置包

      ```java
      @Import({Registrar.class})//给容器中导入一个组件
      public @interface AutoConfigurationPackage {}
      
      //利用Registrar给容器导入一系列组件
      //将指定的一个包下的所有组件导入进来（main所在的包下）
      ```

   2. **@Import({AutoConfigurationImportSelector.class})**

      ```java
      1利用 getAutoConfigurationEntry(annotationMetadata);给容器中批量导入一些组件
      2 上面这个方法里调用：  List<String> configurations = this.getCandidateConfigurations(annotationMetadata, 	attributes); configurations = this.removeDuplicates(configurations); 获取到所有需要导入到容器中的配置类
      3 利用工厂加载 Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) 加载得到所有的组件
      4 从 META-INF/spring.factories位置来加载一个文件
          默认扫描我们当前系统里面所有META-INF/spring.factories位置的文件
          
          这些文件（spring boot包里的META-INF/spring.factories位置的文件）写死了SpringBoot一启动就要给容器中加载的所有配置类
      ```

### 按需开启自动配置

虽然上面说到的所有自动配置启动的时候默认加载，但是最终会按需配置（得益于**@Conditional**条件装配）



以上只是简单了解源码流程，并没有深入和全面了解，建议自己看源码了解



总结：

* SpringBoot先加载所有的配置类 xxxAutoConfiguration

* 每个自动，配置类按照条件进行生效，默认都会绑定配置文件指定的值。xxxProperties里面拿，xxxProperties和配置文件进行了绑定

* 生效的配置类就会给容器中装配很多组件

* 只要容器中有这些组件，相当于这些功能就有了

* 定制化配置

  * 用户直接自己@Bean替换底层的组件
  * 用户去看这个组件是获取的配置文件什么值就去修改

  **xxAutoConfiguration -> 组件 -> xxxProperties里面拿 ----> application.properties**





## 五 开发常用的

### 1 Lombok

简化JavaBean开发，不用再去写构造函数和getset方法

引入依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

一般idea还需要下载Lombok插件，但是新版idea默认集成了

使用 在类上 

```java
@data 生成getset方法 包含了toString
@ToString 生成toString方法
@AllArgsConstructor 所有参数构造器
@NoArgsConstructor 无参构造器
```

其中lombok有一个注解@Slf4j，注入了日志记录方法，只用log.info("msg")就能记录日志



### 2 Spring Initailizr（项目初始化向导）

idea直接新建Spring Initailizr项目就不用各种配置，在创建项目时候选择需要的场景就行了

## 六 配置文件

### 1.文件类型

#### 1.1 properties

#### 1.2 yaml

##### 简介

YAML是 “YAML Ain't Markup Language" (YAML 不是一种标记语言)的递归缩写。在开发中的这种语言时，YAML 的意思是 ：”Yet Another Markup Language“（仍是一种标记语言）

非常适合用来做以数据为中心的配置文件

##### **基本语法**

* key、value : kv之间有**空格**
* 大小写敏感
* 使用缩进表示层级关系
* 缩进不允许使用tap，只允许空格
* 缩进的空格数不重要，只要相同层级的元素左对齐就行
* ‘#’ 表示注释
* **”** 与 **""**   表示字符串内容会被**转义**/**不转义**

##### 数据类型

* 字面量： 单个的，不可再分的值。date、boolean、string、number、null

```yaml
k: v
```

* 对象：键值对的集合。map、hash、set、object

```yaml
行内写法：k: (k1: v1, k2: v2)
#或
k:
	k1: v1
	k2: v2
```

* 数组：一组按次序排列的值。array、list、queue

```yaml
行内写法：k: (v1, v2, v3)
#或
k:
	- v1
	- v2
	- v3
```

示例

```java
@ConfigurationProperties(prefix = "person")
@Component
@Data
public class Person {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet Pet;
    private String[] interests;
    private List<String> animal;
    private Map<String,Object> score;
    private Set<Double> salarys;
    private Map<String,List<Pet>> allPets;
}

@Data
public class Pet {
    private String name;
    private Double weight;
}

```

新建application.yaml  (后缀为 yml 也可以)

```yaml
person:
  userName: shishi
  boss: true
  birth: 1999/1/1
  age: 22
#  interests: [篮球,足球]
  interests:
    - 篮球
    - 足球
  animal: [cat,dog]
#  score:
#    English: 90
#    Math: 93
  score: {English: 90,Math: 94}
  salaries:
    - 9999.98
    - 9999.99
  pet:
    name: 阿旺
    weight: 10.99
  allPets:
    sick:
      - {name: 阿狗,weight: 10.99}
      - name: aa
        weight: 18.88
    health: [{name: 阿狗,weight: 10.99},{name: 阿阿莫,weight: 15.99},{name: 阿啊狗,weight: 30.99}]
```

新建controller测试返回的是什么

**注意点： kv之间的空格一定要加，idea会提示 k会变色才对**

```java
@RestController
public class HelloController {

    @Autowired
    Person person;

    @GetMapping("/person")
    public Person person(){
        return person;
    }
}
```

前端获取到：

```json
{"userName":"shishi","boss":true,"birth":"1998-12-31T16:00:00.000+00:00","age":22,"interests":["篮球","足球"],"animal":["cat","dog"],"score":{"English":90,"Math":94},"salaries":[9999.98,9999.99],"allPets":{"sick":[{"name":"阿狗","weight":10.99},{"name":"aa","weight":18.88}],"health":[{"name":"阿狗","weight":10.99},{"name":"阿阿莫","weight":15.99},{"name":"阿啊狗","weight":30.99}]},"pet":{"name":"阿旺","weight":10.99}}
```

如果同时配置了properties和yaml，yaml里相同的配置会被properties覆盖

##### 自定义绑定的配置提示

加入如下依赖，idea就会在你配置自定义配置文件时候弹出提示了

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

这是为了方便开发使用，所以建议在打包时候不应该把他打包进去

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                //这个位置加入这两行
                <excludes>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-configuration-processor</artifactId>
                </excludes>
                //注释里的两行就是这个工具
            </configuration>
        </plugin>
    </plugins>
</build>
```





## 七 Web开发

### 简单功能分析

##### 1 静态资源访问

**静态资源目录**

类路径下 `/static`(或者 `/piublic`、`/resource`、`/META-INF/resource`)

网页地址栏直接输入资源的文件名就能访问，不用加之前的路径（文件要放在上面这几个特定目录中）

因为SpringBoot默认配置的SpringMVC映射的时 `/***`（根目录下的所有文件夹的所有文件）

* **我们也可以更改这个默认配置**（就是更改这个默认资源访问前缀）

或者说 访问： 当前项目路径/ + 静态资源名

原理：静态映射/**。

* 请求进来，先去找Controller看能不能处理，不能处理的所有请求又交给静态资源处理器
* 静态资源去处理，不能找到则 404

**静态资源访问前缀**

* 默认无前缀

* 要更改则在配置文件中编写 （注意这**只是加了访问前缀**，并没有更改默认访问的文件夹）

  * yml配置文件

  ```yaml
  spring:
    mvc:
      static-path-pattern: /res/**
  # 只是加了访问前缀，并没有这个res文件夹，文件在默认的访问路径里
  ```

**如果我们要指定只能访问的文件夹，可以这样**

```yaml
spring:
  mvc:
    static-path-pattern: /res/**

  web:
    resources:
      static-locations: classpath:/static/
      # 现在只能访问static文件夹里的文件了，注意classpath:没有空格
```

##### Favicon 设置

只需将图标放到静态资源路径下就行了，但是名字必须是 favicon.con

**但是在SpringBoot2版本中，如果设置静态资源访问前缀，这个图标加载不出来，实测！！，等待解决**



## 八 拦截器

重温SpringMVC的拦截器

示例：

1. 编写拦截器类，必须实现**HandlerInterceptor**拦截器接口

```java

/**
 * 做登陆检查
 * 1. 配置好拦截器要拦截哪些请求
 * 2. 把这些配置放在容器中
 */
public class LoginInterceptor implements HandlerInterceptor {
    /**
     * 目标方法执行之前
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //登录检查逻辑
        HttpSession session = request.getSession();

        Object loginUser = session.getAttribute("loginUser");

        if(loginUser != null){
            //放行
            return true;
        }
        //拦截,这里最好让跳转到其他页面，比如登录页
        return false;
    }

    /**
     * 目标方法执行之后
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 页面渲染以后
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

2. 配置容器： 实现**WebMvcConfigurer**接口，并且实现**addInterceptors**方法添加刚刚编写的拦截器

```java
@Configuration
public class AdminWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**")//(/**)拦截所有请求,包括样式等的静态资源
                .excludePathPatterns("/","/login","/css/**","/js/**");//必须放行登录页和其他的静态资源
                //或者配置静态资源的访问前缀然后直接放行该前缀
    }
}
```

注意点：要指定拦截路径和放行路径，容易出错

## 九 文件上传

SpringMVC的东西，主要是记一下MultipartFile的使用和自动配置的默认修改

```java
@PostMapping("/upload")
public String upload(@RequestParam("email") String email,
                     @RequestParam("name") String name,
                     @RequestPart("img") MultipartFile img,
                     @RequestPart("imgs") MultipartFile[] imgs) throws IOException {
    
    if(!img.isEmpty()){
        //保存
        String filename = img.getOriginalFilename();//获取名字
        img.transferTo(new File("F:\\img\\"+filename));//保存到指定位置和使用指定文件名
    }
    
    if(imgs.length>0){
        for (MultipartFile file : imgs) {
            if(!file.isEmpty()){
                String originalFilename = file.getOriginalFilename();
                file.transferTo(new File("D:\\imgs\\"+originalFilename));
            }
        }
    }
    
    return "ok";
}
```

总之就是使用MultipartFile非常简单容易操作，里面给我们封装了很多的方法

**但是要注意，SpringBoot的自动配置有上传文件的大小限制**（默认1MB）

需要我们修改需求：

```yaml
spring:
#  mvc:
#    static-path-pattern: /res/**

  web:
    resources:
      static-locations: classpath:/static/

  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 100MB
```

max-file-size：上传文件的最大大小

max-request-size：请求总共文件的大小

## 十异常处理

非常简单，总而言之就是SpringBoot给我们默认提供了error页面，我们也可以自定义页面，在指定路径创建error页面就行

官方文档描述https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications.spring-mvc.error-handling

自定义error页面需要注意文件路径

官方描述

If you want to display a custom HTML error page for a given status code, you can add a file to an `/error` directory. Error pages can either be static HTML (that is, added under any of the static resource directories) or be built by using templates. The name of the file should be the exact status code or a series mask.

For example, to map `404` to a static HTML file, your directory structure would be as follows:

```xml
src/
 +- main/
     +- java/
     |   + <source code>
     +- resources/
         +- public/
             +- error/
             |   +- 404.html
             +- <other public assets>
```

To map all `5xx` errors by using a FreeMarker template, your directory structure would be as follows:

```xml
src/
 +- main/
     +- java/
     |   + <source code>
     +- resources/
         +- templates/
             +- error/
             |   +- 5xx.ftlh
             +- <other templates>
```

## 十一 Web原生组件注入（Servlet、Filter、Listener）

### 1. 使用Servlet  API

#### Servlet  

* 在主程序类上加上注解，表示原生servlet组件都放在哪里

```java
@ServletComponentScan(basePackages = "com.shishi.boot")
```

* 编写servlet类并声明注解**@WebServlet**

```java
@WebServlet(urlPatterns = "/haha")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("haha6666");
    }
}
```

这个servlet原生组件不会经过SpringBoot的拦截器，就是  **八 拦截器**   里自定义的拦截器类不会生效

原理 ：

* DispatchServlet是SpringBoot自动配置的，默认映射路径为“/”
* 而我们自己写的servlet路径是 “/haha” 
* 所以根据精确路径规则servlet走了我们的自定义类，不会被拦截器拦截

#### Filter

**@WebFilter**

```java
@WebFilter(urlPatterns = {"/img/*","/static/*"})
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //Filter初始化完成
        System.out.println("Filter初始化完成");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //Filter工作
        System.out.println("Filter工作");
        filterChain.doFilter(servletRequest,servletResponse);//放行
    }

    @Override
    public void destroy() {
        //Filter销毁了
        System.out.println("Filter销毁了");
    }
}
```

#### Listener

**@WebListener**

```java
@WebListener
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("MyServletContextListener 监听到项目初始化完成");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("MyServletContextListener 监听到项目销毁");
    }
}
```

控制台输出

```shell
MyServletContextListener 监听到项目初始化完成
Filter初始化完成
```



### 2. 使用RegistrationBean

将刚刚那三个组件类上的web对应注解取消，然后编写一个web组件配置类

```java
@Configuration
public class MyRegistrationConfig {

    @Bean
    public ServletRegistrationBean myServlet(){
        MyServlet myServlet = new MyServlet();

        return new ServletRegistrationBean(myServlet,"/haha");
    }

    @Bean
    public FilterRegistrationBean myFilter(){
//        return new FilterRegistrationBean(new MyFilter(),myServlet());
        FilterRegistrationBean registrationBean = new FilterRegistrationBean(new MyFilter());
        registrationBean.setUrlPatterns(Arrays.asList("/img/*","/static/*"));
        return registrationBean;
    }

    @Bean
    public ServletListenerRegistrationBean myListener(){
        MyServletContextListener myServletContextListener = new MyServletContextListener();
                return new ServletListenerRegistrationBean(myServletContextListener);
    }
}
```

注意：

* 一定要放入到容器中**@Bean**

* **@Configuration**建议使用单例模式，就是默认的**@Configuration(proxyBeanMethods = false)**

