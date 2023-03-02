import type { DecodedIdToken } from "firebase-admin/auth";
import type { Timestamp } from "firebase-admin/firestore";

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

type CustomIdToken = { role?: UserRole };
type ExtendedDecodedIdToken = DecodedIdToken & CustomIdToken;

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
export type { ExtendedDecodedIdToken };
