import { Storage } from "@plasmohq/storage"

const storage = new Storage()

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const shouldShowSidePanel = await storage.get("showSidePanel")
    if (shouldShowSidePanel) {
      chrome.sidePanel.setOptions({
        tabId,
        path: "sidepanel.html",
        enabled: true
      })
    }
  }
})
