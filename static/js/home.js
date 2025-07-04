document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');
    const searchBtn = document.querySelector('.search-icon-btn');

    let timer = null;

    function renderResults(data) {
        resultsDiv.innerHTML = "";  // 결과 초기화

        if (data.error) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "error";
            errorDiv.textContent = data.error;
            resultsDiv.appendChild(errorDiv);
            return;
        }

        if (data.length === 0) {
            const noResultDiv = document.createElement("div");
            noResultDiv.className = "no-result";
            noResultDiv.textContent = "검색 결과가 없습니다.";
            resultsDiv.appendChild(noResultDiv);
            return;
        }

        data.forEach(stock => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "result-item";
            itemDiv.dataset.code = stock.code;
            itemDiv.dataset.market = stock.market;

            itemDiv.innerHTML = `
                <span class="star-icon" style="cursor:pointer; font-size: 1.3em; color: #ccc; margin-right: 8px;">☆</span>
                <strong>${stock.name || stock.kr_name}</strong>
                <span style="margin-left: 8px; color: gray;">(${stock.symbol})</span>
                <span style="float: right; color: #888;">[${stock.market}]</span>
            `;

            // 별 토글 기능
            const star = itemDiv.querySelector('.star-icon');
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (favorites.some(s => s.symbol === stock.symbol)) {
                star.textContent = '★';
                star.style.color = 'gold';
            } else {
                star.textContent = '☆';
                star.style.color = '#ccc';
            }

            star.addEventListener('click', function (e) {
                e.stopPropagation();
            
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const symbol = stock.symbol;

                if (star.textContent === '☆') {
                    star.textContent = '★';
                    star.style.color = 'gold';

                    if (!favorites.some(s => s.symbol === symbol)) {
                        favorites.push({
                            symbol: stock.symbol,
                            name: stock.name || stock.kr_name,
                            market: stock.market
                        });
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                    }
                    
                } else {
                    const confirmed = confirm('제거하시겠습니까?');
                    
                    if (confirmed) {
                        star.textContent = '☆';
                        star.style.color = '#ccc';

                        favorites = favorites.filter(s => s.symbol !== stock.symbol);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                    }
                }
            });

            // 종목 선택 시 input에 값 넣고 자동완성 닫기
            itemDiv.addEventListener("click", () => {
                input.value = `${stock.name || stock.kr_name} (${stock.symbol})`;
                resultsDiv.innerHTML = "";
                // TODO: 상세보기 이동, 포트폴리오 추가 등
            });

            resultsDiv.appendChild(itemDiv);
        });
    }

    function fetchAutocomplete() {
        const query = input.value.trim();
        if (!query || query === '종목 검색') {
            resultsDiv.innerHTML = '';
            return;
        }
        fetch(`/autocomplete?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(renderResults)
            .catch(() => {
                resultsDiv.innerHTML = '<div class="error">자동완성 실패</div>';
            });
    }

    function fetchFullSearch() {
        const query = input.value.trim();
        if (!query || query === '종목 검색') {
            resultsDiv.innerHTML = '';
            return;
        }
        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(renderResults)
            .catch(() => {
                resultsDiv.innerHTML = '<div class="error">전체 검색 실패</div>';
            });
    }

    input.addEventListener('input', function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fetchAutocomplete, 300);
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchFullSearch();  // 엔터는 전체 검색
        }
    });

    searchBtn.addEventListener('click', fetchFullSearch); // 돋보기 버튼도 전체 검색
});