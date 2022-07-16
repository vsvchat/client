export type userData = {
  time: number;
  username: string;
  email: string;
  name: string;
  avatar: string | null;
  channels: channelData[];
};

export type messageData = {
  time: number;
  author: string;
  content: string;
};

export type channelData = {
  time: number;
  name: string;
  desc: string | null;
  log: messageData[];
};
