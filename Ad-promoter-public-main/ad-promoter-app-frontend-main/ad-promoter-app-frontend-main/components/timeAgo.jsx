import { useState, useEffect } from "react";

function formatDate(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? "s" : ""} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? "s" : ""} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? "s" : ""} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  }
  return `${Math.floor(seconds)} second${seconds > 1 ? "s" : ""} ago`;
}

function TimeAgo({ dateTime }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDate(new Date(dateTime)));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateTime]);

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
