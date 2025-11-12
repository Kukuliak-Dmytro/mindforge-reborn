//interface
/**
 * Tutor education entry interface.
 */
export interface ITutorEducation {
  id: string;
  tutorProfileId: string;
  institution: string;
  fieldOfStudy: string;
  degree: string;
  startDate: string;
  endDate: string | null;
}

//interface
/**
 * Tutor experience entry interface.
 */
export interface ITutorExperience {
  id: string;
  tutorProfileId: string;
  institution: string;
  title: string;
  startDate: string;
  endDate: string | null;
}

//interface
/**
 * Subject interface.
 */
export interface ISubject {
  id: string;
  name: string;
}

//interface
/**
 * Category interface.
 */
export interface ICategory {
  id: string;
  name: string;
  isRecurring: boolean;
}

//interface
/**
 * Tutor subject entry interface.
 */
export interface ITutorSubject {
  id: string;
  tutorProfileId: string;
  subjectId: string;
  categoryId: string;
  price: number;
  subject: ISubject;
  category: ICategory;
}

//interface
/**
 * Tutor profile user information interface.
 */
export interface ITutorProfileUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  updatedAt: string;
  createdAt: string;
}

//interface
/**
 * Complete tutor profile interface with all related data.
 */
export interface ITutorProfile {
  user: ITutorProfileUser;
  education: ITutorEducation[];
  experiences: ITutorExperience[];
  subjects: ITutorSubject[];
}

//interface
/**
 * Parameters for updating tutor profile.
 */
export interface IUpdateTutorProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  education?: {
    add?: Array<{
      institution: string;
      fieldOfStudy: string;
      degree: string;
      startDate: string;
      endDate?: string;
    }>;
    remove?: string[];
  };
  experience?: {
    add?: Array<{
      institution: string;
      title: string;
      startDate: string;
      endDate?: string;
    }>;
    remove?: string[];
  };
  subjects?: {
    add?: Array<{
      subjectId: string;
      categoryId: string;
      price: number;
    }>;
    remove?: Array<{
      subjectId: string;
      categoryId: string;
    }>;
  };
}
