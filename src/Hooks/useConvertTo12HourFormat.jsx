import { useCallback } from 'react';

const useConvertTo12HourFormat = () => {
    const convertTo12HourFormat = useCallback((time24) => {
        let [hours, minutes] = time24.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
    
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight and 12-hour format
        const formattedTime = `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
    
        return formattedTime;
      }, []);
    
      return  convertTo12HourFormat ;
};

export default useConvertTo12HourFormat;