export function getCookie(cname: string) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function distanceBetweenTwoDates(date1: Date, date2: Date): string {
  const seconds = Math.abs(date1.getTime() - date2.getTime()) / 1000;
  if (seconds > 86400) {
    return Math.floor(seconds / 86400) + "d ago";
  } else if (seconds > 3600) {
    return Math.floor(seconds / 3600) + "h ago";
  } else if (seconds > 60) {
    return Math.floor(seconds / 60) + "m ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export const changeDateToString = (date: Date) => {
  const now = new Date(Date.now());
  const timeStr: string = date
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  const dateStr: string = date.toDateString().split(" ").slice(1).join(" ");
  const dayStr: string = date.toDateString().split(" ")[0];
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    return timeStr;
  }
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    if (now.getDate() - date.getDate() <= 6 && now.getDate() > date.getDate()) {
      return `${dayStr}, ${timeStr}`;
    }
  }
  return dateStr + ", " + timeStr;
};

export function changeMessageToMessageWithDay(
  message: any,
  messagesWithDay: any
): Array<any> {
  const date = new Date(message.createdAt);
  if (messagesWithDay.length === 0) {
    return [
      {
        date: new Date(Date.now())
          .toTimeString()
          .split(":")
          .slice(0, 2)
          .join(":"),
        fullDate: new Date(Date.now()),
        messages: [message],
      },
    ];
  }
  if (
    new Date(
      messagesWithDay[0].fullDate
    ).getHours() === date.getHours()
  ) {
    return [
      {
        date: messagesWithDay[0].date,
        fullDate: messagesWithDay[0].fullDate,
        messages: [message, ...messagesWithDay[0].messages],
      },
      ...messagesWithDay.slice(1),
    ];
  } else {
    return [
      {
        date: new Date(Date.now())
          .toTimeString()
          .split(":")
          .slice(0, 2)
          .join(":"),
        fullDate: new Date(Date.now()),
        messages: [message],
      },
      ...messagesWithDay,
    ];
  }
}

export function concatTwoMessagesWithDay(
  messagesWithDay1: any,
  messagesWithDay2: any
) {
  if (messagesWithDay1.length === 0 || messagesWithDay2.length === 0) {
    return [...messagesWithDay1, ...messagesWithDay2];
  } else {
    if (
      new Date(
        messagesWithDay1[messagesWithDay1.length - 1].fullDate
      ).getHours() === new Date(messagesWithDay2[0].fullDate).getHours()
    ) {
      return [
        ...messagesWithDay1.slice(0, messagesWithDay1.length - 1),
        {
          date: messagesWithDay1[messagesWithDay1.length - 1].date,
          fullDate: messagesWithDay1[messagesWithDay1.length - 1].fullDate,
          messages: [
            ...messagesWithDay1[messagesWithDay1.length - 1].messages,
            ...messagesWithDay2[0].messages,
          ],
        },
        ...messagesWithDay2.slice(1),
      ];
    }
    return [...messagesWithDay1, ...messagesWithDay2];
  }
}
