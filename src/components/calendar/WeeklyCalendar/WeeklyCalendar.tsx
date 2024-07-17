'use client';

import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../../common';
import { DownArrowIcon } from '../../icons';
import './WeeklyCalendar.css';
import { useEffect, useState } from 'react';

export default function WeeklyCalendar() {
  const [isMounting, setIsMounting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounting(true);
    } else {
      setIsMounting(false);
    }
  }, [isOpen]);

  return (
    <div className=' w-full mt-2'>
      <div>
        <button className='text-4xl ' onClick={() => setIsOpen((s) => !s)}>
          <span>2024년 7월</span>
          <DownArrowIcon size='medium' className='inline ml-2' />
        </button>
      </div>

      <div>
        <ul className='weekly__calendar'>
          <li role='button'>
            <span>월</span>
            <div>1</div>
          </li>
          <li role='button'>
            <span>화</span>
            <div>2</div>
          </li>
          <li role='button'>
            <span>수</span>
            <div>3</div>
          </li>
          <li role='button'>
            <span>목</span>
            <div>4</div>
          </li>
          <li role='button'>
            <span>금</span>
            <div>5</div>
          </li>
          <li role='button'>
            <span>토</span>
            <div>6</div>
          </li>
          <li role='button'>
            <span>일</span>
            <div>7</div>
          </li>
        </ul>
      </div>
      {isOpen && (
        <div className='full__calendar ' onClick={() => setIsOpen(false)}>
          <div className={`${isMounting ? 'open' : 'close'}`}>캘린더</div>
        </div>
      )}
    </div>
  );
}
