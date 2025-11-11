"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/app/shared/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { authClient } from "@/pkg/libraries/better-auth/auth-client";

//component
/**
 * HomeModule component.
 */
export const HomeModule = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();

  // Test server-side error via API endpoint
  const handleTestServerError = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-error", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Server error occurred");
      }
    } catch (error) {
      // Error is already captured by Sentry in the API route
      console.error("Test error triggered:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Test client-side error
  const handleTestClientError = () => {
    try {
      // Add context before throwing
      Sentry.setContext("test_error", {
        location: "home_page",
        purpose: "Testing client-side Sentry integration",
        timestamp: new Date().toISOString(),
      });

      // Throw a test error
      throw new Error(
        "Sentry Test Error - Client-side test error for Sentry integration",
      );
    } catch (error) {
      // Capture the exception
      Sentry.captureException(error);
      console.error("Client test error triggered:", error);
    }
  };

  //return
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center max-w-2xl w-full space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-primary-text">
          {t("home_welcome")}
        </h1>
        <p className="mb-6 text-secondary-text">{t("home_description")}</p>

        {/* Display session information */}
        {session && (
          <div
            className="bg-foreground rounded-medium p-6 shadow-double border
              border-primary/20">
            <h2 className="text-2xl font-semibold text-primary-text mb-4">
              Session Information
            </h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="font-medium text-secondary-text">User ID:</span>
                <span className="text-primary-text">{session.user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-secondary-text">Email:</span>
                <span className="text-primary-text">{session.user.email}</span>
              </div>
              {(session.user as { role?: string }).role && (
                <div className="flex justify-between">
                  <span className="font-medium text-secondary-text">Role:</span>
                  <span className="text-primary-text">
                    {(session.user as { role?: string }).role}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium text-secondary-text">
                  Email Verified:
                </span>
                <span className="text-primary-text">
                  {session.user.emailVerified ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Button
              onClick={handleTestServerError}
              disabled={isLoading}
              variant="danger"
              size="default">
              {isLoading ? "Testing..." : t("home_test_sentry")}
            </Button>
            <Button
              onClick={handleTestClientError}
              variant="danger"
              size="default">
              {t("home_test_sentry_client")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
