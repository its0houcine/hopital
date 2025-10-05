"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface CalendarProps {
  className?: string;
  selected?: Date;
  onDateSelect?: (date: Date) => void; // Rendu optionnel avec ?
}

function Calendar({ className, selected, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth());
  });

  React.useEffect(() => {
    if (!selected && onDateSelect) {  // Vérifier si onDateSelect existe
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      onDateSelect(today);
    }
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onDateSelect) {  // Vérifier si onDateSelect existe
      date.setHours(0, 0, 0, 0);
      onDateSelect(date);
    }
  };

 

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="w-full">
      <div className="p-2 rounded-xl backdrop-blur-md bg-white/40 shadow-xl border border-gray-200 dark:border-gray-700">
        {/* En-tête personnalisé */}
        <div className="flex items-center justify-between w-full mb-4">
          <button
            type="button"
            className="w-6 h-6 text-grey hover:text-gray-200 transition-colors"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="w-full h-full" />
          </button>
          <span className="text-sm font-medium text-grey">
            {currentMonth.toLocaleString("fr-FR", { month: "long", year: "numeric" })}
          </span>
          <button
            type="button"
            className="w-6 h-6 text-grey hover:text-gray-200 transition-colors"
            onClick={handleNextMonth}
          >
            <ChevronRight className="w-full h-full" />
          </button>
        </div>

        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleDateSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          showOutsideDays={false}
          className={cn("w-full", className)}
          modifiersClassNames={{
            today: "rdp-day_today",
            selected: "rdp-day_selected",
          }}
          classNames={{
            months: "w-full",
            month: "w-full",
            table: "w-full",
            head_row: "w-full",
            head_cell: "text-xs text-muted-foreground text-center font-medium p-1",
            row: "w-full",
            cell: "text-center p-0",
            day: "h-8 w-8 text-sm p-0 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 mx-auto",
            day_outside: "text-muted-foreground opacity-50 text-sm",
          }}
          styles={{
            nav: { display: "none" }, // Masque l'en-tête par défaut
            month_caption: { display: "none" }, // Masque le nom du mois par défaut
          }}
        />
      </div>
    </div>
  );
}

export { Calendar };



