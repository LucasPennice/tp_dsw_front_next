"use client";

// un intnto de poiner el año

import { useState, useEffect } from "react";
import { format, addYears, subYears, setYear } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

export default function DatePickerWithYearSelector({ value, onChange }: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(value);
    const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        setDate(value);
        if (value) {
            setCurrentMonth(value);
        }
    }, [value]);

    const handleYearChange = (selectedYear: string) => {
        const newYear = parseInt(selectedYear);
        const newDate = setYear(currentMonth, newYear);
        setCurrentMonth(newDate);
        if (date) {
            const updatedDate = setYear(date, newYear);
            setDate(updatedDate);
            onChange(updatedDate);
        }
    };

    const handleMonthChange = (newMonth: Date) => {
        setCurrentMonth(newMonth);
    };

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate) {
            setCurrentMonth(newDate);
        }
        onChange(newDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex items-center justify-between p-3">
                    <Select value={currentMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    month={currentMonth}
                    onMonthChange={handleMonthChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
