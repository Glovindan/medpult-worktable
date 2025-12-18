import { useEffect, useRef } from "react";
import Scripts from "../../../shared/utils/clientScripts";
import { IInteractionItem } from "./InteractionsListTypes";

export default function useInteractionsUpdates(
  items: IInteractionItem[],
  setItems: (updater: (prev: IInteractionItem[]) => IInteractionItem[]) => void,
  intervalMs = 1000
) {
  const itemsRef = useRef<IInteractionItem[]>(items);
  const lastMsRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    let mounted = true;

    const checkUpdates = async () => {
      const ids = itemsRef.current.map((i) => i.id);
      if (!ids.length) return;
      try {
        const ms = await Scripts.getInteractionsLastUpdateDate(ids);
        if (!mounted) return;

        // first call — just store timestamp
        if (lastMsRef.current === undefined) {
          lastMsRef.current = ms;
          return;
        }

        // no change
        if (ms === lastMsRef.current) return;

        lastMsRef.current = ms;

        const updatedItems = await Scripts.getInteractionsUpdatedData(ids);
        if (!mounted) return;
        if (!updatedItems || !updatedItems.length) return;

        const updatedMap = new Map(updatedItems.map((it) => [it.id, it]));
        setItems((prev) =>
          prev.map((item) =>
            updatedMap.has(item.id)
              ? (updatedMap.get(item.id) as IInteractionItem)
              : item
          )
        );
      } catch (err) {
        console.error("useInteractionsUpdates error", err);
      }
    };

    checkUpdates();
    const interval = setInterval(checkUpdates, intervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [setItems, intervalMs]);
}
