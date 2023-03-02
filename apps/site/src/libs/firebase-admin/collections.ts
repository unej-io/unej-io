import { CollectionReference, FieldPath, Timestamp } from "firebase-admin/firestore";
import type {
  DocumentSnapshot,
  FirestoreDataConverter,
  QuerySnapshot,
  SetOptions,
  UpdateData,
  WhereFilterOp,
} from "firebase-admin/firestore";

import { UserDocument, StudentDocument, OrganizationDocument } from "@unej-io/types/firebase-admin";

import { firestore } from "./const";

type QueryConstraint = {
  fieldPath: (string & {}) | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

function where<P extends (string & {}) | FieldPath>(fieldPath: P, opStr: WhereFilterOp, value: unknown): QueryConstraint {
  return { fieldPath, opStr, value };
}

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
    this.$ref = firestore.collection(this.name).withConverter(this.$converter);
  }

  private $doc(path: string) {
    return this.$ref.doc(path).withConverter(this.$converter);
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
      return await this.$ref.add(data as T);
    }
  }

  public async setDoc(data: Pick<T, "id"> & Partial<Omit<T, "id">>, options: SetOptions = { merge: true }) {
    if ("id" in data && typeof data.id === "string") {
      const { id, ...rest } = data;
      return await this.$ref.doc(id).set(rest as T, options);
    } else {
      throw new Error("Should have id field");
    }
  }

  public async getDoc(path: string) {
    return await this.$doc(path).get();
  }

  public async getDocs() {
    return await this.$ref.get();
  }

  public async updateDoc(data: Pick<T, "id"> & Partial<Omit<T, "id">>) {
    const { id, ...rest } = data;

    const doc = await this.getDoc(id);

    if (doc.exists) {
      await doc.ref.update(rest as UpdateData<T>);
      return true;
    } else {
      return false;
    }
  }

  public async deleteDoc(id: string) {
    const doc = await this.getDoc(id);
    if (doc.exists) {
      await doc.ref.delete();
      return true;
    } else {
      return false;
    }
  }

  public async deleteDocs() {
    const docs = await this.getDocs();

    if (docs.empty) {
      return 0;
    } else {
      const refs = docs.docs.map((doc) => doc.ref);

      await firestore.runTransaction(async (t) => {
        for (const ref of refs) t.delete(ref);
      });

      return refs.length;
    }
  }

  public async query(
    getConstraints: (options: {
      where: <P extends (string & {}) | FieldPath | Exclude<keyof T, symbol | number>>(
        fieldPath: P,
        opStr: WhereFilterOp,
        value: unknown
      ) => QueryConstraint;
    }) => QueryConstraint[]
  ) {
    const constraints = getConstraints({ where });

    if (constraints.length > 0) {
      const [first, ...others] = constraints;

      const ref = others.reduce((_ref, { fieldPath, opStr, value }) => {
        return _ref.where(fieldPath, opStr, value);
      }, this.$ref.where(first.fieldPath, first.opStr, first.value));

      return await ref.get();
    } else {
      return await this.$ref.get();
    }
  }
}

const isTimestamp = (value: unknown): value is Timestamp => value instanceof Timestamp;
const getExistSnapshotData = <T>(snapshot: DocumentSnapshot<T>) => (snapshot.exists ? snapshot.data() : undefined);
const getFirstSnapshotData = <T>(snapshot: QuerySnapshot<T>) => (snapshot.empty ? undefined : snapshot.docs[0].data());
const createCreatedAt = (value: unknown) => (isTimestamp(value) ? value : Timestamp.now());
const createUpdatedAt = () => Timestamp.now();
const getCreatedAt = (value: unknown) => (isTimestamp(value) ? value : new Timestamp(0, 0));
const getUpdatedAt = (value: unknown, fallback: unknown) =>
  isTimestamp(value) ? value : isTimestamp(fallback) ? fallback : new Timestamp(0, 0);

const UserCollection = new Collection<UserDocument>("users", {
  converter: {
    fromFirestore(snapshot) {
      const data = snapshot.data();

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
    fromFirestore(snapshot) {
      const data = snapshot.data();

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
    fromFirestore(snapshot) {
      const data = snapshot.data();

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
