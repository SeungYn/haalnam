import { PermissionPopupContainer } from '@/components/common/PermissionPopup/PermissionPopup';
import SSRSuspense from '@/components/common/SSRSuspense';
import TimeChartSkeleton from '@/components/home/time/chart/TimeChart/TimeChartSkeleton';
import PlanNavbar from '@/components/plan/PlanNavbar/PlanNavbar';
import PlanSideButton from '@/components/plan/PlanSideButton/PlanSideButton';
import PlanTimeChartContainer from '@/components/plan/time/chart/PlanTImeChartContainer/PlanTimeChartContainer';
import PlanTimeHeader, {
	PlanTimeHeaderSkelton,
} from '@/components/plan/time/header/PlanTimeHeader';
import { PlanTimeTableSkelton } from '@/components/plan/time/table/PlanTimeTable/PlanTimeTable';
import PlanTimeTableContainer from '@/components/plan/time/table/PlanTimeTableContainer/PlanTimeTableContainer';

export default function PlanPage() {
	return (
		<>
			<PermissionPopupContainer />
			<SSRSuspense fallback={<PlanTimeHeaderSkelton />}>
				<PlanTimeHeader />
			</SSRSuspense>
			<SSRSuspense fallback={<TimeChartSkeleton />}>
				<PlanTimeChartContainer />
			</SSRSuspense>
			<PlanNavbar />
			<SSRSuspense fallback={<PlanTimeTableSkelton />}>
				<PlanTimeTableContainer />
			</SSRSuspense>
			<PlanSideButton />
		</>
	);
}
