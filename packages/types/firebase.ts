import type { IdTokenResult, ParsedToken } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

//

type UserRole = "student" | "organization";
type UserDocument = {
  id: string;
  username?: string;
  role?: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//

type StudentOrganization = {
  userId: string;
  name: string;
};
type StudentDocument = {
  id: string;
  name: string;
  studentId: string;
  bio: string;
  organizations: StudentOrganization[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//

type OrganizationMember = {
  userId: string;
  name: string;
};
type OrganizationDocument = {
  id: string;
  name: string;
  description: string;
  members: OrganizationMember[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//

type LinkData = {
  title: string;
  url: string;
};
type LinkDocument = {
  id: string;
  userId: string;
  data: LinkData[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//

type FeedbackDocument = {
  id: string;
  userId: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//

type AuthUser = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
};
type CustomParsedToken = { role?: UserRole };
type ExtendedParsedToken = ParsedToken & CustomParsedToken;
type ExtendedIdTokenResult = Omit<IdTokenResult, "claims"> & { claims: ExtendedParsedToken };

export type {
  UserRole,
  UserDocument,
  StudentOrganization,
  StudentDocument,
  OrganizationMember,
  OrganizationDocument,
  LinkData,
  LinkDocument,
  FeedbackDocument,
};
export type { AuthUser, CustomParsedToken, ExtendedParsedToken, ExtendedIdTokenResult };
