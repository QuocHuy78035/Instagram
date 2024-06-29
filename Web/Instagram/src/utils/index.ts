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

export function changeMessageToMessageWithDay(
  message: any,
  messages: any
): Array<any> {
  const date = new Date(message.createdAt);
  if (
    new Date(messages[messages.length - 1].fullDate).getHours() ===
    date.getHours()
  ) {
    return [
      ...messages.slice(0, messages.length - 1),
      {
        date: messages[messages.length - 1].date,
        fullDate: messages[messages.length - 1].fullDate,
        messages: [...messages[messages.length - 1].messages, message],
      },
    ];
  } else {
    return [
      ...messages,
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
}
