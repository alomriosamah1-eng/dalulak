import { Briefcase } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { workData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface WorkPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function WorkPage({ searchQuery, onDetails }: WorkPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(workData, searchQuery) : workData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Briefcase className="w-6 h-6" />}
        title="منصات العمل عن بعد"
        subtitle="ابدأ رحلتك في العمل الحر والتوظيف عن بعد"
        color="#2ecc71"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="work" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
