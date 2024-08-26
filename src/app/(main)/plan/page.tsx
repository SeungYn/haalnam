import SSRSuspense from '@/components/common/SSRSuspense';
import PlanNavbar from '@/components/plan/PlanNavbar/PlanNavbar';
import PlanSideButton from '@/components/plan/PlanSideButton/PlanSideButton';
import PlanTimeChartContainer from '@/components/plan/time/chart/PlanTImeChartContainer/PlanTimeChartContainer';
import PlanTimeHeader from '@/components/plan/time/header/PlanTimeHeader';
import PlanTimeTableContainer from '@/components/plan/time/table/PlanTimeTableContainer/PlanTimeTableContainer';

export default function PlanPage() {
	return (
		<>
			<SSRSuspense fallback={'로딩중'}>
				<PlanTimeHeader />
			</SSRSuspense>

			<SSRSuspense fallback={'로딩중'}>
				<PlanTimeChartContainer />
			</SSRSuspense>
			<PlanNavbar />
			<SSRSuspense fallback={'로딩중'}>
				<PlanTimeTableContainer />
			</SSRSuspense>
			<PlanSideButton />
		</>
	);
}
