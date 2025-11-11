"use client";

import { createContext, useContext, ReactNode } from "react";
import type { UserRole } from "./routing";

//interface
/**
 * Role context value.
 */
interface RoleContextValue {
  role: UserRole | null;
}

//constant
/**
 * Role context.
 */
const RoleContext = createContext<RoleContextValue | undefined>(undefined);

//interface
/**
 * Role provider props.
 */
interface RoleProviderProps {
  children: ReactNode;
  role: UserRole | null;
}

//component
/**
 * RoleProvider component.
 * Provides role context to child components.
 */
export const RoleProvider = ({ children, role }: RoleProviderProps) => {
  //return
  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
};

//function
/**
 * Hook to access role context.
 * @throws Error if used outside RoleProvider
 */
export const useRole = (): UserRole | null => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context.role;
};

//function
/**
 * Hook to check if user has a specific role.
 */
export const useHasRole = (requiredRole: UserRole): boolean => {
  const role = useRole();
  return role === requiredRole;
};

//function
/**
 * Hook to check if user is a student.
 */
export const useIsStudent = (): boolean => {
  return useHasRole("STUDENT");
};

//function
/**
 * Hook to check if user is a tutor.
 */
export const useIsTutor = (): boolean => {
  return useHasRole("TUTOR");
};

//function
/**
 * Hook to check if user is an admin.
 */
export const useIsAdmin = (): boolean => {
  return useHasRole("ADMIN");
};



