import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const notifications = [
  {
    id: 1,
    type: "welcome",
    message: (username) => `Welcome to QuizCypher${username ? `, ${username}` : ""}!`,
    time: dayjs().fromNow()
  },
  {
    id: 2,
    type: "achievement",
    message: () => "Do your quizzes to unlock more Achievements!",
    time: dayjs().fromNow()
  },
  {
    id: 3,
    type: "info",
    message: () => "Don't forget to try our new Science Quiz!",
    time: dayjs().fromNow()
  }
];
