export enum EventName {
  ClearHistory = 'clear-history',
}

type Listener = () => void;

class EventEmitter {
  private listeners: Map<EventName, Set<Listener>> = new Map();

  addListener(event: EventName, listener: Listener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  removeListener(event: EventName, listener: Listener): void {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event: EventName): void {
    this.listeners.get(event)?.forEach((listener) => listener());
  }

  clear(event?: EventName): void {
    if (event) {
      this.listeners.get(event)?.clear();
    } else {
      this.listeners.clear();
    }
  }
}

export const eventEmitter = new EventEmitter();
