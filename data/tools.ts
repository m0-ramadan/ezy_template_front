export interface Tool {
  slug: string;
  title: { en: string; ar: string };
  shortDescription: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string; // Lucide icon name
  category:
    | "business"
    | "pdf"
    | "calculator"
    | "images"
    | "developers"
    | "excel"
    | "text"
    | "seo";
  badge: { en: string; ar: string };
  href: string;
  keywords: string[];
  featured?: boolean;
  features?: { en: string; ar: string }[];
  usageSteps?: { en: string; ar: string }[];
  faqs?: {
    question: { en: string; ar: string };
    answer: { en: string; ar: string };
  }[];
}

export const TOOLS: Tool[] = [
  {
    slug: "invoice-generator",
    title: {
      ar: "مولد الفواتير الاحترافي",
      en: "Professional Invoice Generator",
    },
    shortDescription: {
      ar: "إنشاء وتحميل فواتير تجارية احترافية بصيغة PDF فوراً مع حساب الضرائب والخصومات.",
      en: "Create and export professional PDF commercial invoices instantly with tax & discount calculation.",
    },
    description: {
      ar: "أداة مجانية وبسيطة لإنشاء الفواتير التجارية الاحترافية بسرعة فائقة دون حاجة لتسجيل الدخول. يمكنك إضافة شعار شركتك، تعديل بيانات العميل، إضافة البنود غير المحدودة، حساب ضريبة القيمة المضافة والشحن والخصم مباشرةً، ثم طباعة أو تنزيل الفاتورة بصيغة PDF عالية الجودة.",
      en: "A free and fast tool to generate professional commercial invoices without registration. Add company logo, customer details, unlimited items, calculate VAT/Discounts/Shipping live, and export to PDF instantly.",
    },
    icon: "FileSpreadsheet",
    category: "business",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/invoice-generator",
    keywords: [
      "فاتورة",
      "مولد فواتير",
      "pdf",
      "invoice generator",
      "فاتورة إلكترونية",
      "ضريبة القيمة المضافة",
    ],
    featured: true,
    features: [
      {
        ar: "إنشاء فواتير إلكترونية متوافقة مجاناً",
        en: "Create compliant commercial invoices free",
      },
      {
        ar: "معاينة مباشرة ولحظية للفاتورة باللغة العربية والإنجليزية",
        en: "Live real-time preview in Arabic & English",
      },
      {
        ar: "دعم إضافة الشعار والخصومات وضريبة VAT والشحن",
        en: "Supports Logo, Discounts, VAT, and Shipping",
      },
      {
        ar: "تصدير الفاتورة مباشرة بصيغة PDF قابلة للطباعة",
        en: "Direct high-quality PDF export & printing",
      },
      {
        ar: "خصوصية كاملة 100% دون حفظ أي بيانات على السيرفر",
        en: "100% private - zero server data retention",
      },
    ],
    usageSteps: [
      {
        ar: "أدخل بيانات شركتك (الاسم، الشعار، الهاتف، الرقم الضريبي).",
        en: "Enter your company details (Name, Logo, Phone, Tax ID).",
      },
      {
        ar: "أدخل بيانات العميل وتاريخ الفاتورة ورقمها.",
        en: "Fill in customer info, invoice number and date.",
      },
      {
        ar: "أضف بنود الخدمة أو المنتجات والكمية وسعر الوحدة.",
        en: "Add items, quantities, and unit prices.",
      },
      {
        ar: "حدد نسبة الضريبة أو الخصم ومصاريف الشحن إن وجدت.",
        en: "Set VAT, discount percentage or shipping fee.",
      },
      {
        ar: "اضغط على زر (تحميل PDF) أو (طباعة) للحصول على الفاتورة فوراً.",
        en: "Click (Download PDF) or (Print) to get your invoice instantly.",
      },
    ],
    faqs: [
      {
        question: {
          ar: "هل مولد الفواتير مجاني بالكامل؟",
          en: "Is the invoice generator completely free?",
        },
        answer: {
          ar: "نعم، الأداة مجانية 100% بدون أي رسوم خفية أو حدود على عدد الفواتير.",
          en: "Yes, it is 100% free with no hidden fees or limits on usage.",
        },
      },
      {
        question: {
          ar: "هل يتم حفظ بيانات فواتيري أو بيانات عملائي على سيرفراتكم؟",
          en: "Are my invoice or customer data stored on your server?",
        },
        answer: {
          ar: "لا نهائياً. جميع الحسابات وإنشاء الملف يتم محلياً على متصفحك مباشرة لضمان أعلى درجات الخصوصية والأمان.",
          en: "No. All calculations and PDF generation happen directly inside your browser for maximum privacy.",
        },
      },
      {
        question: {
          ar: "هل يمكنني تنزيل الفاتورة بصيغة PDF؟",
          en: "Can I download the invoice as PDF?",
        },
        answer: {
          ar: "نعم، يمكنك الضغط على زر تحميل PDF وسيتم توليد ملف جاهز للطباعة والمشاركة فوراً.",
          en: "Yes, click 'Download PDF' and a print-ready document will be generated instantly.",
        },
      },
    ],
  },
  {
    slug: "qr-code-generator",
    title: {
      ar: "مولد الرموز QR Code",
      en: "QR Code Generator",
    },
    shortDescription: {
      ar: "إنشاء رموز QR مخصصة للمواقع، شبكات WiFi، واتساب، الاتصالات والرسائل بجودة عالية.",
      en: "Generate custom high-quality QR codes for websites, Wi-Fi, WhatsApp, calls, and text.",
    },
    description: {
      ar: "مولد الرموز الاستجابية السريعة (QR Code) المجاني والشامل. يتيح لك تحويل الروابط، النصوص، بطاقات الاتصال، حسابات واتساب، إعدادات الواي فاي، والرسائل إلى رموز QR احترافية مع إمكانية تخصيص الألوان وإضافة شعار وتنزيلها بصيغ PNG و SVG عالية الدقة.",
      en: "A free full-featured QR Code Generator. Convert URLs, text, WhatsApp links, phone numbers, email, SMS, and Wi-Fi credentials into scannable QR codes with color customization and logo support.",
    },
    icon: "QrCode",
    category: "business",
    badge: { ar: "شائع", en: "Popular" },
    href: "/tools/qr-code-generator",
    keywords: [
      "qr",
      "مولد qr",
      "باركود",
      "qr code generator",
      "رمز الاستجابة السريعة",
      "رمز كيو ار",
    ],
    featured: true,
    features: [
      {
        ar: "دعم أنواع متعددة (روابط، واتساب، WiFi، بريد، هاتف، نص)",
        en: "Supports URLs, WhatsApp, Wi-Fi, Email, Phone & Text",
      },
      {
        ar: "تخصيص الألوان وحجم الرمز ومستوى تصحيح الأخطاء",
        en: "Custom colors, sizes, and error correction levels",
      },
      {
        ar: "إمكانية دمج شعار في منتصف رمز QR بأمان",
        en: "Safely embed a central logo inside the QR code",
      },
      {
        ar: "تحميل مجاني بصيغ PNG عالية الدقة و SVG المتجهة",
        en: "Free high-res PNG and vector SVG downloads",
      },
      {
        ar: "عمليات التوليد فورية 100% داخل المتصفح دون انتهاء صلاحية",
        en: "Instant 100% client-side generation with no expiration",
      },
    ],
    usageSteps: [
      {
        ar: "اختر نوع الرمز الذي تريد إنشاءه (رابط، واتساب، WiFi.. الخ).",
        en: "Choose QR code type (URL, WhatsApp, Wi-Fi, etc.).",
      },
      {
        ar: "أدخل البيانات المطلوبة في الحقول المخصصة.",
        en: "Fill in the required fields.",
      },
      {
        ar: "خصص ألوان الرمز والحجم أو أضف شعارك الخاص إن أردت.",
        en: "Customize foreground/background colors, size or add a logo.",
      },
      {
        ar: "اضغط على تنزيل PNG أو تنزيل SVG للحصول على الرمز.",
        en: "Click Download PNG or Download SVG to save your code.",
      },
    ],
    faqs: [
      {
        question: {
          ar: "هل تنتهي صلاحية رموز QR المنشأة؟",
          en: "Do these generated QR codes expire?",
        },
        answer: {
          ar: "لا، الرموز دائمة 100% وتعمل مدى الحياة لأنها تحتوي على البيانات مباشرة ولا تعتمد على أي إعادة توجيه خارجية.",
          en: "No, they are static QR codes that contain your data directly and never expire.",
        },
      },
      {
        question: {
          ar: "هل استخدام الأداة مجاني للاستخدام التجاري؟",
          en: "Is this free for commercial use?",
        },
        answer: {
          ar: "نعم، يمكنك استخدام الرموز في مطبوعاتك وأعمالك التجارية بحرية وبدون أي تكلفة.",
          en: "Yes, you can freely use them in commercial print and marketing materials.",
        },
      },
    ],
  },
  {
    slug: "pdf-compressor",
    title: {
      ar: "ضغط ملفات PDF",
      en: "PDF Compressor",
    },
    shortDescription: {
      ar: "تقليل حجم ملفات PDF بسهولة وأمان مع الحفاظ على أفضل جودة ممكنة للمستند.",
      en: "Reduce PDF file sizes safely and efficiently while maintaining document quality.",
    },
    description: {
      ar: "أداة ضغط ملفات PDF المجانية تساعدك على تصغير حجم المستندات والكتب وملفات الباوربوينت المطبوعة لسهولة مشاركتها عبر البريد الإلكتروني أو الواتساب، مع خيارات ضغط متعددة تحافظ على وضوح النصوص والجداول.",
      en: "Free online PDF compression tool that reduces document sizes for easy sharing via email or messaging apps with customizable compression levels.",
    },
    icon: "FileText",
    category: "pdf",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/pdf-compressor",
    keywords: [
      "ضغط pdf",
      "تصغير حجم pdf",
      "pdf compressor",
      "تقليل حجم الملفات",
      "مستندات pdf",
    ],
    featured: true,
    features: [
      {
        ar: "ضغط حقيقي للمستندات وتقليل حجم الصور والهياكل",
        en: "Genuine PDF compression reducing image and file weights",
      },
      {
        ar: "ثلاث مستويات ضغط (خفيف، متوسط، قوي)",
        en: "Three compression levels (Light, Balanced, Strong)",
      },
      {
        ar: "واجهة سحب وإسقاط (Drag & Drop) احترافية",
        en: "Professional Drag & Drop uploader UI",
      },
      {
        ar: "حماية الخصوصية: حذف الملفات فوراً بعد المعالجة",
        en: "Privacy protected: files processed and deleted immediately",
      },
      {
        ar: "معاينة حجم الملف قبل وبعد ونسبة التوفير المئوية",
        en: "Displays exact file size before/after and savings percentage",
      },
    ],
    usageSteps: [
      {
        ar: "اسحب ملف PDF واكتبه داخل مربع الرفع أو اضغط لاختيار ملف.",
        en: "Drag & drop your PDF file or click to browse.",
      },
      {
        ar: "اختر مستوى الضغط المناسب (خفيف، متوسط، قوي).",
        en: "Select your desired compression level (Light, Medium, Strong).",
      },
      {
        ar: "اضغط على زر (ضغط PDF) وانتظر لحظات حتى تكتمل العملية.",
        en: "Click (Compress PDF) and wait for processing.",
      },
      {
        ar: "قم بتحميل الملف المضغوط الجديد فوراً.",
        en: "Download your compressed PDF file instantly.",
      },
    ],
    faqs: [
      {
        question: {
          ar: "هل يتم الاحتفاظ بملفاتي الخاصة على السيرفر؟",
          en: "Are my files stored on your server?",
        },
        answer: {
          ar: "لا، نحن نحترم خصوصيتك بالكامل. يتم معالجة الملفات في بيئة معزولة وتُمحى تلقائياً فور انتهاء عملية الضغط.",
          en: "No. Files are processed securely in an isolated environment and deleted immediately.",
        },
      },
      {
        question: {
          ar: "ما هو الحد الأقصى لحجم ملف PDF المسموح به؟",
          en: "What is the maximum allowed file size?",
        },
        answer: {
          ar: "يمكنك رفع ملفات حتى 50 ميجابايت مجاناً وبسرعة معالجة عالية.",
          en: "You can upload PDF files up to 50 MB for free.",
        },
      },
    ],
  },
  {
    slug: "vat-calculator",
    title: {
      ar: "حاسبة قيمة الضريبة المضافة VAT",
      en: "VAT & Tax Calculator",
    },
    shortDescription: {
      ar: "حساب ضريبة القيمة المضافة (VAT) للشركات والأفراد بسرعة، إضافة الضريبة أو استخراجها.",
      en: "Calculate Value Added Tax (VAT) quickly with Add VAT and Extract VAT options.",
    },
    description: {
      ar: "حاسبة ضريبة القيمة المضافة الإلكترونية الأكثر مرونة وسرعة. تتيح لك اختيار وضع إضافة الضريبة للسعر الصافي أو استخراج قيمة الضريبة والسعر الصافي من السعر الشامل، مع إمكانية تحديد النسبة (14%، 15%، 5%..) واختيار العملة ونسخ النتائج بضغطة زر.",
      en: "Flexible Value Added Tax (VAT) calculator. Easily add VAT to net prices or extract VAT from gross totals with customizable tax rates, currency selection, and instant one-click copy.",
    },
    icon: "Calculator",
    category: "calculator",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/vat-calculator",
    keywords: [
      "حاسبة الضريبة",
      "vat calculator",
      "ضريبة القيمة المضافة",
      "حساب 14%",
      "استخراج الضريبة",
    ],
    featured: true,
    features: [
      {
        ar: "وضعان أساسيان: إضافة الضريبة للمبلغ أو استخراج الضريبة من المبلغ الإجمالي",
        en: "Two modes: Add VAT to amount or Extract VAT from gross total",
      },
      {
        ar: "نسب جاهزة سريعة (5%, 10%, 14%, 15%, 20%) وحقل نسبة مخصصة",
        en: "Quick preset buttons (5%, 10%, 14%, 15%, 20%) plus custom rate",
      },
      {
        ar: "دعم اختيار العملات (EGP, SAR, AED, USD, EUR, GBP)",
        en: "Currency selector (EGP, SAR, AED, USD, EUR, GBP)",
      },
      {
        ar: "تحديث النتائج لحظياً مع إمكانية نسخ القيم بسهولة",
        en: "Live real-time output update with quick copy feature",
      },
      {
        ar: "تصميم متجاوب وسهل الاستخدام على الهواتف والأجهزة اللوحية",
        en: "100% responsive and clean layout across mobile & desktop",
      },
    ],
    usageSteps: [
      {
        ar: "حدد الوضع المطلوب: (إضافة VAT) أو (استخراج VAT).",
        en: "Select calculation mode: (Add VAT) or (Extract VAT).",
      },
      {
        ar: "أدخل المبلغ في حقل السعر.",
        en: "Enter your amount in the price input field.",
      },
      {
        ar: "اختر نسبة الضريبة المطبوقة (مثل 14% أو 15%) أو أدخل نسبة مخصصة.",
        en: "Pick tax percentage (e.g., 14% or 15%) or type custom rate.",
      },
      {
        ar: "شاهد تفاصيل المبلغ والضريبة والإجمالي لحظياً، واضغط نسخ عند الحاجة.",
        en: "View instant net amount, tax value, and gross total with copy option.",
      },
    ],
    faqs: [
      {
        question: {
          ar: "كيف يتم استخراج ضريبة القيمة المضافة من المبلغ الإجمالي الشامل؟",
          en: "How is VAT extracted from a gross total?",
        },
        answer: {
          ar: "تتم المعادلة بـ: السعر الصافي = السعر الإجمالي / (1 + نسبة الضريبة / 100). وقيمة الضريبة = السعر الإجمالي - السعر الصافي.",
          en: "Net Amount = Gross Total / (1 + Tax Rate / 100). VAT Amount = Gross Total - Net Amount.",
        },
      },
      {
        question: {
          ar: "هل تتيح الحاسبة إدخال نسبة ضريبة مخصصة؟",
          en: "Can I enter a custom VAT percentage?",
        },
        answer: {
          ar: "نعم، يمكنك الضغط على حقل النسبة المخصصة وإدخال أي رقم (مثلاً 14.5%).",
          en: "Yes, you can type any custom percentage (e.g. 14.5%) in the custom rate box.",
        },
      },
    ],
  },
  {
    slug: "image-converter",
    title: { ar: "محول صيغ الصور", en: "Image Format Converter" },
    shortDescription: {
      ar: "تحويل صيغ الصور بين PNG و JPG و WebP و ICO فوراً وبجودة عالية.",
      en: "Convert image formats between PNG, JPG, WebP, GIF, and ICO instantly.",
    },
    description: {
      ar: "تحويل صيغ الصور المختلفة مباشرة داخل المتصفح وبدون رفع الملفات لسيرفرات خارجية.",
      en: "Convert any image format (PNG, JPG, WebP, GIF, ICO) directly inside your browser.",
    },
    icon: "Image",
    category: "images",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/image-converter",
    keywords: ["png to jpg", "webp to png", "image converter", "تحويل الصور"],
  },
  {
    slug: "image-cropper",
    title: { ar: "أداة قص الصور", en: "Image Cropper" },
    shortDescription: {
      ar: "قص وتعديل أبعاد الصور بنسب مربعة أو مخصصة لمنصات التواصل الاجتماعي.",
      en: "Crop images to custom aspect ratios or preset social media dimensions.",
    },
    description: {
      ar: "قص وتحديد الجزء المطلوب من أي صورة بسهولة مع أبعاد جاهزة لمنصات السوشيال ميديا.",
      en: "Easily crop images using intuitive drag handles or custom aspect ratios.",
    },
    icon: "Crop",
    category: "images",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/image-cropper",
    keywords: ["crop image", "قص الصور", "تعديل الصور"],
  },
  {
    slug: "css-gradient-generator",
    title: { ar: "مولد التدرجات اللونية CSS", en: "CSS Gradient Generator" },
    shortDescription: {
      ar: "توليد تدرجات لونية عصرية ونسخ كود CSS جاهز للموقع مباشرة.",
      en: "Create beautiful linear and radial CSS gradients and copy ready-to-use CSS code.",
    },
    description: {
      ar: "أداة تفاعلية لتصميم التدرجات اللونية الخطية والدائرية وتعديل الزوايا ونسخ كود CSS.",
      en: "Interactive UI tool to generate custom linear, radial, and conic CSS gradients.",
    },
    icon: "Sliders",
    category: "images",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/css-gradient-generator",
    keywords: ["css gradient", "gradient generator", "تدرج الوان", "كود css"],
  },
  {
    slug: "loan-emi-calculator",
    title: { ar: "حاسبة القروض والقسط الشهري", en: "Loan & EMI Calculator" },
    shortDescription: {
      ar: "حساب القسط الشهري للقروض والتمويل العقاري وإجمالي الفوائد وجدول السداد.",
      en: "Calculate monthly EMI loan payments, total interest payable, and full repayment schedule.",
    },
    description: {
      ar: "حساب دقيق للأقساط الشهرية للقروض والتمويل وتفاصيل الفائدة وإجمالي المبلغ.",
      en: "Accurately calculate monthly EMI loan installments, interest breakdown, and amortization.",
    },
    icon: "Landmark",
    category: "calculator",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/loan-emi-calculator",
    keywords: ["loan calculator", "emi", "حاسبة القروض", "القسط الشهري"],
  },
  {
    slug: "age-calculator",
    title: {
      ar: "حاسبة العمر والفرق بين تاريخين",
      en: "Age & Date Difference Calculator",
    },
    shortDescription: {
      ar: "حساب العمر بالظبط بالسنوات والأشهر والأيام والفرق الزمني بين تاريخين.",
      en: "Calculate exact age in years, months, days, hours, and find difference between two dates.",
    },
    description: {
      ar: "حساب العمر بدقة متناهية بالسنوات والشهور والأيام والعد التنازلي لعيد الميلاد القادم.",
      en: "Calculate exact age from birthdate down to minutes, next birthday countdown, and total days.",
    },
    icon: "Calendar",
    category: "calculator",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/age-calculator",
    keywords: ["age calculator", "حاسبة العمر", "تاريخ الميلاد", "فرق التاريخ"],
  },
  {
    slug: "excel-formula-helper",
    title: {
      ar: "مولد ومساعد معادلات الإكسيل",
      en: "Excel Formula Generator & Helper",
    },
    shortDescription: {
      ar: "توليد صيغ ومعادلات الإكسيل وجوجل شيت من الوصف النصي المباشر.",
      en: "Generate complex Excel and Google Sheets formulas from text descriptions instantly.",
    },
    description: {
      ar: "إنشاء وصياغة معادلات الإكسيل المعقدة مثل VLOOKUP و INDEX/MATCH و IF الشرطية.",
      en: "Quickly build VLOOKUP, INDEX/MATCH, IF, SUMIFS, and complex nested Excel formulas.",
    },
    icon: "FunctionSquare",
    category: "excel",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/excel-formula-helper",
    keywords: ["excel formula", "vlookup", "معادلات اكسيل", "شيت مفيد"],
  },
  {
    slug: "case-converter",
    title: { ar: "محول حالة الأحرف والنصوص", en: "Text Case Converter" },
    shortDescription: {
      ar: "تحويل النص إلى أحرف كبيرة، صغيرة، حالة العنوان، camelCase، و snake_case.",
      en: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.",
    },
    description: {
      ar: "تغيير حالة النصوص البرمجية والإنجليزية فورياً مع خيارات متعددة لتنسيق المتغيرات والعناوين.",
      en: "Instant text case converter tool with options for UPPERCASE, lowercase, Title Case, camelCase.",
    },
    icon: "Type",
    category: "text",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/case-converter",
    keywords: ["case converter", "uppercase", "lowercase", "تحويل النصوص"],
  },
  {
    slug: "text-cleaner",
    title: {
      ar: "منظف النصوص ومزيل التكرار",
      en: "Text Cleaner & Duplicate Remover",
    },
    shortDescription: {
      ar: "مسح المسافات الزائدة، إزالة الأسطر المكررة، حذف وسم HTML، وتنظيف القوائم.",
      en: "Clean extra spaces, remove duplicate lines, strip HTML tags, and format text list.",
    },
    description: {
      ar: "تنظيف وتنسيق النصوص والقوائم بحذف السطور المكررة والمسافات الزائدة والأكواد بسرعة.",
      en: "Format raw text by removing duplicate lines, stripping extra whitespaces, and HTML elements.",
    },
    icon: "Eraser",
    category: "text",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/text-cleaner",
    keywords: [
      "text cleaner",
      "remove duplicates",
      "إزالة التكرار",
      "تنظيف النص",
    ],
  },
  {
    slug: "json-formatter",
    title: { ar: "منسق وفاحص ملفات JSON", en: "JSON Formatter & Validator" },
    shortDescription: {
      ar: "تنسيق، تجميل، ضغط، وفحص صحة كود JSON مع إظهار الأخطاء بالسطر.",
      en: "Format, beautify, minify, and validate JSON data structure with syntax highlighting.",
    },
    description: {
      ar: "أداة المطورين لتنسيق وفحص صيغة JSON واكتشاف أخطاء القواعد وتصحيحها فوراً.",
      en: "Validate JSON syntax, beautify minified JSON, compact JSON objects, and inspect trees.",
    },
    icon: "Code2",
    category: "developers",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/json-formatter",
    keywords: ["json formatter", "json validator", "تنسيق json", "كود json"],
  },
  {
    slug: "base64-encoder-decoder",
    title: { ar: "مشفّر ومفكك شفرة Base64", en: "Base64 Encoder & Decoder" },
    shortDescription: {
      ar: "تشفير النصوص والملفات إلى ترميز Base64 أو فك تشفيرها إلى نص أصلي.",
      en: "Encode text or files into Base64 strings or decode Base64 back into readable content.",
    },
    description: {
      ar: "تحويل وتشفير البيانات والنصوص إلى صيغة Base64 وفك الشفرة فورياً في المتصفح.",
      en: "Convert plain text and files to Base64 encoded strings or decode Base64 output back.",
    },
    icon: "Binary",
    category: "developers",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/base64-encoder-decoder",
    keywords: ["base64 encode", "base64 decode", "تشفير base64", "فك تشفير"],
  },
  {
    slug: "uuid-generator",
    title: { ar: "مولد معرّفات UUID v4", en: "UUID / GUID Generator" },
    shortDescription: {
      ar: "توليد معرّفات فريدة عشوائية UUID v4 لقواعد البيانات والتطبيقات بسرعة.",
      en: "Generate bulk unique RFC-compliant UUID v4 identifiers for databases and apps.",
    },
    description: {
      ar: "توليد معرّفات UUID v4 عشوائية وفريدة بالجملة لاستخدامها كـ Primary Keys في البرمجة.",
      en: "Generate single or bulk Version-4 UUID (Universally Unique Identifiers).",
    },
    icon: "Fingerprint",
    category: "developers",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/uuid-generator",
    keywords: ["uuid generator", "guid", "توليد uuid", "معرف فريد"],
  },
  {
    slug: "lorem-ipsum-generator",
    title: {
      ar: "مولد النص الشكلي (لوريم إيبسوم)",
      en: "Lorem Ipsum Placeholder Generator",
    },
    shortDescription: {
      ar: "توليد نصوص شكيلة باللاتينية والعربية لتصميم المواقع والمطبوعات.",
      en: "Generate Latin placeholder text by paragraphs, words, or lists for designs.",
    },
    description: {
      ar: "إنشاء نص تجريبي شكلاني لتعبئة التصاميم والموقع بعدد الفقرات والكلمات المطلوبة.",
      en: "Generate dummy Latin or Arabic filler text by paragraph count or word limit.",
    },
    icon: "FileCode",
    category: "developers",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/lorem-ipsum-generator",
    keywords: ["lorem ipsum", "placeholder text", "نص شكلي", "لوريم ايبسوم"],
  },
  {
    slug: "meta-tag-generator",
    title: {
      ar: "مولد الميتا تاج و OpenGraph لـ SEO",
      en: "SEO Meta Tag & OpenGraph Generator",
    },
    shortDescription: {
      ar: "توليد وسوم Meta Tags و OpenGraph لتحسين ظهور الموقع في جوجل والتواصل.",
      en: "Create Google title, description, and OpenGraph social media preview meta tags.",
    },
    description: {
      ar: "إنشاء الأكواد المصدريّة للميتا تاج وشريحة معاينة الفيسبوك وتويتر لرفع ترتيب الموقع.",
      en: "Generate optimized HTML Meta Tags including Title, Description, and OpenGraph cards.",
    },
    icon: "Tag",
    category: "seo",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/meta-tag-generator",
    keywords: ["meta tag generator", "seo meta", "opengraph", "ميتا تاج"],
  },
  {
    slug: "robots-txt-generator",
    title: { ar: "مولد ملف Robots.txt", en: "Robots.txt Generator" },
    shortDescription: {
      ar: "إنشاء ملف robots.txt لتوجيه محركات البحث ومنع زحف الصفحات الخاصة.",
      en: "Generate clean robots.txt rules to direct search engine crawlers and bots.",
    },
    description: {
      ar: "أداة إنتاج ملف تعليمات محركات البحث robots.txt لحماية المجلدات وتعيين رابط الخارطة.",
      en: "Easily build a custom robots.txt file to allow or disallow web crawlers.",
    },
    icon: "Bot",
    category: "seo",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/robots-txt-generator",
    keywords: ["robots txt", "robots generator", "ملف روبوتس", "سيو"],
  },
  {
    slug: "utm-builder",
    title: {
      ar: "مولد روابط الحملات الإعلانية UTM",
      en: "UTM URL Campaign Builder",
    },
    shortDescription: {
      ar: "إنشاء روابط حملات التسويق مع برامترات UTM لتتبع الأداء في جوجل أناليتكس.",
      en: "Build campaign tracking links with UTM source, medium, campaign name, and term.",
    },
    description: {
      ar: "إضافة وسوم تتبع الحملات UTM للروابط لمعرفة مصدر الزيارات في Google Analytics بسهولة.",
      en: "Add Google Analytics tracking parameters (utm_source, utm_medium) to URLs.",
    },
    icon: "Link",
    category: "seo",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/utm-builder",
    keywords: ["utm builder", "utm generator", "تتبع الحملات", "روابط تسويق"],
  },
  {
    slug: "quote-generator",
    title: { ar: "مولد عروض الأسعار", en: "Price Quote Generator" },
    shortDescription: {
      ar: "إنشاء وتحميل عروض الأسعار والتقديرات المالية للعملاء بصيغة PDF.",
      en: "Create professional business price quotes and estimates to export as PDF.",
    },
    description: {
      ar: "إنشاء وثيقة عرض سعر رسمية شاملاً فترة الصلاحية والخصومات والتنزيل في ملف PDF.",
      en: "Create formal price quote estimates with valid-until dates, terms, and tax calculations.",
    },
    icon: "FileSpreadsheet",
    category: "business",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/quote-generator",
    keywords: ["quote generator", "عرض سعر", "تقدير سعر", "pdf quote"],
  },
  {
    slug: "po-generator",
    title: {
      ar: "مولد أوامر الشراء (PO)",
      en: "Purchase Order (PO) Generator",
    },
    shortDescription: {
      ar: "إصدار أمر شراء رسمي (PO) للموردين مع جدول المنتجات والضرائب.",
      en: "Generate supplier purchase orders with vendor details, items, and tax breakdown.",
    },
    description: {
      ar: "توليد أوامر شراء احترافية للموردين والشركات بصيغة PDF مطابقة للمعايير التجاريّة.",
      en: "Build compliant commercial purchase order documents for vendors and inventory suppliers.",
    },
    icon: "ShoppingBag",
    category: "business",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/po-generator",
    keywords: ["purchase order", "امر شراء", "po generator", "موردين"],
  },
  {
    slug: "timesheet-calculator",
    title: {
      ar: "حاسبة ساعات العمل والدوام",
      en: "Employee Timesheet Calculator",
    },
    shortDescription: {
      ar: "حساب ساعات العمل اليومية والأسبوعية واستقطاع الاستراحات والمستحقات.",
      en: "Calculate daily and weekly work hours, break deductions, and total pay earned.",
    },
    description: {
      ar: "حساب إجمالي ساعات حضور وانصراف الموظفين والعمل الإضافي وقيمة الأجر المستحق.",
      en: "Calculate total hours worked, overtime rates, meal break deductions, and gross salary.",
    },
    icon: "Clock",
    category: "business",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/timesheet-calculator",
    keywords: [
      "timesheet calculator",
      "حاسبة ساعات العمل",
      "ساعات الدوام",
      "رواتب",
    ],
  },
  {
    slug: "sitemap-generator",
    title: { ar: "مولد خريطة الموقع XML Sitemap", en: "XML Sitemap Generator" },
    shortDescription: {
      ar: "توليد كود خريطة الموقع XML Sitemap من قائمة الروابط لرفعه لمشرّفي المواقع.",
      en: "Generate XML sitemap structure from a list of site URLs for Search Console.",
    },
    description: {
      ar: "إنشاء خريطة موقع سريعة بصيغة XML المتوافقة مع محركات البحث جوجل وبينج.",
      en: "Build Google-compliant XML sitemaps from custom link inputs with priority settings.",
    },
    icon: "Sitemap",
    category: "seo",
    badge: { ar: "جديد", en: "New" },
    href: "/tools/sitemap-generator",
    keywords: ["xml sitemap", "sitemap generator", "خريطة الموقع", "جوجل"],
  },
  {
    slug: "color-palette-generator",
    title: {
      ar: "مولد لوحات الألوان",
      en: "Color Palette Generator",
    },
    shortDescription: {
      ar: "أنشئ لوحات ألوان متناسقة وانسخ أكواد HEX لتصاميمك مجاناً.",
      en: "Build harmonious colour palettes and copy HEX codes for your designs, free.",
    },
    description: {
      ar: "أداة مجانية لإنشاء لوحات ألوان متناسقة (مكملة، متقابلة، أحادية) انطلاقاً من لون أساسي، مع نسخ أكواد HEX وRGB مباشرة للاستخدام في التصميم أو CSS.",
      en: "A free tool that generates harmonious colour palettes (complementary, analogous, triadic, monochromatic) from a base colour, with one-click HEX and RGB values ready to paste into a design or stylesheet.",
    },
    icon: "Palette",
    category: "images",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/color-palette-generator",
    keywords: ["color palette", "colour palette", "hex", "لوحة ألوان", "مولد ألوان"],
    features: [
      { ar: "توليد لوحات متناسقة من لون واحد", en: "Generate harmonious palettes from one colour" },
      { ar: "نسخ أكواد HEX وRGB بضغطة", en: "Copy HEX and RGB values instantly" },
      { ar: "يعمل بالكامل داخل المتصفح", en: "Runs entirely in the browser" },
    ],
    faqs: [
      {
        question: { ar: "هل الأداة مجانية؟", en: "Is the tool free?" },
        answer: { ar: "نعم، مجانية بالكامل وبدون تسجيل.", en: "Yes, it is completely free and requires no signup." },
      },
    ],
  },
  {
    slug: "csv-to-excel",
    title: {
      ar: "تحويل CSV إلى Excel",
      en: "CSV to Excel Converter",
    },
    shortDescription: {
      ar: "حوّل ملفات CSV إلى مصنفات Excel بصيغة xlsx داخل متصفحك.",
      en: "Convert CSV files into .xlsx Excel workbooks inside your browser.",
    },
    description: {
      ar: "أداة مجانية لتحويل ملفات CSV النصية إلى مصنفات Excel جاهزة للتعديل، دون رفع بياناتك إلى أي سيرفر؛ تتم العملية بالكامل على جهازك.",
      en: "A free converter that turns plain CSV files into editable Excel workbooks. The conversion happens entirely in your browser, so your data never leaves your device.",
    },
    icon: "FileSpreadsheet",
    category: "excel",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/csv-to-excel",
    keywords: ["csv to excel", "تحويل csv", "xlsx", "ملفات إكسيل"],
    features: [
      { ar: "تحويل سريع لملفات CSV كبيرة", en: "Fast conversion for large CSV files" },
      { ar: "لا يتم رفع الملف إلى أي سيرفر", en: "Nothing is uploaded to a server" },
      { ar: "الحفاظ على الصفوف والأعمدة كما هي", en: "Rows and columns preserved exactly" },
    ],
    faqs: [
      {
        question: { ar: "هل يتم حفظ ملفاتي على السيرفر؟", en: "Are my files stored on your server?" },
        answer: { ar: "لا، تحدث كل عملية التحويل محلياً داخل متصفحك.", en: "No. All conversion happens locally in your browser." },
      },
    ],
  },
  {
    slug: "discount-calculator",
    title: {
      ar: "حاسبة الخصومات",
      en: "Discount Calculator",
    },
    shortDescription: {
      ar: "احسب سعر ما بعد الخصم ومقدار التوفير فوراً.",
      en: "Work out the sale price and how much you save instantly.",
    },
    description: {
      ar: "حاسبة مجانية للخصومات: أدخل السعر الأصلي ونسبة الخصم لتحصل على السعر النهائي ومقدار التوفير، أو احسب نسبة الخصم من السعرين.",
      en: "A free discount calculator: enter the original price and the discount percentage to get the final price and the amount saved, or calculate the discount percentage from two prices.",
    },
    icon: "Percent",
    category: "calculator",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/discount-calculator",
    keywords: ["discount calculator", "حاسبة خصم", "نسبة الخصم", "سعر بعد الخصم"],
    features: [
      { ar: "حساب السعر النهائي والتوفير", en: "Final price and savings" },
      { ar: "حساب نسبة الخصم من سعرين", en: "Discount percentage from two prices" },
      { ar: "نتائج فورية وواضحة", en: "Instant, clearly labelled results" },
    ],
    faqs: [
      {
        question: { ar: "هل تدعم الخصومات المتعددة؟", en: "Does it support stacked discounts?" },
        answer: { ar: "نعم، يمكنك تطبيق خصم بعد آخر ومقارنة النتيجة.", en: "Yes, you can apply one discount after another and compare results." },
      },
    ],
  },
  {
    slug: "excel-to-csv",
    title: {
      ar: "تحويل Excel إلى CSV",
      en: "Excel to CSV Converter",
    },
    shortDescription: {
      ar: "استخرج بيانات مصنفات Excel إلى ملفات CSV نظيفة.",
      en: "Extract data from Excel workbooks into clean CSV files.",
    },
    description: {
      ar: "أداة مجانية لتحويل ملفات Excel (xlsx) إلى ملفات CSV قابلة للاستيراد في أي نظام، مع الحفاظ على ترتيب الأعمدة والقيم.",
      en: "A free tool that converts Excel (.xlsx) workbooks into plain CSV files you can import anywhere, keeping column order and values intact.",
    },
    icon: "FileSpreadsheet",
    category: "excel",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/excel-to-csv",
    keywords: ["excel to csv", "تحويل إكسيل", "csv", "تصدير بيانات"],
    features: [
      { ar: "تحويل xlsx إلى CSV", en: "Convert .xlsx to CSV" },
      { ar: "معالجة محلية بدون رفع", en: "Local processing, no upload" },
      { ar: "الحفاظ على القيم الأصلية", en: "Original values preserved" },
    ],
    faqs: [
      {
        question: { ar: "هل يدعم عدة أوراق عمل؟", en: "Does it support multiple sheets?" },
        answer: { ar: "يمكنك تحويل كل ورقة على حدة.", en: "You can convert each sheet individually." },
      },
    ],
  },
  {
    slug: "image-compressor",
    title: {
      ar: "ضغط الصور",
      en: "Image Compressor",
    },
    shortDescription: {
      ar: "قلل حجم صور JPG وPNG وWebP دون فقدان واضح في الجودة.",
      en: "Reduce the size of JPG, PNG and WebP images without visible quality loss.",
    },
    description: {
      ar: "أداة مجانية لضغط الصور داخل المتصفح، مناسبة لتصغير صور المواقع والمتاجر قبل الرفع مع التحكم في مستوى الجودة.",
      en: "A free browser-based image compressor for shrinking photos and product shots before upload, with control over the quality level.",
    },
    icon: "Image",
    category: "images",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/image-compressor",
    keywords: ["image compressor", "ضغط الصور", "تصغير حجم الصورة", "webp"],
    features: [
      { ar: "ضغط JPG وPNG وWebP", en: "Compress JPG, PNG and WebP" },
      { ar: "التحكم في مستوى الجودة", en: "Adjustable quality level" },
      { ar: "لا يتم رفع الصور إلى السيرفر", en: "Images never leave your device" },
    ],
    faqs: [
      {
        question: { ar: "هل تقل جودة الصورة؟", en: "Does image quality drop?" },
        answer: { ar: "يمكنك ضبط الجودة والموازنة بين الحجم والوضوح.", en: "You control the quality balance between file size and sharpness." },
      },
    ],
  },
  {
    slug: "image-resizer",
    title: {
      ar: "تغيير حجم الصور",
      en: "Image Resizer",
    },
    shortDescription: {
      ar: "غيّر أبعاد الصور بالبكسل لتناسب الويب أو الطباعة.",
      en: "Resize images to exact pixel dimensions for web or print.",
    },
    description: {
      ar: "أداة مجانية لتغيير أبعاد الصور بدقة بالبكسل مع الحفاظ على النسبة أو تخصيص العرض والارتفاع، مناسبة لصور المتاجر ومنصات التواصل.",
      en: "A free tool for resizing images to exact pixel dimensions, either keeping the aspect ratio or setting width and height independently, ideal for store and social-media images.",
    },
    icon: "Scaling",
    category: "images",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/image-resizer",
    keywords: ["image resizer", "تغيير حجم الصورة", "resize image", "أبعاد الصور"],
    features: [
      { ar: "تحديد العرض والارتفاع بالبكسل", en: "Set width and height in pixels" },
      { ar: "الحفاظ على النسبة أو تخصيصها", en: "Keep or customise the aspect ratio" },
      { ar: "تنزيل فوري للنسخة الجديدة", en: "Instant download of the resized copy" },
    ],
    faqs: [
      {
        question: { ar: "هل تحافظ على شفافية PNG؟", en: "Is PNG transparency preserved?" },
        answer: { ar: "نعم، تحافظ الأداة على شفافية الصور عند الحاجة.", en: "Yes, transparency is preserved where it exists." },
      },
    ],
  },
  {
    slug: "image-to-pdf",
    title: {
      ar: "تحويل الصور إلى PDF",
      en: "Image to PDF Converter",
    },
    shortDescription: {
      ar: "اجمع عدة صور في ملف PDF واحد داخل متصفحك.",
      en: "Combine several images into a single PDF document in your browser.",
    },
    description: {
      ar: "أداة مجانية لتحويل صور JPG وPNG إلى ملف PDF واحد مرتب حسب ترتيب الصور، دون رفع أي ملف إلى السيرفر.",
      en: "A free tool that converts JPG and PNG images into one ordered PDF document, with no file uploaded to a server.",
    },
    icon: "FileImage",
    category: "pdf",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/image-to-pdf",
    keywords: ["image to pdf", "صور إلى pdf", "تحويل صور", "pdf"],
    features: [
      { ar: "دمج عدة صور في PDF واحد", en: "Combine multiple images into one PDF" },
      { ar: "ترتيب الصور قبل التحويل", en: "Reorder images before converting" },
      { ar: "معالجة محلية بالكامل", en: "Fully local processing" },
    ],
    faqs: [
      {
        question: { ar: "هل يمكن ترتيب الصور؟", en: "Can I reorder the images?" },
        answer: { ar: "نعم، رتب الصور قبل إنشاء الملف.", en: "Yes, arrange the images before generating the file." },
      },
    ],
  },
  {
    slug: "password-generator",
    title: {
      ar: "مولد كلمات المرور القوية",
      en: "Strong Password Generator",
    },
    shortDescription: {
      ar: "أنشئ كلمات مرور عشوائية قوية بطول ورموز مخصصة.",
      en: "Generate strong random passwords with a custom length and character rules.",
    },
    description: {
      ar: "أداة مجانية لتوليد كلمات مرور عشوائية آمنة مع تحديد الطول واستخدام الأحرف الكبيرة والصغيرة والأرقام والرموز، دون إرسال أي بيانات.",
      en: "A free generator for secure random passwords, with configurable length and options for upper case, lower case, digits and symbols. Nothing is transmitted.",
    },
    icon: "KeyRound",
    category: "business",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/password-generator",
    keywords: ["password generator", "كلمة مرور قوية", "توليد كلمة سر"],
    features: [
      { ar: "طول ورموز قابلة للتخصيص", en: "Customisable length and symbols" },
      { ar: "توليد محلي عشوائي آمن", en: "Secure local random generation" },
      { ar: "نسخ سريع للحافظة", en: "One-click copy to clipboard" },
    ],
    faqs: [
      {
        question: { ar: "هل تُحفظ كلمات المرور؟", en: "Are generated passwords stored?" },
        answer: { ar: "لا، تُنشأ داخل المتصفح ولا تُرسل أو تُخزن.", en: "No. They are generated in the browser and never sent or stored." },
      },
    ],
  },
  {
    slug: "pdf-merge",
    title: {
      ar: "دمج ملفات PDF",
      en: "Merge PDF Files",
    },
    shortDescription: {
      ar: "اجمع عدة ملفات PDF في مستند واحد بالترتيب الذي تختاره.",
      en: "Combine several PDF files into one document in the order you choose.",
    },
    description: {
      ar: "أداة مجانية لدمج ملفات PDF متعددة في ملف واحد مع الترتيب والتحكم في الصفحات، دون رفع المستندات إلى السيرفر.",
      en: "A free tool for merging multiple PDF files into one, with control over the order and pages, without uploading the documents anywhere.",
    },
    icon: "Files",
    category: "pdf",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/pdf-merge",
    keywords: ["merge pdf", "دمج pdf", "ضم ملفات", "pdf merger"],
    features: [
      { ar: "دمج عدد غير محدود من الملفات", en: "Merge an unlimited number of files" },
      { ar: "ترتيب الملفات قبل الدمج", en: "Reorder files before merging" },
      { ar: "معالجة داخل المتصفح", en: "Processed in the browser" },
    ],
    faqs: [
      {
        question: { ar: "هل تدعم الملفات الكبيرة؟", en: "Are large files supported?" },
        answer: { ar: "نعم، حسب ذاكرة المتصفح المتاحة.", en: "Yes, subject to your browser's available memory." },
      },
    ],
  },
  {
    slug: "pdf-split",
    title: {
      ar: "تقسيم ملفات PDF",
      en: "Split PDF Files",
    },
    shortDescription: {
      ar: "قسّم ملف PDF أو استخرج نطاق صفحات في ثوانٍ.",
      en: "Split a PDF or extract a page range in seconds.",
    },
    description: {
      ar: "أداة مجانية لتقسيم مستندات PDF إلى ملفات منفصلة أو استخراج صفحات محددة، مع الحفاظ على الجودة الأصلية.",
      en: "A free tool for splitting PDF documents into separate files or extracting specific pages, preserving the original quality.",
    },
    icon: "Scissors",
    category: "pdf",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/pdf-split",
    keywords: ["split pdf", "تقسيم pdf", "استخراج صفحات", "pdf splitter"],
    features: [
      { ar: "تقسيم حسب النطاق أو كل صفحة", en: "Split by page range or every page" },
      { ar: "استخراج صفحات محددة", en: "Extract selected pages" },
      { ar: "جودة أصلية دون إعادة ضغط", en: "Original quality preserved" },
    ],
    faqs: [
      {
        question: { ar: "هل يمكن تقسيم ملف محمي بكلمة مرور؟", en: "Can I split a password-protected file?" },
        answer: { ar: "يجب إزالة كلمة المرور أولاً.", en: "The password must be removed first." },
      },
    ],
  },
  {
    slug: "percentage-calculator",
    title: {
      ar: "حاسبة النسبة المئوية",
      en: "Percentage Calculator",
    },
    shortDescription: {
      ar: "احسب النسب والتغير النسبي والزيادة والنقصان بسهولة.",
      en: "Work out percentages, percentage change, increases and decreases easily.",
    },
    description: {
      ar: "حاسبة مجانية للنسب المئوية تشمل نسبة من رقم، ونسبة رقم من آخر، والتغير النسبي بين قيمتين، مع عرض المعادلة المستخدمة.",
      en: "A free percentage calculator covering a percentage of a number, one number as a percentage of another, and the percentage change between two values, with the formula shown.",
    },
    icon: "Percent",
    category: "calculator",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/percentage-calculator",
    keywords: ["percentage calculator", "حاسبة نسبة", "النسبة المئوية", "percent change"],
    features: [
      { ar: "أنواع متعددة من حسابات النسبة", en: "Several percentage calculation modes" },
      { ar: "عرض المعادلة المستخدمة", en: "Formula shown with the result" },
      { ar: "نتائج فورية", en: "Instant results" },
    ],
    faqs: [
      {
        question: { ar: "هل تدعم النسب السالبة؟", en: "Does it handle negative changes?" },
        answer: { ar: "نعم، وتظهر النتيجة كزيادة أو نقصان.", en: "Yes, and the result is labelled as an increase or a decrease." },
      },
    ],
  },
  {
    slug: "profit-margin-calculator",
    title: {
      ar: "حاسبة هامش الربح",
      en: "Profit Margin Calculator",
    },
    shortDescription: {
      ar: "احسب الربح وهامش الربح ومعدل الزيادة من التكلفة والسعر.",
      en: "Calculate profit, margin and markup from cost and selling price.",
    },
    description: {
      ar: "حاسبة مجانية لهامش الربح: أدخل التكلفة وسعر البيع لتحصل على الربح الإجمالي وهامش الربح ونسبة الزيادة، أو اشتق سعر البيع من هامش مستهدف.",
      en: "A free profit-margin calculator: enter cost and selling price to get gross profit, margin and markup, or derive a selling price from a target margin.",
    },
    icon: "TrendingUp",
    category: "calculator",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/profit-margin-calculator",
    keywords: ["profit margin", "هامش الربح", "حاسبة ربح", "markup"],
    features: [
      { ar: "حساب الربح والهامش والزيادة", en: "Profit, margin and markup" },
      { ar: "اشتقاق السعر من هامش مستهدف", en: "Derive a price from a target margin" },
      { ar: "عرض المعادلة", en: "Formula displayed" },
    ],
    faqs: [
      {
        question: { ar: "هل يفرق بين الهامش والزيادة؟", en: "Does it distinguish margin and markup?" },
        answer: { ar: "نعم، يعرض كلاً منهما بشكل منفصل.", en: "Yes, both are shown separately." },
      },
    ],
  },
  {
    slug: "word-counter",
    title: {
      ar: "عداد الكلمات والحروف",
      en: "Word Counter",
    },
    shortDescription: {
      ar: "عد الكلمات والحروف والجمل وقدّر وقت القراءة.",
      en: "Count words, characters and sentences, and estimate reading time.",
    },
    description: {
      ar: "أداة مجانية لعد الكلمات والحروف (مع وبدون مسافات) والجمل والفقرات، مع تقدير وقت القراءة، مناسبة للمقالات ومنشورات التواصل.",
      en: "A free counter for words, characters (with and without spaces), sentences and paragraphs, plus an estimated reading time, useful for articles and social posts.",
    },
    icon: "Type",
    category: "text",
    badge: { ar: "مجاني", en: "Free Tool" },
    href: "/tools/word-counter",
    keywords: ["word counter", "عداد الكلمات", "عدد الحروف", "حساب الكلمات"],
    features: [
      { ar: "عد الكلمات والحروف والجمل", en: "Words, characters and sentences" },
      { ar: "تقدير وقت القراءة", en: "Estimated reading time" },
      { ar: "مؤشرات فورية أثناء الكتابة", en: "Live counters while typing" },
    ],
    faqs: [
      {
        question: { ar: "هل النص يُرسل إلى السيرفر؟", en: "Is the text sent to a server?" },
        answer: { ar: "لا، يتم العد داخل متصفحك فقط.", en: "No. Counting happens only in your browser." },
      },
    ],
  },
];
