import { CommentRecord, ProficiencyLevelNumber, SubjectId } from '../types/curriculum';
import { ARABIC_B_MAPPING_NOTES } from './curriculumConfig';

interface DescriptorTemplate {
  en: string;
  ar: string;
}

/**
 * Curated progression descriptors per criterion & proficiency level (1–7),
 * calibrated by grade band so Arabic A (Gr 6–12) reflects UAE MOE First Language rigor
 * and Arabic B (Gr 6–10) reflects scaffolded UAE Additional Language & IB MYP Language Acquisition outcomes.
 */

type BandKey =
  | 'AA_6_7'
  | 'AA_8_9'
  | 'AA_10_12'
  | 'AB_6_7'
  | 'AB_8'
  | 'AB_9_10';

function getGradeBand(subject: SubjectId, grade: number): BandKey {
  if (subject === 'Arabic A') {
    if (grade <= 7) return 'AA_6_7';
    if (grade <= 9) return 'AA_8_9';
    return 'AA_10_12';
  }
  if (grade <= 7) return 'AB_6_7';
  if (grade === 8) return 'AB_8';
  return 'AB_9_10';
}

const ARABIC_A_BANK: Record<string, Record<BandKey & ('AA_6_7' | 'AA_8_9' | 'AA_10_12'), Record<ProficiencyLevelNumber, DescriptorTemplate[]>>> = {
  'aa-listening': {
    AA_6_7: {
      1: [
        {
          en: 'Identify the main topic and key explicit facts when listening to short, clearly articulated Arabic audio passages',
          ar: 'تحديد الموضوع الرئيس والحقائق الصريحة الأساسية عند الاستماع إلى نصوص عربية قصيرة وواضحة الإلقاء',
        },
        {
          en: 'Follow multi-step spoken classroom instructions by noting down keywords in Arabic',
          ar: 'اتباع التعليمات الصفية الشفهية متعددة الخطوات من خلال تدوين الكلمات المفتاحية باللغة العربية',
        },
      ],
      2: [
        {
          en: 'Distinguish between main ideas and supporting examples during guided listening tasks',
          ar: 'التمييز بين الأفكار الرئيسة والأمثلة الداعمة أثناء مهام الاستماع الموجهة',
        },
        {
          en: 'Sequence events accurately after listening to narrative or informational recordings',
          ar: 'ترتيب الأحداث بدقة بعد الاستماع إلى تسجيلات سردية أو معلوماتية',
        },
      ],
      3: [
        {
          en: 'Summarise spoken passages in clear Modern Standard Arabic using organised note-taking frames',
          ar: 'تلخيص المقاطع المسموعة باللغة العربية الفصحى الواضحة باستخدام هياكل تدوين ملاحظات منظمة',
        },
        {
          en: 'Recognise the speaker’s purpose and basic tone in familiar classroom discussions',
          ar: 'تعرّف غرض المتحدث ونبرته الأساسية في النقاشات الصفية المألوفة',
        },
      ],
      4: [
        {
          en: 'Compare viewpoints expressed by different speakers in structured audio dialogues',
          ar: 'مقارنة وجهات النظر التي يعرضها متحدثون مختلفون في الحوارات الصوتية المنظمة',
        },
        {
          en: 'Infer unstated feelings or motivations of characters from vocal cues and context',
          ar: 'استنتاج المشاعر أو الدوافع غير المصرح بها للشخصيات من خلال النبرة الصوتية والسياق',
        },
      ],
      5: [
        {
          en: 'Extract implicit meanings and supporting evidence independently from extended informational broadcasts',
          ar: 'استخلاص المعاني الضمنية والأدلة الداعمة باستقلالية من المواد الإخبارية والمعلوماتية الممتدة',
        },
        {
          en: 'Formulate relevant follow-up questions that build thoughtfully on peers’ spoken contributions',
          ar: 'صياغة أسئلة استيضاحية وثيقة الصلة تبني بوعي على مداخلات الزملاء الشفهية',
        },
      ],
      6: [
        {
          en: 'Evaluate the strength of a speaker’s reasoning and distinguish fact from opinion in oral texts',
          ar: 'تقويم قوة استدلال المتحدث والتمييز بين الحقيقة والرأي في النصوص الشفهية',
        },
        {
          en: 'Synthesise spoken information from multiple audio sources into a cohesive oral or written response',
          ar: 'تركيب المعلومات المسموعة من مصادر صوتية متعددة في استجابة شفهية أو كتابية متماسكة',
        },
      ],
      7: [
        {
          en: 'Analyse critically rhetorical tone, persuasive strategies, and subtle shifts in perspective during complex debates',
          ar: 'التحليل النقدي للنبرة البلاغية واستراتيجيات الإقناع والتحولات الدقيقة في وجهات النظر أثناء المناظرات المركبة',
        },
        {
          en: 'Interpret nuanced cultural references and figurative expressions effortlessly in authentic Classical and Modern Arabic recordings',
          ar: 'تفسير الإشارات الثقافية الدقيقة والتعبيرات المجازية بيسر في التسجيلات الأصيلة بالفصحى التراثية والمعاصرة',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Recall central ideas and explicit details from structured spoken presentations using graphic organisers',
          ar: 'استرجاع الأفكار المحورية والتفاصيل الصريحة من العروض الشفهية المنظمة باستخدام المنظمات التخطيطية',
        },
        {
          en: 'Identify key transitional markers in spoken Arabic to track shifts between topics',
          ar: 'تحديد أدوات الربط الانتقالية الأساسية في الخطاب المسموع لتتبع التحول بين الموضوعات',
        },
      ],
      2: [
        {
          en: 'Group related details from audio texts under appropriate thematic headings',
          ar: 'تصنيف التفاصيل المترابطة من النصوص الصوتية تحت عناوين موضوعية مناسبة',
        },
        {
          en: 'Verify comprehension of spoken instructions and arguments by paraphrasing them briefly',
          ar: 'التحقق من فهم التعليمات والحجج المسموعة عبر إعادة صياغتها بإيجاز',
        },
      ],
      3: [
        {
          en: 'Identify implied meanings, speaker attitudes, and cause-and-effect links in spoken texts',
          ar: 'تحديد المعاني الضمنية ومواقف المتحدثين وعلاقات السبب والنتيجة في النصوص المسموعة',
        },
        {
          en: 'Take structured Cornell-style notes capturing claims and supporting examples during lectures',
          ar: 'تدوين ملاحظات منظمة تلتقط الادعاءات والأمثلة الداعمة أثناء الشرح والعروض',
        },
      ],
      4: [
        {
          en: 'Trace how a speaker develops an argument across an extended talk or interview',
          ar: 'تتبع كيفية بناء المتحدث لحجته عبر حديث ممتد أو مقابلة حوارية',
        },
        {
          en: 'Distinguish credible evidence from generalisations in persuasive audio recordings',
          ar: 'التمييز بين الأدلة الموثوقة والتعميمات في التسجيلات الإقناعية',
        },
      ],
      5: [
        {
          en: 'Analyse how vocal emphasis, pacing, and word choice shape the listener’s response',
          ar: 'تحليل أثر النبر الصوتي والإيقاع واختيار الألفاظ في توجيه استجابة المستمع',
        },
        {
          en: 'Respond constructively to opposing viewpoints in seminars by citing specific points heard',
          ar: 'الاستجابة البناءة لوجهات النظر المخالفة في الحلقات النقاشية مع الاستشهاد بنقاط محددة مما سُمع',
        },
      ],
      6: [
        {
          en: 'Evaluate bias, rhetorical appeal, and logical consistency across competing spoken arguments',
          ar: 'تقويم التحيز والاستمالة البلاغية والاتساق المنطقي عبر الحجج الشفهية المتقابلة',
        },
        {
          en: 'Integrate insights from audio documentaries into analytical written critiques with precision',
          ar: 'دمج الرؤى المستخلصة من الوثائقيات الصوتية في كتابات نقدية تحليلية بدقة',
        },
      ],
      7: [
        {
          en: 'Deconstruct sophisticated rhetorical devices and unspoken assumptions in formal speeches and literary recitations',
          ar: 'تفكيك الأساليب البلاغية الرفيعة والافتراضات المسكوت عنها في الخطب الرسمية والإلقاءات الأدبية',
        },
        {
          en: 'Synthesise complex, rapid-paced academic discourse into nuanced, critically balanced commentary',
          ar: 'تركيب الخطاب الأكاديمي المعقد وسريع الإيقاع في تعليق نقدي متوازن ودقيق',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Capture core theses and primary supporting facts from academic lectures using guided listening templates',
          ar: 'التقاط الأطروحات الرئيسة والحقائق الداعمة الأولية من المحاضرات الأكاديمية باستخدام قوالب استماع موجهة',
        },
        {
          en: 'Clarify unfamiliar classical or discipline-specific terms heard in formal discourse using context clues',
          ar: 'توضيح المصطلحات التراثية أو التخصصية غير المألوفة في الخطاب الرسمي بالاعتماد على القرائن السياقية',
        },
      ],
      2: [
        {
          en: 'Outline the structural progression of formal speeches and panel discussions accurately',
          ar: 'رسم المخطط البنائي للخطب الرسمية والندوات الحوارية بدقة',
        },
        {
          en: 'Differentiate primary claims from illustrative anecdotes in extended spoken texts',
          ar: 'التفريق بين الادعاءات الرئيسة والأمثلة التوضيحية في النصوص المسموعة الممتدة',
        },
      ],
      3: [
        {
          en: 'Infer implicit ideological or cultural stances underlying formal Arabic media commentaries',
          ar: 'استنتاج المواقف الفكرية أو الثقافية الضمنية الكامنة وراء التعليقات الإعلامية العربية الرسمية',
        },
        {
          en: 'Paraphrase complex spoken arguments concisely while preserving original nuance',
          ar: 'إعادة صياغة الحجج الشفهية المعقدة بإيجاز مع الحفاظ على دلالاتها الدقيقة',
        },
      ],
      4: [
        {
          en: 'Assess the validity and relevance of spoken evidence presented in formal debates',
          ar: 'تقييم مصداقية الأدلة الشفهية وملاءمتها في المناظرات الرسمية',
        },
        {
          en: 'Connect ideas heard in literary symposiums to broader historical and textual themes',
          ar: 'ربط الأفكار المسموعة في الندوات الأدبية بالسياقات التاريخية والموضوعات النصية الأوسع',
        },
      ],
      5: [
        {
          en: 'Analyse rhetorical ethos, pathos, and logos within classical and contemporary Arabic oratory',
          ar: 'تحليل مقومات الإقناع الأخلاقي والعاطفي والمنطقي في الخطابة العربية التراثية والمعاصرة',
        },
        {
          en: 'Synthesise multi-speaker academic panels into well-evidenced oral or written summaries',
          ar: 'تلخيص الندوات الأكاديمية متعددة المتحدثين في خلاصات شفهية أو كتابية مدعومة بالشواهد',
        },
      ],
      6: [
        {
          en: 'Critique logical fallacies, subtle irony, and framing techniques in advanced media and literary discourse',
          ar: 'نقد المغالطات المنطقية والسخرية اللطيفة وتقنيات التأطير في الخطاب الإعلامي والأدبي المتقدم',
        },
        {
          en: 'Evaluate how register shifts between Classical and Modern Standard Arabic reinforce communicative intent',
          ar: 'تقويم دور التحول الأسلوبي بين الفصحى التراثية والمعاصرة في تعزيز القصد التواصلي',
        },
      ],
      7: [
        {
          en: 'Demonstrate authoritative critical listening by dissecting layered philosophical and literary lectures independently',
          ar: 'إظهار استماع نقدي رفيع المستوى عبر تفكيك المحاضرات الفلسفية والأدبية متعددة الطبقات باستقلالية',
        },
        {
          en: 'Respond extemporaneously to intricate academic arguments with precision, intellectual depth, and rhetorical poise',
          ar: 'الرد الارتجالي على الحجج الأكاديمية المتشابكة بدقة وعمق فكري واتزان بلاغي',
        },
      ],
    },
  },

  'aa-speaking': {
    AA_6_7: {
      1: [
        {
          en: 'Express simple ideas orally in Modern Standard Arabic using rehearsed sentence starters',
          ar: 'التعبير شفهياً عن أفكار بسيطة باللغة العربية الفصحى باستخدام بدايات جمل متدرب عليها',
        },
        {
          en: 'Maintain clear pronunciation and appropriate volume when reading prepared paragraphs aloud',
          ar: 'الحفاظ على وضوح النطق وملاءمة نبرة الصوت عند قراءة فقرات مُعدّة جهراً',
        },
      ],
      2: [
        {
          en: 'Deliver short, structured oral responses with reduced reliance on colloquial expressions',
          ar: 'تقديم استجابات شفهية قصيرة ومنظمة مع تقليل الاعتماد على التعبيرات العامية',
        },
        {
          en: 'Use basic connective words to link two or three ideas smoothly while speaking',
          ar: 'توظيف أدوات الربط الأساسية لوصل فكرتين أو ثلاث بسلاسة أثناء التحدث',
        },
      ],
      3: [
        {
          en: 'Organise short oral presentations with a clear introduction, supporting details, and closing statement',
          ar: 'تنظيم العروض الشفهية القصيرة بمقدمة واضحة وتفاصيل داعمة وخاتمة مناسبة',
        },
        {
          en: 'Maintain eye contact and expressive intonation when recounting stories or informational topics',
          ar: 'الحفاظ على التواصل البصري والتنغيم المعبر عند سرد القصص أو عرض الموضوعات المعلوماتية',
        },
      ],
      4: [
        {
          en: 'Sustain Modern Standard Arabic consistently during classroom discussions and group dialogues',
          ar: 'الالتزام بالتحدث بالفصحى بصورة متواصلة أثناء النقاشات الصفية والحوارات الجماعية',
        },
        {
          en: 'Support spoken opinions with relevant examples drawn from studied texts or personal observation',
          ar: 'دعم الآراء الشفهية بأمثلة مناسبة مستمدة من النصوص المدروسة أو الملاحظة الشخصية',
        },
      ],
      5: [
        {
          en: 'Speak fluently with accurate grammatical endings on familiar structures during structured presentations',
          ar: 'التحدث بطلاقة مع ضبط أواخر الكلمات في التراكيب المألوفة أثناء العروض المنظمة',
        },
        {
          en: 'Engage respectfully in dialogue by acknowledging peers’ points before presenting an alternative view',
          ar: 'المشاركة البناءة في الحوار عبر التفاعل مع أفكار الزملاء قبل عرض وجهة نظر بديلة',
        },
      ],
      6: [
        {
          en: 'Adapt tone, pace, and register purposefully to engage diverse audiences in formal speaking tasks',
          ar: 'تكييف النبرة والإيقاع والمستوى اللغوي بوعي لجذب الجمهور في مهام التحدث الرسمية',
        },
        {
          en: 'Incorporate vivid vocabulary and rhetorical questions to strengthen persuasive oral presentations',
          ar: 'تضمين مفردات معبرة وأسئلة بلاغية لتعزيز قوة العروض الشفهية الإقناعية',
        },
      ],
      7: [
        {
          en: 'Lead structured classroom debates eloquently using precise evidence, counterarguments, and refined Classical Arabic',
          ar: 'إدارة المناظرات الصفية المنظمة ببلاغة مستخدماً الشواهد الدقيقة والرد على الحجج المضادة وفصحى رصينة',
        },
        {
          en: 'Deliver expressive, unscripted literary reflections that demonstrate command of Arabic eloquence and rhythm',
          ar: 'تقديم تأملات أدبية ارتجالية معبرة تُظهر تمكناً من الفصاحة العربية وإيقاعها الجمالي',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Present prepared oral points clearly in Standard Arabic with the support of cue cards',
          ar: 'عرض النقاط الشفهية المُعدّة بوضوح بالفصحى بالاستعانة ببطاقات التذكير',
        },
        {
          en: 'Minimise pauses and colloquial substitutions during short structured speaking turns',
          ar: 'تقليل التوقفات واستبدال الألفاظ العامية أثناء الأدوار الكلامية القصيرة المنظمة',
        },
      ],
      2: [
        {
          en: 'Articulate complete, grammatically sound sentences when answering analytical questions orally',
          ar: 'صياغة جمل تامة وسليمة نحوياً عند الإجابة شفهياً عن الأسئلة التحليلية',
        },
        {
          en: 'Use transitional phrases to signal shifts between claims and examples in oral summaries',
          ar: 'استخدام عبارات انتقالية للإشارة إلى الانتقال بين الادعاءات والأمثلة في الملخصات الشفهية',
        },
      ],
      3: [
        {
          en: 'Deliver cohesive three-minute presentations combining visual aids with fluent Standard Arabic commentary',
          ar: 'تقديم عروض شفهية متماسكة لمدة ثلاث دقائق تدمج الوسائل البصرية مع تعليق فصيح وطلق',
        },
        {
          en: 'Justify personal viewpoints during discussions by referencing specific textual details',
          ar: 'تبرير الآراء الشخصية أثناء النقاش بالاستناد إلى تفاصيل نصية محددة',
        },
      ],
      4: [
        {
          en: 'Respond thoughtfully to unexpected follow-up questions while maintaining formal Arabic register',
          ar: 'الإجابة الواعية عن الأسئلة الاستيضاحية المفاجئة مع الحفاظ على مستوى الفصحى الرسمي',
        },
        {
          en: 'Modulate voice pitch and pacing effectively to highlight key arguments during persuasive speeches',
          ar: 'توظيف تنويع الصوت والإيقاع بفاعلية لإبراز الحجج الرئيسة في الخطب الإقناعية',
        },
      ],
      5: [
        {
          en: 'Construct balanced oral arguments that anticipate and address counter-perspectives clearly',
          ar: 'بناء حجج شفهية متوازنة تستبق وجهات النظر المضادة وتناقشها بوضوح',
        },
        {
          en: 'Recite poetry and prose passages with accurate metre awareness, vocal expression, and phonetic precision',
          ar: 'إلقاء النصوص الشعرية والنثرية بوعي إيقاعي وتعبير صوتي ودقة مخارج الحروف',
        },
      ],
      6: [
        {
          en: 'Synthesise complex literary interpretations orally with sophisticated lexical choice and syntactic control',
          ar: 'عرض تفسيرات أدبية مركبة شفهياً باختيار معجمي رفيع وضبط تركيبي متقن',
        },
        {
          en: 'Facilitate group seminars effectively by summarising consensus and probing underlying assumptions',
          ar: 'تيسير الحلقات النقاشية بفاعلية عبر تلخيص نقاط الاتفاق واستقصاء الافتراضات الكامنة',
        },
      ],
      7: [
        {
          en: 'Deliver compelling rhetorical speeches demonstrating mastery of figurative imagery, cadence, and audience persuasion',
          ar: 'إلقاء خطب بليغة تُظهر التمكن من التصوير البياني والإيقاع الصوتي وإقناع المتلقي',
        },
        {
          en: 'Engage in spontaneous intellectual debate with precision, eloquence, and authoritative textual command',
          ar: 'خوض النقاشات الفكرية الارتجالية بدقة وفصاحة وتمكن مرجعي من الشواهد النصية',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Articulate structured oral summaries of studied texts in clear Modern Standard Arabic using outline prompts',
          ar: 'صياغة ملخصات شفهية منظمة للنصوص المدروسة بالفصحى الواضحة بالاستعانة بمخطط توجيهي',
        },
        {
          en: 'Monitor pronunciation of key grammatical endings during prepared oral readings',
          ar: 'مراقبة نطق أواخر الكلمات الإعرابية الأساسية أثناء القراءة الشفهية المُعدّة',
        },
      ],
      2: [
        {
          en: 'Present analytical observations coherently without reverting to informal dialectal phrasing',
          ar: 'عرض الملاحظات التحليلية بتماسك دون العودة إلى التعبيرات العامية غير الرسمية',
        },
        {
          en: 'Use formal academic connectors to link literary evidence to spoken claims',
          ar: 'استخدام الروابط الأكاديمية الرسمية لربط الشواهد الأدبية بالادعاءات الشفهية',
        },
      ],
      3: [
        {
          en: 'Sustain coherent formal speech in seminar discussions while integrating accurate subject terminology',
          ar: 'الحفاظ على خطاب رسمي متماسك في الندوات الصفية مع دمج المصطلحات الأدبية الدقيقة',
        },
        {
          en: 'Defend interpretations orally using structured reasoning and relevant textual citations',
          ar: 'الدفاع عن التفسيرات الأدبية شفهياً عبر الاستدلال المنظم والاقتباسات النصية المناسبة',
        },
      ],
      4: [
        {
          en: 'Demonstrate rhetorical poise and clear structural signposting in extended analytical presentations',
          ar: 'إظهار الاتزان الخطابي والإشارات البنائية الواضحة في العروض التحليلية الممتدة',
        },
        {
          en: 'Critique peers’ spoken arguments constructively by evaluating evidence and logical clarity',
          ar: 'تقويم حجج الزملاء الشفهية بصورة بناءة عبر فحص الأدلة والوضوح المنطقي',
        },
      ],
      5: [
        {
          en: 'Communicate nuanced literary and philosophical insights fluently in near-error-free Classical Standard Arabic',
          ar: 'نقل الرؤى الأدبية والفكرية الدقيقة بطلاقة في فصحى سليمة تكاد تخلو من الأخطاء',
        },
        {
          en: 'Counter opposing positions persuasively in formal debates using ethical and logical appeals',
          ar: 'دحض المواقف المخالفة بإقناع في المناظرات الرسمية عبر الحجج المنطقية والقيمية',
        },
      ],
      6: [
        {
          en: 'Deliver authoritative seminar papers that synthesise critical schools and historical context eloquently',
          ar: 'تقديم أوراق بحثية شفهية رصينة تدمج المدارس النقدية والسياق التاريخي ببلاغة',
        },
        {
          en: 'Refine oral delivery through strategic pauses, rhetorical parallelism, and elevated diction',
          ar: 'تجويد الأداء الشفهي عبر الوقفات الاستراتيجية والتوازي البلاغي واختيار الألفاظ الجزلة',
        },
      ],
      7: [
        {
          en: 'Command academic forums with masterful extemporaneous Arabic eloquence, intellectual depth, and persuasive subtlety',
          ar: 'قيادة المحافل النقاشية الأكاديمية بفصاحة ارتجالية رفيعة وعمق فكري وإقناع بليغ',
        },
        {
          en: 'Perform classical poetry and high prose with nuanced interpretive artistry that illuminates aesthetic meaning',
          ar: 'أداء الشعر العربي والنثر الرفيع ببراعة تأويلية تبرز القيم الجمالية والدلالية للنص',
        },
      ],
    },
  },

  'aa-reading': {
    AA_6_7: {
      1: [
        {
          en: 'Identify explicit facts, characters, and settings in short Arabic texts using guided highlighting',
          ar: 'تحديد الحقائق الصريحة والشخصيات والزمان والمكان في النصوص القصيرة باستخدام التحديد الموجه',
        },
        {
          en: 'Read age-appropriate vowelised passages aloud with accurate word decoding',
          ar: 'قراءة نصوص مشكولة مناسبة للفئة العمرية جهراً مع فك رموز الكلمات بدقة',
        },
      ],
      2: [
        {
          en: 'Determine the main idea of each paragraph and distinguish it from minor details',
          ar: 'تحديد الفكرة الرئيسة لكل فقرة والتمييز بينها وبين التفاصيل الفرعية',
        },
        {
          en: 'Use surrounding sentence context to deduce the meaning of unfamiliar Arabic vocabulary',
          ar: 'توظيف سياق الجملة المحيطة لاستنتاج معاني المفردات العربية غير المألوفة',
        },
      ],
      3: [
        {
          en: 'Explain cause-and-effect relationships and character actions using evidence from the text',
          ar: 'تفسير علاقات السبب والنتيجة وتصرفات الشخصيات بالاستناد إلى أدلة من النص',
        },
        {
          en: 'Identify basic literary devices such as simile and personification in studied prose and poetry',
          ar: 'تحديد الأساليب الأدبية الأساسية كالتشبيه والتشخيص في النصوص النثرية والشعرية المدروسة',
        },
      ],
      4: [
        {
          en: 'Identify implied meanings, character motivations, and relationships between ideas in a text',
          ar: 'تحديد المعاني الضمنية ودوافع الشخصيات والعلاقات بين الأفكار في النص',
        },
        {
          en: 'Compare themes and narrative viewpoints across two related literary selections',
          ar: 'مقارنة الموضوعات وزوايا السرد عبر نصين أدبيين مترابطين',
        },
      ],
      5: [
        {
          en: 'Analyse how an author’s choice of imagery and descriptive language develops mood and theme',
          ar: 'تحليل كيف يسهم اختيار الكاتب للصور واللغة الوصفية في بناء الجو العام والموضوع',
        },
        {
          en: 'Support analytical claims consistently with accurately quoted and explained textual evidence',
          ar: 'دعم الاستنتاجات التحليلية باطراد بشواهد نصية مقتبسة بدقة ومشروحة بوضوح',
        },
      ],
      6: [
        {
          en: 'Evaluate how structural shifts, conflict escalation, and dialogue shape a narrative’s impact',
          ar: 'تقويم أثر التحولات البنائية وتصاعد الصراع والحوار في فاعلية النص السردي',
        },
        {
          en: 'Interpret symbolic meanings and central moral questions in classical and modern Arabic literature',
          ar: 'تفسير الدلالات الرمزية والقضايا القيمية المحورية في الأدب العربي التراثي والحديث',
        },
      ],
      7: [
        {
          en: 'Synthesise subtle thematic parallels and stylistic contrasts across diverse literary genres independently',
          ar: 'تركيب التقاطعات الموضوعية الدقيقة والتباينات الأسلوبية عبر أجناس أدبية متنوعة باستقلالية',
        },
        {
          en: 'Critique how rhetorical structure and rhythmic diction elevate aesthetic meaning in complex texts',
          ar: 'نقد كيفية ارتقاء البناء البلاغي والإيقاع اللفظي بالمعنى الجمالي في النصوص المركبة',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Locate explicit arguments and key narrative turning points using structured reading questions',
          ar: 'تحديد الحجج الصريحة ونقاط التحول السردية الرئيسة باستخدام أسئلة قراءة منظمة',
        },
        {
          en: 'Read unvowelised familiar texts accurately by applying basic syntactic context cues',
          ar: 'قراءة النصوص المألوفة غير المشكولة بدقة بالاعتماد على القرائن النحوية السياقية',
        },
      ],
      2: [
        {
          en: 'Summarise central ideas of informational and literary texts concisely in own words',
          ar: 'تلخيص الأفكار المحورية في النصوص المعلوماتية والأدبية بإيجاز وبأسلوب الطالب الخاص',
        },
        {
          en: 'Identify explicit rhetorical devices such as metaphor and antithesis in studied passages',
          ar: 'تحديد المحسنات والأساليب البلاغية الظاهرة كالاستعارة والطباق في المقاطع المدروسة',
        },
      ],
      3: [
        {
          en: 'Trace character development and shifting perspectives throughout a complete short story or poem',
          ar: 'تتبع تطور الشخصيات وتحول وجهات النظر على امتداد قصة قصيرة أو قصيدة كاملة',
        },
        {
          en: 'Distinguish fact, reasoned opinion, and persuasive bias in non-fiction articles',
          ar: 'التمييز بين الحقيقة والرأي المعلل والتحيز الإقناعي في المقالات غير الأدبية',
        },
      ],
      4: [
        {
          en: 'Analyse how rhetorical imagery and connotative diction reinforce the author’s underlying message',
          ar: 'تحليل كيف تعزز الصور البلاغية والدلالات الإيحائية الرسالة الكامنة للكاتب',
        },
        {
          en: 'Explain the relationship between historical or cultural context and key events in a text',
          ar: 'تفسير العلاقة بين السياق التاريخي أو الثقافي والأحداث الرئيسة في النص',
        },
      ],
      5: [
        {
          en: 'Evaluate the effectiveness of an author’s structural choices and persuasive strategies using textual proof',
          ar: 'تقويم فاعلية الاختيارات البنائية واستراتيجيات الإقناع لدى الكاتب بالاعتماد على الدليل النصي',
        },
        {
          en: 'Synthesise evidence from multiple paragraphs to construct a nuanced interpretation of theme',
          ar: 'تركيب الشواهد من فقرات متعددة لبناء تفسير دقيق ومتوازن لموضوع النص',
        },
      ],
      6: [
        {
          en: 'Examine irony, ambiguity, and layered symbolism in modern and classical Arabic literary works',
          ar: 'فحص المفارقة والغموض الفني والرمزية متعددة الطبقات في الأعمال الأدبية العربية الحديثة والتراثية',
        },
        {
          en: 'Compare how different authors treat shared human or social issues through contrasting styles',
          ar: 'مقارنة معالجة كتاب مختلفين لقضايا إنسانية أو اجتماعية مشتركة عبر أساليب متباينة',
        },
      ],
      7: [
        {
          en: 'Formulate original, critically defensible literary arguments grounded in close stylistic and rhetorical analysis',
          ar: 'صياغة أطروحات أدبية أصيلة وقابلة للدفاع النقدي استناداً إلى تحليل أسلوبي وبلاغي معمق',
        },
        {
          en: 'Critique intertextual echoes and philosophical tensions across demanding classical and contemporary texts',
          ar: 'نقد التناص والتوترات الفكرية عبر نصوص تراثية ومعاصرة عالية المستوى',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Identify thesis statements and primary supporting points in classical and modern essays with guided annotations',
          ar: 'تحديد الأطروحة الرئيسة ونقاط الدعم الأولية في المقالات التراثية والحديثة عبر التعليق الموجه',
        },
        {
          en: 'Decode archaic or specialised vocabulary using morphological roots and contextual inference',
          ar: 'فك معاني المفردات التراثية أو التخصصية باستخدام الجذور الصرفية والاستدلال السياقي',
        },
      ],
      2: [
        {
          en: 'Outline the logical progression of complex expository and argumentative Arabic texts',
          ar: 'رسم التسلسل المنطقي للنصوص التفسيرية والحجاجية العربية المركبة',
        },
        {
          en: 'Recognise primary rhetorical patterns in Arabic Balagha (Bayan, Badi, Maani) within studied passages',
          ar: 'تعرّف الأنماط البلاغية الأساسية في البيان والبديع والمعاني ضمن النصوص المدروسة',
        },
      ],
      3: [
        {
          en: 'Explain how rhetorical figures function to deepen meaning rather than merely listing their names',
          ar: 'تفسير الوظيفة الدلالية والجمالية للصور البلاغية بدلاً من الاكتفاء بتسميتها',
        },
        {
          en: 'Analyse implicit authorial tone and intended audience in journalistic and critical prose',
          ar: 'تحليل النبرة الضمنية للكاتب والجمهور المستهدف في النثر الصحفي والنقدي',
        },
      ],
      4: [
        {
          en: 'Evaluate the credibility, assumptions, and argumentative structure of complex persuasive texts',
          ar: 'تقويم موثوقية النصوص الإقناعية المركبة وافتراضاتها وبنيتها الحجاجية',
        },
        {
          en: 'Connect literary motifs and stylistic choices to specific Arabic literary movements and eras',
          ar: 'ربط الموتيفات الأدبية والاختيارات الأسلوبية بالمدارس الأدبية العربية وسياقاتها التاريخية',
        },
      ],
      5: [
        {
          en: 'Conduct close rhetorical analysis demonstrating how syntax, rhythm, and metaphor construct aesthetic impact',
          ar: 'إجراء تحليل بلاغي دقيق يوضح كيف يبني التركيب والإيقاع والاستعارة الأثر الجمالي للنص',
        },
        {
          en: 'Synthesise secondary critical perspectives alongside primary textual evidence in balanced commentary',
          ar: 'دمج الآراء النقدية الثانوية مع الشواهد النصية الأولية في تعليق تحليلي متوازن',
        },
      ],
      6: [
        {
          en: 'Deconstruct ideological subtexts, aesthetic tension, and structural innovation in canonical Arabic literature',
          ar: 'تفكيك المضامين الفكرية الخفية والتوتر الجمالي والتجديد البنائي في روائع الأدب العربي',
        },
        {
          en: 'Produce comparative literary analyses evaluating how form and historical moment shape meaning',
          ar: 'إنتاج تحليلات أدبية مقارنة تقوّم أثر الشكل الفني واللحظة التاريخية في تشكيل الدلالة',
        },
      ],
      7: [
        {
          en: 'Demonstrate independent scholarly insight when interpreting ambiguous, multilayered classical poetry and modern fiction',
          ar: 'إظهار بصيرة نقدية مستقلة عند تأويل الشعر التراثي والرواية الحديثة متعددي الدلالات والغموض الفني',
        },
        {
          en: 'Critique competing critical readings using subtle linguistic, prosodic, and cultural evidence',
          ar: 'نقد القراءات النقدية المتنافسة باستخدام شواهد لغوية وعروضية وثقافية دقيقة',
        },
      ],
    },
  },

  'aa-writing': {
    AA_6_7: {
      1: [
        {
          en: 'Write complete, intelligible sentences in Modern Standard Arabic using guided paragraph frames',
          ar: 'كتابة جمل تامة ومفهومة باللغة العربية الفصحى باستخدام قوالب فقرات موجهة',
        },
        {
          en: 'Organise ideas into a clear beginning, middle, and ending before drafting short compositions',
          ar: 'تنظيم الأفكار في بداية ووسط ونهاية واضحة قبل كتابة المسودة القصيرة',
        },
      ],
      2: [
        {
          en: 'Group related sentences into coherent paragraphs focusing on one central idea per paragraph',
          ar: 'تجميع الجمل المترابطة في فقرات متماسكة تركز كل منها على فكرة محورية واحدة',
        },
        {
          en: 'Use basic Arabic conjunctions and time markers to sequence events clearly',
          ar: 'استخدام حروف العطف وظروف الزمان الأساسية لترتيب الأحداث بوضوح',
        },
      ],
      3: [
        {
          en: 'Expand narrative and descriptive writing with sensory details and expressive adjectives',
          ar: 'توسيع الكتابة السردية والوصفية بتفاصيل حسية ونعوت معبرة',
        },
        {
          en: 'Review drafts systematically to correct basic punctuation and paragraph boundaries',
          ar: 'مراجعة المسودات بصورة منهجية لتصحيح علامات الترقيم الأساسية وحدود الفقرات',
        },
      ],
      4: [
        {
          en: 'Develop well-structured multi-paragraph compositions with clear topic sentences and supporting examples',
          ar: 'كتابة موضوعات متعددة الفقرات محكمة البناء تتضمن جملاً مفتاحية واضحة وأمثلة داعمة',
        },
        {
          en: 'Maintain consistent formal Arabic register suited to the writing purpose and audience',
          ar: 'الحفاظ على مستوى لغوي فصيح متسق يلائم غرض الكتابة والجمهور المستهدف',
        },
      ],
      5: [
        {
          en: 'Craft cohesive persuasive and analytical paragraphs integrating relevant textual evidence smoothly',
          ar: 'صياغة فقرات إقناعية وتحليلية متماسكة تدمج الشواهد النصية المناسبة بسلاسة',
        },
        {
          en: 'Vary sentence openings and syntactic structures to enhance fluency and reader engagement',
          ar: 'تنويع بدايات الجمل والتراكيب النحوية لتعزيز السلاسة وجذب القارئ',
        },
      ],
      6: [
        {
          en: 'Refine tone, figurative language, and transitional flow to produce polished, impactful compositions',
          ar: 'تجويد النبرة واللغة التصويرية وتدفق الروابط لإنتاج كتابة متقنة وذات أثر',
        },
        {
          en: 'Revise drafts critically for precision of argument, conciseness, and stylistic balance',
          ar: 'تنقيح المسودات بصورة نقدية لضمان دقة الحجة والإيجاز والتوازن الأسلوبي',
        },
      ],
      7: [
        {
          en: 'Compose original, rhetorically evocative prose demonstrating mature control of structure, voice, and imagery',
          ar: 'كتابة نثر أصيل رفيع البلاغة يُظهر تحكماً ناضجاً في البناء والصوت الكتابي والتصوير الفني',
        },
        {
          en: 'Synthesise complex ideas seamlessly across extended essays with sophisticated Arabic stylistics',
          ar: 'تركيب الأفكار المعقدة بسلاسة عبر مقالات ممتدة بأسلوب عربي رفيع المستوى',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Construct clear topic sentences and brief supporting points using structured essay outlines',
          ar: 'صياغة جمل مفتاحية واضحة ونقاط دعم موجزة باستخدام مخططات كتابية منظمة',
        },
        {
          en: 'Ensure every sentence in formal writing expresses a complete thought in Standard Arabic',
          ar: 'التأكد من أن كل جملة في الكتابة الرسمية تعبر عن معنى تام بالعربية الفصحى',
        },
      ],
      2: [
        {
          en: 'Link paragraphs logically using appropriate causal, contrastive, and additive transitions',
          ar: 'ربط الفقرات منطقياً باستخدام أدوات الربط الدالة على السببية والمقابلة والإضافة',
        },
        {
          en: 'Include concrete examples rather than general statements when explaining ideas in writing',
          ar: 'تضمين أمثلة ملموسة بدلاً من العبارات العامة عند شرح الأفكار كتابياً',
        },
      ],
      3: [
        {
          en: 'Develop balanced argumentative essays presenting a clear thesis and reasoned evidence',
          ar: 'كتابة مقالات حجاجية متوازنة تعرض أطروحة واضحة وأدلة معللة',
        },
        {
          en: 'Integrate quoted evidence smoothly into analytical sentences with brief explanation',
          ar: 'دمج الشواهد المقتبسة بسلاسة داخل الجمل التحليلية مع شرح موجز لدلالتها',
        },
      ],
      4: [
        {
          en: 'Address counterarguments thoughtfully within persuasive essays to strengthen overall reasoning',
          ar: 'مناقشة الحجج المضادة بوعي داخل المقالات الإقناعية لتعزيز قوة الاستدلال العام',
        },
        {
          en: 'Self-edit drafts effectively to eliminate repetition, informal phrasing, and structural gaps',
          ar: 'تحرير المسودات ذاتياً بفاعلية لإزالة التكرار والتعبيرات غير الرسمية والفجوات البنائية',
        },
      ],
      5: [
        {
          en: 'Write coherent literary analyses that trace how stylistic devices contribute to deeper meaning',
          ar: 'كتابة تحليلات أدبية متماسكة تتتبع إسهام الأساليب الفنية في تعميق الدلالة',
        },
        {
          en: 'Control pacing, formal register, and rhetorical emphasis consistently across extended compositions',
          ar: 'ضبط الإيقاع السردي والمستوى اللغوي الرسمي والتأكيد البلاغي باطراد عبر النصوص الممتدة',
        },
      ],
      6: [
        {
          en: 'Craft persuasive and creative texts that employ nuanced imagery, parallelism, and deliberate cadence',
          ar: 'صياغة نصوص إقناعية وإبداعية توظف الصورة الدقيقة والتوازي والإيقاع المقصود',
        },
        {
          en: 'Synthesise multiple perspectives into a unified, authoritative written argument',
          ar: 'تركيب وجهات نظر متعددة في حجة كتابية موحدة ورصينة',
        },
      ],
      7: [
        {
          en: 'Produce publication-quality essays and creative narratives marked by originality, elegance, and critical depth',
          ar: 'إنتاج مقالات ونصوص سردية إبداعية عالية المستوى تتسم بالأصالة والأناقة الأسلوبية والعمق النقدي',
        },
        {
          en: 'Manipulate register, irony, and classical rhetorical structure purposefully for sophisticated effect',
          ar: 'تطويع المستوى اللغوي والمفارقة والبناء البلاغي التراثي بوعي لتحقيق أثر تعبيري رفيع',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Draft structured analytical paragraphs guided by clear claim-evidence-explanation scaffolds',
          ar: 'كتابة فقرات تحليلية منظمة بالاعتماد على بنية: الادعاء والشاهد والتفسير',
        },
        {
          en: 'Eliminate colloquialisms and maintain formal academic phrasing throughout short responses',
          ar: 'تجنب الألفاظ العامية والحفاظ على الصياغة الأكاديمية الرسمية في الإجابات القصيرة',
        },
      ],
      2: [
        {
          en: 'Organise multi-paragraph literary or argumentative essays around a clear, focused thesis statement',
          ar: 'تنظيم المقالات الأدبية أو الحجاجية متعددة الفقرات حول أطروحة واضحة ومحددة',
        },
        {
          en: 'Use formal discourse markers to establish logical progression between analytical points',
          ar: 'توظيف علامات الخطاب الرسمية لتحقيق تسلسل منطقي بين النقاط التحليلية',
        },
      ],
      3: [
        {
          en: 'Develop analytical commentary that explains the effect of rhetorical choices rather than summarising plot',
          ar: 'تطوير تعليق تحليلي يفسر أثر الاختيارات البلاغية بدلاً من الاكتفاء بسرد المضمون',
        },
        {
          en: 'Support academic arguments with well-selected primary quotations and contextual explanation',
          ar: 'دعم الحجج الأكاديمية باقتباسات أولية منتقاة بعناية وشرح سياقي واضح',
        },
      ],
      4: [
        {
          en: 'Construct cohesive, sustained comparative essays examining shared themes across multiple texts',
          ar: 'بناء مقالات مقارنة متماسكة وممتدة تتناول موضوعات مشتركة عبر نصوص متعددة',
        },
        {
          en: 'Refine academic voice by replacing vague expressions with precise critical and rhetorical terminology',
          ar: 'صقل الصوت الأكاديمي باستبدال العبارات العامة بمصطلحات نقدية وبلاغية دقيقة',
        },
      ],
      5: [
        {
          en: 'Demonstrate mature stylistic control through varied periodic sentences, concise phrasing, and strong cohesion',
          ar: 'إظهار تحكم أسلوبي ناضج عبر تنويع الجمل الطويلة والقصيرة ودقة الصياغة وقوة الترابط',
        },
        {
          en: 'Evaluate opposing critical interpretations smoothly within well-reasoned research and literary essays',
          ar: 'تقويم القراءات النقدية المتعارضة بسلاسة داخل المقالات البحثية والأدبية المحكمة',
        },
      ],
      6: [
        {
          en: 'Write sophisticated, persuasive academic prose integrating rhetorical eloquence with rigorous logical synthesis',
          ar: 'كتابة نثر أكاديمي رفيع ومقنع يدمج الفصاحة البلاغية بالتركيب المنطقي الدقيق',
        },
        {
          en: 'Revise extended compositions independently to achieve architectural unity and nuanced diction',
          ar: 'مراجعة النصوص الممتدة باستقلالية لتحقيق الوحدة البنائية ودقة الاختيار المعجمي',
        },
      ],
      7: [
        {
          en: 'Compose exemplary literary criticism and original essays reflecting mastery of classical and modern Arabic rhetoric',
          ar: 'كتابة دراسات نقدية ومقالات أصيلة متميزة تعكس تمكناً رفيعاً من البلاغة العربية التراثية والحديثة',
        },
        {
          en: 'Articulate complex philosophical and aesthetic insights with seamless coherence, poise, and lexical brilliance',
          ar: 'التعبير عن الرؤى الفكرية والجمالية المركبة بتماسك سلس واتزان وبراعة معجمية لافتة',
        },
      ],
    },
  },

  'aa-grammar': {
    AA_6_7: {
      1: [
        {
          en: 'Distinguish accurately between nominal and verbal sentences in guided grammar exercises',
          ar: 'التمييز بدقة بين الجملة الاسمية والجملة الفعلية في التدريبات النحوية الموجهة',
        },
        {
          en: 'Identify subject, verb, and object in simple Arabic sentences using colour-coded scaffolds',
          ar: 'تحديد الفاعل والفعل والمفعول به في الجمل العربية البسيطة باستخدام دعامات التلوين',
        },
      ],
      2: [
        {
          en: 'Apply subject-verb agreement in gender and number across simple present and past tense sentences',
          ar: 'تطبيق المطابقة بين الفعل والفاعل في التذكير والتأنيث والعدد في جمل المضارع والماضي البسيطة',
        },
        {
          en: 'Use prepositions and basic genitive constructs correctly in structured writing tasks',
          ar: 'استخدام حروف الجر والتركيب الإضافي الأساسي بصورة صحيحة في مهام الكتابة المنظمة',
        },
      ],
      3: [
        {
          en: 'Apply basic case endings (Raf, Nasb, Jarr) accurately to singular nouns and sound plurals in context',
          ar: 'تطبيق علامات الإعراب الأساسية (الرفع والنصب والجر) بدقة على المفرد والجموع السالمة في السياق',
        },
        {
          en: 'Use Kana and Inna with their sisters accurately in short paragraph writing',
          ar: 'توظيف كان وأخواتها وإن وأخواتها بصورة صحيحة في كتابة الفقرات القصيرة',
        },
      ],
      4: [
        {
          en: 'Identify and apply rules of dual, sound masculine/feminine plurals, and broken plurals consistently',
          ar: 'تعرّف قواعد المثنى والجمعين السالمين وجمع التكسير وتطبيقها باطراد في الكتابة',
        },
        {
          en: 'Control verb conjugation across active and passive forms in studied narrative tasks',
          ar: 'ضبط تصريف الأفعال في صيغتي المبني للمعلوم والمبني للمجهول في المهام السردية المدروسة',
        },
      ],
      5: [
        {
          en: 'Apply grammatical agreement rules accurately for adjectives, demonstratives, and relative pronouns',
          ar: 'تطبيق قواعد المطابقة النحوية بدقة في النعت وأسماء الإشارة والأسماء الموصولة',
        },
        {
          en: 'Self-correct recurring case-ending and verb-mood errors (Nasb and Jazm) during draft revision',
          ar: 'تصحيح أخطاء الإعراب ونصب الفعل المضارع وجزمه ذاتياً أثناء مراجعة المسودات',
        },
      ],
      6: [
        {
          en: 'Use varied syntactic structures including Hal, Tamyiz, and conditional clauses accurately in composition',
          ar: 'توظيف التراكيب النحوية المتنوعة كالحال والتمييز وأسلوب الشرط بدقة في التعبير الكتابي',
        },
        {
          en: 'Analyse how grammatical choices alter emphasis and clarity within literary sentences',
          ar: 'تحليل أثر الاختيارات النحوية في تغيير التوكيد والوضوح داخل الجمل الأدبية',
        },
      ],
      7: [
        {
          en: 'Demonstrate consistent grammatical and morphological mastery across complex multi-clause compositions',
          ar: 'إظهار تمكن نحوي وصرفي متكامل عبر النصوص المركبة متعددة الجمل التبعية',
        },
        {
          en: 'Employ advanced syntactic patterns such as foregrounding and exception clauses purposefully for stylistic impact',
          ar: 'توظيف التراكيب المتقدمة كالتقديم والتأخير وأسلوب الاستثناء بوعي لتحقيق أثر أسلوبي بليغ',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Identify core sentence constituents and grammatical cases in simplified sentences with structured prompts',
          ar: 'تحديد أركان الجملة الأساسية والحالات الإعرابية في الجمل المبسطة مع توجيه مرحلي',
        },
        {
          en: 'Apply subject-predicate and verb-subject agreement reliably in short responses',
          ar: 'تطبيق المطابقة بين المبتدأ والخبر والفعل والفاعل بثبات في الإجابات القصيرة',
        },
      ],
      2: [
        {
          en: 'Use the Five Verbs and Five Nouns with accurate case markers in guided exercises',
          ar: 'استخدام الأفعال الخمسة والأسماء الخمسة بعلاماتها الإعرابية الدقيقة في التدريبات الموجهة',
        },
        {
          en: 'Distinguish transitive from intransitive verbs when constructing clear analytical sentences',
          ar: 'التمييز بين الفعل اللازم والمتعدي عند بناء جمل تحليلية واضحة',
        },
      ],
      3: [
        {
          en: 'Apply rules of Hal, Mafool Mutlaq, and Mafool li-ajlihi correctly within extended writing',
          ar: 'تطبيق قواعد الحال والمفعول المطلق والمفعول لأجله بصورة صحيحة في الكتابة الممتدة',
        },
        {
          en: 'Derive basic morphological forms (active/passive participles) accurately from trilateral roots',
          ar: 'اشتقاق الصيغ الصرفية الأساسية (اسم الفاعل واسم المفعول) بدقة من الجذور الثلاثية',
        },
      ],
      4: [
        {
          en: 'Use conditional structures, exception styles (Istithna), and number-noun agreement accurately',
          ar: 'استخدام أساليب الشرط والاستثناء ومطابقة العدد والمعدود بدقة في السياق',
        },
        {
          en: 'Explain the grammatical function of phrases within complex sentences during textual analysis',
          ar: 'تفسير الوظيفة النحوية للعبارات داخل الجمل المركبة أثناء التحليل النصي',
        },
      ],
      5: [
        {
          en: 'Maintain accurate morphology and syntax across unvowelised formal writing with minimal prompting',
          ar: 'الحفاظ على الضبط الصرفي والنحوي الدقيق في الكتابة الرسمية غير المشكولة بأقل قدر من التوجيه',
        },
        {
          en: 'Apply rules of diptotes (Mamnoo min al-Sarf) and appositives (Tawabi) accurately in essays',
          ar: 'تطبيق قواعد الممنوع من الصرف والتوابع بدقة في الكتابة المقالية',
        },
      ],
      6: [
        {
          en: 'Control intricate syntactic subordination, embedded clauses, and morphological nuance effortlessly',
          ar: 'التحكم الدقيق في التبعية النحوية والجمل المعترضة واللطائف الصرفية بسلاسة',
        },
        {
          en: 'Evaluate how syntactic inversion and ellipsis create rhetorical emphasis in studied literature',
          ar: 'تقويم دور التقديم والتأخير والحذف في توليد التوكيد البلاغي في النصوص الأدبية المدروسة',
        },
      ],
      7: [
        {
          en: 'Demonstrate authoritative command of Classical Arabic syntax and morphology across spontaneous and formal tasks',
          ar: 'إظهار تمكن مرجعي من النحو والصرف العربي الفصيح في المهام الارتجالية والرسمية',
        },
        {
          en: 'Deploy complex grammatical constructions intentionally to craft rhythmic, balanced, and persuasive prose',
          ar: 'توظيف التراكيب النحوية المركبة قصداً لصياغة نثر إيقاعي متوازن ومقنع',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Review foundational grammatical agreements and case markers systematically in academic drafts',
          ar: 'مراجعة قواعد المطابقة والعلامات الإعرابية الأساسية بصورة منهجية في المسودات الأكاديمية',
        },
        {
          en: 'Identify morphological patterns of derived nouns and augmented verbs using reference tables',
          ar: 'تحديد الأوزان الصرفية للمشتقات والأفعال المزيدة باستخدام الجداول المرجعية',
        },
      ],
      2: [
        {
          en: 'Apply number-noun syntax, appositives, and conditional particles accurately in essay writing',
          ar: 'تطبيق قواعد العدد والمعدود والتوابع وأدوات الشرط بدقة في الكتابة المقالية',
        },
        {
          en: 'Resolve common syntactic errors involving weak verbs (Mutall) and defective nouns (Manqoos/Maqsoor)',
          ar: 'معالجة الأخطاء الشائعة في الأفعال المعتلة والأسماء المنقوصة والمقصورة',
        },
      ],
      3: [
        {
          en: 'Use embedded clauses (Jumal allati laha mahall min al-irab) accurately to build sophisticated arguments',
          ar: 'توظيف الجمل التي لها محل من الإعراب بدقة لبناء حجج كتابية رصينة',
        },
        {
          en: 'Connect morphological shifts (e.g., verb augmentation patterns) to semantic nuance during reading analysis',
          ar: 'ربط التحولات الصرفية (كدلالات صيغ الزيادة) بالمعاني السياقية الدقيقة أثناء التحليل القرائي',
        },
      ],
      4: [
        {
          en: 'Maintain consistent grammatical precision across extended critical essays and oral presentations',
          ar: 'الحفاظ على الدقة النحوية المتواصلة في المقالات النقدية الممتدة والعروض الشفهية',
        },
        {
          en: 'Apply rules of specification (Ikhtisas), exclamation (Taajjub), and praise/blame structures effectively',
          ar: 'تطبيق أساليب الاختصاص والتعجب والمدح والذم بفاعلية في التعبير الرسمي',
        },
      ],
      5: [
        {
          en: 'Analyse how syntactic structures (Ilm al-Maani) shape subtle communicative intent in classical texts',
          ar: 'تحليل كيف تشكّل التراكيب النحوية (علم المعاني) القصد التواصلي الدقيق في النصوص التراثية',
        },
        {
          en: 'Demonstrate high morphological accuracy including assimilation (Idgham) and vowel mutation (Ilal) awareness',
          ar: 'إظهار دقة صرفية عالية تشمل الوعي بقواعد الإدغام والإعلال في السياق',
        },
      ],
      6: [
        {
          en: 'Command intricate Arabic syntactic nuance—including restrictive styles (Qasr) and ellipsis—in analytical writing',
          ar: 'التمكن من دقائق النحو العربي — كأسلوب القصر والحذف — في الكتابة التحليلية',
        },
        {
          en: 'Self-regulate grammatical elegance across high-register academic and creative genres with rare slips',
          ar: 'الضبط الذاتي للأناقة النحوية في الأجناس الأكاديمية والإبداعية الرفيعة بندرة الأخطاء',
        },
      ],
      7: [
        {
          en: 'Exhibit scholarly mastery of Arabic Nahw and Sarf, seamlessly uniting grammatical precision with rhetorical artistry',
          ar: 'إبراز تمكن علمي رفيع من النحو والصرف يجمع بسلاسة بين الدقة الإعرابية والبراعة البلاغية',
        },
        {
          en: 'Critique subtle syntactic ambiguities and classical grammatical variations in advanced literary exegesis',
          ar: 'نقد الاحتمالات النحوية الدقيقة والأوجه الإعرابية التراثية في الشرح والتحليل الأدبي المتقدم',
        },
      ],
    },
  },

  'aa-vocab': {
    AA_6_7: {
      1: [
        {
          en: 'Spell high-frequency Arabic words accurately using guided word banks and dictation practice',
          ar: 'إملاء الكلمات العربية عالية التكرار بدقة باستخدام بنوك الكلمات والتدريب الإملائي الموجه',
        },
        {
          en: 'Apply basic punctuation marks (full stop, comma, question mark) accurately in short texts',
          ar: 'توظيف علامات الترقيم الأساسية (النقطة والفاصلة وعلامة الاستفهام) بدقة في النصوص القصيرة',
        },
      ],
      2: [
        {
          en: 'Distinguish between Ta Marbuta, Ta Maftuha, and Ha at the ends of words consistently',
          ar: 'التمييز باطراد بين التاء المربوطة والتاء المفتوحة والهاء في أواخر الكلمات',
        },
        {
          en: 'Replace repetitive everyday words with appropriate synonyms learned in current units',
          ar: 'استبدال الكلمات اليومية المكررة بمرادفات فصيحة مناسبة من الوحدات المدروسة',
        },
      ],
      3: [
        {
          en: 'Apply rules of Hamzat al-Wasl and Hamzat al-Qat accurately in common verbs and nouns',
          ar: 'تطبيق قواعد همزة الوصل وهمزة القطع بدقة في الأفعال والأسماء الشائعة',
        },
        {
          en: 'Use an Arabic dictionary or root-family chart to expand vocabulary in thematic writing',
          ar: 'استخدام المعجم العربي أو خرائط الجذور اللغوية لتوسيع المفردات في الكتابة الموضوعية',
        },
      ],
      4: [
        {
          en: 'Spell medial and final Hamza forms accurately across familiar lexical patterns',
          ar: 'كتابة الهمزة المتوسطة والمتطرفة بصورة صحيحة عبر الأنماط المعجمية المألوفة',
        },
        {
          en: 'Select precise expressive verbs and descriptive phrases to strengthen narrative clarity',
          ar: 'اختيار الأفعال التعبيرية الدقيقة والعبارات الوصفية لتعزيز وضوح السرد',
        },
      ],
      5: [
        {
          en: 'Apply Alif Layyina spelling rules accurately across triliteral and non-triliteral words',
          ar: 'تطبيق قواعد الألف اللينة بدقة في الكلمات الثلاثية وغير الثلاثية',
        },
        {
          en: 'Incorporate idioms, proverbs, and figurative expressions naturally into formal writing',
          ar: 'تضمين التعابير الاصطلاحية والأمثال والأساليب المجازية بصورة طبيعية في الكتابة الرسمية',
        },
      ],
      6: [
        {
          en: 'Demonstrate rich lexical variety and nuanced word choice sensitive to subtle shades of meaning',
          ar: 'إظهار ثراء معجمي واختيار لفظي دقيق يراعي الفروق الدلالية اللطيفة بين المفردات',
        },
        {
          en: 'Use punctuation—including colons, dashes, and quotation marks—accurately to enhance rhetorical clarity',
          ar: 'توظيف علامات الترقيم — كالنقطتين والشرطتين وعلامات التنصيص — بدقة لتعزيز الوضوح البلاغي',
        },
      ],
      7: [
        {
          en: 'Command an expansive Classical and Modern Arabic lexicon, deploying rare and precise terms effortlessly',
          ar: 'التمكن من معجم عربي فصيح واسع وتوظيف الألفاظ الدقيقة والجزلة بسلاسة تامة',
        },
        {
          en: 'Maintain near-flawless orthographic accuracy across complex unedited writing while enriching style with linguistic artistry',
          ar: 'الحفاظ على دقة إملائية شبه تامة في الكتابة الحرة مع إثراء الأسلوب بالجماليات اللغوية',
        },
      ],
    },
    AA_8_9: {
      1: [
        {
          en: 'Consolidate foundational spelling rules for Ta Marbuta, initial Hamza, and silent Alif (Alif al-Fariqa)',
          ar: 'ترسيخ قواعد الإملاء الأساسية للتاء المربوطة والهمزات الأولية والألف الفارقة',
        },
        {
          en: 'Build thematic vocabulary lists to replace vague nouns and verbs in structured writing',
          ar: 'بناء قوائم مفردات موضوعية لاستبدال الأسماء والأفعال العامة في الكتابة المنظمة',
        },
      ],
      2: [
        {
          en: 'Apply medial Hamza rules consistently when writing inflected verbs and plural nouns',
          ar: 'تطبيق قواعد الهمزة المتوسطة باطراد عند كتابة الأفعال المصرفة والجموع',
        },
        {
          en: 'Use morphological root families to infer meanings and expand word choice in paragraphs',
          ar: 'توظيف عائلات الجذور الصرفية لاستنتاج المعاني وتنويع المفردات في الفقرات',
        },
      ],
      3: [
        {
          en: 'Resolve errors with final Hamza and Alif Layyina consistently during independent proofreading',
          ar: 'معالجة أخطاء الهمزة المتطرفة والألف اللينة باطراد أثناء التدقيق الذاتي المستقل',
        },
        {
          en: 'Distinguish formal academic collocations from colloquial phrasing in essays and discussions',
          ar: 'التمييز بين المتلازمات اللفظية الفصيحة والتعبيرات العامية في المقالات والنقاشات',
        },
      ],
      4: [
        {
          en: 'Apply accurate orthography for joined and separated words (Al-Wasl wa Al-Fasl) and punctuation conventions',
          ar: 'تطبيق قواعد الوصل والفصل الإملائية وعلامات الترقيم بدقة في النصوص المكتوبة',
        },
        {
          en: 'Deploy precise analytical vocabulary to describe tone, argument, and literary effect',
          ar: 'توظيف مفردات تحليلية دقيقة لوصف النبرة والحجة والأثر الأدبي',
        },
      ],
      5: [
        {
          en: 'Integrate classical idioms, balanced parallelisms, and figurative linguistic features purposefully',
          ar: 'دمج التعبيرات التراثية والتوازي المتزن والأساليب اللغوية التصويرية بوعي قصدي',
        },
        {
          en: 'Demonstrate high orthographic consistency even with unfamiliar, low-frequency vocabulary',
          ar: 'إظهار اتساق إملائي عالٍ حتى مع المفردات النادرة أو غير المألوفة',
        },
      ],
      6: [
        {
          en: 'Select evocative, contextually nuanced vocabulary that elevates both emotional resonance and academic authority',
          ar: 'انتقاء مفردات إيحائية دقيقة السياق ترتقي بالتأثير الوجداني والرصانة الأكاديمية معاً',
        },
        {
          en: 'Use stylistic features such as antithesis, assonance, and rhetorical questions with refined restraint',
          ar: 'توظيف الأساليب اللغوية كالطباق والجناس والاستفهام البلاغي باتزان فني رفيع',
        },
      ],
      7: [
        {
          en: 'Exhibit mastery of Arabic orthography, lexicology, and stylistic craftsmanship across demanding genres',
          ar: 'إبراز تمكن رفيع من الإملاء العربي والثروة المعجمية والصياغة الأسلوبية عبر الأجناس الأدبية الرفيعة',
        },
        {
          en: 'Exploit subtle semantic distinctions and classical roots to achieve extraordinary precision of expression',
          ar: 'استثمار الفروق الدلالية الدقيقة والجذور التراثية لتحقيق دقة تعبيرية استثنائية',
        },
      ],
    },
    AA_10_12: {
      1: [
        {
          en: 'Eliminate recurring orthographic slips in Hamzat al-Qat, Alif Layyina, and nunation (Tanween) via checklists',
          ar: 'إزالة الهفوات الإملائية المتكررة في همزة القطع والألف اللينة والتنوين باستخدام قوائم المراجعة',
        },
        {
          en: 'Use academic Arabic glossaries to incorporate discipline-specific literary terminology',
          ar: 'استخدام المسارد الأكاديمية لتوظيف المصطلحات الأدبية والنقدية الدقيقة',
        },
      ],
      2: [
        {
          en: 'Apply full orthographic accuracy to complex inflected forms involving Hamza and doubled letters',
          ar: 'تطبيق الدقة الإملائية الكاملة على الصيغ المصرفة المركبة ذات الهمزات والتضعيف',
        },
        {
          en: 'Expand active academic vocabulary to avoid redundancy across multi-page essays',
          ar: 'توسيع المعجم الأكاديمي النشط لتجنب التكرار اللفظي في المقالات المطولة',
        },
      ],
      3: [
        {
          en: 'Use specialised critical, rhetorical, and philosophical vocabulary accurately in textual commentary',
          ar: 'استخدام المفردات النقدية والبلاغية والفلسفية المتخصصة بدقة في التعليق النصي',
        },
        {
          en: 'Verify subtle orthographic cases such as added or omitted letters (Al-Ziyada wa Al-Hadhf) independently',
          ar: 'التحقق المستقل من القواعد الإملائية الدقيقة كالزيادة والحذف في الرسم الكتابي',
        },
      ],
      4: [
        {
          en: 'Control register and lexical precision seamlessly across expository, persuasive, and literary contexts',
          ar: 'ضبط المستوى المعجمي والدقة اللفظية بسلاسة عبر السياقات التفسيرية والإقناعية والأدبية',
        },
        {
          en: 'Recognise and employ subtle connotative differences among near-synonyms in analytical prose',
          ar: 'تعرّف الفروق الإيحائية الدقيقة بين المترادفات وتوظيفها في النثر التحليلي',
        },
      ],
      5: [
        {
          en: 'Enrich essays with purposeful rhetorical balance, classical proverbs, and elevated collocations',
          ar: 'إثراء المقالات بالتوازن البلاغي المقصود والأمثال التراثية والمتلازمات اللفظية الراقية',
        },
        {
          en: 'Maintain complete orthographic and punctuation precision under timed examination conditions',
          ar: 'الحفاظ على الدقة الإملائية والترقيمية الكاملة في ظروف الاختبارات المحددة بالوقت',
        },
      ],
      6: [
        {
          en: 'Demonstrate discriminating lexical artistry, choosing words whose sound, root, and register deepen meaning',
          ar: 'إظهار ذائقة معجمية رفيعة في اختيار الألفاظ التي يعمّق جرسها وجذرها ومستواها الدلالة',
        },
        {
          en: 'Evaluate the linguistic features of classical and modern texts using exact philological terminology',
          ar: 'تقويم الخصائص اللغوية للنصوص التراثية والحديثة باستخدام مصطلحات فقه اللغة الدقيقة',
        },
      ],
      7: [
        {
          en: 'Exhibit impeccable orthographic mastery alongside an expansive, scholarly Arabic lexicon of classical depth',
          ar: 'إظهار إتقان إملائي لا يشوبه خلل إلى جانب ثروة معجمية رصينة ذات عمق تراثي وأكاديمي',
        },
        {
          en: 'Craft prose imbued with authentic Arabic eloquence, rhythmic cadence, and effortless stylistic grace',
          ar: 'صياغة نثر يفيض بالفصاحة العربية الأصيلة والإيقاع المتناغم والرشاقة الأسلوبية اللافتة',
        },
      ],
    },
  },
};

