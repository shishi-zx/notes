# Spring5 学习笔记

1、Spring 概念

2、IOC容器

3、Aop

4、JdbcTemplate

5、事务管理

6、Spring5 新特性

## 一 Spring 框架概念

1. **Spring**是轻量级的开源** javaEE*8 框架
2. **Spring**可以解决企业应用开发的复杂性
3. **Spring**有两个核心部分： **IOC** 和 **Aop**
   * **IOC**：控制反转，把创建对象过程交给 **Spring** 进行管理
   * **Aop**：面向切面，不修改源代码进行功能增强
4. **Spring** 特点
   * 方便解耦，简化开发
   * **Aop** 编程支持
   * 方便程序的测试
   * 方便和其他框架整合
   * 方便进行事务操作
   * 降低 **Java EE** **API** 开发难度

## 二 IOC理论推导

1. UserDao 接口
2. UserDaoImpl 实现类
3. UserService 业务接口
4. UserServiceImpl 业务实现类

```xml
//maven 项目导入核心包
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.0.RELEASE</version>
    </dependency>
</dependencies>
```

在之前的业务中，用户的需求可能会影响原来的代码，我们需要根据用户的需求去修改源代码！修改量可能会很巨大



我们使用一个 Set 接口实现

```java
private UserDao userDao;

//利用set进行动态实现值的注入
public void setUserDao(UserDao userDao){
    this.userDao = userDao;
}
```

* 之前，程序是主动创建对象！控制权在程序员手上
* 使用`set`注入后，程序不再具有主动性，而是变成了被动的接收对象！

这种思想，从本质上解决了问题，我们程序员不用再去管理对象的创建了。系统的耦合度大大降低，可以更加专注的在业务的实现上！这是**IOC**的原型

## 三 HelloSpring

```java
package com.shishi.pojo;

public class Hello {

    private String str;

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    @Override
    public String toString() {
        return "Hello{" +
                "str='" + str + '\'' +
                '}';
    }
}
```

配置 xml 文件，在resource文件夹下创建 .xml文件 ，文件名随意

```java
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--使用spring来创建对象，在Spring中这些都称为Bean

        类型 变量名 = new 类型();
        Hello hello = new Hello();

        id = 变量名
        class = new 的对象;
        property 相当于给对象中的属性设置一个值！
    -->
    <bean id="hello" class="com.shishi.pojo.Hello">
        <property name="str" value="Spring shishi"/>
    </bean>

</beans>
```

```java
//架子
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```



测试

```java
import com.shishi.pojo.Hello;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MyTest {
    public static void main(String[] args) {
        //获取Spring的上下文对象
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        //我们的对象现在都在Spring中管理了，我们要使用，直接去里面取出来就可以了
        Hello hello = (Hello) context.getBean("hello");
        System.out.println(hello.toString());
    }
}
```

## 四 IOC 创建对象的方式

1. 使用无参构造函数创建对象，默认！

2. 假设我们要使用有参构造函数创建对象

   1. 下标赋值

      ```java
      <bean id="user" class="com.shishi.pojo.User">
           <!--第一种方式，下标赋值-->
           <constructor-arg index="0" value="shishi"/>
      </bean>
      ```

   2. 类型赋值，**不建议使用**

      ```
      <bean id="user" class="com.shishi.pojo.User">
          <!--第二种方式 类型赋值-->
          <constructor-arg type="java.lang.String" value="shi"/>
      </bean>
      ```

   3. 直接通过参数名来设置

      ```java
      <bean id="user" class="com.shishi.pojo.User">
          <!--第三种方式 -->
          <constructor-arg name="name" value="shi3" />
      </bean>
      ```

总结：在配置文件加载的时候，容器中管理的对象就已经初始化了！

```java
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
User user = (User)context.getBean("user");
User user2 = (User)context.getBean("user");
//对象就一份
System.out.println(user == user2);//true
```

## 五 Spring 配置

### 5.1 别名

