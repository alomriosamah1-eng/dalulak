import { Youtube } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { youtubeData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface YoutubePageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function YoutubePage({ searchQuery, onDetails }: YoutubePageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(youtubeData, searchQuery) : youtubeData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Youtube className="w-6 h-6" />}
        title="قنوات يوتيوب التعليمية"
        subtitle="أفضل القنوات التعليمية المجانية على اليوتيوب"
        color="#e74c3c"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="youtube" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
