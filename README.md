# Strike 小程序

## 准备工作
### 开发工具VS-Code
#### [点我下载](https://code.visualstudio.com)
#### 设置代码高亮
1. 在 Code 里先安装 Vue 的语法高亮插件 `Vetur`。
2. 打开任意 `.wpy` 文件。
3. 点击右下角的选择语言模式，默认为纯文本。
4. 在弹出的窗口中选择 `.wpy` 的配置文件关联...。
5. 在选择要与 `.wpy` 关联的语言模式 中选择 Vue。

#### 格式化代码
1. 安装插件 `wpy-beautify`。
2. 默认快捷键 `shift + cmd + 6`。
3. 或者 `shift + cmd + p` 选择 `wpy`。
4. 更具体设置请查看 [wpy-beautify](https://marketplace.visualstudio.com/items?itemName=doingweb.wpy-beautify)
5. 默认格式化快捷键`shift+alt+F`

#### 统一文件头部
- 安装插件 `vscode-fileheader`。
- `首选项` `设置` 修改用户名 

```
 "fileheader.Author": "用户名",
 "fileheader.LastModifiedBy": "用户名"
```
- 快捷键 `control+alt+i` 添加头部

```
/*
 * @Author: fangguiliang 
 * @Date: 2018-07-25 11:40:35 
 * @Last Modified by: fangguiliang
 * @Last Modified time: 2018-08-01 17:56:07
 */
```

#### 代码规范
- 以官网为参考 [查看规范](https://tencent.github.io/wepy/document.html#/?id=代码规范)

## 初始化项目
```
# 拉项目
git clone git@github.com:fglfgl/Strike.git
# 进到根目录
cd Strike
# 下载依赖
yarn install
# 运行项目
yarn run dev
```
      
### 参考
- WePY [介绍](https://tencent.github.io/wepy/) [文档](https://tencent.github.io/wepy/document.html#/) [Github](https://github.com/Tencent/wepy)
- WeUI
- wepy-redux [文档](https://www.npmjs.com/package/wepy-redux)
- redux [官网](https://redux.js.org) [阮一峰博客](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- async-await [官网](https://javascript.info/async-await) 
 


