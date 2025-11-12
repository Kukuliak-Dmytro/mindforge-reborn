'use client';

import { useQuery } from '@tanstack/react-query';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { SubjectsSection } from './subjects-section';
import { useProfile } from '@/hooks/use-profile';
import { getSubjects, getCategories } from '@/services/subjects';

export default function TutorSubjectsPage() {
  const { data: profile, isLoading } = useProfile();
  const { data: subjectsResponse } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
  const { data: categoriesResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const subjects = subjectsResponse?.data || [];
  const categories = categoriesResponse?.data || [];

  if (isLoading) {
    return (
      <PageWrapper>
        <Section title="Мої предмети">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  if (!profile || !('tutorProfile' in profile)) {
    return (
      <PageWrapper>
        <Section title="Мої предмети">
          <div className="text-center py-8">
            <p className="text-red-500">Помилка завантаження профілю</p>
          </div>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Section title="Мої предмети">
        <SubjectsSection
          subjects={profile.tutorProfile.subjects}
          availableSubjects={subjects}
          availableCategories={categories}
        />
      </Section>
    </PageWrapper>
  );
} 