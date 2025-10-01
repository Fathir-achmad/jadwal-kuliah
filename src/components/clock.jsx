import { useState, useEffect } from 'react';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTimeValue = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const day = days[time.getDay()];
  const date = time.getDate();
  const month = months[time.getMonth()];
  const year = time.getFullYear();
  const hours = formatTimeValue(time.getHours());
  const minutes = formatTimeValue(time.getMinutes());
  const seconds = formatTimeValue(time.getSeconds());

  return (
    <Box display="flex" flexDirection="column" alignItems={isLargerThanSm ? "center" : "center"} color={"white"} mt={5}>
      <Text fontSize={isLargerThanSm ? "5xl" : "3xl"} fontWeight="bold">
        {hours}:{minutes}:{seconds}
      </Text>
      <Text fontSize={isLargerThanSm ? "lg" : "md"} mt={isLargerThanSm ? 2 : 1} fontWeight="bold">
        {day}, {date} {month} {year}
      </Text>
    </Box>
  );
}