```java
<bean id="user" class="com.shishi.pojo.User">
    <constructor-arg name="name" value="shi3" />
</bean>

<bean id="userT" class="com.shishi.pojo.UserT">

</bean>

<!--别名，如果添加了别名，也可以使用别名来获取到对象-->
<alias name="user" alias="shishiuser"/>
```

### 5.2 Bean的配置

```java
<!--
   id：bean 的唯一标识符，也就是对象名
   class：bean对象所对应的全限定名： 包名 + 类名
   name：也是别名,而且name更高级，可以同时取多个别名,可以用空格 逗号 分号来分隔
   -->
<bean id="userT" name="userT2 u0,u2;u3" class="com.shishi.pojo.UserT">
</bean>
```

### 5.3 import

这个import一般用于团队开发使用，可以将多个配置文件导入合并为一个，便于管理合作开发使用

将三个 beans.xml 合并为一个

```java
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <import resource="beans.xml" />
    <import resource="beans2.xml" />
    <import resource="beans3.xml" />

</beans>
```

## 六 依赖注入

### 6.1 构造器注入

在 四 中的方式

### 6.2 Set方式注入【重点】

* 依赖注入：Set 注入！
  * 依赖:  bean 对象的创建依赖与容器
  * 注入：bean 对象中的所有属性由容器来注入

【环境搭建】

1. 复杂类型

   ```java
   public class Address {
       private String address;
   
       public String getAddress() {
           return address;
       }
   
       public void setAddress(String address) {
           this.address = address;
       }
   }
   ```

   

2. 真实测试对象

   ```java
   public class Student {
   
       private String name;
       private Address address;
       private String[] books;
       private List<String> hobbies;
       private Map<String,String> card;
       private Set<String> games;
       private String wife;
       private Properties info;
       
       ...//get set
   }
   ```

3. beans.xml

   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">
   
       <bean id="student" class="com.shishi.pojo.Student">
           <!-- 普通值注入，value -->
           <property name="name" value="shishi"/>
       </bean>
   
   </beans>
   ```

4. 测试类

   ```java
   public class MyTest {
       public static void main(String[] args) {
           ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
           Student student = (Student) context.getBean("student");
           System.out.println(student.getAddress());
       }
   }
   ```

完善注入信息

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="address" class="com.shishi.pojo.Address">
        <property name="address" value="北京"/>
    </bean>

    <bean id="student" class="com.shishi.pojo.Student">
        <!-- 普通值注入，value -->
        <property name="name" value="shishi"/>
        <!--bean注入 ref-->
        <property name="address" ref="address"/>

        <!--数组-->
        <property name="books">
            <array>
                <value>西游记</value>
                <value>水浒传</value>
                <value>三国演义</value>
            </array>
        </property>

        <!--List-->
        <property name="hobbies">
            <list>
                <value>游戏</value>
                <value>看电影</value>
                <value>敲代码</value>
            </list>
        </property>

        <!--Map-->
        <property name="card">
            <map>
                <entry key="身份证" value="121356165161651"/>
                <entry key="银行卡" value="54654646464"/>
            </map>
        </property>

        <!--Set-->
        <property name="games">
            <set>
                <value>lol</value>
                <value>aaa</value>
                <value>ddd</value>
            </set>
        </property>

        <!--null-->
        <property name="wife">
            <null/>
        </property>

        <!--Properties-->
        <property name="info">
            <props>
                <prop key="学号">0001</prop>
                <prop key="性别">男</prop>
                <prop key="username">小明</prop>
                <prop key="password">123456</prop>
            </props>
        </property>

    </bean>
</beans>
```



### 6.3 拓展方式注入

我们可以使用 **p **命名空间和 **c **命名空间进行注入

**注意在配置头加入xml约束**

```xml
xmlns:p="http://www.springframework.org/schema/p"
xmlns:c="http://www.springframework.org/schema/c"
```

