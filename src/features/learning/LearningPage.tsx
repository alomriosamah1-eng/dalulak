import { BookOpen } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { learningData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface LearningPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function LearningPage({ searchQuery, onDetails }: LearningPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(learningData, searchQuery) : learningData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<BookOpen className="w-6 h-6" />}
        title="منصات التعلم المجانية"
        subtitle="اكتشف أفضل منصات التعليم المجانية مع شهادات معتمدة"
        color="#3498db"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="learning" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
