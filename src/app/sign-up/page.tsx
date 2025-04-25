'use client';

import { signUp } from '@/api/auth';
import { validateEmail, validatePassword } from '@/utils/validation';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    nickname: '',
    email: '',
    password: '',
  });
  const [submitBtnActive, setSubmitBtnActive] = useState(false);
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('회원가입에 성공했어요!');
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(formValue);
  };

  // 유효성 검사
  useEffect(() => {
    setSubmitBtnActive(
      !!formValue.nickname &&
        validateEmail(formValue.email) &&
        validatePassword(formValue.password),
    );
  }, [formValue]);

  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4 pb-16">
      <div className="w-full max-w-md space-y-8 rounded-2xl border-2 border-[#FF7667] bg-[#1a1a1a] p-10 shadow-lg shadow-[#FF766770]">
        <h2 className="text-center text-3xl font-bold text-white">회원가입</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium">
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formValue.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
              required
              className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-[#FF7667] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              required
              className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-[#FF7667] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder="비밀번호를 8자 이상 입력해주세요"
              required
              className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-[#FF7667] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#FF7667] py-2 font-semibold text-white transition hover:bg-[#ff5d4e] disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={!submitBtnActive}
          >
            회원가입
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-[#FF7667] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
