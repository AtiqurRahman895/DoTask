import { useCallback } from 'react';

const useConvertTo12HourFormat = () => {
    const convertTo12HourFormat = useCallback((input) => {
        let hours, minutes, dateFormatted;

        // Check if the input is an ISO 8601 timestamp
        if (input.includes("T")) {
            const date = new Date(input);
            hours = date.getHours();
            minutes = date.getMinutes();

            // Format the date part
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are 0-based in JavaScript
            const year = date.getFullYear();
            dateFormatted = `${month}/${day}/${year}`; // Format as MM/DD/YYYY
        } else {
            // If it's just a time in HH:mm format
            [hours, minutes] = input.split(":").map(Number);
            dateFormatted = "No Date"; // No date available in HH:mm format
        }

        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight and 12-hour format
        const formattedTime = `${hours}:${String(minutes).padStart(2, "0")} ${period}`;

        return { formattedTime, dateFormatted };
      }, []);
    
      return convertTo12HourFormat;
};

export default useConvertTo12HourFormat;
