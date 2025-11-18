## Q1. TypeScript-এ `interface` এবং `type` এর মধ্যে কিছু পার্থক্য

### ১) Declaration Merging (শুধু interface এ কাজ করে)

`interface` একাধিকবার একই নামে ডিফাইন করলে TypeScript সেগুলোকে **merge** করে ফেলে।

```ts
interface IUser {
  name: string;
}

interface IUser {
  age: number;
}

const user: IUser = {
  name: "Robiul",
  age: 23,
};
```
উপরের কোডে দুইটা IUser interface একসাথে merge হয়ে গেছে —
অর্থাৎ IUser এখন এই structure:
```ts
{
  name: string;
  age: number;
}
```
কিন্তু type–এ এটা করা যায় না:
```ts
type User = {
  name: string;
};

আবার একই নামের type ডিফাইন করলে এরর দেখাবে
type User = {
  age: number;
};
```
### ২) Extend / Inheritance করার ধরন
interface এবং type দুটোই extend করা যায়, তবে লেখার ধরন একটু আলাদা।

✅ Interface দিয়ে extend করা
```ts
interface IStudent {
  name: string;
  studentId: string;
}

interface IFaculty extends IStudent {
  facultyId: string;
  salary: number;
}

const fac: IFaculty = {
  name: "Hasan",
  studentId: "2104101",
  facultyId: "21101",
  salary: 80000,
};
```
✅ Type দিয়ে extend করা (intersection & দিয়ে)
```ts
type Student = {
  name: string;
  studentId: string;
};

type Faculty = Student & {
  facultyId: string;
  salary: number;
};

const fac2: Faculty = {
  name: "Hasan",
  studentId: "2104101",
  facultyId: "21101",
  salary: 80000,
};
```
### ৩) কোন ক্ষেত্রে কোনটা বেশি ব্যবহার করা হয়
Object structure / model (যেমন User, Product, Faculty ইত্যাদি)
👉 অনেক সময় interface বেশি প্রেফার করা হয়, কারণঃ

- future এ সহজে extend করা যায় (extends)
- declaration merging সাপোর্ট করে

অন্যদিকে Array, function, union, tuple, primitive alias ইত্যাদি ক্ষেত্রে
👉 type বেশি ফ্লেক্সিবল এবং বেশি ব্যবহার হয়,কারণঃ

- এক্ষেত্রে কোড তুলনামূলক ভাবে পরিষ্কার দেখায় Interface এর চেয়ে

## Q5. Union এবং Intersection টাইপ
### Union Type (একাধিক টাইপের মধ্যে যেকোনো একটি)
Union মানে হলো — একটি ভ্যারিয়েবল বা প্যারামিটার একাধিক টাইপের যেকোনো একটিতে হতে পারে।
সিম্বল: |

উদাহরণ: "Faculty" | "Student"

```ts
type Role = "Faculty" | "Student" | "";

function details(role: Role) {
  if (role === "Faculty") {
    console.log("You are a Faculty");
  } else if (role === "Student") {
    console.log("You are a Student");
  } else {
    console.log("You are not Faculty and Student");
  }
}

details("Faculty");
details("");
```
এখানে role কখনো "Faculty", কখনো "Student", আর কখনো খালি string ("") হতে পারে।
details ফাংশনের ভিতরে আমরা প্রথমে role চেক করি, তারপর উপযুক্তভাবে হ্যান্ডেল করি।

### Intersection Type (একাধিক টাইপের সবগুলোই একসাথে)
Intersection মানে হলো — একটা টাইপকে এমনভাবে বানানো, যাতে একাধিক টাইপের সব প্রপার্টি একসাথে থাকে।
সিম্বল: &

উদাহরণ: Student & Teacher

```ts
type Student = {
  role: "student";
  name: string;
  studentId: number;
};

type Teacher = {
  role: "teacher";
  name: string;
  salary: number;
};

type Faculty = Student & Teacher;

const faculty1: Faculty = {
  role: "teacher",
  name: "Sabbir",
  studentId: 2104075,
  salary: 70000,
};
```
Faculty হচ্ছে Student এবং Teacher — দুইটা টাইপের intersection।
মানে Faculty অবজেক্টে অবশ্যই থাকতে হবে:

Student থেকে: role, name, studentId

Teacher থেকে: role, name, salary

সবগুলো প্রপার্টি একসাথে না থাকলে Faculty টাইপ ভ্যালিড হবে না।
