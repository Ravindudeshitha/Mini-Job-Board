'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaThLarge } from "react-icons/fa";

interface Tab {
  name: string;
  image: string;
  color: string;
}
interface postProps {
  setFilterName?: React.Dispatch<React.SetStateAction<string>>
}

export default function DraggableTabs({setFilterName}: postProps) {
  const tabsBoxRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await fetch('/tabs.json');
        const data: Tab[] = await response.json();
        const allTab: Tab = {
          name: 'All',
          image: '',
          color: '#A1F96A'
        };
        setTabs([allTab, ...data]);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };
    fetchTabs();
  }, []);

  const handleIcons = (scrollVal: number) => {
    if (!tabsBoxRef.current) return;
    const tabsBox = tabsBoxRef.current;
    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    const leftIcon = document.querySelector<HTMLElement>('#left')?.parentElement;
    const rightIcon = document.querySelector<HTMLElement>('#right')?.parentElement;

    if (leftIcon) leftIcon.style.display = scrollVal <= 0 ? 'none' : 'flex';
    if (rightIcon) rightIcon.style.display = maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!tabsBoxRef.current) return;
    const tabsBox = tabsBoxRef.current;
    const scrollWidth = (tabsBox.scrollLeft += direction === 'left' ? -340 : 340);
    handleIcons(scrollWidth);
  };

  const handleDrag = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging || !tabsBoxRef.current) return;
    const tabsBox = tabsBoxRef.current;
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);
  
  const handleTabClick = (id: number, name: string) => {
    setActiveTab(id);
    if (setFilterName) setFilterName(name);
  }
  return (
    <div
      className="relative max-w-4xl p-9 bg-white rounded-2xl overflow-x-hidden"
      style={{
        padding: '35px',
        background: '#fff',
        borderRadius: '13px',
        position: 'relative',
        overflowX: 'hidden',
        maxWidth: '1000px',
      }}
    >
      
      <div
        className="absolute top-0 left-0 h-full w-[120px] flex items-center"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '120px',
          display: 'none',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #fff 70%, transparent)',
        }}
      >
        <IoIosArrowBack
          id="left"
          className=""
          onClick={() => handleScroll('left')}
          style={{
            width: '35px',
            height: '35px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            textAlign: 'center',
            lineHeight: '55px',
            borderRadius: '50%',
            marginLeft: '15px',
          }}
        />
      </div>

      
      <ul
        ref={tabsBoxRef}
        className={`flex gap-3 list-none overflow-x-hidden ${isDragging ? 'cursor-grab' : ''}`}
        //  onMouseDown={() => (handleMouseDown())}
         onMouseMove={handleDrag}
        style={{
          display: 'flex',
          gap: '12px',
          listStyle: 'none',
          overflowX: 'hidden',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
        }}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer text-lg whitespace-nowrap px-5 py-3 rounded-full border border-border bg-tabBg flex items-center gap-2 ${
              activeTab === index ? 'bg-primary text-white border-none' : ''
            } hover:bg-tabHover ${isDragging ? 'select-none pointer-events-none' : ''}`}
            onClick={() => handleTabClick(index,tab.name)}
            style={{
              cursor: 'pointer',
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              background: activeTab === index ? '#2A2929' : '#f5f4fd',
              padding: '5px 15px',
              borderRadius: '30px',
              border: activeTab === index ? 'none' : '1px solid #d8d5f2',
              color: activeTab === index ? '#A1F96A' : 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {tab.image ?(
              <div className='relative w-8 h-8 '>
                <Image
                  src={`/${tab.image}`}
                  alt={`${tab.name} icon`}
                  fill
                  className="object-cover"
                />
              </div>
            ):(
              <div className='relative w-8 h-8 flex justify-center items-center'>
                <FaThLarge />
              </div>
            )}
            
            {tab.name}
          </div>
        ))}
      </ul>

      <div
        className="absolute top-0 right-0 h-full w-[120px] flex items-center justify-end"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          background: 'linear-gradient(-90deg, #fff 70%, transparent)',
        }}
      >
        <IoIosArrowForward
          id="right"
          className=""
          onClick={() => handleScroll('right')}
          style={{
            width: '35px',
            height: '35px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            textAlign: 'center',
            lineHeight: '55px',
            borderRadius: '50%',
            marginRight: '15px',
          }}
        />
      </div>
    </div>
  );
}