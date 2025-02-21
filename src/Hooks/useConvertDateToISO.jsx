
const useConvertDateToISO = () => {

    const convertToISO = (dateString) => {
        // Split the date and time
        const [date, time] = dateString.split(", ");
        const timeWithoutPeriod = time.replace("AM", "").replace("PM", "").trim();
    
        // Split hours and minutes
        let [hours, minutes] = timeWithoutPeriod.split(":");
        hours = parseInt(hours, 10);
    
        // Adjust for AM/PM
        if (time.includes("PM") && hours !== 12) {
          hours += 12; // Convert PM to 24-hour format
        } else if (time.includes("AM") && hours === 12) {
          hours = 0; // Handle midnight
        }
    
        // Format hours and minutes to 2 digits
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes || "0").padStart(2, "0");
    
        // Set ISO formatted date
        return `${date}T${formattedHours}:${formattedMinutes}:00`

      };

    return convertToISO
};

export default useConvertDateToISO;