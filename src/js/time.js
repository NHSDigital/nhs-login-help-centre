const Time = (function() {
  const { local, fromObject } = luxon.DateTime;

  return {
    isContactFormAvailable() {
      const now = local().setZone('Europe/London');
      const opening = fromObject({ hour: 9, minute: 30, zone: 'Europe/London' });
      const closing = fromObject({ hour: 16, minute: 30, zone: 'Europe/London' });
      const isWeekend = now.weekday > 5;

      return now > opening && now < closing && !isWeekend;
    },
  };
})();
