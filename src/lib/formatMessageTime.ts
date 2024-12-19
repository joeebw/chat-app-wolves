const formatMessageTime = (timestamp: Date) => {
  if (!timestamp) return;
  const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return timestamp.toLocaleDateString();
};

export default formatMessageTime;
