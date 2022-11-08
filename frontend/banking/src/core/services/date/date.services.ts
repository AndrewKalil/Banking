export class DateService<T> {
  isoDateFormat;
  constructor() {
    this.isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;
  }

  handleListDates(data: T[]) {
    return data.map((entry) => {
      return this.handleDates(entry);
    });
  }

  handleDates(data: any) {
    for (const entry in data) {
      if (
        data[entry] &&
        typeof data[entry] === "string" &&
        this.isoDateFormat.test(data[entry])
      ) {
        data[entry] = new Date(data[entry].toString());
      }
    }
    return data;
  }
}
