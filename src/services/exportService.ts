import type { Resource } from '../types';

export interface ExportData {
  version: string;
  exportedAt: string;
  totalResources: number;
  resources: Resource[];
}

export class ExportService {
  exportToJson(resources: Resource[]): { data: string; filename: string } {
    const exportData: ExportData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      totalResources: resources.length,
      resources,
    };

    return {
      data: JSON.stringify(exportData, null, 2),
      filename: `dalylak-resources-${new Date().toISOString().split('T')[0]}.json`,
    };
  }

  exportToCSV(resources: Resource[]): { data: string; filename: string } {
    const headers = ['name', 'nameAr', 'description', 'type', 'language', 'level', 'pricing', 'officialUrl', 'categoryId', 'tags', 'rating'];
    const rows = resources.map(r => [
      this.escapeCSV(r.name),
      this.escapeCSV(r.nameAr || ''),
      this.escapeCSV(r.description),
      r.type,
      r.language,
      r.level,
      r.pricing,
      r.officialUrl,
      r.categoryId,
      r.tags.join('; '),
      r.rating?.toString() || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    return {
      data: csv,
      filename: `dalylak-resources-${new Date().toISOString().split('T')[0]}.csv`,
    };
  }

  exportToMarkdown(resources: Resource[]): string {
    const byCategory = new Map<string, Resource[]>();
    for (const r of resources) {
      const list = byCategory.get(r.categoryId) || [];
      list.push(r);
      byCategory.set(r.categoryId, list);
    }

    let md = `# دليلك التعليمي والعملي - قاعدة الموارد\n\n`;
    md += `> آخر تحديث: ${new Date().toLocaleDateString('ar-SA')}\n`;
    md += `> إجمالي الموارد: ${resources.length}\n\n`;

    for (const [category, items] of byCategory) {
      md += `## ${category}\n\n`;
      for (const r of items) {
        md += `- [${r.name}](${r.officialUrl}) — ${r.description}\n`;
        if (r.tags.length > 0) {
          md += `  - الوسوم: ${r.tags.join('، ')}\n`;
        }
      }
      md += '\n';
    }

    return md;
  }

  private escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  importFromJson(json: string): Resource[] {
    const data = JSON.parse(json) as ExportData;
    if (!data.resources || !Array.isArray(data.resources)) {
      throw new Error('Invalid export format: resources array not found');
    }
    return data.resources;
  }

  downloadFile(data: string, filename: string, type: string = 'application/json') {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const exportService = new ExportService();
