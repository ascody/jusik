import json

def search_from_kosdaq(keyword: str) -> list[dict]:
    result = []
    
    with open("static/stock_info/kosdaq_code.json", "r", encoding="utf-8") as f:
        kosdaq_list = json.load(f)
        
    for stock in [stock for stock in kosdaq_list if (keyword in stock["한글종목명"] or keyword in stock["단축코드"])]:
        result.append({
            "symbol": stock["단축코드"],
            "name": stock["한글종목명"],
            "eng_name": "",
            "market": stock["마켓"],
            "national": "KR"
        })
        
    return result

def search_from_kospi(keyword: str) -> list[dict]:
    result = []
    
    with open("static/stock_info/kospi_code.json", "r", encoding="utf-8") as f:
        kospi_list = json.load(f)
        
    for stock in [stock for stock in kospi_list if (keyword in stock["한글명"] or keyword.lower() in stock["단축코드"].lower())]:
        result.append({
            "symbol": stock["단축코드"],
            "kr_name": stock["한글명"],
            "eng_name": "",
            "market": stock["마켓"],
            "national": "KR"
        })
        
    return result

def search_from_overseas(keyword: str) -> list[dict]:
    result = []
    
    with open("static/stock_info/overseas_stock_code.json", "r", encoding="utf-8") as f:
        overseas_list = json.load(f)
        
    for stock in [stock for stock in overseas_list if (keyword in stock["Korea name"] or keyword.lower() in stock["English name"].lower() or keyword.lower() in stock["realtime symbol"].lower())]:
        result.append({
            "symbol": stock["realtime symbol"],
            "name": stock["Korea name"],
            "eng_name": stock["English name"],
            "market": stock["Exchange code"],
            "national": stock["National code"]
        })
        
    return result

def search_stock(keyword: str) -> list[dict]:  
    return search_from_kosdaq(keyword) + search_from_kospi(keyword) + search_from_overseas(keyword)

# def get_stock_data(stock_code):
#     pass