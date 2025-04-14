import IEvent from "@/store/interfaces/IEvent";

export function filterLongestInOverlaps(events: IEvent[]): IEvent[] {
  const sorted = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const result: IEvent[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const last = result[result.length - 1];

    if (
      last &&
      current.startDate < last.endDate &&
      current.endDate > last.startDate
    ) {
      const currentDuration = new Date(current.endDate).getTime() - new Date(current.startDate).getTime();
      const lastDuration = new Date(last.endDate).getTime() - new Date(last.startDate).getTime();

      if (currentDuration > lastDuration) {
        result[result.length - 1] = current;
      }
    } else {
      result.push(current);
    }
  }

  return result;
}