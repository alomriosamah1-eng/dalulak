import { Users } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { communitiesData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface CommunitiesPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function CommunitiesPage({ searchQuery, onDetails }: CommunitiesPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(communitiesData, searchQuery) : communitiesData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Users className="w-6 h-6" />}
        title="المجتمعات"
        subtitle="مجتمعات تقنية وعلمية عربية وعالمية للتواصل والتعلم"
        color="#9b59b6"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="communities" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
