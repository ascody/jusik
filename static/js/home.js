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
                <strong>${stock.name || stock.kr_name}</strong>
                <span style="margin-left: 8px; color: gray;">(${stock.code})</span>
                <span style="float: right; color: #888;">[${stock.market}]</span>
            `;

            // 선택 시 input에 값 넣고 리스트 닫기
            itemDiv.addEventListener("click", () => {
                input.value = `${stock.name || stock.kr_name} (${stock.code})`;
                resultsDiv.innerHTML = "";
                // TODO: 상세보기 이동하거나 포트폴리오에 추가 등 다른 동작 가능
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