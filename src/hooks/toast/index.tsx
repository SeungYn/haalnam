import { IoHappyOutlineIcon } from '@/components/icons';
import { toast } from 'react-toastify';

export function useInfoToast(msg: string) {
	toast(
		<div className="flex items-center gap-2">
			<IoHappyOutlineIcon size="medium" /> <p>{msg}</p>
		</div>
	);
}
