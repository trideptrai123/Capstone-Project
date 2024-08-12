import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotyStore = create(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: state?.notifications?.find(
            (i) => i?._id == notification?._id
          )
            ? [...state.notifications]
            : [notification, ...state.notifications],
        })),
      setNotification: (list) =>
        set((state) => ({
          notifications: [...list],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "notifications-storage",
    }
  )
);

export default useNotyStore;