```java
package com.shishi.pojo;

public class User {
    private String name;
    private int age;

    public User() {
    }

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    //...set get
}

```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--p命名空间注入，可以直接注入属性值 property-->
    <bean id="user" class="com.shishi.pojo.User" p:name="shishihahahah" p:age="18"/>

    <!--c命名空间注入，通过构造器注入 construct-args-->
    <bean id="user2" class="com.shishi.pojo.User" c:name="15" c:age="shishi" />

</beans>
```

测试

```java
@Test
public void test2(){
    ApplicationContext context = new ClassPathXmlApplicationContext("userBeans.xml");
    User user = context.getBean("user2", User.class);
    System.out.println(user);
}
```



### 6.4 bean 的作用域

六种作用域： **singleton**、**prototype**、request、session、application、websocket

1. 单例模式：

   singleton : 单例，在xml中注入一次，无论外面拿多少次都是它一个。(默认就是) 也可以在后面加上该声明 scope="singleton

```xml
<bean id="user2" class="com.shishi.pojo.User" c:name="15" c:age="shishi" scope="singleton" />
```

```java
@Test
public void test2(){
    ApplicationContext context = new ClassPathXmlApplicationContext("userBeans.xml");
    User user = context.getBean("user2", User.class);
    User user2 = context.getBean("user2", User.class);
    System.out.println(user == user2);
}
结果为 true
```

2. 原型模式

   prototype：每一个都是各自的对象,每次取出来时候都是新建。 在后面加声明  scope="prototype

   ```xml
   <bean id="user2" class="com.shishi.pojo.User" c:name="15" c:age="shishi" scope="prototype" />
   ```

   ```java
   @Test
   public void test2(){
       ApplicationContext context = new ClassPathXmlApplicationContext("userBeans.xml");
       User user = context.getBean("user2", User.class);
       User user2 = context.getBean("user2", User.class);
       System.out.println(user == user2);
   }
   结果为 false
   ```

3. 其他四种**request、session、application、websocket**在 web 开发中使用

## 七 Bean 的自动装配

* 自动装配是 **Spring** 满足 **bean** 依赖一种方式
* **Spring** 会在上下文中自动寻找，并自动给**bean**装配属性！



在 Spring中有三种装配的方式

1. 在**xml**中显示的配置
2. 在**Java**中显示配置
3. 隐式的自动装配**bean**【重要】

### 7.1 测试

搭建环境： 一个人有两个宠物！

```java
package com.shishi.pojo;

public class Cat {
    public void shout(){
        System.out.println("喵");
    }
}
```

```java
package com.shishi.pojo;

public class Dog {
    public void shout(){
        System.out.println("汪");
    }
}
```

```java
package com.shishi.pojo;

public class Person {

    private Cat cat;
    private Dog dog;
    private String name;

    public Cat getCat() {
        return cat;
    }

