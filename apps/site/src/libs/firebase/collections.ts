import {
  CollectionReference,
  FieldPath,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import type {
  DocumentSnapshot,
  FirestoreDataConverter,
  UpdateData,
  QueryConstraint,
  OrderByDirection,
  QueryOrderByConstraint,
  QuerySnapshot,
  SetOptions,
  WhereFilterOp,
} from "firebase/firestore";

import { UserDocument, StudentDocument, OrganizationDocument } from "@unej-io/types/firebase";

import { firestore } from "./const";

type CollectionOptions<T> = {
  converter: FirestoreDataConverter<T>;
};

class Collection<T extends { id: string }> {
  public name: string;
  private $ref: CollectionReference<T>;
  private $converter: FirestoreDataConverter<T>;

  constructor(name: string, options: CollectionOptions<T>) {
    this.name = name;

    this.$converter = options.converter;
    this.$ref = collection(firestore, this.name).withConverter(this.$converter);
  }

  private $doc(...segments: string[]) {
    return doc(firestore, this.name, ...segments).withConverter(this.$converter);
  }

  public getCollectionRef() {
    return this.$ref;
  }

  public getDocRef(path: string) {
    return this.$doc(path);
  }

  public async addDoc(data: Omit<T, "id">) {
    if ("id" in data && typeof data.id === "string") {
      throw new Error("Shouldn't have id field");
    } else {
      return await addDoc(this.$ref, data);
    }
  }

  public async setDoc(data: Pick<T, "id"> & Partial<Omit<T, "id">>, options: SetOptions = { merge: true }) {
    if ("id" in data && typeof data.id === "string") {
      const { id, ...rest } = data;
      return await setDoc(this.$doc(id), rest as T, options);
    } else {
      throw new Error("Should have id field");
    }
  }

  public async getDoc(...segments: string[]) {
    return await getDoc(this.$doc(...segments));
  }

  public async getDocs() {
    return await getDocs(this.$ref);
  }

  public async updateDoc(data: Pick<T, "id"> & Partial<Omit<T, "id">>) {
    const { id, ...rest } = data;

    const doc = await this.getDoc(id);

    if (doc.exists()) {
      await updateDoc(doc.ref, rest as UpdateData<T>);
      return true;
    } else {
      return false;
    }
  }

  public async query(
    getConstraints: (options: {
      orderBy: <P extends (string & {}) | FieldPath | Exclude<keyof Omit<T, "id">, symbol | number>>(
        fieldPath: P,
        options?: OrderByDirection
      ) => QueryOrderByConstraint;
      where: <P extends (string & {}) | FieldPath | Exclude<keyof Omit<T, "id">, symbol | number>>(
        fieldPath: P,
        opStr: WhereFilterOp,
        value: unknown
      ) => QueryConstraint;
    }) => QueryConstraint[]
  ) {
    const q = query(this.$ref, ...getConstraints({ orderBy, where }));

    return await getDocs(q);
  }
}

const isTimestamp = (value: unknown): value is Timestamp => value instanceof Timestamp;
const getExistSnapshotData = <T>(snapshot: DocumentSnapshot<T>) => (snapshot.exists() ? snapshot.data() : undefined);
const getFirstSnapshotData = <T>(snapshot: QuerySnapshot<T>) => (snapshot.empty ? undefined : snapshot.docs[0].data());
const createCreatedAt = (value: unknown) => (isTimestamp(value) ? value : serverTimestamp());
const createUpdatedAt = () => serverTimestamp();
const getCreatedAt = (value: unknown) => (isTimestamp(value) ? value : new Timestamp(0, 0));
const getUpdatedAt = (value: unknown, fallback: unknown) =>
  isTimestamp(value) ? value : isTimestamp(fallback) ? fallback : new Timestamp(0, 0);

const UserCollection = new Collection<UserDocument>("users", {
  converter: {
    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const createdAt = getCreatedAt(data.createdAt);
      const updatedAt = getUpdatedAt(data.updatedAt, createdAt);

      return {
        id: snapshot.id,
        username: data.username,
        role: data.role,
        createdAt,
        updatedAt,
      };
    },
    toFirestore(doc) {
      return {
        username: doc.username,
        role: doc.role,
        createdAt: createCreatedAt(doc.createdAt),
        updatedAt: createUpdatedAt(),
      };
    },
  },
});
const getUserDocByUID = async (uid: string) => await UserCollection.getDoc(uid);
const queryUserByUsername = async (username: string) => await UserCollection.query(({ where }) => [where("username", "==", username)]);
const createUser = async (uid: string, username: string) => await UserCollection.setDoc({ id: uid, username });
const findUserByUID = async (uid: string) => getExistSnapshotData(await getUserDocByUID(uid));
const findUserByUsername = async (username: string) => getFirstSnapshotData(await queryUserByUsername(username));
export { UserCollection, getUserDocByUID, queryUserByUsername, createUser, findUserByUID, findUserByUsername };

const StudentCollection = new Collection<StudentDocument>("students", {
  converter: {
    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const createdAt = getCreatedAt(data.createdAt);
      const updatedAt = getUpdatedAt(data.updatedAt, createdAt);

      return {
        id: snapshot.id,
        studentId: data.studentId,
        name: data.name,
        bio: data.bio,
        organizations: data.organizations,
        createdAt,
        updatedAt,
      };
    },
    toFirestore(doc) {
      return {
        studentId: doc.studentId,
        name: doc.name,
        bio: doc.bio,
        organizations: doc.organizations,
        createdAt: createCreatedAt(doc.createdAt),
        updatedAt: createUpdatedAt(),
      };
    },
  },
});
const queryStudentByStudentId = async (studentId: string) =>
  await StudentCollection.query(({ where }) => [where("studentId", "==", studentId)]);
const findStudentByStudentId = async (studentId: string) => getFirstSnapshotData(await queryStudentByStudentId(studentId));
export { StudentCollection, queryStudentByStudentId, findStudentByStudentId };

const OrganizationCollection = new Collection<OrganizationDocument>("organizations", {
  converter: {
    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const createdAt = getCreatedAt(data.createdAt);
      const updatedAt = getUpdatedAt(data.updatedAt, createdAt);

      return {
        id: snapshot.id,
        name: data.name,
        description: data.description,
        members: data.members,
        createdAt,
        updatedAt,
      };
    },
    toFirestore(doc) {
      return {
        name: doc.name,
        description: doc.description,
        members: doc.members,
        createdAt: createCreatedAt(doc.createdAt),
        updatedAt: createUpdatedAt(),
      };
    },
  },
});
export { OrganizationCollection };
