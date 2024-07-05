'use client';

import {
  differenceFullTime,
  formatDisplayTime,
  formatTime,
  toSecondsByMilliseconds,
} from '@/utils/date';
import styles from './TimeTable.module.css';
import { Time } from '@prisma/client';

type Props = {
  times: Time[];
};

export default function TimeTable({ times }: Props) {
  let filteredData = times.flatMap((currentItem, i) => {
    // 마지막이 start일 경우

    if (i === times.length - 1 && times.length % 2) {
      return [
        {
          ...currentItem,
          time: `${currentItem.time} ~ `,
          parseTime: `${formatDisplayTime(currentItem.time)} ~ `,
          subject: currentItem.subject,
          type: currentItem.status,
        },
      ];
    }

    // 홀수 아이템
    if (i % 2) return [];

    // 짝수 아이템
    if (i <= times.length - 2 && i % 2 === 0) {
      return [
        {
          ...currentItem,
          subject: currentItem.subject,
          time: `${currentItem.time} ~ ${times[i + 1].time}`,
          parseTime: `${formatDisplayTime(
            currentItem.time
          )} ~ ${formatDisplayTime(times[i + 1].time)}`,
          type: 'END',
        },
      ];
    }

    return [];
  });

  return (
    <div className='w-full bg-h_light_black border border-h_gray rounded-2xl flex-shrink-0 overflow-auto mb-4'>
      <div
        className={`${styles.columnContainer} text-2xl font-bold text-white border-b border-h_gray h-12`}
      >
        <span>주제</span>
        <span>기간</span>
        <span>사용시간(원)</span>
        <span>상태</span>
      </div>
      {filteredData.map((item) => (
        <div
          key={item.id}
          className={`${styles.columnContainer} text-xl border-b border-h_gray bg-h_black`}
        >
          <span className='overflow-hidden '>{item.subject}</span>
          <span>{item.parseTime}</span>
          <span>
            {toSecondsByMilliseconds(differenceFullTime(item.time)) ?? ''}
          </span>
          <span>{item.type}</span>
        </div>
      ))}
    </div>
  );
}
