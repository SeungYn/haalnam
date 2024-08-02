import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import MyPageCommonPopUp from '@/components/my/MyPageCommonPopUp';
import Profile from '@/components/my/profile/Profile';
import ProfilePopUpForm from '@/components/my/profile/ProfilePopUpForm';

import { useGetUserInfoSuspense, usePostUserProfile } from '@/hooks/api/user';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';

type Props = {
	id: string;
};

export default function ProfileContainer({ id }: Props) {
	const { isMounting, isOpen, setIsOpen, setIsMounting } = usePopUpStatus();
	const { data } = useGetUserInfoSuspense(id);
	const { data: ff } = useGetUserInfoSuspense(id);
	const { mutate: onUserProfileModify } = usePostUserProfile(() =>
		setIsMounting(false)
	);
	const userInfo = data!;

	return (
		<>
			<Profile {...userInfo!} onProfileModify={() => setIsOpen(true)} />
			<MyPageCommonPopUp
				isMounting={isMounting}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsMounting={setIsMounting}
			>
				<CommonPopUpHeader
					title={'프로필 수정'}
					onEvent={() => setIsMounting(false)}
				/>
				<ProfilePopUpForm
					id={id}
					image={userInfo.image}
					introduce={userInfo.introduce || ''}
					nickname={userInfo.nickname}
					instagram={userInfo.instagram}
					onUserProfileModify={onUserProfileModify}
				/>
			</MyPageCommonPopUp>
		</>
	);
}
