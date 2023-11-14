self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    title: resultData.title,
    body: resultData.body,
    image: resultData.image,
    icon: "logo192.png",
    ...resultData,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const url = "/main";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
