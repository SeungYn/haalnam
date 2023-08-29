'use client';

import { chartData } from '@/utils/mock/chart/data';
import styles from './TimeTable.module.css';
import { Time } from '@prisma/client';

type Props = {
  times: Time[];
};

export default function TimeTable({ times }: Props) {
  console.log(times, 'times');
  let filteredData = times.flatMap((currentItem, i) => {
    // 마지막이 start일 경우
    if (i === chartData.length - 1 && chartData.length % 2) {
      return [
        {
          time: `${currentItem.time} ~ `,
          subject: currentItem.subject,
          type: currentItem.status,
        },
      ];
    }

    // 홀수 아이템
    if (i % 2) return [];

    if (i < chartData.length - 2 && i % 2 === 0) {
      return [
        {
          subject: currentItem.subject,
          time: `${currentItem.time} ~ ${chartData[i + 1].time}`,
          type: 'END',
        },
      ];
    }

    return [];
  });

  // chartData.for((p, c, i, origin) => {
  //   if (i === origin.length - 2 && origin.length % 2) {
  //     return [...p, { time: `${c.time} ~ `, subject: c.subject, type: c.type }];
  //   }

  //   return [p];
  // });
  // for (let i = 0; i < chartData.length; i++) {
  //   const currentItem = chartData[i];
  //   // 마지막이 start일 경우
  //   if (i === chartData.length - 2 && chartData.length % 2) {
  //     filteredData.push({
  //       time: `${chartData[i].time} ~ `,
  //       subject: chartData[i].subject,
  //       type: chartData[i].type,
  //     });
  //     continue;
  //   }

  //   // 홀수 아이템
  //   if (chartData.length % 2) continue;

  //   if (i <= chartData.length - 2) {
  //     filteredData.push({
  //       subject: currentItem.subject,
  //       time: `${currentItem.time} ~ ${chartData[i + 1].time}`,
  //       type: 'END',
  //     });
  //   }
  // }

  return (
    <div className='w-full bg-slate-50 border border-main rounded-2xl flex-shrink-0 overflow-auto'>
      <div
        className={`${styles.columnContainer} text-2xl font-bold text-main border-b border-main h-12`}
      >
        <span>주제</span>
        <span>기간</span>
        <span>사용시간(원)</span>
        <span>상태</span>
      </div>
      {filteredData.map((item) => (
        <div
          className={`${styles.columnContainer} text-xl border-b border-main bg-yellow-50`}
        >
          <span>{item.subject}</span>
          <span>{item.time}</span>
          <span>임시데이터</span>
          <span>{item.type}</span>
        </div>
      ))}
    </div>
  );
}
