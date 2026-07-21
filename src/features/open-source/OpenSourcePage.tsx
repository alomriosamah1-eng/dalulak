import { Github } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { openSourceData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface OpenSourcePageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function OpenSourcePage({ searchQuery, onDetails }: OpenSourcePageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(openSourceData, searchQuery) : openSourceData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Github className="w-6 h-6" />}
        title="المصادر المفتوحة"
        subtitle="أفضل المشاريع مفتوحة المصدر وقوائم الموارد الرائعة"
        color="#2c3e50"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="open-source" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
