"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/pkg/libraries/locale";
import { ISignInSchema, signInSchema } from "../auth.interface";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/app/shared/components/ui/field";
import { useState } from "react";
import { signIn } from "../auth.service";

//component
/**
 * LoginModule component for user authentication.
 */
export const LoginModule = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: ISignInSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn(data.email, data.password, locale);
      // Redirect to home page after successful login
      router.push("/", { locale });
    } catch (err: unknown) {
      setError((err as Error).message || t("auth_login_error"));
    } finally {
      setIsLoading(false);
    }
  };

  //return
  return (
    <div
      className="max-w-xl w-full space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6
        md:p-8 bg-foreground rounded-medium shadow-double mx-auto">
      <div>
        <h2
          className="mt-2 sm:mt-4 md:mt-6 text-center text-2xl sm:text-3xl
            font-extrabold text-primary-text">
          {t("auth_login_title")}
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-secondary-text">
          {t("auth_or")}{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80">
            {t("auth_login_link_text")}
          </Link>
        </p>
      </div>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
          <Field>
            <FieldLabel htmlFor="email">
              {t("auth_login_label_email")}
            </FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder={t("auth_login_placeholder_email")}
            />
            {/* allows to display multiple errors in the same field */}
            {/* convert to an array  */}
            <FieldError errors={errors.email ? [errors.email] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">
              {t("auth_login_label_password")}
            </FieldLabel>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder={t("auth_login_placeholder_password")}
            />
            <FieldError errors={errors.password ? [errors.password] : []} />
          </Field>

          {error && (
            <div
              className="bg-danger/10 border border-danger/20 text-danger px-3
                sm:px-4 py-2 sm:py-3 rounded-small text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto">
              {isLoading
                ? t("auth_login_button_loading")
                : t("auth_login_button")}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};
