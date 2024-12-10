"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  id: string;
  name: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  width?: string;
}


function DropdownSelect({
  id,
  title = 'Select',
  data,
  selectedId,
  onSelect,
  width
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  interface OutsideClickHandlerProps {
    ref: React.RefObject<HTMLElement>;
    handler: () => void;
  }

  const useOutsideClick = ({ ref, handler }: OutsideClickHandlerProps) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, handler]);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    'absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10',
  );



  return (
    <>
      <div ref={dropdownRef} className='relative' style={{ width: width || 'auto' }}>
      <button
        id={id}
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-[hsl(85,49%,40%)] text-white font-spartan text-sm border-2 border-[hsl(85,49%,40%)]',
        )}
      >
        <span>{selectedItem?.name || title}</span>
        <ChevronDown
          size={20}
        />
      </button>
      {/* Open */}
      {isOpen && (
        <div
          aria-label='Dropdown menu'
          className={dropdownClass}
          style={{ width: '100%' }}
        >
          <ul
            role='menu'
            aria-labelledby={id}
            aria-orientation='vertical'
            className='leading-10'
          >
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  'flex items-center cursor-pointer hover:bg-gray-200 px-3 font-spartan',
                  { 'bg-gray-300': selectedItem?.id === item.id }
                )}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}

export default DropdownSelect;