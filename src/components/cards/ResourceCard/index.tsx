import { Card, Badge, FavoriteButton, Icon } from '../../ui';
import type { Resource, SectionId, FavoriteItem } from '../../../types';

interface ResourceCardProps {
  resource: Resource;
  section: SectionId;
  onDetails: (resource: Resource) => void;
}

const sectionColors: Record<string, string> = {
  learning: '#3B82F6',
  youtube: '#F43F5E',
  work: '#10B981',
  tools: '#F59E0B',
  tests: '#8B5CF6',
  dashboard: '#14B8A6',
  about: '#64748B',
  favorites: '#F43F5E',
};

function getSectionColor(section: SectionId): string {
  return sectionColors[section] || '#3B82F6';
}

export default function ResourceCard({ resource, section, onDetails }: ResourceCardProps) {
  const favoriteItem: FavoriteItem = { ...resource, section };

  return (
    <Card accentColor={getSectionColor(section)}>
      <div className="p-5 pb-3" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }}>
            <Icon name={resource.logo} className="w-5 h-5" color={getSectionColor(section)} />
          </div>
          <h3 className="font-bold text-main text-lg leading-tight line-clamp-2">{resource.name}</h3>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-sm text-second leading-relaxed line-clamp-2">{resource.description}</p>
        <ul className="space-y-1.5">
          {resource.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-second">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: getSectionColor(section), boxShadow: `0 0 6px ${getSectionColor(section)}80` }} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="info">{resource.category}</Badge>
          <Badge variant="default">{resource.language}</Badge>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <button
          onClick={() => onDetails(resource)}
          className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: `${getSectionColor(section)}15`,
            color: getSectionColor(section),
          }}
        >
          التفاصيل
        </button>
        <FavoriteButton item={favoriteItem} />
      </div>
    </Card>
  );
}
