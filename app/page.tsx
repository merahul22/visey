// import LoginForm from '@/components/form/LoginForm';
// import SignupForm from '@/components/form/SignupForm';
import AccountTypeForm from '@/components/form/AccountTypeForm';
import LoginForm from '@/components/form/LoginForm';
import SignupForm from '@/components/form/SignupForm';

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <div className="bg-primary lg:w-[555px]"></div>
      <div className="flex-1">
        <SignupForm />
        <LoginForm />
        {/* <AccountTypeForm /> */}
      </div>
    </div>
  );
}
