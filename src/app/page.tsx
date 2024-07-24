import { IntroLogin, ReduceTimer } from '@/components/home';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className='w-full h-full flex items-center flex-col'>
      <h1 className={`text-5xl text-neutral-100 mt-8 text-center font-bold `}>
        하루를 <strong className='text-red-300'>어떻게</strong> <br />{' '}
        사용하셨나요?
      </h1>
      <ReduceTimer />
      {!user && <IntroLogin />}
      {user && (
        <h2 className='text-4xl text-white mt-4'>{`안녕하세요! ${user.name}님!`}</h2>
      )}
    </div>
  );
}
