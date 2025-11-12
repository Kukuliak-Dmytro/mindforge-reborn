import { TutorProfileModule } from "@/app/modules/tutor/profile/tutor-profile.module";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { tutorProfileQueryOptions } from "@/app/entities/api/tutor-profile/tutor-profile.query";
export default async function TutorProfilePage() {
  await getQueryClient().prefetchQuery(tutorProfileQueryOptions());
  return <TutorProfileModule />;
}
