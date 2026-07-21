import { Mail } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { newslettersData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface NewslettersPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function NewslettersPage({ searchQuery, onDetails }: NewslettersPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(newslettersData, searchQuery) : newslettersData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Mail className="w-6 h-6" />}
        title="النشرات البريدية"
        subtitle="نشرات بريدية تقنية وتعليمية مميزة تصلك أسبوعياً"
        color="#3b82f6"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="newsletters" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