    public void setCat(Cat cat) {
        this.cat = cat;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "cat=" + cat +
                ", dog=" + dog +
                ", name='" + name + '\'' +
                '}';
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="cat" class="com.shishi.pojo.Cat"/>
    <bean id="dog" class="com.shishi.pojo.Dog"/>

    <bean id="person" class="com.shishi.pojo.Person">
        <property name="cat" ref="cat"/>
        <property name="dog" ref="dog"/>
        <property name="name" value="shishi"/>
    </bean>

</beans>
```

test

```java
@Test
public void Test1(){
    ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");

    Person person = context.getBean("person", Person.class);
    person.getCat().shout();
    person.getDog().shout();
}
```

### 7.2 ByName自动装配

使用 autowire ，会自动在容器上下文查找，和自己对象set方法后面的值对应的 beanid ！（**所以注意命名的规范**）

```xml
<bean id="cat" class="com.shishi.pojo.Cat"/>
<bean id="dog" class="com.shishi.pojo.Dog"/>

<bean id="person" class="com.shishi.pojo.Person" autowire="byName">
    <property name="name" value="shishi"/>
</bean>
```

### 7.3 ByType

会自动在容器上下文查找，和对象属性类型相同的 bean 

`<bean id="person" class="com.shishi.pojo.Person" autowire="byType">`

**注意：**

* byName：需要保证所有bean的id唯一，并且这个bean需要和自动注入的属性的set方法一致！
* byType：需要保证所有bean的class唯一，并且这个bean需要和自动注入的属性的类型一致！



### 7.4 使用注解实现自动装配

 **jdk1.5支持的注解，Spring2.5就支持注解了**

要使用注解须知：

1. 导入约束：context约束

2. 配置注解的支持：<context:annotation-config/>

   ```xml
   //加入这四行，注意加入的位置
   xmlns:context="http://www.springframework.org/schema/context"
   http://www.springframework.org/schema/context
   https://www.springframework.org/schema/beans/spring-context.xsd
   <context:annotation-config/>
   ```

   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           https://www.springframework.org/schema/beans/spring-context.xsd">
       
       <context:annotation-config/>
   </beans>
   ```

   **@Autowired**

   直接在属性上使用即可！也可以在set方法上使用

   使用 Autowired 我们可以不用编写Set方法了，前提是这个自动装配的属性在 IOC （Spring）容器中存在，且符合名字byName

   **例子：**

   ```java
   public class Person {
   //我自己的要加（required = false）否则会报错加载不了xml
       @Autowired(required = false)//说明这个对象可以为null，否则不允许为空
       private Cat cat;
       @Autowired(required = false)
       private Dog dog;
       private String name;
   
       //看下面tip
       public Person(@Nullable String name) {
           this.name = name;
       }
   }
   ```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

    <bean id="cat" class="com.shishi.pojo.Cat"/>
    <bean id="dog" class="com.shishi.pojo.Dog"/>
    <bean id="person" class="com.shishi.pojo.Person"/>
</beans>
```

**tip：**

```java
@Nullable  字段标记了这个注解，说明这个字段可以为null
```

```java
@Qualifier(value="dog222")  指定找的具体的同一种类型下的不同对象
```

例如：

```xml
<bean id="dog" class="com.shishi.pojo.Dog"/>
<bean id="dog22" class="com.shishi.pojo.Dog"/>
```

```java
@Autowired(required = false)
@Qualifier(value = "dog22")
private Dog dog;
```

如果 **@AutAowired** 自动装配的环境比较复杂，自动装配无法通过一个注解 **@AutAowired **完成的时候，我们可以使用 **@Qualifier（value = ”xxx“）**去配合@AutAowired的使用，指定一个唯一的**bean**对象 注入

```java
@Resource 注解 会先查找id 如果没有则 查找type 否则报错
```

## 八 使用注解开发

- **在Spring4之后，要使用注解开发，必须要保证 aop 的包导入了**

- **使用注解需要导入context约束，增加注解的支持**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.shishi.pojo"/>
    <context:annotation-config/>

</beans>
```



1. bean

2. 属性如何注入

   ```java
   @Component//声明这个类被Spring管理
   public class User {
       
       //@Value("shishi") 或者放在这里也是一样的效果
       public String name ;
       
       @Value("shishi")
       public void setName(String name) {
           this.name = name;
       }
   }
   ```

3. 衍生的注解

   @Component有几个衍生注解，在web开发中，会按照mvc三层架构分层

   * dao【**@Repository**】
   * service【**@Service】**
   * controller**【@Controller】**

   这几个都相当于**@Conponent**，只是在不同的层级里用来区分标注而已

4. 自动装配

   看之前的七

5. 作用域

   **@Scope**

   ```java
   @Component
   @Scope("singleton")//单例模式
   public class User {
   
       public String name ;
   
       @Value("shishi")
       public void setName(String name) {
           this.name = name;
       }
   }
   ```

6. 小结

   xml 与 注解

   * xml 更加万能，适用于任何场合！维护简单方便
   * 注解 不是自己类使用不了，维护相对复杂！

   xml 与 注解 最佳实践：

   * xml 用来管理bean
   * 注解 只用来注入属性
   * **我们在使用的过程中，只需要注意一个问题：必须让注解生效，就需要开启注解的支持**

## 九 完全使用java的方式配置Spring

**完全不使用Spring的xml配置，全权交给 java 来做**

**JavaConfig** 是 **Spring** 的一个子项目，在**Spring4**之后，它成为了一个**核心**功能

实体类

```java
//这里的注解的意思，就是说明这个类被Spring管理了，注册到了容器中
@Component
public class User {
    private String name;

    public String getName() {
        return name;
    }

    @Value("shishi")//属性注入
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

配置文件

```java
//这个也会被Spring 容器托管，因为它本来就是一个@Conponent，
// @Configuration代表这是一个配置类，就和我们之前的beans.xml是一样的
@Configuration
@ComponentScan("com.shishi.pojo")
@Import(MyConfig2.class)//引入其他的配置类
public class MyConfig {

    //注册一个bean，就相当于之前的xml里配置的一个bean标签
    //这个方法的名字，就相当于bean标签中的id属性
    //这个方法的返回值，就相当于bean标签中的class属性
    @Bean
    public User getUser(){
        return new User();//返回要注入到bean的对象
    }
}
```

测试类

```java
public class MyTest {
    public static void main(String[] args) {
        //如果完全使用配置类的方式去做，就只能通过 AnnotationConfig 上下文来获取容器，通过配置类的class属性对象加载
        ApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);
        User user = (User)context.getBean("getUser");//取方法名
        System.out.println(user.getName());
    }
}
```

这种纯**java**的配置方式，在**SpringBoot**中随处可见！

## 十 代理模式

代理模式是**SpringAOP**的底层 【**SpringAOP 和 SpringMVC 非常重要**】

代理模式的分类：

* 静态代理
* 动态代理

### 10.1 静态代理

角色分析：

* 抽象角色：一般会使用接口或者抽象类来解决
* 真实角色：被代理的角色
* 代理角色：代理真实角色，代理真实角色后，我们一般会做一些附属操作
* 客户：访问代理角色的人



代码步骤：

1. 接口

   ```java
   //租房
   public interface Rent {
   
