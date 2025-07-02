document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');
    const searchBtn = document.querySelector('.search-icon-btn');

    let timer = null;

    function renderResults(data) {
        if (data.error) {
            resultsDiv.innerHTML = `<div class="error">${data.error}</div>`;
            return;
        }
        if (data.length === 0) {
            resultsDiv.innerHTML = '<div class="no-result">검색 결과가 없습니다.</div>';
            return;
        }
        resultsDiv.innerHTML = data.map(stock =>
            `<div class="result-item">${stock.name || stock.kr_name} (${stock.code}) [${stock.market}]</div>`
        ).join('');
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