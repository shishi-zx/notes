# 上传到git仓库

### 1.首先确保项目里有 `.gitignore`文件

**示例**

```shell
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```

### 2.生成本地仓库

```shell
> git init
> git add *
> git commit -m "init 名称" //描述初始化文件信息
```

### 3.创建远程仓库

创建好后复制仓库的关联命令,在本地命令行执行（项目文件夹下），然后执行 push命令

**示例**

```shell
> git remote add origin https://github.com/shishi523/cardemo.git
> git push origin master
```



### 4.上传更新过的内容

```shell
git status //查看有哪些改动
git add . //注意add后的空格，提交到暂存区
git commit -m "本次更新的说明"
git push origin master//提交到远程仓库
```







