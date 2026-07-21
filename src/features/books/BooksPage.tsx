import { Book } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { booksData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface BooksPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function BooksPage({ searchQuery, onDetails }: BooksPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(booksData, searchQuery) : booksData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Book className="w-6 h-6" />}
        title="الكتب"
        subtitle="كتب تقنية وتعليمية مجانية بالعربية والإنجليزية"
        color="#8b5cf6"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="books" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