       public void rent();
   }
   ```

2. 真实角色

   ```java
   //房东
   public class Host implements Rent{
       @Override
       public void rent() {
           System.out.println("房东要出租房子");
       }
   }
   ```

3. 代理角色

   ```java
   public class Proxy implements Rent{
   
       private Host host;
   
       public Proxy() {
       }
   
       public Proxy(Host host) {
           this.host = host;
       }
   
       @Override
       public void rent() {
           seeHouse();
           host.rent();
           fee();
       }
   
       //看房
       public void seeHouse(){
           System.out.println("中介带你看房源");
       }
   
       //收中介费
       public void fee(){
           System.out.println("中介收费");
       }
   
   }
   ```

4. 客户端访问

   ```java
   //租房的人
   public class Client {
       public static void main(String[] args) {
           Host host = new Host();
           //代理
           Proxy proxy = new Proxy(host);
           proxy.rent();
   
       }
   }
   ```

代理模式的好处：

* 可以使真实角色的操作更加纯粹，不用关注一些额外具体的操作
* 具体操作交给代理角色
* 具体业务发生扩展时，方便集中管理

但是静态代理模式有缺点：

* 一个真实角色就会产生一个代理角色，代码量会随着真实角色的增多而变大



### 10.2 动态代理

* 动态代理和静态代理角色一样
* 动态代理的代理类是动态生成的，不是我们直接写好的
* 动态代理分为两大类： 基于**接口**的动态代理、基于**类**的动态代理
  * 基于接口 ---JDK 动态代理 
  * 基于类： cglib
  * Java字节码实现： javasist



需要了解两个类：**Proxy** （代理）、**InvocationHandler** （调用处理程序）



例子：

```java
package com.shishi.demo04;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

//会用这个类自动生成代理类
public class ProxyInvocationHandler implements InvocationHandler {

