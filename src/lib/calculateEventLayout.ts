import IEvent from "@/store/interfaces/IEvent";

type PositionedEvent = IEvent & {
  top: number;
  height: number;
  leftPercent: number;
  widthPercent: number;
}

const SLOT_HEIGHT = 50;

function eventsOverlap(a:IEvent, b: IEvent): boolean {
  const aStart = new Date(a.startDate).getTime();
  const aEnd = new Date(a.endDate).getTime();
  const bStart = new Date(b.startDate).getTime();
  const bEnd = new Date(b.endDate).getTime();

  return aStart < bEnd && bStart < aEnd;
}

function buildOverlapGraph(events: IEvent[]): Map<number, number[]> {
  const graph = new Map<number, number[]>();

  events.forEach((event, i) => {
    graph.set(i, []);
    for (let j = 0; j < events.length; j++) {
      if (i === j) continue;
      if (eventsOverlap(event, events[j])) {
        graph.get(i)!.push(j);
      }
    }
  });

  return graph;
}

function getConnectedGroups(events: IEvent[]): IEvent[][] {
  const graph = buildOverlapGraph(events);
  const visited = new Set<number>();
  const groups: IEvent[][] = [];

  function dfs(node: number, group: number[]) {
    visited.add(node);
    group.push(node);
    for (const neighbor of graph.get(node)!) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, group);
      }
    }
  }

  for (let i = 0; i < events.length; i++) {
    if (!visited.has(i)) {
      const groupIndices: number[] = [];
      dfs(i, groupIndices);
      groups.push(groupIndices.map((index) => events[index]));
    }
  }

  return groups;
}

export function calculateEventLayout(events: IEvent[]): PositionedEvent[] {
  const groups = getConnectedGroups(events);
  const positioned: PositionedEvent[] = [];

  for (const group of groups) {
    const columns: IEvent[][] = [];

    for (const event of group) {
      let placed = false;

      for (const column of columns) {
        if (!column.some((e) => eventsOverlap(event, e))) {
          column.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
      }
    }

    const numCols = columns.length;

    columns.forEach((column, colIndex) => {
      for (const event of column) {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        const startMin = start.getHours() * 60 + start.getMinutes();
        const endMin = end.getHours() * 60 + end.getMinutes();

        const top = ((startMin / 60) * SLOT_HEIGHT) - 2;
        const height = ((endMin - startMin) / 60) * SLOT_HEIGHT + 2;

        positioned.push({
          ...event,
          top,
          height: height > 30 ? height : 30,
          leftPercent: (colIndex / numCols),
          widthPercent: 1 / numCols,
        });
      }
    });
  }

  return positioned;
}