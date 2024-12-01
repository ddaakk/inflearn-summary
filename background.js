chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "fetchOrderSummaries") {
        try {
            const response = await fetch("https://course.inflearn.com/client/api/v1/order/summaries", {
                headers: {
                    "accept": "/",
                    "content-type": "application/json",
                    "cookie": message.cookie
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch order summaries:", response.status);
                sendResponse({ error: "Failed to fetch order summaries." });
                return;
            }

            const data = await response.json();
            sendResponse({ data });
        } catch (error) {
            console.error("Error fetching order summaries:", error);
            sendResponse({ error: "Error fetching order summaries." });
        }
    }

    return true; // Keeps the message channel open for async response
});