    //被代理的接口
    private Object target;

    public void setTarget(Object target) {
        this.target = target;
    }

    //生成得到代理对象
    public Object getProxy(){
        return Proxy.newProxyInstance(this.getClass().getClassLoader(), target.getClass().getInterfaces(),this);
    }

    //处理代理实例并返回结果
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //动态代理的本质就是使用反射机制实现
        log(method.getName());
        Object result = method.invoke(target, args);

        return result;
    }

    public void log(String msg){
        System.out.println("执行了"+msg+"方法");
    }
}
```

```java
package com.shishi.demo04;

import com.shishi.demo02.UserService;
import com.shishi.demo02.UserServiceImpl;

public class Client {
    public static void main(String[] args) {
        //真实角色
        UserServiceImpl userService = new UserServiceImpl();
        //代理角色
        ProxyInvocationHandler pih = new ProxyInvocationHandler();
        //设置要代理的对象
        pih.setTarget(userService);
        //动态生成代理类
        UserService proxy = (UserService) pih.getProxy();

        proxy.delete();
    }
}
```

动态代理的好处：

* 静态代理的所有好处
* 一个动态代理类代理的是一个接口，一般就是对应的一类业务
* 一个动态代理类可以代理多个类，只要是实现了同一个接口即可



## 十一 AOP

### 10.1 AOP？

**AOP为Aspect Oriented Programming的缩写，意为：面向切面编程，通过预编译方**
**式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个**
**热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑**
**的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高**
**了开发的效率。**

### 10.2 AOP在Spring中的作用

**提供声明式事务：允许用户自定义切面**

* 横切关注点：跨越应用程序多个模块的方法或功能。即使与我们的业务逻辑无关的，但是我们需要关注的部分，就是横切关注点。如日志、安全、缓存、事务等。
* 切面（ASPECT）：横切关注点 被模块化的特殊对象。即，他是一个类。
* 通知（Advice）：切面必须要完成的工作。即，它是类中的一个方法。
* 目标（Target）：被通知对象。
* 代理（Proxy）： 向目标对象应用通知之后创建的对象。
* 切入点（PointCut）：切面通知执行的”地点“的定义。
* 连接点（JoinPoint）：与切入点匹配的执行点。



SpringAOP中，通过Advice定义横切逻辑，Spring中支持五种类型的Advice；

|   通知类型   |        连接点        |                    实现接口                     |
| :----------: | :------------------: | :---------------------------------------------: |
|   前置通知   |        方法前        |   org.springframework.aop.MethodBeforeAdvice    |
|   后置通知   |        方法后        |  org.springframework.aop.AfterReturningAdvice   |
|   环绕通知   |       方法前后       |   org.aopalliance.intercept.MethodInterceptor   |
| 异常抛出通知 |     方法抛出异常     |      org.springframework.aop.ThrowsAdvice       |
|   引介通知   | 类中增加新的方法属性 | org.springframework.aop.IntroductionInterceptor |

即 AOP 在不改变原有代码的情况下，去增加新的功能。



### 10.3 使用Spring实现AOP

**重点：使用AOP织入，需要导入一个包依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
	<groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4</version>
</dependency>
```



#### 方式一：使用**Spring**的**API**接口 【主要是Spring API 接口实现】

前置入日志

```java
package com.shishi.log;

import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

public class Log implements MethodBeforeAdvice {
    @Override
    //Method：要执行的目标对象的方法
    //object：参数
    //target: 目标对象
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println(target.getClass().getName()+"的"+method.getName()+"被执行了");
    }
}
```

后植入日志

```java
package com.shishi.log;

import org.springframework.aop.AfterReturningAdvice;

import java.lang.reflect.Method;

public class AfterLog implements AfterReturningAdvice {
    @Override
    //returnValue:返回值
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println("执行了"+method.getName()+"返回结果为"+returnValue);
    }
}
```

