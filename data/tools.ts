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
];
