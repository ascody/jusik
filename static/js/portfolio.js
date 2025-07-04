document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('portfolio-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        container.innerHTML = '<p style="color: gray;">즐겨찾기한 종목이 없습니다.</p>';
        return;
    }

    favorites.forEach(stock => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'result-item'; // 스타일 재활용

        itemDiv.innerHTML = `
            <span class="star-icon" style="font-size: 1.3em; color: gold; margin-right: 8px;">★</span>
            <strong>${stock.name}</strong>
            <span style="margin-left: 8px; color: gray;">(${stock.symbol})</span>
            <span style="float: right; color: #888;">[${stock.market}]</span>
        `;

        container.appendChild(itemDiv);
    });
});