const ARABIC_B_BANK: Record<string, Record<'AB_6_7' | 'AB_8' | 'AB_9_10', Record<ProficiencyLevelNumber, DescriptorTemplate[]>>> = {
  'ab-crit-a': {
    AB_6_7: {
      1: [
        {
          en: 'Recognise familiar everyday words, greetings, and classroom phrases in slow, clearly spoken Arabic',
          ar: 'تعرّف الكلمات اليومية المألوفة والتحيات والعبارات الصفية عند الاستماع إلى عربية بطيئة وواضحة',
        },
        {
          en: 'Match spoken key vocabulary to visual cues and pictures during guided listening tasks',
          ar: 'مطابقة المفردات المسموعة الأساسية مع الصور والدعامات البصرية أثناء مهام الاستماع الموجهة',
        },
      ],
      2: [
        {
          en: 'Identify basic facts such as names, numbers, and times in short, familiar audio dialogues',
          ar: 'تحديد المعلومات الأساسية كالأسماء والأرقام والأوقات في الحوارات الصوتية القصيرة والمألوفة',
        },
        {
          en: 'Follow simple two-step classroom instructions spoken in Arabic with visual support',
          ar: 'اتباع التعليمات الصفية البسيطة المكونة من خطوتين باللغة العربية مع دعم بصري',
        },
      ],
      3: [
        {
          en: 'Understand the main idea and two or three supporting details in short recordings on personal topics',
          ar: 'فهم الفكرة الرئيسة وتفصيلين أو ثلاثة داعمة في تسجيلات قصيرة حول موضوعات شخصية مألوفة',
        },
        {
          en: 'Recognise familiar time phrases to distinguish whether spoken statements refer to present or past actions',
          ar: 'تعرّف عبارات الزمن المألوفة للتمييز بين الأحداث الحاضرة والماضية في النصوص المسموعة',
        },
      ],
      4: [
        {
          en: 'Extract key details from short authentic announcements or video clips on school and community themes',
          ar: 'استخلاص التفاصيل الرئيسة من الإعلانات القصيرة أو المقاطع المرئية حول موضوعات المدرسة والمجتمع',
        },
        {
          en: 'Identify speakers’ likes, preferences, and simple reasons during guided listening tasks',
          ar: 'تحديد تفضيلات المتحدثين وميولهم والأسباب البسيطة التي يذكرونها أثناء الاستماع الموجه',
        },
      ],
      5: [
        {
          en: 'Demonstrate secure comprehension of main ideas and specific details in familiar spoken texts at natural pace',
          ar: 'إظهار فهم متمكن للأفكار الرئيسة والتفاصيل المحددة في النصوص المسموعة المألوفة بسرعة طبيعية',
        },
        {
          en: 'Infer the meaning of unfamiliar words in audio passages using context clues and visual support',
          ar: 'استنتاج معاني الكلمات غير المألوفة في المقاطع الصوتية بالاعتماد على السياق والدعامات البصرية',
        },
      ],
      6: [
        {
          en: 'Interpret speakers’ attitudes, feelings, and implied messages in extended Arabic dialogues',
          ar: 'تفسير مواقف المتحدثين ومشاعرهم والرسائل الضمنية في الحوارات العربية الممتدة',
        },
        {
          en: 'Summarise spoken information accurately across multi-part audio texts with minimal repetition',
          ar: 'تلخيص المعلومات المسموعة بدقة عبر نصوص صوتية متعددة الأجزاء بأقل قدر من التكرار',
        },
      ],
      7: [
        {
          en: 'Analyse connections between spoken ideas and cultural context across authentic Arabic multimedia texts',
          ar: 'تحليل الروابط بين الأفكار المسموعة والسياق الثقافي عبر النصوص السمعية والبصرية العربية الأصيلة',
        },
        {
          en: 'Evaluate speakers’ viewpoints and justify interpretations clearly using specific spoken evidence',
          ar: 'تقويم وجهات نظر المتحدثين وتبرير التفسيرات بوضوح بالاستناد إلى شواهد مسموعة محددة',
        },
      ],
    },
    AB_8: {
      1: [
        {
          en: 'Identify familiar topic keywords and simple expressions in slow, supported Arabic audio clips',
          ar: 'تحديد الكلمات المفتاحية المألوفة والتعبيرات البسيطة في المقاطع الصوتية العربية البطيئة والمدعومة',
        },
        {
          en: 'Respond to basic spoken questions on personal routines using visual word banks',
          ar: 'الاستجابة للأسئلة الشفهية الأساسية حول الروتين الشخصي بالاستعانة ببنوك الكلمات البصرية',
        },
      ],
      2: [
        {
          en: 'Locate specific details such as places, dates, and preferences in short familiar conversations',
          ar: 'تحديد تفاصيل محددة كالأماكن والتواريخ والتفضيلات في المحادثات القصيرة المألوفة',
        },
        {
          en: 'Track basic sequence words (first, then, finally) when listening to short recounts',
          ar: 'تتبع كلمات التسلسل الأساسية (أولاً، ثم، أخيراً) عند الاستماع إلى روايات قصيرة',
        },
      ],
      3: [
        {
          en: 'Identify main messages and basic reasons in spoken texts related to daily life, travel, and hobbies',
          ar: 'تحديد الرسائل الرئيسة والأسباب البسيطة في النصوص المسموعة المتعلقة بالحياة اليومية والسفر والهوايات',
        },
        {
          en: 'Distinguish between positive and negative statements and basic time frames in audio passages',
          ar: 'التمييز بين الجمل المثبتة والمنفية والأزمنة الأساسية في المقاطع الصوتية',
        },
      ],
      4: [
        {
          en: 'Compare information from two short spoken descriptions on familiar community topics',
          ar: 'مقارنة المعلومات الواردة في وصفين شفهيين قصيرين حول موضوعات مجتمعية مألوفة',
        },
        {
          en: 'Follow extended classroom dialogue in Arabic without relying on constant English translation',
          ar: 'متابعة الحوار الصفي الممتد باللغة العربية دون الاعتماد المستمر على الترجمة الإنجليزية',
        },
      ],
      5: [
        {
          en: 'Identify both explicit facts and straightforward implied attitudes in authentic audio-visual texts',
          ar: 'تحديد الحقائق الصريحة والمواقف الضمنية المباشرة في النصوص السمعية والبصرية الأصيلة',
        },
        {
          en: 'Take accurate brief notes while listening to short Arabic interviews or presentations',
          ar: 'تدوين ملاحظات موجزة ودقيقة أثناء الاستماع إلى مقابلات أو عروض عربية قصيرة',
        },
      ],
      6: [
        {
          en: 'Explain how a speaker’s tone and word choice convey purpose in familiar media clips',
          ar: 'تفسير كيف تنقل نبرة المتحدث واختياره للألفاظ غرضه في المقاطع الإعلامية المألوفة',
        },
        {
          en: 'Synthesise spoken details from multi-speaker conversations to answer analytical comprehension prompts',
          ar: 'تركيب التفاصيل المسموعة من محادثات متعددة المتحدثين للإجابة عن أسئلة فهم تحليلية',
        },
      ],
      7: [
        {
          en: 'Interpret nuanced viewpoints and cultural conventions in extended authentic Arabic broadcasts',
          ar: 'تفسير وجهات النظر الدقيقة والأعراف الثقافية في البث الإذاعي والمرئي العربي الأصيل الممتد',
        },
        {
          en: 'Evaluate spoken arguments thoughtfully by citing accurate evidence from unscripted Arabic dialogue',
          ar: 'تقويم الحجج المسموعة بوعي مع الاستشهاد بأدلة دقيقة من حوارات عربية عفوية',
        },
      ],
    },
    AB_9_10: {
      1: [
        {
          en: 'Recognise essential vocabulary and short familiar phrases in clearly articulated Arabic recordings',
          ar: 'تعرّف المفردات الأساسية والعبارات القصيرة المألوفة في التسجيلات العربية واضحة النطق',
        },
        {
          en: 'Select accurate visual or multiple-choice matches for explicit facts heard in short audio prompts',
          ar: 'اختيار المطابقات البصرية أو الخيارات الصحيحة للحقائق الصريحة المسموعة في المقاطع القصيرة',
        },
      ],
      2: [
        {
          en: 'Identify key facts, numbers, and familiar opinions in structured Arabic conversations',
          ar: 'تحديد الحقائق الرئيسة والأرقام والآراء المألوفة في المحادثات العربية المنظمة',
        },
        {
          en: 'Use listening checklists to capture who, what, where, and when in short spoken texts',
          ar: 'استخدام قوائم الاستماع لتحديد الشخص والحدث والمكان والزمان في النصوص المسموعة القصيرة',
        },
      ],
      3: [
        {
          en: 'Extract main themes and supporting details from recordings on youth culture, health, and environment',
          ar: 'استخلاص المحاور الرئيسة والتفاصيل الداعمة من تسجيلات حول ثقافة الشباب والصحة والبيئة',
        },
        {
          en: 'Identify cause-and-effect links signalled by familiar Arabic connectors in spoken explanations',
          ar: 'تحديد علاقات السبب والنتيجة التي تشير إليها أدوات الربط المألوفة في الشروحات الشفهية',
        },
      ],
      4: [
        {
          en: 'Interpret speakers’ intentions and stated justifications in semi-authentic interviews and reports',
          ar: 'تفسير مقاصد المتحدثين ومبرراتهم المصرح بها في المقابلات والتقارير شبه الأصيلة',
        },
        {
          en: 'Summarise contrasting viewpoints heard in structured Arabic discussions accurately',
          ar: 'تلخيص وجهات النظر المتباينة المسموعة في النقاشات العربية المنظمة بدقة',
        },
      ],
      5: [
        {
          en: 'Comprehend extended spoken Arabic at natural speed, distinguishing explicit facts from implied perspectives',
          ar: 'فهم النصوص الشفهية الممتدة بسرعة طبيعية مع التمييز بين الحقائق الصريحة والآراء الضمنية',
        },
        {
          en: 'Apply contextual inference strategies to understand unfamiliar vocabulary in global-issue podcasts',
          ar: 'تطبيق استراتيجيات الاستنتاج السياقي لفهم المفردات غير المألوفة في البرامج الصوتية حول القضايا العالمية',
        },
      ],
      6: [
        {
          en: 'Analyse how tone, register, and persuasive examples influence audience perception in spoken texts',
          ar: 'تحليل أثر النبرة والمستوى اللغوي والأمثلة الإقناعية في توجيه رأي المستمع في النصوص الشفهية',
        },
        {
          en: 'Synthesise complex audio-visual information into clear, well-evidenced written or spoken conclusions',
          ar: 'تركيب المعلومات السمعية والبصرية المركبة في استنتاجات واضحة ومدعومة بالشواهد',
        },
      ],
      7: [
        {
          en: 'Evaluate nuanced cultural perspectives and implicit arguments across authentic Arabic documentaries and debates',
          ar: 'تقويم المنظورات الثقافية الدقيقة والحجج الضمنية عبر الوثائقيات والمناظرات العربية الأصيلة',
        },
        {
          en: 'Respond critically to subtle shifts in speaker stance using accurate, well-justified spoken evidence',
          ar: 'الاستجابة النقدية للتحولات الدقيقة في موقف المتحدث بالاعتماد على شواهد شفهية دقيقة ومعللة',
        },
      ],
    },
  },

  'ab-crit-b': {
    AB_6_7: {
      1: [
        {
          en: 'Decode familiar Arabic words and short vowelised sentences using phonics and sight-word recognition',
          ar: 'فك رموز الكلمات العربية المألوفة والجمل القصيرة المشكولة بالاعتماد على الصوتيات وتمييز الكلمات البصرية',
        },
        {
          en: 'Match simple written Arabic labels and captions to corresponding images accurately',
          ar: 'مطابقة العناوين والتعليقات المكتوبة البسيطة باللغة العربية مع الصور المقابلة لها بدقة',
        },
      ],
      2: [
        {
          en: 'Locate explicit information such as names, dates, and simple preferences in short, illustrated texts',
          ar: 'تحديد المعلومات الصريحة كالأسماء والتواريخ والتفضيلات البسيطة في النصوص القصيرة المصورة',
        },
        {
          en: 'Use glossaries and visual cues to understand basic vocabulary in guided reading tasks',
          ar: 'استخدام المسارد والدعامات البصرية لفهم المفردات الأساسية في مهام القراءة الموجهة',
        },
      ],
      3: [
        {
          en: 'Identify the main idea and sequence of events in short, structured narratives and messages',
          ar: 'تحديد الفكرة الرئيسة وتسلسل الأحداث في القصص القصيرة والرسائل المنظمة',
        },
        {
          en: 'Recognise basic text types (email, poster, diary entry) and their communicative purpose',
          ar: 'تعرّف أنماط النصوص الأساسية (البريد الإلكتروني، الملصق، اليوميات) والغرض التواصلي لكل منها',
        },
      ],
      4: [
        {
          en: 'Extract supporting details and simple cause-and-effect ideas from adapted Arabic texts',
          ar: 'استخلاص التفاصيل الداعمة وعلاقات السبب والنتيجة البسيطة من النصوص العربية المبسطة',
        },
        {
          en: 'Deduce the meaning of unfamiliar words using familiar Arabic word roots and sentence context',
          ar: 'استنتاج معاني الكلمات غير المألوفة بالاعتماد على الجذور العربية المألوفة وسياق الجملة',
        },
      ],
      5: [
        {
          en: 'Demonstrate solid comprehension of familiar written texts by answering explicit and simple inferential questions',
          ar: 'إظهار فهم متمكن للنصوص المكتوبة المألوفة عبر الإجابة عن الأسئلة الصريحة والاستنتاجية البسيطة',
        },
        {
          en: 'Identify the writer’s purpose and intended audience with relevant evidence from the passage',
          ar: 'تحديد غرض الكاتب والجمهور المستهدف مع تقديم شواهد مناسبة من النص',
        },
      ],
      6: [
        {
          en: 'Analyse simple stylistic choices, descriptive phrases, and attitudes within adapted Arabic articles',
          ar: 'تحليل الاختيارات الأسلوبية البسيطة والعبارات الوصفية والمواقف في المقالات العربية الموائمة',
        },
        {
          en: 'Compare key information and viewpoints across two short texts on a shared cultural theme',
          ar: 'مقارنة المعلومات الرئيسة ووجهات النظر عبر نصين قصيرين حول موضوع ثقافي مشترك',
        },
      ],
      7: [
        {
          en: 'Interpret implicit meanings and cultural nuances independently in extended, age-appropriate Arabic texts',
          ar: 'تفسير المعاني الضمنية والدلالات الثقافية باستقلالية في النصوص العربية الممتدة المناسبة للمرحلة',
        },
        {
          en: 'Construct well-supported personal responses linking textual features to global and cultural contexts',
          ar: 'بناء استجابات شخصية مدعومة بالشواهد تربط السمات النصية بالسياقات العالمية والثقافية',
        },
      ],
    },
    AB_8: {
      1: [
        {
          en: 'Recognise high-frequency nouns, verbs, and short phrases in scaffolded Arabic reading passages',
          ar: 'تعرّف الأسماء والأفعال عالية التكرار والعبارات القصيرة في نصوص القراءة العربية المدعومة',
        },
        {
          en: 'Identify explicit facts in short texts with the support of guided questions and glossaries',
          ar: 'تحديد الحقائق الصريحة في النصوص القصيرة بالاستعانة بالأسئلة الموجهة والمسارد اللغوية',
        },
      ],
      2: [
        {
          en: 'Understand short paragraphs on everyday school, family, and leisure topics without translating every word',
          ar: 'فهم فقرات قصيرة حول موضوعات المدرسة والأسرة والهوايات دون الحاجة إلى ترجمة كل كلمة',
        },
        {
          en: 'Identify key grammatical clues (pronouns, verb prefixes, negatives) to clarify who performs each action',
          ar: 'تحديد القرائن النحوية الأساسية (الضمائر وسوابق الأفعال وأدوات النفي) لتحديد الفاعل والمعنى',
        },
      ],
      3: [
        {
          en: 'Summarise main ideas and supporting examples from adapted articles on lifestyle and community topics',
          ar: 'تلخيص الأفكار الرئيسة والأمثلة الداعمة في المقالات المبسطة حول نمط الحياة والمجتمع',
        },
        {
          en: 'Identify text format features and intended audience in emails, brochures, and short blogs',
          ar: 'تحديد سمات تنسيق النص والجمهور المستهدف في الرسائل الإلكترونية والمنشورات والمدونات القصيرة',
        },
      ],
      4: [
        {
          en: 'Make logical inferences about characters’ feelings or writer opinions supported by text phrases',
          ar: 'تقديم استنتاجات منطقية حول مشاعر الشخصيات أو آراء الكاتب مدعومة بعبارات من النص',
        },
        {
          en: 'Read short unvowelised texts on familiar topics smoothly using morphological and contextual cues',
          ar: 'قراءة النصوص القصيرة غير المشكولة في الموضوعات المألوفة بسلاسة باستخدام القرائن الصرفية والسياقية',
        },
      ],
      5: [
        {
          en: 'Analyse connections between ideas and explain simple persuasive techniques in adapted Arabic texts',
          ar: 'تحليل الروابط بين الأفكار وتفسير أساليب الإقناع البسيطة في النصوص العربية الموائمة',
        },
        {
          en: 'Select accurate textual quotes or paraphrases to justify comprehension responses clearly',
          ar: 'اختيار اقتباسات نصية دقيقة أو إعادة صياغة واضحة لتبرير إجابات الفهم القرائي',
        },
      ],
      6: [
        {
          en: 'Evaluate the writer’s tone, message, and cultural perspective across multi-paragraph authentic texts',
          ar: 'تقويم نبرة الكاتب ورسالته ومنظوره الثقافي عبر النصوص الأصيلة متعددة الفقرات',
        },
        {
          en: 'Synthesise information from two contrasting texts to draw balanced, text-based conclusions',
          ar: 'تركيب المعلومات من نصين متباينين للوصول إلى استنتاجات متوازنة مستندة إلى النص',
        },
      ],
      7: [
        {
          en: 'Interpret subtle implicit meanings, idiomatic expressions, and cultural allusions in authentic Arabic texts',
          ar: 'تفسير المعاني الضمنية الدقيقة والتعبيرات الاصطلاحية والإشارات الثقافية في النصوص العربية الأصيلة',
        },
        {
          en: 'Critique how textual structure and word choice reinforce purpose with insightful, evidence-rich commentary',
          ar: 'نقد دور البناء النصي واختيار الألفاظ في تعزيز الغرض بتعليق ثاقب وغني بالشواهد',
        },
      ],
    },
    AB_9_10: {
      1: [
        {
          en: 'Locate explicit details and familiar thematic vocabulary in short, scaffolded reading passages',
          ar: 'تحديد التفاصيل الصريحة والمفردات الموضوعية المألوفة في مقاطع القراءة القصيرة المدعومة',
        },
        {
          en: 'Use structural clues such as headings and bullet points to navigate short Arabic texts',
          ar: 'توظيف القرائن الشكلية كالعناوين والنقاط الرئيسة لتصفح النصوص العربية القصيرة',
        },
      ],
      2: [
        {
          en: 'Identify main ideas in short informational texts on familiar cultural and personal topics',
          ar: 'تحديد الأفكار الرئيسة في النصوص المعلوماتية القصيرة حول موضوعات ثقافية وشخصية مألوفة',
        },
        {
          en: 'Apply root-pattern recognition to infer meanings of unfamiliar derived nouns and verbs',
          ar: 'تطبيق تمييز الجذر والوزن لاستنتاج معاني الأسماء والأفعال المشتقة غير المألوفة',
        },
      ],
      3: [
        {
          en: 'Distinguish stated facts from writer opinions in structured Arabic articles and blog posts',
          ar: 'التمييز بين الحقائق المصرح بها وآراء الكاتب في المقالات والمدونات العربية المنظمة',
        },
        {
          en: 'Explain the purpose and format conventions of varied text types such as reports, interviews, and adverts',
          ar: 'تفسير الغرض والخصائص الشكلية لأنماط نصية متنوعة كالتقارير والمقابلات والإعلانات',
        },
      ],
      4: [
        {
          en: 'Analyse cause-and-effect arguments and supporting evidence in semi-authentic articles on global themes',
          ar: 'تحليل حجج السبب والنتيجة والأدلة الداعمة في المقالات شبه الأصيلة حول القضايا العالمية',
        },
        {
          en: 'Identify implied viewpoints and tone shifts using accurate textual references',
          ar: 'تحديد وجهات النظر الضمنية وتحولات النبرة باستخدام إحالات نصية دقيقة',
        },
      ],
      5: [
        {
          en: 'Read extended unvowelised Arabic texts fluently, interpreting both explicit content and implicit intent',
          ar: 'قراءة النصوص العربية الممتدة غير المشكولة بطلاقة مع تفسير المضمون الصريح والقصد الضمني',
        },
        {
          en: 'Evaluate how descriptive language and rhetorical questions engage the intended reader',
          ar: 'تقويم دور اللغة الوصفية والأسئلة البلاغية في إشراك القارئ المستهدف',
        },
      ],
      6: [
        {
          en: 'Synthesise themes, structural choices, and cultural perspectives across authentic journalistic and literary texts',
          ar: 'تركيب المحاور والاختيارات البنائية والمنظورات الثقافية عبر نصوص صحفية وأدبية أصيلة',
        },
        {
          en: 'Justify nuanced textual interpretations clearly with integrated Arabic quotations and commentary',
          ar: 'تبرير التفسيرات النصية الدقيقة بوضوح عبر اقتباسات عربية مدمجة وتعليق تحليلي',
        },
      ],
      7: [
        {
          en: 'Analyse critically complex authentic Arabic texts, examining subtle irony, register, and cultural assumptions',
          ar: 'التحليل النقدي للنصوص العربية الأصيلة المركبة مع فحص المفارقة الدقيقة والمستوى اللغوي والافتراضات الثقافية',
        },
        {
          en: 'Formulate independent, perceptive evaluations linking linguistic nuance to broader intercultural perspectives',
          ar: 'صياغة تقويمات مستقلة ونافذة تربط الدلالات اللغوية الدقيقة بالمنظورات الثقافية العالمية الأوسع',
        },
      ],
    },
  },

  'ab-crit-c': {
    AB_6_7: {
      1: [
        {
          en: 'Produce short, rehearsed Arabic greetings, introductions, and simple answers using visual prompts',
          ar: 'نطق التحيات المتدرب عليها والتعريف بالنفس والإجابات البسيطة باللغة العربية باستخدام موجهات بصرية',
        },
        {
          en: 'Practise clear pronunciation of distinctive Arabic sounds (such as Haa, Ayn, and Qaf) in core vocabulary',
          ar: 'التدرب على النطق الواضح للأصوات العربية المميزة (مثل الحاء والعين والقاف) في المفردات الأساسية',
        },
      ],
      2: [
        {
          en: 'Ask and answer simple, familiar questions about family, school, and daily routines using sentence frames',
          ar: 'طرح أسئلة بسيطة ومألوفة والإجابة عنها حول الأسرة والمدرسة والروتين اليومي باستخدام قوالب جمل',
        },
        {
          en: 'Speak in short connected phrases rather than isolated single words during paired dialogues',
          ar: 'التحدث بعبارات قصيرة مترابطة بدلاً من الاكتفاء بكلمات مفردة أثناء الحوارات الثنائية',
        },
      ],
      3: [
        {
          en: 'Deliver a brief prepared oral presentation on a familiar topic with intelligible pronunciation and pacing',
          ar: 'تقديم عرض شفهي قصير مُعدّ مسبقاً حول موضوع مألوف بنطق مفهوم وإيقاع مناسب',
        },
        {
          en: 'Use simple conjunctions and time expressions to link spoken ideas smoothly',
          ar: 'استخدام أدوات الربط البسيطة وعبارات الزمن لوصل الأفكار الشفهية بسلاسة',
        },
      ],
      4: [
        {
          en: 'Sustain short unscripted conversations on familiar topics while expressing basic likes and reasons',
          ar: 'مواصلة محادثات قصيرة غير مكتوبة حول موضوعات مألوفة مع التعبير عن التفضيلات والأسباب البسيطة',
        },
        {
          en: 'Apply accurate gender agreement and present/past verb forms in familiar spoken sentences',
          ar: 'تطبيق مطابقة التذكير والتأنيث وصيغ الفعل المضارع والماضي بدقة في الجمل الشفهية المألوفة',
        },
      ],
      5: [
        {
          en: 'Speak clearly and confidently in structured role-plays and discussions with minimal reliance on notes',
          ar: 'التحدث بوضوح وثقة في تمثيل الأدوار والنقاشات المنظمة بأقل قدر من الاعتماد على الملاحظات',
        },
        {
          en: 'Self-correct basic pronunciation or grammatical slips naturally while communicating ideas',
          ar: 'التصحيح الذاتي للهفوات الصوتية أو النحوية البسيطة بصورة طبيعية أثناء توصيل الأفكار',
        },
      ],
      6: [
        {
          en: 'Express personal opinions and simple comparisons using varied vocabulary and accurate Arabic connectors',
          ar: 'التعبير عن الآراء الشخصية والمقارنات البسيطة باستخدام مفردات متنوعة وروابط عربية دقيقة',
        },
        {
          en: 'Interact responsively with peers by asking relevant follow-up questions in Arabic',
          ar: 'التفاعل الإيجابي مع الزملاء عبر طرح أسئلة متابعة وثيقة الصلة باللغة العربية',
        },
      ],
      7: [
        {
          en: 'Communicate fluently and spontaneously across familiar and moderately unfamiliar topics with natural intonation',
          ar: 'التواصل بطلاقة وعفوية في موضوعات مألوفة وشبه جديدة بتنغيم طبيعي واضح',
        },
        {
          en: 'Adapt register and culturally appropriate expressions smoothly to engage listeners effectively',
          ar: 'تكييف المستوى اللغوي والتعبيرات المناسبة ثقافياً بسلاسة لإشراك المستمعين بفاعلية',
        },
      ],
    },
    AB_8: {
      1: [
        {
          en: 'Use rehearsed classroom expressions and short survival phrases to participate in guided speaking tasks',
          ar: 'توظيف التعبيرات الصفية المتدرب عليها والعبارات الأساسية للمشاركة في مهام التحدث الموجهة',
        },
        {
          en: 'Focus on clear articulation of familiar words when reading short dialogues aloud',
          ar: 'التركيز على وضوح نطق الكلمات المألوفة عند قراءة الحوارات القصيرة جهراً',
        },
      ],
      2: [
        {
          en: 'Respond to simple open-ended prompts about hobbies, travel, or school using basic sentence patterns',
          ar: 'الاستجابة للأسئلة المفتوحة البسيطة حول الهوايات والسفر أو المدرسة باستخدام أنماط جمل أساسية',
        },
        {
          en: 'Include basic reasons using "li-anna" (because) to expand short spoken statements',
          ar: 'تضمين أسباب بسيطة باستخدام «لأن» لتوسيع العبارات الشفهية القصيرة',
        },
      ],
      3: [
        {
          en: 'Organise short spoken descriptions coherently across past, present, and future time references',
          ar: 'تنظيم الأوصاف الشفهية القصيرة بتماسك عبر الإشارات الزمنية للماضي والحاضر والمستقبل',
        },
        {
          en: 'Maintain conversational flow in paired tasks by using polite turn-taking phrases in Arabic',
          ar: 'الحفاظ على تدفق المحادثة في المهام الثنائية باستخدام عبارات تبادل الأدوار المهذبة بالعربية',
        },
      ],
      4: [
        {
          en: 'Discuss personal experiences and community topics with clear pronunciation and growing grammatical accuracy',
          ar: 'مناقشة التجارب الشخصية والموضوعات المجتمعية بنطق واضح ودقة نحوية متنامية',
        },
        {
          en: 'Compare options and justify preferences using relevant topic vocabulary without reading from a script',
          ar: 'مقارنة الخيارات وتبرير التفضيلات باستخدام مفردات الموضوع المناسبة دون القراءة من نص مكتوب',
        },
      ],
      5: [
        {
          en: 'Speak with steady fluency during short presentations, linking ideas logically with varied connectors',
          ar: 'التحدث بطلاقة مستقرة أثناء العروض القصيرة مع ربط الأفكار منطقياً بأدوات ربط متنوعة',
        },
        {
          en: 'Handle unexpected follow-up questions in familiar contexts using clear paraphrasing strategies',
          ar: 'التعامل مع أسئلة المتابعة غير المتوقعة في السياقات المألوفة باستخدام استراتيجيات إعادة الصياغة الواضحة',
        },
      ],
      6: [
        {
          en: 'Communicate ideas convincingly using accurate verb tenses, idiomatic phrases, and natural Arabic cadence',
          ar: 'توصيل الأفكار بإقناع باستخدام أزمنة أفعال دقيقة وتعبيرات اصطلاحية وإيقاع عربي طبيعي',
        },
        {
          en: 'Engage actively in group discussions by building on others’ points and offering reasoned viewpoints',
          ar: 'المشاركة الفاعلة في النقاشات الجماعية عبر البناء على أفكار الآخرين وتقديم آراء معللة',
        },
      ],
      7: [
        {
          en: 'Sustain articulate, spontaneous Arabic dialogue across diverse topics with minimal grammatical errors',
          ar: 'مواصلة حوار عربي طلق وعفوي في موضوعات متنوعة بأقل قدر من الأخطاء النحوية',
        },
        {
          en: 'Demonstrate high intercultural awareness by selecting polite, nuanced expressions suited to audience and context',
          ar: 'إظهار وعي ثقافي رفيع عبر انتقاء التعبيرات المهذبة والدقيقة الملائمة للمستمع والسياق',
        },
      ],
    },
    AB_9_10: {
      1: [
        {
          en: 'Participate in structured oral exchanges using memorised phrases and clear pronunciation support',
          ar: 'المشاركة في التبادلات الشفهية المنظمة باستخدام عبارات محفوظة ودعم لوضوح النطق',
        },
        {
          en: 'Answer direct personal questions in complete simple sentences with minimal hesitation',
          ar: 'الإجابة عن الأسئلة الشخصية المباشرة بجمل بسيطة تامة بأقل قدر من التردد',
        },
      ],
      2: [
        {
          en: 'Describe familiar experiences and plans orally using basic sequence and time markers',
          ar: 'وصف التجارب والخطط المألوفة شفهياً باستخدام علامات التسلسل والزمن الأساسية',
        },
        {
          en: 'Maintain clear pronunciation and accurate stress on multi-syllable topic vocabulary',
          ar: 'الحفاظ على وضوح النطق ومواضع النبر الصحيحة في المفردات الموضوعية متعددة المقاطع',
        },
      ],
      3: [
        {
          en: 'Express opinions on familiar social and youth topics supported by simple examples',
          ar: 'التعبير عن الآراء في الموضوعات الاجتماعية والشبابية المألوفة مدعومة بأمثلة بسيطة',
        },
        {
          en: 'Use appropriate comparative and causal structures smoothly during structured speaking assessments',
          ar: 'استخدام تراكيب المقارنة والسببية المناسبة بسلاسة أثناء التقييمات الشفهية المنظمة',
        },
      ],
      4: [
        {
          en: 'Sustain clear, organised two-minute oral responses combining narrative detail and personal reflection',
          ar: 'تقديم استجابات شفهية منظمة لمدة دقيقتين تجمع بين التفاصيل السردية والتأمل الشخصي',
        },
        {
          en: 'Respond spontaneously to visual stimuli and follow-up prompts with steady accuracy',
          ar: 'الاستجابة العفوية للمحفزات البصرية وأسئلة المتابعة بدقة مستقرة',
        },
      ],
      5: [
        {
          en: 'Communicate nuanced viewpoints fluently in formal and informal Arabic registers with strong grammatical control',
          ar: 'توصيل وجهات النظر الدقيقة بطلاقة في المستويين الرسمي وغير الرسمي مع تحكم نحوي قوي',
        },
        {
          en: 'Sustain natural conversational interaction by elaborating answers and inviting others’ perspectives',
          ar: 'إدامة التفاعل الحواري الطبيعي عبر توسيع الإجابات واستطلاع آراء الآخرين',
        },
      ],
      6: [
        {
          en: 'Present persuasive oral arguments on global or cultural issues using rich vocabulary and cohesive transitions',
          ar: 'تقديم حجج شفهية مقنعة حول القضايا العالمية أو الثقافية باستخدام مفردات غنية وروابط متماسكة',
        },
        {
          en: 'Demonstrate consistent accuracy in pronunciation, tense control, and complex clause linking',
          ar: 'إظهار دقة متواصلة في النطق وضبط الأزمنة وربط الجمل المركبة',
        },
      ],
      7: [
        {
          en: 'Engage in extended, unscripted academic and cultural discussions with impressive fluency, nuance, and poise',
          ar: 'خوض نقاشات أكاديمية وثقافية ممتدة وغير مكتوبة بطلاقة لافتة ودقة واتزان',
        },
        {
          en: 'Employ sophisticated idiomatic phrasing and register control seamlessly to persuade and inspire listeners',
          ar: 'توظيف التعبيرات الاصطلاحية الراقية وضبط المستوى اللغوي بسلاسة لإقناع المستمعين والتأثير فيهم',
        },
      ],
    },
  },

  'ab-crit-d': {
    AB_6_7: {
      1: [
        {
          en: 'Write individual Arabic letters and familiar words legibly with accurate letter connection and spacing',
          ar: 'كتابة الحروف العربية والكلمات المألوفة بخط واضح مع مراعاة الوصل والفصل الصحيحين',
        },
        {
          en: 'Complete simple guided sentences about self and family using model frames and word banks',
          ar: 'إكمال جمل موجهة بسيطة حول الذات والأسرة باستخدام نماذج مساعدة وبنوك كلمات',
        },
      ],
      2: [
        {
          en: 'Write short, intelligible simple sentences expressing basic facts and likes with accurate word order',
          ar: 'كتابة جمل بسيطة قصيرة ومفهومة تعبر عن الحقائق الأساسية والتفضيلات بترتيب سليم للكلمات',
        },
        {
          en: 'Check spelling of high-frequency words and basic Ta Marbuta endings using personal word lists',
          ar: 'مراجعة إملاء الكلمات عالية التكرار ونهايات التاء المربوطة باستخدام قوائم المفردات الشخصية',
        },
      ],
      3: [
        {
          en: 'Compose a short paragraph of connected sentences using basic conjunctions (wa, thumma, lakin)',
          ar: 'كتابة فقرة قصيرة من جمل مترابطة باستخدام أدوات الربط الأساسية (و، ثم، لكن)',
        },
        {
          en: 'Apply basic noun-adjective gender agreement accurately across familiar descriptive writing tasks',
          ar: 'تطبيق مطابقة التذكير والتأنيث بين الاسم والصفة بدقة في مهام الكتابة الوصفية المألوفة',
        },
      ],
      4: [
        {
          en: 'Organise ideas into structured short texts (such as emails or diary entries) suited to the format',
          ar: 'تنظيم الأفكار في نصوص قصيرة مهيكلة (كالرسائل الإلكترونية واليوميات) بما يلائم القالب المطلوب',
        },
        {
          en: 'Use both present and past tense verbs consistently with accurate subject prefixes and suffixes',
          ar: 'استخدام فعلي المضارع والماضي باتساق مع ضبط سوابق الفاعل ولواحقه بدقة',
        },
      ],
      5: [
        {
          en: 'Write cohesive multi-paragraph texts on familiar themes incorporating supporting details and clear transitions',
          ar: 'كتابة نصوص متماسكة متعددة الفقرات حول موضوعات مألوفة تتضمن تفاصيل داعمة وروابط واضحة',
        },
        {
          en: 'Demonstrate reliable control of common spelling patterns and basic Arabic punctuation',
          ar: 'إظهار تحكم موثوق في الأنماط الإملائية الشائعة وعلامات الترقيم العربية الأساسية',
        },
      ],
      6: [
        {
          en: 'Expand written expression with varied adjectives, opinions, and simple causal explanations',
          ar: 'توسيع التعبير الكتابي باستخدام نعوت متنوعة وآراء شخصية وتعليلات سببية بسيطة',
        },
        {
          en: 'Adapt tone and greeting/closing conventions appropriately to match audience and text type',
          ar: 'تكييف النبرة وصيغ التحية والختام بصورة مناسبة لتلائم الجمهور ونوع النص',
        },
      ],
      7: [
        {
          en: 'Compose engaging, well-organised Arabic texts using rich thematic vocabulary and high grammatical accuracy',
          ar: 'كتابة نصوص عربية جذابة ومحكمة التنظيم باستخدام مفردات موضوعية ثرية ودقة نحوية عالية',
        },
        {
          en: 'Incorporate culturally authentic expressions and complex sentences naturally to elevate written fluency',
          ar: 'تضمين التعبيرات الثقافية الأصيلة والجمل المركبة بصورة طبيعية للارتقاء بسلاسة الكتابة',
        },
      ],
    },
    AB_8: {
      1: [
        {
          en: 'Construct clear simple sentences on familiar topics using structured sentence builders and vocabulary banks',
          ar: 'بناء جمل بسيطة واضحة حول موضوعات مألوفة باستخدام بناة الجمل وبنوك المفردات',
        },
        {
          en: 'Improve orthographic legibility and accuracy in copying and adapting key Arabic phrases',
          ar: 'تحسين وضوح الخط والدقة الإملائية عند كتابة العبارات العربية الأساسية وتعديلها',
        },
      ],
      2: [
        {
          en: 'Link short sentences using basic connectors and time markers to narrate familiar routines',
          ar: 'ربط الجمل القصيرة باستخدام أدوات الربط الأساسية وعلامات الزمن لسرد الروتين المألوف',
        },
        {
          en: 'Verify correct verb conjugation and pronoun suffixes in guided short writing tasks',
          ar: 'التحقق من صحة تصريف الأفعال والضمائر المتصلة في مهام الكتابة القصيرة الموجهة',
        },
      ],
      3: [
        {
          en: 'Write organised paragraphs covering past events, present habits, and future plans on familiar themes',
          ar: 'كتابة فقرات منظمة تتناول أحداثاً ماضية وعادات حاضرة وخططاً مستقبلية في موضوعات مألوفة',
        },
        {
          en: 'Apply Idafa (genitive) and adjective agreement rules accurately in descriptive sentences',
          ar: 'تطبيق قواعد الإضافة ومطابقة الصفة بدقة في الجمل الوصفية',
        },
      ],
      4: [
        {
          en: 'Produce coherent short articles, letters, or blog posts with clear openings, body details, and conclusions',
          ar: 'إنتاج مقالات قصيرة أو رسائل أو تدوينات متماسكة تتضمن مقدمات واضحة وتفاصيل وخواتيم مناسبة',
        },
        {
          en: 'Self-edit drafts to correct recurring errors in Hamza placement, Ta Marbuta, and verb endings',
          ar: 'تحرير المسودات ذاتياً لتصحيح الأخطاء المتكررة في مواضع الهمزة والتاء المربوطة ونهايات الأفعال',
        },
      ],
      5: [
        {
          en: 'Develop well-structured essays expressing personal viewpoints supported by clear examples and reasons',
          ar: 'كتابة موضوعات محكمة البناء تعبر عن وجهات نظر شخصية مدعومة بأمثلة وأسباب واضحة',
        },
        {
          en: 'Use varied transitional markers and subordinate clauses to improve flow across paragraphs',
          ar: 'استخدام أدوات ربط انتقالية متنوعة وجمل فرعية لتحسين تدفق الأفكار بين الفقرات',
        },
      ],
      6: [
        {
          en: 'Write with strong lexical variety, accurate syntax, and clear awareness of formal versus informal register',
          ar: 'الكتابة بتنوع معجمي قوي ونحو دقيق ووعي واضح بالفرق بين الأسلوب الرسمي وغير الرسمي',
        },
        {
          en: 'Revise drafts thoughtfully to strengthen clarity, conciseness, and reader engagement',
          ar: 'تنقيح المسودات بوعي لتعزيز الوضوح والإيجاز وجذب القارئ',
        },
      ],
      7: [
        {
          en: 'Craft articulate, well-evidenced Arabic compositions demonstrating confident control of complex structures',
          ar: 'صياغة نصوص عربية بليغة ومدعومة بالأدلة تُظهر تحكماً واثقاً في التراكيب المركبة',
        },
        {
          en: 'Deploy nuanced idioms, persuasive phrasing, and near-flawless spelling across varied text types',
          ar: 'توظيف التعبيرات الاصطلاحية الدقيقة والصياغة الإقناعية والإملاء السليم عبر أنماط نصية متنوعة',
        },
      ],
    },
    AB_9_10: {
      1: [
        {
          en: 'Produce intelligible short sentences on familiar themes using guided structural templates',
          ar: 'إنتاج جمل قصيرة مفهومة حول موضوعات مألوفة باستخدام قوالب بنائية موجهة',
        },
        {
          en: 'Proofread short written work for accurate word spacing, Ta Marbuta, and basic verb forms',
          ar: 'تدقيق الأعمال الكتابية القصيرة للتحقق من المسافات والتاء المربوطة وصيغ الأفعال الأساسية',
        },
      ],
      2: [
        {
          en: 'Organise related sentences into brief paragraphs describing experiences, preferences, and daily life',
          ar: 'تنظيم الجمل المترابطة في فقرات موجزة تصف التجارب والتفضيلات والحياة اليومية',
        },
        {
          en: 'Use basic connectors and frequency adverbs to improve sentence variety in short responses',
          ar: 'استخدام أدوات الربط الأساسية وظروف التكرار لتنويع الجمل في الاستجابات القصيرة',
        },
      ],
      3: [
        {
          en: 'Write cohesive multi-paragraph responses using appropriate text-type conventions (article, letter, report)',
          ar: 'كتابة استجابات متماسكة متعددة الفقرات مع مراعاة خصائص نوع النص (مقال، رسالة، تقرير)',
        },
        {
          en: 'Maintain consistent tense control across past, present, and future contexts with minimal prompting',
          ar: 'الحفاظ على اتساق ضبط الأزمنة عبر الماضي والحاضر والمستقبل بأقل قدر من التوجيه',
        },
      ],
      4: [
        {
          en: 'Develop reasoned arguments on youth, cultural, or environmental topics using clear supporting examples',
          ar: 'تطوير حجج معللة حول قضايا الشباب أو الثقافة أو البيئة باستخدام أمثلة داعمة واضحة',
        },
        {
          en: 'Apply accurate grammatical agreement and complex conjunctions to connect contrasting ideas',
          ar: 'تطبيق المطابقة النحوية الدقيقة وأدوات الربط المركبة لوصل الأفكار المتباينة',
        },
      ],
      5: [
        {
          en: 'Communicate ideas effectively in extended Arabic writing with strong paragraph cohesion and register control',
          ar: 'توصيل الأفكار بفاعلية في الكتابة العربية الممتدة مع ترابط فقرات قوي وضبط للمستوى اللغوي',
        },
        {
          en: 'Demonstrate solid orthographic accuracy across medial/final Hamza and derived vocabulary',
          ar: 'إظهار دقة إملائية راسخة في الهمزات المتوسطة والمتطرفة والمفردات المشتقة',
        },
      ],
      6: [
        {
          en: 'Craft persuasive and reflective Arabic texts incorporating rich lexical range, idioms, and balanced structure',
          ar: 'صياغة نصوص عربية إقناعية وتأملية تضم ثراءً معجمياً وتعابير اصطلاحية وبناءً متوازناً',
        },
        {
          en: 'Evaluate and refine written drafts independently for stylistic precision and communicative impact',
          ar: 'تقويم المسودات الكتابية وتنقيحها باستقلالية لتحقيق الدقة الأسلوبية والأثر التواصلي',
        },
      ],
      7: [
        {
          en: 'Produce sophisticated, cohesive Arabic compositions across demanding genres with rare grammatical slips',
          ar: 'إنتاج نصوص عربية رفيعة ومتماسكة عبر أجناس كتابية متقدمة بندرة الهفوات النحوية',
        },
        {
          en: 'Articulate nuanced intercultural perspectives fluently using authentic, stylistically expressive Arabic',
          ar: 'التعبير عن منظورات ثقافية دقيقة بطلاقة باستخدام لغة عربية أصيلة ومعبرة أسلوبياً',
        },
      ],
    },
  },
};

