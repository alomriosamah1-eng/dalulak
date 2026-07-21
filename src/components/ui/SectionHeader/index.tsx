interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

export default function SectionHeader({ icon, title, subtitle, color }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color }}>
          {title}
        </h2>
      </div>
      <div className="w-24 h-1 rounded-full mx-auto" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <p className="mt-4 text-second text-lg max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}
