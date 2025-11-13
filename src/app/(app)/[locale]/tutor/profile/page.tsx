import { cookies } from "next/headers";
import { TutorProfileModule } from "@/app/modules/tutor/profile/tutor-profile.module";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { tutorProfileQueryOptions } from "@/app/entities/api/tutor-profile/tutor-profile.query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function TutorProfilePage() {
  const queryClient = getQueryClient();

  // Get cookies from the request for server-side authentication
  const cookieStore = await cookies();
  // Format cookies as a cookie header string (name=value; name2=value2)
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // Prefetch without await to enable streaming
  queryClient.prefetchQuery(
    tutorProfileQueryOptions({
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TutorProfileModule />
    </HydrationBoundary>
  );
}
