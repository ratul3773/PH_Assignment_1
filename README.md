
Q1.TypeScript-এ interface এবং type এর মধ্যে কিছু পার্থক্য-
১.interface একাধিকবার একই নামে ডিফাইন করলে TypeScript সেগুলোকে merge করে ফেলে।

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

উপরের কোডে দুইটা IUser interface একসাথে merge হয়ে গেছে — অর্থাৎ IUser এখন { name: string; age: number }.

কিন্তু type–এ এটা করা যায় না:

type User = {
  name: string;
};

আবার একই নামের type ডিফাইন করলে এরর দেখাবে
type User = {
  age: number;
};

২.interface এবং type দুটোই extend করা যায়, তবে লেখার ধরন একটু আলাদা।

interface IStudent {
  name: string;
  studentId:string
}

interface IFaculty extends IStudent {
  FacultyId: string;
  salary:number
}

const Fac: IFaculty = {
  name: "Hasan",
  studentId:"2104101"
  FacultyId:"21101"
  salary: 80000
};

type Student {
  name: string;
  studentId:string
};

type Faculty = Student & {
  FacultyId: string;
  salary:number
}

const Fac: IFaculty = {
  name: "Hasan",
  studentId:"2104101"
  FacultyId:"21101"
  salary: 80000
};

৩.Object structure এর ক্ষেত্রে Interface বেশি প্রেফার করা হয়,
অন্যদিকে array এবং function এর ক্ষেত্রে type বেশি প্রেফার করা হয়।

Q5.Union Type (একাধিক টাইপের মধ্যে যেকোনো একটি)

Union মানে হলো — একটি ভ্যারিয়েবল বা প্যারামিটার একাধিক টাইপের যেকোনো একটিতে হতে পারে।
সিম্বল: |

উদাহরণ: "Faculty" | "Student".

type Role: "Faculty" | "Student" | "";

function Details(role : Role) {
  if (role === "Faculty") {
    console.log("ID ("You are a Faculty");
  } else if(role==="User") {
    console.log("You are a Student");
  }
  else{
    console.log("You are not faculty and student");
  }
}

Details('Faculty');
Details('');

এখানে role কখনো Faculty, কখনো Student হতে পারে।
Details ফাংশনের ভিতরে আমরা প্রথমে role চেক করি তারপর উপযুক্তভাবে হ্যান্ডেল করি।


Intersection Type (একাধিক টাইপের সবগুলোই একসাথে)

Intersection মানে হলো — একটা টাইপকে এমনভাবে বানানো, যাতে একাধিক টাইপের সব প্রপার্টি একসাথে থাকে।
সিম্বল: &

উদাহরণ: Student & Teacher
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
  role:"teacher"
  name: "Sabbir",
  studentId: 2104075,
  salary:70000
};

Faculty হচ্ছে Student এবং Teacher — দুইটা টাইপের intersection।
মানে Faculty অবজেক্টে অবশ্যই থাকতে হবে:
-Student থেকে: name, studentId,role
-Teacher থেকে: salary

সবগুলো প্রপার্টি একসাথে না থাকলে Faculty টাইপ ভ্যালিড হবে না।
