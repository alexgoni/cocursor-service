import { deleteAPIKey, getAPIKeyList } from '@/api/key';
import { useUserContext } from '@/context/user';
import { formatTimestamp } from '@/utils/time';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function KeyList() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: [user?.uid, 'api-key-list'],
    queryFn: () => {
      if (!user) return;
      return getAPIKeyList(user.uid);
    },
    enabled: !!user,
  });
  const deleteKeyMutate = useMutation({
    mutationFn: deleteAPIKey,
    onSuccess: () => {
      toast.success('키가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [user?.uid, 'api-key-list'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const copyAPIKey = (apiKey: string) => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        toast.success('키가 복사되었습니다.');
      })
      .catch((err) => {
        toast.error('복사 실패: ' + err);
      });
  };

  if (!data || data.length === 0 || isLoading || isError) return null;

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-gray-100">API Key 목록</h1>
      <div className="space-y-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">구분</span>
                <span className="text-base font-semibold text-white">
                  {item.isProduction ? <>운영키</> : <>개발키</>}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">이름</span>
                <span className="text-base font-semibold text-white">
                  {item.name}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">
                  API Key
                </span>
                <span className="flex items-center text-base font-semibold text-white">
                  {item.id}
                  <button
                    type="button"
                    onClick={() => copyAPIKey(item.id)}
                    className="ml-2"
                  >
                    <ContentCopyIcon
                      className="text-gray-300"
                      fontSize="small"
                    />
                  </button>
                </span>
              </div>

              {item.isProduction && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-400">URL</span>
                  <span className="text-base font-semibold text-white">
                    {item.url}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">
                  발급일
                </span>
                <span className="text-base font-semibold text-white">
                  {formatTimestamp(item.createdAt)}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-md border border-red-400 bg-red-500 px-4 py-2 text-sm font-semibold text-nowrap text-white transition hover:bg-red-600 sm:mt-0"
              onClick={() => {
                if (!user) return;

                const isConfirmed =
                  window.confirm('정말로 이 키를 삭제하시겠습니까?');
                if (isConfirmed) {
                  deleteKeyMutate.mutate({ uid: user?.uid, apiKey: item.id });
                }
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
