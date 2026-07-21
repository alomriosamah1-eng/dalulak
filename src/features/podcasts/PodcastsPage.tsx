import { Headphones } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { podcastsData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface PodcastsPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function PodcastsPage({ searchQuery, onDetails }: PodcastsPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(podcastsData, searchQuery) : podcastsData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Headphones className="w-6 h-6" />}
        title="البودكاست"
        subtitle="أفضل البودكاستات التقنية والعلمية العربية والعالمية"
        color="#f97316"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="podcasts" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
