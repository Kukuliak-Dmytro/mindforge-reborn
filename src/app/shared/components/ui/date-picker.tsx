"use client";

import { useState } from "react";
import { uk } from "date-fns/locale";
import { Calendar } from "@/app/shared/components/ui/calendar";
import { cn } from "@/app/shared/utils/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/shared/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function RadioDate() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const monthsInUkrainian = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              `w-[240px] flex justify-between items-center rounded-medium border
              px-3 py-2 text-sm font-medium transition-colors focus:outline-none
              focus:ring-2 focus:ring-accent disabled:cursor-not-allowed
              disabled:opacity-50 cursor-pointer h-[50px]`,
              !date && "text-muted-foreground",
            )}>
            {date ? (
              <span>
                {date.getDate()} {monthsInUkrainian[date.getMonth()]}{" "}
                {date.getFullYear()}
              </span>
            ) : (
              <span>Виберіть дату</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={uk}
            disabled={(date) => date < new Date("1900-01-01")}
            className="rounded-md"
            classNames={{
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              caption_label: "text-sm font-medium",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
