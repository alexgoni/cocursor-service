import { type APIKeyListDTO, saveAPIKey } from '@/api/key';
import { useUserContext } from '@/context/user';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Switch, SwitchProps, styled } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function GetKeyForm() {
  const { user } = useUserContext();
  const [isProductionKey, setIsProductionKey] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [key, setKey] = useState('');
  const [url, setURL] = useState('');
  const [submitBtnAllow, setSubmitBtnAllow] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error('사용자 정보가 없습니다.');
      }

      const currentKeyList = queryClient.getQueryData<APIKeyListDTO>([
        user?.uid,
        'api-key-list',
      ]);
      if ((currentKeyList?.length ?? 0) >= 10) {
        throw new Error('키는 최대 10개까지 발급할 수 있습니다.');
      }

      return saveAPIKey({
        uid: user.uid,
        name: keyName,
        apiKey: key,
        isProduction: isProductionKey,
        url: isProductionKey ? url : undefined,
      });
    },
    onSuccess: () => {
      toast.success('키 발급이 완료되었습니다!');

      // Form 초기화
      setIsProductionKey(false);
      setKeyName('');
      setKey('');
      setURL('');

      // API Key 목록 업데이트
      queryClient.invalidateQueries({ queryKey: [user?.uid, 'api-key-list'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProductionKey(e.target.checked);
    setKey('');
  };
  const generateKey = (isProduction: boolean) => {
    const startChar = isProduction ? 'A' : 'X'; // 운영키는 A, 개발키는 X로 시작
    const randomPart = Math.random().toString(36).substring(2, 22);
    return startChar + randomPart;
  };
  const handleGenerateKey = () => {
    const newKey = generateKey(isProductionKey);
    setKey(newKey);
  };
  const handleCopyKey = () => {
    navigator.clipboard
      .writeText(key)
      .then(() => {
        toast.success('키가 복사되었습니다.');
      })
      .catch((err) => {
        toast.error('복사 실패: ' + err);
      });
  };

  // 제출 가능 여부 확인
  useEffect(() => {
    if (isProductionKey) {
      setSubmitBtnAllow(!!keyName && !!key && !!url);
    } else {
      setSubmitBtnAllow(!!keyName && !!key);
    }
  }, [isProductionKey, keyName, key, url]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-2">
          <h1 className="text-3xl font-bold text-gray-100">API Key 발급</h1>
          <span className="text-sm text-gray-300">
            계정 당 최대 10개까지 생성할 수 있습니다.
          </span>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#FF7667] px-6 py-2 hover:bg-[#ff5d4e] disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={!submitBtnAllow}
          onClick={() => mutation.mutate()}
        >
          저장
        </button>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isProductionKey ? (
              <label className="text-sm font-medium text-gray-300">
                운영키
              </label>
            ) : (
              <label className="text-sm font-medium text-gray-300">
                개발키
              </label>
            )}

            <IOSSwitch checked={isProductionKey} onChange={handleSwitch} />
          </div>
          <Link
            href="/docs/installation#보안-모드"
            className="flex items-center gap-1"
          >
            <HelpOutlineIcon fontSize="small" />
            <span className="text-sm underline">도움말 보기</span>
          </Link>
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Key 이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="예: My Portfolio App"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="key"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            API Key
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                id="key"
                name="key"
                type="text"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled
                placeholder="버튼을 눌러 생성하세요"
                value={key}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2"
                disabled={!key}
                onClick={handleCopyKey}
              >
                <ContentCopyIcon className="text-gray-300" />
              </button>
            </div>
            <button
              type="button"
              className="h-full rounded-lg bg-[#65C466] px-4 py-2 text-gray-200 hover:bg-[#57af59]"
              onClick={handleGenerateKey}
            >
              생성
            </button>
          </div>
        </div>

        {isProductionKey && (
          <div>
            <label
              htmlFor="url"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              URL
            </label>
            <input
              id="url"
              name="url"
              type="text"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="배포된 서비스의 URL을 입력해주세요"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));
