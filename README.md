这款WATransChat专为 **跨境电商客服** 打造的 WhatsApp Web 浏览器扩展，能够大幅提升您的沟通效率与客户满意度。它可 **自动识别客户的国家、语言、货币和当地时间**，让客服快速掌握客户背景，做到更专业、更贴心的服务。

内置 **4 大翻译引擎**，支持 **200+ 种语言**，并且 **无字数用量限制** —— 实时自动翻译发送与接收的信息，真正实现 **无障碍沟通**。

同时，插件还贴心地提供了 **快速与陌生号码开启聊天**、**一键插入常用短语**、**保存客户语言偏好** 等功能，帮助客服团队快速响应高频场景，减少重复操作。

界面采用 **响应式设计**，与 WhatsApp Web **无缝集成**，无需额外切换窗口，即装即用。
无论您是单人客服还是跨境电商团队，都能借助它 **大幅提升工作效率、专业度和客户体验**。

### 360浏览器/360极速浏览器 插件安装方法
1. 下载本仓库中的 `WATransChat.crx` 文件。
2. 拖动到以360浏览器/360极速浏览器中点击安装。
3. 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。

### Chrome 插件安装方法
1. 下载本仓库中的 `WATransChat.crx` 文件。
2. 进入chrome扩展程序页面浏览器输入chrome://extensions/
3. 点击启用右上角开发者模式，刷新当前页面，否则会报错“程序包无效”无法安装。
4. 它会显示WhatsApp Translator 已关闭，Chrome 无法验证此扩展程序的来源，点击后面的3个竖点，点击保留此扩展程序。
5. 拖动到Chrome中点击安装,安装成功后显示"该扩展程序未列在 Chrome 应用商店中，并可能是在您不知情的情况下添加的".
6. 解决办法以管理员身份开启一个 cmd 或者 Powershell 命令行窗口；执行`reg add HKLM\SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist /v 99999 /t reg_sz /d pbkhaffoljcmmdggahffpfdadfndkbdc /f`
7. 重启浏览器。
8. 打开 [WhatsApp Web](https://web.whatsapp.com/)，脚本将自动加载并显示自定义界面。