业务接口

```java
package com.shishi.service;

public interface UserService {
    public void add();
    public void delete();
    public void update();
    public void query();
}
```

业务实现类

```java
package com.shishi.service;

public class UserServiceImpl implements UserService{
    @Override
    public void add() {
        System.out.println("增加一个用户");
    }

    @Override
    public void delete() {
        System.out.println("删除一个用户");
    }

    @Override
    public void update() {
        System.out.println("更新一个用户");
    }

    @Override
    public void query() {
        System.out.println("查询一个用户");
    }
}
```

配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

<!--    注册bean-->
    <bean id="userService" class="com.shishi.service.UserServiceImpl"/>
    <bean id="log" class="com.shishi.log.Log"/>
    <bean id="afterLog" class="com.shishi.log.AfterLog"/>

<!--    方式一：使用原生Spring API接口-->
<!--    配置aop,需要导入aop的约束-->
    <aop:config>
<!--        切入点: expression:表达式. execution(要执行的位置！ * * * * *) *代表所有，也可以指定死是哪一个-->
        <aop:pointcut id="pointcut" expression="execution(* com.shishi.service.UserServiceImpl.*(..))"/>

<!--        执行环绕增加！-->
        <aop:advisor advice-ref="log" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
    </aop:config>
</beans>
```

测试

```java
public class MyTest {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //动态代理的是接口,重点 是接口
        UserService userService = (UserService)context.getBean("userService");
        userService.add();
    }
}
```

输出

```shell
com.shishi.service.UserServiceImpl的add被执行了
增加一个用户
执行了add返回结果为null
```



#### 方式二：自定义来实现AOP 【主要是切面定义】

自定义类：

```java
package com.shishi.div;

public class DivPointCut {

    public void before(){
        System.out.println("******方法执行前*********");
    }

    public void after(){
        System.out.println("******方法执行后*********");
    }
}
```

xml配置

```xml
<!--    方式二: 自定义类-->
    <bean id="diy" class="com.shishi.div.DivPointCut"/>

    <aop:config>
    <!--自定义切面 ref： 要引入的切面-->
        <aop:aspect ref="diy">
            <!--切入点-->
            <aop:pointcut id="point" expression="execution(* com.shishi.service.UserServiceImpl.*(..))"/>
            <!--通知 这里的before就是自己div类里的方法-->
            <aop:before method="before" pointcut-ref="point"/>
            <aop:after method="after" pointcut-ref="point"/>
        </aop:aspect>
    </aop:config>
```

输出

```shell
******方法执行前*********
增加一个用户
******方法执行后*********
```

#### 方式三 ：使用注解实现

自定义切面类

```java
package com.shishi.div;

//使用注解方式实现aop

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;


@Aspect//标注这个类是一个切面
public class AnnotationPointCut {

    @Before("execution(* com.shishi.service.UserServiceImpl.*(..))")
    public void before(){
        System.out.println("-----方法执行前-----");
    }

    @After("execution(* com.shishi.service.UserServiceImpl.*(..))")
    public void after(){
        System.out.println("-----方法执行后-----");
    }

    //在环绕增强中，我们可以指定一个参数，代表我们要切入处理的点
    @Around("execution(* com.shishi.service.UserServiceImpl.*(..))")
    public void around(ProceedingJoinPoint joinPoint) throws Throwable{
        System.out.println("--环绕前--");

        //能通过joinPoint得到很多东西
        System.out.println(joinPoint.getSignature());

        //执行方法
        Object proceed = joinPoint.proceed();

        System.out.println("--环绕后--");

//        System.out.println(proceed);

    }

}
```

xml配置

```xml
<!--    方式三-->
    <bean id="annotationPointCut" class="com.shishi.div.AnnotationPointCut"/>
    <!--开启注解支持  JDK(默认  proxy-target-class="false")  cglib(proxy-target-class="true")-->
    <aop:aspectj-autoproxy/>
```

