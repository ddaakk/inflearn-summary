async function fetchOrderSummaries() {
    const url = "https://course.inflearn.com/client/api/v1/order/summaries";
    const headers = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ko;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "cookie": document.cookie,
        "dnt": "1",
        "origin": "https://www.inflearn.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.inflearn.com/",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        "x-request-from": "inflearn-next-fe",
        "x-request-id": "a49e749a-b475-475e-b71c-460753d9f09c",
    };

    try {
        console.log("Sending request to:", url);
        console.log("With headers:", headers);

        const response = await fetch(url, { method: "GET", headers: headers, credentials: 'include' });

        console.log("Received response:", response);

        if (!response.ok) {
            console.error("Request failed with status:", response.status);
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            return null;
        }

        const data = await response.json();
        console.log("Response data:", data);
        return data;
    } catch (error) {
        console.error("Network error occurred:", error);
        return null;
    }
}

function summarizeData(data) {
    const items = data.items || [];

    const totalRegularPrice = items.reduce((sum, item) => sum + item.regularPrice, 0);
    const totalPaymentPrice = items.reduce((sum, item) => sum + item.paymentPrice, 0);
    const courseCount = items.length;

    return `📚 구매한 강의 수: ${courseCount}개
💰 총 정가: ${totalRegularPrice.toLocaleString()}원
✅ 총 결제 금액: ${totalPaymentPrice.toLocaleString()}원
  `;
}

function displaySummary(summary) {
    const summaryDiv = document.createElement("div");
    summaryDiv.style.position = "fixed";
    summaryDiv.style.bottom = "10px"; // 아래쪽 위치
    summaryDiv.style.left = "10px"; // 왼쪽 위치
    summaryDiv.style.zIndex = 10000;
    summaryDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    summaryDiv.style.color = "#fff";
    summaryDiv.style.padding = "10px";
    summaryDiv.style.borderRadius = "5px";
    summaryDiv.style.fontSize = "14px";
    summaryDiv.style.lineHeight = "1.5";
    summaryDiv.style.maxWidth = "300px";
    summaryDiv.innerText = summary;

    document.body.appendChild(summaryDiv);
}

(async function () {
    const response = await fetchOrderSummaries();
    if (response && response.data) {
        const summary = summarizeData(response.data);
        displaySummary(summary);
    } else {
        console.error("Failed to retrieve or parse order summaries.");
    }
})();
