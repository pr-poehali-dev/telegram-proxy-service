import type { Lang } from "@/i18n/translations";

type LocalizedString = Record<Lang, string>;

type LocalizedItem = {
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
};

type LocalizedStage = {
  num: string;
  title: LocalizedString;
  desc: LocalizedString;
};

export type RawService = {
  slug: string;
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
  short: LocalizedString;
  badge: LocalizedString;
  price: LocalizedString;
  duration: LocalizedString;
  gradient: string;
  accent: string;
  features: LocalizedString[];
  includes: LocalizedItem[];
  stages: LocalizedStage[];
};

export type Service = {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  short: string;
  badge: string;
  price: string;
  duration: string;
  gradient: string;
  accent: string;
  features: string[];
  includes: { icon: string; title: string; desc: string }[];
  stages: { num: string; title: string; desc: string }[];
};

export const RAW_SERVICES: RawService[] = [
  {
    slug: "landing",
    icon: "Layout",
    title: {
      ru: "Лендинги под ключ",
      zh: "落地页一站式服务",
    },
    desc: {
      ru: "Продающая одностраничная посадка с дизайном, текстами и формами.",
      zh: "高转化单页网站，包含设计、文案和表单。",
    },
    short: {
      ru: "Одностраничный сайт, который превращает посетителей в клиентов. Уникальный дизайн, продающие тексты и сквозная аналитика — за 7 дней.",
      zh: "将访客转化为客户的单页网站。独特设计、营销文案和全链路分析 — 7天内完成。",
    },
    badge: { ru: "Хит", zh: "热门" },
    price: { ru: "от 15 000 ₽", zh: "15 000 ₽起" },
    duration: { ru: "7 дней", zh: "7天" },
    gradient: "from-[#a78bfa] via-[#818cf8] to-[#60a5fa]",
    accent: "#7c3aed",
    features: [
      { ru: "Уникальный дизайн без шаблонов", zh: "原创设计，非模板" },
      { ru: "Продающие тексты от копирайтера", zh: "专业文案撰写" },
      { ru: "Адаптив под все устройства", zh: "适配所有设备" },
      { ru: "Интеграция с CRM", zh: "CRM集成" },
      { ru: "Подключение Яндекс.Метрики", zh: "接入Yandex统计" },
      { ru: "Базовая SEO-оптимизация", zh: "基础SEO优化" },
    ],
    includes: [
      {
        icon: "Palette",
        title: { ru: "Дизайн", zh: "设计" },
        desc: { ru: "Уникальный визуал в фирменном стиле", zh: "符合品牌风格的独特视觉" },
      },
      {
        icon: "Type",
        title: { ru: "Тексты", zh: "文案" },
        desc: { ru: "Продающие смыслы и УТП", zh: "营销卖点和独特价值" },
      },
      {
        icon: "Smartphone",
        title: { ru: "Адаптив", zh: "响应式" },
        desc: { ru: "Идеально на любом экране", zh: "在任何屏幕都完美显示" },
      },
      {
        icon: "Zap",
        title: { ru: "Скорость", zh: "速度" },
        desc: { ru: "Загрузка меньше 2 секунд", zh: "加载时间少于2秒" },
      },
    ],
    stages: [
      {
        num: "01",
        title: { ru: "Бриф", zh: "需求调研" },
        desc: { ru: "Заполняем бриф, изучаем нишу и конкурентов", zh: "填写简报，研究行业和竞争对手" },
      },
      {
        num: "02",
        title: { ru: "Прототип", zh: "原型设计" },
        desc: { ru: "Согласуем структуру и логику страницы", zh: "确认页面结构和逻辑" },
      },
      {
        num: "03",
        title: { ru: "Дизайн", zh: "视觉设计" },
        desc: { ru: "Создаём уникальный визуал", zh: "创建独特视觉效果" },
      },
      {
        num: "04",
        title: { ru: "Верстка", zh: "前端开发" },
        desc: { ru: "Адаптивная верстка с анимациями", zh: "响应式开发与动画效果" },
      },
      {
        num: "05",
        title: { ru: "Запуск", zh: "上线" },
        desc: { ru: "Размещаем на хостинге, передаём доступы", zh: "部署托管，移交权限" },
      },
    ],
  },
  {
    slug: "shop",
    icon: "ShoppingBag",
    title: {
      ru: "Интернет-магазины",
      zh: "电商网站",
    },
    desc: {
      ru: "Каталог, корзина, оплата, интеграция с CRM и 1С.",
      zh: "商品目录、购物车、在线支付，集成CRM和1С系统。",
    },
    short: {
      ru: "Полноценный онлайн-магазин с каталогом, корзиной и онлайн-оплатой. Интеграция с CRM, 1С и службами доставки.",
      zh: "完整的在线商店，包含商品目录、购物车和在线支付。集成CRM、1С和物流服务。",
    },
    badge: { ru: "Топ", zh: "顶级" },
    price: { ru: "от 89 000 ₽", zh: "89 000 ₽起" },
    duration: { ru: "14–21 день", zh: "14–21天" },
    gradient: "from-[#f472b6] via-[#e879f9] to-[#a78bfa]",
    accent: "#db2777",
    features: [
      { ru: "Каталог до 10 000 товаров", zh: "支持10 000件商品" },
      { ru: "Корзина и онлайн-оплата", zh: "购物车与在线支付" },
      { ru: "Личный кабинет покупателя", zh: "买家个人中心" },
      { ru: "Интеграция с 1С и amoCRM", zh: "集成1С和amoCRM" },
      { ru: "Подключение служб доставки", zh: "对接物流服务" },
      { ru: "Промокоды и скидки", zh: "优惠码和折扣" },
    ],
    includes: [
      {
        icon: "Package",
        title: { ru: "Каталог", zh: "商品目录" },
        desc: { ru: "Удобный поиск и фильтры", zh: "便捷的搜索和筛选" },
      },
      {
        icon: "ShoppingCart",
        title: { ru: "Корзина", zh: "购物车" },
        desc: { ru: "Простой процесс заказа", zh: "简单的下单流程" },
      },
      {
        icon: "CreditCard",
        title: { ru: "Оплата", zh: "支付" },
        desc: { ru: "ЮKassa, Тинькофф, СБП", zh: "ЮKassa、Tinkoff、SBP" },
      },
      {
        icon: "Truck",
        title: { ru: "Доставка", zh: "物流" },
        desc: { ru: "СДЭК, Почта России, Boxberry", zh: "СДЭК、俄罗斯邮政、Boxberry" },
      },
    ],
    stages: [
      {
        num: "01",
        title: { ru: "Анализ", zh: "分析" },
        desc: { ru: "Изучаем товары и процессы продаж", zh: "研究商品和销售流程" },
      },
      {
        num: "02",
        title: { ru: "Структура", zh: "结构" },
        desc: { ru: "Проектируем каталог и фильтры", zh: "设计目录和筛选" },
      },
      {
        num: "03",
        title: { ru: "Дизайн", zh: "设计" },
        desc: { ru: "Создаём концепт магазина", zh: "打造商店概念" },
      },
      {
        num: "04",
        title: { ru: "Разработка", zh: "开发" },
        desc: { ru: "Программируем функционал", zh: "编程实现功能" },
      },
      {
        num: "05",
        title: { ru: "Интеграции", zh: "系统集成" },
        desc: { ru: "Подключаем CRM, оплату, доставку", zh: "接入CRM、支付、物流" },
      },
      {
        num: "06",
        title: { ru: "Запуск", zh: "上线" },
        desc: { ru: "Наполняем товарами и запускаем", zh: "上传商品并发布" },
      },
    ],
  },
  {
    slug: "corporate",
    icon: "Briefcase",
    title: {
      ru: "Корпоративные сайты",
      zh: "企业网站",
    },
    desc: {
      ru: "Многостраничные сайты для компаний и услуг с понятной структурой.",
      zh: "面向公司和服务的多页网站，结构清晰。",
    },
    short: {
      ru: "Многостраничный сайт для презентации компании, услуг и команды. С блогом, кейсами и удобной админкой.",
      zh: "用于展示公司、服务和团队的多页网站。包含博客、案例和便捷的后台管理。",
    },
    badge: { ru: "B2B", zh: "B2B" },
    price: { ru: "от 25 000 ₽", zh: "25 000 ₽起" },
    duration: { ru: "10–14 дней", zh: "10–14天" },
    gradient: "from-[#34d399] via-[#22d3ee] to-[#60a5fa]",
    accent: "#0891b2",
    features: [
      { ru: "До 15 страниц", zh: "最多15个页面" },
      { ru: "Блог с админкой", zh: "带后台的博客" },
      { ru: "Раздел кейсов", zh: "案例展示" },
      { ru: "Многоязычность (опционально)", zh: "多语言（可选）" },
      { ru: "Формы заявок и обратной связи", zh: "申请和反馈表单" },
      { ru: "Интеграция с CRM", zh: "CRM集成" },
    ],
    includes: [
      {
        icon: "FileText",
        title: { ru: "Страницы", zh: "页面" },
        desc: { ru: "О компании, услуги, команда", zh: "关于公司、服务、团队" },
      },
      {
        icon: "BookOpen",
        title: { ru: "Блог", zh: "博客" },
        desc: { ru: "Публикация статей и новостей", zh: "发布文章和新闻" },
      },
      {
        icon: "Award",
        title: { ru: "Кейсы", zh: "案例" },
        desc: { ru: "Витрина ваших работ", zh: "您的作品展示" },
      },
      {
        icon: "Settings",
        title: { ru: "Админка", zh: "后台" },
        desc: { ru: "Управление контентом", zh: "内容管理" },
      },
    ],
    stages: [
      {
        num: "01",
        title: { ru: "Бриф", zh: "需求调研" },
        desc: { ru: "Глубокое погружение в бизнес", zh: "深入了解业务" },
      },
      {
        num: "02",
        title: { ru: "Структура", zh: "结构" },
        desc: { ru: "Карта сайта и логика страниц", zh: "站点地图和页面逻辑" },
      },
      {
        num: "03",
        title: { ru: "Дизайн", zh: "设计" },
        desc: { ru: "Единый стиль для всех страниц", zh: "统一风格的所有页面" },
      },
      {
        num: "04",
        title: { ru: "Разработка", zh: "开发" },
        desc: { ru: "Верстка и подключение CMS", zh: "前端开发与CMS集成" },
      },
      {
        num: "05",
        title: { ru: "Запуск", zh: "上线" },
        desc: { ru: "Наполняем контентом и запускаем", zh: "填充内容并发布" },
      },
    ],
  },
  {
    slug: "seo",
    icon: "TrendingUp",
    title: {
      ru: "Продвижение в Яндексе",
      zh: "Yandex推广",
    },
    desc: {
      ru: "SEO под Яндекс, Директ, аналитика. Поднимаем в ТОП-10.",
      zh: "Yandex SEO、Direct广告、数据分析。助力进入TOP-10。",
    },
    short: {
      ru: "Комплексное SEO-продвижение в Яндексе. Семантика, оптимизация, контент и Яндекс.Директ. Гарантия выхода в ТОП-10.",
      zh: "全面的Yandex SEO推广。关键词、优化、内容和Yandex Direct。保证进入TOP-10。",
    },
    badge: { ru: "Результат", zh: "见效" },
    price: { ru: "от 35 000 ₽/мес", zh: "35 000 ₽/月起" },
    duration: { ru: "от 3 месяцев", zh: "3个月起" },
    gradient: "from-[#fbbf24] via-[#fb923c] to-[#f87171]",
    accent: "#ea580c",
    features: [
      { ru: "Семантическое ядро от 500 запросов", zh: "500+关键词词库" },
      { ru: "SEO-оптимизация текстов и метатегов", zh: "文本和元标签SEO优化" },
      { ru: "Настройка Яндекс.Вебмастер и Метрика", zh: "配置Yandex站长和统计" },
      { ru: "Контент-план и публикации", zh: "内容计划和发布" },
      { ru: "Внешняя оптимизация и ссылки", zh: "外链优化" },
      { ru: "Отчёты каждый месяц", zh: "每月报告" },
    ],
    includes: [
      {
        icon: "Search",
        title: { ru: "Семантика", zh: "关键词" },
        desc: { ru: "Собираем все запросы ниши", zh: "收集所有行业关键词" },
      },
      {
        icon: "FileEdit",
        title: { ru: "Оптимизация", zh: "优化" },
        desc: { ru: "Тексты, метатеги, структура", zh: "文本、元标签、结构" },
      },
      {
        icon: "BarChart3",
        title: { ru: "Аналитика", zh: "分析" },
        desc: { ru: "Метрика и Вебмастер", zh: "统计与站长工具" },
      },
      {
        icon: "Megaphone",
        title: { ru: "Директ", zh: "Direct广告" },
        desc: { ru: "Платный трафик с первого дня", zh: "首日获取付费流量" },
      },
    ],
    stages: [
      {
        num: "01",
        title: { ru: "Аудит", zh: "审核" },
        desc: { ru: "Анализ текущего состояния сайта", zh: "分析网站现状" },
      },
      {
        num: "02",
        title: { ru: "Семантика", zh: "关键词" },
        desc: { ru: "Собираем поисковые запросы", zh: "收集搜索词" },
      },
      {
        num: "03",
        title: { ru: "Оптимизация", zh: "优化" },
        desc: { ru: "Внутренняя SEO-работа", zh: "站内SEO工作" },
      },
      {
        num: "04",
        title: { ru: "Контент", zh: "内容" },
        desc: { ru: "Пишем и публикуем статьи", zh: "撰写并发布文章" },
      },
      {
        num: "05",
        title: { ru: "Продвижение", zh: "推广" },
        desc: { ru: "Ссылки и внешняя оптимизация", zh: "链接和站外优化" },
      },
      {
        num: "06",
        title: { ru: "Отчёт", zh: "报告" },
        desc: { ru: "Анализируем позиции и трафик", zh: "分析排名和流量" },
      },
    ],
  },
];

export function getLocalizedServices(lang: Lang): Service[] {
  return RAW_SERVICES.map((s) => ({
    slug: s.slug,
    icon: s.icon,
    title: s.title[lang],
    desc: s.desc[lang],
    short: s.short[lang],
    badge: s.badge[lang],
    price: s.price[lang],
    duration: s.duration[lang],
    gradient: s.gradient,
    accent: s.accent,
    features: s.features.map((f) => f[lang]),
    includes: s.includes.map((i) => ({
      icon: i.icon,
      title: i.title[lang],
      desc: i.desc[lang],
    })),
    stages: s.stages.map((st) => ({
      num: st.num,
      title: st.title[lang],
      desc: st.desc[lang],
    })),
  }));
}

// Для обратной совместимости — возвращает русские услуги
export const SERVICES: Service[] = getLocalizedServices("ru");

export const getServiceBySlug = (slug: string, lang: Lang = "ru"): Service | undefined => {
  const raw = RAW_SERVICES.find((s) => s.slug === slug);
  if (!raw) return undefined;
  return getLocalizedServices(lang).find((s) => s.slug === slug);
};