export function generateInitialCommentBank(): CommentRecord[] {
  const records: CommentRecord[] = [];
  const levels: ProficiencyLevelNumber[] = [1, 2, 3, 4, 5, 6, 7];

  // Arabic A: Grades 6–12
  const arabicAGrades = [6, 7, 8, 9, 10, 11, 12];
  const arabicACriteria = ['aa-listening', 'aa-speaking', 'aa-reading', 'aa-writing', 'aa-grammar', 'aa-vocab'];

  for (const grade of arabicAGrades) {
    const band = getGradeBand('Arabic A', grade) as 'AA_6_7' | 'AA_8_9' | 'AA_10_12';
    for (const criterionId of arabicACriteria) {
      for (const level of levels) {
        const templates = ARABIC_A_BANK[criterionId]?.[band]?.[level] ?? [];
        templates.forEach((tpl, idx) => {
          const cleanEn = tpl.en.replace(/\.+$/, '').trim();
          records.push({
            id: `AA-G${grade}-${criterionId.replace('aa-', '').toUpperCase()}-L${level}-${idx + 1}`,
            subject: 'Arabic A',
            grade,
            level,
            criterionId,
            englishDescriptor: cleanEn,
            arabicTranslation: tpl.ar.trim(),
            academicReference:
              'UAE MOE National Curriculum for Arabic Language (First Language) — Platform Pedagogical Adaptation',
            referenceGradeOrPhase: `UAE MOE Grade ${grade}`,
            approvalStatus: 'approved',
            sourceClassification: 'Platform Adaptation (Curriculum-Aligned)',
            updatedAt: '2025-02-15T09:00:00Z',
            updatedBy: 'Arabic Department Curriculum Lead',
          });
        });
      }
    }
  }

  // Arabic B: Grades 6–10
  const arabicBGrades = [6, 7, 8, 9, 10];
  const arabicBCriteria = ['ab-crit-a', 'ab-crit-b', 'ab-crit-c', 'ab-crit-d'];

  for (const grade of arabicBGrades) {
    const band = getGradeBand('Arabic B', grade) as 'AB_6_7' | 'AB_8' | 'AB_9_10';
    const mapping = ARABIC_B_MAPPING_NOTES[grade];
    for (const criterionId of arabicBCriteria) {
      for (const level of levels) {
        const templates = ARABIC_B_BANK[criterionId]?.[band]?.[level] ?? [];
        templates.forEach((tpl, idx) => {
          const cleanEn = tpl.en.replace(/\.+$/, '').trim();
          records.push({
            id: `AB-G${grade}-${criterionId.replace('ab-crit-', 'C').toUpperCase()}-L${level}-${idx + 1}`,
            subject: 'Arabic B',
            grade,
            level,
            criterionId,
            englishDescriptor: cleanEn,
            arabicTranslation: tpl.ar.trim(),
            academicReference:
              'IB MYP Language Acquisition & UAE MOE Additional Language Framework — Platform Scaffolded Adaptation',
            referenceGradeOrPhase: `${mapping.ibPhaseEn} | ${mapping.suggestedUaeRangeEn}`,
            approvalStatus: 'approved',
            sourceClassification: 'Platform Adaptation (Curriculum-Aligned)',
            updatedAt: '2025-02-15T09:00:00Z',
            updatedBy: 'Arabic B Curriculum Coordinator',
          });
        });
      }
    }
  }

  // Add sample pending-review items so Department Head Admin Dashboard demonstrates moderation workflow
  // (Strictly excluded from Teacher Read-Only Official Bank until approved)
  records.push(
    {
      id: 'AA-G9-READING-L5-PENDING',
      subject: 'Arabic A',
      grade: 9,
      level: 5,
      criterionId: 'aa-reading',
      englishDescriptor:
        'Compare how classical and modern Arab poets employ nature imagery to reflect inner emotional states',
      arabicTranslation:
        'مقارنة توظيف الشعراء العرب القدامى والمعاصرين لصور الطبيعة في التعبير عن الحالات الوجدانية الداخلية',
      academicReference: 'Draft Proposed Descriptor — Awaiting UAE MOE Grade 9 Outcome Verification',
      referenceGradeOrPhase: 'UAE MOE Grade 9 (Pending Review)',
      approvalStatus: 'pending',
      sourceClassification: 'Platform Adaptation (Curriculum-Aligned)',
      updatedAt: '2025-02-20T11:30:00Z',
      updatedBy: 'Faculty Submission',
    },
    {
      id: 'AB-G8-CD-L4-PENDING',
      subject: 'Arabic B',
      grade: 8,
      level: 4,
      criterionId: 'ab-crit-d',
      englishDescriptor:
        'Draft structured persuasive posters encouraging sustainable habits at school using imperative verbs',
      arabicTranslation:
        'إعداد ملصقات إقناعية منظمة تشجع على العادات المستدامة في المدرسة باستخدام أفعال الأمر',
      academicReference: 'Draft Proposed Descriptor — Awaiting IB MYP Phase 2–3 Alignment Review',
      referenceGradeOrPhase: 'IB MYP Phase 2–3 | Suggested starting point: UAE Gr 5–6',
      approvalStatus: 'pending',
      sourceClassification: 'Platform Adaptation (Curriculum-Aligned)',
      updatedAt: '2025-02-21T14:15:00Z',
      updatedBy: 'Faculty Submission',
    }
  );

  return records;
}
