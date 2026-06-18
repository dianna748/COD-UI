# CnOpenData 迁移 TODO

## 数据文件迁移
- [x] databaseData.ts
- [x] apiData.ts
- [x] papersData.ts
- [x] useCasesData.ts

## 共享组件迁移
- [x] Navbar
- [x] Footer
- [x] FloatingContactButton
- [x] HeroSection
- [x] StatsSection
- [x] Carousel
- [x] DatabaseSection
- [x] ScenariosSection
- [x] ApiSection
- [x] AboutSection
- [x] PartnersSection
- [x] ContactSection
- [x] CooperationFlowSection
- [x] NewsSection
- [x] PapersSection
- [x] DatabaseSidebar
- [x] SalesContactModal

## 页面迁移
- [x] Home
- [x] Databases + DatabaseDetail
- [x] ApiStore + ApiDetail
- [x] Papers + PaperDetail
- [x] UseCaseDetail
- [x] Login + Register

## 配置与样式
- [x] App.tsx 路由
- [x] index.html 字体（沿用默认）
- [x] index.css 主题样式
- [x] ui 组件依赖（与脚手架一致，无需补充）

## 修复与功能
- [x] 修复 StatsSection 数字滚动动画中间值问题（rAF + ease-out）
- [x] 接入 Manus OAuth（Login/Register，沿用模板 getLoginUrl）

## 验证
- [x] TypeScript 类型检查通过
- [x] Vitest 测试通过（10 个用例）
- [x] 浏览器截图验证全部页面渲染正常
- [x] 修复 getLoginUrl/getRegisterUrl 在 env 缺失时的 Invalid URL 崩溃（安全降级）
- [x] 清理旧 COD-UI 进程端口占用，新项目正确运行于 3000
- [x] 本地预览验证：首页/数据目录/API商店/论文/登录/注册，及四类详情页（数据库详情/API详情/论文详情/使用案例）均渲染正常
- [x] 保存检查点（version a03a24ea）

## 首页数据合作流程优化（新需求）
- [x] 精简各步骤流程文案（标题 + 一句话要点）
- [x] 改为横向流程图展示（节点 + 连接线 + 箭头）
- [x] 突出核心合作步骤并优化样式，加入动态进场/悬停效果
- [x] 移动端竖向时间轴 + 类型检查通过

## CTA 联动 + 销售悬浮按钮改造（新需求）
- [x] 首页「立即联系」CTA 平滑滚动到联系区 + 弹出销售联系弹窗，形成转化闭环
- [x] 销售悬浮快捷按钮改为五行排列（5 位销售经理）
- [x] 统一悬浮按钮视觉样式
- [x] 发送邮件/拨打电话显示对应邮箱与电话号码
- [x] 加入五位销售经理微信二维码（丁筱雨/王诗薇/孙潇琦/杨宝璐/陈郝雨）

## 发布上线
- [x] 保存最终检查点（version 429de6c5）
- [x] 点击 Publish 按钮发布为永久网站

## 首页联系我们销售团队五列布局（新需求）
- [x] 将 ContactSection 销售团队改为五列网格（整行 lg:grid-cols-5），每位销售一列展示二维码+姓名+职位+邮箱(mailto)+电话(tel)，统一引用 salesTeam.ts，移除旧内联数据
