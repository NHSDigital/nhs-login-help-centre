const Time = (function() {
  const { local, fromObject } = luxon.DateTime;
  const UK_TIMEZONE = 'Europe/London';

  return {
    isContactFormAvailable() {
      const now = local().setZone(UK_TIMEZONE);
      const opening = fromObject({ hour: 9, minute: 30, zone: UK_TIMEZONE });
      const closing = fromObject({ hour: 16, minute: 30, zone: UK_TIMEZONE });
      const isWeekend = now.weekday > 5;

      return now > opening && now < closing && !isWeekend;
    },
  };
})();
