# ExpenseApp: 

## How Offline Sync Works

- **Local Storage:**
  - All expenses are stored locally on the device using AsyncStorage (React Native) for mobile.
  - This allows users to view, add, and delete expenses even when offline.

- **Sync on Connectivity:**
  - The app monitors network status using NetInfo.
  - When the device comes online, any unsynced changes (additions or deletions) are automatically sent to the backend server.
  - After syncing, the app fetches the latest data from the server to ensure consistency.

- **Conflict Resolution:**
  - The app uses a "last write wins" strategy based on timestamps.
  - If the same expense is modified in multiple places, the most recent change (by timestamp) is kept.

## Tradeoffs Made

- **Sync Frequency:**
  - Sync occurs automatically whenever the device regains connectivity.
  - There is no periodic background sync to save battery and data; sync is event-driven (on reconnect).

- **Optimistic UI:**
  - Changes are shown in the UI immediately, even before confirmation from the server.
  - This improves user experience but may briefly show unsynced data if a server error occurs.

- **No Push Notifications:**
  - The app does not notify users of changes made on other devices until the next sync.





