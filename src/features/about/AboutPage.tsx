import {
  Target, Eye, Heart, Shield, BookOpen,
  CheckCircle, Layers,
  Send, MessageCircle, Sparkles, Search,
  Youtube, Wrench, ClipboardCheck, Briefcase, BrainCircuit,
  Palette, Zap, TrendingUp, Globe, Users, Headphones, Mail, Book, Github,
} from 'lucide-react';
import { SectionHeader } from '../../components/ui';

const stats = [
  { icon: BookOpen, value: '1000+', label: 'مورد تعليمي', desc: 'منصات وقنوات وأدوات مختارة بعناية' },
  { icon: Sparkles, value: '17', label: 'قسم رئيسي', desc: 'تغطي التعليم والعمل والتصميم والتسويق والذكاء الاصطناعي' },
  { icon: Heart, value: '100%', label: 'محتوى مجاني', desc: 'كل الموارد متاحة بدون أي رسوم' },
  { icon: Search, value: 'فوري', label: 'بحث ذكي', desc: 'تصفية وفلترة دقيقة للوصول السريع' },
];

const sections = [
  { icon: BookOpen, title: 'منصات التعلم المجانية', desc: 'أفضل منصات التعليم المفتوح لتعلم البرمجة والتصميم وإدارة الأعمال' },
  { icon: Youtube, title: 'قنوات يوتيوب تعليمية', desc: 'قنوات عربية وعالمية متخصصة في شتى المجالات التقنية والعلمية' },
  { icon: Briefcase, title: 'منصات العمل أونلاين', desc: 'منصات موثوقة للعمل الحر وبناء مشوارك المهني المستقل' },
  { icon: Wrench, title: 'أدوات الإنتاج المجانية', desc: 'أدوات عملية تزيد إنتاجيتك وتنظم سير عملك اليومي' },
  { icon: ClipboardCheck, title: 'منصات اختبارات وتقييم', desc: 'منصات تقييم واختبارات لقياس وتطوير مهاراتك' },
  { icon: BrainCircuit, title: 'الذكاء الاصطناعي', desc: 'أحدث أدوات الذكاء الاصطناعي المجانية لتطوير عملك وإبداعك' },
  { icon: Palette, title: 'التصميم والإبداع', desc: 'أدوات وموارد التصميم الجرافيكي وتجربة المستخدم والإبداع الرقمي' },
  { icon: Briefcase, title: 'إدارة الأعمال', desc: 'موارد تعليمية في ريادة الأعمال والإدارة والقيادة' },
  { icon: Zap, title: 'الإنتاجية', desc: 'أدوات وتقنيات لزيادة إنتاجيتك وتنظيم وقتك' },
  { icon: TrendingUp, title: 'التسويق الرقمي', desc: 'أدوات وموارد التسويق الإلكتروني وتحسين محركات البحث' },
  { icon: Globe, title: 'العمل الحر', desc: 'منصات وأدوات العمل الحر والاستقلالية المهنية' },
  { icon: Users, title: 'المجتمعات', desc: 'مجتمعات تقنية وعلمية عربية وعالمية للتواصل والتعلم' },
  { icon: Headphones, title: 'البودكاست', desc: 'أفضل البودكاستات التقنية والعلمية العربية والعالمية' },
  { icon: Mail, title: 'النشرات البريدية', desc: 'نشرات بريدية تقنية وتعليمية مميزة' },
  { icon: Book, title: 'الكتب', desc: 'كتب تقنية وتعليمية مجانية بالعربية والإنجليزية' },
  { icon: Github, title: 'المصادر المفتوحة', desc: 'أفضل المشاريع مفتوحة المصدر وقوائم الموارد الرائعة' },
];

const milestones = [
  { year: '2024', event: 'انطلاقة الفكرة', detail: 'ولدت فكرة دليلك من الحاجة الملحة إلى منصة عربية تجمع أفضل الموارد التعليمية والمهنية في مكان واحد.' },
  { year: '2024', event: 'النسخة الأولى', detail: 'أُطلقت النسخة الأولى بتقنيات Vanilla JS مع قاعدة بيانات شاملة لأكثر من ١٠٠٠ مورد.' },
  { year: '2025', event: 'التحول إلى React', detail: 'أُعيد بناء المنصة بالكامل باستخدام React + TypeScript + Vite مع تصميم Glassmorphism و Neumorphism.' },
  { year: '2025', event: 'إضافة الذكاء الاصطناعي', detail: 'أُضيف قسم الذكاء الاصطناعي لمواكبة الثورة التقنية وتوفير أحدث الأدوات المجانية.' },
  { year: '2026', event: 'الإصدار المتطور', detail: 'النسخة الحالية — منصة متكاملة بتجربة مستخدم سلسة، بحث فوري، مفضلة شخصية، وتصفح متعدد الأقسام.' },
];

