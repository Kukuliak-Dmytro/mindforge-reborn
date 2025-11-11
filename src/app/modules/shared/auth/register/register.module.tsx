"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/pkg/libraries/locale";
import { ISignUpSchema, signUpSchema } from "../auth.interface";
import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/app/shared/components/ui/field";
import { useState } from "react";
import { signUp } from "../auth.service";

//component
/**
 * RegisterModule component for user registration.
 */
export const RegisterModule = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: ISignUpSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await signUp(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        locale,
      );
      // Redirect to home page after successful registration
      router.push("/", { locale });
    } catch (err: unknown) {
      setError((err as Error).message || t("auth_register_error"));
    } finally {
      setIsLoading(false);
    }
  };

  //return
  return (
    <div
      className="max-w-xl w-full space-y-8 p-8 bg-foreground rounded-medium
        shadow-double">
      <div>
        <h2
          className="mt-6 text-center text-3xl font-extrabold text-primary-text">
          {t("auth_register_title")}
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-text">
          {t("auth_or")}{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80">
            {t("auth_register_link_text")}
          </Link>
        </p>
      </div>
      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Field>
            <FieldLabel htmlFor="firstName">
              {t("auth_register_label_firstName")}
            </FieldLabel>
            <Input
              {...register("firstName")}
              id="firstName"
              type="text"
              placeholder={t("auth_register_placeholder_firstName")}
            />
            <FieldError errors={errors.firstName ? [errors.firstName] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">
              {t("auth_register_label_lastName")}
            </FieldLabel>
            <Input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder={t("auth_register_placeholder_lastName")}
            />
            <FieldError errors={errors.lastName ? [errors.lastName] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">
              {t("auth_register_label_email")}
            </FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder={t("auth_register_placeholder_email")}
            />
            <FieldError errors={errors.email ? [errors.email] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">
              {t("auth_register_label_password")}
            </FieldLabel>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder={t("auth_register_placeholder_password")}
            />
            <FieldError errors={errors.password ? [errors.password] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">
              {t("auth_register_label_confirmPassword")}
            </FieldLabel>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder={t("auth_register_placeholder_confirmPassword")}
            />
            <FieldError
              errors={errors.confirmPassword ? [errors.confirmPassword] : []}
            />
          </Field>

          {error && (
            <div
              className="bg-danger/10 border border-danger/20 text-danger px-4
                py-3 rounded-small">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? t("auth_register_button_loading")
                : t("auth_register_button")}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};