const methodology = [
  { step: '01', title: 'جمع وتقييم', desc: 'نبحث ونجمع أفضل الموارد التعليمية والمهنية المتاحة، ونقيّمها بدقة قبل إضافتها.' },
  { step: '02', title: 'تصنيف وترتيب', desc: 'نصنف الموارد في أقسام منظمة مع وصف دقيق وتصنيفات واضحة.' },
  { step: '03', title: 'بناء التجربة', desc: 'نصمم واجهة تفاعلية سلسة تتيح الوصول السريع لأي مورد بنقرات قليلة.' },
  { step: '04', title: 'تطوير مستمر', desc: 'نحدّث المحتوى باستمرار ونضيف موارد جديدة لنضمن لك أحدث ما في المجال.' },
];

const aboutColor = '#64748B';

export default function AboutPage() {
  return (
    <div>
      <SectionHeader
        icon={<Sparkles className="w-6 h-6" />}
        title="من نحن"
        subtitle="تعرف على رؤيتنا ورسالتنا — وقصة بناء أول دليل عربي تفاعلي للموارد التعليمية والمهنية"
        color={aboutColor}
      />

      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="relative shrink-0">
              <div className="w-56 h-64 md:w-64 md:h-80 rounded-[var(--neu-radius)] overflow-hidden"
                style={{
                  background: 'var(--neu-bg)',
                  boxShadow: 'var(--neu-shadow-outset)',
                }}
              >
                <img src="/images/osamah-portrait.jpg" alt="دليلك التعليمي والعملي" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-glow-primary)',
                }}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 0 1 4-4z" /><path d="M12 22v-6" />
                </svg>
              </div>
            </div>

            <div className="text-center lg:text-right flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold mb-4">
                <Shield size={14} />
                <span>منصة عربية تفاعلية — موارد مختارة بعناية</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                دليلك التعليمي والعملي
              </h1>
              <p className="text-lg md:text-xl" style={{ color: aboutColor }}>
                أول دليل عربي تفاعلي يجمع التعليم والعمل والإبداع
              </p>
              <p className="text-sm md:text-base text-second leading-relaxed max-w-2xl mt-4">
                منصة عربية تفاعلية وُلدت من فكرة بسيطة: أن نُسهّل الوصول إلى المعرفة، المهارة، والعمل — في مكان واحد، وبدون أي حواجز.
                نحن لسنا مجرد موقع يجمع روابط، بل نظام ذكي يربطك بكل ما تحتاجه لتتعلم، تطوّر مهاراتك، وتبدأ طريقك المهني بثقة وسلاسة.
              </p>
            </div>
          </div>
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: 'الرؤية', desc: 'أن نصبح الدليل العربي الأول الذي يجمع التعليم، الإبداع، والعمل، في منصة ذكية وسهلة الاستخدام — متاحة للجميع، في أي وقت، ومن أي مكان.' },
            { icon: Target, title: 'الرسالة', desc: 'نُسهّل الوصول إلى المعرفة والفرص المهنية عبر منصة تفاعلية تجمع أفضل الموارد المجانية في مكان واحد، مع تجربة مستخدم استثنائية.' },
            { icon: Heart, title: 'القيم', desc: 'الدقة في الاختيار، الشفافية في التصنيف، الإتقان في التنفيذ، والالتزام بتقديم الأفضل لمستخدمينا.' },
          ].map(v => (
            <div key={v.title} className="neu-card p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl glass flex items-center justify-center mb-4">
                <v.icon size={26} style={{ color: aboutColor }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-second leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Dalylak */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">لماذا دليلك؟</h2>
          <p className="text-second text-center mb-10 max-w-xl mx-auto">
            ليس لأننا الأكبر — بل لأننا نختار بعناية. كل مورد يُضاف بعد تقييم دقيق لضمان الفائدة الحقيقية.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map(s => (
              <div key={s.label} className="neu-card p-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center mb-3">
                  <s.icon size={22} style={{ color: aboutColor }} />
                </div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: aboutColor }}>{s.value}</p>
                <p className="text-xs font-semibold mb-0.5">{s.label}</p>
                <p className="text-[10px] text-muted-custom">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle, title: 'محتوى منتقى', desc: 'لا نضيف أي مورد بشكل عشوائي. كل إضافة تمر بمرحلة تقييم دقيق لضمان الجودة والفائدة.' },
              { icon: Layers, title: 'تصنيف ذكي', desc: 'مواردنا منظمة في أقسام واضحة مع وصف دقيق، وسوم تصنيف، وإشارات مرجعية لتجربة تصفح سلسة.' },
              { icon: Heart, title: 'مجاني بالكامل', desc: 'نؤمن بأن المعرفة حق للجميع. كل الموارد في دليلك مجانية — بدون اشتراكات أو مدفوعات.' },
            ].map(item => (
              <div key={item.title} className="neu-card p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon size={20} style={{ color: aboutColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-second mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">ماذا نقدم؟</h2>
          <p className="text-second text-center mb-10 max-w-xl mx-auto">
            ١٧ قسماً رئيسياً — من التعليم والتصميم إلى العمل الحر والذكاء الاصطناعي — لتغطية رحلة تطويرك بالكامل.
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 shrink-0">
              <div className="neu-card overflow-hidden h-full min-h-[300px]">
                <img src="/images/osamah-photo.jpg" alt="دليلك التعليمي والعملي" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map(s => (
                <div key={s.title} className="neu-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                      <s.icon size={20} style={{ color: aboutColor }} />
                    </div>
                    <h3 className="font-semibold text-sm">{s.title}</h3>
                  </div>
                  <p className="text-xs text-second leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">كيف نعمل؟</h2>
          <p className="text-second text-center mb-10 max-w-xl mx-auto">
            منهجية واضحة من ٤ خطوات — من جمع الموارد إلى إتاحتها لك.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {methodology.map(p => (
              <div key={p.step} className="neu-card p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3 font-bold text-sm text-white" style={{ backgroundColor: aboutColor }}>
                  {p.step}
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-xs text-second leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">مسيرة المنصة</h2>
          <p className="text-second text-center mb-10 max-w-xl mx-auto">
            من الفكرة إلى الإطلاق — رحلة مستمرة من التطوير والتحسين.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative pr-8">
              <div className="absolute right-3.5 top-2 bottom-2 w-0.5" style={{ backgroundColor: 'var(--glass-border)' }} />

              {milestones.map((m, i) => (
                <div key={m.year + m.event} className="relative pb-8 last:pb-0">
                  <div className={`absolute -right-2 w-7 h-7 rounded-full flex items-center justify-center z-10`}
                    style={{
                      backgroundColor: i === milestones.length - 1 ? aboutColor : 'var(--neu-bg)',
                      border: i === milestones.length - 1 ? 'none' : `2px solid ${aboutColor}`,
                      boxShadow: i === milestones.length - 1 ? `0 0 12px ${aboutColor}60` : 'none',
                    }}
                  >
                    <span className={`text-[10px] font-bold ${i === milestones.length - 1 ? 'text-white' : ''}`} style={{ color: i === milestones.length - 1 ? undefined : aboutColor }}>
                      {m.year.slice(2)}
                    </span>
                  </div>

                  <div className="mr-10">
                    <span className="text-xs font-bold" style={{ color: aboutColor }}>{m.year}</span>
                    <h3 className="font-semibold text-sm mt-0.5">{m.event}</h3>
                    <p className="text-xs text-second mt-1 leading-relaxed">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">عن مؤسس المشروع</h2>
          <p className="text-second text-center mb-10 max-w-xl mx-auto">
            من فكرة إلى منصة — رحلة شغف بالتقنية والتعليم.
          </p>

          <div className="neu-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-[var(--neu-radius)] overflow-hidden shrink-0"
                style={{ boxShadow: 'var(--neu-shadow-outset)' }}
              >
                <img src="/images/osamah-avatar.jpg" alt="المهندس أسامة العُمري" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-right flex-1">
                <h3 className="text-xl font-bold">المهندس أسامة العُمري</h3>
                <p className="text-sm text-second">محلل ومخطط مشاريع — مطور ويب — مؤسس دليلك التعليمي والعملي</p>
                <p className="text-xs text-muted-custom mt-2 leading-relaxed">
                  مهندس أنظمة بخبرة تزيد عن 10 سنوات في تحليل الأنظمة وتطوير الحلول الرقمية.
                  يؤمن بأن المعرفة والعمل والإبداع يجب أن تكون متاحة لكل شاب عربي بنقرة واحدة.
                  لهذا بنى دليلك — منصة تجمع أفضل الموارد المجانية في مكان واحد، بتجربة مستخدم استثنائية.
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="neu-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[var(--neu-radius)] overflow-hidden shrink-0"
              style={{ boxShadow: 'var(--neu-shadow-outset)' }}
            >
              <img src="/images/osamah-avatar.jpg" alt="دليلك" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-right flex-1">
              <h3 className="text-xl font-bold mb-1">هل لديك اقتراح أو مورد؟</h3>
              <p className="text-sm text-second">
                نسعى باستمرار لتطوير دليلك. إذا كان لديك اقتراح أو تعرف موردًا مفيدًا، لا تتردد في التواصل معنا.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-xs mt-3">
                <a href="https://t.me/hqjjq6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#229ED9] hover:underline"><Send size={14} /> تلجرام</a>
                <a href="https://wa.me/message/PXHGS5BKPSB2H1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:underline"><MessageCircle size={14} /> واتس اب</a>
              </div>
            </div>
            <div className="shrink-0">
              <a
                href="https://t.me/hqjjq6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Send size={16} />
                تواصل معنا
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
